import { useEffect, useRef, useState } from 'react'
import { brand, nav } from '../data/content'
import { lockScroll, unlockScroll } from '../lib/scrollLock'
import './nav.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const drawerRef = useRef(null)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile drawer: lock scroll, move focus in, Esc to close, trap Tab inside.
  useEffect(() => {
    if (!open) return undefined
    lockScroll()
    const drawer = drawerRef.current
    const burger = burgerRef.current
    const focusables = drawer ? Array.from(drawer.querySelectorAll('a, button')) : []
    focusables[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
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
      document.removeEventListener('keydown', onKey)
      unlockScroll()
      burger?.focus()
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" onClick={close} aria-label={`${brand.name} — на главную`}>
          <span className="nav__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <ellipse cx="16" cy="16" rx="9" ry="13" fill="var(--accent)" />
              <path
                d="M16 4 C 11 11, 11 21, 16 28"
                stroke="var(--surface)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="nav__brand-text">{brand.name}</span>
          <span className="nav__brand-since" aria-hidden="true">с 1962</span>
        </a>

        <nav className="nav__links" aria-label="Основная навигация">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#reservation" className="btn nav__cta">
          Забронировать
        </a>

        <button
          ref={burgerRef}
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="nav__drawer" ref={drawerRef} hidden={!open}>
        {nav.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="nav__drawer-link" onClick={close}>
            {item.label}
          </a>
        ))}
        <a href="#reservation" className="btn btn--block nav__drawer-cta" onClick={close}>
          Забронировать стол
        </a>
      </div>
    </header>
  )
}
