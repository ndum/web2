import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'

const modules = import.meta.glob('../src/components/BaseDialog.vue')

// The file does not exist before the exercise, so the test loads it only when it is there
async function load(modules, path) {
  const loader = modules[path]
  expect(loader, `Create the file ${path.replace('../', '')} `.trim()).toBeDefined()
  return (await loader()).default
}

describe('Going further, a dialog with slots', () => {
  it('shows title, content and buttons in a dialog', async () => {
    const BaseDialog = await load(modules, '../src/components/BaseDialog.vue')
    const dialog = mount(BaseDialog, {
      slots: {
        title: 'Check the request',
        default: '<p>Drill</p>',
        actions: '<button class="confirm">OK</button>',
      },
    })
    const box = dialog.find('[role="dialog"]')
    expect(box.exists(), 'Give the dialog role="dialog"').toBe(true)
    expect(box.attributes('aria-modal')).toBe('true')
    const heading = dialog.find('h2')
    expect(heading.text()).toBe('Check the request')
    expect(heading.attributes('id')).toBeTruthy()
    expect(box.attributes('aria-labelledby')).toBe(heading.attributes('id'))
    expect(box.text()).toContain('Drill')
    expect(dialog.find('.confirm').exists()).toBe(true)
  })

  it('offers a button to close without a slot for the buttons', async () => {
    const BaseDialog = await load(modules, '../src/components/BaseDialog.vue')
    const dialog = mount(BaseDialog)
    await dialog.find('button').trigger('click')
    expect(dialog.emitted('close')).toHaveLength(1)
  })

  it('opens in App after sending', async () => {
    const wrapper = mount(App)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    await wrapper.find('button.send').trigger('click')
    expect(wrapper.find('[role="dialog"] h2').text()).toBe('Check the request')
  })
})
