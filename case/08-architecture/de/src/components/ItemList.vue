<script setup>
defineProps({ items: { type: Array, required: true } })
</script>

<template>
  <ul v-if="items.length > 0" class="catalog">
    <li v-for="item in items" :key="item.id">
      <!-- The parent shapes every entry, without a slot the name appears -->
      <slot name="item" :item="item">{{ item.name }}</slot>
    </li>
  </ul>
  <p v-else class="empty">
    <slot name="empty">Keine Dinge gefunden.</slot>
  </p>
</template>
