<script setup>
import { computed, onWatcherCleanup, ref, watch } from 'vue'

import CategoryFilter from '@/components/CategoryFilter.vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useSearch } from '@/composables/useSearch.js'

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
  [...new Set(props.items.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'de-CH')),
)

// The list follows the search field after a pause of 300 milliseconds
const settledQuery = ref(query.value)

watch(query, (text) => {
  const timer = setTimeout(() => {
    settledQuery.value = text
  }, 300)
  // The next keystroke clears the timer of this one
  onWatcherCleanup(() => clearTimeout(timer))
})

const inCategory = computed(() => props.items.filter((item) => category.value === '' || item.category === category.value))
const { visibleItems, hits } = useSearch(inCategory, settledQuery)

const hitLabel = computed(() => (hits.value === 1 ? '1 Ding gefunden' : `${hits.value} Dinge gefunden`))
</script>

<template>
  <section>
    <h1>Katalog</h1>
    <p class="summary">{{ availableCount }} von {{ items.length }} Dingen sind da</p>
    <div class="filters">
      <SearchBar v-model="query" />
      <CategoryFilter v-model="category" :categories="categories" />
    </div>
    <p class="hits">{{ hitLabel }}</p>
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
