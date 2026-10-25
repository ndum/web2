import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { availableNames, countByCategory, overviewLines } from '../src/index.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('[%Übersicht für den Tresen|Overview for the counter%]', () => {
  it('[%nennt, wie viele Dinge da sind|says how many things are in%]', () => {
    expect(overviewLines(items)[0]).toBe('[%49 von 60 Dingen sind da.|49 of 60 things are in.%]')
  })

  it('[%nennt das Pfand der ausgeliehenen Dinge in Franken|states the deposits of the things on loan in francs%]', () => {
    // Intl puts a non-breaking space after CHF
    expect(overviewLines(items)[1].replace(/\s/g, ' ')).toBe('[%Für die 11 ausgeliehenen Dinge liegen CHF 520.00 Pfand in der Kasse.|For the 11 things on loan, the cash box holds CHF 520.00 in deposits.%]')
  })

  it('[%zählt die Dinge pro Kategorie|counts the things per category%]', () => {
    expect(countByCategory(items)).toEqual({
      [%Werkzeug|Tools%]: 10,
      [%Garten|Garden%]: 10,
      [%Küche|Kitchen%]: 10,
      Camping: 10,
      [%Kinder|Kids%]: 10,
      [%Feste|Parties%]: 10,
    })
  })

  it('[%nennt das Werkzeug, das da ist, nach Namen sortiert|names the tools that are in, sorted by name%]', () => {
    expect(availableNames(items, '[%Werkzeug|Tools%]')).toEqual([%['Bohrmaschine', 'Kreissäge', 'Leiter', 'Schleifmaschine', 'Stichsäge', 'Tacker', 'Wasserwaage', 'Werkzeugkoffer']|['Circular saw', 'Drill', 'Jigsaw', 'Ladder', 'Sander', 'Spirit level', 'Staple gun', 'Toolbox']%])
  })
})
