import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Einstieg, die Zahl der Dinge, die da sind', () => {
  it('zeigt, wie viele Dinge da sind', () => {
    const summary = mount(App).find('.summary')
    expect(summary.exists(), 'Ergänze ein Element mit der Klasse summary').toBe(true)
    expect(summary.text()).toBe('49 von 60 Dingen sind da')
  })
})
