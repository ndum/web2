<script setup>
import { ref } from 'vue'

const note = ref('')
const days = ref(3)
const rulesRead = ref(false)
const extras = ref([])
const pickup = ref('Mittwoch')
const category = ref('')
const firstDay = ref('')
</script>

<template>
  <form class="fields">
    <label for="note">Notiz</label>
    <textarea id="note" v-model="note"></textarea>

    <label for="days">Anzahl Tage</label>
    <input id="days" v-model="days" type="number" min="1" max="7">

    <label for="first-day">Erster Tag</label>
    <input id="first-day" v-model="firstDay" type="date">

    <label for="category">Kategorie</label>
    <select id="category" v-model="category">
      <option value="">Bitte wählen</option>
      <option>Werkzeug</option>
      <option>Garten</option>
      <option>Küche</option>
    </select>

    <fieldset>
      <legend>Zubehör</legend>
      <label><input v-model="extras" type="checkbox" value="Akku"> Akku</label>
      <label><input v-model="extras" type="checkbox" value="Bohrer-Set"> Bohrer-Set</label>
    </fieldset>

    <fieldset>
      <legend>Abholung</legend>
      <label><input v-model="pickup" type="radio" value="Mittwoch"> Mittwoch</label>
      <label><input v-model="pickup" type="radio" value="Samstag"> Samstag</label>
    </fieldset>

    <label><input v-model="rulesRead" type="checkbox"> Ich habe die Ausleihregeln gelesen.</label>
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
