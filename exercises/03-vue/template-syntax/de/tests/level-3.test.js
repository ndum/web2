import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

// Details count as shown when they exist and v-show does not hide them
function detailsShown(entry) {
  const details = entry.find('.details')
  return details.exists() && details.element.style.display !== 'none'
}

describe('Knobelei, die Details zu einem Ding', () => {
  it('hat in jedem Eintrag Details, die zu Beginn versteckt sind', () => {
    const entries = mount(App).findAll('.catalog li')
    expect(entries.length).toBeGreaterThan(0)
    expect(
      entries.every((entry) => entry.find('.details').exists()),
      'Ergänze in jedem Eintrag ein Element mit der Klasse details',
    ).toBe(true)
    expect(entries.some(detailsShown)).toBe(false)
  })

  it('öffnet die Details mit dem Pfand beim Klick auf den Namen', async () => {
    const projector = mount(App).findAll('.catalog li')[5]
    const button = projector.find('button.name')
    expect(button.exists(), 'Mach aus dem Namen einen button mit der Klasse name').toBe(true)
    expect(button.attributes('aria-expanded')).toBe('false')
    await button.trigger('click')
    expect(detailsShown(projector)).toBe(true)
    expect(projector.find('.details').text().replace(/\s/g, ' ')).toContain('CHF 80.00')
    expect(button.attributes('aria-expanded')).toBe('true')
  })

  it('schliesst die Details beim zweiten Klick und lässt nur ein Ding offen', async () => {
    const entries = mount(App).findAll('.catalog li')
    await entries[0].find('button.name').trigger('click')
    await entries[2].find('button.name').trigger('click')
    expect(entries.filter(detailsShown)).toHaveLength(1)
    expect(detailsShown(entries[2])).toBe(true)
    await entries[2].find('button.name').trigger('click')
    expect(entries.some(detailsShown)).toBe(false)
  })
})
