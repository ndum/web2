<script setup>
import { computed, reactive, ref } from 'vue'

import { validateRequest } from '@/rules.js'

const props = defineProps({ today: { type: String, required: true } })
const emit = defineEmits(['send'])

const request = reactive({ from: '', to: '' })
const submitted = ref(false)
const errors = computed(() => validateRequest(request, props.today))

// The messages appear once someone has sent the form, a request with mistakes stays here
function submit() {
  submitted.value = true
  if (Object.keys(errors.value).length > 0) return
  emit('send', { ...request })
}
</script>

<template>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="from">First day</label>
    <input id="from" v-model="request.from" type="date">
    <p v-if="errors.from" class="error">{{ errors.from }}</p>
    <label for="to">Last day</label>
    <input id="to" v-model="request.to" type="date">
    <p v-if="errors.to" class="error">{{ errors.to }}</p>
    <button type="submit">Send request</button>
  </form>
</template>
