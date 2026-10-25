// @vitest-environment node
// The configuration builds the alias from import.meta.url, which is a file URL only in Node
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

describe('Vite für die Entwicklung und die Veröffentlichung', () => {
  it('leitet Adressen unter /api ohne das Präfix an die Kurs-API weiter', () => {
    const api = config.server.proxy['/api']
    expect(api.target).toBe('http://localhost:3000')
    expect(api.rewrite('/api/de/items?delay=2000')).toBe('/de/items?delay=2000')
  })

  it('beschreibt die Adresse der Kurs-API in .env.example', () => {
    const example = readFileSync(new URL('../.env.example', import.meta.url), 'utf8')
    expect(example).toContain('VITE_API_URL=/api/de')
  })

  it('lässt Seiten wie /items/6 bei der App', () => {
    expect(Object.keys(config.server.proxy)).toEqual(['/api'])
  })

  it('stellt die Demo auf die Attrappe der API und den Hash-Modus', () => {
    const demo = readFileSync(new URL('../.env.demo', import.meta.url), 'utf8')
    expect(demo).toContain('VITE_API=memory')
    expect(demo).toContain('VITE_HISTORY=hash')
    const { scripts } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
    expect(scripts['build:demo']).toBe('vite build --mode demo')
  })

  it('baut die App mit dem absoluten Pfad, den der History-Modus braucht', () => {
    expect(config.base).toBe('/')
  })
})
