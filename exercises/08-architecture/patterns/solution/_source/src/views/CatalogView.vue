<script setup>
import { computed, onMounted, ref } from 'vue'

import { fetchItems } from '@/api/items.js'
import ItemCard from '@/components/ItemCard.vue'
import { sorters } from '@/sorters.js'
import { useFavoritesStore } from '@/stores/favorites.js'

// The page is the container. It knows the store and the API, the cards only get props.
const favorites = useFavoritesStore()
const items = ref([])
const sort = ref('name')

onMounted(async () => {
  items.value = await fetchItems()
})

const sorted = computed(() => items.value.toSorted(sorters[sort.value].compare))
</script>

<template>
  <h1>[%Katalog|Catalog%]</h1>
  <label for="sort">[%Sortieren nach|Sort by%]</label>
  <select id="sort" v-model="sort">
    <option v-for="(sorter, key) in sorters" :key="key" :value="key">{{ sorter.label }}</option>
  </select>
  <ul class="catalog">
    <ItemCard
      v-for="item in sorted"
      :id="item.id"
      :key="item.id"
      :name="item.name"
      :category="item.category"
      :deposit="item.deposit"
      :favorite="favorites.isFavorite(item.id)"
      @toggle-favorite="favorites.toggle"
    />
  </ul>
</template>
