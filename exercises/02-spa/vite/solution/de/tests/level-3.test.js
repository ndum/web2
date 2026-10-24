import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'vite'
import { describe, expect, it } from 'vitest'

import config from '../vite.config.js'

const project = fileURLToPath(new URL('..', import.meta.url))
// A relative base works in every folder, an absolute one names the folder of the repo
const fitsSubfolder = (path) => path.startsWith('./') || path.startsWith('/lorraine-commons/')

describe('Knobelei, die App in einem Unterordner', () => {
  it('setzt einen Basispfad für einen Unterordner', () => {
    expect(config.base, 'Setze base in vite.config.js').toBeDefined()
    expect(fitsSubfolder(config.base)).toBe(true)
  })

  it('baut eine Seite, die ihr Skript im Unterordner findet', async () => {
    const outDir = await mkdtemp(join(tmpdir(), 'web2-build-'))
    try {
      await build({ root: project, logLevel: 'silent', build: { outDir, emptyOutDir: true } })
      const page = await readFile(join(outDir, 'index.html'), 'utf8')
      const script = /<script type="module"[^>]*src="([^"]+)"/.exec(page)?.[1] ?? ''
      expect(fitsSubfolder(script), script).toBe(true)
    } finally {
      await rm(outDir, { recursive: true, force: true })
    }
  }, 30_000)
})
