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
    Signed in as {{ member.name }}
    <button type="button" @click="auth.signOut()">Sign out</button>
  </p>
  <p v-else>
    <button type="button" @click="auth.signIn('M-117')">Sign in as M-117</button>
    <button type="button" @click="auth.signIn('M-204')">Sign in as M-204</button>
  </p>
  <ul>
    <li v-for="thing in things" :key="thing.id">
      {{ thing.name }}
      <button type="button" :disabled="!member" @click="requests.add(thing)">Request</button>
    </li>
  </ul>
  <h2>My requests</h2>
  <ul>
    <li v-for="request in mine" :key="request.id">{{ request.name }}</li>
  </ul>
</template>
