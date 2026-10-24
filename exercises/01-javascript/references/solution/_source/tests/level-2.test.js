import { describe, expect, it } from 'vitest'

import { lend } from '../src/catalog.js'

const createItems = () => [
  { id: 1, name: '[%Bohrmaschine|Drill%]', availableFrom: null },
  { id: 2, name: '[%Zelt für vier Personen|Tent for four%]', availableFrom: null },
]

describe('[%Vertiefung, ausleihen ohne Nebenwirkung|Going further, lending without side effects%]', () => {
  it('[%gibt eine neue Liste mit dem ausgeliehenen Ding zurück|returns a new list with the lent thing%]', () => {
    const items = createItems()
    const after = lend(items, 2, '2026-11-14')
    expect(after).not.toBe(items)
    expect(after[1]).toEqual({ id: 2, name: '[%Zelt für vier Personen|Tent for four%]', availableFrom: '2026-11-14' })
  })

  it('[%lässt die alte Liste und ihre Dinge unverändert|leaves the old list and its things unchanged%]', () => {
    const items = createItems()
    lend(items, 2, '2026-11-14')
    expect(items).toEqual(createItems())
  })

  it('[%ersetzt nur das ausgeliehene Ding durch ein neues Objekt|replaces only the lent thing with a new object%]', () => {
    const items = createItems()
    const after = lend(items, 2, '2026-11-14')
    expect(after[0]).toBe(items[0])
    expect(after[1]).not.toBe(items[1])
  })
})
