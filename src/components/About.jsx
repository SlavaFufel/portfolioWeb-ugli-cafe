import { useRef } from 'react'
import { about } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'
import './about.css'

export function About() {
  const scope = useRef(null)
  useReveal(scope)
  useParallax(scope)

  return (
    <section className="section about" id="about" ref={scope}>
      <div className="container about__grid">
        <div className="about__text">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 className="about__title" data-reveal="title">
            {about.title.split('\n').map((line) => (
              <span key={line} className="about__title-line">
                {line}
              </span>
            ))}
          </h2>

          <div className="about__body">
            {about.paragraphs.map((p, i) => (
              <p key={p.slice(0, 24)} className="about__p" data-reveal="rise" data-reveal-delay={i * 0.05}>
                {p}
              </p>
            ))}
          </div>

          <dl className="about__stats" data-reveal-group>
            {about.stats.map((s) => (
              <div key={s.label} className="about__stat" data-reveal-item>
                <dt className="about__stat-value">{s.value}</dt>
                <dd className="about__stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="about__media" data-parallax-trigger>
          <figure className="about__photo about__photo--lead">
            <img
              src="/images/about-2.jpg"
              alt="Зал и ростер кофейни «Угли»"
              loading="lazy"
              width="1600"
              height="1067"
              data-parallax="6"
            />
          </figure>
          <figure className="about__photo about__photo--inset">
            <img
              src="/images/about-1.jpg"
              alt="Свежеобжаренные кофейные зёрна"
              loading="lazy"
              width="1600"
              height="1067"
              data-parallax="10"
            />
            <figcaption className="about__caption u-italic">свежая обжарка каждое утро</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
