<script setup>
import { ref } from 'vue'

import ItemCard from './ItemCard.vue'

const message = ref('')

// The parent decides what a click on the button means
function reserve(id) {
  message.value = `Reservation für das Ding mit der id ${id} angefragt.`
}
</script>

<template>
  <ItemCard :id="1" name="Bohrmaschine" @reserve="reserve" />
  <ItemCard :id="6" name="Beamer" @reserve="reserve" />
  <p>{{ message }}</p>
</template>
