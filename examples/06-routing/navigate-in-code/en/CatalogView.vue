<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const number = ref(6)

// push adds an entry to the history, the back button leads here again
function open() {
  router.push({ name: 'item', params: { id: number.value } })
}
</script>

<template>
  <h1>Catalog</h1>
  <form @submit.prevent="open">
    <label for="number">Number of the thing</label>
    <input id="number" v-model.number="number" type="number" min="1">
    <button type="submit">Open</button>
  </form>
</template>
