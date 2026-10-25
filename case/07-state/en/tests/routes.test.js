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

describe('A page for every thing and for unknown addresses', () => {
  it('opens the page of a thing directly from its address', async () => {
    const wrapper = await visit('/items/2')
    expect(wrapper.find('h1').text()).toBe('Tent for four')
    expect(wrapper.find('.state').text()).toBe('Available again from 11/12/2026')
    expect(wrapper.text().replace(/\s+/g, ' ')).toContain('CHF 50.00')
    expect(document.title).toBe('Tent for four · Lorraine Commons')
  })

  it('leads back to the catalog with the link', async () => {
    const wrapper = await visit('/items/6')
    await wrapper.find('main a[href="/"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('h1').text()).toBe('Catalog')
  })

  it('reports a number without a thing', async () => {
    const wrapper = await visit('/items/999')
    expect(wrapper.find('h1').text()).toBe('Thing not found')
    expect(wrapper.text()).toContain('This thing does not exist.')
  })

  it('shows a page of its own for unknown addresses', async () => {
    const wrapper = await visit('/members')
    expect(router.currentRoute.value.name).toBe('not-found')
    expect(wrapper.find('h1').text()).toBe('Page not found')
    expect(document.title).toBe('Page not found · Lorraine Commons')
    expect((await visit('/items/projector')).find('h1').text()).toBe('Page not found')
  })

  it('shows the association and marks it in the navigation', async () => {
    const wrapper = await visit('/association')
    expect(wrapper.find('h1').text()).toBe('Association')
    expect(wrapper.find('nav a[href="/association"]').attributes('aria-current')).toBe('page')
    expect(wrapper.find('nav a[href="/"]').attributes('aria-current')).toBeUndefined()
    expect(document.title).toBe('Association · Lorraine Commons')
  })
})
