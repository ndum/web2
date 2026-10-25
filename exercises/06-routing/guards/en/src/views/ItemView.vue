<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import items from '../../data/items.json'

const props = defineProps({ id: { type: Number, required: true } })

const item = computed(() => items.find((entry) => entry.id === props.id))
const request = reactive({ from: '', to: '', note: '' })
const message = ref('')

function send() {
  message.value = `Request for ${item.value.name} noted.`
  Object.assign(request, { from: '', to: '', note: '' })
}
</script>

<template>
  <article v-if="item">
    <h1>{{ item.name }}</h1>
    <form class="fields" @submit.prevent="send">
      <label for="from">First day</label>
      <input id="from" v-model="request.from" type="date">
      <label for="to">Last day</label>
      <input id="to" v-model="request.to" type="date">
      <label for="note">Note, optional</label>
      <textarea id="note" v-model.trim="request.note"></textarea>
      <button type="submit">Send request</button>
    </form>
    <p class="message" role="status">{{ message }}</p>
  </article>
  <p v-else>This thing does not exist.</p>
  <RouterLink :to="{ name: 'catalog' }">Back to the catalog</RouterLink>
</template>
