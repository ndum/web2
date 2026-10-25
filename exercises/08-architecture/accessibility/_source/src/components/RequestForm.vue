<script setup>
import { computed, reactive, ref } from 'vue'

const request = reactive({ from: '', to: '' })
const submitted = ref(false)
const sent = ref(false)

const errors = computed(() => {
  const result = {}
  if (request.from === '') result.from = '[%Wähl den ersten Tag.|Choose the first day.%]'
  if (request.to === '') result.to = '[%Wähl den letzten Tag.|Choose the last day.%]'
  else if (request.from !== '' && request.to < request.from) result.to = '[%Der letzte Tag liegt vor dem ersten.|The last day is before the first.%]'
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
    <h2>[%Anfrage|Request%]</h2>
    <form class="fields" novalidate @submit.prevent="submit">
      <label for="from">[%Erster Tag|First day%]</label>
      <input id="from" v-model="request.from" type="date">
      <p v-if="shown.from" class="error">{{ shown.from }}</p>
      <label for="to">[%Letzter Tag|Last day%]</label>
      <input id="to" v-model="request.to" type="date">
      <p v-if="shown.to" class="error">{{ shown.to }}</p>
      <button type="submit">[%Anfrage senden|Send request%]</button>
    </form>
    <p v-if="sent">[%Die Anfrage ist bereit.|The request is ready.%]</p>
  </section>
</template>
