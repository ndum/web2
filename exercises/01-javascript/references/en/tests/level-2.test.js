import { describe, expect, it } from 'vitest'

import { lend } from '../src/catalog.js'

const createItems = () => [
  { id: 1, name: 'Drill', availableFrom: null },
  { id: 2, name: 'Tent for four', availableFrom: null },
]

describe('Going further, lending without side effects', () => {
  it('returns a new list with the lent thing', () => {
    const items = createItems()
    const after = lend(items, 2, '2026-11-14')
    expect(after).not.toBe(items)
    expect(after[1]).toEqual({ id: 2, name: 'Tent for four', availableFrom: '2026-11-14' })
  })

  it('leaves the old list and its things unchanged', () => {
    const items = createItems()
    lend(items, 2, '2026-11-14')
    expect(items).toEqual(createItems())
  })

  it('replaces only the lent thing with a new object', () => {
    const items = createItems()
    const after = lend(items, 2, '2026-11-14')
    expect(after[0]).toBe(items[0])
    expect(after[1]).not.toBe(items[1])
  })
})
