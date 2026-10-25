import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Getting started, the number of things that are in', () => {
  it('shows how many things are in', () => {
    const summary = mount(App).find('.summary')
    expect(summary.exists(), 'Add an element with the class summary').toBe(true)
    expect(summary.text()).toBe('49 of 60 things are in')
  })
})
