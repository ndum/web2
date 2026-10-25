<script setup>
defineProps({ categories: { type: Array, required: true } })

// The parent binds the chosen category with v-model
const category = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="filter">
    <label for="category">Kategorie</label>
    <select id="category" v-model="category">
      <option value="">Alle Kategorien</option>
      <option v-for="name in categories" :key="name">{{ name }}</option>
    </select>
  </div>
</template>
