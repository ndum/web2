<script setup>
import items from '../data/items.json'

// The page of the drill, the request form needs your code
const item = items.find((entry) => entry.id === 1)
</script>

<template>
  <h1>{{ item.name }}</h1>
  <p>{{ item.category }}</p>
  <h2>Request a reservation</h2>
  <form class="fields">
    <label for="member">Member number</label>
    <input id="member">
    <label for="from">First day</label>
    <input id="from" type="date">
    <label for="to">Last day</label>
    <input id="to" type="date">
    <button type="submit">Send request</button>
  </form>
</template>
