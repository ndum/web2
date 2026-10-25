// @vitest-environment node
// The rules of the folders, checked on the sources, so they stay true when the app grows
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const SRC = fileURLToPath(new URL('../src', import.meta.url))

// Every file below src with its path relative to src, such as features/catalog/CatalogView.vue
function files(dir = SRC) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name)) : [relative(SRC, join(dir, entry.name)).replaceAll('\\', '/')],
  )
}

const sources = files().filter((file) => /\.(js|vue)$/.test(file))
const read = (file) => readFileSync(join(SRC, file), 'utf8')
// What a file imports, such as @/features/catalog or ./rules.js
const importsOf = (file) => [...read(file).matchAll(/\bfrom '([^']+)'|import\('([^']+)'\)/g)].map((match) => match[1] ?? match[2])
const featureOf = (file) => file.match(/^features\/([^/]+)\//)?.[1]

describe('[%Regeln der Architektur|Rules of the architecture%]', () => {
  it('[%ruft fetch nur in der Schicht für die API auf|calls fetch only in the layer for the API%]', () => {
    const offenders = sources.filter((file) => !file.startsWith('api/') && /\bfetch\(/.test(read(file)))
    expect(offenders).toEqual([])
  })

  it('[%hält gemeinsamen Code frei von Features, Layout und Router|keeps shared code free of features, layout and router%]', () => {
    const shared = sources.filter((file) => /^(api|components|composables|utils)\//.test(file))
    const offenders = shared.filter((file) => importsOf(file).some((target) => /^@\/(features|layout|router)\b/.test(target)))
    expect(offenders).toEqual([])
  })

  it('[%erreicht andere Features nur über ihre index.js|reaches other features only through their index.js%]', () => {
    const offenders = []
    for (const file of sources) {
      for (const target of importsOf(file)) {
        const match = target.match(/^@\/features\/([^/]+)(\/.*)?$/)
        if (match === null) continue
        const [, feature, deeper] = match
        // The router collects the routes of every feature
        const allowed = deeper === undefined || (file === 'router/index.js' && deeper === '/routes.js')
        if (!allowed && featureOf(file) !== feature) offenders.push(`${file} -> ${target}`)
      }
    }
    expect(offenders).toEqual([])
  })
})
