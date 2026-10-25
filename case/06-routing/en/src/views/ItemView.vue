<script setup>
import { computed, inject, nextTick, ref, useTemplateRef, watch } from 'vue'
import { RouterLink } from 'vue-router'

import BaseDialog from '@/components/BaseDialog.vue'
import ReservationForm from '@/components/ReservationForm.vue'
import { formatDate, formatDeposit } from '@/format.js'
import { catalogKey } from '@/keys.js'

const props = defineProps({ id: { type: Number, required: true } })

const { items } = inject(catalogKey)
const item = computed(() => items.value.find((entry) => entry.id === props.id))

// The request that waits for confirmation, null while the dialog is closed
const pending = ref(null)
const summary = ref('')
// A new key gives the form a fresh start after a confirmed request
const formKey = ref(0)
const formHeading = useTemplateRef('formHeading')

// The router reuses the page between /items/1 and /items/6, a new thing starts with an empty form
watch(
  () => props.id,
  () => {
    pending.value = null
    summary.value = ''
    formKey.value++
  },
)

// The title of the tab names the thing, the router only knows the route
watch(
  item,
  (now) => {
    document.title = `${now ? now.name : 'Thing not found'} · Lorraine Commons`
  },
  { immediate: true },
)

async function confirm() {
  const { member, from, to, note } = pending.value
  const name = item.value.name
  summary.value =
    `Reservation request from ${member} for ${name} from ${formatDate(from)} to ${formatDate(to)} recorded.` +
    (note === '' ? '' : ` Note: ${note}`)
  pending.value = null
  formKey.value++
  // The form starts over and the button that opened the dialog is gone,
  // so the focus moves to the heading of the form once Vue has updated the page
  await nextTick()
  formHeading.value.focus()
}
</script>

<template>
  <article v-if="item">
    <h1 tabindex="-1">{{ item.name }}</h1>
    <p>{{ item.category }}, deposit {{ formatDeposit(item.deposit) }}</p>
    <p v-if="item.availableFrom === null" class="state">Available</p>
    <p v-else class="state">Available again from {{ formatDate(item.availableFrom) }}</p>

    <h2 ref="formHeading" tabindex="-1">Request a reservation</h2>
    <ReservationForm :key="formKey" :item="item" @submit="pending = $event" />
    <p class="request-summary" role="status">{{ summary }}</p>
    <RouterLink :to="{ name: 'catalog' }">Back to the catalog</RouterLink>

    <BaseDialog v-if="pending" @close="pending = null">
      <template #title>Check the request</template>
      <p>{{ item.name }}, from {{ formatDate(pending.from) }} to {{ formatDate(pending.to) }}, {{ pending.member }}</p>
      <template #actions>
        <button type="button" class="confirm" @click="confirm">Confirm</button>
        <button type="button" class="back" @click="pending = null">Back</button>
      </template>
    </BaseDialog>
  </article>
  <section v-else>
    <h1 tabindex="-1">Thing not found</h1>
    <p>This thing does not exist.</p>
    <RouterLink :to="{ name: 'catalog' }">Back to the catalog</RouterLink>
  </section>
</template>
