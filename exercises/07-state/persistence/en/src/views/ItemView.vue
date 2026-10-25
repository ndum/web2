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
      <label for="from">First day</label>
      <input id="from" v-model="form.from" type="date">
      <label for="to">Last day</label>
      <input id="to" v-model="form.to" type="date">
      <label for="note">Note, optional</label>
      <textarea id="note" v-model="form.note" maxlength="200" />
      <button>Send request</button>
    </form>
    <p v-if="sent" role="status">The request is noted.</p>
  </section>
  <p v-else>This thing does not exist.</p>
</template>
