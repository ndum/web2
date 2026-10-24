<script setup>
import { version } from 'vue'
</script>

<template>
  <main>
    <h1>Lorraine Commons</h1>
    <p>[%Alles bereit, Vue|Everything is ready, Vue%] {{ version }} [%läuft.|is running.%]</p>
  </main>
</template>

<style scoped>
main {
  max-width: 40rem;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}
</style>
