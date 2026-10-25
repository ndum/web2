<script setup>
import ReservationForm from './ReservationForm.vue'

defineProps({ item: { type: Object, required: true } })
</script>

<template>
  <h1>{{ item.name }}</h1>
  <p>{{ item.category }}</p>
  <ReservationForm :item="item" />
</template>
