import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Einrichtung', () => {
  it('läuft mit Node.js 22 oder neuer', () => {
    const major = Number(process.versions.node.split('.')[0])
    expect(major).toBeGreaterThanOrEqual(22)
  })

  it('zeigt die Startseite', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Lorraine Commons')
  })
})
