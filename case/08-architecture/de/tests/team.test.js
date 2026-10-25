import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import router from '../src/router/index.js'
import { callsOf } from './fake-api.js'
import { api, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  localStorage.clear()
  sessionStorage.clear()
  document.body.innerHTML = ''
})

describe('Der Bereich des Teams am Tresen', () => {
  // Runs first, after the first visit the router replaces the function with the loaded component
  it('lädt den Code des Bereichs erst, wenn ihn jemand öffnet', () => {
    const team = router.getRoutes().find((route) => route.path === '/team' && route.children.length > 0)
    expect(typeof team.components.default).toBe('function')
  })

  it('zeigt die Ausleihen, die nächste Rückgabe zuerst', async () => {
    const wrapper = await visit('/team', { member: 'M-117' })
    expect(wrapper.find('h1').text()).toBe('Team am Tresen')
    expect(wrapper.findAll('.loans li')).toHaveLength(11)
    expect(wrapper.find('.loans li').text()).toBe('Festbankgarnitur, zurück ab 3.11.2026')
    expect(document.title).toBe('Team am Tresen · Lorraine Commons')
  })

  it('erfasst eine Rückgabe bei der API, und der Katalog zeigt das Ding als verfügbar', async () => {
    const wrapper = await visit('/team/returns', { member: 'M-117' })
    const tent = wrapper.findAll('.returns li').find((entry) => entry.text().startsWith('Zelt für vier Personen'))
    await tent.find('button').trigger('click')
    await flushPromises()
    expect(callsOf(api.fetch)).toContain('POST /items/2/return')
    expect(api.state.items[1].availableFrom).toBe(null)
    expect(wrapper.find('.message').text()).toBe('Rückgabe von Zelt für vier Personen erfasst.')
    expect(wrapper.findAll('.returns li')).toHaveLength(10)
    await wrapper.find('nav a[href="/"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('.summary').text()).toBe('50 von 60 Dingen sind da')
  })

  it('markiert in der Navigation des Teams die aktuelle Seite', async () => {
    const wrapper = await visit('/team/returns', { member: 'M-117' })
    const links = wrapper.findAll('.team-nav a')
    expect(links.map((link) => link.attributes('href'))).toEqual(['/team', '/team/returns'])
    expect(links[1].attributes('aria-current')).toBe('page')
    expect(links[0].attributes('aria-current')).toBeUndefined()
  })
})
