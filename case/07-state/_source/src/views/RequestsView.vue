<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { formatDate } from '@/format.js'
import { useAuthStore } from '@/stores/auth.js'
import { useCatalogStore } from '@/stores/catalog.js'
import { useReservationsStore } from '@/stores/reservations.js'

const { member } = storeToRefs(useAuthStore())
const catalog = useCatalogStore()
const reservations = useReservationsStore()
const message = ref('')

async function withdraw(request) {
  const error = await reservations.withdraw(request.id)
  message.value = error || `[%Anfrage ${request.id} zurückgezogen.|Request ${request.id} withdrawn.%]`
}
</script>

<template>
  <section>
    <h1 tabindex="-1">[%Meine Anfragen|My requests%]</h1>
    <p v-if="!member">
      <RouterLink :to="{ name: 'login', query: { redirect: '/reservations' } }">[%Melde dich an|Sign in%]</RouterLink>[%, um deine Anfragen zu sehen.|to see your requests.%]
    </p>
    <p v-else-if="reservations.status === 'loading'">[%Die Anfragen werden geladen …|Loading the requests …%]</p>
    <p v-else-if="reservations.status === 'error'" class="error" role="alert">{{ reservations.error }}</p>
    <p v-else-if="reservations.list.length === 0">
      [%Noch keine Anfragen. Im|No requests yet. In the%] <RouterLink :to="{ name: 'catalog' }">[%Katalog|catalog%]</RouterLink>
      [%fragst du auf der Seite eines Dings an.|you send a request on the page of a thing.%]
    </p>
    <ul v-else class="requests">
      <li v-for="request in reservations.list" :key="request.id">
        <RouterLink :to="{ name: 'item', params: { id: request.itemId } }">{{ catalog.byId(request.itemId)?.name }}</RouterLink>,
        {{ formatDate(request.from) }} [%bis|to%] {{ formatDate(request.to) }}
        <button type="button" @click="withdraw(request)">[%Zurückziehen|Withdraw%]</button>
      </li>
    </ul>
    <p class="message" role="status">{{ message }}</p>
  </section>
</template>
