import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { version } from 'vue'

import App from '../src/App.vue'

describe('Challenge, the footer', () => {
  it('names the version of Vue', () => {
    const footer = mount(App).find('footer')
    expect(footer.exists(), 'Add a footer element').toBe(true)
    expect(footer.text()).toContain(version)
  })

  it('names the mode in which Vite runs the app', () => {
    expect(mount(App).find('footer').text()).toContain(import.meta.env.MODE)
  })
})
