// @vitest-environment node
// The configuration builds the alias from import.meta.url, which is a file URL only in Node
import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

describe('Vite for development and publishing', () => {
  it('forwards addresses below /api to the course API without the prefix', () => {
    const api = config.server.proxy['/api']
    expect(api.target).toBe('http://localhost:3000')
    expect(api.rewrite('/api/en/items?delay=2000')).toBe('/en/items?delay=2000')
  })

  it('describes the address of the course API in .env.example', () => {
    const example = readFileSync(new URL('../.env.example', import.meta.url), 'utf8')
    expect(example).toContain('VITE_API_URL=/api/en')
  })

  it('leaves pages such as /items/6 with the app', () => {
    expect(Object.keys(config.server.proxy)).toEqual(['/api'])
  })

  it('builds the app with the absolute path that history mode needs', () => {
    expect(config.base).toBe('/')
  })
})
