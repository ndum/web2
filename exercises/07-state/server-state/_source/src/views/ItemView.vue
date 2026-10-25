<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

import { getJson, postJson } from '@/api.js'

const props = defineProps({
  id: { type: Number, required: true },
})

// Loaded by hand, every change of the id and every visit ask the course API again
const item = ref(null)
watch(
  () => props.id,
  async (id) => {
    item.value = await getJson(`/items/${id}`)
  },
  { immediate: true },
)

const requests = ref([])
onMounted(async () => {
  requests.value = await getJson('/reservations')
})

const form = reactive({ from: '', to: '' })
const message = ref('')

async function submit() {
  try {
    await postJson('/reservations', { itemId: props.id, ...form })
  } catch (problem) {
    message.value = problem.message
  }
}
</script>

<template>
  <section v-if="item">
    <h1>{{ item.name }}</h1>
    <p class="category">{{ item.category }}</p>
    <form class="fields" novalidate @submit.prevent="submit">
      <label for="from">[%Erster Tag|First day%]</label>
      <input id="from" v-model="form.from" type="date">
      <label for="to">[%Letzter Tag|Last day%]</label>
      <input id="to" v-model="form.to" type="date">
      <button>[%Anfrage senden|Send request%]</button>
    </form>
    <p v-if="message" class="error" role="alert">{{ message }}</p>
    <h2>[%Meine Anfragen|My requests%]</h2>
    <p v-if="requests?.length === 0">[%Noch keine Anfragen.|No requests yet.%]</p>
    <ul v-else class="requests">
      <li v-for="request in requests" :key="request.id">{{ request.id }}: {{ request.from }} [%bis|to%] {{ request.to }}</li>
    </ul>
  </section>
  <p v-else role="status">[%Das Ding wird geladen …|Loading the thing …%]</p>
</template>
