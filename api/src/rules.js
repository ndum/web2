// The rules of the association for a reservation request, the same as in the app. The server
// checks them again, because anyone can send a request without the app.

// Wednesday and Saturday, the days the shop is open, as numbers of getUTCDay
const OPENING_DAYS = [3, 6]
// A loan lasts at most seven days
const MAX_DAYS = 7
const DATE = /^\d{4}-\d{2}-\d{2}$/

// Today in the time zone of the server, in the form 2026-11-18
export function today(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function isOpeningDay(date) {
  return OPENING_DAYS.includes(new Date(date).getUTCDay())
}

function daysBetween(from, to) {
  return (Date.parse(to) - Date.parse(from)) / 86_400_000
}

// Returns one message per field with a problem, an empty object means the request is valid
export function validateRequest({ from, to, note }, item, text, currentDay) {
  const errors = {}
  if (typeof from !== 'string' || !DATE.test(from)) {
    errors.from = text.fromMissing
  } else if (from < currentDay) {
    errors.from = text.fromPast
  } else if (item.availableFrom !== null && from < item.availableFrom) {
    errors.from = text.fromOnLoan(item.availableFrom)
  } else if (!isOpeningDay(from)) {
    errors.from = text.fromClosed
  }
  if (typeof to !== 'string' || !DATE.test(to)) {
    errors.to = text.toMissing
  } else if (errors.from === undefined && to < from) {
    errors.to = text.toBeforeFrom
  } else if (errors.from === undefined && daysBetween(from, to) > MAX_DAYS) {
    errors.to = text.toTooLate
  } else if (!isOpeningDay(to)) {
    errors.to = text.toClosed
  }
  if (note !== undefined && (typeof note !== 'string' || note.length > 200)) {
    errors.note = text.noteTooLong
  }
  return errors
}

// Two requests for the same thing overlap when one starts before the other ends
export function overlaps(a, b) {
  return a.itemId === b.itemId && a.from <= b.to && b.from <= a.to
}
