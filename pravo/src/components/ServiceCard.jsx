import { Link } from 'react-router-dom'
import './service-card.css'

export default function ServiceCard({ service, compact = false }) {
  return (
    <article
      className={`service-card ${compact ? 'service-card--compact' : ''}`}
      aria-labelledby={`svc-${service.slug}`}
    >
      <div className="service-card__head">
        <span className="service-card__index">{service.index}</span>
        <span className="service-card__price tnum">{service.price}</span>
      </div>
      <h3 id={`svc-${service.slug}`} className="service-card__title">
        {service.title}
      </h3>
      <p className="service-card__desc">{service.short}</p>

      {!compact && (
        <ul className="service-card__points">
          {service.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      <Link to="/kontakty" className="service-card__cta">
        Обсудить задачу
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </article>
  )
}
