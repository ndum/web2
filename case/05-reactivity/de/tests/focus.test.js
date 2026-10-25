import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'

let wrapper

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(items))))
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-11-02T09:00:00Z'))
})

afterEach(() => {
  wrapper.unmount()
  vi.unstubAllGlobals()
  vi.useRealTimers()
  location.hash = ''
  document.body.innerHTML = ''
})

async function start(hash) {
  location.hash = hash
  wrapper = mount(App, { attachTo: document.body })
  await flushPromises()
}

const dialog = () => document.body.querySelector('[role="dialog"]')

// Fills in the form on the page of the projector and sends it with the focus on its button
async function send() {
  await wrapper.find('#from').setValue('2026-11-21')
  await wrapper.find('#to').setValue('2026-11-25')
  const button = wrapper.find('form button[type="submit"]').element
  button.focus()
  await wrapper.find('form').trigger('submit')
  return button
}

describe('Fokus und Tastatur', () => {
  it('setzt den Fokus im Katalog ins Suchfeld', async () => {
    await start('#/')
    expect(document.activeElement).toBe(wrapper.find('#search').element)
  })

  it('setzt den Fokus im Dialog auf «Bestätigen» und schliesst ihn mit Escape', async () => {
    await start('#/items/6')
    const button = await send()
    expect(document.activeElement).toBe(dialog().querySelector('button.confirm'))
    document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(dialog()).toBeNull()
    expect(document.activeElement).toBe(button)
    expect(wrapper.find('#from').element.value).toBe('2026-11-21')
  })

  it('setzt den Fokus nach dem Bestätigen auf die Überschrift des Formulars', async () => {
    await start('#/items/6')
    await send()
    dialog().querySelector('button.confirm').click()
    await flushPromises()
    expect(dialog()).toBeNull()
    expect(document.activeElement.textContent).toBe('Reservation anfragen')
  })
})
