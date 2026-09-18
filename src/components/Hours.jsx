import { useRef } from 'react'
import { hours } from '../data/content'
import { useOpenNow } from '../hooks/useOpenNow'
import { OpenStatus } from './ui/OpenStatus'
import { useReveal } from '../hooks/useReveal'
import './hours.css'

export function Hours() {
  const scope = useRef(null)
  const status = useOpenNow(hours.schedule)
  useReveal(scope)

  return (
    <section className="section hours" id="hours" ref={scope}>
      <div className="container hours__grid">
        <div className="hours__intro">
          <p className="eyebrow">{hours.eyebrow}</p>
          <h2 className="hours__title" data-reveal="title">
            {hours.title}
          </h2>
          <p className="hours__note" data-reveal="rise">
            {hours.note}
          </p>

          <div className="hours__panel" data-reveal="rise">
            <OpenStatus status={status} variant="panel" />
          </div>
        </div>

        <div className="hours__ledger" data-reveal="rise">
          <p className="hours__ledger-label">Расписание</p>
          <table className="hours__table">
            <caption className="u-vh">Часы работы по дням недели</caption>
            <tbody>
              {hours.schedule.map((d, i) => {
                const isToday = status.ready && status.todayIndex === i
                return (
                  <tr key={d.day} className={`hours__row ${isToday ? 'is-today' : ''}`}>
                    <th scope="row" className="hours__day">
                      {d.day}
                      {isToday && <span className="hours__today">сегодня</span>}
                    </th>
                    <td className="hours__time">{d.closed ? 'выходной' : `${d.open} — ${d.close}`}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
