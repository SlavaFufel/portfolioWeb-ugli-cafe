import Seo from '../components/ui/Seo'
import { breadcrumbLd } from '../lib/seo'
import { partners } from '../data/site'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import TrustStats from '../components/home/TrustStats'
import Credentials from '../components/home/Credentials'
import ConsultationCta from '../components/home/ConsultationCta'
import './about-page.css'

const facts = [
  { label: 'Основано', value: '2008' },
  { label: 'Офис', value: 'Москва, «Федерация»' },
  { label: 'Команда', value: '24 юриста и адвоката' },
  { label: 'Практик', value: '6 направлений' },
]

export default function About() {
  return (
    <>
      <Seo
        title="О бюро"
        description="Адвокатское бюро «Корнилов и Партнёры» — команда из 24 юристов и адвокатов. 18 лет защищаем интересы бизнеса в арбитражных, налоговых и корпоративных спорах."
        path="/o-byuro"
        jsonLd={breadcrumbLd([{ name: 'О бюро', path: '/o-byuro' }])}
      />
      <PageHero
        eyebrow="О бюро"
        title="Команда, которой доверяют сложные дела"
        lead="Мы беремся за дела, где цена вопроса измеряется не только деньгами, но и будущим бизнеса."
        crumbs={[{ name: 'О бюро', path: '/o-byuro' }]}
      />

      <section className="section">
        <div className="container about-story">
          <Reveal className="about-story__main prose">
            <p className="about-story__lead">
              «Корнилов и Партнёры» — адвокатское бюро полного цикла. С 2008 года мы защищаем
              предпринимателей и компании в самых сложных спорах.
            </p>
            <p>
              Мы не беремся за всё подряд. Каждое обращение проходит честную оценку перспектив:
              если шансов нет, мы скажем об этом прямо. Если перспектива есть — выстраиваем
              стратегию и идём до результата через все необходимые инстанции.
            </p>
            <p>
              За плечами бюро — более 1 240 выигранных дел и активы клиентов на сумму свыше
              8,6 млрд рублей, которые удалось защитить. Но главное — это репутация, которой мы
              дорожим больше любого отдельного гонорара.
            </p>
          </Reveal>

          <Reveal as="aside" className="about-story__facts">
            <dl>
              {facts.map((fact) => (
                <div className="about-fact" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <TrustStats />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Партнёры"
            title="Кто будет вести ваше дело"
            lead="Практиками руководят адвокаты с многолетним опытом в своих направлениях."
          />
          <Reveal className="team mt-head" stagger={0.1}>
            {partners.map((person) => (
              <article className="team-card" key={person.name}>
                <span className="team-avatar" aria-hidden="true">
                  {person.initials}
                </span>
                <h3 className="team-name">{person.name}</h3>
                <span className="team-role">{person.role}</span>
                <p className="team-focus">{person.focus}</p>
                <p className="team-bio">{person.bio}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <Credentials />
      <ConsultationCta />
    </>
  )
}
