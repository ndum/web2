import { readFileSync } from 'node:fs'

import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cardOf, visit } from './visit.js'

enableAutoUnmount(afterEach)

afterEach(() => {
  vi.unstubAllGlobals()
  localStorage.clear()
  sessionStorage.clear()
  document.body.innerHTML = ''
})

// The contrast ratio of WCAG 2.2 between two colors such as #1f6b4f and #ffffff
function contrast(first, second) {
  const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
    const linear = (channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
  }
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return (light + 0.05) / (dark + 0.05)
}

describe('[%Barrierefreiheit|Accessibility%]', () => {
  it('[%meldet die Zahl der Treffer in einer Live-Region|announces the number of hits in a live region%]', async () => {
    const wrapper = await visit('/')
    expect(wrapper.find('.hits').attributes('role')).toBe('status')
  })

  it('[%nennt bei Link und Knopf jeder Karte das Ding|names the thing in the link and the button of every card%]', async () => {
    const card = cardOf(await visit('/'), '[%Beamer|Projector%]')
    expect(card.find('a.reserve').text()).toBe('[%Reservieren: Beamer|Reserve: Projector%]')
    expect(card.find('button.favorite').text().replace(/\s+/g, ' ')).toBe('[%Favorit: Beamer|Favorite: Projector%]')
  })

  it('[%springt mit dem ersten Link zum Inhalt|jumps to the content with the first link%]', async () => {
    const wrapper = await visit('/association', { attachTo: document.body })
    const skip = wrapper.find('a.skip-link')
    expect(wrapper.find('a').element).toBe(skip.element)
    await skip.trigger('click')
    await flushPromises()
    expect(document.activeElement).toBe(wrapper.find('main').element)
  })

  it('[%hält für Text einen Kontrast von mindestens 4,5:1|keeps a contrast of at least 4.5:1 for text%]', () => {
    const files = ['../src/assets/main.css', '../src/components/ItemCard.vue', '../src/components/PageLayout.vue']
    const css = files.map((file) => readFileSync(new URL(file, import.meta.url), 'utf8')).join('\n')
    const textColors = [...css.matchAll(/(?<!-)color: (#[0-9a-f]{6})/g)].map((match) => match[1]).filter((color) => color !== '#ffffff')
    expect(textColors.length).toBeGreaterThan(3)
    for (const color of textColors) expect(contrast(color, '#ffffff')).toBeGreaterThanOrEqual(4.5)
    // White text in the header on its green background
    expect(contrast('#ffffff', '#1f6b4f')).toBeGreaterThanOrEqual(4.5)
  })
})
