<script setup>
import { computed } from 'vue'

const props = defineProps(['loans', 'today'])

const overdue = computed(function () {
  return this.loans.filter((loan) => loan.until < this.today)
})
</script>

<script>
export default {
  filters: {
    date(value) {
      return new Date(value).toLocaleDateString('en-US', { timeZone: 'UTC' })
    },
  },
}
</script>

<template>
  <h2>Overdue loans</h2>
  <ul class="overdue">
    <li v-for="loan in overdue" :key="loan.id">{{ loan.name }}, due since {{ loan.until | date }}</li>
  </ul>
</template>
