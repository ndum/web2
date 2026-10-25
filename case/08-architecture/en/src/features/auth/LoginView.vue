<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from './authStore.js'

const auth = useAuthStore()
const { member } = storeToRefs(auth)
const route = useRoute()
const router = useRouter()
const number = ref('')
const error = ref('')

// A member without a team account who tried to open the team area learns why the login appears
const notice = computed(() =>
  member.value && route.query.redirect
    ? `You are signed in as ${member.value.name}. The team area needs a team account.`
    : '',
)

// The target comes from the address, so it is input from outside. Only paths inside the app count.
function target() {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
}

// The API answers with a message when it does not know the number
async function submit() {
  error.value = await auth.signIn(number.value)
  if (error.value === '') router.replace(target())
}
</script>

<template>
  <section>
    <h1 tabindex="-1">Sign in</h1>
    <p v-if="notice" class="notice">{{ notice }}</p>
    <form class="fields" novalidate @submit.prevent="submit">
      <label for="member-number">Member number</label>
      <input
        id="member-number"
        v-model="number"
        autocomplete="username"
        :aria-invalid="error !== ''"
        :aria-describedby="error ? 'login-error' : undefined"
      >
      <p v-if="error" id="login-error" class="error">{{ error }}</p>
      <button type="submit">Sign in</button>
    </form>
    <p>The course API checks the member number and keeps the login until you close the browser. A real login also needs a password.</p>
  </section>
</template>
