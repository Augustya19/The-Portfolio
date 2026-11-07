import { useState, type CSSProperties } from 'react'
import { designWork, profile, type WorkCategory } from '../data'

const filters: Array<'All' | WorkCategory> = ['All', 'Illustration', 'UI/UX', 'Branding']
const FIRST_PAGE = 9
const artTones = ['blue', 'yellow', 'pink', 'peach', 'cobalt', 'ink'] as const
const tilts = [-2.5, 2, -1.5, 3, -3, 1.5]

function count(f: 'All' | WorkCategory) {
  return f === 'All' ? designWork.length : designWork.filter((w) => w.category === f).length
}

export function DesignWork() {
  const [active, setActive] = useState<'All' | WorkCategory>('All')
  const [showAll, setShowAll] = useState(false)
  const [broken, setBroken] = useState<Record<string, boolean>>({})
  const matching = active === 'All' ? designWork : designWork.filter((w) => w.category === active)
  const items = showAll ? matching : matching.slice(0, FIRST_PAGE)
  const hidden = matching.length - items.length

  return (
    <section id="design-work" className="section work-section" aria-labelledby="work-title">
      <div className="container">
        <div className="head-row" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="section-head">
            <h2 id="work-title">Design Work</h2>
            <p>A collection of my visual explorations, from illustrations to interfaces and brands.</p>
          </div>
          <a className="btn" href={profile.behance} target="_blank" rel="noopener noreferrer">
            View my Behance
          </a>
        </div>

        <div className="filters" role="group" aria-label="Filter design work">
          {filters.map((f) => (
            <button key={f} className="filter-chip" aria-pressed={active === f} onClick={() => { setActive(f); setShowAll(false) }}>
              {f}
              <span className="chip-count">{count(f)}</span>
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="empty-state">Nothing in this category yet.</p>
        ) : (
          <div className="work-grid">
            {items.map((item) => {
              const n = designWork.indexOf(item)
              return (
                <a
                  className="note-card"
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title}, ${item.category}. Opens on Behance in a new tab.`}
                  style={{ '--tilt': `${tilts[n % tilts.length]}deg` } as CSSProperties}
                >
                  <svg className="clip" viewBox="0 0 20 44" aria-hidden="true">
                    <path d="M6 30V9a4 4 0 0 1 8 0v24a6 6 0 0 1-12 0V12" fill="none" stroke="#9A9AA2" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <div className={`note-art art-${artTones[n % artTones.length]}`}>
                    {!item.image || broken[item.link] ? (
                      <span className="art-placeholder">{item.title}</span>
                    ) : (
                      <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={item.focus ? { objectPosition: item.focus } : undefined}
                        referrerPolicy="no-referrer"
                        onError={() => setBroken((b) => ({ ...b, [item.link]: true }))}
                      />
                    )}
                  </div>
                  <div className="note-text">
                    <h3 className="note-title">{item.title}</h3>
                    {item.category === 'UI/UX' && item.description && <p className="note-caption">{item.description}</p>}
                    <span className="note-category">{item.category}</span>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {hidden > 0 && (
          <div className="work-more">
            <button className="btn btn-quiet" onClick={() => setShowAll(true)}>
              Show {hidden} more
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
