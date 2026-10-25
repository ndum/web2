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
    <button type="button" class="send" @click="open = true">Anfrage senden</button>
    <h2>Weitere Dinge</h2>
    <ul class="catalog">
      <li v-for="item in items.slice(0, 6)" :key="item.id">{{ item.name }}</li>
    </ul>
  </main>
  <footer class="page-footer">Mittwoch 17 bis 19 Uhr, Samstag 10 bis 13 Uhr</footer>
</template>
