import { useRef, useState } from 'react'
import { reservation } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { WaxSeal } from './ui/WaxSeal'
import './reservation.css'

const pad = (n) => String(n).padStart(2, '0')
const TIME_SLOTS = (() => {
  const slots = []
  for (let h = 8; h <= 22; h += 1) {
    slots.push(`${pad(h)}:00`)
    if (h < 22) slots.push(`${pad(h)}:30`)
  }
  return slots
})()

const MAX_GUESTS = 12
const MIN_GUESTS = 1
const EMPTY = { name: '', phone: '', date: '', time: '', notes: '' }

export function Reservation() {
  const scope = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [guests, setGuests] = useState(2)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  useReveal(scope)

  // Local YYYY-MM-DD; recomputed each render so it never goes stale across midnight.
  const today = new Date().toLocaleDateString('en-CA')

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Как к вам обращаться?'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) next.phone = 'Нужен номер для подтверждения брони'
    if (!form.date) next.date = 'Выберите дату'
    else if (form.date < today) next.date = 'Эта дата уже прошла'
    if (!form.time) next.time = 'Выберите время'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setDone(true)
      return
    }
    // Move focus to the first invalid field so it (and its error) is announced.
    const firstKey = ['name', 'phone', 'date', 'time'].find((k) => next[k])
    if (firstKey) document.getElementById(`resv-${firstKey}`)?.focus()
  }

  const reset = () => {
    setForm(EMPTY)
    setGuests(2)
    setErrors({})
    setDone(false)
  }

  const clampGuests = (n) => Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, n))

  return (
    <section className="section reservation" id="reservation" ref={scope}>
      <div className="container container--narrow">
        <div className="resv__slip">
          <span className="resv__watermark" aria-hidden="true">
            БРОНЬ
          </span>

          {!done ? (
            <>
              <header className="resv__head">
                <p className="eyebrow">{reservation.eyebrow}</p>
                <h2 className="resv__title" data-reveal="title">
                  {reservation.title}
                </h2>
                <p className="resv__subtitle" data-reveal="rise">
                  {reservation.subtitle}
                </p>
              </header>

              <form className="resv__form" onSubmit={onSubmit} noValidate>
                <div className="resv__field">
                  <label htmlFor="resv-name">Имя</label>
                  <input
                    id="resv-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={setField('name')}
                    placeholder="Анна"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                  />
                  {errors.name && (
                    <span className="resv__error" id="err-name" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="resv__field">
                  <label htmlFor="resv-phone">Телефон</label>
                  <input
                    id="resv-phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={setField('phone')}
                    placeholder="+7 ___ ___-__-__"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'err-phone' : undefined}
                  />
                  {errors.phone && (
                    <span className="resv__error" id="err-phone" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="resv__field">
                  <label htmlFor="resv-date">Дата</label>
                  <input
                    id="resv-date"
                    type="date"
                    required
                    min={today}
                    value={form.date}
                    onChange={setField('date')}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? 'err-date' : undefined}
                  />
                  {errors.date && (
                    <span className="resv__error" id="err-date" role="alert">
                      {errors.date}
                    </span>
                  )}
                </div>

                <div className="resv__field">
                  <label htmlFor="resv-time">Время</label>
                  <select
                    id="resv-time"
                    required
                    value={form.time}
                    onChange={setField('time')}
                    aria-invalid={!!errors.time}
                    aria-describedby={errors.time ? 'err-time' : undefined}
                  >
                    <option value="" disabled>
                      Выберите время
                    </option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <span className="resv__error" id="err-time" role="alert">
                      {errors.time}
                    </span>
                  )}
                </div>

                <div className="resv__field resv__field--guests">
                  <label id="guests-label">Гостей</label>
                  <div className="resv__stepper" role="group" aria-labelledby="guests-label">
                    <button
                      type="button"
                      className="resv__step"
                      onClick={() => setGuests((g) => clampGuests(g - 1))}
                      disabled={guests <= MIN_GUESTS}
                      aria-label="Меньше гостей"
                    >
                      −
                    </button>
                    <span className="resv__guests-value" aria-live="polite">
                      {guests}
                      {guests >= MAX_GUESTS ? '+' : ''}
                    </span>
                    <button
                      type="button"
                      className="resv__step"
                      onClick={() => setGuests((g) => clampGuests(g + 1))}
                      disabled={guests >= MAX_GUESTS}
                      aria-label="Больше гостей"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="resv__field resv__field--notes">
                  <label htmlFor="resv-notes">Пожелания</label>
                  <textarea
                    id="resv-notes"
                    rows={2}
                    value={form.notes}
                    onChange={setField('notes')}
                    placeholder="Столик у окна, детский стул, день рождения…"
                  />
                </div>

                <div className="resv__submit">
                  <button type="submit" className="btn">
                    Забронировать
                  </button>
                  <span className="resv__reassurance u-italic">{reservation.reassurance}</span>
                </div>
              </form>
            </>
          ) : (
            <div className="resv__success" role="status">
              <WaxSeal className="resv__stamp" size={120} />
              <p className="resv__stamp-label">{reservation.success.stamp}</p>
              <h2 className="resv__success-title">{reservation.success.title}</h2>
              <p className="resv__success-msg">{reservation.success.message}</p>
              <dl className="resv__summary">
                <div>
                  <dt>Имя</dt>
                  <dd>{form.name}</dd>
                </div>
                <div>
                  <dt>Когда</dt>
                  <dd>
                    {form.date}, {form.time}
                  </dd>
                </div>
                <div>
                  <dt>Гостей</dt>
                  <dd>{guests}</dd>
                </div>
              </dl>
              <button type="button" className="btn btn--ghost" onClick={reset}>
                Забронировать ещё
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
