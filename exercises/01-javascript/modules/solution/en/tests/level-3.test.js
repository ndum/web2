import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

const modules = import.meta.glob(['../src/index.js', '../src/catalog.js'])

async function load(file, hint) {
  const loader = modules[`../src/${file}`]
  expect(loader, hint).toBeDefined()
  return loader()
}

const loadIndex = () => load('index.js', 'Create the file src/index.js')

describe('Challenge, a module that passes everything on', () => {
  it('exports every function of catalog.js and format.js', async () => {
    const index = await loadIndex()
    expect(Object.keys(index)).toEqual(expect.arrayContaining(['countAvailable', 'findById', 'formatDeposit']))
  })

  it('passes on the same functions, no copies', async () => {
    const index = await loadIndex()
    const catalog = await load('catalog.js', 'Create the file src/catalog.js first')
    expect(index.findById).toBe(catalog.findById)
  })

  it('has the overview import from index.js only', () => {
    const source = readFileSync(new URL('../src/overview.js', import.meta.url), 'utf8')
    const local = [...source.matchAll(/from '(\.[^']*)'/g)].map((match) => match[1])
    expect(local).toEqual(['./index.js'])
  })
})
