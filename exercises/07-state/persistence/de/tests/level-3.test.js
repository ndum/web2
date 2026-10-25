import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router/index.js'

enableAutoUnmount(afterEach)

let pinia

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  pinia = createPinia()
  setActivePinia(pinia)
})

async function visit(path) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, pinia] } })
  await flushPromises()
  return wrapper
}

describe('Knobelei, ein Entwurf pro Tab', () => {
  it('hält den Entwurf im sessionStorage', async () => {
    const wrapper = await visit('/items/6')
    await wrapper.find('#note').setValue('Für den Vereinsabend')
    await flushPromises()
    expect(JSON.parse(sessionStorage.getItem('lorraine-commons-draft-6')).note).toBe('Für den Vereinsabend')
    expect(localStorage.getItem('lorraine-commons-draft-6')).toBe(null)
  })

  it('füllt das Formular nach dem Neuladen wieder', async () => {
    sessionStorage.setItem('lorraine-commons-draft-6', JSON.stringify({ from: '2026-11-04', to: '', note: 'Für den Vereinsabend' }))
    const wrapper = await visit('/items/6')
    expect(wrapper.find('#from').element.value).toBe('2026-11-04')
    expect(wrapper.find('#note').element.value).toBe('Für den Vereinsabend')
  })

  it('löscht den Entwurf nach dem Senden', async () => {
    const wrapper = await visit('/items/6')
    await wrapper.find('#note').setValue('Für den Vereinsabend')
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(sessionStorage.getItem('lorraine-commons-draft-6')).toBe(null)
  })
})
