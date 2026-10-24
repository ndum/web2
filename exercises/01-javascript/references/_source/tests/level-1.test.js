import { describe, expect, it } from 'vitest'

import { addCopies } from '../src/catalog.js'

const tent = () => ({ name: '[%Zelt für vier Personen|Tent for four%]', availableFrom: null })

describe('[%Einstieg, jede Kopie ist ein eigenes Ding|Getting started, every copy is a thing of its own%]', () => {
  it('[%gibt jeder Kopie die nächste freie Nummer|gives every copy the next free id%]', () => {
    const items = [{ id: 1, name: '[%Bohrmaschine|Drill%]', availableFrom: null }]
    addCopies(items, tent(), 2)
    expect(items.map((item) => item.id)).toEqual([1, 2, 3])
  })

  it('[%legt für jede Kopie ein eigenes Objekt an|creates an object of its own for every copy%]', () => {
    const items = []
    addCopies(items, tent(), 2)
    expect(items[0]).not.toBe(items[1])
    items[0].availableFrom = '2026-11-14'
    expect(items[1].availableFrom).toBeNull()
  })

  it('[%lässt das übergebene Ding unverändert|leaves the thing passed in unchanged%]', () => {
    const thing = tent()
    addCopies([], thing, 2)
    expect(thing).toEqual(tent())
  })
})
