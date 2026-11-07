import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { caseStudies, type CaseStudy } from '../data'

const folderFill: Record<CaseStudy['color'], [string, string]> = {
  lavender: ['#A9CBEE', '#DCEAF8'],
  powder: ['#F5B21F', '#FED358'],
  pink: ['#F06B8B', '#FE95AD'],
  sky: ['#F59E42', '#FEBE76'],
}

function MiniFolder({ color }: { color: CaseStudy['color'] }) {
  const [back, front] = folderFill[color]
  return (
    <svg className="mf-icon" viewBox="0 0 96 76" aria-hidden="true">
      <path d="M6 12a6 6 0 0 1 6-6h22l7 7h43a6 6 0 0 1 6 6v45a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill={back} />
      <rect x="20" y="10" width="44" height="34" rx="3" fill="#FFFBF8" transform="rotate(-6 42 27)" />
      <rect x="34" y="12" width="44" height="34" rx="3" fill="#FFFBF8" opacity="0.9" transform="rotate(5 56 29)" />
      <path d="M6 30a6 6 0 0 1 6-6h72a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill={front} opacity="0.92" />
      <path d="M10 28h76" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" />
    </svg>
  )
}

export function CaseFinder({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && windowRef.current) {
        const items = windowRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)

    // Lock the page behind the window. The scroll lives on <html> here, so lock both
    // and pad for the scrollbar so the layout does not jump.
    const root = document.documentElement
    const scrollbar = window.innerWidth - root.clientWidth
    const prevRoot = root.style.overflow
    const prevBody = document.body.style.overflow
    const prevPad = root.style.paddingRight
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`

    // Stop wheel and touch scrolling from reaching the page (iOS ignores overflow alone).
    const block = (e: Event) => {
      const grid = windowRef.current?.querySelector('.mac-grid')
      if (grid && grid.contains(e.target as Node) && grid.scrollHeight > grid.clientHeight) return
      e.preventDefault()
    }
    document.addEventListener('wheel', block, { passive: false })
    document.addEventListener('touchmove', block, { passive: false })

    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('wheel', block)
      document.removeEventListener('touchmove', block)
      root.style.overflow = prevRoot
      document.body.style.overflow = prevBody
      root.style.paddingRight = prevPad
      prev?.focus({ preventScroll: true })
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="finder-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <motion.div
            ref={windowRef}
            className="mac-window"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mac-title"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? false : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mac-bar">
              <div className="mac-dots">
                <button ref={closeRef} className="finder-dot close" onClick={onClose} aria-label="Close case studies window" />
                <span className="finder-dot minimise" aria-hidden="true" />
                <span className="finder-dot zoom" aria-hidden="true" />
              </div>
              <span className="mac-nav" aria-hidden="true">
                <svg viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" /></svg>
                <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" /></svg>
              </span>
              <h2 id="mac-title" className="mac-title">Case Studies</h2>
            </div>

            <div className="mac-body">

              <ul className="mac-grid">
                {caseStudies.map((study) => (
                  <li key={study.notion}>
                    {study.notion ? (
                      <a className="mf" href={study.notion} target="_blank" rel="noopener noreferrer">
                        <MiniFolder color={study.color} />
                        <span className="mf-name">
                          <span className="mf-upper">{study.title}</span>{`\u00a0-\u00a0${study.headline}`}
                        </span>
                      </a>
                    ) : (
                      <div className="mf" tabIndex={0} aria-label={`${study.title}, write-up coming soon`}>
                        <MiniFolder color={study.color} />
                        <span className="mf-name">{study.title}</span>
                        <span className="mf-meta">Coming soon</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mac-status">{caseStudies.length} items</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
