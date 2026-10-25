<script setup>
import { computed, reactive, ref } from 'vue'

import items from '../../data/items.json'

const props = defineProps({
  id: { type: Number, required: true },
})

const item = computed(() => items.find((entry) => entry.id === props.id))
const form = reactive({ from: '', to: '', note: '' })
const sent = ref(false)

function submit() {
  sent.value = true
  Object.assign(form, { from: '', to: '', note: '' })
}
</script>

<template>
  <section v-if="item">
    <h1>{{ item.name }}</h1>
    <form class="fields" @submit.prevent="submit">
      <label for="from">Erster Tag</label>
      <input id="from" v-model="form.from" type="date">
      <label for="to">Letzter Tag</label>
      <input id="to" v-model="form.to" type="date">
      <label for="note">Notiz, freiwillig</label>
      <textarea id="note" v-model="form.note" maxlength="200" />
      <button>Anfrage senden</button>
    </form>
    <p v-if="sent" role="status">Die Anfrage ist vorgemerkt.</p>
  </section>
  <p v-else>Dieses Ding gibt es nicht.</p>
</template>
