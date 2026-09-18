import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from './lib/gsap'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Menu } from './components/Menu'
import { About } from './components/About'
import { Gallery } from './components/Gallery'
import { Hours } from './components/Hours'
import { Reservation } from './components/Reservation'
import { Location } from './components/Location'
import { Footer } from './components/Footer'

export default function App() {
  const roastRef = useRef(null)

  // Roast-line: a brass hairline down the left margin fills as you scroll —
  // parchment darkening through the roast.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.roast-line__fill', {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
        })
      })
      return () => mm.revert()
    },
    { scope: roastRef },
  )

  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <div className="grain" aria-hidden="true" />
      <div className="roast-line" aria-hidden="true" ref={roastRef}>
        <div className="roast-line__fill" />
      </div>

      <Nav />

      <main id="main">
        <Hero />
        <Marquee />
        <Menu />
        <About />
        <Gallery />
        <Hours />
        <Reservation />
        <Location />
      </main>

      <Footer />
    </>
  )
}
