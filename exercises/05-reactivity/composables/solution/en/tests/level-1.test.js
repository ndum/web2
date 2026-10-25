import { mount } from '@vue/test-utils'
import { isRef, nextTick } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const modules = import.meta.glob('../src/composables/useLocalStorage.js')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path, name) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  const exported = (await loader())[name]
  expect(exported, `Export the function ${name}`).toBeTypeOf('function')
  return exported
}

const loadComposable = () => load(modules, '../src/composables/useLocalStorage.js', 'useLocalStorage')

beforeEach(() => {
  localStorage.clear()
})

describe('Getting started, useLocalStorage', () => {
  it('returns a ref with the initial value', async () => {
    const useLocalStorage = await loadComposable()
    const value = useLocalStorage('test-list', [1, 6])
    expect(isRef(value)).toBe(true)
    expect(value.value).toEqual([1, 6])
  })

  it('stores every change as JSON, even one inside', async () => {
    const useLocalStorage = await loadComposable()
    const value = useLocalStorage('test-list', [])
    value.value.push(6)
    await nextTick()
    expect(localStorage.getItem('test-list')).toBe('[6]')
    value.value = [1]
    await nextTick()
    expect(localStorage.getItem('test-list')).toBe('[1]')
  })

  it('reads a stored value', async () => {
    localStorage.setItem('test-list', '[3,5]')
    const useLocalStorage = await loadComposable()
    expect(useLocalStorage('test-list', []).value).toEqual([3, 5])
  })

  it('takes the initial value for a damaged or foreign entry', async () => {
    localStorage.setItem('test-list', '[3,')
    localStorage.setItem('test-text', '123')
    const useLocalStorage = await loadComposable()
    expect(useLocalStorage('test-list', []).value).toEqual([])
    expect(useLocalStorage('test-text', '').value).toBe('')
  })

  it('remembers the search text in App', async () => {
    const first = mount(App)
    await first.find('#search').setValue('tent')
    first.unmount()
    expect(JSON.parse(localStorage.getItem('lorraine-commons-search'))).toBe('tent')
    expect(mount(App).find('#search').element.value).toBe('tent')
  })
})
