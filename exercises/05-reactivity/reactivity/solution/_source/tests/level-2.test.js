import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('[%Vertiefung, der Filter nach dem Zurücksetzen|Going further, the filter after a reset%]', () => {
  it('[%leert Suchfeld und Kategorie|empties the search field and the category%]', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('[%säge|saw%]')
    await wrapper.find('#category').setValue('[%Werkzeug|Tools%]')
    expect(wrapper.findAll('.card')).toHaveLength(2)
    await wrapper.find('.reset').trigger('click')
    expect(wrapper.find('#search').element.value).toBe('')
    expect(wrapper.find('#category').element.value).toBe('')
    expect(wrapper.findAll('.card')).toHaveLength(60)
  })

  it('[%sucht nach dem Zurücksetzen weiter|keeps searching after a reset%]', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('[%säge|saw%]')
    await wrapper.find('.reset').trigger('click')
    await wrapper.find('#search').setValue('[%zelt|tent%]')
    expect(wrapper.findAll('.card')).toHaveLength(3)
  })
})
