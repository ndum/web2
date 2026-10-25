<script setup>
// App binds the search text with v-model
const query = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="search">
    <label for="search">Search</label>
    <input id="search" v-model="query" type="search">
  </div>
</template>
