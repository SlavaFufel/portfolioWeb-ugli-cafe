import { credentials } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import './home.css'

export default function Credentials() {
  return (
    <section className="section" aria-labelledby="credentials-title">
      <div className="container">
        <SectionHeading
          align="center"
          id="credentials-title"
          eyebrow="Признание"
          title="Репутация, подтверждённая независимо"
          lead="Статусы, рейтинги и членства, которые проверяет рынок, а не мы сами."
        />
        <Reveal className="credentials__grid mt-head" stagger={0.06}>
          {credentials.map((item) => (
            <div className="credentials__item" key={item.name}>
              <span className="credentials__name">{item.name}</span>
              <span className="credentials__detail">{item.detail}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
