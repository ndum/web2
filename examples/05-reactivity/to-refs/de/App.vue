<script setup>
import { reactive, toRefs } from 'vue'

const filters = reactive({ query: '', category: '' })

// Destructuring copies the current value
const { query } = filters
// toRefs turns every field into a ref that stays connected to the object
const { category } = toRefs(filters)
</script>

<template>
  <button type="button" @click="filters.query = 'säge'">Suchtext setzen</button>
  <button type="button" @click="filters.category = 'Werkzeug'">Kategorie setzen</button>
  <p>Kopie von query: {{ JSON.stringify(query) }}</p>
  <p>Ref für category: {{ JSON.stringify(category) }}</p>
</template>
