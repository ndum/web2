import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { version } from 'vue'

import App from '../src/App.vue'

describe('[%Knobelei, die Fusszeile|Challenge, the footer%]', () => {
  it('[%nennt die Version von Vue|names the version of Vue%]', () => {
    const footer = mount(App).find('footer')
    expect(footer.exists(), '[%Ergänze ein Element footer|Add a footer element%]').toBe(true)
    expect(footer.text()).toContain(version)
  })

  it('[%nennt den Modus, in dem Vite die App ausführt|names the mode in which Vite runs the app%]', () => {
    expect(mount(App).find('footer').text()).toContain(import.meta.env.MODE)
  })
})
