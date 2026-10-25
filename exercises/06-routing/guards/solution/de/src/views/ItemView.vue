<script setup>
import { computed, reactive, ref } from 'vue'
import { onBeforeRouteLeave, RouterLink } from 'vue-router'

import items from '../../data/items.json'

const props = defineProps({ id: { type: Number, required: true } })

const item = computed(() => items.find((entry) => entry.id === props.id))
const request = reactive({ from: '', to: '', note: '' })
const message = ref('')

// Something typed into the form would be lost when leaving the page
const dirty = computed(() => Object.values(request).some((value) => value.trim() !== ''))

// Runs before the page is left, false keeps it
onBeforeRouteLeave(() => {
  if (dirty.value && !window.confirm('Deine Eingaben gehen verloren. Seite trotzdem verlassen?')) {
    return false
  }
})

function send() {
  message.value = `Anfrage für ${item.value.name} vorgemerkt.`
  Object.assign(request, { from: '', to: '', note: '' })
}
</script>

<template>
  <article v-if="item">
    <h1>{{ item.name }}</h1>
    <form class="fields" @submit.prevent="send">
      <label for="from">Erster Tag</label>
      <input id="from" v-model="request.from" type="date">
      <label for="to">Letzter Tag</label>
      <input id="to" v-model="request.to" type="date">
      <label for="note">Notiz, freiwillig</label>
      <textarea id="note" v-model.trim="request.note"></textarea>
      <button type="submit">Anfrage senden</button>
    </form>
    <p class="message" role="status">{{ message }}</p>
  </article>
  <p v-else>Dieses Ding gibt es nicht.</p>
  <RouterLink :to="{ name: 'catalog' }">Zum Katalog</RouterLink>
</template>
