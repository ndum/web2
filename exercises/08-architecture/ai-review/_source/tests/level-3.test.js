import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import NoteList from '@/components/NoteList.vue'
import { NOTES } from '@/notes.js'

import { readSource } from './helpers.js'

const labels = (wrapper) => wrapper.findAll('.notes label').map((label) => label.text())

describe('[%Knobelei, Listen mit Schlüssel|Challenge, lists with keys%]', () => {
  it('[%blendet erledigte Notizen aus|hides done notes%]', () => {
    const wrapper = mount(NoteList, { props: { notes: NOTES } })
    expect(labels(wrapper)).toEqual(NOTES.filter((note) => !note.done).map((note) => note.title))
  })

  it('[%lässt jeden Text bei seiner Notiz, wenn eine andere verschwindet|keeps every text with its note when another one disappears%]', async () => {
    const wrapper = mount(NoteList, { props: { notes: NOTES } })
    const third = NOTES[2]
    const field = () => wrapper.findAll('.notes li').find((entry) => entry.find('label').text() === third.title).find('input')
    field().element.value = '[%Bis Samstag|By Saturday%]'
    await wrapper.find('.notes li button').trigger('click')
    expect(field().element.value).toBe('[%Bis Samstag|By Saturday%]')
  })

  it('[%ändert die Prop notes nicht|does not change the prop notes%]', async () => {
    const notes = NOTES.map((note) => ({ ...note }))
    const wrapper = mount(NoteList, { props: { notes } })
    await wrapper.find('.notes li button').trigger('click')
    expect(notes).toHaveLength(NOTES.length)
  })

  it('[%schreibt v-if und v-for nie an dasselbe Element|never puts v-if and v-for on the same element%]', () => {
    const tags = readSource('components/NoteList.vue').match(/<[a-z][^>]*>/g)
    expect(tags.filter((tag) => tag.includes('v-for') && tag.includes('v-if'))).toEqual([])
  })
})
