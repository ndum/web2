import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { showApp } from './helpers.js'

enableAutoUnmount(afterEach)
afterEach(() => {
  document.body.innerHTML = ''
})

describe('Going further, messages without focus', () => {
  it('announces the number of hits in a live region', async () => {
    const wrapper = showApp()
    const hits = wrapper.find('.hits')
    expect(hits.attributes('role')).toBe('status')
    await wrapper.find('#search').setValue('saw')
    expect(wrapper.find('.hits').text()).toBe('2 things found')
  })

  it('connects a message with its field', async () => {
    const wrapper = showApp()
    await wrapper.find('form').trigger('submit')
    const from = wrapper.find('#from')
    expect(from.attributes('aria-invalid')).toBe('true')
    const message = wrapper.find(`#${from.attributes('aria-describedby')}`)
    expect(message.text()).toBe('Choose the first day.')
  })

  it('removes the connection as soon as the field is right', async () => {
    const wrapper = showApp()
    await wrapper.find('form').trigger('submit')
    await wrapper.find('#from').setValue('2026-11-18')
    expect(wrapper.find('#from').attributes('aria-invalid')).toBe('false')
    expect(wrapper.find('#from').attributes('aria-describedby')).toBeUndefined()
  })
})
