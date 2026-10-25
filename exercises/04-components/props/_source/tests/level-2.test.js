import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ItemCard from '../src/components/ItemCard.vue'

const props = { name: '[%Leiter|Ladder%]', category: '[%Werkzeug|Tools%]', deposit: 20 }

describe('[%Vertiefung, wann ein Ding wieder frei ist|Going further, when a thing is free again%]', () => {
  it('[%zeigt «Verfügbar», solange availableFrom fehlt|shows "Available" while availableFrom is missing%]', () => {
    const wrapper = mount(ItemCard, { props })
    expect(wrapper.find('.state').text()).toBe('[%Verfügbar|Available%]')
  })

  it('[%zeigt das Datum, ab dem das Ding wieder frei ist|shows the date from which the thing is free again%]', () => {
    const wrapper = mount(ItemCard, { props: { ...props, availableFrom: '2026-11-12' } })
    expect(wrapper.find('.state').text()).toBe('[%Wieder verfügbar ab 12.11.2026|Available again from 11/12/2026%]')
  })

  it('[%passt die Anzeige an, wenn sich die Prop ändert|updates the text when the prop changes%]', async () => {
    const wrapper = mount(ItemCard, { props })
    await wrapper.setProps({ availableFrom: '2026-12-01' })
    expect(wrapper.find('.state').text()).toBe('[%Wieder verfügbar ab 1.12.2026|Available again from 12/1/2026%]')
  })
})