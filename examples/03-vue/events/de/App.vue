<script setup>
import { ref } from 'vue'

// A ref holds a value that the template follows, the next chapter explains it
const count = ref(0)
const message = ref('')

function reserve() {
  count.value++
}
</script>

<template>
  <button type="button" @click="reserve">Reservieren</button>
  <button type="button" @click="count = 0">Zurücksetzen</button>
  <p>Reservationen: {{ count }}</p>
  <!-- .prevent keeps the browser from following the link -->
  <a href="#/rules" @click.prevent="message = 'Die Ausleihregeln folgen bald.'">Ausleihregeln</a>
  <!-- .enter reacts to the Enter key only -->
  <p>
    <input aria-label="Notiz" @keyup.enter="message = $event.target.value">
  </p>
  <p>{{ message }}</p>
</template>
