import './marquee.css'

const PHRASES = [
  'Свежая обжарка',
  'Завтраки весь день',
  'Бранч на углях',
  'Кофе своей обжарки',
  'С 1962 года',
]

/**
 * Decorative scrolling ticker — a bit of horizontal motion between sections.
 * Two duplicated groups slide left and loop seamlessly. Static under
 * reduced-motion (see marquee.css).
 */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((rep) => (
          <div className="marquee__group" key={rep}>
            {PHRASES.map((p) => (
              <span className="marquee__item" key={p}>
                {p}
                <span className="marquee__sep">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
