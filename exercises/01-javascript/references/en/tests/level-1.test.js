import { describe, expect, it } from 'vitest'

import { addCopies } from '../src/catalog.js'

const tent = () => ({ name: 'Tent for four', availableFrom: null })

describe('Getting started, every copy is a thing of its own', () => {
  it('gives every copy the next free id', () => {
    const items = [{ id: 1, name: 'Drill', availableFrom: null }]
    addCopies(items, tent(), 2)
    expect(items.map((item) => item.id)).toEqual([1, 2, 3])
  })

  it('creates an object of its own for every copy', () => {
    const items = []
    addCopies(items, tent(), 2)
    expect(items[0]).not.toBe(items[1])
    items[0].availableFrom = '2026-11-14'
    expect(items[1].availableFrom).toBeNull()
  })

  it('leaves the thing passed in unchanged', () => {
    const thing = tent()
    addCopies([], thing, 2)
    expect(thing).toEqual(tent())
  })
})
