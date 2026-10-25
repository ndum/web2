<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/features/auth'
import { useCatalogStore } from '@/features/catalog'
import { formatDate } from '@/utils/format.js'

import { useReservationsStore } from './reservationsStore.js'

const { member } = storeToRefs(useAuthStore())
const catalog = useCatalogStore()
const reservations = useReservationsStore()
const message = ref('')

async function withdraw(request) {
  const error = await reservations.withdraw(request.id)
  message.value = error || `Anfrage ${request.id} zurückgezogen.`
}
</script>

<template>
  <section>
    <h1 tabindex="-1">Meine Anfragen</h1>
    <p v-if="!member">
      <RouterLink :to="{ name: 'login', query: { redirect: '/reservations' } }">Melde dich an</RouterLink>, um deine Anfragen zu sehen.
    </p>
    <p v-else-if="reservations.status === 'loading'" role="status">Die Anfragen werden geladen …</p>
    <p v-else-if="reservations.status === 'error'" class="error" role="alert">{{ reservations.error }}</p>
    <p v-else-if="reservations.list.length === 0">
      Noch keine Anfragen. Im <RouterLink :to="{ name: 'catalog' }">Katalog</RouterLink>
      fragst du auf der Seite eines Dings an.
    </p>
    <ul v-else class="requests">
      <li v-for="request in reservations.list" :key="request.id">
        <RouterLink :to="{ name: 'item', params: { id: request.itemId } }">{{ catalog.byId(request.itemId)?.name }}</RouterLink>,
        {{ formatDate(request.from) }} bis {{ formatDate(request.to) }}
        <button type="button" @click="withdraw(request)">
          Zurückziehen<span class="visually-hidden">: {{ catalog.byId(request.itemId)?.name }}, {{ formatDate(request.from) }}</span>
        </button>
      </li>
    </ul>
    <p class="message" role="status">{{ message }}</p>
  </section>
</template>
