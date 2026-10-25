// @vitest-environment node
import { beforeAll, describe, expect, it } from 'vitest'

import { buildProject } from './helpers.js'

let read

beforeAll(async () => {
  read = await buildProject()
}, 60_000)

describe('[%Vertiefung, eine Rückfallseite für GitHub Pages|Going further, a fallback page for GitHub Pages%]', () => {
  it('[%legt beim Build eine 404.html an|creates a 404.html in the build%]', () => {
    expect(read('404.html').length).toBeGreaterThan(0)
  })

  it('[%macht 404.html zur Kopie von index.html|makes 404.html a copy of index.html%]', () => {
    expect(read('404.html')).toBe(read('index.html'))
  })
})
