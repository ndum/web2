<script setup>
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/stores/auth.js'
import { useCatalogStore } from '@/stores/catalog.js'
import { useRequestsStore } from '@/stores/requests.js'

const props = defineProps({
  id: { type: Number, required: true },
})

const { member } = storeToRefs(useAuthStore())
const catalog = useCatalogStore()
const requests = useRequestsStore()
const item = computed(() => catalog.byId(props.id))

const form = reactive({ from: '', to: '', note: '' })
// What the course API answered, with a message per field for invalid entries
const result = ref({ fields: {} })
const sending = ref(false)

async function submit() {
  sending.value = true
  result.value = await requests.send({ itemId: props.id, ...form })
  sending.value = false
}
</script>

<template>
  <section v-if="item">
    <h1>{{ item.name }}</h1>
    <p class="category">{{ item.category }}</p>
    <form v-if="member" class="fields" novalidate @submit.prevent="submit">
      <label for="from">First day</label>
      <input id="from" v-model="form.from" type="date">
      <p v-if="result.fields.from" class="error">{{ result.fields.from }}</p>
      <label for="to">Last day</label>
      <input id="to" v-model="form.to" type="date">
      <p v-if="result.fields.to" class="error">{{ result.fields.to }}</p>
      <label for="note">Note, optional</label>
      <textarea id="note" v-model="form.note" maxlength="200" />
      <button :disabled="sending">Send request</button>
    </form>
    <p v-else>
      <RouterLink :to="{ name: 'login', query: { redirect: `/items/${id}` } }">Sign in</RouterLink>, to send a request.
    </p>
    <p v-if="result.error" class="error" role="alert">{{ result.error }}</p>
    <p v-if="result.reservation" role="status">Request {{ result.reservation.id }} is sent.</p>
  </section>
  <p v-else-if="catalog.status === 'ready'">This thing does not exist.</p>
</template>
