<script setup>
import { ref } from 'vue'

const note = ref('')
</script>

<template>
  <p>
    <label for="note">Notiz zur Anfrage</label>
    <textarea id="note" v-model="note"></textarea>
  </p>
</template>
