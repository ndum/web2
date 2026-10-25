<script setup>
import { computed, onMounted, ref } from 'vue'

import { fetchItems } from '@/api/items.js'
import ItemCard from '@/components/ItemCard.vue'

const things = ref([])
const sort = ref('name')

onMounted(async () => {
  things.value = await fetchItems()
})

// Every new order needs another branch here and another option in the template
const sorted = computed(() => {
  if (sort.value === 'deposit') return things.value.toSorted((a, b) => a.depositCents - b.depositCents)
  return things.value.toSorted((a, b) => a.title.localeCompare(b.title, '[%de-CH|en%]'))
})
</script>

<template>
  <h1>[%Katalog|Catalog%]</h1>
  <label for="sort">[%Sortieren nach|Sort by%]</label>
  <select id="sort" v-model="sort">
    <option value="name">[%Name|Name%]</option>
    <option value="deposit">[%Pfand|Deposit%]</option>
  </select>
  <ul class="catalog">
    <ItemCard v-for="thing in sorted" :key="thing.itemId" :thing="thing" />
  </ul>
</template>
