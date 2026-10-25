<script setup>
import { onMounted, useTemplateRef } from 'vue'

// The element with ref="search" in the template, null until the component is mounted
const search = useTemplateRef('search')

onMounted(() => {
  search.value.focus()
})
</script>

<template>
  <label for="search">Suchen</label>
  <input id="search" ref="search" type="search">
</template>
