import Seo from '../components/ui/Seo'
import { breadcrumbLd, organizationLd, faqLd } from '../lib/seo'
import { contacts, faq } from '../data/site'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import ConsultationForm from '../components/ConsultationForm'
import Faq from '../components/Faq'
import './contacts-page.css'

function Icon({ name }) {
  const paths = {
    phone: 'M3 5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-.8-1l-3-.6a1 1 0 0 0-1 .3l-1 1a12 12 0 0 1-5-5l1-1a1 1 0 0 0 .3-1l-.6-3a1 1 0 0 0-1-.8H5a2 2 0 0 0-2 2z',
    mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
    pin: 'M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Contacts() {
  return (
    <>
      <Seo
        title="Контакты и консультация"
        description="Адвокатское бюро «Корнилов и Партнёры» в Москве. Телефон, e-mail, адрес офиса в башне «Федерация». Запишитесь на бесплатную консультацию."
        path="/kontakty"
        jsonLd={[
          breadcrumbLd([{ name: 'Контакты', path: '/kontakty' }]),
          organizationLd,
          faqLd(faq),
        ]}
      />
      <PageHero
        eyebrow="Контакты"
        title="Запишитесь на консультацию"
        lead="Опишите ситуацию в форме или позвоните напрямую — первичная оценка дела бесплатна."
        crumbs={[{ name: 'Контакты', path: '/kontakty' }]}
      />

      <section className="section">
        <div className="container contacts__grid">
          <Reveal className="contacts__info">
            <h2 className="contacts__title">Реквизиты для связи</h2>
            <ul className="contacts__list">
              <li>
                <span className="contacts__ic"><Icon name="phone" /></span>
                <span>
                  <span className="contacts__label">Телефон</span>
                  <a href={contacts.phoneHref} className="contacts__value">{contacts.phone}</a>
                </span>
              </li>
              <li>
                <span className="contacts__ic"><Icon name="mail" /></span>
                <span>
                  <span className="contacts__label">E-mail</span>
                  <a href={contacts.emailHref} className="contacts__value">{contacts.email}</a>
                </span>
              </li>
              <li>
                <span className="contacts__ic"><Icon name="pin" /></span>
                <span>
                  <span className="contacts__label">Офис</span>
                  <span className="contacts__value">{contacts.address}</span>
                </span>
              </li>
              <li>
                <span className="contacts__ic"><Icon name="clock" /></span>
                <span>
                  <span className="contacts__label">Часы работы</span>
                  <span className="contacts__value">{contacts.hours}</span>
                </span>
              </li>
            </ul>

            <div className="contacts__map" role="img" aria-label={`Расположение офиса: ${contacts.addressShort}`}>
              <span className="contacts__map-grid" aria-hidden="true" />
              <span className="contacts__pin" aria-hidden="true">
                <Icon name="pin" />
              </span>
              <span className="contacts__map-label">{contacts.addressShort}</span>
            </div>
          </Reveal>

          <div className="contacts__form">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ivory-100)' }} aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading
            align="center"
            id="faq-title"
            eyebrow="Вопросы"
            title="Частые вопросы"
            lead="Коротко отвечаем на то, что спрашивают чаще всего перед обращением."
          />
          <div className="contacts__faq">
            <Faq />
          </div>
        </div>
      </section>
    </>
  )
}
