<script setup>
import { ref } from 'vue'

import BaseDialog from '@/components/BaseDialog.vue'
import ReservationForm from '@/components/ReservationForm.vue'
import { formatDate, formatDeposit } from '@/format.js'

const props = defineProps({ item: { type: Object, required: true } })

// The request that waits for confirmation, null while the dialog is closed
const pending = ref(null)
const summary = ref('')
// A new key gives the form a fresh start after a confirmed request
const formKey = ref(0)

function confirm() {
  const { member, from, to, note } = pending.value
  const name = props.item.name
  summary.value =
    `Reservation request from ${member} for ${name} from ${formatDate(from)} to ${formatDate(to)} recorded.` +
    (note === '' ? '' : ` Note: ${note}`)
  pending.value = null
  formKey.value++
}
</script>

<template>
  <article>
    <h1>{{ item.name }}</h1>
    <p>{{ item.category }}, deposit {{ formatDeposit(item.deposit) }}</p>
    <p v-if="item.availableFrom === null" class="state">Available</p>
    <p v-else class="state">Available again from {{ formatDate(item.availableFrom) }}</p>

    <h2>Request a reservation</h2>
    <ReservationForm :key="formKey" :item="item" @submit="pending = $event" />
    <p class="request-summary" role="status">{{ summary }}</p>
    <a href="#/">Back to the catalog</a>

    <BaseDialog v-if="pending" @close="pending = null">
      <template #title>Check the request</template>
      <p>{{ item.name }}, from {{ formatDate(pending.from) }} to {{ formatDate(pending.to) }}, {{ pending.member }}</p>
      <template #actions>
        <button type="button" class="confirm" @click="confirm">Confirm</button>
        <button type="button" class="back" @click="pending = null">Back</button>
      </template>
    </BaseDialog>
  </article>
</template>
