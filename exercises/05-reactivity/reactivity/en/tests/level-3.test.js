import { mount } from '@vue/test-utils'
import { isReactive } from 'vue'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

function cardOf(wrapper, name) {
  return wrapper.findAll('.card').find((card) => card.find('h2').text() === name)
}

describe('Challenge, the catalog in a shallowRef', () => {
  it('keeps the catalog in a shallowRef', () => {
    expect(appSource).toMatch(/shallowRef\(/)
    const wrapper = mount(App)
    expect(isReactive(wrapper.vm.catalog), 'The things in the catalog are still deeply reactive').toBe(false)
  })

  it('shows the button only on things on loan', () => {
    expect(mount(App).findAll('.returned')).toHaveLength(11)
  })

  it('shows a returned thing as available', async () => {
    const wrapper = mount(App)
    const tent = cardOf(wrapper, 'Tent for four')
    await tent.find('.returned').trigger('click')
    expect(tent.find('.state').text()).toBe('Available')
    expect(tent.find('.returned').exists()).toBe(false)
    expect(wrapper.find('.summary').text()).toBe('50 of 60 things are in')
  })
})
