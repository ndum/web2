<script setup>
import { remove, requests } from './requests.js'
</script>

<template>
  <h2>My requests</h2>
  <p v-if="requests.length === 0">No requests yet.</p>
  <ul v-else>
    <li v-for="request in requests" :key="request.id">
      {{ request.name }}
      <button type="button" @click="remove(request.id)">Withdraw</button>
    </li>
  </ul>
</template>
