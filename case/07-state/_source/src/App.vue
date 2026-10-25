<script setup>
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { RouterView } from 'vue-router'

import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import PageLayout from '@/components/PageLayout.vue'
import { useAuthStore } from '@/stores/auth.js'
import { useCatalogStore } from '@/stores/catalog.js'
import { useReservationsStore } from '@/stores/reservations.js'

const catalog = useCatalogStore()
const auth = useAuthStore()
const reservations = useReservationsStore()
const { member } = storeToRefs(auth)

// The catalog comes from the course API, the login from the session cookie of the last visit
catalog.load()
auth.restore()

// The requests belong to whoever is signed in, after signing out none of them stays in memory
watch(member, (now) => (now ? reservations.load() : reservations.$reset()))
</script>

<template>
  <PageLayout>
    <template #header>
      <AppHeader />
    </template>

    <p v-if="catalog.status === 'loading'" class="message">[%Der Katalog wird geladen …|Loading the catalog …%]</p>
    <p v-else-if="catalog.status === 'error'" class="message">{{ catalog.error }}</p>
    <RouterView v-else />

    <template #footer>
      <AppFooter />
    </template>
  </PageLayout>
</template>
