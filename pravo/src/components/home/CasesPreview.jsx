import { Link } from 'react-router-dom'
import { cases } from '../../data/cases'
import SectionHeading from '../ui/SectionHeading'
import CaseCard from '../CaseCard'
import Reveal from '../ui/Reveal'
import './home.css'

export default function CasesPreview() {
  const featured = cases.slice(0, 3)

  return (
    <section className="section" aria-labelledby="cases-title">
      <div className="container">
        <div className="section-head-row">
          <SectionHeading
            id="cases-title"
            eyebrow="Кейсы"
            title="Результат, который можно измерить"
            lead="Несколько дел из практики бюро. Цифры — это снятые требования и взысканные средства клиентов."
          />
          <Link to="/keysy" className="section-head-row__link">
            Все кейсы
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <Reveal className="grid-3 mt-head" stagger={0.08}>
          {featured.map((caseItem, idx) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} featured={idx === 0} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
