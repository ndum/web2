import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import router from '../src/router/index.js'
import { visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  localStorage.clear()
  sessionStorage.clear()
  document.body.innerHTML = ''
})

describe('Eine Seite für jedes Ding und für unbekannte Adressen', () => {
  it('öffnet die Seite eines Dings direkt über ihre Adresse', async () => {
    const wrapper = await visit('/items/2')
    expect(wrapper.find('h1').text()).toBe('Zelt für vier Personen')
    expect(wrapper.find('.state').text()).toBe('Wieder verfügbar ab 12.11.2026')
    expect(wrapper.text().replace(/\s+/g, ' ')).toContain('CHF 50.00')
    expect(document.title).toBe('Zelt für vier Personen · Lorraine Commons')
  })

  it('führt mit dem Link zurück zum Katalog', async () => {
    const wrapper = await visit('/items/6')
    await wrapper.find('main a[href="/"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Katalog')
  })

  it('meldet eine Nummer, zu der es kein Ding gibt', async () => {
    const wrapper = await visit('/items/999')
    expect(wrapper.find('h1').text()).toBe('Ding nicht gefunden')
    expect(wrapper.text()).toContain('Dieses Ding gibt es nicht.')
  })

  it('zeigt für unbekannte Adressen eine eigene Seite', async () => {
    const wrapper = await visit('/mitglieder')
    expect(router.currentRoute.value.name).toBe('not-found')
    expect(wrapper.find('h1').text()).toBe('Seite nicht gefunden')
    expect(document.title).toBe('Seite nicht gefunden · Lorraine Commons')
    expect((await visit('/items/beamer')).find('h1').text()).toBe('Seite nicht gefunden')
  })

  it('zeigt den Verein und markiert ihn in der Navigation', async () => {
    const wrapper = await visit('/association')
    expect(wrapper.find('h1').text()).toBe('Verein')
    expect(wrapper.find('nav a[href="/association"]').attributes('aria-current')).toBe('page')
    expect(wrapper.find('nav a[href="/"]').attributes('aria-current')).toBeUndefined()
    expect(document.title).toBe('Verein · Lorraine Commons')
  })
})
