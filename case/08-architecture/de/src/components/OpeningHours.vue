<script setup>
// The opening days as numbers of getDay, 0 is Sunday, each with its hours
const OPENING_DAYS = [
  { day: 3, name: 'Mittwoch', hours: '17 bis 19 Uhr' },
  { day: 6, name: 'Samstag', hours: '10 bis 13 Uhr' },
]

const weekday = new Date().getDay()
const today = OPENING_DAYS.find((entry) => entry.day === weekday)
// After Saturday, Wednesday comes next again
const next = OPENING_DAYS.find((entry) => entry.day > weekday) ?? OPENING_DAYS[0]

const status = today
  ? `Heute offen, ${today.hours}`
  : `Heute geschlossen, nächste Öffnung am ${next.name}`
</script>

<template>
  <section class="opening-hours">
    <h2>Öffnungszeiten</h2>
    <p v-for="entry in OPENING_DAYS" :key="entry.day">{{ entry.name }} {{ entry.hours }}</p>
    <p class="today">{{ status }}</p>
  </section>
</template>
