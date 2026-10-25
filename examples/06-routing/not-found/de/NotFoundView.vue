<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>Seite nicht gefunden</h1>
  <p>Unter dieser Adresse gibt es keine Seite.</p>
  <p>pathMatch: {{ JSON.stringify(route.params.pathMatch) }}</p>
  <RouterLink to="/">Zum Katalog</RouterLink>
</template>
