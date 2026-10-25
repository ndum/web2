<script setup>
import { nextTick, ref, useTemplateRef } from 'vue'

import BaseDialog from '@/components/BaseDialog.vue'
import ReservationForm from '@/components/ReservationForm.vue'
import { formatDate, formatDeposit } from '@/format.js'

const props = defineProps({ item: { type: Object, required: true } })

// The request that waits for confirmation, null while the dialog is closed
const pending = ref(null)
const summary = ref('')
// A new key gives the form a fresh start after a confirmed request
const formKey = ref(0)
const formHeading = useTemplateRef('formHeading')

async function confirm() {
  const { member, from, to, note } = pending.value
  const name = props.item.name
  summary.value =
    `Reservationsanfrage von ${member} für ${name} vom ${formatDate(from)} bis ${formatDate(to)} erfasst.` +
    (note === '' ? '' : ` Notiz: ${note}`)
  pending.value = null
  formKey.value++
  // The form starts over and the button that opened the dialog is gone,
  // so the focus moves to the heading of the form once Vue has updated the page
  await nextTick()
  formHeading.value.focus()
}
</script>

<template>
  <article>
    <h1>{{ item.name }}</h1>
    <p>{{ item.category }}, Pfand {{ formatDeposit(item.deposit) }}</p>
    <p v-if="item.availableFrom === null" class="state">Verfügbar</p>
    <p v-else class="state">Wieder verfügbar ab {{ formatDate(item.availableFrom) }}</p>

    <h2 ref="formHeading" tabindex="-1">Reservation anfragen</h2>
    <ReservationForm :key="formKey" :item="item" @submit="pending = $event" />
    <p class="request-summary" role="status">{{ summary }}</p>
    <a href="#/">Zum Katalog</a>

    <BaseDialog v-if="pending" @close="pending = null">
      <template #title>Anfrage prüfen</template>
      <p>{{ item.name }}, vom {{ formatDate(pending.from) }} bis {{ formatDate(pending.to) }}, {{ pending.member }}</p>
      <template #actions>
        <button type="button" class="confirm" @click="confirm">Bestätigen</button>
        <button type="button" class="back" @click="pending = null">Zurück</button>
      </template>
    </BaseDialog>
  </article>
</template>
