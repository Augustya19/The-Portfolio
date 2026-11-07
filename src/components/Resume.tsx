import { education, experience } from '../data'

const toolkit: Array<{ group: string; items: string[] }> = [
  { group: 'Design', items: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Canva', 'UI/UX design', 'Interaction design'] },
  { group: 'Web', items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Responsive design'] },
  { group: 'Tools', items: ['Git', 'Notion', 'MySQL', 'Flask', 'Gemini API', 'Power BI', 'MS Excel'] },
]

function Heading({ children, id }: { children: string; id?: string }) {
  return (
    <h3 className="rb-heading" id={id}>
      <span>{children}</span>
    </h3>
  )
}

export function Resume() {
  return (
    <section id="experience" className="section resume" aria-labelledby="resume-title">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 'var(--space-5)' }}>
          <h2 id="resume-title">Education &amp; Experience</h2>
          <p>Where I studied, where I’ve worked, and the tools I reach for.</p>
        </div>

        <div className="rb">
          <div className="rb-col">
            <section className="rb-block" aria-labelledby="rb-edu">
              <Heading id="rb-edu">Education</Heading>
              <p className="rb-strong">{education.degree}</p>
              <p>{education.institution}</p>
              <div className="rb-meta">
                <span className="rb-date">{education.years}</span>
                <span className="rb-score">{education.cgpa.replace(/^CGPA\s*/i, 'CGPA ')}</span>
              </div>
            </section>

            <section className="rb-block" aria-labelledby="rb-cert">
              <Heading id="rb-cert">Certificates</Heading>
              <ul className="rb-checks">
                {education.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

          </div>

          <section className="rb-block rb-exp" aria-labelledby="rb-work">
            <Heading id="rb-work">Experience</Heading>
            <ol className="rb-timeline">
              {experience.map((role) => (
                <li key={role.company + role.duration}>
                  <div className="rb-role-head">
                    <span className="rb-date">{role.duration}</span>
                    {role.current && <span className="rb-now">Current</span>}
                  </div>
                  <p className="rb-role">
                    {role.position}
                    <span>{role.company}, {role.location}</span>
                  </p>
                </li>
              ))}
            </ol>
            <a className="btn btn-quiet rb-resume" href="assets/resume.pdf" target="_blank" rel="noopener noreferrer">
              Read the full resume
            </a>
          </section>

            <section className="rb-block rb-toolkit" aria-labelledby="rb-tools">
            <Heading id="rb-tools">Toolkit</Heading>
            <div className="rb-groups">
              {toolkit.map((g) => (
                <div key={g.group}>
                  <p className="rb-group">{g.group}</p>
                  <ul className="rb-tools">
                    {g.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
