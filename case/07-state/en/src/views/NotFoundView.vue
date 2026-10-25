<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section>
    <h1 tabindex="-1">Page not found</h1>
    <p>There is no page at this address.</p>
    <RouterLink :to="{ name: 'catalog' }">Back to the catalog</RouterLink>
  </section>
</template>
