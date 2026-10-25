// @vitest-environment node
import { beforeAll, describe, expect, it } from 'vitest'

import config from '../vite.config.js'
import { buildProject } from './helpers.js'

let read

beforeAll(async () => {
  read = await buildProject()
}, 60_000)

describe('Einstieg, der Basispfad für GitHub Pages', () => {
  it('setzt den Basispfad auf den Namen des Repos', () => {
    expect(config.base).toBe('/lorraine-commons/')
  })

  it('verweist in index.html auf die Dateien unter dem Basispfad', () => {
    expect(read('index.html')).toMatch(/src="\/lorraine-commons\/assets\/index-[\w-]+\.js"/)
  })
})
