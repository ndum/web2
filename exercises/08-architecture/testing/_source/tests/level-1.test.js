import { describe, it } from 'vitest'

import { validateRequest } from '@/rules.js'

// Write tests that fail as soon as validateRequest makes a mistake. Choose today yourself, for
// example validateRequest({ from: '2026-11-18', to: '2026-11-25' }, '2026-11-02').
describe('[%Einstieg, die Regeln einer Anfrage|Getting started, the rules of a request%]', () => {
  it.todo('[%nimmt eine Anfrage über sieben Tage an|accepts a request over seven days%]')
  it.todo('[%lehnt eine Anfrage über acht Tage ab|rejects a request over eight days%]')
  it.todo('[%lehnt einen ersten Tag in der Vergangenheit ab|rejects a first day in the past%]')
  it.todo('[%lehnt einen letzten Tag vor dem ersten ab|rejects a last day before the first%]')
})
