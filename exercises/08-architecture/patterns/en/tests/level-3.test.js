import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { sorters } from '@/sorters.js'

import { showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

const names = (wrapper) => wrapper.findAll('.card strong').map((name) => name.text())

describe('Challenge, strategies for sorting', () => {
  it('knows the strategies name, deposit and availability', () => {
    expect(Object.keys(sorters)).toEqual(['name', 'deposit', 'availability'])
    for (const sorter of Object.values(sorters)) {
      expect(sorter.label).toBeTypeOf('string')
      expect(sorter.compare).toBeTypeOf('function')
    }
  })

  it('builds the menu from the strategies', async () => {
    const wrapper = await showApp()
    expect(wrapper.findAll('#sort option').map((option) => option.text())).toEqual(Object.values(sorters).map((sorter) => sorter.label))
  })

  it('takes up a new strategy without a change of the template', async () => {
    sorters.reverse = { label: 'Name backwards', compare: (a, b) => sorters.name.compare(b, a) }
    try {
      const wrapper = await showApp()
      await wrapper.find('#sort').setValue('reverse')
      expect(names(wrapper)[0]).toBe('Wheelbarrow')
    } finally {
      delete sorters.reverse
    }
  })

  it('shows what is in first when sorted by availability', async () => {
    const wrapper = await showApp()
    await wrapper.find('#sort').setValue('availability')
    const last = names(wrapper).at(-1)
    expect(last).toBe('Party tent')
  })
})
