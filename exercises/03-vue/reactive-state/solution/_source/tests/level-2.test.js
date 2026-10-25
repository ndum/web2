import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const names = (wrapper) => wrapper.findAll('.catalog li .name').map((name) => name.text())

async function search(text) {
  const wrapper = mount(App)
  const field = wrapper.find('#search')
  expect(field.exists(), '[%Ergänze ein Suchfeld mit der id search|Add a search field with the id search%]').toBe(true)
  await field.setValue(text)
  return wrapper
}

describe('[%Vertiefung, die Suche|Going further, the search%]', () => {
  it('[%zeigt nur die Dinge, deren Name den Suchtext enthält|shows only the things whose name contains the search text%]', async () => {
    expect(names(await search('[%säge|saw%]'))).toEqual(['[%Stichsäge|Jigsaw%]', '[%Kreissäge|Circular saw%]'])
  })

  it('[%achtet nicht auf Gross- und Kleinschreibung und Leerzeichen|ignores case and spaces%]', async () => {
    expect(names(await search('  [%ZELT|TENT%] '))).toHaveLength(3)
  })

  it('[%zeigt mit leerer Suche den ganzen Katalog|shows the whole catalog with an empty search%]', async () => {
    expect(names(await search(''))).toHaveLength(60)
  })
})
