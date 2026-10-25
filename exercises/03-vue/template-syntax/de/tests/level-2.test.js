import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

describe('Vertiefung, die Verfügbarkeit', () => {
  it('markiert ausgeliehene Dinge mit der Klasse on-loan', () => {
    const onLoan = items.filter((item) => item.availableFrom !== null)
    expect(mount(App).findAll('.catalog li.on-loan')).toHaveLength(onLoan.length)
  })

  it('zeigt bei verfügbaren Dingen «Verfügbar»', () => {
    const drill = mount(App).findAll('.catalog li')[0]
    expect(drill.classes()).not.toContain('on-loan')
    expect(drill.find('.state').text()).toBe('Verfügbar')
  })

  it('zeigt bei ausgeliehenen Dingen, ab wann sie wieder da sind', () => {
    const tent = mount(App).findAll('.catalog li')[1]
    expect(tent.find('.state').text()).toBe('Wieder verfügbar ab 12.11.2026')
  })
})
