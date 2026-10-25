import { describe, it } from 'vitest'

import { validateRequest } from '@/rules.js'

// Write tests that fail as soon as validateRequest makes a mistake. Choose today yourself, for
// example validateRequest({ from: '2026-11-18', to: '2026-11-25' }, '2026-11-02').
describe('Einstieg, die Regeln einer Anfrage', () => {
  it.todo('nimmt eine Anfrage über sieben Tage an')
  it.todo('lehnt eine Anfrage über acht Tage ab')
  it.todo('lehnt einen ersten Tag in der Vergangenheit ab')
  it.todo('lehnt einen letzten Tag vor dem ersten ab')
})
