import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { availableNames } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('Einstieg, das Werkzeug, das da ist', () => {
  it('nennt die Namen des Werkzeugs, das da ist, nach Namen sortiert', () => {
    expect(availableNames(items, 'Werkzeug')).toEqual(['Bohrmaschine', 'Kreissäge', 'Leiter', 'Schleifmaschine', 'Stichsäge', 'Tacker', 'Wasserwaage', 'Werkzeugkoffer'])
  })

  it('sortiert nach den Regeln der Sprache', () => {
    const shelf = [
      { name: 'Zange', category: 'Werkzeug', availableFrom: null },
      { name: 'Ölkanne', category: 'Werkzeug', availableFrom: null },
      { name: 'Bohrer', category: 'Werkzeug', availableFrom: null },
    ]
    expect(availableNames(shelf, 'Werkzeug')).toEqual(['Bohrer', 'Ölkanne', 'Zange'])
  })

  it('gibt für eine Kategorie ohne Dinge eine leere Liste zurück', () => {
    expect(availableNames(items, 'Musik')).toEqual([])
  })

  it('verändert die Liste der Dinge nicht', () => {
    const before = structuredClone(items)
    availableNames(items, 'Werkzeug')
    expect(items).toEqual(before)
  })
})
