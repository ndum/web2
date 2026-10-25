<script setup>
import { computed, ref } from 'vue'

import items from '../data/items.json'

const query = ref('')

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.filter((item) => item.name.toLowerCase().includes(text))
})
</script>

<template>
  <header class="site">
    <a href="#/" class="brand">Lorraine Commons</a>
    <span class="tagline">[%Bibliothek der Dinge im Lorraine-Quartier|Library of things in the Lorraine quarter%]</span>
  </header>
  <main>
    <h1>[%Katalog|Catalog%]</h1>
    <label for="search">[%Suchen|Search%]</label>
    <input id="search" v-model="query" type="search">
    <ul class="catalog">
      <li v-for="item in visibleItems" :key="item.id">
        <span class="name">{{ item.name }}</span>
        <span class="category">{{ item.category }}</span>
      </li>
    </ul>
  </main>
  <footer class="site-footer">
    <section>
      <h2>[%Öffnungszeiten|Opening hours%]</h2>
      <p>[%Mittwoch 17 bis 19 Uhr|Wednesday 5 to 7 p.m.%]</p>
      <p>[%Samstag 10 bis 13 Uhr|Saturday 10 a.m. to 1 p.m.%]</p>
    </section>
    <p>Lorraine Commons, Bern</p>
  </footer>
</template>
