import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OverdueList from '@/components/OverdueList.vue'

import { loans, readSource } from './helpers.js'

// Wednesday, 11 November 2026
const today = '2026-11-11'
const overdueNames = loans.filter((loan) => loan.until < today).toSorted((a, b) => a.until.localeCompare(b.until))

describe('[%Einstieg, Vue 3 statt Vue 2|Getting started, Vue 3 instead of Vue 2%]', () => {
  it('[%zeigt nur die überfälligen Ausleihen, die älteste zuerst|shows only the overdue loans, the oldest first%]', () => {
    const wrapper = mount(OverdueList, { props: { loans, today } })
    const entries = wrapper.findAll('.overdue li').map((entry) => entry.text().split(',')[0])
    expect(entries).toEqual(overdueNames.map((loan) => loan.name))
  })

  it('[%schreibt das Datum, wie es in der Sprache der Seite üblich ist|writes the date as is usual in the language of the page%]', () => {
    const wrapper = mount(OverdueList, { props: { loans, today } })
    expect(wrapper.find('.overdue li').text()).toContain('[%fällig seit 3.11.2026|due since 11/3/2026%]')
  })

  it('[%verwendet weder this noch Filter noch Props ohne Typen|uses neither this nor filters nor props without types%]', () => {
    const source = readSource('components/OverdueList.vue')
    expect(source).not.toMatch(/\bthis\./)
    expect(source).not.toMatch(/filters\s*:/)
    expect(source).not.toMatch(/defineProps\(\[/)
    expect(source).not.toMatch(/\{\{[^}]*\|[^|][^}]*\}\}/)
  })
})
