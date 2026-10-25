import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router/index.js'

enableAutoUnmount(afterEach)

// Goes to an address and shows App there, as if someone had typed the address into the browser
async function visit(path, options = {}) {
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router] }, ...options })
  await flushPromises()
  return wrapper
}

describe('[%Einstieg, das Layout des Teams|Getting started, the layout of the team%]', () => {
  it('[%zeigt unter /team die Überschrift und die Ausleihen|shows the heading and the loans at /team%]', async () => {
    const wrapper = await visit('/team')
    expect(wrapper.find('h1').text()).toBe('[%Team am Tresen|Team at the counter%]')
    expect(wrapper.findAll('.loans li')).toHaveLength(11)
    expect(wrapper.find('.loans li').text()).toBe('[%Festbankgarnitur, zurück ab 3.11.2026|Beer bench set, back from 11/3/2026%]')
  })

  it('[%baut /team aus dem Layout und einer Kindroute|builds /team from the layout and a child route%]', () => {
    const matched = router.resolve('/team').matched
    expect(matched, '[%/team hat noch keine Kindroute|/team has no child route yet%]').toHaveLength(2)
    expect(matched[0].components.default.__name).toBe('TeamLayout')
    expect(matched[1].components.default.__name).toBe('TeamLoansView')
  })
})
