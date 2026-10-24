import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

describe('Going further, the availability', () => {
  it('marks things on loan with the class on-loan', () => {
    const onLoan = items.filter((item) => item.availableFrom !== null)
    expect(mount(App).findAll('.catalog li.on-loan')).toHaveLength(onLoan.length)
  })

  it('shows "Available" for things that are in', () => {
    const drill = mount(App).findAll('.catalog li')[0]
    expect(drill.classes()).not.toContain('on-loan')
    expect(drill.find('.state').text()).toBe('Available')
  })

  it('shows when things on loan are back', () => {
    const tent = mount(App).findAll('.catalog li')[1]
    expect(tent.find('.state').text()).toBe('Available again from 11/12/2026')
  })
})
