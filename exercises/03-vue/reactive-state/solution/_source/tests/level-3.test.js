import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

async function filter({ category = '', text = '' }) {
  const wrapper = mount(App)
  const select = wrapper.find('select#category')
  expect(select.exists(), '[%Ergänze eine Auswahl mit der id category|Add a select with the id category%]').toBe(true)
  await select.setValue(category)
  await wrapper.find('#search').setValue(text)
  return wrapper
}

describe('[%Knobelei, der Filter nach Kategorie|Challenge, the filter by category%]', () => {
  it('[%bietet alle Kategorien in alphabetischer Reihenfolge an|offers every category in alphabetical order%]', () => {
    const options = mount(App).findAll('select#category option').map((option) => option.text())
    expect(options).toEqual([
      '[%Alle Kategorien|All categories%]',
      '[%Camping|Camping%]',
      '[%Feste|Garden%]',
      '[%Garten|Kids%]',
      '[%Kinder|Kitchen%]',
      '[%Küche|Parties%]',
      '[%Werkzeug|Tools%]',
    ])
  })

  it('[%zeigt nur die Dinge der gewählten Kategorie und ihre Zahl|shows only the things of the chosen category and their number%]', async () => {
    const wrapper = await filter({ category: '[%Werkzeug|Tools%]' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(10)
    expect(wrapper.find('.hits').text()).toBe('[%10 Dinge gefunden|10 things found%]')
  })

  it('[%verbindet Kategorie und Suche|combines category and search%]', async () => {
    const wrapper = await filter({ category: '[%Werkzeug|Tools%]', text: '[%säge|saw%]' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(2)
  })

  it('[%schreibt bei einem Treffer die Einzahl|uses the singular for one hit%]', async () => {
    const wrapper = await filter({ text: '[%vier|four%]' })
    expect(wrapper.find('.hits').text()).toBe('[%1 Ding gefunden|1 thing found%]')
  })

  it('[%meldet, wenn nichts passt|reports when nothing matches%]', async () => {
    const wrapper = await filter({ category: '[%Küche|Kitchen%]', text: '[%zelt|tent%]' })
    expect(wrapper.findAll('.catalog li')).toHaveLength(0)
    expect(wrapper.text()).toContain('[%Keine Dinge gefunden.|No things found.%]')
  })
})
