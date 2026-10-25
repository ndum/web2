<script setup>
defineProps({ items: { type: Array, required: true } })
</script>

<template>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id">
      <!-- The slot hands the entry to the parent, without a slot the name appears -->
      <slot name="item" :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>
