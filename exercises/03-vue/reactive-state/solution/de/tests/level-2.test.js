import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const names = (wrapper) => wrapper.findAll('.catalog li .name').map((name) => name.text())

async function search(text) {
  const wrapper = mount(App)
  const field = wrapper.find('#search')
  expect(field.exists(), 'Ergänze ein Suchfeld mit der id search').toBe(true)
  await field.setValue(text)
  return wrapper
}

describe('Vertiefung, die Suche', () => {
  it('zeigt nur die Dinge, deren Name den Suchtext enthält', async () => {
    expect(names(await search('säge'))).toEqual(['Stichsäge', 'Kreissäge'])
  })

  it('achtet nicht auf Gross- und Kleinschreibung und Leerzeichen', async () => {
    expect(names(await search('  ZELT '))).toHaveLength(3)
  })

  it('zeigt mit leerer Suche den ganzen Katalog', async () => {
    expect(names(await search(''))).toHaveLength(60)
  })
})
