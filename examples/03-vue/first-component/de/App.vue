<script setup>
// Everything declared here can be used in the template
const association = 'Lorraine Commons'
const itemCount = 60
</script>

<template>
  <h1>{{ association }}</h1>
  <p>Bibliothek der Dinge im Lorraine-Quartier mit {{ itemCount }} Dingen im Katalog</p>
</template>

<style scoped>
h1 {
  color: #1f6b4f;
}
</style>
