import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import './section-heading.css'

/**
 * Standard section header: eyebrow kicker + display title + optional lead.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  light = false,
  as: Tag = 'h2',
  id,
}) {
  const cls = ['section-heading', `section-heading--${align}`, light && 'is-light']
    .filter(Boolean)
    .join(' ')

  return (
    <Reveal className={cls}>
      {eyebrow && (
        <Eyebrow light={light} center={align === 'center'}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag id={id} className="section-heading__title">
        {title}
      </Tag>
      {lead && <p className="section-heading__lead">{lead}</p>}
    </Reveal>
  )
}
