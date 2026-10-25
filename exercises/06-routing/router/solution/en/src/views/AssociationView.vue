<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1>Association</h1>
  <p>Lorraine Commons is a library of things in the Lorraine quarter of Bern. Its members borrow tools, camping gear and much more here.</p>
  <p>Open on Wednesday from 5 to 7 p.m. and on Saturday from 10 a.m. to 1 p.m.</p>
  <RouterLink :to="{ name: 'catalog' }">Back to the catalog</RouterLink>
</template>
