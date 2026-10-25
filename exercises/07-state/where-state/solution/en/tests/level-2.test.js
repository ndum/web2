import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import { remove, requests } from '../src/requests.js'

enableAutoUnmount(afterEach)

// The module keeps its requests from one test to the next, every test starts without any
beforeEach(() => {
  for (const request of [...requests.value]) remove(request.id)
})

describe('Going further, a module for the requests', () => {
  it('counts the requests in the header', async () => {
    const wrapper = mount(App)
    const buttons = wrapper.findAll('.catalog button.request')
    await buttons[0].trigger('click')
    await buttons[5].trigger('click')
    expect(wrapper.find('header').text()).toContain('Requests: 2')
  })

  it('shows the requests in the list and withdraws them', async () => {
    const wrapper = mount(App)
    await wrapper.findAll('.catalog button.request')[5].trigger('click')
    expect(wrapper.find('.requests').text()).toContain('Projector')
    await wrapper.find('.requests button').trigger('click')
    expect(wrapper.find('.requests').text()).toContain('No requests yet.')
    expect(wrapper.find('header').text()).toContain('Requests: 0')
  })
})
