import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

async function filter({ category = '', text = '' }) {
  const wrapper = mount(App)
  const select = wrapper.find('select#category')
  expect(select.exists(), 'Ergänze eine Auswahl mit der id category').toBe(true)
  await select.setValue(category)
  await wrapper.find('#search').setValue(text)
  return wrapper
}

describe('Knobelei, der Filter nach Kategorie', () => {
  it('bietet alle Kategorien in alphabetischer Reihenfolge an', () => {
    const options = mount(App).findAll('select#category option').map((option) => option.text())
    expect(options).toEqual([
      'Alle Kategorien',
      'Camping',
      'Feste',
      'Garten',
      'Kinder',
      'Küche',
      'Werkzeug',
    ])
  })

  it('zeigt nur die Dinge der gewählten Kategorie und ihre Zahl', async () => {
    const wrapper = await filter({ category: 'Werkzeug' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('10 Dinge gefunden')
  })

  it('verbindet Kategorie und Suche', async () => {
    const wrapper = await filter({ category: 'Werkzeug', text: 'säge' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(2)
  })

  it('schreibt bei einem Treffer die Einzahl', async () => {
    const wrapper = await filter({ text: 'vier' })
    expect(wrapper.find('.hits').text()).toBe('1 Ding gefunden')
  })

  it('meldet, wenn nichts passt', async () => {
    const wrapper = await filter({ category: 'Küche', text: 'zelt' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(0)
    expect(wrapper.text()).toContain('Keine Dinge gefunden.')
  })
})
