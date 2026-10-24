import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import App from '../src/App.vue'
import AppHeader from '../src/components/AppHeader.vue'
import { memberKey } from '../src/keys.js'

const member = ref({ number: 'M-204', name: 'member M-204' })

describe('Getting started, the signed-in member in the header', () => {
  it('shows the member an ancestor provides', () => {
    const header = mount(AppHeader, { global: { provide: { [memberKey]: member } } })
    const line = header.find('.member')
    expect(line.exists(), 'Add an element with the class member').toBe(true)
    expect(line.text()).toBe('Signed in as member M-204')
    // Without a signed-in member the line is missing
    expect(mount(AppHeader).find('.member').exists()).toBe(false)
  })

  it('gets the member from App', () => {
    expect(mount(App).find('.member').text()).toBe('Signed in as Martina Hostettler')
  })
})
