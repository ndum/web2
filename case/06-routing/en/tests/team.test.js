import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { signIn, signOut } from '../src/auth.js'
import router from '../src/router/index.js'
import { visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  signOut()
  localStorage.clear()
  document.body.innerHTML = ''
})

describe('The area of the team at the counter', () => {
  // Runs first, after the first visit the router replaces the function with the loaded component
  it('loads the code of the area only when someone opens it', () => {
    const team = router.getRoutes().find((route) => route.path === '/team' && route.children.length > 0)
    expect(typeof team.components.default).toBe('function')
  })

  it('shows the loans, the next return first', async () => {
    signIn('M-117')
    const wrapper = await visit('/team')
    expect(wrapper.find('h1').text()).toBe('Team at the counter')
    expect(wrapper.findAll('.loans li')).toHaveLength(11)
    expect(wrapper.find('.loans li').text()).toBe('Beer bench set, back from 11/3/2026')
    expect(document.title).toBe('Team at the counter · Lorraine Commons')
  })

  it('records a return, and the catalog shows the thing as available', async () => {
    signIn('M-117')
    const wrapper = await visit('/team/returns')
    const tent = wrapper.findAll('.returns li').find((entry) => entry.text().startsWith('Tent for four'))
    await tent.find('button').trigger('click')
    expect(wrapper.find('.message').text()).toBe('Return of Tent for four recorded.')
    expect(wrapper.findAll('.returns li')).toHaveLength(10)
    await wrapper.find('nav a[href="/"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('.summary').text()).toBe('50 of 60 things are in')
  })

  it('marks the current page in the navigation of the team', async () => {
    signIn('M-117')
    const wrapper = await visit('/team/returns')
    const links = wrapper.findAll('.team-nav a')
    expect(links.map((link) => link.attributes('href'))).toEqual(['/team', '/team/returns'])
    expect(links[1].attributes('aria-current')).toBe('page')
    expect(links[0].attributes('aria-current')).toBeUndefined()
  })

})
