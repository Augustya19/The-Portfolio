export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-canvas" aria-hidden="true">
        <picture>
          <source media="(max-width: 900px)" srcSet="assets/workspace-mobile.webp" />
          <img className="hero-image" src="assets/workspace-desktop.webp" alt="" />
        </picture>
      </div>

      <div className="container hero-grid">
        <div className="frame">
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
