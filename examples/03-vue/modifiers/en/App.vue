<script setup>
import { ref } from 'vue'

const member = ref('')
const days = ref('')
const note = ref('')
</script>

<template>
  <p>
    <label for="member">Member number with .trim</label>
    <input id="member" v-model.trim="member">
  </p>
  <p>
    <label for="days">Days with .number</label>
    <input id="days" v-model.number="days">
  </p>
  <p>
    <label for="note">Note with .lazy</label>
    <input id="note" v-model.lazy="note">
  </p>
  <pre>{{ JSON.stringify(member) }}  {{ typeof days }} {{ days }}  {{ JSON.stringify(note) }}</pre>
</template>
