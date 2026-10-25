import { createTestingPinia } from '@pinia/testing'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router/index.js'
import { useAuthStore } from '../src/stores/auth.js'
import { useRequestsStore } from '../src/stores/requests.js'

enableAutoUnmount(afterEach)

let pinia

// A fresh Pinia for every test, the router guard uses it as well
beforeEach(() => {
  pinia = createPinia()
  setActivePinia(pinia)
})

async function visit(path) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, pinia] } })
  await flushPromises()
  return wrapper
}

describe('[%Vertiefung, ein Store für die Anfragen|Going further, a store for the requests%]', () => {
  it('[%führt die Anfragen jedes Mitglieds getrennt|keeps the requests of every member apart%]', () => {
    const auth = useAuthStore()
    const requests = useRequestsStore()
    auth.signIn('M-117')
    requests.add(6)
    requests.add(6)
    expect(requests.mine.map((request) => request.itemId)).toEqual([6])
    auth.signIn('M-204')
    expect(requests.mine).toEqual([])
    requests.add(2)
    expect(requests.mine.map((request) => request.itemId)).toEqual([2])
  })

  it('[%nimmt ohne Anmeldung keine Anfrage an|accepts no request without a login%]', () => {
    const requests = useRequestsStore()
    requests.add(6)
    expect(requests.list).toEqual([])
  })

  it('[%zählt die eigenen Anfragen im Kopf|counts the own requests in the header%]', async () => {
    useAuthStore().signIn('M-117')
    const wrapper = await visit('/items/6')
    await wrapper.find('button.request').trigger('click')
    expect(wrapper.find('header').text()).toContain('[%Anfragen|Requests%]: 1')
  })

  it('[%ruft beim Klick die Action des Stores auf|calls the action of the store on a click%]', async () => {
    // createTestingPinia replaces every action with a spy and takes the state to start from
    const testing = createTestingPinia({
      createSpy: vi.fn,
      initialState: { auth: { member: { number: 'M-117', name: 'Martina Hostettler', team: true } } },
    })
    await router.push('/items/6')
    const wrapper = mount(App, { global: { plugins: [router, testing] } })
    await flushPromises()
    await wrapper.find('button.request').trigger('click')
    expect(useRequestsStore(testing).add).toHaveBeenCalledWith(6)
  })
})
