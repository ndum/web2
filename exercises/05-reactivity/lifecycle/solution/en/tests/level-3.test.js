import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'

let wrapper

afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

// The button of the second thing gets the focus and opens the dialog, as with the keyboard
async function openWithKeyboard() {
  wrapper = mount(App, { attachTo: document.body })
  const opener = wrapper.findAll('.details')[1]
  opener.element.focus()
  await opener.trigger('click')
  return opener.element
}

describe('Challenge, the focus in the dialog', () => {
  it('puts the focus on the first button in the dialog on opening', async () => {
    await openWithKeyboard()
    expect(document.activeElement).toBe(document.querySelector('[role="dialog"] button'))
  })

  it('gives the focus back to the button on closing', async () => {
    const opener = await openWithKeyboard()
    const close = document.querySelector('[role="dialog"] button')
    expect(document.activeElement).toBe(close)
    close.click()
    await nextTick()
    expect(document.activeElement).toBe(opener)
  })
})
