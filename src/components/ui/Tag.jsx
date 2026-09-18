import './tag.css'

const TAG_MOD = {
  хит: 'hit',
  новинка: 'new',
  веган: 'vegan',
  острое: 'spicy',
  'без глютена': 'gf',
  'без лактозы': 'lf',
}

/** Menu label chip (веган / острое / хит / новинка / без глютена). */
export function Tag({ label }) {
  const mod = TAG_MOD[label] || 'default'
  return <span className={`tag tag--${mod}`}>{label}</span>
}
