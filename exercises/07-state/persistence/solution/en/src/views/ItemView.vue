<script setup>
import { computed, reactive, ref, watch } from 'vue'

import items from '../../data/items.json'

const props = defineProps({
  id: { type: Number, required: true },
})

const item = computed(() => items.find((entry) => entry.id === props.id))

// The draft of each thing belongs to this tab only and ends when the tab closes
const key = computed(() => `lorraine-commons-draft-${props.id}`)

function readDraft() {
  try {
    return { from: '', to: '', note: '', ...JSON.parse(sessionStorage.getItem(key.value)) }
  } catch {
    return { from: '', to: '', note: '' }
  }
}

const form = reactive(readDraft())
const sent = ref(false)

// The router keeps the page when only the id changes, the form then takes the draft of the new thing
watch(key, () => Object.assign(form, readDraft()))

// Every change goes into the draft, an empty form removes it
watch(
  form,
  (value) => {
    if (Object.values(value).every((field) => field === '')) sessionStorage.removeItem(key.value)
    else sessionStorage.setItem(key.value, JSON.stringify(value))
  },
  { deep: true },
)

function submit() {
  sent.value = true
  Object.assign(form, { from: '', to: '', note: '' })
}
</script>

<template>
  <section v-if="item">
    <h1>{{ item.name }}</h1>
    <form class="fields" @submit.prevent="submit">
      <label for="from">First day</label>
      <input id="from" v-model="form.from" type="date">
      <label for="to">Last day</label>
      <input id="to" v-model="form.to" type="date">
      <label for="note">Note, optional</label>
      <textarea id="note" v-model="form.note" maxlength="200" />
      <button>Send request</button>
    </form>
    <p v-if="sent" role="status">The request is noted.</p>
  </section>
  <p v-else>This thing does not exist.</p>
</template>
