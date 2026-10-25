import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { readSource, sourceFiles, visit } from './helpers.js'

// The tests replace the layer for the API, so they see how often the app asks for the catalog
vi.mock('@/api/items.js', () => ({
  fetchItems: vi.fn(async () => [{ id: 1, name: 'Test drill', category: 'Tools', deposit: 30, availableFrom: null }]),
}))

enableAutoUnmount(afterEach)
afterEach(() => vi.clearAllMocks())

describe('Going further, one layer for the API', () => {
  it('calls fetch only in src/api', () => {
    const offenders = sourceFiles().filter((file) => !file.startsWith('api/') && /\bfetch\(/.test(readSource(file)))
    expect(offenders).toEqual([])
  })

  it('loads the catalog with fetchItems', async () => {
    const { wrapper } = await visit('/')
    expect(wrapper.text()).toContain('Test drill')
  })

  it('asks for the catalog only once for both pages', async () => {
    const { fetchItems } = await import('@/api/items.js')
    const { wrapper, router } = await visit('/')
    await wrapper.find('.card button').trigger('click')
    await router.push('/favorites')
    await flushPromises()
    expect(wrapper.text()).toContain('Test drill')
    expect(fetchItems).toHaveBeenCalledTimes(1)
  })
})
