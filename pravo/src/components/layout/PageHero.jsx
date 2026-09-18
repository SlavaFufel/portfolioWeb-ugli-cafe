import { Link } from 'react-router-dom'
import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'
import './page-hero.css'

/**
 * Dark inner-page header with breadcrumbs. Keeps every secondary page visually
 * anchored to the brand and gives crawlers a clear breadcrumb trail.
 */
export default function PageHero({ eyebrow, title, lead, crumbs = [] }) {
  return (
    <section className="page-hero surface-dark">
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="container page-hero__inner">
        <nav className="page-hero__crumbs" aria-label="Навигационная цепочка">
          <Link to="/">Главная</Link>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <span className="page-hero__crumb" key={crumb.path}>
                <span className="page-hero__sep" aria-hidden="true">
                  /
                </span>
                {isLast ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link to={crumb.path}>{crumb.name}</Link>
                )}
              </span>
            )
          })}
        </nav>

        <Reveal className="page-hero__copy">
          {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
          <h1 className="page-hero__title">{title}</h1>
          {lead && <p className="page-hero__lead">{lead}</p>}
        </Reveal>
      </div>
    </section>
  )
}
