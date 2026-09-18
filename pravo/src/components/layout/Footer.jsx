import { Link } from 'react-router-dom'
import { firm, contacts, navLinks } from '../../data/site'
import { services } from '../../data/services'
import './footer.css'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer surface-ink">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__name">
            Корнилов <span className="footer__amp">&amp;</span> Партнёры
          </span>
          <p className="footer__tagline">{firm.tagline}.</p>
          <p className="footer__about">
            Адвокатское бюро полного цикла. Защищаем интересы бизнеса и частных клиентов
            в арбитражных и общегражданских спорах с 2008 года.
          </p>
        </div>

        <nav className="footer__col" aria-label="Разделы сайта">
          <h2 className="footer__heading">Разделы</h2>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Практики">
          <h2 className="footer__heading">Практики</h2>
          <ul>
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to="/uslugi">{s.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__contacts">
          <h2 className="footer__heading">Контакты</h2>
          <a href={contacts.phoneHref} className="footer__phone">
            {contacts.phone}
          </a>
          <a href={contacts.emailHref}>{contacts.email}</a>
          <address className="footer__address">{contacts.address}</address>
          <p className="footer__hours">{contacts.hours}</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {currentYear} {firm.legalName}. Все права защищены.
        </p>
        <p className="footer__disclaimer">
          Информация на сайте не является публичной офертой. ИНН 7701234567 · рег. № в реестре
          адвокатов 77/12345
        </p>
      </div>
    </footer>
  )
}
