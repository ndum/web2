import { describe, expect, it } from 'vitest'

import { addCopies } from '../src/catalog.js'

const tent = () => ({
  name: '[%Zelt für vier Personen|Tent for four%]',
  availableFrom: null,
  parts: ['[%Heringe|Pegs%]', '[%Gestänge|Poles%]'],
})

describe('[%Knobelei, Kopien teilen nichts|Challenge, copies share nothing%]', () => {
  it('[%gibt jeder Kopie eigene Teile|gives every copy parts of its own%]', () => {
    const items = []
    addCopies(items, tent(), 2)
    items[0].parts.pop()
    expect(items[1].parts).toEqual(tent().parts)
  })

  it('[%lässt die Teile der Vorlage unverändert|leaves the parts of the template unchanged%]', () => {
    const thing = tent()
    const items = []
    addCopies(items, thing, 1)
    items[0].parts.push('[%Plane|Tarp%]')
    expect(thing.parts).toEqual(tent().parts)
  })

  it('[%übernimmt alle übrigen Angaben|keeps every other detail%]', () => {
    const items = []
    addCopies(items, tent(), 1)
    expect(items[0]).toEqual({ ...tent(), id: 1 })
  })
})
