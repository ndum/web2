import { describe, it } from 'vitest'

import { useRequestsStore } from '@/stores/requests.js'

// Give every test a fresh Pinia with setActivePinia(createPinia()) and replace fetch with
// vi.stubGlobal, so the test decides how the API answers.
describe('Challenge, the store with the API', () => {
  it.todo('sends the request as JSON with POST to the API')
  it.todo('adds an accepted request to the list')
  it.todo('reports a refusal and adds nothing')
})
