import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'

const KEY = 'lorraine-commons-search'

beforeEach(() => {
  localStorage.clear()
})

describe('Getting started, the search stays', () => {
  it('stores the search text under lorraine-commons-search', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('tent')
    await vi.waitFor(() => expect(localStorage.getItem(KEY)).toBe('tent'))
  })

  it('fills the search field with the stored text on start', async () => {
    localStorage.setItem(KEY, 'tent')
    const wrapper = mount(App)
    expect(wrapper.find('#search').element.value).toBe('tent')
    await vi.waitFor(() => expect(wrapper.findAll('.catalog li')).toHaveLength(3))
  })
})
