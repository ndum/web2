<script setup>
import { ref } from 'vue'

import items from '../data/items.json'

const drill = items[0]
const open = ref(false)
</script>

<template>
  <header class="page-header">Lorraine Commons</header>
  <main>
    <h1>{{ drill.name }}</h1>
    <button type="button" class="send" @click="open = true">Send request</button>
    <h2>More things</h2>
    <ul class="catalog">
      <li v-for="item in items.slice(0, 6)" :key="item.id">{{ item.name }}</li>
    </ul>
  </main>
  <footer class="page-footer">Wednesday 5 to 7 p.m., Saturday 10 a.m. to 1 p.m.</footer>
</template>
