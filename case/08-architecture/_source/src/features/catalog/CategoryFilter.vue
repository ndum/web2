<script setup>
defineProps({ categories: { type: Array, required: true } })

// The catalog binds the chosen category with v-model
const category = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="filter">
    <label for="category">[%Kategorie|Category%]</label>
    <select id="category" v-model="category">
      <option value="">[%Alle Kategorien|All categories%]</option>
      <option v-for="name in categories" :key="name">{{ name }}</option>
    </select>
  </div>
</template>
