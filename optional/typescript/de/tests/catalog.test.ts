import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import { search } from '../src/catalog'

describe('der Katalog mit TypeScript', () => {
  it('sucht im Namen ohne Rücksicht auf Gross- und Kleinschreibung', () => {
    expect(search(items, ' SÄGE ').map((item) => item.name)).toEqual(['Stichsäge', 'Kreissäge'])
  })

  it('merkt sich einen Favoriten über das typisierte Event', async () => {
    const wrapper = mount(App)
    await wrapper.find('.card button').trigger('click')
    expect(wrapper.find('[role="status"]').text()).toContain('1 Favoriten')
  })
})
