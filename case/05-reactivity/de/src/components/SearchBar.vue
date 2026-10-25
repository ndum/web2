<script setup>
import { onMounted, useTemplateRef } from 'vue'

// App binds the search text with v-model
const query = defineModel({ type: String, default: '' })

// The input field, null until the component is mounted
const input = useTemplateRef('input')

// Whoever opens the catalog can type right away
onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <div class="search">
    <label for="search">Suchen</label>
    <input id="search" ref="input" v-model="query" type="search">
  </div>
</template>
