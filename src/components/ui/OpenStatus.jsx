import './open-status.css'

/**
 * Live open/closed indicator. Pure presentational — pass a status object
 * from useOpenNow(). Renders as a compact "chip" (hero) or "panel" (hours).
 * The breathing dot only animates while open (CSS keyframes, reduced-motion safe).
 */
export function OpenStatus({ status, variant = 'chip', className = '' }) {
  if (!status || !status.ready) return null

  const state = status.isOpen ? (status.closingSoon ? 'soon' : 'open') : 'closed'

  return (
    <div
      className={`open-status open-status--${variant} is-${state} ${className}`}
      role="status"
    >
      <span className="open-status__dot" aria-hidden="true">
        <span className="open-status__halo" />
      </span>
      <span className="open-status__text">
        <span className="open-status__label">{status.statusLabel}</span>
        <span className="open-status__detail">{status.detailLabel}</span>
      </span>
    </div>
  )
}
