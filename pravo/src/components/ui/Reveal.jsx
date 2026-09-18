import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

/**
 * Scroll-reveal wrapper. Fades/slides content up when it enters the viewport.
 * - Pass `stagger` (seconds) to animate the element's direct children instead.
 * - Respects prefers-reduced-motion: motion users get the animation, others
 *   see fully-visible content (the animation simply never runs).
 *
 * @param {object} props
 * @param {string} [props.as] - intrinsic tag to render (default 'div')
 * @param {number} [props.y] - vertical offset in px
 * @param {number} [props.delay]
 * @param {number} [props.duration]
 * @param {number} [props.stagger] - if set, animate children with this stagger
 */
export default function Reveal({
  as: Tag = 'div',
  y = 28,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      const targets = stagger ? Array.from(el.children) : el
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(targets, { opacity: 0, y })
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: el, start: 'top 84%', once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: ref, dependencies: [y, delay, duration, stagger] },
  )

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
