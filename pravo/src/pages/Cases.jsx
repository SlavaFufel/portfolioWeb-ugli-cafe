import Seo from '../components/ui/Seo'
import { breadcrumbLd } from '../lib/seo'
import { cases } from '../data/cases'
import PageHero from '../components/layout/PageHero'
import CaseCard from '../components/CaseCard'
import Reveal from '../components/ui/Reveal'
import ConsultationCta from '../components/home/ConsultationCta'

export default function Cases() {
  return (
    <>
      <Seo
        title="Кейсы и выигранные дела"
        description="Реальные дела адвокатского бюро «Корнилов и Партнёры»: снятые налоговые доначисления, защита от субсидиарной ответственности, взыскание задолженности, сделки M&A."
        path="/keysy"
        jsonLd={breadcrumbLd([{ name: 'Кейсы', path: '/keysy' }])}
      />
      <PageHero
        eyebrow="Кейсы"
        title="Выигранные дела"
        lead="Каждое дело — это конкретный результат для клиента: снятые требования, взысканные средства, сохранённый бизнес."
        crumbs={[{ name: 'Кейсы', path: '/keysy' }]}
      />

      <section className="section">
        <div className="container">
          <Reveal className="grid-3" stagger={0.07}>
            {cases.map((caseItem, idx) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} featured={idx === 0} />
            ))}
          </Reveal>
        </div>
      </section>

      <ConsultationCta />
    </>
  )
}
