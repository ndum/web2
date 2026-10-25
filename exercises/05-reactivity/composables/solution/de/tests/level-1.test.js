import { mount } from '@vue/test-utils'
import { isRef, nextTick } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const modules = import.meta.glob('../src/composables/useLocalStorage.js')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path, name) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  const exported = (await loader())[name]
  expect(exported, `Exportiere die Funktion ${name}`).toBeTypeOf('function')
  return exported
}

const loadComposable = () => load(modules, '../src/composables/useLocalStorage.js', 'useLocalStorage')

beforeEach(() => {
  localStorage.clear()
})

describe('Einstieg, useLocalStorage', () => {
  it('gibt einen Ref mit dem Anfangswert zurück', async () => {
    const useLocalStorage = await loadComposable()
    const value = useLocalStorage('test-list', [1, 6])
    expect(isRef(value)).toBe(true)
    expect(value.value).toEqual([1, 6])
  })

  it('speichert jede Änderung als JSON, auch eine im Innern', async () => {
    const useLocalStorage = await loadComposable()
    const value = useLocalStorage('test-list', [])
    value.value.push(6)
    await nextTick()
    expect(localStorage.getItem('test-list')).toBe('[6]')
    value.value = [1]
    await nextTick()
    expect(localStorage.getItem('test-list')).toBe('[1]')
  })

  it('liest einen gespeicherten Wert', async () => {
    localStorage.setItem('test-list', '[3,5]')
    const useLocalStorage = await loadComposable()
    expect(useLocalStorage('test-list', []).value).toEqual([3, 5])
  })

  it('nimmt bei einem kaputten oder fremden Eintrag den Anfangswert', async () => {
    localStorage.setItem('test-list', '[3,')
    localStorage.setItem('test-text', '123')
    const useLocalStorage = await loadComposable()
    expect(useLocalStorage('test-list', []).value).toEqual([])
    expect(useLocalStorage('test-text', '').value).toBe('')
  })

  it('merkt sich in App den Suchtext', async () => {
    const first = mount(App)
    await first.find('#search').setValue('zelt')
    first.unmount()
    expect(JSON.parse(localStorage.getItem('lorraine-commons-search'))).toBe('zelt')
    expect(mount(App).find('#search').element.value).toBe('zelt')
  })
})
