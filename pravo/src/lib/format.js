const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/** ISO date string → "12 мая 2026" */
export function formatDate(iso) {
  return dateFormatter.format(new Date(iso))
}
