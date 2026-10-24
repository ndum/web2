<script setup>
import { ref } from 'vue'

const note = ref('')
const days = ref(3)
const rulesRead = ref(false)
const extras = ref([])
const pickup = ref('[%Mittwoch|Wednesday%]')
const category = ref('')
const firstDay = ref('')
</script>

<template>
  <form class="fields">
    <label for="note">[%Notiz|Note%]</label>
    <textarea id="note" v-model="note"></textarea>

    <label for="days">[%Anzahl Tage|Number of days%]</label>
    <input id="days" v-model="days" type="number" min="1" max="7">

    <label for="first-day">[%Erster Tag|First day%]</label>
    <input id="first-day" v-model="firstDay" type="date">

    <label for="category">[%Kategorie|Category%]</label>
    <select id="category" v-model="category">
      <option value="">[%Bitte wählen|Please choose%]</option>
      <option>[%Werkzeug|Tools%]</option>
      <option>[%Garten|Garden%]</option>
      <option>[%Küche|Kitchen%]</option>
    </select>

    <fieldset>
      <legend>[%Zubehör|Accessories%]</legend>
      <label><input v-model="extras" type="checkbox" value="[%Akku|Battery%]"> [%Akku|Battery%]</label>
      <label><input v-model="extras" type="checkbox" value="[%Bohrer-Set|Drill bit set%]"> [%Bohrer-Set|Drill bit set%]</label>
    </fieldset>

    <fieldset>
      <legend>[%Abholung|Pickup%]</legend>
      <label><input v-model="pickup" type="radio" value="[%Mittwoch|Wednesday%]"> [%Mittwoch|Wednesday%]</label>
      <label><input v-model="pickup" type="radio" value="[%Samstag|Saturday%]"> [%Samstag|Saturday%]</label>
    </fieldset>

    <label><input v-model="rulesRead" type="checkbox"> [%Ich habe die Ausleihregeln gelesen.|I have read the loan rules.%]</label>
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
