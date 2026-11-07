import { useState } from 'react'
import { caseStudies } from '../data'
import { CaseFinder } from './CaseFinder'
import { CaseFolder } from './CaseFolder'

export function CaseStudies() {
  const [open, setOpen] = useState(false)
  return (
    <section id="case-studies" className="section cases" aria-labelledby="cases-title">
      <div className="container">
        <div className="head-row" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="section-head">
            <h2 id="cases-title">Case Studies</h2>
            <p>Product thinking, user research and design in action.</p>
          </div>
          <button className="btn" onClick={() => setOpen(true)} aria-haspopup="dialog">
            View all case studies
          </button>
        </div>

        <ul className="case-grid" role="list">
          {caseStudies.filter((c) => c.featured).map((study) => (
            <li key={study.notion}>
              <CaseFolder study={study} />
            </li>
          ))}
        </ul>
        <CaseFinder open={open} onClose={() => setOpen(false)} />
      </div>
    </section>
  )
}
