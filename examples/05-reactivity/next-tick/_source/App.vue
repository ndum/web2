<script setup>
import { nextTick, ref } from 'vue'

const count = ref(0)
const log = ref([])

async function add() {
  count.value++
  const before = document.querySelector('#count').textContent
  // Vue collects changes and updates the page once, after the current code
  await nextTick()
  const after = document.querySelector('#count').textContent
  log.value.push(`[%vor nextTick|before nextTick%] ${before}, [%nach nextTick|after nextTick%] ${after}`)
}
</script>

<template>
  <button type="button" @click="add">+1</button>
  <p id="count">{{ count }}</p>
  <ul>
    <li v-for="(entry, index) in log" :key="index">{{ entry }}</li>
  </ul>
</template>
