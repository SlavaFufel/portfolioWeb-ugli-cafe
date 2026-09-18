import './emblem.css'

/**
 * Engraved seal monogram rendered as crisp SVG line-art (no raster, scales to
 * any DPI, ~2 KB). Classes are exposed so a parent timeline can animate parts.
 */
export default function Emblem({ className = '' }) {
  return (
    <svg
      className={`emblem ${className}`}
      viewBox="0 0 340 340"
      role="img"
      aria-label="Печать адвокатского бюро «Корнилов и Партнёры», основано в 2008 году"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <path id="arcTop" fill="none" d="M 31,170 A 139,139 0 0 1 309,170" />
        <path id="arcBottom" fill="none" d="M 309,170 A 139,139 0 0 1 31,170" />
      </defs>

      <g className="emblem__rings">
        <circle className="emblem__ring" cx="170" cy="170" r="158" />
        <circle className="emblem__ring emblem__ring--2" cx="170" cy="170" r="120" />
      </g>

      <g className="emblem__legend">
        <text className="emblem__text">
          <textPath href="#arcTop" startOffset="50%" textAnchor="middle">
            АДВОКАТСКОЕ&#160;&#160;БЮРО
          </textPath>
        </text>
        <text className="emblem__text">
          <textPath href="#arcBottom" startOffset="50%" textAnchor="middle">
            ОСНОВАНО&#160;&#160;В&#160;&#160;2008
          </textPath>
        </text>
      </g>

      {/* Side fleurons */}
      <g className="emblem__fleur" fill="var(--gold-500)">
        <path d="M 24,170 l 5,-5 5,5 -5,5 z" />
        <path d="M 306,170 l 5,-5 5,5 -5,5 z" />
      </g>

      {/* Center monogram */}
      <text className="emblem__mono" x="170" y="196" textAnchor="middle">
        <tspan>К</tspan>
        <tspan className="emblem__amp" dx="4" dy="-6">&amp;</tspan>
        <tspan dx="4" dy="6">П</tspan>
      </text>
      <text className="emblem__sub" x="170" y="232" textAnchor="middle">
        LEX · IUSTITIA · FIDES
      </text>
    </svg>
  )
}
