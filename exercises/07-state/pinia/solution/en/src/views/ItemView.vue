<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth.js'
import { useRequestsStore } from '@/stores/requests.js'
import items from '../../data/items.json'

const props = defineProps({
  id: { type: Number, required: true },
})

const { member } = storeToRefs(useAuthStore())
const requests = useRequestsStore()
const item = computed(() => items.find((entry) => entry.id === props.id))
const requested = computed(() => requests.mine.some((request) => request.itemId === props.id))
</script>

<template>
  <section v-if="item">
    <h1>{{ item.name }}</h1>
    <p class="category">{{ item.category }}</p>
    <button v-if="member" type="button" class="request" :disabled="requested" @click="requests.add(item.id)">
      {{ requested ? 'Requested' : 'Request' }}
    </button>
    <p v-else>Sign in to send a request.</p>
  </section>
  <p v-else>This thing does not exist.</p>
</template>
