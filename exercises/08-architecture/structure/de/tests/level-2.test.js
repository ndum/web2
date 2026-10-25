import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { readSource, sourceFiles, visit } from './helpers.js'

// The tests replace the layer for the API, so they see how often the app asks for the catalog
vi.mock('@/api/items.js', () => ({
  fetchItems: vi.fn(async () => [{ id: 1, name: 'Test-Bohrmaschine', category: 'Werkzeug', deposit: 30, availableFrom: null }]),
}))

enableAutoUnmount(afterEach)
afterEach(() => vi.clearAllMocks())

describe('Vertiefung, eine Schicht für die API', () => {
  it('ruft fetch nur in src/api auf', () => {
    const offenders = sourceFiles().filter((file) => !file.startsWith('api/') && /\bfetch\(/.test(readSource(file)))
    expect(offenders).toEqual([])
  })

  it('lädt den Katalog mit fetchItems', async () => {
    const { wrapper } = await visit('/')
    expect(wrapper.text()).toContain('Test-Bohrmaschine')
  })

  it('fragt für beide Seiten nur einmal nach dem Katalog', async () => {
    const { fetchItems } = await import('@/api/items.js')
    const { wrapper, router } = await visit('/')
    await wrapper.find('.card button').trigger('click')
    await router.push('/favorites')
    await flushPromises()
    expect(wrapper.text()).toContain('Test-Bohrmaschine')
    expect(fetchItems).toHaveBeenCalledTimes(1)
  })
})
