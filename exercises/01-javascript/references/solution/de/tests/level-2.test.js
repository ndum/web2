import { describe, expect, it } from 'vitest'

import { lend } from '../src/catalog.js'

const createItems = () => [
  { id: 1, name: 'Bohrmaschine', availableFrom: null },
  { id: 2, name: 'Zelt für vier Personen', availableFrom: null },
]

describe('Vertiefung, ausleihen ohne Nebenwirkung', () => {
  it('gibt eine neue Liste mit dem ausgeliehenen Ding zurück', () => {
    const items = createItems()
    const after = lend(items, 2, '2026-11-14')
    expect(after).not.toBe(items)
    expect(after[1]).toEqual({ id: 2, name: 'Zelt für vier Personen', availableFrom: '2026-11-14' })
  })

  it('lässt die alte Liste und ihre Dinge unverändert', () => {
    const items = createItems()
    lend(items, 2, '2026-11-14')
    expect(items).toEqual(createItems())
  })

  it('ersetzt nur das ausgeliehene Ding durch ein neues Objekt', () => {
    const items = createItems()
    const after = lend(items, 2, '2026-11-14')
    expect(after[0]).toBe(items[0])
    expect(after[1]).not.toBe(items[1])
  })
})
