import { describe, it } from 'vitest'

import { useRequestsStore } from '@/stores/requests.js'

// Give every test a fresh Pinia with setActivePinia(createPinia()) and replace fetch with
// vi.stubGlobal, so the test decides how the API answers.
describe('Knobelei, der Store mit der API', () => {
  it.todo('schickt die Anfrage als JSON mit POST an die API')
  it.todo('übernimmt eine angenommene Anfrage in die Liste')
  it.todo('meldet eine Ablehnung und übernimmt nichts')
})
