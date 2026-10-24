<script setup>
import { version } from 'vue'

import OpeningHours from '@/components/OpeningHours.vue'
import items from '../data/items.json'

// Vite sets the mode, development for npm run dev and production for the build
const mode = import.meta.env.MODE
</script>

<template>
  <header>
    <h1>Lorraine Commons</h1>
    <p>{{ items.length }} Dinge im Katalog</p>
  </header>
  <main>
    <OpeningHours />
  </main>
  <footer>Gebaut mit Vue {{ version }}, Modus {{ mode }}</footer>
</template>
