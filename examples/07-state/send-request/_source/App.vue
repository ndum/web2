<script setup>
import { reactive, ref } from 'vue'

import { useRequestsStore } from './requests.js'

const requests = useRequestsStore()
requests.load()

const form = reactive({ from: '', to: '', note: '' })
const result = ref({ fields: {} })
const sending = ref(false)

async function submit() {
  sending.value = true
  result.value = await requests.send({ itemId: 6, ...form })
  sending.value = false
}
</script>

<template>
  <h1>[%Beamer reservieren|Reserve the projector%]</h1>
  <form @submit.prevent="submit">
    <label for="from">[%Erster Tag|First day%]</label>
    <input id="from" v-model="form.from" type="date">
    <span v-if="result.fields.from" class="error">{{ result.fields.from }}</span>
    <label for="to">[%Letzter Tag|Last day%]</label>
    <input id="to" v-model="form.to" type="date">
    <span v-if="result.fields.to" class="error">{{ result.fields.to }}</span>
    <button :disabled="sending">{{ sending ? '[%Wird gesendet …|Sending …%]' : '[%Anfrage senden|Send request%]' }}</button>
  </form>
  <p v-if="result.error" role="alert" class="error">{{ result.error }}</p>
  <p v-if="result.reservation" role="status">[%Anfrage|Request%] {{ result.reservation.id }} [%ist gesendet.|is sent.%]</p>
  <h2>[%Meine Anfragen|My requests%]</h2>
  <p v-if="requests.list.length === 0">[%Noch keine Anfragen.|No requests yet.%]</p>
  <ul v-else>
    <li v-for="request in requests.list" :key="request.id">{{ request.id }}: {{ request.from }} [%bis|to%] {{ request.to }}</li>
  </ul>
</template>

<style scoped>
form {
  display: grid;
  gap: 0.25rem;
  max-width: 20rem;
}
.error {
  color: #a3341f;
}
</style>
