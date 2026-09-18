import { stats } from '../../data/site'
import StatCounter from '../ui/StatCounter'
import Reveal from '../ui/Reveal'
import './home.css'

export default function TrustStats() {
  return (
    <section className="trust-stats" aria-label="Ключевые показатели бюро">
      <Reveal className="container trust-stats__grid" stagger={0.1}>
        {stats.map((stat) => (
          <div className="trust-stats__item" key={stat.label}>
            <span className="trust-stats__value">
              <StatCounter to={stat.to} suffix={stat.suffix} decimals={stat.decimals || 0} />
            </span>
            <span className="trust-stats__label">{stat.label}</span>
            <span className="trust-stats__note">{stat.note}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
