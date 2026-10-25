import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

// Details count as shown when they exist and v-show does not hide them
function detailsShown(entry) {
  const details = entry.find('.details')
  return details.exists() && details.element.style.display !== 'none'
}

describe('Challenge, the details of a thing', () => {
  it('has details in every entry that are hidden at first', () => {
    const entries = mount(App).findAll('.catalog li')
    expect(entries.length).toBeGreaterThan(0)
    expect(
      entries.every((entry) => entry.find('.details').exists()),
      'Add an element with the class details to every entry',
    ).toBe(true)
    expect(entries.some(detailsShown)).toBe(false)
  })

  it('opens the details with the deposit on a click on the name', async () => {
    const projector = mount(App).findAll('.catalog li')[5]
    const button = projector.find('button.name')
    expect(button.exists(), 'Turn the name into a button with the class name').toBe(true)
    expect(button.attributes('aria-expanded')).toBe('false')
    await button.trigger('click')
    expect(detailsShown(projector)).toBe(true)
    expect(projector.find('.details').text().replace(/\s/g, ' ')).toContain('CHF 80.00')
    expect(button.attributes('aria-expanded')).toBe('true')
  })

  it('closes the details on a second click and keeps only one thing open', async () => {
    const entries = mount(App).findAll('.catalog li')
    await entries[0].find('button.name').trigger('click')
    await entries[2].find('button.name').trigger('click')
    expect(entries.filter(detailsShown)).toHaveLength(1)
    expect(detailsShown(entries[2])).toBe(true)
    await entries[2].find('button.name').trigger('click')
    expect(entries.some(detailsShown)).toBe(false)
  })
})
