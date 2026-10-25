<script setup>
import { add } from './requests.js'
import { things } from './things.js'
</script>

<template>
  <ul>
    <li v-for="thing in things" :key="thing.id">
      {{ thing.name }}
      <button type="button" @click="add(thing)">Request</button>
    </li>
  </ul>
</template>
