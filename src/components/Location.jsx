import { useRef } from 'react'
import { location } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import './location.css'

export function Location() {
  const scope = useRef(null)
  useReveal(scope)

  return (
    <section className="section location" id="location" ref={scope}>
      <div className="container loc__grid">
        <div className="loc__info">
          <p className="eyebrow">{location.eyebrow}</p>
          <h2 className="loc__title" data-reveal="title">
            {location.title}
          </h2>

          <address className="loc__address" data-reveal="rise">
            <span className="loc__line">{location.addressLine}</span>
            <span className="loc__line loc__line--muted">{location.city}</span>
            <span className="loc__metro">{location.metro}</span>
          </address>

          <p className="loc__walk u-italic" data-reveal="rise">
            {location.walkNote}
          </p>

          <div className="loc__contacts" data-reveal="rise">
            <a className="loc__phone" href={`tel:${location.phoneHref}`}>
              {location.phone}
            </a>
            <a className="loc__email" href={`mailto:${location.email}`}>
              {location.email}
            </a>
          </div>

          <div className="loc__actions" data-reveal="rise">
            <a className="btn" href={location.routeUrl} target="_blank" rel="noopener noreferrer">
              Построить маршрут
            </a>
            <div className="loc__delivery">
              <span className="loc__delivery-label">Доставка:</span>
              {location.deliveryLinks.map((d) => (
                <a
                  key={d.name}
                  className="loc__delivery-chip"
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="loc__map-wrap" data-reveal="rise">
          <iframe
            className="loc__map"
            src={location.mapEmbedSrc}
            title={`Карта: ${location.addressLine}, ${location.city}`}
            loading="lazy"
            width="600"
            height="400"
            tabIndex={-1}
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
          />
          <span className="loc__pin" aria-hidden="true">
            <svg viewBox="0 0 40 52" width="40" height="52">
              <path
                d="M20 0C9 0 0 9 0 20c0 14 20 32 20 32s20-18 20-32C40 9 31 0 20 0z"
                fill="var(--accent)"
                stroke="var(--gold)"
                strokeWidth="1.5"
              />
              <circle cx="20" cy="20" r="7" fill="var(--surface)" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  )
}
