<script setup>
import { ref } from 'vue'

import items from '../../data/items.json'

const loans = items.filter((item) => item.availableFrom !== null)
const chosen = ref(loans[0].id)
const message = ref('')

// Until part 7 the return only produces a message, the server records it then
function record() {
  const item = loans.find((entry) => entry.id === chosen.value)
  message.value = `Rückgabe von ${item.name} erfasst.`
}
</script>

<template>
  <h2>Rückgaben</h2>
  <form class="fields" @submit.prevent="record">
    <label for="returned">Ding</label>
    <select id="returned" v-model="chosen">
      <option v-for="item in loans" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
    <button type="submit">Rückgabe erfassen</button>
  </form>
  <p class="message" role="status">{{ message }}</p>
</template>
