// @vitest-environment node
import { beforeAll, describe, expect, it } from 'vitest'

import { buildProject } from './helpers.js'

let read

beforeAll(async () => {
  read = await buildProject()
}, 60_000)

describe('Vertiefung, eine Rückfallseite für GitHub Pages', () => {
  it('legt beim Build eine 404.html an', () => {
    expect(read('404.html').length).toBeGreaterThan(0)
  })

  it('macht 404.html zur Kopie von index.html', () => {
    expect(read('404.html')).toBe(read('index.html'))
  })
})
