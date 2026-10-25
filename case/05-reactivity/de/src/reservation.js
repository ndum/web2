import { formatDate } from './format.js'

// Wednesday and Saturday, the days the shop is open, as numbers of getUTCDay
const OPENING_DAYS = [3, 6]
// A loan lasts at most seven days
const MAX_DAYS = 7

// Today in the time zone of the browser, in the form 2026-11-18 that date fields use
export function today(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export function isOpeningDay(date) {
  return OPENING_DAYS.includes(new Date(date).getUTCDay())
}

// Days from one date to another, both in the form 2026-11-18
export function daysBetween(from, to) {
  return (Date.parse(to) - Date.parse(from)) / 86_400_000
}

// Checks a reservation request for a thing and returns one message per field with a problem,
// an empty object means the request is valid. Dates in the form 2026-11-18 compare like dates.
export function validateRequest({ member, from, to }, item, currentDay = today()) {
  const errors = {}
  if (!/^M-\d{3}$/.test(member)) {
    errors.member = 'Die Mitgliedernummer hat die Form M-117.'
  }
  if (from === '') {
    errors.from = 'Wähl den ersten Tag.'
  } else if (from < currentDay) {
    errors.from = 'Der erste Tag liegt in der Vergangenheit.'
  } else if (item.availableFrom !== null && from < item.availableFrom) {
    errors.from = `Das Ding ist erst ab ${formatDate(item.availableFrom)} wieder da.`
  } else if (!isOpeningDay(from)) {
    errors.from = 'Abholen kannst du am Mittwoch oder am Samstag.'
  }
  if (to === '') {
    errors.to = 'Wähl den letzten Tag.'
  } else if (from !== '' && to < from) {
    errors.to = 'Der letzte Tag liegt vor dem ersten.'
  } else if (from !== '' && daysBetween(from, to) > MAX_DAYS) {
    errors.to = 'Eine Ausleihe dauert höchstens sieben Tage.'
  } else if (!isOpeningDay(to)) {
    errors.to = 'Zurückbringen kannst du am Mittwoch oder am Samstag.'
  }
  return errors
}
