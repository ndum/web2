import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { build } from 'vite'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// Builds the project with its vite.config.js into a fresh folder and returns a reader for its files
export async function buildProject() {
  const outDir = mkdtempSync(join(tmpdir(), 'web2-deploy-'))
  await build({ root: ROOT, logLevel: 'silent', build: { outDir, emptyOutDir: true } })
  return (file) => readFileSync(join(outDir, file), 'utf8')
}
