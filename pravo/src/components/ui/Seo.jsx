import { Helmet } from 'react-helmet-async'
import { firm } from '../../data/site'

/**
 * Per-route document head: title, description, canonical, Open Graph, and any
 * JSON-LD structured data (single object or array).
 */
export default function Seo({ title, description, path = '', type = 'website', jsonLd }) {
  const fullTitle = title ? `${title} — ${firm.name}` : `${firm.name} — адвокатское бюро в Москве`
  const url = `${firm.domain}${path}`
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={firm.name} />
      <meta property="og:locale" content="ru_RU" />
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  )
}
