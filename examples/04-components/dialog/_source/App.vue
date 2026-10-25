<script setup>
import { ref } from 'vue'

import BaseDialog from './BaseDialog.vue'

const open = ref(false)
const status = ref('')

function confirm() {
  open.value = false
  status.value = '[%Reservationsanfrage erfasst.|Reservation request recorded.%]'
}
</script>

<template>
  <button type="button" @click="open = true">[%Anfrage senden|Send request%]</button>
  <p role="status">{{ status }}</p>
  <BaseDialog v-if="open" @close="open = false">
    <template #title>[%Anfrage prüfen|Check the request%]</template>
    <p>[%Bohrmaschine vom 18.11.2026 bis 21.11.2026|Drill from 11/18/2026 to 11/21/2026%]</p>
    <template #actions>
      <button type="button" @click="confirm">[%Bestätigen|Confirm%]</button>
      <button type="button" @click="open = false">[%Zurück|Back%]</button>
    </template>
  </BaseDialog>
</template>
