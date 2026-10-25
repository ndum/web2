import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import { search } from '../src/catalog'

describe('the catalog with TypeScript', () => {
  it('searches the names regardless of case', () => {
    expect(search(items, ' SAW ').map((item) => item.name)).toEqual(['Jigsaw', 'Circular saw'])
  })

  it('keeps a favorite through the typed event', async () => {
    const wrapper = mount(App)
    await wrapper.find('.card button').trigger('click')
    expect(wrapper.find('[role="status"]').text()).toContain('1 favorites')
  })
})
