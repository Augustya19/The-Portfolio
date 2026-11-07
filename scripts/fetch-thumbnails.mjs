// Fetches a thumbnail for every project in src/content/design-work.json.
//
// For each link it reads the page's preview image (og:image, which Behance,
// Dribbble, Figma community pages, most portfolio sites and blogs all provide),
// downloads it into public/thumbs/, and records it in src/content/thumbnails.json.
//
// It runs before every build (npm run build, and every Vercel deploy), and on
// demand with `npm run thumbs`. It never fails the build: if a link can't be
// reached, that project keeps whatever thumbnail it had, or shows a placeholder.
//
// Options:
//   --refresh   download every thumbnail again (e.g. after changing a cover)
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const projectsFile = process.env.THUMBS_PROJECTS ?? join(root, 'src/content/design-work.json')
const manifestFile = process.env.THUMBS_MANIFEST ?? join(root, 'src/content/thumbnails.json')
const outDir = process.env.THUMBS_DIR ?? join(root, 'public/thumbs')
const refresh = process.argv.includes('--refresh')
const WIDTH = 800 // thumbnails are shrunk to this width and saved as WebP

// sharp is optional: without it, images are saved as downloaded.
let sharp = null
try { sharp = (await import('sharp')).default } catch { /* keep originals */ }
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
const TIMEOUT = 15000

const projects = JSON.parse(readFileSync(projectsFile, 'utf8'))
const manifest = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, 'utf8')) : {}
mkdirSync(outDir, { recursive: true })

const idFor = (link) => createHash('sha1').update(link).digest('hex').slice(0, 12)
const isLocal = (path) => typeof path === 'string' && path.startsWith('thumbs/')
const extFor = (type, url) => {
  if (/webp/.test(type)) return 'webp'
  if (/png/.test(type)) return 'png'
  if (/gif/.test(type)) return 'gif'
  if (/jpe?g/.test(type)) return 'jpg'
  const m = url.match(/\.(png|jpe?g|webp|gif)(?:$|\?)/i)
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
}

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: '*/*' }, redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res
}

function previewImage(html, pageUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
  ]
  for (const p of patterns) {
    const m = html.match(p)
    if (m) return new URL(m[1].replace(/&amp;/g, '&'), pageUrl).href
  }
  return null
}

let fetched = 0, kept = 0, failed = 0
for (const { link, title, image } of projects) {
  if (image) { kept++; continue } // the project has its own thumbnail
  const id = idFor(link)
  const existing = readdirSync(outDir).find((f) => f.startsWith(id + '.'))
  if (existing && isLocal(manifest[link]) && !refresh) { kept++; continue }
  try {
    const page = await get(link)
    const img = previewImage(await page.text(), page.url)
    if (!img) throw new Error('no preview image on the page')
    const res = await get(img)
    const type = res.headers.get('content-type') ?? ''
    if (!type.startsWith('image/')) throw new Error(`not an image (${type})`)
    let data = Buffer.from(await res.arrayBuffer())
    let file = `${id}.${extFor(type, img)}`
    if (sharp && !/gif/.test(type)) {
      data = await sharp(data).resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer()
      file = `${id}.webp`
    }
    for (const old of readdirSync(outDir)) if (old.startsWith(id + '.') && old !== file) unlinkSync(join(outDir, old))
    writeFileSync(join(outDir, file), data)
    manifest[link] = `thumbs/${file}`
    fetched++
    console.log(`  ✓ ${title}`)
  } catch (err) {
    failed++
    console.warn(`  ! ${title}: ${err.message}${manifest[link] ? ' (keeping the previous thumbnail)' : ' (placeholder will show)'}`)
  }
}

// Drop entries for projects that were removed from the list.
const links = new Set(projects.map((p) => p.link))
for (const key of Object.keys(manifest)) if (!links.has(key)) delete manifest[key]

writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Thumbnails: ${fetched} fetched, ${kept} already in place, ${failed} unavailable.`)
