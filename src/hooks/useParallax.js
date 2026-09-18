import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'

/**
 * Gentle parallax for elements marked [data-parallax="<amount>"].
 * The element should sit inside an overflow-hidden frame with image headroom
 * (handled in CSS) so the drift never reveals an edge. Disabled under
 * reduced-motion. Scrub keeps it locked to scroll.
 */
export function useParallax(scope, deps = []) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return undefined
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        root.querySelectorAll('[data-parallax]').forEach((el) => {
          const amount = parseFloat(el.dataset.parallax || '10')
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-parallax-trigger]') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope, dependencies: deps },
  )
}
