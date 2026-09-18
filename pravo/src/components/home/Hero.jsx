import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import Button from '../ui/Button'
import Emblem from '../ui/Emblem'
import FlowingPaths from '../ui/FlowingPaths'
import './hero.css'

const trustPoints = ['Право-300 · рекомендованы', 'Адвокатская палата Москвы', '18 лет практики']

export default function Hero() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.hero__eyebrow', { y: -12, opacity: 0, duration: 0.7 })
          .from('.hero__line > span', { yPercent: 115, duration: 1, stagger: 0.1 }, 0.1)
          .from('.hero__lead', { y: 22, opacity: 0, duration: 0.8 }, '-=0.55')
          .from('.hero__actions > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.45')
          .from('.hero__trust li', { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
          .from('.hero__emblem-wrap', { scale: 0.9, opacity: 0, duration: 1.4, ease: 'power2.out' }, 0.25)

        // Subtle parallax as the hero scrolls away.
        gsap.to('.hero__emblem-wrap', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="hero surface-dark" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <FlowingPaths />
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Адвокатское бюро · Москва · с 2008</span>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span>Защищаем то,</span>
            </span>
            <span className="hero__line">
              <span>
                что вы <em className="hero__accent">построили</em>
              </span>
            </span>
          </h1>
          <p className="hero__lead">
            Арбитраж, банкротство, налоговые и корпоративные споры. Берём дела, где на кону
            бизнес, активы и репутация, — и доводим до результата.
          </p>
          <div className="hero__actions">
            <Button to="/kontakty" variant="cream" size="lg" withArrow>
              Бесплатная консультация
            </Button>
            <Button to="/uslugi" variant="outline-light" size="lg">
              Наши услуги
            </Button>
          </div>
          <ul className="hero__trust">
            {trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="hero__emblem-wrap">
          <span className="hero__emblem-glow" aria-hidden="true" />
          <Emblem className="hero__emblem" />
        </div>
      </div>

      <span className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        Листайте
      </span>
    </section>
  )
}
