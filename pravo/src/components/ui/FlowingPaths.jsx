import './flowing-paths.css'

// Path generator ported from the "Background Paths" component. Each curve is
// normalised via pathLength="1" so the CSS dash animation works regardless of
// its real length. Variation is deterministic (index-based) — no Math.random,
// so there is never a hydration/flicker surprise.
function buildPaths(position, count) {
  return Array.from({ length: count }, (_, i) => {
    const x = 5 * i * position
    return {
      id: i,
      d: `M-${380 - x} -${189 + i * 6}C-${380 - x} -${189 + i * 6} -${312 - x} ${216 - i * 6} ${152 - x} ${343 - i * 6}C${616 - x} ${470 - i * 6} ${684 - x} ${875 - i * 6} ${684 - x} ${875 - i * 6}`,
      width: 0.6 + i * 0.045,
      duration: 18 + ((i * 7) % 16),
      delay: -((i * 1.7) % 18),
      opacity: 0.05 + i * 0.013,
    }
  })
}

function PathLayer({ position, count, reverse = false }) {
  const paths = buildPaths(position, count)
  return (
    <svg
      className={`flowing-paths__svg ${reverse ? 'flowing-paths__svg--rev' : ''}`}
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths.map((p) => (
        <path
          key={p.id}
          className="flowing-paths__path"
          d={p.d}
          stroke="currentColor"
          strokeWidth={p.width}
          pathLength="1"
          style={{
            '--p-dur': `${p.duration}s`,
            '--p-delay': `${p.delay}s`,
            '--p-opacity': p.opacity,
          }}
        />
      ))}
    </svg>
  )
}

/**
 * Animated flowing gold filaments — the hero backdrop. Two mirrored layers
 * drift in opposite directions for a woven, living feel.
 */
export default function FlowingPaths({ count = 20 }) {
  return (
    <div className="flowing-paths" aria-hidden="true">
      <PathLayer position={1} count={count} />
      <PathLayer position={-1} count={count} reverse />
    </div>
  )
}
