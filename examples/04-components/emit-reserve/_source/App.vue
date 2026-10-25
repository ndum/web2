<script setup>
import { ref } from 'vue'

import ItemCard from './ItemCard.vue'

const message = ref('')

// The parent decides what a click on the button means
function reserve(id) {
  message.value = `[%Reservation für das Ding mit der id ${id} angefragt.|Reservation requested for the thing with the id ${id}.%]`
}
</script>

<template>
  <ItemCard :id="1" name="[%Bohrmaschine|Drill%]" @reserve="reserve" />
  <ItemCard :id="6" name="[%Beamer|Projector%]" @reserve="reserve" />
  <p>{{ message }}</p>
</template>
