// A date without a time such as 2026-11-12, formatted in UTC so the day is right everywhere
export function formatDate(date) {
  return new Date(date).toLocaleDateString('de-CH', { timeZone: 'UTC' })
}
