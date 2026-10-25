import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SRC, stubCatalog, visit } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

const exists = (path) => existsSync(join(SRC, path))

describe('Einstieg, Ordner nach Features', () => {
  it('legt Seiten und Store in ihre Features', () => {
    expect(exists('features/catalog/CatalogView.vue')).toBe(true)
    expect(exists('features/favorites/FavoritesView.vue')).toBe(true)
    expect(exists('features/favorites/favoritesStore.js')).toBe(true)
  })

  it('räumt die Ordner nach Art der Dateien weg', () => {
    expect(exists('views')).toBe(false)
    expect(exists('stores')).toBe(false)
  })

  it('lässt gemeinsame Bausteine in components', () => {
    expect(exists('components/AppHeader.vue')).toBe(true)
    expect(exists('components/ItemCard.vue')).toBe(true)
  })

  it('zeigt den Katalog weiterhin', async () => {
    stubCatalog()
    const { wrapper } = await visit('/')
    expect(wrapper.findAll('.card')).toHaveLength(60)
  })
})
