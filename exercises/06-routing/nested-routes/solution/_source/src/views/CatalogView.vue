<script setup>
import items from '../../data/items.json'
</script>

<template>
  <h1>[%Katalog|Catalog%]</h1>
  <ul class="catalog">
    <li v-for="item in items" :key="item.id">
      <span class="name">{{ item.name }}</span>
      <span class="category">{{ item.category }}</span>
    </li>
  </ul>
</template>
