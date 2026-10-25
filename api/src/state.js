// The data of the course API. The catalog and the members come from data/de and data/en, and
// what changes, returns and requests, is the same in both languages. With a storage folder the
// changes survive a restart in storage/state.json.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const LANGUAGES = ['de', 'en']

function readJson(url) {
  return JSON.parse(readFileSync(url, 'utf8'))
}

export function createState(dataDir, storageDir) {
  const seed = {}
  for (const lang of LANGUAGES) {
    seed[lang] = {
      items: readJson(new URL(`${lang}/items.json`, dataDir)),
      members: readJson(new URL(`${lang}/members.json`, dataDir)),
    }
  }
  const storageFile = storageDir && new URL('state.json', storageDir)
  let changes = { returned: [], reservations: [], nextReservation: 1 }
  if (storageFile) {
    try {
      changes = readJson(storageFile)
    } catch {
      // No stored state yet, the API starts from the data
    }
  }

  function save() {
    if (!storageFile) return
    mkdirSync(storageDir, { recursive: true })
    writeFileSync(storageFile, `${JSON.stringify(changes, null, 2)}\n`)
  }

  return {
    items(lang) {
      return seed[lang].items.map((item) => (changes.returned.includes(item.id) ? { ...item, availableFrom: null } : item))
    },
    item(lang, id) {
      return this.items(lang).find((item) => item.id === id)
    },
    member(lang, number) {
      return seed[lang].members.find((member) => member.number === number)
    },
    reservations() {
      return changes.reservations
    },
    addReservation(request) {
      const reservation = { id: `R-${changes.nextReservation}`, ...request }
      changes.nextReservation += 1
      changes.reservations.push(reservation)
      save()
      return reservation
    },
    removeReservation(id) {
      changes.reservations = changes.reservations.filter((reservation) => reservation.id !== id)
      save()
    },
    markReturned(id) {
      changes.returned.push(id)
      save()
    },
  }
}
