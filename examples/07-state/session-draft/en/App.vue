<script setup>
import { reactive, ref, watch } from 'vue'

const KEY = 'lorraine-commons-draft-6'

// The draft belongs to this tab only and ends when the tab closes
function readDraft() {
  try {
    return { from: '', to: '', note: '', ...JSON.parse(sessionStorage.getItem(KEY)) }
  } catch {
    return { from: '', to: '', note: '' }
  }
}

const form = reactive(readDraft())
const sent = ref(false)

// Every change goes into the draft, an empty form removes it
watch(
  form,
  (value) => {
    if (Object.values(value).every((field) => field === '')) sessionStorage.removeItem(KEY)
    else sessionStorage.setItem(KEY, JSON.stringify(value))
  },
  { deep: true },
)

function submit() {
  sent.value = true
  Object.assign(form, { from: '', to: '', note: '' })
}
</script>

<template>
  <h1>Reserve the projector</h1>
  <form @submit.prevent="submit">
    <label for="from">First day</label>
    <input id="from" v-model="form.from" type="date">
    <label for="to">Last day</label>
    <input id="to" v-model="form.to" type="date">
    <label for="note">Note</label>
    <textarea id="note" v-model="form.note" maxlength="200" />
    <button>Send request</button>
  </form>
  <p v-if="sent" role="status">Sent, the draft is deleted.</p>
</template>

<style scoped>
form {
  display: grid;
  gap: 0.25rem;
  max-width: 20rem;
}
</style>
