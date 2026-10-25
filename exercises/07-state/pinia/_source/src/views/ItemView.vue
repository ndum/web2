<script setup>
import { computed } from 'vue'

import { currentMember } from '@/auth.js'
import items from '../../data/items.json'

const props = defineProps({
  id: { type: Number, required: true },
})

const item = computed(() => items.find((entry) => entry.id === props.id))
</script>

<template>
  <section v-if="item">
    <h1>{{ item.name }}</h1>
    <p class="category">{{ item.category }}</p>
    <button v-if="currentMember" type="button" class="request">[%Anfragen|Request%]</button>
    <p v-else>[%Zum Anfragen meldest du dich an.|Sign in to send a request.%]</p>
  </section>
  <p v-else>[%Dieses Ding gibt es nicht.|This thing does not exist.%]</p>
</template>
