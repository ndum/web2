import { describe, expect, it } from 'vitest'

import { addCopies } from '../src/catalog.js'

const tent = () => ({
  name: 'Zelt für vier Personen',
  availableFrom: null,
  parts: ['Heringe', 'Gestänge'],
})

describe('Knobelei, Kopien teilen nichts', () => {
  it('gibt jeder Kopie eigene Teile', () => {
    const items = []
    addCopies(items, tent(), 2)
    items[0].parts.pop()
    expect(items[1].parts).toEqual(tent().parts)
  })

  it('lässt die Teile der Vorlage unverändert', () => {
    const thing = tent()
    const items = []
    addCopies(items, thing, 1)
    items[0].parts.push('Plane')
    expect(thing.parts).toEqual(tent().parts)
  })

  it('übernimmt alle übrigen Angaben', () => {
    const items = []
    addCopies(items, tent(), 1)
    expect(items[0]).toEqual({ ...tent(), id: 1 })
  })
})
