import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import { remove, requests } from '../src/requests.js'

enableAutoUnmount(afterEach)

// The module keeps its requests from one test to the next, every test starts without any
beforeEach(() => {
  for (const request of [...requests.value]) remove(request.id)
})

describe('Vertiefung, ein Modul für die Anfragen', () => {
  it('zählt die Anfragen in der Kopfzeile', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('.catalog button.request')
    await buttons[0].trigger('click')
    await buttons[5].trigger('click')
    expect(wrapper.find('header').text()).toContain('Anfragen: 2')
  })

  it('zeigt die Anfragen in der Liste und zieht sie zurück', async () => {
    const wrapper = mount(App)
    await wrapper.findAll('.catalog button.request')[5].trigger('click')
    expect(wrapper.find('.requests').text()).toContain('Beamer')
    await wrapper.find('.requests button').trigger('click')
    expect(wrapper.find('.requests').text()).toContain('Noch keine Anfragen.')
    expect(wrapper.find('header').text()).toContain('Anfragen: 0')
  })
})
