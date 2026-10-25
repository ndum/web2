import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import router from '../src/router/index.js'
import { cardOf, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  localStorage.clear()
  sessionStorage.clear()
  document.body.innerHTML = ''
})

const dialog = () => document.body.querySelector('[role="dialog"]')

describe('Fokus und Tastatur', () => {
  it('setzt den Fokus im Katalog ins Suchfeld', async () => {
    const wrapper = await visit('/', { attachTo: document.body })
    expect(document.activeElement).toBe(wrapper.find('#search').element)
  })

  it('setzt den Fokus nach einer Navigation auf die Überschrift der neuen Seite', async () => {
    const wrapper = await visit('/', { attachTo: document.body })
    await wrapper.find('nav a[href="/association"]').trigger('click')
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.find('h1').element)
    expect(wrapper.find('h1').text()).toBe('Verein')
  })

  it('lässt den Fokus im Suchfeld, wenn der Katalog erscheint', async () => {
    const wrapper = await visit('/association', { attachTo: document.body })
    await wrapper.find('nav a[href="/"]').trigger('click')
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.find('#search').element)
  })

  it('setzt den Fokus nach dem Zurück-Knopf auf die Karte des Dings', async () => {
    const wrapper = await visit('/', { attachTo: document.body })
    await cardOf(wrapper, 'Beamer').find('a.reserve').trigger('click')
    await flushPromises()
    const back = new Promise((resolve) => {
      const remove = router.afterEach(() => {
        remove()
        resolve()
      })
    })
    router.back()
    await back
    await flushPromises()
    expect(document.activeElement).toBe(cardOf(wrapper, 'Beamer').find('a.reserve').element)
  })

  describe('im Dialog der Reservation', () => {
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
      return visit('/items/6', { member: 'M-117', attachTo: document.body })
    }

    it('setzt den Fokus auf «Bestätigen» und schliesst mit Escape', async () => {
      const wrapper = await open()
      const button = await send(wrapper)
      expect(document.activeElement).toBe(dialog().querySelector('button.confirm'))
      document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      await flushPromises()
      expect(dialog()).toBeNull()
      expect(document.activeElement).toBe(button)
    })

    it('setzt den Fokus nach dem Bestätigen auf die Überschrift des Formulars', async () => {
      const wrapper = await open()
      await send(wrapper)
      dialog().querySelector('button.confirm').click()
      await flushPromises()
      expect(document.activeElement.textContent).toBe('Reservation anfragen')
    })
  })
})
