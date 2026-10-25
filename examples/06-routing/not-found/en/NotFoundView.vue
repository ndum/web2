<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>Page not found</h1>
  <p>There is no page at this address.</p>
  <p>pathMatch: {{ JSON.stringify(route.params.pathMatch) }}</p>
  <RouterLink to="/">Back to the catalog</RouterLink>
</template>
