import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { brand, hero, hours } from '../data/content'
import { useOpenNow } from '../hooks/useOpenNow'
import { OpenStatus } from './ui/OpenStatus'
import { Steam } from './ui/Steam'
import { WaxSeal } from './ui/WaxSeal'
import './hero.css'

export function Hero() {
  const scope = useRef(null)
  const status = useOpenNow(hours.schedule)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return undefined
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

        // Cinematic reveal: a slow zoom-out settle. Scale-only so that even if the
        // entrance is interrupted, the image is always a full-bleed photo (never a
        // clipped window). The char headline rises in behind its mask.
        tl.from('.hero__img', { scale: 1.16, duration: 1.9, ease: 'power3.out' }, 0)
          .fromTo(
            '.hero__char',
            { yPercent: 45, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.06 },
            0.5,
          )
          .from('.hero__eyebrow', { y: 14, opacity: 0, duration: 0.7 }, 0.45)
          .from('.hero__tagline', { y: 16, opacity: 0, duration: 0.8 }, '-=0.5')
          .from('.hero__sub', { y: 16, opacity: 0, duration: 0.8 }, '-=0.6')
          .from('.hero__actions > *', { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.55')
          .from('.hero__chip', { y: -12, opacity: 0, duration: 0.7 }, '-=0.85')
          .fromTo(
            '.hero__seal',
            { opacity: 0, scale: 0.85, rotate: -10 },
            { opacity: 1, scale: 1, rotate: -4, duration: 0.9 },
            '-=0.5',
          )

        // Parallax drift as the hero scrolls away.
        gsap.to('.hero__img', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      return () => mm.revert()
    },
    { scope },
  )

  return (
    <section className="hero" id="top" ref={scope}>
      <div className="hero__media">
        <img
          className="hero__img"
          src="/images/hero-2.jpg"
          alt="Бариста готовит кофе пуровер в кофейне «Угли»"
          width="1600"
          height="1067"
        />
        <div className="hero__warmth" aria-hidden="true" />
        <Steam className="hero__steam" />
      </div>

      <OpenStatus status={status} variant="chip" className="hero__chip" />
      <WaxSeal className="hero__seal" size={128} />

      <div className="hero__content container">
        <p className="hero__eyebrow eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__word" aria-label={brand.name}>
          {brand.name.split('').map((ch, i) => (
            <span className="hero__char" key={`${ch}-${i}`} aria-hidden="true">
              {ch}
            </span>
          ))}
        </h1>
        <p className="hero__tagline u-italic">{brand.tagline}</p>
        <p className="hero__sub">{hero.subheadline}</p>
        <div className="hero__actions">
          <a href="#reservation" className="btn">
            {hero.ctaPrimary}
          </a>
          <a href="#menu" className="btn btn--ghost hero__ghost">
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
