import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Going further, the filter after a reset', () => {
  it('empties the search field and the category', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('saw')
    await wrapper.find('#category').setValue('Tools')
    expect(wrapper.findAll('.card')).toHaveLength(2)
    await wrapper.find('.reset').trigger('click')
    expect(wrapper.find('#search').element.value).toBe('')
    expect(wrapper.find('#category').element.value).toBe('')
    expect(wrapper.findAll('.card')).toHaveLength(60)
  })

  it('keeps searching after a reset', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('saw')
    await wrapper.find('.reset').trigger('click')
    await wrapper.find('#search').setValue('tent')
    expect(wrapper.findAll('.card')).toHaveLength(3)
  })
})
