import { useState } from 'react'
import { faq } from '../data/site'
import './faq.css'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <div className="faq">
      {faq.map((item, i) => {
        const isOpen = open === i
        const panelId = `faq-panel-${i}`
        const btnId = `faq-btn-${i}`
        return (
          <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <h3 className="faq__q">
              <button
                id={btnId}
                type="button"
                className="faq__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} aria-labelledby={btnId} className="faq__panel" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
