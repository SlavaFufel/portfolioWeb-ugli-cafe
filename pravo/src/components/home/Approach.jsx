import { process } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import './home.css'

export default function Approach() {
  return (
    <section className="section approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHeading
          id="approach-title"
          eyebrow="Как мы работаем"
          title="Прозрачный процесс — от первого звонка до результата"
          lead="Вы всегда понимаете, на каком этапе находится дело и что происходит дальше."
        />
        <Reveal className="approach__steps mt-head" stagger={0.1}>
          {process.map((item) => (
            <div className="approach__step" key={item.step}>
              <span className="approach__num">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
