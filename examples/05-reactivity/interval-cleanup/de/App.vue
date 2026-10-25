<script setup>
import { ref } from 'vue'

import ShopClock from './ShopClock.vue'

const shown = ref(true)
</script>

<template>
  <button type="button" @click="shown = !shown">{{ shown ? 'Uhr entfernen' : 'Uhr zeigen' }}</button>
  <ShopClock v-if="shown" />
</template>
