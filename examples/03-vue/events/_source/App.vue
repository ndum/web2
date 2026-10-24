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
  <button type="button" @click="reserve">[%Reservieren|Reserve%]</button>
  <button type="button" @click="count = 0">[%Zurücksetzen|Reset%]</button>
  <p>[%Reservationen|Reservations%]: {{ count }}</p>
  <!-- .prevent keeps the browser from following the link -->
  <a href="#/rules" @click.prevent="message = '[%Die Ausleihregeln folgen bald.|The loan rules follow soon.%]'">[%Ausleihregeln|Loan rules%]</a>
  <!-- .enter reacts to the Enter key only -->
  <p>
    <input aria-label="[%Notiz|Note%]" @keyup.enter="message = $event.target.value">
  </p>
  <p>{{ message }}</p>
</template>
