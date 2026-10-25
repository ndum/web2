import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useAuthStore } from '../src/stores/auth.js'
import { useRequestsStore } from '../src/stores/requests.js'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Challenge, nothing stays after signing out', () => {
  it('resets the store with $reset', () => {
    useAuthStore().signIn('M-204')
    const requests = useRequestsStore()
    requests.add(2)
    requests.$reset()
    expect(requests.list).toEqual([])
  })

  it('empties the requests on signing out', () => {
    const auth = useAuthStore()
    const requests = useRequestsStore()
    auth.signIn('M-117')
    requests.add(6)
    auth.signOut()
    expect(requests.list).toEqual([])
  })
})
