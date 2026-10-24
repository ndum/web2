<script setup>
// The parent binds a value with v-model, the field reads it and changes it
const query = defineModel({ type: String, default: '' })
</script>

<template>
  <label for="search">Search</label>
  <input id="search" v-model="query" type="search">
</template>
