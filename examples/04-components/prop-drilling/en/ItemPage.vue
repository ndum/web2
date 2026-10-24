<script setup>
import ReservationForm from './ReservationForm.vue'

// ItemPage does not use member itself, it only passes it on
defineProps({ member: { type: Object, required: true } })
</script>

<template>
  <h1>Drill</h1>
  <ReservationForm :member="member" />
</template>
