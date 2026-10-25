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
      return new Date(value).toLocaleDateString('de-CH', { timeZone: 'UTC' })
    },
  },
}
</script>

<template>
  <h2>Überfällige Ausleihen</h2>
  <ul class="overdue">
    <li v-for="loan in overdue" :key="loan.id">{{ loan.name }}, fällig seit {{ loan.until | date }}</li>
  </ul>
</template>
