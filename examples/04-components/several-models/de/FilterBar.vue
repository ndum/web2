<script setup>
defineProps({ categories: { type: Array, required: true } })

// Each model has a name, the parent binds it with v-model:query and v-model:category
const query = defineModel('query', { type: String, default: '' })
const category = defineModel('category', { type: String, default: '' })
</script>

<template>
  <div class="filters">
    <label for="query">Suchen</label>
    <input id="query" v-model="query" type="search">
    <label for="category">Kategorie</label>
    <select id="category" v-model="category">
      <option value="">Alle Kategorien</option>
      <option v-for="name in categories" :key="name">{{ name }}</option>
    </select>
  </div>
</template>
