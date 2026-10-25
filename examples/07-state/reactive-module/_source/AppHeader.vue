<script setup>
import { requests } from './requests.js'
</script>

<template>
  <header>
    <strong>Lorraine Commons</strong>
    <span>[%Anfragen|Requests%]: {{ requests.length }}</span>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
