import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const modules = import.meta.glob('../src/composables/useFavorites.js')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path, name) {
  const loader = modules[path]
  expect(loader, `[%Lege die Datei|Create the file%] ${path.replace('../', '')} [%an|%]`.trim()).toBeDefined()
  const exported = (await loader())[name]
  expect(exported, `[%Exportiere die Funktion|Export the function%] ${name}`).toBeTypeOf('function')
  return exported
}

const loadComposable = () => load(modules, '../src/composables/useFavorites.js', 'useFavorites')

beforeEach(() => {
  localStorage.clear()
})

describe('[%Vertiefung, useFavorites|Going further, useFavorites%]', () => {
  it('[%schaltet einen Favoriten ein und aus|switches a favorite on and off%]', async () => {
    const useFavorites = await loadComposable()
    const { isFavorite, toggle, count } = useFavorites()
    toggle(6)
    expect(isFavorite(6)).toBe(true)
    expect(count.value).toBe(1)
    toggle(6)
    expect(isFavorite(6)).toBe(false)
    expect(count.value).toBe(0)
  })

  it('[%speichert die Favoriten unter lorraine-commons-favorites|stores the favorites under lorraine-commons-favorites%]', async () => {
    const useFavorites = await loadComposable()
    const { toggle } = useFavorites()
    toggle(1)
    toggle(6)
    await nextTick()
    expect(JSON.parse(localStorage.getItem('lorraine-commons-favorites'))).toEqual([1, 6])
  })

  it('[%merkt sich in App die Favoriten über einen Neustart|remembers the favorites in App across a restart%]', async () => {
    const first = mount(App)
    await first.findAll('.favorite')[0].trigger('click')
    first.unmount()
    const second = mount(App)
    expect(second.findAll('.favorite')[0].attributes('aria-pressed')).toBe('true')
    expect(second.find('.favorites').text()).toBe('[%1 Favorit|1 favorite%]')
  })
})
