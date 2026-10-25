import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { createFilter } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))
const names = (criteria) => items.filter(createFilter(criteria)).map((item) => item.name)

describe('[%Knobelei, ein Filter aus Kriterien|Challenge, a filter built from criteria%]', () => {
  it('[%gibt eine Funktion zurück, die filter verwenden kann|returns a function that filter can use%]', () => {
    expect(createFilter({})).toBeTypeOf('function')
  })

  it('[%filtert nach Kategorie|filters by category%]', () => {
    expect(names({ category: '[%Garten|Garden%]' })).toHaveLength(10)
  })

  it('[%sucht im Namen ohne Rücksicht auf Gross- und Kleinschreibung|searches the name regardless of case%]', () => {
    expect(names({ query: '[%SÄGE|SAW%]' })).toEqual([%['Stichsäge', 'Kreissäge']|['Jigsaw', 'Circular saw']%])
  })

  it('[%zeigt mit onlyAvailable nur Dinge, die da sind|shows only things that are in with onlyAvailable%]', () => {
    expect(names({ category: 'Camping', onlyAvailable: true })).toHaveLength(8)
  })

  it('[%verbindet alle Kriterien|combines all criteria%]', () => {
    expect(names({ category: '[%Werkzeug|Tools%]', query: '[%schrauber|screw%]', onlyAvailable: true })).toEqual([])
    expect(names({ category: '[%Werkzeug|Tools%]', query: '[%schrauber|screw%]' })).toEqual(['[%Akkuschrauber|Cordless screwdriver%]'])
  })
})
