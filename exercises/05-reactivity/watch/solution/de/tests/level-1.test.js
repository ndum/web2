import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'

const KEY = 'lorraine-commons-search'

beforeEach(() => {
  localStorage.clear()
})

describe('Einstieg, die Suche bleibt', () => {
  it('speichert den Suchtext unter lorraine-commons-search', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('zelt')
    await vi.waitFor(() => expect(localStorage.getItem(KEY)).toBe('zelt'))
  })

  it('füllt das Suchfeld beim Start mit dem gespeicherten Text', async () => {
    localStorage.setItem(KEY, 'zelt')
    const wrapper = mount(App)
    expect(wrapper.find('#search').element.value).toBe('zelt')
    await vi.waitFor(() => expect(wrapper.findAll('.catalog li')).toHaveLength(3))
  })
})
