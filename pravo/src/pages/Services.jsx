import Seo from '../components/ui/Seo'
import { breadcrumbLd, serviceListLd } from '../lib/seo'
import { services } from '../data/services'
import PageHero from '../components/layout/PageHero'
import ServiceCard from '../components/ServiceCard'
import Reveal from '../components/ui/Reveal'
import ConsultationCta from '../components/home/ConsultationCta'

export default function Services() {
  return (
    <>
      <Seo
        title="Услуги и цены"
        description="Юридические услуги адвокатского бюро: арбитраж, банкротство, налоговые споры, M&A, защита бизнеса, недвижимость. Стоимость — от и под задачу."
        path="/uslugi"
        jsonLd={[
          breadcrumbLd([{ name: 'Услуги', path: '/uslugi' }]),
          serviceListLd(services),
        ]}
      />
      <PageHero
        eyebrow="Услуги"
        title="Юридические услуги и стоимость"
        lead="Шесть практик с глубокой специализацией. Цены указаны как «от» — точную стоимость фиксируем в договоре после оценки дела."
        crumbs={[{ name: 'Услуги', path: '/uslugi' }]}
      />

      <section className="section">
        <div className="container">
          <Reveal className="grid-3" stagger={0.07}>
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Reveal>
          <Reveal as="p" className="prose" style={{ marginTop: 'var(--space-7)', color: 'var(--ink-faint)' }}>
            Стоимость зависит от сложности дела, числа инстанций и срочности. По части дел возможен
            гонорар успеха. Точную смету вы получаете до начала работы — без скрытых платежей.
          </Reveal>
        </div>
      </section>

      <ConsultationCta />
    </>
  )
}
