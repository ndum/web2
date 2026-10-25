import { describe, it } from 'vitest'

import { validateRequest } from '@/rules.js'

// Write tests that fail as soon as validateRequest makes a mistake. Choose today yourself, for
// example validateRequest({ from: '2026-11-18', to: '2026-11-25' }, '2026-11-02').
describe('Getting started, the rules of a request', () => {
  it.todo('accepts a request over seven days')
  it.todo('rejects a request over eight days')
  it.todo('rejects a first day in the past')
  it.todo('rejects a last day before the first')
})
