<script setup>
import { storeToRefs } from 'pinia'
import { computed, onWatcherCleanup, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CategoryFilter from '@/components/CategoryFilter.vue'
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useSearch } from '@/composables/useSearch.js'
import { useCatalogStore } from '@/stores/catalog.js'
import { useFavoritesStore } from '@/stores/favorites.js'

const { items, availableCount } = storeToRefs(useCatalogStore())
const { isFavorite, toggle } = useFavoritesStore()
const route = useRoute()
const router = useRouter()

// Search text, category and sort order live in the address, so a link shows the same list.
// replace instead of push, the back button should not step through every change of the filter.
function changeQuery(changes) {
  router.replace({ query: { ...route.query, ...changes } })
}

// The field shows every keystroke, the address follows after a pause of 300 milliseconds
const query = ref(route.query.q ?? '')

watch(query, (text) => {
  if (text.trim() === (route.query.q ?? '')) return
  const timer = setTimeout(() => changeQuery({ q: text.trim() || undefined }), 300)
  onWatcherCleanup(() => clearTimeout(timer))
})

// A link or the back button changes the address, the field follows it
watch(
  () => route.query.q,
  (text) => {
    query.value = text ?? ''
  },
)

const category = computed({
  get: () => route.query.category ?? '',
  set: (value) => changeQuery({ category: value || undefined }),
})

const sort = computed({
  get: () => route.query.sort ?? '',
  set: (value) => changeQuery({ sort: value || undefined }),
})

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(items.value.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'en')),
)

const inCategory = computed(() => items.value.filter((item) => category.value === '' || item.category === category.value))
const { visibleItems, hits } = useSearch(inCategory, () => route.query.q ?? '')

const byName = (a, b) => a.name.localeCompare(b.name, 'en')
const byDeposit = (a, b) => a.deposit - b.deposit || byName(a, b)
const sortedItems = computed(() => visibleItems.value.toSorted(sort.value === 'deposit' ? byDeposit : byName))

const hitLabel = computed(() => (hits.value === 1 ? '1 thing found' : `${hits.value} things found`))
</script>

<template>
  <section>
    <h1 tabindex="-1">Catalog</h1>
    <p class="summary">{{ availableCount }} of {{ items.length }} things are in</p>
    <div class="filters">
      <SearchBar v-model="query" />
      <CategoryFilter v-model="category" :categories="categories" />
      <div class="filter">
        <label for="sort">Sort by</label>
        <select id="sort" v-model="sort">
          <option value="">Name</option>
          <option value="deposit">Deposit</option>
        </select>
      </div>
    </div>
    <p class="hits">{{ hitLabel }}</p>
    <ItemList :items="sortedItems">
      <template #item="{ item }">
        <ItemCard
          :id="item.id"
          :name="item.name"
          :category="item.category"
          :available="item.availableFrom === null"
          :favorite="isFavorite(item.id)"
          @toggle-favorite="toggle"
        />
      </template>
    </ItemList>
  </section>
</template>
