import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'

import LoanRow from '@/components/LoanRow.vue'
import TeamPage from '@/views/TeamPage.vue'

import { loans, stubLoans } from './helpers.js'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

async function showPage() {
  stubLoans()
  const wrapper = mount(TeamPage, { global: { plugins: [createPinia()] } })
  await flushPromises()
  return wrapper
}

describe('[%Vertiefung, Zustand und Props|Going further, state and props%]', () => {
  it('[%zeigt die Ausleihen, sobald der Store sie geladen hat|shows the loans as soon as the store has loaded them%]', async () => {
    const wrapper = await showPage()
    expect(wrapper.findAll('.loans li')).toHaveLength(loans.length)
  })

  it('[%meldet «Erinnern» als Event und ändert keine Prop|reports "Remind" as an event and changes no prop%]', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(LoanRow, { props: { loan: loans[0], reminded: false } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('remind')).toEqual([[loans[0].id]])
    expect(warn).not.toHaveBeenCalled()
  })

  it('[%zeigt nach dem Erinnern «erinnert» in der Zeile|shows "reminded" in the row after reminding%]', async () => {
    const wrapper = await showPage()
    await wrapper.find('.loans li button').trigger('click')
    expect(wrapper.find('.loans li .reminded').exists()).toBe(true)
  })
})
