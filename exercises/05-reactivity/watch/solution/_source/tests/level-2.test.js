import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../src/App.vue'

beforeEach(() => {
  localStorage.clear()
  // Only the timers are fake, promises and nextTick keep working
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
})

afterEach(() => {
  vi.useRealTimers()
})

function count(wrapper) {
  return wrapper.findAll('.catalog li').length
}

describe('[%Vertiefung, die Liste wartet auf eine Pause|Going further, the list waits for a pause%]', () => {
  it('[%filtert erst nach 300 Millisekunden ohne Tippen|filters only after 300 milliseconds without typing%]', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('[%zelt|tent%]')
    expect(count(wrapper)).toBe(60)
    vi.advanceTimersByTime(299)
    await nextTick()
    expect(count(wrapper)).toBe(60)
    vi.advanceTimersByTime(1)
    await nextTick()
    expect(count(wrapper)).toBe(3)
  })

  it('[%beginnt nach jedem Tastendruck von vorn|starts over after every keystroke%]', async () => {
    const wrapper = mount(App)
    await wrapper.find('#search').setValue('[%z|t%]')
    vi.advanceTimersByTime(200)
    await wrapper.find('#search').setValue('[%zelt|tent%]')
    vi.advanceTimersByTime(200)
    await nextTick()
    expect(count(wrapper)).toBe(60)
    vi.advanceTimersByTime(100)
    await nextTick()
    expect(count(wrapper)).toBe(3)
  })
})
