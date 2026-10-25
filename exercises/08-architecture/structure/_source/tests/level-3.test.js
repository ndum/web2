import { describe, expect, it } from 'vitest'

import { readSource, sourceFiles } from './helpers.js'

// What a file imports, such as @/features/catalog or ./catalogStore.js
const importsOf = (file) => [...readSource(file).matchAll(/\bfrom '([^']+)'|import\('([^']+)'\)/g)].map((match) => match[1] ?? match[2])
const featureOf = (file) => file.match(/^features\/([^/]+)\//)?.[1]

describe('[%Knobelei, Features mit einer Schnittstelle|Challenge, features with an interface%]', () => {
  it('[%gibt jedes Feature über seine index.js frei|exposes every feature through its index.js%]', async () => {
    const catalog = await import('@/features/catalog/index.js')
    const favorites = await import('@/features/favorites/index.js')
    expect(catalog.useCatalogStore).toBeTypeOf('function')
    expect(favorites.useFavoritesStore).toBeTypeOf('function')
  })

  it('[%bringt die Routen jedes Features in routes.js mit|brings the routes of every feature in routes.js%]', async () => {
    const { catalogRoutes } = await import('@/features/catalog/routes.js')
    const { favoritesRoutes } = await import('@/features/favorites/routes.js')
    expect(catalogRoutes.map((route) => route.path)).toEqual(['/'])
    expect(favoritesRoutes.map((route) => route.path)).toEqual(['/favorites'])
  })

  it('[%greift auf andere Features nur über ihre index.js zu|reaches other features only through their index.js%]', () => {
    const offenders = []
    for (const file of sourceFiles().filter((name) => /\.(js|vue)$/.test(name))) {
      for (const target of importsOf(file)) {
        const match = target.match(/^@\/features\/([^/]+)(\/.*)?$/)
        if (match === null) continue
        const [, feature, deeper] = match
        const allowed = deeper === undefined || (file === 'router/index.js' && deeper === '/routes.js')
        if (!allowed && featureOf(file) !== feature) offenders.push(`${file} -> ${target}`)
      }
    }
    expect(offenders).toEqual([])
  })
})
