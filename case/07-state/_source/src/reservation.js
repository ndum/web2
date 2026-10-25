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

// The draft of the form for a thing, it lives in sessionStorage and so only in this tab
export const draftKey = (id) => `lorraine-commons-draft-${id}`

// Checks a reservation request for a thing and returns one message per field with a problem,
// an empty object means the request is valid. Dates in the form 2026-11-18 compare like dates.
// The member comes from the login, the course API checks the same rules once more.
export function validateRequest({ from, to }, item, currentDay = today()) {
  const errors = {}
  if (from === '') {
    errors.from = '[%Wähl den ersten Tag.|Choose the first day.%]'
  } else if (from < currentDay) {
    errors.from = '[%Der erste Tag liegt in der Vergangenheit.|The first day is in the past.%]'
  } else if (item.availableFrom !== null && from < item.availableFrom) {
    errors.from = `[%Das Ding ist erst ab ${formatDate(item.availableFrom)} wieder da.|The thing is back only from ${formatDate(item.availableFrom)}.%]`
  } else if (!isOpeningDay(from)) {
    errors.from = '[%Abholen kannst du am Mittwoch oder am Samstag.|You can pick things up on Wednesday or Saturday.%]'
  }
  if (to === '') {
    errors.to = '[%Wähl den letzten Tag.|Choose the last day.%]'
  } else if (from !== '' && to < from) {
    errors.to = '[%Der letzte Tag liegt vor dem ersten.|The last day is before the first.%]'
  } else if (from !== '' && daysBetween(from, to) > MAX_DAYS) {
    errors.to = '[%Eine Ausleihe dauert höchstens sieben Tage.|A loan lasts at most seven days.%]'
  } else if (!isOpeningDay(to)) {
    errors.to = '[%Zurückbringen kannst du am Mittwoch oder am Samstag.|You can bring things back on Wednesday or Saturday.%]'
  }
  return errors
}
