import { useEffect, useState } from 'react'
import { profile } from '../data'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#design-work', label: 'Play' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 720 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="nav" data-open={open || undefined}>
      <nav className="container nav-inner" aria-label="Primary">
        <a className="nav-logo" href="#top" aria-label={`${profile.name} home`} onClick={close}>
          {profile.brand}
        </a>
        <ul className="nav-links" id="nav-menu">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={close}>{l.label}</a>
            </li>
          ))}
          <li><a href="assets/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={close}>Resume</a></li>
          <li className="nav-cta">
            <a className="btn" href={`mailto:${profile.email}`} onClick={close}>Say hi</a>
          </li>
        </ul>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </nav>
    </header>
  )
}
