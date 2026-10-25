<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1>Verein</h1>
  <p>Lorraine Commons ist eine Bibliothek der Dinge im Lorraine-Quartier in Bern. Die Mitglieder leihen hier Werkzeug, Campingsachen und vieles mehr aus.</p>
  <p>Offen am Mittwoch von 17 bis 19 Uhr und am Samstag von 10 bis 13 Uhr.</p>
  <RouterLink :to="{ name: 'catalog' }">Zum Katalog</RouterLink>
</template>
