import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'

let wrapper

afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

describe('Knobelei, der Dialog am Ende der Seite', () => {
  it('zeigt den Dialog ausserhalb des Formulars am Ende der Seite', async () => {
    wrapper = mount(App, { attachTo: document.body })
    await wrapper.find('form').trigger('submit')
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog).not.toBeNull()
    expect(dialog.closest('main'), 'Der Dialog steht noch im Hauptteil').toBeNull()
    expect(dialog.textContent).toContain('M-117')
  })

  it('verschwindet wieder beim Schliessen', async () => {
    wrapper = mount(App, { attachTo: document.body })
    await wrapper.find('form').trigger('submit')
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog.closest('main')).toBeNull()
    dialog.querySelector('button').click()
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })
})
