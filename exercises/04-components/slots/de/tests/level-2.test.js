import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const modules = import.meta.glob('../src/components/BaseDialog.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Lege die Datei ${path.replace('../', '')} an`.trim()).toBeDefined()
  return (await loader()).default
}

describe('Vertiefung, ein Dialog mit Slots', () => {
  it('zeigt Titel, Inhalt und Knöpfe in einem Dialog', async () => {
    const BaseDialog = await load(modules, '../src/components/BaseDialog.vue')
    const dialog = mount(BaseDialog, {
      slots: {
        title: 'Anfrage prüfen',
        default: '<p>Bohrmaschine</p>',
        actions: '<button class="confirm">OK</button>',
      },
    })
    const box = dialog.find('[role="dialog"]')
    expect(box.exists(), 'Gib dem Dialog role="dialog"').toBe(true)
    expect(box.attributes('aria-modal')).toBe('true')
    const heading = dialog.find('h2')
    expect(heading.text()).toBe('Anfrage prüfen')
    expect(heading.attributes('id')).toBeTruthy()
    expect(box.attributes('aria-labelledby')).toBe(heading.attributes('id'))
    expect(box.text()).toContain('Bohrmaschine')
    expect(dialog.find('.confirm').exists()).toBe(true)
  })

  it('bietet ohne Slot für die Knöpfe einen Knopf zum Schliessen', async () => {
    const BaseDialog = await load(modules, '../src/components/BaseDialog.vue')
    const dialog = mount(BaseDialog)
    await dialog.find('button').trigger('click')
    expect(dialog.emitted('close')).toHaveLength(1)
  })

  it('öffnet sich in App nach dem Senden', async () => {
    const wrapper = mount(App)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    await wrapper.find('button.send').trigger('click')
    expect(wrapper.find('[role="dialog"] h2').text()).toBe('Anfrage prüfen')
  })
})
