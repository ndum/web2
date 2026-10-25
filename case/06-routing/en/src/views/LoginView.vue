<script setup>
import { computed, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { signIn } from '@/auth.js'
import { memberKey } from '@/keys.js'

const member = inject(memberKey, null)
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

function submit() {
  if (!signIn(number.value)) {
    error.value = 'We do not know this member number.'
    return
  }
  router.replace(target())
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
    <p>Until part 7 the member number is enough. Then the association's server checks the password.</p>
  </section>
</template>
