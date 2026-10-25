import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from '../src/App.vue'
import { createAppI18n } from '../src/i18n.js'

function mountIn(locale) {
  return mount(App, { global: { plugins: [createAppI18n(locale)] } })
}

describe('[%der Katalog in mehreren Sprachen|the catalog in several languages%]', () => {
  it('[%zeigt die Texte und Formate auf Deutsch|shows the texts and formats in German%]', () => {
    const wrapper = mountIn('de-CH')
    expect(wrapper.find('h1').text()).toBe('Katalog')
    expect(wrapper.find('[role="status"]').text()).toBe('4 Dinge gefunden')
    // Intl puts a no-break space between currency and amount
    expect(wrapper.find('li').text().replace(/\s/g, ' ')).toContain('Pfand CHF 20.00')
  })

  it('[%wechselt die Sprache zur Laufzeit|switches the language at run time%]', async () => {
    const wrapper = mountIn('de-CH')
    await wrapper.find('select').setValue('en-US')
    expect(wrapper.find('h1').text()).toBe('Catalog')
    expect(wrapper.find('[role="status"]').text()).toBe('4 things found')
    expect(document.documentElement.lang).toBe('en-US')
  })

  it('[%wählt die passende Pluralform|picks the right plural form%]', () => {
    const { t } = createAppI18n('de-CH').global
    expect([0, 1, 2].map((count) => t('found', count))).toEqual(['Keine Dinge gefunden', 'Ein Ding gefunden', '2 Dinge gefunden'])
  })
})
