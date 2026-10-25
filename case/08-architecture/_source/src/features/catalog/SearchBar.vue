<script setup>
import { useTemplateRef } from 'vue'

// The catalog binds the search text with v-model
const query = defineModel({ type: String, default: '' })

const input = useTemplateRef('input')

// The catalog decides when the field gets the focus
defineExpose({ focus: () => input.value.focus() })
</script>

<template>
  <div class="search">
    <label for="search">[%Suchen|Search%]</label>
    <input id="search" ref="input" v-model="query" type="search">
  </div>
</template>
