// Today in the time zone of the browser, in the form 2026-11-18 that date fields use
export function today() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

// Days from one date to another, both in the form 2026-11-18
export function daysBetween(from, to) {
  return (Date.parse(to) - Date.parse(from)) / 86_400_000
}

// A date such as 2026-11-18 in the form of the language, formatted in UTC so the day is right everywhere
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' })
}
