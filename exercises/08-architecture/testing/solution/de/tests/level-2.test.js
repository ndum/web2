import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import RequestForm from '@/components/RequestForm.vue'

async function fill(from, to) {
  const wrapper = mount(RequestForm, { props: { today: '2026-11-02' } })
  await wrapper.find('#from').setValue(from)
  await wrapper.find('#to').setValue(to)
  return wrapper
}

describe('Vertiefung, das Formular', () => {
  it('sendet eine gültige Anfrage als Event', async () => {
    const wrapper = await fill('2026-11-18', '2026-11-21')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('send')).toEqual([[{ from: '2026-11-18', to: '2026-11-21' }]])
  })

  it('sendet eine Anfrage mit Fehlern nicht', async () => {
    const wrapper = await fill('2026-11-18', '2026-11-28')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('send')).toBeUndefined()
    expect(wrapper.find('.error').text()).toBe('Eine Ausleihe dauert höchstens sieben Tage.')
  })

  it('zeigt Meldungen erst nach dem Senden', async () => {
    const wrapper = await fill('', '')
    expect(wrapper.find('.error').exists()).toBe(false)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.findAll('.error')).toHaveLength(2)
  })
})
