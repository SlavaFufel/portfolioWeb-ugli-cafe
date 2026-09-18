import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import './steam.css'

const WISPS = [
  { left: '18%', delay: 0, scale: 1 },
  { left: '50%', delay: 1.4, scale: 1.25 },
  { left: '78%', delay: 2.6, scale: 0.9 },
]

/**
 * Rising steam wisps — the page's "living heartbeat" over the hero cup.
 * Randomized sine drift, paused while offscreen, fully disabled under
 * reduced-motion (wisps simply stay invisible).
 */
export function Steam({ className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return undefined
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const wisps = gsap.utils.toArray(root.querySelectorAll('.steam__wisp'))
        const tweens = wisps.map((w, i) => {
          gsap.set(w, { transformOrigin: '50% 100%', opacity: 0 })
          return gsap.to(w, {
            keyframes: {
              opacity: [0, 0.45, 0.5, 0],
              yPercent: [20, -50, -100, -150],
              scaleY: [0.7, 1, 1.15, 1.3],
              x: [0, gsap.utils.random(-10, 10), gsap.utils.random(-14, 14), 0],
            },
            duration: gsap.utils.random(4.5, 7),
            ease: 'sine.inOut',
            repeat: -1,
            delay: WISPS[i].delay,
          })
        })

        // Pause when the hero scrolls out of view (perf + battery).
        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
        })

        return () => {
          tweens.forEach((t) => t.kill())
          st.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div className={`steam ${className}`} ref={ref} aria-hidden="true">
      {WISPS.map((w, i) => (
        <svg
          key={i}
          className="steam__wisp"
          style={{ left: w.left, transform: `scale(${w.scale})` }}
          width="40"
          height="120"
          viewBox="0 0 40 120"
          fill="none"
        >
          <path
            d="M20 118 C 8 96, 32 80, 20 58 C 8 36, 32 22, 20 2"
            stroke="rgba(251,246,234,0.9)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  )
}
