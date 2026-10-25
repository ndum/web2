<script setup>
import { computed } from 'vue'

import CategoryFilter from '@/components/CategoryFilter.vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import SearchBar from '@/components/SearchBar.vue'

const props = defineProps({
  items: { type: Array, required: true },
  favorites: { type: Array, default: () => [] },
})
const emit = defineEmits(['reserve', 'toggleFavorite'])

// App owns search text and category, the page reads and changes them through two models
const query = defineModel('query', { type: String, default: '' })
const category = defineModel('category', { type: String, default: '' })

const availableCount = computed(() => props.items.filter((item) => item.availableFrom === null).length)

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(props.items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, '[%de-CH|en%]')),
)

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return props.items.filter(
    (item) => item.name.toLowerCase().includes(text) && (category.value === '' || item.category === category.value),
  )
})

const hits = computed(() =>
  visibleItems.value.length === 1 ? '[%1 Ding gefunden|1 thing found%]' : `${visibleItems.value.length} [%Dinge gefunden|things found%]`,
)
</script>

<template>
  <section>
    <h1>[%Katalog|Catalog%]</h1>
    <p class="summary">{{ availableCount }} [%von|of%] {{ items.length }} [%Dingen sind da|things are in%]</p>
    <div class="filters">
      <SearchBar v-model="query" />
      <CategoryFilter v-model="category" :categories="categories" />
    </div>
    <p class="hits">{{ hits }}</p>
    <ItemList :items="visibleItems">
      <template #item="{ item }">
        <ItemCard
          :id="item.id"
          :name="item.name"
          :category="item.category"
          :available="item.availableFrom === null"
          :favorite="favorites.includes(item.id)"
          @reserve="emit('reserve', $event)"
          @toggle-favorite="emit('toggleFavorite', $event)"
        />
      </template>
    </ItemList>
  </section>
</template>
