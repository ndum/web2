import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('[%Einstieg, die Zahl der Dinge, die da sind|Getting started, the number of things that are in%]', () => {
  it('[%zeigt, wie viele Dinge da sind|shows how many things are in%]', () => {
    const summary = mount(App).find('.summary')
    expect(summary.exists(), '[%Ergänze ein Element mit der Klasse summary|Add an element with the class summary%]').toBe(true)
    expect(summary.text()).toBe('[%49 von 60 Dingen sind da|49 of 60 things are in%]')
  })
})
