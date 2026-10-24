import { describe, expect, it } from 'vitest'

import { addCopies } from '../src/catalog.js'

const tent = () => ({ name: 'Zelt für vier Personen', availableFrom: null })

describe('Einstieg, jede Kopie ist ein eigenes Ding', () => {
  it('gibt jeder Kopie die nächste freie Nummer', () => {
    const items = [{ id: 1, name: 'Bohrmaschine', availableFrom: null }]
    addCopies(items, tent(), 2)
    expect(items.map((item) => item.id)).toEqual([1, 2, 3])
  })

  it('legt für jede Kopie ein eigenes Objekt an', () => {
    const items = []
    addCopies(items, tent(), 2)
    expect(items[0]).not.toBe(items[1])
    items[0].availableFrom = '2026-11-14'
    expect(items[1].availableFrom).toBeNull()
  })

  it('lässt das übergebene Ding unverändert', () => {
    const thing = tent()
    addCopies([], thing, 2)
    expect(thing).toEqual(tent())
  })
})
