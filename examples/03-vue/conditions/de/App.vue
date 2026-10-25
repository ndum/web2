<script setup>
// Try 'loading' and 'error' as well
const status = 'ready'
const itemCount = 60
const showRules = false
</script>

<template>
  <p v-if="status === 'loading'">Der Katalog wird geladen …</p>
  <p v-else-if="status === 'error'">Der Server ist nicht erreichbar.</p>
  <p v-else>{{ itemCount }} Dinge im Katalog</p>
  <!-- v-show only hides the element with CSS, it stays in the page -->
  <p v-show="showRules">Eine Ausleihe dauert höchstens sieben Tage.</p>
</template>
