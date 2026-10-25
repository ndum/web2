<script setup>
import { ref } from 'vue'

import items from '../data/items.json'
import { formatDate, formatDeposit } from './format.js'

// The id of the thing whose details are open, null while all are closed
const openId = ref(null)

function toggle(id) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <h1>Katalog</h1>
  <p>{{ items.length }} Dinge</p>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id" :class="{ 'on-loan': item.availableFrom !== null }">
      <button type="button" class="name" :aria-expanded="openId === item.id" @click="toggle(item.id)">
        {{ item.name }}
      </button>
      <span class="category">{{ item.category }}</span>
      <span v-if="item.availableFrom === null" class="state">Verfügbar</span>
      <span v-else class="state">Wieder verfügbar ab {{ formatDate(item.availableFrom) }}</span>
      <p v-show="openId === item.id" class="details">Pfand {{ formatDeposit(item.deposit) }}</p>
    </li>
  </ul>
</template>
