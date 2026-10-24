import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

describe('[%Vertiefung, die Verfügbarkeit|Going further, the availability%]', () => {
  it('[%markiert ausgeliehene Dinge mit der Klasse on-loan|marks things on loan with the class on-loan%]', () => {
    const onLoan = items.filter((item) => item.availableFrom !== null)
    expect(mount(App).findAll('.catalog li.on-loan')).toHaveLength(onLoan.length)
  })

  it('[%zeigt bei verfügbaren Dingen «Verfügbar»|shows "Available" for things that are in%]', () => {
    const drill = mount(App).findAll('.catalog li')[0]
    expect(drill.classes()).not.toContain('on-loan')
    expect(drill.find('.state').text()).toBe('[%Verfügbar|Available%]')
  })

  it('[%zeigt bei ausgeliehenen Dingen, ab wann sie wieder da sind|shows when things on loan are back%]', () => {
    const tent = mount(App).findAll('.catalog li')[1]
    expect(tent.find('.state').text()).toBe('[%Wieder verfügbar ab 12.11.2026|Available again from 11/12/2026%]')
  })
})
