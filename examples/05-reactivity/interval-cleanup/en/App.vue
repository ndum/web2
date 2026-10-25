<script setup>
import { ref } from 'vue'

import ShopClock from './ShopClock.vue'

const shown = ref(true)
</script>

<template>
  <button type="button" @click="shown = !shown">{{ shown ? 'Remove the clock' : 'Show the clock' }}</button>
  <ShopClock v-if="shown" />
</template>
