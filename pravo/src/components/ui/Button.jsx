import { Link } from 'react-router-dom'
import './button.css'

/**
 * Polymorphic button: renders a router <Link> (to), an <a> (href) or a <button>.
 * Variants: primary | cream | outline | outline-light | link
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['btn', `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(' ')

  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {withArrow && (
        <svg className="btn__arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    const rel = rest.target === '_blank' ? rest.rel ?? 'noopener noreferrer' : rest.rel
    return (
      <a href={href} className={cls} {...rest} rel={rel}>
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}
