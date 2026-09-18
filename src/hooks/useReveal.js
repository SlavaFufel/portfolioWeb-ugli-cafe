import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'

/**
 * The page's single reveal vocabulary ("settle, not slide" / "heat rises").
 * Add data attributes to markup and this hook animates them on scroll:
 *
 *   data-reveal="title"      → clip-path line-wipe up from baseline (signature)
 *   data-reveal="rise"       → short rise + 1.5% scale settle
 *   data-reveal-group        → container whose [data-reveal-item] children stagger in
 *
 * All motion is gated behind prefers-reduced-motion via gsap.matchMedia, and
 * initial hidden states are applied at runtime only — so if JS never runs,
 * content stays fully visible (no FOUC, no inaccessible hidden content).
 *
 * @param {React.RefObject<HTMLElement>} scope  section root ref
 * @param {Array} deps  re-run dependencies
 */
export function useReveal(scope, deps = []) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return undefined

      const q = (sel) => Array.from(root.querySelectorAll(sel))
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        q('[data-reveal="title"]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 0 100% 0)', y: 16, opacity: 0 },
            {
              clipPath: 'inset(0 0 -3% 0)',
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 86%' },
            },
          )
        })

        q('[data-reveal="rise"]').forEach((el) => {
          const delay = parseFloat(el.dataset.revealDelay || '0')
          gsap.fromTo(
            el,
            { y: 24, opacity: 0, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: 'expo.out',
              delay,
              scrollTrigger: { trigger: el, start: 'top 88%' },
            },
          )
        })

        q('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal-item]')
          if (!items.length) return
          gsap.fromTo(
            items,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'expo.out',
              stagger: 0.07,
              scrollTrigger: { trigger: group, start: 'top 84%' },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope, dependencies: deps },
  )
}
