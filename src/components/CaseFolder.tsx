import type { CSSProperties } from 'react'
import type { CaseStudy } from '../data'

const tones: Record<CaseStudy['color'], { c: string; c2: string; on: string }> = {
  lavender: { c: '#DCEAF8', c2: '#A9CBEE', on: '#2F2F33' },
  powder: { c: '#FED358', c2: '#F5B21F', on: '#2F2F33' },
  pink: { c: '#FE95AD', c2: '#F06B8B', on: '#2F2F33' },
  sky: { c: '#FEBE76', c2: '#F59E42', on: '#2F2F33' },
}

export function CaseFolder({ study }: { study: CaseStudy }) {
  const t = tones[study.color]
  const rows = [
    ['Problem', study.problem],
    ['Role', study.role],
    ['Outcome', study.outcome],
  ].filter((r): r is [string, string] => Boolean(r[1]))

  return (
    <a
      className="cfolder"
      href={study.notion}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--c': t.c, '--c2': t.c2, '--on': t.on } as CSSProperties}
    >
      <span className="cf-back" aria-hidden="true" />
      <span className="cf-sheet" aria-hidden="true" />

      <span className="cf-paper">
        <svg className="cf-clip" viewBox="0 0 20 44" aria-hidden="true">
          <path d="M6 30V9a4 4 0 0 1 8 0v24a6 6 0 0 1-12 0V12" fill="none" stroke="#7C7C86" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <dl className="cf-rows">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <span className="cf-read">Read on Notion</span>
      </span>

      <span className="cf-front">
        <span className="cf-title">
          <span className="cf-name">{study.title}</span>
          <span className="cf-sub">{` - ${study.headline}`}</span>
        </span>
        {study.tags && (
          <span className="cf-tags">
            {study.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        )}
      </span>
    </a>
  )
}
