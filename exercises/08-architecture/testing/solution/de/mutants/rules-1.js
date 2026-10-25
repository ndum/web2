// A loan lasts at most seven days
const MAX_DAYS = 7

// Days from one date to another, both in the form 2026-11-18
const daysBetween = (from, to) => (Date.parse(to) - Date.parse(from)) / 86_400_000

// Checks a request and returns one message per field with a problem. today comes in the form
// 2026-11-18, so a test can choose the day.
export function validateRequest({ from, to }, today) {
  const errors = {}
  if (from === '') {
    errors.from = 'Wähl den ersten Tag.'
  } else if (from < today) {
    errors.from = 'Der erste Tag liegt in der Vergangenheit.'
  }
  if (to === '') {
    errors.to = 'Wähl den letzten Tag.'
  } else if (from !== '' && to < from) {
    errors.to = 'Der letzte Tag liegt vor dem ersten.'
  } else if (from !== '' && daysBetween(from, to) > MAX_DAYS + 1) {
    errors.to = 'Eine Ausleihe dauert höchstens sieben Tage.'
  }
  return errors
}
