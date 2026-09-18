import './ui.css'

export default function Eyebrow({ children, light = false, center = false, className = '' }) {
  const cls = ['eyebrow', light && 'eyebrow--light', center && 'eyebrow--center', className]
    .filter(Boolean)
    .join(' ')
  return <span className={cls}>{children}</span>
}
