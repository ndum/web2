import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const modules = import.meta.glob(['../src/index.js', '../src/catalog.js'])

async function load(file, hint) {
  const loader = modules[`../src/${file}`]
  expect(loader, hint).toBeDefined()
  return loader()
}

const loadIndex = () => load('index.js', '[%Lege die Datei src/index.js an|Create the file src/index.js%]')

describe('[%Knobelei, ein Modul, das alles weitergibt|Challenge, a module that passes everything on%]', () => {
  it('[%exportiert alle Funktionen von catalog.js und format.js|exports every function of catalog.js and format.js%]', async () => {
    const index = await loadIndex()
    expect(Object.keys(index)).toEqual(expect.arrayContaining(['countAvailable', 'findById', 'formatDeposit']))
  })

  it('[%gibt dieselben Funktionen weiter, keine Kopien|passes on the same functions, no copies%]', async () => {
    const index = await loadIndex()
    const catalog = await load('catalog.js', '[%Lege zuerst die Datei src/catalog.js an|Create the file src/catalog.js first%]')
    expect(index.findById).toBe(catalog.findById)
  })

  it('[%lässt die Übersicht nur noch aus index.js importieren|has the overview import from index.js only%]', () => {
    const source = readFileSync(new URL('../src/overview.js', import.meta.url), 'utf8')
    const local = [...source.matchAll(/from '(\.[^']*)'/g)].map((match) => match[1])
    expect(local).toEqual(['./index.js'])
  })
})
