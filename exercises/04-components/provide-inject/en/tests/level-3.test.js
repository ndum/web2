import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'

let wrapper

afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

describe('Challenge, the dialog at the end of the page', () => {
  it('shows the dialog outside the form at the end of the page', async () => {
    wrapper = mount(App, { attachTo: document.body })
    await wrapper.find('form').trigger('submit')
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog).not.toBeNull()
    expect(dialog.closest('main'), 'The dialog is still inside the main part').toBeNull()
    expect(dialog.textContent).toContain('M-117')
  })

  it('disappears again when closed', async () => {
    wrapper = mount(App, { attachTo: document.body })
    await wrapper.find('form').trigger('submit')
    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog.closest('main')).toBeNull()
    dialog.querySelector('button').click()
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
  })
})
