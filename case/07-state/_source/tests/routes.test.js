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

describe('[%Eine Seite für jedes Ding und für unbekannte Adressen|A page for every thing and for unknown addresses%]', () => {
  it('[%öffnet die Seite eines Dings direkt über ihre Adresse|opens the page of a thing directly from its address%]', async () => {
    const wrapper = await visit('/items/2')
    expect(wrapper.find('h1').text()).toBe('[%Zelt für vier Personen|Tent for four%]')
    expect(wrapper.find('.state').text()).toBe('[%Wieder verfügbar ab 12.11.2026|Available again from 11/12/2026%]')
    expect(wrapper.text().replace(/\s+/g, ' ')).toContain('CHF 50.00')
    expect(document.title).toBe('[%Zelt für vier Personen|Tent for four%] · Lorraine Commons')
  })

  it('[%führt mit dem Link zurück zum Katalog|leads back to the catalog with the link%]', async () => {
    const wrapper = await visit('/items/6')
    await wrapper.find('main a[href="/"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('[%Katalog|Catalog%]')
  })

  it('[%meldet eine Nummer, zu der es kein Ding gibt|reports a number without a thing%]', async () => {
    const wrapper = await visit('/items/999')
    expect(wrapper.find('h1').text()).toBe('[%Ding nicht gefunden|Thing not found%]')
    expect(wrapper.text()).toContain('[%Dieses Ding gibt es nicht.|This thing does not exist.%]')
  })

  it('[%zeigt für unbekannte Adressen eine eigene Seite|shows a page of its own for unknown addresses%]', async () => {
    const wrapper = await visit('/[%mitglieder|members%]')
    expect(router.currentRoute.value.name).toBe('not-found')
    expect(wrapper.find('h1').text()).toBe('[%Seite nicht gefunden|Page not found%]')
    expect(document.title).toBe('[%Seite nicht gefunden|Page not found%] · Lorraine Commons')
    expect((await visit('/items/[%beamer|projector%]')).find('h1').text()).toBe('[%Seite nicht gefunden|Page not found%]')
  })

  it('[%zeigt den Verein und markiert ihn in der Navigation|shows the association and marks it in the navigation%]', async () => {
    const wrapper = await visit('/association')
    expect(wrapper.find('h1').text()).toBe('[%Verein|Association%]')
    expect(wrapper.find('nav a[href="/association"]').attributes('aria-current')).toBe('page')
    expect(wrapper.find('nav a[href="/"]').attributes('aria-current')).toBeUndefined()
    expect(document.title).toBe('[%Verein|Association%] · Lorraine Commons')
  })
})
