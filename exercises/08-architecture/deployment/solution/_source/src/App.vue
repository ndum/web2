<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site">
    <RouterLink to="/" class="brand">Lorraine Commons</RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>
