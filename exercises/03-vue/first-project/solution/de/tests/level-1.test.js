import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

describe('Einstieg, der Anfang des Katalogs', () => {
  it('zeigt den Namen des Vereins als Hauptüberschrift', () => {
    expect(mount(App).find('h1').text()).toBe('Lorraine Commons')
  })

  it('zeigt die Zahl der Dinge aus den Daten', () => {
    expect(mount(App).text()).toContain(`${items.length} Dinge im Katalog`)
  })
})
