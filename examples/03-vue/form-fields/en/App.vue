<script setup>
import { ref } from 'vue'

const note = ref('')
const days = ref(3)
const rulesRead = ref(false)
const extras = ref([])
const pickup = ref('Wednesday')
const category = ref('')
const firstDay = ref('')
</script>

<template>
  <form class="fields">
    <label for="note">Note</label>
    <textarea id="note" v-model="note"></textarea>

    <label for="days">Number of days</label>
    <input id="days" v-model="days" type="number" min="1" max="7">

    <label for="first-day">First day</label>
    <input id="first-day" v-model="firstDay" type="date">

    <label for="category">Category</label>
    <select id="category" v-model="category">
      <option value="">Please choose</option>
      <option>Tools</option>
      <option>Garden</option>
      <option>Kitchen</option>
    </select>

    <fieldset>
      <legend>Accessories</legend>
      <label><input v-model="extras" type="checkbox" value="Battery"> Battery</label>
      <label><input v-model="extras" type="checkbox" value="Drill bit set"> Drill bit set</label>
    </fieldset>

    <fieldset>
      <legend>Pickup</legend>
      <label><input v-model="pickup" type="radio" value="Wednesday"> Wednesday</label>
      <label><input v-model="pickup" type="radio" value="Saturday"> Saturday</label>
    </fieldset>

    <label><input v-model="rulesRead" type="checkbox"> I have read the loan rules.</label>
  </form>
  <pre>{{ { note, days, firstDay, category, extras, pickup, rulesRead } }}</pre>
</template>

<style>
.fields {
  display: grid;
  gap: 0.4rem;
  max-width: 22rem;
}
</style>
