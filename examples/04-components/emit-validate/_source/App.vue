<script setup>
import ItemCard from './ItemCard.vue'

function reserve(id) {
  console.log('reserve', id)
}
</script>

<template>
  <ItemCard :id="1" name="[%Bohrmaschine|Drill%]" @reserve="reserve" />
  <!-- Without the colon, the id arrives as the text "6" -->
  <ItemCard id="6" name="[%Beamer|Projector%]" @reserve="reserve" />
</template>
