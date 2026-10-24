<script setup>
defineProps({ items: { type: Array, required: true } })
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- The slot hands the entry to the parent, which decides what to show -->
      <slot name="item" :item="item">{{ item.name }}</slot>
    </li>
  </ul>
</template>
