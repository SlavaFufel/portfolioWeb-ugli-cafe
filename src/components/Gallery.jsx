import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gallery } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'
import { lockScroll, unlockScroll } from '../lib/scrollLock'
import './gallery.css'

const FIG_MODS = ['lead', 'wide', 'small', 'a', 'b', 'c']
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Gallery() {
  const scope = useRef(null)
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const [active, setActive] = useState(null)
  const items = gallery.items

  useReveal(scope)
  useParallax(scope)

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  )

  // While the lightbox is open: lock scroll, make the rest of the page inert
  // (so screen readers can't wander behind it), move focus in, trap Tab.
  useEffect(() => {
    if (active === null) return undefined
    lockScroll()
    const background = [document.getElementById('main'), document.querySelector('.nav')]
    background.forEach((el) => el && (el.inert = true))
    // Focus into the dialog (portaled to <body>, so it stays interactive).
    const focusFirst = () => dialogRef.current?.querySelector(FOCUSABLE)?.focus()
    const raf = requestAnimationFrame(focusFirst)

    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll(FOCUSABLE)
        if (!focusables || focusables.length === 0) return
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
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKey)
      background.forEach((el) => el && (el.inert = false))
      unlockScroll()
    }
  }, [active, close, step])

  // Restore focus to the thumbnail that opened the lightbox.
  useEffect(() => {
    if (active === null) triggerRef.current?.focus()
  }, [active])

  return (
    <section className="section gallery" id="gallery" ref={scope}>
      <div className="container">
        <header className="gallery__head">
          <p className="eyebrow">{gallery.eyebrow}</p>
          <h2 className="gallery__title" data-reveal="title">
            {gallery.title}
          </h2>
          <p className="gallery__lead" data-reveal="rise">
            {gallery.subtitle}
          </p>
        </header>

        <div className="gallery__grid" data-reveal-group>
          {items.map((item, i) => {
            const mod = FIG_MODS[i] || 'a'
            // The pull-quote is woven in after the second image.
            return (
              <Fragment key={item.caption}>
                {i === 2 && (
                  <blockquote className="gallery__quote" data-reveal-item>
                    <span className="gallery__quote-mark" aria-hidden="true">
                      “
                    </span>
                    {gallery.pullQuote}
                  </blockquote>
                )}
                <figure className={`gallery__fig gallery__fig--${mod}`} data-reveal-item>
                  <button
                    type="button"
                    className="gallery__btn"
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget
                      setActive(i)
                    }}
                    aria-label={`Открыть фото: ${item.caption}`}
                  >
                    <img
                      src={item.image}
                      alt={item.caption}
                      loading="lazy"
                      width="1600"
                      height="1067"
                      data-parallax="7"
                    />
                    <span className="gallery__overlay" aria-hidden="true" />
                  </button>
                  <figcaption className="gallery__caption u-italic">{item.caption}</figcaption>
                </figure>
              </Fragment>
            )
          })}
        </div>
      </div>

      {active !== null &&
        createPortal(
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
          ref={dialogRef}
          onClick={close}
        >
          <button type="button" className="lightbox__close" onClick={close} aria-label="Закрыть">
            ✕
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Предыдущее фото"
          >
            ‹
          </button>
          <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={items[active].image} alt={items[active].caption} width="1600" height="1067" />
            <figcaption className="lightbox__caption u-italic">{items[active].caption}</figcaption>
          </figure>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Следующее фото"
          >
            ›
          </button>
        </div>,
          document.body,
        )}
    </section>
  )
}
