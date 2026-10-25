import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useAuthStore } from '../src/stores/auth.js'
import { useRequestsStore } from '../src/stores/requests.js'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Knobelei, nichts bleibt nach dem Abmelden', () => {
  it('setzt den Store mit $reset zurück', () => {
    useAuthStore().signIn('M-204')
    const requests = useRequestsStore()
    requests.add(2)
    requests.$reset()
    expect(requests.list).toEqual([])
  })

  it('leert die Anfragen beim Abmelden', () => {
    const auth = useAuthStore()
    const requests = useRequestsStore()
    auth.signIn('M-117')
    requests.add(6)
    auth.signOut()
    expect(requests.list).toEqual([])
  })
})
