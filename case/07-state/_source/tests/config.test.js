// @vitest-environment node
// The configuration builds the alias from import.meta.url, which is a file URL only in Node
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

describe('[%Vite für die Entwicklung und die Veröffentlichung|Vite for development and publishing%]', () => {
  it('[%leitet Adressen unter /api ohne das Präfix an die Kurs-API weiter|forwards addresses below /api to the course API without the prefix%]', () => {
    const api = config.server.proxy['/api']
    expect(api.target).toBe('http://localhost:3000')
    expect(api.rewrite('/api/[%de|en%]/items?delay=2000')).toBe('/[%de|en%]/items?delay=2000')
  })

  it('[%beschreibt die Adresse der Kurs-API in .env.example|describes the address of the course API in .env.example%]', () => {
    const example = readFileSync(new URL('../.env.example', import.meta.url), 'utf8')
    expect(example).toContain('VITE_API_URL=/api/[%de|en%]')
  })

  it('[%lässt Seiten wie /items/6 bei der App|leaves pages such as /items/6 with the app%]', () => {
    expect(Object.keys(config.server.proxy)).toEqual(['/api'])
  })

  it('[%baut die App mit dem absoluten Pfad, den der History-Modus braucht|builds the app with the absolute path that history mode needs%]', () => {
    expect(config.base).toBe('/')
  })
})
