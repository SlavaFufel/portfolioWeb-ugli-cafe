// Structured-data (JSON-LD) builders. Each returns a schema.org object that the
// <Seo> component serialises into a <script type="application/ld+json">.
import { firm, contacts } from '../data/site'

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${firm.domain}/#organization`,
  name: firm.legalName,
  alternateName: firm.name,
  url: firm.domain,
  telephone: contacts.phone,
  email: contacts.email,
  priceRange: '₽₽₽',
  foundingDate: '2008',
  areaServed: { '@type': 'Country', name: 'Россия' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Пресненская наб., 12',
    addressLocality: 'Москва',
    postalCode: '123112',
    addressCountry: 'RU',
  },
  geo: { '@type': 'GeoCoordinates', latitude: contacts.geo.lat, longitude: contacts.geo.lng },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '128',
    bestRating: '5',
  },
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${firm.domain}${it.path}`,
    })),
  }
}

export function articleLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: firm.legalName,
      url: firm.domain,
    },
    mainEntityOfPage: `${firm.domain}/blog/${post.slug}`,
    articleSection: post.category,
  }
}

export function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }
}

export function serviceListLd(services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Юридические услуги',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.short },
    })),
  }
}
