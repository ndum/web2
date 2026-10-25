import items from '../../data/items.json'

// The members the stand-in knows, the same as those of the course API
const MEMBERS = [
  { number: 'M-117', name: 'Martina Hostettler', team: true },
  { number: 'M-204', name: 'member M-204', team: false },
]
const KEY = 'lorraine-commons-demo'
const NOT_SIGNED_IN = { error: 'Sign in first.' }

// A stand-in for the course API inside the browser, for the demo without a server. It answers like
// the HTTP adapter and keeps returns, login and requests in sessionStorage, so they last as long as
// the tab, as the session cookie of the course API does. It checks the login, the team and requests
// for days that are already taken. The other rules of a request stay with the form.
export function createMemoryApi(storage = sessionStorage) {
  const state = read()

  function read() {
    const empty = { returned: [], member: null, requests: [], next: 1 }
    try {
      return { ...empty, ...JSON.parse(storage.getItem(KEY)) }
    } catch {
      return empty
    }
  }

  // Every answer saves the state first, like a server that has written to its storage
  function answer(status, data = null) {
    storage.setItem(KEY, JSON.stringify(state))
    return Promise.resolve({ ok: status < 400, status, data })
  }

  const current = () => MEMBERS.find((member) => member.number === state.member) ?? null
  const withReturns = (item) => (state.returned.includes(item.id) ? { ...item, availableFrom: null } : item)

  return {
    loadItems: () => answer(200, items.map(withReturns)),

    recordReturn(id) {
      if (!current()?.team) return answer(403, { error: 'Only the team at the counter may do this.' })
      if (!state.returned.includes(id)) state.returned.push(id)
      return answer(200, withReturns(items.find((item) => item.id === id)))
    },

    restoreSession: () => (current() ? answer(200, current()) : answer(401, NOT_SIGNED_IN)),

    signIn(number) {
      const member = MEMBERS.find((entry) => entry.number === String(number).trim().toUpperCase())
      if (member === undefined) return answer(401, { error: 'We do not know this member number.' })
      state.member = member.number
      return answer(200, member)
    },

    signOut() {
      state.member = null
      return answer(204)
    },

    loadReservations() {
      if (!current()) return answer(401, NOT_SIGNED_IN)
      return answer(200, state.requests.filter((request) => request.member === state.member))
    },

    sendReservation(request) {
      if (!current()) return answer(401, NOT_SIGNED_IN)
      // Two requests for the same thing must not share a day
      const taken = state.requests.some(
        (other) => other.itemId === request.itemId && other.from <= request.to && request.from <= other.to,
      )
      if (taken) return answer(409, { error: 'The thing is already requested for some of these days.' })
      const reservation = { id: `R-${state.next++}`, member: state.member, ...request }
      state.requests.push(reservation)
      return answer(201, reservation)
    },

    withdrawReservation(id) {
      if (!current()) return answer(401, NOT_SIGNED_IN)
      const own = state.requests.some((request) => request.id === id && request.member === state.member)
      if (!own) return answer(404, { error: 'This request does not exist.' })
      state.requests = state.requests.filter((request) => request.id !== id)
      return answer(204)
    },
  }
}
