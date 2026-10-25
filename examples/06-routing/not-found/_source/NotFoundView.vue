<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>[%Seite nicht gefunden|Page not found%]</h1>
  <p>[%Unter dieser Adresse gibt es keine Seite.|There is no page at this address.%]</p>
  <p>pathMatch: {{ JSON.stringify(route.params.pathMatch) }}</p>
  <RouterLink to="/">[%Zum Katalog|Back to the catalog%]</RouterLink>
</template>
