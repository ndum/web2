<script setup>
import { remove, requests } from './requests.js'
</script>

<template>
  <h2>[%Meine Anfragen|My requests%]</h2>
  <p v-if="requests.length === 0">[%Noch keine Anfragen.|No requests yet.%]</p>
  <ul v-else>
    <li v-for="request in requests" :key="request.id">
      {{ request.name }}
      <button type="button" @click="remove(request.id)">[%Zurückziehen|Withdraw%]</button>
    </li>
  </ul>
</template>
