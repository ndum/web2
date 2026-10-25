<script setup>
import { ref } from 'vue'

import AppHeader from '@/components/AppHeader.vue'
import ItemPage from '@/components/ItemPage.vue'
import items from '../data/items.json'

// The test member until the login of part 6
const member = ref({ number: 'M-117', name: 'Martina Hostettler' })
</script>

<template>
  <AppHeader />
  <main>
    <ItemPage :item="items[0]" />
  </main>
</template>
