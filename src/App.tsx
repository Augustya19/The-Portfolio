import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Resume } from './components/Resume'
import { Marquee } from './components/Marquee'
import { CaseStudies } from './components/CaseStudies'
import { DesignWork } from './components/DesignWork'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a className="btn" href="#main" style={{ position: 'absolute', left: 8, top: -60 }} onFocus={(e) => (e.currentTarget.style.top = '8px')}>
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Resume />
        <CaseStudies />
        <DesignWork />
      </main>
      <Footer />
    </>
  )
}
