import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import searchSource from '../src/components/SearchBar.vue?raw'

let wrapper

afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

describe('Einstieg, der Fokus im Suchfeld', () => {
  it('setzt den Fokus beim Öffnen ins Suchfeld', () => {
    wrapper = mount(App, { attachTo: document.body })
    expect(document.activeElement).toBe(wrapper.find('#search').element)
  })

  it('holt das Feld mit useTemplateRef in onMounted', () => {
    expect(searchSource).toMatch(/useTemplateRef\(/)
    expect(searchSource).toMatch(/onMounted\(/)
  })
})
