<script setup>
import { remove, requests } from './requests.js'
</script>

<template>
  <h2>Meine Anfragen</h2>
  <p v-if="requests.length === 0">Noch keine Anfragen.</p>
  <ul v-else>
    <li v-for="request in requests" :key="request.id">
      {{ request.name }}
      <button type="button" @click="remove(request.id)">Zurückziehen</button>
    </li>
  </ul>
</template>
