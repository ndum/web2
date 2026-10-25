<script setup>
import items from '../data/items.json'
</script>

<template>
  <header class="site">
    <span class="brand">Lorraine Commons</span>
  </header>
  <main>
    <h1>Catalog</h1>
    <p>The decisions about this app are in docs/adr.</p>
    <ul class="catalog">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </main>
</template>
