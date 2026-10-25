<script setup>
import { storeToRefs } from 'pinia'

import RequestForm from '@/components/RequestForm.vue'
import { useRequestsStore } from '@/stores/requests.js'

const requests = useRequestsStore()
const { list, error } = storeToRefs(requests)
// Today in the form 2026-11-18, as a date field delivers it
const today = new Date().toISOString().slice(0, 10)
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
  </header>
  <main>
    <h1>Reserve the projector</h1>
    <RequestForm :today="today" @send="(request) => requests.send({ itemId: 6, ...request })" />
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <ul>
      <li v-for="request in list" :key="request.id">{{ request.id }}: {{ request.from }} to {{ request.to }}</li>
    </ul>
  </main>
</template>
