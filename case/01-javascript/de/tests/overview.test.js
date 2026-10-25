import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { availableNames, countByCategory, overviewLines } from '../src/index.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('Übersicht für den Tresen', () => {
  it('nennt, wie viele Dinge da sind', () => {
    expect(overviewLines(items)[0]).toBe('49 von 60 Dingen sind da.')
  })

  it('nennt das Pfand der ausgeliehenen Dinge in Franken', () => {
    // Intl puts a non-breaking space after CHF
    expect(overviewLines(items)[1].replace(/\s/g, ' ')).toBe('Für die 11 ausgeliehenen Dinge liegen CHF 520.00 Pfand in der Kasse.')
  })

  it('zählt die Dinge pro Kategorie', () => {
    expect(countByCategory(items)).toEqual({
      Werkzeug: 10,
      Garten: 10,
      Küche: 10,
      Camping: 10,
      Kinder: 10,
      Feste: 10,
    })
  })

  it('nennt das Werkzeug, das da ist, nach Namen sortiert', () => {
    expect(availableNames(items, 'Werkzeug')).toEqual(['Bohrmaschine', 'Kreissäge', 'Leiter', 'Schleifmaschine', 'Stichsäge', 'Tacker', 'Wasserwaage', 'Werkzeugkoffer'])
  })
})
