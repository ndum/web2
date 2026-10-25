import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import RequestForm from '@/components/RequestForm.vue'

async function fill(from, to) {
  const wrapper = mount(RequestForm, { props: { today: '2026-11-02' } })
  await wrapper.find('#from').setValue(from)
  await wrapper.find('#to').setValue(to)
  return wrapper
}

describe('Going further, the form', () => {
  it('sends a valid request as an event', async () => {
    const wrapper = await fill('2026-11-18', '2026-11-21')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('send')).toEqual([[{ from: '2026-11-18', to: '2026-11-21' }]])
  })

  it('does not send a request with mistakes', async () => {
    const wrapper = await fill('2026-11-18', '2026-11-28')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('send')).toBeUndefined()
    expect(wrapper.find('.error').text()).toBe('A loan lasts at most seven days.')
  })

  it('shows messages only after sending', async () => {
    const wrapper = await fill('', '')
    expect(wrapper.find('.error').exists()).toBe(false)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.findAll('.error')).toHaveLength(2)
  })
})
