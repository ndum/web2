import { describe, expect, it } from 'vitest'

import { addCopies } from '../src/catalog.js'

const tent = () => ({
  name: 'Tent for four',
  availableFrom: null,
  parts: ['Pegs', 'Poles'],
})

describe('Challenge, copies share nothing', () => {
  it('gives every copy parts of its own', () => {
    const items = []
    addCopies(items, tent(), 2)
    items[0].parts.pop()
    expect(items[1].parts).toEqual(tent().parts)
  })

  it('leaves the parts of the template unchanged', () => {
    const thing = tent()
    const items = []
    addCopies(items, thing, 1)
    items[0].parts.push('Tarp')
    expect(thing.parts).toEqual(tent().parts)
  })

  it('keeps every other detail', () => {
    const items = []
    addCopies(items, tent(), 1)
    expect(items[0]).toEqual({ ...tent(), id: 1 })
  })
})
