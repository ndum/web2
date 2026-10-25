import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { signIn, signOut } from '../src/auth.js'
import { visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  signOut()
  localStorage.clear()
  document.body.innerHTML = ''
})

const dialog = () => document.body.querySelector('[role="dialog"]')

describe('Focus and keyboard', () => {
  it('puts the focus into the search field of the catalog', async () => {
    const wrapper = await visit('/', { attachTo: document.body })
    expect(document.activeElement).toBe(wrapper.find('#search').element)
  })

  it('moves the focus to the heading of the new page after a navigation', async () => {
    const wrapper = await visit('/', { attachTo: document.body })
    await wrapper.find('nav a[href="/association"]').trigger('click')
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.find('h1').element)
    expect(wrapper.find('h1').text()).toBe('Association')
  })

  it('leaves the focus in the search field when the catalog appears', async () => {
    const wrapper = await visit('/association', { attachTo: document.body })
    await wrapper.find('nav a[href="/"]').trigger('click')
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.find('#search').element)
  })

  describe('in the dialog of the reservation', () => {
    async function send(wrapper) {
      await wrapper.find('#from').setValue('2026-11-21')
      await wrapper.find('#to').setValue('2026-11-25')
      const button = wrapper.find('form button[type="submit"]').element
      button.focus()
      await wrapper.find('form').trigger('submit')
      return button
    }

    async function open() {
      vi.useFakeTimers({ toFake: ['Date'] })
      vi.setSystemTime(new Date('2026-11-02T09:00:00Z'))
      signIn('M-117')
      return visit('/items/6', { attachTo: document.body })
    }

    it('puts the focus on "Confirm" and closes with Escape', async () => {
      const wrapper = await open()
      const button = await send(wrapper)
      expect(document.activeElement).toBe(dialog().querySelector('button.confirm'))
      document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await flushPromises()
      expect(dialog()).toBeNull()
      expect(document.activeElement).toBe(button)
    })

    it('moves the focus to the heading of the form after confirming', async () => {
      const wrapper = await open()
      await send(wrapper)
      dialog().querySelector('button.confirm').click()
      await flushPromises()
      expect(document.activeElement.textContent).toBe('Request a reservation')
    })
  })
})
