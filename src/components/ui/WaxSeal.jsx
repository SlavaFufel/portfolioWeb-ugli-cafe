/**
 * Brass "1962" wax-seal medallion — the heritage stamp reprised across the
 * site (hero, location, footer). Purely decorative.
 */
export function WaxSeal({ className = '', size = 116 }) {
  return (
    <svg
      className={`wax-seal ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="58" fill="var(--accent-deep)" />
      <circle cx="60" cy="60" r="51" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
      <circle
        cx="60"
        cy="60"
        r="45"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="0.7"
        strokeDasharray="1 4"
        opacity="0.8"
      />
      <text
        x="60"
        y="36"
        textAnchor="middle"
        fill="var(--gold)"
        fontFamily="var(--font-body)"
        fontSize="8"
        fontWeight="600"
        letterSpacing="2.5"
      >
        EST.
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fill="var(--accent-soft)"
        fontFamily="var(--font-display)"
        fontSize="34"
        fontWeight="600"
        letterSpacing="1"
      >
        1962
      </text>
      <text
        x="60"
        y="94"
        textAnchor="middle"
        fill="var(--gold)"
        fontFamily="var(--font-body)"
        fontSize="7.5"
        fontWeight="600"
        letterSpacing="3"
      >
        МОСКВА
      </text>
      {/* tiny coffee bean */}
      <g transform="translate(60 104)">
        <ellipse cx="0" cy="0" rx="5" ry="3.2" fill="var(--gold)" />
        <path d="M-4 0 C -1 -2, 1 2, 4 0" stroke="var(--accent-deep)" strokeWidth="0.9" fill="none" />
      </g>
    </svg>
  )
}
