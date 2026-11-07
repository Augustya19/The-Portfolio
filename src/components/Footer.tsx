import { profile } from '../data'

function Check({ done }: { done: boolean }) {
  return (
    <svg className={`todo-box${done ? ' is-done' : ''}`} viewBox="0 0 28 28" aria-hidden="true">
      <path className="todo-square" d="M5 6.5c5-1.2 12.5-1.4 17.6-.6.8 5.6.9 11.4.2 16.4-5.6.8-11.8.9-17.3.2-.9-5.3-1-10.8-.5-16z" />
      <path className="todo-tick" d="M8 14.5l4.2 4.3L22.5 6" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div>
          <h2 className="footer-signoff">Let’s make something together.</h2>
          <a className="footer-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>

        <div className="sticky" aria-label="Augustya's to-do list">
          <span className="sticky-tape" aria-hidden="true" />
          <p className="sticky-title">to-do</p>
          <ul className="todo">
            <li className="is-done"><Check done />design it</li>
            <li className="is-done"><Check done />build it</li>
            <li className="is-done"><Check done />ship it</li>
            <li className="todo-open">
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Let’s work together')}`}>
                <Check done={false} />
                hire Augustya
              </a>
              <span className="todo-nudge" aria-hidden="true">↖ this one’s on you</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-inner">
        <a className="nav-logo" href="#top">{profile.brand}</a>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.behance} target="_blank" rel="noopener noreferrer">Behance</a>
        </div>
        <span className="footer-copy">© 2026 {profile.name}</span>
      </div>
    </footer>
  )
}
