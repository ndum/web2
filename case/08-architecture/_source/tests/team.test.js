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

describe('[%Der Bereich des Teams am Tresen|The area of the team at the counter%]', () => {
  // Runs first, after the first visit the router replaces the function with the loaded component
  it('[%lädt den Code des Bereichs erst, wenn ihn jemand öffnet|loads the code of the area only when someone opens it%]', () => {
    const team = router.getRoutes().find((route) => route.path === '/team' && route.children.length > 0)
    expect(typeof team.components.default).toBe('function')
  })

  it('[%zeigt die Ausleihen, die nächste Rückgabe zuerst|shows the loans, the next return first%]', async () => {
    const wrapper = await visit('/team', { member: 'M-117' })
    expect(wrapper.find('h1').text()).toBe('[%Team am Tresen|Team at the counter%]')
    expect(wrapper.findAll('.loans li')).toHaveLength(11)
    expect(wrapper.find('.loans li').text()).toBe('[%Festbankgarnitur, zurück ab 3.11.2026|Beer bench set, back from 11/3/2026%]')
    expect(document.title).toBe('[%Team am Tresen|Team at the counter%] · Lorraine Commons')
  })

  it('[%erfasst eine Rückgabe bei der API, und der Katalog zeigt das Ding als verfügbar|records a return at the API, and the catalog shows the thing as available%]', async () => {
    const wrapper = await visit('/team/returns', { member: 'M-117' })
    const tent = wrapper.findAll('.returns li').find((entry) => entry.text().startsWith('[%Zelt für vier Personen|Tent for four%]'))
    await tent.find('button').trigger('click')
    await flushPromises()
    expect(callsOf(api.fetch)).toContain('POST /items/2/return')
    expect(api.state.items[1].availableFrom).toBe(null)
    expect(wrapper.find('.message').text()).toBe('[%Rückgabe von Zelt für vier Personen erfasst.|Return of Tent for four recorded.%]')
    expect(wrapper.findAll('.returns li')).toHaveLength(10)
    await wrapper.find('nav a[href="/"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('.summary').text()).toBe('[%50 von 60 Dingen sind da|50 of 60 things are in%]')
  })

  it('[%markiert in der Navigation des Teams die aktuelle Seite|marks the current page in the navigation of the team%]', async () => {
    const wrapper = await visit('/team/returns', { member: 'M-117' })
    const links = wrapper.findAll('.team-nav a')
    expect(links.map((link) => link.attributes('href'))).toEqual(['/team', '/team/returns'])
    expect(links[1].attributes('aria-current')).toBe('page')
    expect(links[0].attributes('aria-current')).toBeUndefined()
  })
})
