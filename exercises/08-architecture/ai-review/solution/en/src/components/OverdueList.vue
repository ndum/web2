<script setup>
import { computed } from 'vue'

const props = defineProps({
  loans: { type: Array, required: true },
  today: { type: String, required: true },
})

// The loans whose day has passed, the oldest first. There is no this in <script setup>.
const overdue = computed(() =>
  props.loans.filter((loan) => loan.until < props.today).toSorted((a, b) => a.until.localeCompare(b.until)),
)

// Vue 3 has no filters, a function does the same job
function formatDate(value) {
  return new Date(value).toLocaleDateString('en-US', { timeZone: 'UTC' })
}
</script>

<template>
  <h2>Overdue loans</h2>
  <ul class="overdue">
    <li v-for="loan in overdue" :key="loan.id">{{ loan.name }}, due since {{ formatDate(loan.until) }}</li>
  </ul>
</template>
