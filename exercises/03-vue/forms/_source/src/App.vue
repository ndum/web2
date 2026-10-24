<script setup>
import items from '../data/items.json'

// The page of the drill, the request form needs your code
const item = items.find((entry) => entry.id === 1)
</script>

<template>
  <h1>{{ item.name }}</h1>
  <p>{{ item.category }}</p>
  <h2>[%Reservation anfragen|Request a reservation%]</h2>
  <form class="fields">
    <label for="member">[%Mitgliedernummer|Member number%]</label>
    <input id="member">
    <label for="from">[%Erster Tag|First day%]</label>
    <input id="from" type="date">
    <label for="to">[%Letzter Tag|Last day%]</label>
    <input id="to" type="date">
    <button type="submit">[%Anfrage senden|Send request%]</button>
  </form>
</template>
