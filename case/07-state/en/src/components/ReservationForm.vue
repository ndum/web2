<script setup>
import { computed, reactive, ref, watch } from 'vue'

import { draftKey, validateRequest } from '@/reservation.js'

const props = defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['submit'])

// The draft survives a reload of this tab and ends when the tab closes
function readDraft() {
  try {
    return { from: '', to: '', note: '', ...JSON.parse(sessionStorage.getItem(draftKey(props.item.id))) }
  } catch {
    return { from: '', to: '', note: '' }
  }
}

const request = reactive(readDraft())
const touched = ref({})
const submitted = ref(false)

// Every change goes into the draft, an empty form removes it
watch(
  request,
  (value) => {
    if (Object.values(value).every((field) => field === '')) sessionStorage.removeItem(draftKey(props.item.id))
    else sessionStorage.setItem(draftKey(props.item.id), JSON.stringify(value))
  },
  { deep: true },
)

const errors = computed(() => validateRequest(request, props.item))

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
  // A copy, so later input in the form does not change what was sent
  emit('submit', { ...request })
}
</script>

<template>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="from">First day</label>
    <input
      id="from"
      v-model="request.from"
      type="date"
      :aria-invalid="!!shownErrors.from"
      :aria-describedby="shownErrors.from ? 'from-error' : undefined"
      @blur="touched.from = true"
    >
    <p v-if="shownErrors.from" id="from-error" class="error">{{ shownErrors.from }}</p>

    <label for="to">Last day</label>
    <input
      id="to"
      v-model="request.to"
      type="date"
      :aria-invalid="!!shownErrors.to"
      :aria-describedby="shownErrors.to ? 'to-error' : undefined"
      @blur="touched.to = true"
    >
    <p v-if="shownErrors.to" id="to-error" class="error">{{ shownErrors.to }}</p>

    <label for="note">Note, optional</label>
    <textarea id="note" v-model.trim="request.note" maxlength="200"></textarea>

    <button type="submit">Send request</button>
  </form>
</template>
