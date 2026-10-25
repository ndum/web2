<script setup>
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { RouterLink } from 'vue-router'

import BaseDialog from '@/components/BaseDialog.vue'
import { useAuthStore } from '@/features/auth'
import { draftKey, ReservationForm, useReservationsStore } from '@/features/reservations'
import { formatDate, formatDeposit } from '@/utils/format.js'

import { useCatalogStore } from './catalogStore.js'

const props = defineProps({ id: { type: Number, required: true } })

const catalog = useCatalogStore()
const reservations = useReservationsStore()
const { member } = storeToRefs(useAuthStore())
const item = computed(() => catalog.byId(props.id))
const ownRequests = computed(() => reservations.forItem(props.id))

// The request that waits for confirmation, null while the dialog is closed
const pending = ref(null)
const sending = ref(false)
const summary = ref('')
const sendError = ref('')
// A new key gives the form a fresh start after a request was sent
const formKey = ref(0)
const formHeading = useTemplateRef('formHeading')

// The router reuses the page between /items/1 and /items/6, a new thing gets its own form and draft
watch(
  () => props.id,
  () => {
    pending.value = null
    summary.value = ''
    sendError.value = ''
    formKey.value++
  },
)

// The title of the tab names the thing, the router only knows the route
watch(
  item,
  (now) => {
    document.title = `${now ? now.name : '[%Ding nicht gefunden|Thing not found%]'} · Lorraine Commons`
  },
  { immediate: true },
)

async function confirm() {
  const { from, to, note } = pending.value
  sending.value = true
  const result = await reservations.send({ itemId: props.id, from, to, note })
  sending.value = false
  pending.value = null
  if (result.reservation === undefined) {
    // The API knows more than the form, for example requests of other members
    sendError.value = [result.error, ...Object.values(result.fields)].join(' ')
    return
  }
  sendError.value = ''
  summary.value = `[%Anfrage ${result.reservation.id} für ${item.value.name} vom ${formatDate(from)} bis ${formatDate(to)} gesendet.|Request ${result.reservation.id} for ${item.value.name} from ${formatDate(from)} to ${formatDate(to)} sent.%]`
  sessionStorage.removeItem(draftKey(props.id))
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
    <p>{{ item.category }}, [%Pfand|deposit%] {{ formatDeposit(item.deposit) }}</p>
    <p v-if="item.availableFrom === null" class="state">[%Verfügbar|Available%]</p>
    <p v-else class="state">[%Wieder verfügbar ab|Available again from%] {{ formatDate(item.availableFrom) }}</p>

    <h2 ref="formHeading" tabindex="-1">[%Reservation anfragen|Request a reservation%]</h2>
    <template v-if="member">
      <ul v-if="ownRequests.length > 0" class="own-requests">
        <li v-for="request in ownRequests" :key="request.id">
          [%Schon angefragt|Already requested%]: {{ formatDate(request.from) }} [%bis|to%] {{ formatDate(request.to) }}
        </li>
      </ul>
      <ReservationForm :key="formKey" :item="item" @submit="pending = $event" />
    </template>
    <p v-else class="sign-in-hint">
      <RouterLink :to="{ name: 'login', query: { redirect: `/items/${id}` } }">[%Melde dich an|Sign in%]</RouterLink>[%, um eine Reservation anzufragen.| to request a reservation.%]
    </p>
    <p class="send-error" role="alert">{{ sendError }}</p>
    <p class="request-summary" role="status">{{ summary }}</p>
    <RouterLink :to="{ name: 'catalog' }">[%Zum Katalog|Back to the catalog%]</RouterLink>

    <BaseDialog v-if="pending" @close="pending = null">
      <template #title>[%Anfrage prüfen|Check the request%]</template>
      <p>{{ item.name }}, [%vom|from%] {{ formatDate(pending.from) }} [%bis|to%] {{ formatDate(pending.to) }}, {{ member.number }}</p>
      <template #actions>
        <button type="button" class="confirm" :disabled="sending" @click="confirm">[%Bestätigen|Confirm%]</button>
        <button type="button" class="back" @click="pending = null">[%Zurück|Back%]</button>
      </template>
    </BaseDialog>
  </article>
  <section v-else>
    <h1 tabindex="-1">[%Ding nicht gefunden|Thing not found%]</h1>
    <p>[%Dieses Ding gibt es nicht.|This thing does not exist.%]</p>
    <RouterLink :to="{ name: 'catalog' }">[%Zum Katalog|Back to the catalog%]</RouterLink>
  </section>
</template>
