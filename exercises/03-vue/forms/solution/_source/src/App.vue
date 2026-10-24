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
    result.member = '[%Die Mitgliedernummer hat die Form M-117.|The member number looks like M-117.%]'
  }
  if (from.value === '') {
    result.from = '[%Wähl den ersten Tag.|Choose the first day.%]'
  } else if (from.value < today()) {
    result.from = '[%Der erste Tag liegt in der Vergangenheit.|The first day is in the past.%]'
  } else if (!isOpeningDay(from.value)) {
    result.from = '[%Abholen kannst du am Mittwoch oder am Samstag.|You can pick things up on Wednesday or Saturday.%]'
  }
  if (to.value === '') {
    result.to = '[%Wähl den letzten Tag.|Choose the last day.%]'
  } else if (from.value !== '' && to.value < from.value) {
    result.to = '[%Der letzte Tag liegt vor dem ersten.|The last day is before the first.%]'
  } else if (from.value !== '' && daysBetween(from.value, to.value) > 7) {
    result.to = '[%Eine Ausleihe dauert höchstens sieben Tage.|A loan lasts at most seven days.%]'
  } else if (!isOpeningDay(to.value)) {
    result.to = '[%Zurückbringen kannst du am Mittwoch oder am Samstag.|You can bring things back on Wednesday or Saturday.%]'
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
  summary.value = `[%Reservationsanfrage von ${member.value} für ${item.name} vom ${formatDate(from.value)} bis ${formatDate(to.value)} erfasst.|Reservation request from ${member.value} for ${item.name} from ${formatDate(from.value)} to ${formatDate(to.value)} recorded.%]`
}
</script>

<template>
  <h1>{{ item.name }}</h1>
  <p>{{ item.category }}</p>
  <h2>[%Reservation anfragen|Request a reservation%]</h2>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="member">[%Mitgliedernummer|Member number%]</label>
    <input
      id="member"
      v-model.trim="member"
      :aria-invalid="!!shownErrors.member"
      :aria-describedby="shownErrors.member ? 'member-error' : undefined"
      @blur="touched.member = true"
    >
    <p v-if="shownErrors.member" id="member-error" class="error">{{ shownErrors.member }}</p>

    <label for="from">[%Erster Tag|First day%]</label>
    <input
      id="from"
      v-model="from"
      type="date"
      :aria-invalid="!!shownErrors.from"
      :aria-describedby="shownErrors.from ? 'from-error' : undefined"
      @blur="touched.from = true"
    >
    <p v-if="shownErrors.from" id="from-error" class="error">{{ shownErrors.from }}</p>

    <label for="to">[%Letzter Tag|Last day%]</label>
    <input
      id="to"
      v-model="to"
      type="date"
      :aria-invalid="!!shownErrors.to"
      :aria-describedby="shownErrors.to ? 'to-error' : undefined"
      @blur="touched.to = true"
    >
    <p v-if="shownErrors.to" id="to-error" class="error">{{ shownErrors.to }}</p>

    <button type="submit">[%Anfrage senden|Send request%]</button>
  </form>
  <p class="summary" role="status">{{ summary }}</p>
</template>
