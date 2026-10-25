import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { version } from 'vue'

import App from '../src/App.vue'

describe('Knobelei, die Fusszeile', () => {
  it('nennt die Version von Vue', () => {
    const footer = mount(App).find('footer')
    expect(footer.exists(), 'Ergänze ein Element footer').toBe(true)
    expect(footer.text()).toContain(version)
  })

  it('nennt den Modus, in dem Vite die App ausführt', () => {
    expect(mount(App).find('footer').text()).toContain(import.meta.env.MODE)
  })
})
