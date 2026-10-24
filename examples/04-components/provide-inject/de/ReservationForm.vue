<script setup>
import { inject, ref } from 'vue'

import { memberKey } from './keys.js'

// Without a provider, inject returns the default value null
const member = inject(memberKey, null)
const memberNumber = ref(member?.value.number ?? '')
</script>

<template>
  <p v-if="member">Angemeldet als {{ member.name }}</p>
  <label for="member">Mitgliedernummer</label>
  <input id="member" v-model="memberNumber">
</template>
