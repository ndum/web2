<script setup>
import { ref } from 'vue'

import BaseDialog from './BaseDialog.vue'

const open = ref(false)
const status = ref('')

function confirm() {
  open.value = false
  status.value = 'Reservationsanfrage erfasst.'
}
</script>

<template>
  <button type="button" @click="open = true">Anfrage senden</button>
  <p role="status">{{ status }}</p>
  <BaseDialog v-if="open" @close="open = false">
    <template #title>Anfrage prüfen</template>
    <p>Bohrmaschine vom 18.11.2026 bis 21.11.2026</p>
    <template #actions>
      <button type="button" @click="confirm">Bestätigen</button>
      <button type="button" @click="open = false">Zurück</button>
    </template>
  </BaseDialog>
</template>
