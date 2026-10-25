<script setup>
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'
import { reactive } from 'vue'

import { getJson, postJson } from '@/api.js'

const props = defineProps({
  id: { type: Number, required: true },
})

// A key per thing, a thing seen before comes from the cache
const { data: item } = useQuery({
  key: () => ['items', props.id],
  query: ({ signal }) => getJson(`/items/${props.id}`, { signal }),
})

const { data: requests } = useQuery({
  key: ['reservations'],
  query: ({ signal }) => getJson('/reservations', { signal }),
})

const form = reactive({ from: '', to: '' })
const queryCache = useQueryCache()

// After sending, the own requests are out of date, the cache loads them again
const { mutate: send, error: sendError } = useMutation({
  mutation: (request) => postJson('/reservations', request),
  onSettled: () => queryCache.invalidateQueries({ key: ['reservations'] }),
})

function submit() {
  send({ itemId: props.id, ...form })
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
    <p v-if="sendError?.message" class="error" role="alert">{{ sendError?.message }}</p>
    <h2>[%Meine Anfragen|My requests%]</h2>
    <p v-if="requests?.length === 0">[%Noch keine Anfragen.|No requests yet.%]</p>
    <ul v-else class="requests">
      <li v-for="request in requests" :key="request.id">{{ request.id }}: {{ request.from }} [%bis|to%] {{ request.to }}</li>
    </ul>
  </section>
  <p v-else role="status">[%Das Ding wird geladen …|Loading the thing …%]</p>
</template>
