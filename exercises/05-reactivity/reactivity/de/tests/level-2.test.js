import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Vertiefung, der Filter nach dem Zurücksetzen', () => {
  it('leert Suchfeld und Kategorie', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('säge')
    await wrapper.find('#category').setValue('Werkzeug')
    expect(wrapper.findAll('.card')).toHaveLength(2)
    await wrapper.find('.reset').trigger('click')
    expect(wrapper.find('#search').element.value).toBe('')
    expect(wrapper.find('#category').element.value).toBe('')
    expect(wrapper.findAll('.card')).toHaveLength(60)
  })

  it('sucht nach dem Zurücksetzen weiter', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('säge')
    await wrapper.find('.reset').trigger('click')
    await wrapper.find('#search').setValue('zelt')
    expect(wrapper.findAll('.card')).toHaveLength(3)
  })
})
