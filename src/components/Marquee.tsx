const words = ['Graphic design', 'UI/UX', 'Illustration', 'Web design', 'Figma to code', 'Branding']

function Row() {
  return (
    <span className="marquee-row">
      {words.map((w) => (
        <span key={w} className="marquee-item">
          {w}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 1c.8 6.2 4.8 10.2 11 11-6.2.8-10.2 4.8-11 11-.8-6.2-4.8-10.2-11-11 6.2-.8 10.2-4.8 11-11z" />
          </svg>
        </span>
      ))}
    </span>
  )
}

export function Marquee() {
  return (
    <div className="marquee" role="presentation" aria-hidden="true">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  )
}
