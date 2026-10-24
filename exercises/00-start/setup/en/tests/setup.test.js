import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

describe('Setup', () => {
  it('runs on Node.js 22 or newer', () => {
    const major = Number(process.versions.node.split('.')[0])
    expect(major).toBeGreaterThanOrEqual(22)
  })

  it('shows the start page', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Lorraine Commons')
  })
})
