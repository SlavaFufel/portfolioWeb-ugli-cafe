import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { firm, contacts, navLinks } from '../../data/site'
import Button from '../ui/Button'
import './navbar.css'

function BrandMark() {
  return (
    <span className="nav__mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.8" y="0.8" width="38.4" height="38.4" rx="7" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
        <text x="20" y="27.5" textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fontWeight="600" fill="currentColor">
          К
        </text>
      </svg>
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef(null)
  const drawerRef = useRef(null)
  const isHome = pathname === '/'

  // Solid background after a small scroll; always solid off the home hero.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Close the drawer on navigation.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Body scroll-lock, focus management + focus trap while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const drawer = drawerRef.current
    const focusables = drawer
      ? Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'))
      : []
    // Move focus into the drawer on open (SC 2.4.3).
    focusables[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      // Trap Tab focus inside the dialog (SC 2.1.2).
      if (e.key === 'Tab' && focusables.length) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const transparent = isHome && !scrolled && !menuOpen
  const cls = ['nav', transparent ? 'nav--transparent' : 'nav--solid', menuOpen && 'nav--menu-open']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={cls}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label={`${firm.name} — на главную`}>
          <BrandMark />
          <span className="nav__brand-text">
            <span className="nav__brand-name">
              Корнилов <span className="nav__amp">&amp;</span> Партнёры
            </span>
            <span className="nav__brand-sub">Адвокатское бюро · с 2008</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={contacts.phoneHref} className="nav__phone">
            {contacts.phone}
          </a>
          <Button to="/kontakty" size="sm" variant={transparent ? 'cream' : 'primary'}>
            Консультация
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className="nav__drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Меню навигации"
        hidden={!menuOpen}
      >
        <nav className="nav__drawer-links" aria-label="Мобильная навигация">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="nav__drawer-link">
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav__drawer-foot">
          <Button to="/kontakty" variant="cream" withArrow>
            Бесплатная консультация
          </Button>
          <a href={contacts.phoneHref} className="nav__drawer-phone">
            {contacts.phone}
          </a>
          <a href={contacts.emailHref} className="nav__drawer-email">
            {contacts.email}
          </a>
        </div>
      </div>
    </header>
  )
}
