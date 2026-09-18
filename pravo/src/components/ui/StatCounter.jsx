import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

function formatNumber(value, decimals) {
  return value.toLocaleString('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Counts up to `to` when scrolled into view. Initial render shows the final
 * value, so reduced-motion users and the first paint are always correct.
 */
export default function StatCounter({ to, suffix = '', decimals = 0, duration = 2 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counter = { v: 0 }
        el.textContent = formatNumber(0, decimals)
        gsap.to(counter, {
          v: to,
          duration,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = formatNumber(counter.v, decimals)
          },
        })
      })

      return () => mm.revert()
    },
    { scope: ref, dependencies: [to, decimals, duration] },
  )

  return (
    <span className="stat-counter tnum" aria-label={`${formatNumber(to, decimals)}${suffix}`}>
      <span ref={ref} aria-hidden="true">
        {formatNumber(to, decimals)}
      </span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  )
}
