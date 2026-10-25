// Builds the demo of the case app into the built site, in both languages, below the base path of
// the site. The preview of a pull request sets SITE_BASE, the published site uses /web2/.
// Run it after the build of the site, which empties site/dist.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CASE = join(ROOT, 'case', '08-architecture')
const SITE = join(ROOT, 'site', 'dist')
const base = process.env.SITE_BASE ?? '/web2/'

if (!existsSync(SITE)) {
  console.error('Build the site first, site/dist is missing.')
  process.exit(1)
}

for (const lang of ['de', 'en']) {
  const project = join(CASE, lang)
  // Vite of the project itself, started with Node, so no shell is needed on any system
  const vite = join(project, 'node_modules', 'vite', 'bin', 'vite.js')
  const args = ['build', '--mode', 'demo', '--base', `${base}demo/${lang}/`, '--outDir', join(SITE, 'demo', lang), '--emptyOutDir']
  const result = spawnSync(process.execPath, [vite, ...args], { cwd: project, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}
console.log(`The demo is in site/dist/demo/de and site/dist/demo/en below ${base}demo/`)
