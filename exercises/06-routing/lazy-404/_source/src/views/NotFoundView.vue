<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1>[%Seite nicht gefunden|Page not found%]</h1>
  <p>[%Unter dieser Adresse gibt es keine Seite.|There is no page at this address.%]</p>
  <RouterLink :to="{ name: 'catalog' }">[%Zum Katalog|Back to the catalog%]</RouterLink>
</template>
