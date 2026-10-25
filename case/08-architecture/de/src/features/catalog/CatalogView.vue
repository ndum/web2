<script setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, onWatcherCleanup, ref, useTemplateRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
import { useFavoritesStore } from '@/features/favorites'

import { useCatalogStore } from './catalogStore.js'
import CategoryFilter from './CategoryFilter.vue'
import SearchBar from './SearchBar.vue'
import { sorters } from './sorters.js'
import { useSearch } from './useSearch.js'

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

// The name is the default and stays out of the address
const sort = computed({
  get: () => (route.query.sort in sorters ? route.query.sort : 'name'),
  set: (value) => changeQuery({ sort: value === 'name' ? undefined : value }),
})

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(items.value.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'de-CH')),
)

const inCategory = computed(() => items.value.filter((item) => category.value === '' || item.category === category.value))
const { visibleItems, hits } = useSearch(inCategory, () => route.query.q ?? '')
const sortedItems = computed(() => visibleItems.value.toSorted(sorters[sort.value].compare))

const hitLabel = computed(() => (hits.value === 1 ? '1 Ding gefunden' : `${hits.value} Dinge gefunden`))

const searchBar = useTemplateRef('searchBar')

// Back from the page of a thing, the focus returns to the card of that thing, at the position the
// router restores, and the page does not jump. A new visit starts in the search field.
onMounted(() => {
  const cameFrom = window.history.state?.forward
  const id = typeof cameFrom === 'string' ? cameFrom.match(/\/items\/(\d+)$/)?.[1] : undefined
  const link = id && document.querySelector(`main .card a[href$="/items/${id}"]`)
  if (link) link.focus({ preventScroll: true })
  else searchBar.value.focus()
})
</script>

<template>
  <section>
    <h1 tabindex="-1">Katalog</h1>
    <p class="summary">{{ availableCount }} von {{ items.length }} Dingen sind da</p>
    <div class="filters">
      <SearchBar ref="searchBar" v-model="query" />
      <CategoryFilter v-model="category" :categories="categories" />
      <div class="filter">
        <label for="sort">Sortieren nach</label>
        <select id="sort" v-model="sort">
          <option v-for="(sorter, key) in sorters" :key="key" :value="key">{{ sorter.label }}</option>
        </select>
      </div>
    </div>
    <!-- A live region, a screen reader announces every new number of hits -->
    <p class="hits" role="status">{{ hitLabel }}</p>
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
