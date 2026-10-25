<script setup>
import { computed, ref } from 'vue'

const name = ref('')
const category = ref('')
const deposit = ref('')
const touched = ref({})
const submitted = ref(false)
const thanks = ref('')

// One message per field with a problem, an empty object means the form is valid
const errors = computed(() => {
  const result = {}
  if (name.value.trim() === '') result.name = 'Enter the name of the thing.'
  if (category.value === '') result.category = 'Choose a category.'
  if (typeof deposit.value !== 'number' || deposit.value < 10 || deposit.value > 80) {
    result.deposit = 'The deposit is between 10 and 80 francs.'
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
  thanks.value = `Thank you for suggesting ${name.value.trim()}.`
  name.value = ''
  category.value = ''
  deposit.value = ''
  touched.value = {}
  submitted.value = false
}
</script>

<template>
  <h1>Suggest a thing</h1>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="name">Name of the thing</label>
    <input
      id="name"
      v-model="name"
      :aria-invalid="!!shownErrors.name"
      :aria-describedby="shownErrors.name ? 'name-error' : undefined"
      @blur="touched.name = true"
    >
    <p v-if="shownErrors.name" id="name-error" class="error">{{ shownErrors.name }}</p>

    <label for="category">Category</label>
    <select
      id="category"
      v-model="category"
      :aria-invalid="!!shownErrors.category"
      :aria-describedby="shownErrors.category ? 'category-error' : undefined"
      @blur="touched.category = true"
    >
      <option value="">Please choose</option>
      <option>Tools</option>
      <option>Garden</option>
      <option>Kitchen</option>
      <option>Camping</option>
      <option>Kids</option>
      <option>Parties</option>
    </select>
    <p v-if="shownErrors.category" id="category-error" class="error">{{ shownErrors.category }}</p>

    <label for="deposit">Deposit in francs</label>
    <input
      id="deposit"
      v-model="deposit"
      type="number"
      min="10"
      max="80"
      :aria-invalid="!!shownErrors.deposit"
      :aria-describedby="shownErrors.deposit ? 'deposit-error' : undefined"
      @blur="touched.deposit = true"
    >
    <p v-if="shownErrors.deposit" id="deposit-error" class="error">{{ shownErrors.deposit }}</p>

    <button type="submit">Suggest</button>
  </form>
  <!-- The status element is always there, so screen readers announce new text -->
  <p role="status">{{ thanks }}</p>
</template>

<style>
.fields {
  display: grid;
  gap: 0.4rem;
  max-width: 22rem;
}
.error {
  margin: 0;
  color: #a3341f;
}
</style>
