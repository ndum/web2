<script setup>
import ItemCard from './ItemCard.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <p v-if="items.length === 0" class="empty">[%Keine Dinge gefunden.|No things found.%]</p>
  <div v-else class="grid">
    <ItemCard
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :category="item.category"
      :deposit="item.deposit"
      :available-from="item.availableFrom"
    />
  </div>
</template>