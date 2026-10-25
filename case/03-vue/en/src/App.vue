<script setup>
import { computed, reactive, ref } from 'vue'

import { formatDate, formatDeposit } from './format.js'
import { loadItems } from './load.js'
import { validateRequest } from './reservation.js'
import { parseRoute } from './router.js'

// The catalog from the association's server
const status = ref('loading')
const items = ref([])
const loadError = ref('')

// Vite puts the value of the variable into the code, /items is the default
loadItems(import.meta.env.VITE_CATALOG_URL ?? '/items')
  .then((data) => {
    items.value = data
    status.value = 'success'
  })
  .catch((error) => {
    loadError.value = error.message
    status.value = 'error'
  })

// The hash routes of part 2. The app lives as long as the page, so the listener stays.
const hash = ref(location.hash)
addEventListener('hashchange', () => {
  hash.value = location.hash
  resetRequest()
  summary.value = ''
})
const route = computed(() => parseRoute(hash.value))
const currentItem = computed(() => items.value.find((item) => item.id === route.value.id))

// Search and filter of the catalog
const query = ref('')
const category = ref('')

const availableCount = computed(() => items.value.filter((item) => item.availableFrom === null).length)

// Every category once, in alphabetical order
const categories = computed(() =>
  [...new Set(items.value.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'en')),
)

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.value.filter(
    (item) => item.name.toLowerCase().includes(text) && (category.value === '' || item.category === category.value),
  )
})

const hits = computed(() =>
  visibleItems.value.length === 1 ? '1 thing found' : `${visibleItems.value.length} things found`,
)

// The reservation request on the page of a thing
const request = reactive({ member: '', from: '', to: '', note: '' })
const touched = ref({})
const submitted = ref(false)
const summary = ref('')

const errors = computed(() => (currentItem.value ? validateRequest(request, currentItem.value) : {}))

// A message appears once someone has left the field or sent the form
const shownErrors = computed(() => {
  const result = {}
  for (const [field, message] of Object.entries(errors.value)) {
    if (touched.value[field] || submitted.value) result[field] = message
  }
  return result
})

// Change the fields of the reactive object, never replace the object itself
function resetRequest() {
  request.member = ''
  request.from = ''
  request.to = ''
  request.note = ''
  touched.value = {}
  submitted.value = false
}

function submit() {
  submitted.value = true
  if (Object.keys(errors.value).length > 0) return
  const { member, from, to, note } = request
  const name = currentItem.value.name
  summary.value =
    `Reservation request from ${member} for ${name} from ${formatDate(from)} to ${formatDate(to)} recorded.` +
    (note === '' ? '' : ` Note: ${note}`)
  resetRequest()
}
</script>

<template>
  <header class="site">
    <a href="#/" class="brand">Lorraine Commons</a>
  </header>
  <main>
    <p v-if="status === 'loading'" class="message">Loading the catalog …</p>
    <p v-else-if="status === 'error'" class="message">{{ loadError }}</p>

    <section v-else-if="route.name === 'catalog'">
      <h1>Catalog</h1>
      <p class="summary">{{ availableCount }} of {{ items.length }} things are in</p>
      <div class="filters">
        <label for="search">Search</label>
        <input id="search" v-model="query" type="search">
        <label for="category">Category</label>
        <select id="category" v-model="category">
          <option value="">All categories</option>
          <option v-for="name in categories" :key="name">{{ name }}</option>
        </select>
      </div>
      <p class="hits">{{ hits }}</p>
      <ul v-if="visibleItems.length > 0" class="catalog">
        <li v-for="item in visibleItems" :key="item.id" :class="{ 'on-loan': item.availableFrom !== null }">
          <a :href="`#/items/${item.id}`" class="name">{{ item.name }}</a>
          <span class="category">{{ item.category }}</span>
          <span class="state">{{ item.availableFrom === null ? 'Available' : 'On loan' }}</span>
        </li>
      </ul>
      <p v-else class="empty">No things found.</p>
    </section>

    <article v-else-if="route.name === 'item' && currentItem">
      <h1>{{ currentItem.name }}</h1>
      <p>{{ currentItem.category }}, deposit {{ formatDeposit(currentItem.deposit) }}</p>
      <p v-if="currentItem.availableFrom === null" class="state">Available</p>
      <p v-else class="state">Available again from {{ formatDate(currentItem.availableFrom) }}</p>

      <h2>Request a reservation</h2>
      <form class="fields" novalidate @submit.prevent="submit">
        <label for="member">Member number</label>
        <input
          id="member"
          v-model.trim="request.member"
          :aria-invalid="!!shownErrors.member"
          :aria-describedby="shownErrors.member ? 'member-error' : undefined"
          @blur="touched.member = true"
        >
        <p v-if="shownErrors.member" id="member-error" class="error">{{ shownErrors.member }}</p>

        <label for="from">First day</label>
        <input
          id="from"
          v-model="request.from"
          type="date"
          :aria-invalid="!!shownErrors.from"
          :aria-describedby="shownErrors.from ? 'from-error' : undefined"
          @blur="touched.from = true"
        >
        <p v-if="shownErrors.from" id="from-error" class="error">{{ shownErrors.from }}</p>

        <label for="to">Last day</label>
        <input
          id="to"
          v-model="request.to"
          type="date"
          :aria-invalid="!!shownErrors.to"
          :aria-describedby="shownErrors.to ? 'to-error' : undefined"
          @blur="touched.to = true"
        >
        <p v-if="shownErrors.to" id="to-error" class="error">{{ shownErrors.to }}</p>

        <label for="note">Note, optional</label>
        <textarea id="note" v-model.trim="request.note" maxlength="200"></textarea>

        <button type="submit">Send request</button>
      </form>
      <p class="request-summary" role="status">{{ summary }}</p>
      <a href="#/">Back to the catalog</a>
    </article>

    <p v-else-if="route.name === 'item'" class="message">This thing does not exist.</p>
    <p v-else class="message">This page does not exist.</p>
  </main>
</template>
