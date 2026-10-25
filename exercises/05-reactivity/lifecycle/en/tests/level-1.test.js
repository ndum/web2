import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import searchSource from '../src/components/SearchBar.vue?raw'

let wrapper

afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

describe('Getting started, the focus in the search field', () => {
  it('puts the focus into the search field on opening', () => {
    wrapper = mount(App, { attachTo: document.body })
    expect(document.activeElement).toBe(wrapper.find('#search').element)
  })

  it('gets the field with useTemplateRef in onMounted', () => {
    expect(searchSource).toMatch(/useTemplateRef\(/)
    expect(searchSource).toMatch(/onMounted\(/)
  })
})
