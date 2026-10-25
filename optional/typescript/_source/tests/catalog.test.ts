import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import items from '../data/items.json'
import App from '../src/App.vue'
import { search } from '../src/catalog'

describe('[%der Katalog mit TypeScript|the catalog with TypeScript%]', () => {
  it('[%sucht im Namen ohne Rücksicht auf Gross- und Kleinschreibung|searches the names regardless of case%]', () => {
    expect(search(items, ' [%SÄGE|SAW%] ').map((item) => item.name)).toEqual(['[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]'])
  })

  it('[%merkt sich einen Favoriten über das typisierte Event|keeps a favorite through the typed event%]', async () => {
    const wrapper = mount(App)
    await wrapper.find('.card button').trigger('click')
    expect(wrapper.find('[role="status"]').text()).toContain('1 [%Favoriten|favorites%]')
  })
})
