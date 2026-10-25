<script setup>
import { computed, ref } from 'vue'

import { sorters } from './sorters.js'
import { things } from './things.js'

const sort = ref('name')
// The page asks the chosen strategy and knows no order itself
const sorted = computed(() => things.toSorted(sorters[sort.value].compare))
</script>

<template>
  <label for="sort">Sortieren nach</label>
  <select id="sort" v-model="sort">
    <option v-for="(sorter, key) in sorters" :key="key" :value="key">{{ sorter.label }}</option>
  </select>
  <ol>
    <li v-for="thing in sorted" :key="thing.id">{{ thing.name }}, CHF {{ thing.deposit }}, {{ thing.availableFrom ?? 'da' }}</li>
  </ol>
</template>
