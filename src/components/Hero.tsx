import { useEffect, useRef } from 'react'
import { useAnimate } from 'framer-motion'
import { playChairRoll, soundAllowed, unlockSound } from '../lib/chairSound'

const EASE_OUT: [number, number, number, number] = [0.22, 0.9, 0.3, 1]

// Tiny bumps while the casters roll over the floor
const jitter = (n: number) => Array.from({ length: n }, (_, i) => (i % 2 ? -1.6 : 0) * (1 - i / n))

export function Hero() {
  const [scope, animate] = useAnimate()
  const busy = useRef(false)

  const rollIn = async (withSound: boolean) => {
    const roll = scope.current.querySelector('.chair-roll') as HTMLElement
    const rect = roll.getBoundingClientRect()
    const from = window.innerWidth - rect.left + 40
    const w = rect.width
    const D = 1.7

    if (withSound) playChairRoll(1.1, 1.15)

    animate('.chair-shadow', { opacity: [0, 1], scaleX: [0.7, 1.08, 1] }, { duration: D, times: [0, 0.68, 1] })
    animate('.chair-wheels', { y: jitter(16) }, { duration: 1.15, ease: 'linear' })
    animate('.chair-body', { rotate: [4, 2.2, -3.2, 1.1, 0], scaleX: [0.93, 0.97, 1, 1, 1] }, { duration: D, times: [0, 0.5, 0.68, 0.85, 1], ease: 'easeInOut' })
    animate('.chair-head', { rotate: [7, 3.5, -8, 3.5, -1.2, 0], y: [0, 0, 3, -1, 0, 0] }, { duration: D + 0.25, times: [0, 0.48, 0.66, 0.8, 0.92, 1], ease: 'easeInOut' })
    await animate(
      roll,
      { x: [from, -0.035 * w, 0.012 * w, 0], opacity: [1, 1, 1, 1] },
      { duration: D, times: [0, 0.68, 0.85, 1], ease: [EASE_OUT, 'easeInOut', 'easeInOut'] },
    )
  }

  // A quick glance back at the visitor: a hard cut between two drawn heads,
  // like flipping a frame, with a small nod to sell the turn.
  const glance = async () => {
    await new Promise((r) => setTimeout(r, 700))
    const swap = (turned: boolean) => {
      animate('.head-turn', { opacity: turned ? 1 : 0 }, { duration: 0 })
      animate('.head-back', { opacity: turned ? 0 : 1 }, { duration: 0 })
      return animate('.chair-head', { rotate: [0, turned ? 3 : -3, 0], y: [0, -2, 0] }, { duration: 0.35, ease: 'easeOut' })
    }
    await swap(true)
    await new Promise((r) => setTimeout(r, 1500))
    await swap(false)
  }

  useEffect(() => {
    const root = document.documentElement
    const nav = document.querySelector('.nav') as HTMLElement | null
    if (!root.classList.contains('intro')) return
    let cancelled = false

    ;(async () => {
      busy.current = true
      await new Promise((r) => setTimeout(r, 250))
      await animate('.stage-scene', { opacity: [0, 1], y: [18, 0] }, { duration: 0.8, ease: EASE_OUT })
      if (cancelled) return
      await rollIn(soundAllowed())
      if (cancelled) return
      const reveal = [
        animate('.hero-reveal', { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: EASE_OUT }),
        nav ? animate(nav, { opacity: [0, 1] }, { duration: 0.5 }) : null,
        animate('.hero-scroll', { opacity: [0, 1] }, { duration: 0.5, delay: 0.3 }),
      ]
      root.classList.remove('intro')
      await Promise.all(reveal)
      busy.current = false
      glance()
    })()

    // Safety net: never leave the page blank
    const t = setTimeout(() => root.classList.remove('intro'), 6000)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Click the chair: she scoots off and rolls back in, with sound this time.
  const replay = async () => {
    if (busy.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    busy.current = true
    const ok = await unlockSound()
    const roll = scope.current.querySelector('.chair-roll') as HTMLElement
    const rect = roll.getBoundingClientRect()
    if (ok) playChairRoll(0.55, 0.6, 0.3)
    animate('.chair-head', { rotate: [0, -6, 0] }, { duration: 0.6 })
    await animate(roll, { x: window.innerWidth - rect.left + 40 }, { duration: 0.6, ease: [0.5, 0, 0.9, 0.6] })
    await new Promise((r) => setTimeout(r, 250))
    await rollIn(ok)
    busy.current = false
  }

  return (
    <section id="top" className="hero" aria-labelledby="hero-title" ref={scope}>
      <div className="hero-canvas">
        <div className="stage">
          <picture className="stage-scene" aria-hidden="true">
            <source media="(max-width: 900px)" srcSet="assets/workspace-mobile-empty.webp" />
            <img className="stage-img" src="assets/workspace-desktop-empty.webp" alt="" />
          </picture>

          <div className="chair-slot">
            <button type="button" className="chair-roll" onClick={replay} aria-label="Give the chair a push">
              <span className="chair-shadow" aria-hidden="true" />
              <span className="chair-body" aria-hidden="true">
                <span className="chair-head">
                  <img className="head-back" src="assets/head-back.webp" alt="" />
                  <img className="head-turn" src="assets/head-turn.webp" alt="" />
                </span>
                <span className="chair-wheels">
                  <img className="chair-img" src="assets/chair.webp" alt="" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container hero-grid">
        <div className="frame hero-reveal">
          <span className="frame-name" aria-hidden="true">Hello</span>
          <span className="handle tl" aria-hidden="true" />
          <span className="handle tr" aria-hidden="true" />
          <span className="handle bl" aria-hidden="true" />
          <span className="handle br" aria-hidden="true" />

          <h1 id="hero-title" className="hero-title">
            <span>Hey, I’m</span>
            <span>Augustya.</span>
          </h1>
          <p className="hero-sub">
            Graphic and UI/UX designer who takes ideas from Figma to deployed code.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#design-work">See my work</a>
            <a className="btn btn-quiet" href="assets/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>

          <span className="frame-size" aria-hidden="true">Fill × Hug</span>
        </div>
      </div>

      <a className="hero-scroll" href="#about" aria-label="Scroll to about">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 6l5 5 5-5" fill="none" stroke="#2F2F33" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </a>
    </section>
  )
}
