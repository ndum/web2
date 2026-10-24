<script setup>
import { ref } from 'vue'

import BaseDialog from './BaseDialog.vue'

const open = ref(false)
const status = ref('')

function confirm() {
  open.value = false
  status.value = 'Reservation request recorded.'
}
</script>

<template>
  <button type="button" @click="open = true">Send request</button>
  <p role="status">{{ status }}</p>
  <BaseDialog v-if="open" @close="open = false">
    <template #title>Check the request</template>
    <p>Drill from 11/18/2026 to 11/21/2026</p>
    <template #actions>
      <button type="button" @click="confirm">Confirm</button>
      <button type="button" @click="open = false">Back</button>
    </template>
  </BaseDialog>
</template>
