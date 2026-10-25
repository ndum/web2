import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import items from '../data/items.json'
import App from '../src/App.vue'
import ItemPage from '../src/components/ItemPage.vue'
import ReservationForm from '../src/components/ReservationForm.vue'
import { memberKey } from '../src/keys.js'

const member = ref({ number: 'M-204', name: 'Mitglied M-204' })

describe('Vertiefung, die Mitgliedernummer tief im Baum', () => {
  it('füllt die Mitgliedernummer aus dem bereitgestellten Mitglied', () => {
    const form = mount(ReservationForm, { props: { item: items[0] }, global: { provide: { [memberKey]: member } } })
    expect(form.find('#member').element.value).toBe('M-204')
    // Without a member the field stays empty
    expect(mount(ReservationForm, { props: { item: items[0] } }).find('#member').element.value).toBe('')
  })

  it('reicht das Mitglied nicht als Prop durch ItemPage', () => {
    expect(ItemPage.props?.member).toBeUndefined()
    expect(mount(App).find('#member').element.value).toBe('M-117')
  })
})
