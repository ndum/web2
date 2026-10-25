<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { signIn } from '@/auth.js'

const route = useRoute()
const router = useRouter()
const number = ref('')
const error = ref('')

function submit() {
  if (!signIn(number.value)) {
    error.value = '[%Diese Mitgliedernummer kennen wir nicht.|We do not know this member number.%]'
    return
  }
  router.push({ name: 'catalog' })
}
</script>

<template>
  <h1>[%Anmelden|Sign in%]</h1>
  <form class="fields" novalidate @submit.prevent="submit">
    <label for="member">[%Mitgliedernummer|Member number%]</label>
    <input id="member" v-model="number" autocomplete="username">
    <p v-if="error" class="error">{{ error }}</p>
    <button type="submit">[%Anmelden|Sign in%]</button>
  </form>
  <p v-if="route.query.redirect">[%Danach geht es weiter zu|Afterwards you go on to%] {{ route.query.redirect }}</p>
</template>
