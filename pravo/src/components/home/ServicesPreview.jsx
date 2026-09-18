import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ServiceCard'
import Reveal from '../ui/Reveal'
import './home.css'

export default function ServicesPreview() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head-row">
          <SectionHeading
            id="services-title"
            eyebrow="Практики"
            title="Помогаем там, где цена ошибки высока"
            lead="Шесть направлений, в каждом из которых у бюро — глубокая специализация и судебная практика."
          />
          <Link to="/uslugi" className="section-head-row__link">
            Все услуги и цены
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <Reveal className="grid-3 mt-head" stagger={0.07}>
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} compact />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
