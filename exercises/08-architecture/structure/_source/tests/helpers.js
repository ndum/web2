import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { vi } from 'vitest'

import items from '../data/items.json'

export const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src')

// Every file below src with its path relative to src, such as features/catalog/CatalogView.vue
export function sourceFiles(dir = SRC) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? sourceFiles(join(dir, entry.name)) : [relative(SRC, join(dir, entry.name)).replaceAll('\\', '/')],
  )
}

export const readSource = (file) => readFileSync(join(SRC, file), 'utf8')

// The course API answers with the catalog
export function stubCatalog() {
  const fetch = vi.fn(async () => new Response(JSON.stringify(items)))
  vi.stubGlobal('fetch', fetch)
  return fetch
}

// Shows the app at an address with a fresh Pinia
export async function visit(path) {
  const { default: App } = await import('@/App.vue')
  const { default: router } = await import('@/router/index.js')
  await router.push(path)
  const wrapper = mount(App, { global: { plugins: [router, createPinia()] } })
  await flushPromises()
  return { wrapper, router }
}
