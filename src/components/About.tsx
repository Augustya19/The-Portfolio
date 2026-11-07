import { useEffect, useRef, useState } from 'react'
import { profile } from '../data'

export function About() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = badgeRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="section container" aria-labelledby="about-title">
      <div className="about-grid">
        <div className="badge-wrap" ref={badgeRef} data-in={inView || undefined}>
          <img
            className="id-badge"
            src="assets/badge.webp"
            width={1100}
            height={1332}
            alt="Augustya's ID badge on a blue floral lanyard, reading Augustya, Creative License"
          />
        </div>

        <div>
          <h2 id="about-title" className="about-title">
            About me
          </h2>
          <p className="about-body">{profile.summary}</p>
          <ul className="tags" aria-label="Focus areas">
            {profile.tags.map((tag) => (
              <li key={tag} className="tag">{tag}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="connect-title">Let’s connect</h3>
          <ul className="contact-list">
            <li>
              <span className="contact-label">Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <span className="contact-label">Phone</span>
              <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a>
            </li>
            <li>
              <span className="contact-label">GitHub</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">github.com/Augustya19</a>
            </li>
            <li>
              <span className="contact-label">Behance</span>
              <a href={profile.behance} target="_blank" rel="noopener noreferrer">behance.net/augustyayadav</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
