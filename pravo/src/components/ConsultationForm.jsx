import { useEffect, useRef, useState } from 'react'
import { services } from '../data/services'
import './consultation-form.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELD_ORDER = ['name', 'phone', 'email', 'consent']

const emptyValues = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
  consent: false,
  company: '', // honeypot — must stay empty
}

function validateField(field, values) {
  switch (field) {
    case 'name':
      return values.name.trim().length < 2 ? 'Укажите ваше имя' : ''
    case 'phone': {
      const digits = values.phone.replace(/\D/g, '')
      if (!digits) return 'Укажите телефон для связи'
      return digits.length < 10 ? 'Похоже, в номере не хватает цифр' : ''
    }
    case 'email':
      return values.email && !EMAIL_RE.test(values.email) ? 'Проверьте адрес e-mail' : ''
    case 'consent':
      return !values.consent ? 'Необходимо согласие на обработку данных' : ''
    default:
      return ''
  }
}

export default function ConsultationForm() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const formRef = useRef(null)

  // Mirror latest values into a ref so blur-time validation never reads a stale
  // closure (e.g. when change + blur are batched in the same React tick).
  const valuesRef = useRef(values)
  useEffect(() => {
    valuesRef.current = values
  }, [values])

  const update = (field, value) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value }
      if (touched[field]) {
        setErrors((e) => ({ ...e, [field]: validateField(field, next) }))
      }
      return next
    })
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, valuesRef.current) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitAttempted(true)

    // Honeypot: a bot filled the hidden field — pretend success, send nothing.
    if (values.company) {
      setStatus('success')
      return
    }

    const nextErrors = {}
    FIELD_ORDER.forEach((field) => {
      const msg = validateField(field, values)
      if (msg) nextErrors[field] = msg
    })
    setErrors(nextErrors)
    setTouched({ name: true, phone: true, email: true, consent: true })

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      formRef.current?.querySelector(`#cf-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')
    // Demo: no backend. In production POST `values` to a CRM / email endpoint
    // and re-validate + rate-limit + check the honeypot server-side.
    window.setTimeout(() => setStatus('success'), 900)
  }

  if (status === 'success') {
    return (
      <div className="consultation-form consultation-form--success" role="status" aria-live="polite">
        <span className="consultation-form__check" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3>Заявка отправлена</h3>
        <p>Спасибо за обращение. Адвокат свяжется с вами в течение рабочего дня для согласования времени консультации.</p>
        <button
          type="button"
          className="consultation-form__again"
          onClick={() => {
            setValues(emptyValues)
            setErrors({})
            setTouched({})
            setSubmitAttempted(false)
            setStatus('idle')
          }}
        >
          Отправить ещё одну заявку
        </button>
      </div>
    )
  }

  const summaryErrors = submitAttempted ? Object.values(errors).filter(Boolean) : []

  return (
    <form ref={formRef} className="consultation-form" onSubmit={handleSubmit} noValidate>
      {summaryErrors.length > 0 && (
        <div className="consultation-form__summary" role="alert">
          <strong>Проверьте, пожалуйста, форму:</strong>
          <ul>
            {summaryErrors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="consultation-form__row">
        <Field
          id="cf-name"
          name="name"
          label="Имя"
          required
          value={values.name}
          error={touched.name && errors.name}
          onChange={(v) => update('name', v)}
          onBlur={() => handleBlur('name')}
          autoComplete="name"
        />
        <Field
          id="cf-phone"
          name="phone"
          label="Телефон"
          type="tel"
          required
          value={values.phone}
          error={touched.phone && errors.phone}
          onChange={(v) => update('phone', v)}
          onBlur={() => handleBlur('phone')}
          autoComplete="tel"
          inputMode="tel"
          placeholder="+7 (___) ___-__-__"
        />
      </div>

      <div className="consultation-form__row">
        <Field
          id="cf-email"
          name="email"
          label="E-mail"
          type="email"
          value={values.email}
          error={touched.email && errors.email}
          onChange={(v) => update('email', v)}
          onBlur={() => handleBlur('email')}
          autoComplete="email"
          inputMode="email"
        />
        <div className="field">
          <label htmlFor="cf-service" className="field__label">
            Направление
          </label>
          <select
            id="cf-service"
            name="service"
            className="field__control"
            value={values.service}
            onChange={(e) => update('service', e.target.value)}
          >
            <option value="">Не выбрано</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message" className="field__label">
          Кратко о ситуации
        </label>
        <textarea
          id="cf-message"
          name="message"
          className="field__control"
          rows={4}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Опишите задачу — это поможет подготовиться к разговору"
        />
      </div>

      {/* Honeypot — hidden from users, catches bots. Must be checked server-side too. */}
      <div className="consultation-form__hp" aria-hidden="true">
        <label htmlFor="cf-company">Компания</label>
        <input
          id="cf-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className="field field--consent">
        <label className="consent">
          <input
            id="cf-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            onBlur={() => handleBlur('consent')}
            aria-invalid={Boolean(touched.consent && errors.consent)}
            aria-describedby={touched.consent && errors.consent ? 'cf-consent-error' : undefined}
          />
          <span>
            Согласен на обработку персональных данных и принимаю условия политики
            конфиденциальности.
          </span>
        </label>
        {touched.consent && errors.consent && (
          <p id="cf-consent-error" className="field__error">
            {errors.consent}
          </p>
        )}
      </div>

      <button type="submit" className="consultation-form__submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <span className="consultation-form__spinner" aria-hidden="true" />
            Отправляем…
          </>
        ) : (
          'Получить бесплатную консультацию'
        )}
      </button>
      <p className="consultation-form__note">Ответим в течение рабочего дня. Конфиденциально.</p>
    </form>
  )
}

function Field({ id, label, type = 'text', required = false, value, error, onChange, onBlur, ...rest }) {
  const errorId = `${id}-error`
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
        {required && (
          <span className="field__req">
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (обязательно)</span>
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        className={`field__control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}
