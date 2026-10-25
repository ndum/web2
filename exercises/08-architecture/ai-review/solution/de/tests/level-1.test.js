import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OverdueList from '@/components/OverdueList.vue'

import { loans, readSource } from './helpers.js'

// Wednesday, 11 November 2026
const today = '2026-11-11'
const overdueNames = loans.filter((loan) => loan.until < today).toSorted((a, b) => a.until.localeCompare(b.until))

describe('Einstieg, Vue 3 statt Vue 2', () => {
  it('zeigt nur die überfälligen Ausleihen, die älteste zuerst', () => {
    const wrapper = mount(OverdueList, { props: { loans, today } })
    const entries = wrapper.findAll('.overdue li').map((entry) => entry.text().split(',')[0])
    expect(entries).toEqual(overdueNames.map((loan) => loan.name))
  })

  it('schreibt das Datum, wie es in der Sprache der Seite üblich ist', () => {
    const wrapper = mount(OverdueList, { props: { loans, today } })
    expect(wrapper.find('.overdue li').text()).toContain('fällig seit 3.11.2026')
  })

  it('verwendet weder this noch Filter noch Props ohne Typen', () => {
    const source = readSource('components/OverdueList.vue')
    expect(source).not.toMatch(/\bthis\./)
    expect(source).not.toMatch(/filters\s*:/)
    expect(source).not.toMatch(/defineProps\(\[/)
    expect(source).not.toMatch(/\{\{[^}]*\|[^|][^}]*\}\}/)
  })
})
