<script setup>
import { computed, inject } from 'vue'

import { memberKey } from '@/keys.js'

const props = defineProps({ favoriteCount: { type: Number, default: 0 } })

// Without a provider, inject returns the default value null
const member = inject(memberKey, null)

const favorites = computed(() =>
  props.favoriteCount === 1 ? '1 Favorit' : `${props.favoriteCount} Favoriten`,
)
</script>

<template>
  <div class="bar">
    <a href="#/" class="brand">Lorraine Commons</a>
    <span class="favorites">{{ favorites }}</span>
    <span v-if="member" class="member">Angemeldet als {{ member.name }}</span>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
}
.brand {
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
}
</style>
