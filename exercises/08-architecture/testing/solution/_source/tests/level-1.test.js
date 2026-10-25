import { describe, expect, it } from 'vitest'

import { validateRequest } from '@/rules.js'

// Monday, 2 November 2026
const today = '2026-11-02'
const check = (from, to) => validateRequest({ from, to }, today)

describe('[%Einstieg, die Regeln einer Anfrage|Getting started, the rules of a request%]', () => {
  it('[%nimmt eine Anfrage über sieben Tage an|accepts a request over seven days%]', () => {
    expect(check('2026-11-18', '2026-11-25')).toEqual({})
  })

  it('[%lehnt eine Anfrage über acht Tage ab|rejects a request over eight days%]', () => {
    expect(check('2026-11-18', '2026-11-26')).toHaveProperty('to')
  })

  it('[%lehnt einen ersten Tag in der Vergangenheit ab|rejects a first day in the past%]', () => {
    expect(check('2026-11-01', '2026-11-04')).toHaveProperty('from')
  })

  it('[%lehnt einen letzten Tag vor dem ersten ab|rejects a last day before the first%]', () => {
    expect(check('2026-11-18', '2026-11-14')).toHaveProperty('to')
  })
})
