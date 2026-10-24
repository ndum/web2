<script setup>
// App binds the search text with v-model, the field reads it and changes it
const query = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="search">
    <label for="search">[%Suchen|Search%]</label>
    <input id="search" v-model="query" type="search">
  </div>
</template>
