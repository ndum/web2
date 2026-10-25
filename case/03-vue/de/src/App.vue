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
  [...new Set(items.value.map((item) => item.category))].sort((a, b) => a.localeCompare(b, 'de-CH')),
)

const visibleItems = computed(() => {
  const text = query.value.trim().toLowerCase()
  return items.value.filter(
    (item) => item.name.toLowerCase().includes(text) && (category.value === '' || item.category === category.value),
  )
})

const hits = computed(() =>
  visibleItems.value.length === 1 ? '1 Ding gefunden' : `${visibleItems.value.length} Dinge gefunden`,
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
    `Reservationsanfrage von ${member} für ${name} vom ${formatDate(from)} bis ${formatDate(to)} erfasst.` +
    (note === '' ? '' : ` Notiz: ${note}`)
  resetRequest()
}
</script>

<template>
  <header class="site">
    <a href="#/" class="brand">Lorraine Commons</a>
  </header>
  <main>
    <p v-if="status === 'loading'" class="message">Der Katalog wird geladen …</p>
    <p v-else-if="status === 'error'" class="message">{{ loadError }}</p>

    <section v-else-if="route.name === 'catalog'">
      <h1>Katalog</h1>
      <p class="summary">{{ availableCount }} von {{ items.length }} Dingen sind da</p>
      <div class="filters">
        <label for="search">Suchen</label>
        <input id="search" v-model="query" type="search">
        <label for="category">Kategorie</label>
        <select id="category" v-model="category">
          <option value="">Alle Kategorien</option>
          <option v-for="name in categories" :key="name">{{ name }}</option>
        </select>
      </div>
      <p class="hits">{{ hits }}</p>
      <ul v-if="visibleItems.length > 0" class="catalog">
        <li v-for="item in visibleItems" :key="item.id" :class="{ 'on-loan': item.availableFrom !== null }">
          <a :href="`#/items/${item.id}`" class="name">{{ item.name }}</a>
          <span class="category">{{ item.category }}</span>
          <span class="state">{{ item.availableFrom === null ? 'Verfügbar' : 'Ausgeliehen' }}</span>
        </li>
      </ul>
      <p v-else class="empty">Keine Dinge gefunden.</p>
    </section>

    <article v-else-if="route.name === 'item' && currentItem">
      <h1>{{ currentItem.name }}</h1>
      <p>{{ currentItem.category }}, Pfand {{ formatDeposit(currentItem.deposit) }}</p>
      <p v-if="currentItem.availableFrom === null" class="state">Verfügbar</p>
      <p v-else class="state">Wieder verfügbar ab {{ formatDate(currentItem.availableFrom) }}</p>

      <h2>Reservation anfragen</h2>
      <form class="fields" novalidate @submit.prevent="submit">
        <label for="member">Mitgliedernummer</label>
        <input
          id="member"
          v-model.trim="request.member"
          :aria-invalid="!!shownErrors.member"
          :aria-describedby="shownErrors.member ? 'member-error' : undefined"
          @blur="touched.member = true"
        >
        <p v-if="shownErrors.member" id="member-error" class="error">{{ shownErrors.member }}</p>

        <label for="from">Erster Tag</label>
        <input
          id="from"
          v-model="request.from"
          type="date"
          :aria-invalid="!!shownErrors.from"
          :aria-describedby="shownErrors.from ? 'from-error' : undefined"
          @blur="touched.from = true"
        >
        <p v-if="shownErrors.from" id="from-error" class="error">{{ shownErrors.from }}</p>

        <label for="to">Letzter Tag</label>
        <input
          id="to"
          v-model="request.to"
          type="date"
          :aria-invalid="!!shownErrors.to"
          :aria-describedby="shownErrors.to ? 'to-error' : undefined"
          @blur="touched.to = true"
        >
        <p v-if="shownErrors.to" id="to-error" class="error">{{ shownErrors.to }}</p>

        <label for="note">Notiz, freiwillig</label>
        <textarea id="note" v-model.trim="request.note" maxlength="200"></textarea>

        <button type="submit">Anfrage senden</button>
      </form>
      <p class="request-summary" role="status">{{ summary }}</p>
      <a href="#/">Zum Katalog</a>
    </article>

    <p v-else-if="route.name === 'item'" class="message">Dieses Ding gibt es nicht.</p>
    <p v-else class="message">Diese Seite gibt es nicht.</p>
  </main>
</template>
