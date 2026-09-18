import Eyebrow from '../ui/Eyebrow'
import Reveal from '../ui/Reveal'
import ConsultationForm from '../ConsultationForm'
import './home.css'

const benefits = [
  'Первичная оценка дела — бесплатно и без обязательств',
  'Полная конфиденциальность с первого обращения',
  'Ответим в течение рабочего дня',
]

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ConsultationCta() {
  return (
    <section className="section cta-consult" id="consult" aria-labelledby="cta-title">
      <div className="cta-consult__bg" aria-hidden="true" />
      <div className="container cta-consult__inner">
        <Reveal className="cta-consult__copy">
          <Eyebrow light>Бесплатная консультация</Eyebrow>
          <h2 id="cta-title">Расскажите о деле — оценим перспективы честно</h2>
          <p>
            Опишите ситуацию, и адвокат свяжется с вами, чтобы обсудить возможные стратегии.
            Мы беремся за дело, только если видим в нём реальную перспективу.
          </p>
          <ul className="cta-consult__list">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ConsultationForm />
      </div>
    </section>
  )
}
