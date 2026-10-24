import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

describe('[%Einstieg, der Anfang des Katalogs|Getting started, the start of the catalog%]', () => {
  it('[%zeigt den Namen des Vereins als Hauptüberschrift|shows the name of the association as the main heading%]', () => {
    expect(mount(App).find('h1').text()).toBe('Lorraine Commons')
  })

  it('[%zeigt die Zahl der Dinge aus den Daten|shows the number of things from the data%]', () => {
    expect(mount(App).text()).toContain(`${items.length} [%Dinge im Katalog|things in the catalog%]`)
  })
})
