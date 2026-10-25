// A loan lasts at most seven days
const MAX_DAYS = 7

// Days from one date to another, both in the form 2026-11-18
const daysBetween = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

// Checks a request and returns one message per field with a problem. today comes in the form
// 2026-11-18, so a test can choose the day.
export function validateRequest({ from, to }, today) {
  const errors = {}
  if (from === '') {
    errors.from = '[%Wähl den ersten Tag.|Choose the first day.%]'
  } else if (from < today) {
    errors.from = '[%Der erste Tag liegt in der Vergangenheit.|The first day is in the past.%]'
  }
  if (to === '') {
    errors.to = '[%Wähl den letzten Tag.|Choose the last day.%]'
  } else if (from !== '' && to < from) {
    errors.to = '[%Der letzte Tag liegt vor dem ersten.|The last day is before the first.%]'
  } else if (from !== '' && daysBetween(from, to) > MAX_DAYS) {
    errors.to = '[%Eine Ausleihe dauert höchstens sieben Tage.|A loan lasts at most seven days.%]'
  }
  return errors
}
