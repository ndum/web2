import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SRC, stubCatalog, visit } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

const exists = (path) => existsSync(join(SRC, path))

describe('[%Einstieg, Ordner nach Features|Getting started, folders by feature%]', () => {
  it('[%legt Seiten und Store in ihre Features|puts the pages and the store into their features%]', () => {
    expect(exists('features/catalog/CatalogView.vue')).toBe(true)
    expect(exists('features/favorites/FavoritesView.vue')).toBe(true)
    expect(exists('features/favorites/favoritesStore.js')).toBe(true)
  })

  it('[%räumt die Ordner nach Art der Dateien weg|removes the folders by kind of file%]', () => {
    expect(exists('views')).toBe(false)
    expect(exists('stores')).toBe(false)
  })

  it('[%lässt gemeinsame Bausteine in components|leaves shared building blocks in components%]', () => {
    expect(exists('components/AppHeader.vue')).toBe(true)
    expect(exists('components/ItemCard.vue')).toBe(true)
  })

  it('[%zeigt den Katalog weiterhin|still shows the catalog%]', async () => {
    stubCatalog()
    const { wrapper } = await visit('/')
    expect(wrapper.findAll('.card')).toHaveLength(60)
  })
})
