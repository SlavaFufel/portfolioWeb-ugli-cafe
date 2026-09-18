import { useMemo, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { menu, FILTER_TAGS } from '../data/menu'
import { Tag } from './ui/Tag'
import { useReveal } from '../hooks/useReveal'
import './menu.css'

const pluralItems = (n) => {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'позиция'
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return 'позиции'
  return 'позиций'
}

export function Menu() {
  const scope = useRef(null)
  const gridRef = useRef(null)
  const [activeCat, setActiveCat] = useState(menu[0].id)
  const [filters, setFilters] = useState([])

  const category = menu.find((c) => c.id === activeCat)
  const items = useMemo(() => {
    if (!filters.length) return category.items
    return category.items.filter((it) => filters.every((f) => it.tags.includes(f)))
  }, [category, filters])

  useReveal(scope)

  // Plate-up the cards whenever the category or filters change.
  useGSAP(
    () => {
      const grid = gridRef.current
      if (!grid) return undefined
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          grid.querySelectorAll('.menu__card'),
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.05 },
        )
      })
      return () => mm.revert()
    },
    { dependencies: [activeCat, filters.join('|')], scope, revertOnUpdate: true },
  )

  const toggleFilter = (f) =>
    setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  return (
    <section className="section menu" id="menu" ref={scope}>
      <div className="container">
        <header className="menu__head">
          <p className="eyebrow">Меню</p>
          <h2 className="menu__title" data-reveal="title">
            Полистайте, как дома
          </h2>
          <p className="menu__lead" data-reveal="rise">
            Сезонное меню мы обновляем вручную — никаких PDF. Метки помогут тем, у кого свои правила.
          </p>
        </header>

        <div className="menu__layout">
          <aside className="menu__rail" aria-label="Категории меню">
            <ul className="menu__rail-list">
              {menu.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    className={`menu__rail-btn ${cat.id === activeCat ? 'is-active' : ''}`}
                    onClick={() => setActiveCat(cat.id)}
                    aria-current={cat.id === activeCat ? 'true' : undefined}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="menu__main">
            <div className="menu__filters" role="group" aria-label="Фильтры по меткам">
              <span className="menu__filters-label">Показать только:</span>
              {FILTER_TAGS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`menu__chip ${filters.includes(f) ? 'is-active' : ''}`}
                  aria-pressed={filters.includes(f)}
                  onClick={() => toggleFilter(f)}
                >
                  {f}
                </button>
              ))}
              {filters.length > 0 && (
                <button
                  type="button"
                  className="menu__chip menu__chip--clear"
                  aria-label="Сбросить фильтры меню"
                  onClick={() => setFilters([])}
                >
                  Сбросить
                </button>
              )}
            </div>

            <p className="menu__cat-blurb u-italic">{category.blurb}</p>

            <p className="u-vh" aria-live="polite">
              Категория «{category.name}»: {items.length} {pluralItems(items.length)}
            </p>

            <div className="menu__grid" ref={gridRef}>
              {items.map((item) => (
                <article key={item.id} className="menu__card">
                  <div className="menu__card-thumb">
                    <img
                      src={`/images/menu/${item.id}.jpg`}
                      alt={item.name}
                      loading="lazy"
                      width="220"
                      height="220"
                    />
                  </div>
                  <div className="menu__card-body">
                    <div className="menu__card-head">
                      <h3 className="menu__name">{item.name}</h3>
                      <span className="menu__leader" aria-hidden="true" />
                      <span className="menu__price">{item.price}&nbsp;₽</span>
                    </div>
                    {item.tags.length > 0 && (
                      <div className="menu__tags">
                        {item.tags.map((t) => (
                          <Tag key={t} label={t} />
                        ))}
                      </div>
                    )}
                    <p className="menu__desc">{item.description}</p>
                    <span className="menu__weight">{item.weight}</span>
                  </div>
                </article>
              ))}
              {items.length === 0 && (
                <p className="menu__empty">
                  Нет блюд с выбранными метками в этой категории.{' '}
                  <button type="button" className="menu__link" onClick={() => setFilters([])}>
                    Сбросить фильтры
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
