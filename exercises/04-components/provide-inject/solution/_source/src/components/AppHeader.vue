<script setup>
import { inject } from 'vue'

import { memberKey } from '@/keys.js'

// Without a provider, inject returns the default value null
const member = inject(memberKey, null)
</script>

<template>
  <header class="site">
    <a href="#/" class="brand">Lorraine Commons</a>
    <p v-if="member" class="member">[%Angemeldet als|Signed in as%] {{ member.name }}</p>
  </header>
</template>
