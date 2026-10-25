import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import appSource from '../src/App.vue?raw'
import router from '../src/router/index.js'

enableAutoUnmount(afterEach)

// Goes to an address and shows App there, as if someone had typed the address into the browser
async function visit(path, options = {}) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] }, ...options })
  await flushPromises()
  return wrapper
}

describe('[%Knobelei, eine benannte View für Hinweise|Challenge, a named view for hints%]', () => {
  it('[%zeigt neben allen Seiten des Teams die Hinweise|shows the hints next to every page of the team%]', async () => {
    const wrapper = await visit('/team')
    expect(wrapper.find('aside h2').text()).toBe('[%Hinweise|Hints%]')
    await router.push('/team/returns')
    await flushPromises()
    expect(wrapper.find('aside h2').exists()).toBe(true)
  })

  it('[%lässt die Spalte im Katalog leer|leaves the column empty in the catalog%]', async () => {
    expect((await visit('/')).find('aside').exists()).toBe(false)
  })

  it('[%verwendet in App.vue eine RouterView mit dem Namen aside|uses a RouterView named aside in App.vue%]', () => {
    expect(appSource).toMatch(/<RouterView\s+name="aside"/)
  })
})
