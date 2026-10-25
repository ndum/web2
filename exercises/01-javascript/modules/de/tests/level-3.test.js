import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const modules = import.meta.glob(['../src/index.js', '../src/catalog.js'])

async function load(file, hint) {
  const loader = modules[`../src/${file}`]
  expect(loader, hint).toBeDefined()
  return loader()
}

const loadIndex = () => load('index.js', 'Lege die Datei src/index.js an')

describe('Knobelei, ein Modul, das alles weitergibt', () => {
  it('exportiert alle Funktionen von catalog.js und format.js', async () => {
    const index = await loadIndex()
    expect(Object.keys(index)).toEqual(expect.arrayContaining(['countAvailable', 'findById', 'formatDeposit']))
  })

  it('gibt dieselben Funktionen weiter, keine Kopien', async () => {
    const index = await loadIndex()
    const catalog = await load('catalog.js', 'Lege zuerst die Datei src/catalog.js an')
    expect(index.findById).toBe(catalog.findById)
  })

  it('lässt die Übersicht nur noch aus index.js importieren', () => {
    const source = readFileSync(new URL('../src/overview.js', import.meta.url), 'utf8')
    const local = [...source.matchAll(/from '(\.[^']*)'/g)].map((match) => match[1])
    expect(local).toEqual(['./index.js'])
  })
})
