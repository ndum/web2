<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1 tabindex="-1">Seite nicht gefunden</h1>
  <p>Unter dieser Adresse gibt es keine Seite.</p>
  <RouterLink :to="{ name: 'catalog' }">Zum Katalog</RouterLink>
</template>
