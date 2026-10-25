<script setup>
import { storeToRefs } from 'pinia'

import { useAuthStore } from './auth.js'
import { useRequestsStore } from './requests.js'
import { things } from './things.js'

const auth = useAuthStore()
const requests = useRequestsStore()
const { member } = storeToRefs(auth)
const { mine } = storeToRefs(requests)
</script>

<template>
  <p v-if="member">
    Angemeldet als {{ member.name }}
    <button type="button" @click="auth.signOut()">Abmelden</button>
  </p>
  <p v-else>
    <button type="button" @click="auth.signIn('M-117')">Als M-117 anmelden</button>
    <button type="button" @click="auth.signIn('M-204')">Als M-204 anmelden</button>
  </p>
  <ul>
    <li v-for="thing in things" :key="thing.id">
      {{ thing.name }}
      <button type="button" :disabled="!member" @click="requests.add(thing)">Anfragen</button>
    </li>
  </ul>
  <h2>Meine Anfragen</h2>
  <ul>
    <li v-for="request in mine" :key="request.id">{{ request.name }}</li>
  </ul>
</template>
