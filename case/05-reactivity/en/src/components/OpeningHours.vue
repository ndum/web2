<script setup>
// The opening days as numbers of getDay, 0 is Sunday, each with its hours
const OPENING_DAYS = [
  { day: 3, name: 'Wednesday', hours: '5 to 7 p.m.' },
  { day: 6, name: 'Saturday', hours: '10 a.m. to 1 p.m.' },
]

const weekday = new Date().getDay()
const today = OPENING_DAYS.find((entry) => entry.day === weekday)
// After Saturday, Wednesday comes next again
const next = OPENING_DAYS.find((entry) => entry.day > weekday) ?? OPENING_DAYS[0]

const status = today
  ? `Open today, ${today.hours}`
  : `Closed today, next opening on ${next.name}`
</script>

<template>
  <section class="opening-hours">
    <h2>Opening hours</h2>
    <p v-for="entry in OPENING_DAYS" :key="entry.day">{{ entry.name }} {{ entry.hours }}</p>
    <p class="today">{{ status }}</p>
  </section>
</template>
