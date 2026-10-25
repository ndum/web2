<script setup>
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { RouterView } from 'vue-router'

import PageLayout from '@/components/PageLayout.vue'
import { useAuthStore } from '@/features/auth'
import { useCatalogStore } from '@/features/catalog'
import { useReservationsStore } from '@/features/reservations'
import AppFooter from '@/layout/AppFooter.vue'
import AppHeader from '@/layout/AppHeader.vue'

const catalog = useCatalogStore()
const auth = useAuthStore()
const reservations = useReservationsStore()
const { member } = storeToRefs(auth)

// The catalog comes from the API, the login from the session of the last visit
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

    <p v-if="catalog.status === 'loading'" class="message" role="status">[%Der Katalog wird geladen …|Loading the catalog …%]</p>
    <p v-else-if="catalog.status === 'error'" class="message" role="alert">{{ catalog.error }}</p>
    <RouterView v-else />

    <template #footer>
      <AppFooter />
    </template>
  </PageLayout>
</template>
