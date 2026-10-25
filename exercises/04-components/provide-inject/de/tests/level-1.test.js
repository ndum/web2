import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import App from '../src/App.vue'
import AppHeader from '../src/components/AppHeader.vue'
import { memberKey } from '../src/keys.js'

const member = ref({ number: 'M-204', name: 'Mitglied M-204' })

describe('Einstieg, das angemeldete Mitglied im Kopf', () => {
  it('zeigt das Mitglied, das ein Vorfahre bereitstellt', () => {
    const header = mount(AppHeader, { global: { provide: { [memberKey]: member } } })
    const line = header.find('.member')
    expect(line.exists(), 'Ergänze ein Element mit der Klasse member').toBe(true)
    expect(line.text()).toBe('Angemeldet als Mitglied M-204')
    // Without a signed-in member the line is missing
    expect(mount(AppHeader).find('.member').exists()).toBe(false)
  })

  it('bekommt das Mitglied von App', () => {
    expect(mount(App).find('.member').text()).toBe('Angemeldet als Martina Hostettler')
  })
})
