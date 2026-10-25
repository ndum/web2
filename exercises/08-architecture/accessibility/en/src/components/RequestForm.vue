<script setup>
import { computed, reactive, ref } from 'vue'

const request = reactive({ from: '', to: '' })
const submitted = ref(false)
const sent = ref(false)

const errors = computed(() => {
  const result = {}
  if (request.from === '') result.from = 'Choose the first day.'
  if (request.to === '') result.to = 'Choose the last day.'
  else if (request.from !== '' && request.to < request.from) result.to = 'The last day is before the first.'
  return result
})

const shown = computed(() => (submitted.value ? errors.value : {}))

function submit() {
  submitted.value = true
  sent.value = Object.keys(errors.value).length === 0
}
</script>

<template>
  <section>
    <h2>Request</h2>
    <form class="fields" novalidate @submit.prevent="submit">
      <label for="from">First day</label>
      <input id="from" v-model="request.from" type="date">
      <p v-if="shown.from" class="error">{{ shown.from }}</p>
      <label for="to">Last day</label>
      <input id="to" v-model="request.to" type="date">
      <p v-if="shown.to" class="error">{{ shown.to }}</p>
      <button type="submit">Send request</button>
    </form>
    <p v-if="sent">The request is ready.</p>
  </section>
</template>
