import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { availableNames } from '../src/catalog.js'

const items = JSON.parse(readFileSync(new URL('../data/items.json', import.meta.url), 'utf8'))

describe('[%Einstieg, das Werkzeug, das da ist|Getting started, the tools that are in%]', () => {
  it('[%nennt die Namen des Werkzeugs, das da ist, nach Namen sortiert|names the tools that are in, sorted by name%]', () => {
    expect(availableNames(items, '[%Werkzeug|Tools%]')).toEqual([%['Bohrmaschine', 'Kreissäge', 'Leiter', 'Schleifmaschine', 'Stichsäge', 'Tacker', 'Wasserwaage', 'Werkzeugkoffer']|['Circular saw', 'Drill', 'Jigsaw', 'Ladder', 'Sander', 'Spirit level', 'Staple gun', 'Toolbox']%])
  })

  it('[%sortiert nach den Regeln der Sprache|sorts by the rules of the language%]', () => {
    const shelf = [
      { name: '[%Zange|tongs%]', category: '[%Werkzeug|Tools%]', availableFrom: null },
      { name: '[%Ölkanne|Oil can%]', category: '[%Werkzeug|Tools%]', availableFrom: null },
      { name: '[%Bohrer|awl%]', category: '[%Werkzeug|Tools%]', availableFrom: null },
    ]
    expect(availableNames(shelf, '[%Werkzeug|Tools%]')).toEqual([%['Bohrer', 'Ölkanne', 'Zange']|['awl', 'Oil can', 'tongs']%])
  })

  it('[%gibt für eine Kategorie ohne Dinge eine leere Liste zurück|returns an empty list for a category without things%]', () => {
    expect(availableNames(items, '[%Musik|Music%]')).toEqual([])
  })

  it('[%verändert die Liste der Dinge nicht|does not change the list of things%]', () => {
    const before = structuredClone(items)
    availableNames(items, '[%Werkzeug|Tools%]')
    expect(items).toEqual(before)
  })
})
