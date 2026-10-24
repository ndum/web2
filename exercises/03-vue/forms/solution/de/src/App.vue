<script setup>
import { computed, ref } from 'vue'

import items from '../data/items.json'
import { daysBetween, formatDate, today } from './dates.js'

const item = items.find((entry) => entry.id === 1)

const member = ref('')
const from = ref('')
const to = ref('')
const touched = ref({})
const submitted = ref(false)
const summary = ref('')

// Wednesday and Saturday, the days the shop is open, as numbers of getUTCDay
const OPENING_DAYS = [3, 6]

function isOpeningDay(date) {
  return OPENING_DAYS.includes(new Date(date).getUTCDay())
}

// One message per field with a problem, an empty object means the request is valid
const errors = computed(() => {
  const result = {}
  if (!/^M-\d{3}$/.test(member.value)) {
    result.member = 'Die Mitgliedernummer hat die Form M-117.'
  }
  if (from.value === '') {
    result.from = 'Wähl den ersten Tag.'
  } else if (from.value < today()) {
    result.from = 'Der erste Tag liegt in der Vergangenheit.'
  } else if (!isOpeningDay(from.value)) {
    result.from = 'Abholen kannst du am Mittwoch oder am Samstag.'
  }
  if (to.value === '') {
    result.to = 'Wähl den letzten Tag.'
  } else if (from.value !== '' && to.value < from.value) {
    result.to = 'Der letzte Tag liegt vor dem ersten.'
  } else if (from.value !== '' && daysBetween(from.value, to.value) > 7) {
    result.to = 'Eine Ausleihe dauert höchstens sieben Tage.'
  } else if (!isOpeningDay(to.value)) {
    result.to = 'Zurückbringen kannst du am Mittwoch oder am Samstag.'
  }
  return result
})

// A message appears once someone has left the field or sent the form
const shownErrors = computed(() => {
  const result = {}
  for (const [field, message] of Object.entries(errors.value)) {
    if (touched.value[field] || submitted.value) result[field] = message
  }
  return result
})

function submit() {
  submitted.value = true
  if (Object.keys(errors.value).length > 0) return
  summary.value = `Reservationsanfrage von ${member.value} für ${item.name} vom ${formatDate(from.value)} bis ${formatDate(to.value)} erfasst.`
}
</script>

<template>
  <h1>{{ item.name }}</h1>
  <p>{{ item.category }}</p>
  <h2>Reservation anfragen</h2>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="member">Mitgliedernummer</label>
    <input
      id="member"
      v-model.trim="member"
      :aria-invalid="!!shownErrors.member"
      :aria-describedby="shownErrors.member ? 'member-error' : undefined"
      @blur="touched.member = true"
    >
    <p v-if="shownErrors.member" id="member-error" class="error">{{ shownErrors.member }}</p>

    <label for="from">Erster Tag</label>
    <input
      id="from"
      v-model="from"
      type="date"
      :aria-invalid="!!shownErrors.from"
      :aria-describedby="shownErrors.from ? 'from-error' : undefined"
      @blur="touched.from = true"
    >
    <p v-if="shownErrors.from" id="from-error" class="error">{{ shownErrors.from }}</p>

    <label for="to">Letzter Tag</label>
    <input
      id="to"
      v-model="to"
      type="date"
      :aria-invalid="!!shownErrors.to"
      :aria-describedby="shownErrors.to ? 'to-error' : undefined"
      @blur="touched.to = true"
    >
    <p v-if="shownErrors.to" id="to-error" class="error">{{ shownErrors.to }}</p>

    <button type="submit">Anfrage senden</button>
  </form>
  <p class="summary" role="status">{{ summary }}</p>
</template>
