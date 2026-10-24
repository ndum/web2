<script setup>
import { ref } from 'vue'

const member = ref('')
const days = ref('')
const note = ref('')
</script>

<template>
  <p>
    <label for="member">Mitgliedernummer mit .trim</label>
    <input id="member" v-model.trim="member">
  </p>
  <p>
    <label for="days">Tage mit .number</label>
    <input id="days" v-model.number="days">
  </p>
  <p>
    <label for="note">Notiz mit .lazy</label>
    <input id="note" v-model.lazy="note">
  </p>
  <pre>{{ JSON.stringify(member) }}  {{ typeof days }} {{ days }}  {{ JSON.stringify(note) }}</pre>
</template>
