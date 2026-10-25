import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'

let wrapper

afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

async function openDialog() {
  wrapper = mount(App, { attachTo: document.body })
  await wrapper.findAll('.details')[0].trigger('click')
  expect(document.querySelector('[role="dialog"]')).not.toBeNull()
}

function press(key) {
  document.body.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
  return nextTick()
}

describe('Going further, Escape closes the dialog', () => {
  it('closes the dialog with Escape', async () => {
    await openDialog()
    await press('Escape')
    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it('keeps the dialog open for other keys', async () => {
    await openDialog()
    await press('Enter')
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
    await press('Escape')
    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it('removes the listener on window again when closing', async () => {
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    await openDialog()
    const call = add.mock.calls.find(([type]) => type === 'keydown')
    expect(call, 'No listener for keydown on window').toBeDefined()
    document.querySelector('[role="dialog"] button').click()
    await nextTick()
    expect(remove).toHaveBeenCalledWith('keydown', call[1])
  })
})
