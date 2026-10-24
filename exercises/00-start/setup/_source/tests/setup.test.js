import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('[%Einrichtung|Setup%]', () => {
  it('[%läuft mit Node.js 22 oder neuer|runs on Node.js 22 or newer%]', () => {
    const major = Number(process.versions.node.split('.')[0])
    expect(major).toBeGreaterThanOrEqual(22)
  })

  it('[%zeigt die Startseite|shows the start page%]', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Lorraine Commons')
  })
})
