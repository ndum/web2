import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'

const KEY = 'lorraine-commons-search'

beforeEach(() => {
  localStorage.clear()
})

describe('[%Einstieg, die Suche bleibt|Getting started, the search stays%]', () => {
  it('[%speichert den Suchtext unter lorraine-commons-search|stores the search text under lorraine-commons-search%]', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('[%zelt|tent%]')
    await vi.waitFor(() => expect(localStorage.getItem(KEY)).toBe('[%zelt|tent%]'))
  })

  it('[%füllt das Suchfeld beim Start mit dem gespeicherten Text|fills the search field with the stored text on start%]', async () => {
    localStorage.setItem(KEY, '[%zelt|tent%]')
    const wrapper = mount(App)
    expect(wrapper.find('#search').element.value).toBe('[%zelt|tent%]')
    await vi.waitFor(() => expect(wrapper.findAll('.catalog li')).toHaveLength(3))
  })
})
