import { useState } from 'react'
import { testimonials } from '../../data/testimonials'
import './testimonials.css'

function Chevron({ dir }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const active = testimonials[index]
  const go = (next) => setIndex((next + total) % total)

  return (
    <section className="testimonials surface-dark" aria-label="Отзывы клиентов">
      <div className="testimonials__bg" aria-hidden="true" />
      <div className="container testimonials__inner">
        <span className="testimonials__mark" aria-hidden="true">
          “
        </span>

        <blockquote className="testimonials__quote" aria-live="polite" aria-atomic="true">
          <p>{active.quote}</p>
          <footer className="testimonials__byline">
            <span className="testimonials__author">{active.author}</span>
            <span className="testimonials__role">{active.role}</span>
          </footer>
        </blockquote>

        <div className="testimonials__nav">
          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Предыдущий отзыв"
            onClick={() => go(index - 1)}
          >
            <Chevron dir="left" />
          </button>
          <div className="testimonials__dots">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                className={`testimonials__dot ${idx === index ? 'is-active' : ''}`}
                aria-label={`Отзыв ${idx + 1} из ${total}`}
                aria-current={idx === index ? 'true' : undefined}
                onClick={() => setIndex(idx)}
              />
            ))}
          </div>
          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Следующий отзыв"
            onClick={() => go(index + 1)}
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  )
}
