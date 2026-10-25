import { mount } from '@vue/test-utils'
import { isReactive } from 'vue'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'

function cardOf(wrapper, name) {
  return wrapper.findAll('.card').find((card) => card.find('h2').text() === name)
}

describe('Knobelei, der Katalog in einem shallowRef', () => {
  it('hält den Katalog in einem shallowRef', () => {
    expect(appSource).toMatch(/shallowRef\(/)
    const wrapper = mount(App)
    expect(isReactive(wrapper.vm.catalog), 'Die Dinge im Katalog sind noch tief reaktiv').toBe(false)
  })

  it('zeigt den Knopf nur bei ausgeliehenen Dingen', () => {
    expect(mount(App).findAll('.returned')).toHaveLength(11)
  })

  it('zeigt ein zurückgebrachtes Ding als verfügbar', async () => {
    const wrapper = mount(App)
    const tent = cardOf(wrapper, 'Zelt für vier Personen')
    await tent.find('.returned').trigger('click')
    expect(tent.find('.state').text()).toBe('Verfügbar')
    expect(tent.find('.returned').exists()).toBe(false)
    expect(wrapper.find('.summary').text()).toBe('50 von 60 Dingen sind da')
  })
})
