import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { vi } from 'vitest'

import App from '@/App.vue'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

export const readSource = (file) => readFileSync(join(ROOT, 'src', file), 'utf8')

// The things of the lending software, in its own format
export const things = JSON.parse(readFileSync(join(ROOT, 'public', 'things.json'), 'utf8'))

// The lending software answers with its things
export function stubThings() {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(things))))
}

export async function showApp() {
  stubThings()
  const wrapper = mount(App, { global: { plugins: [createPinia()] } })
  await flushPromises()
  return wrapper
}
