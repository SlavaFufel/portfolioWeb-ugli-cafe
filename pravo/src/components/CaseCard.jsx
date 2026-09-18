import './case-card.css'

export default function CaseCard({ caseItem, featured = false }) {
  return (
    <article
      className={`case-card ${featured ? 'case-card--featured' : ''}`}
      aria-labelledby={`case-${caseItem.id}`}
    >
      <div className="case-card__meta">
        <span className="case-card__cat">{caseItem.category}</span>
        <span className="case-card__year tnum">{caseItem.year}</span>
      </div>

      <div className="case-card__metric">
        <span className="case-card__metric-value tnum">{caseItem.metric}</span>
        <span className="case-card__metric-label">{caseItem.metricLabel}</span>
      </div>

      <h3 id={`case-${caseItem.id}`} className="case-card__title">
        {caseItem.title}
      </h3>
      <p className="case-card__summary">{caseItem.summary}</p>
    </article>
  )
}
