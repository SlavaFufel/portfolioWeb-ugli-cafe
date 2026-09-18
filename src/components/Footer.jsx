import { useState } from 'react'
import { brand, footer, hours, location, nav } from '../data/content'
import { WaxSeal } from './ui/WaxSeal'
import './footer.css'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const onSubscribe = (e) => {
    e.preventDefault()
    if (/.+@.+\..+/.test(email)) setSubscribed(true)
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" className="footer__wordmark" aria-label={`${brand.name} — наверх`}>
              {brand.name}
            </a>
            <p className="footer__tagline u-italic">{brand.tagline}</p>
            <p className="footer__about">{footer.about}</p>
            <WaxSeal className="footer__seal" size={80} />
          </div>

          <nav className="footer__col" aria-label="Навигация в подвале">
            <h3 className="footer__col-title">Разделы</h3>
            <ul className="footer__list">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="footer__link">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#reservation" className="footer__link">
                  Бронирование
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <h3 className="footer__col-title">Часы</h3>
            <ul className="footer__list footer__hours">
              {hours.schedule.map((d) => (
                <li key={d.day}>
                  <span className="footer__day">{d.day}</span>
                  <span className="footer__time">{d.closed ? 'выходной' : `${d.open}–${d.close}`}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Контакты</h3>
            <ul className="footer__list">
              <li>{location.addressLine}</li>
              <li className="footer__muted">{location.metro}</li>
              <li>
                <a href={`tel:${location.phoneHref}`} className="footer__link">
                  {location.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${location.email}`} className="footer__link">
                  {location.email}
                </a>
              </li>
            </ul>
            <div className="footer__socials">
              {footer.socials.map((s) => (
                <a key={s.name} href={s.url} className="footer__social" target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__news">
          <div className="footer__news-text">
            <h3 className="footer__news-title">{footer.newsletterTitle}</h3>
            <p className="footer__news-note">{footer.newsletterNote}</p>
          </div>
          {subscribed ? (
            <p className="footer__news-thanks u-italic" role="status">
              Спасибо! Загляните в почту — там уже тепло.
            </p>
          ) : (
            <form className="footer__news-form" onSubmit={onSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ваша почта"
                aria-label="Email для рассылки"
              />
              <button type="submit" className="btn" aria-label="Подписаться">
                Подписаться
              </button>
            </form>
          )}
        </div>

        <div className="footer__bottom">
          <p className="footer__colophon">{footer.colophon}</p>
          <p className="footer__copyright">{footer.copyright}</p>
        </div>
      </div>

      <div className="footer__giant" aria-hidden="true">
        {brand.name}
      </div>
    </footer>
  )
}
