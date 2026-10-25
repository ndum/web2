<script setup>
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import items from '../data/items.json'

const { t, n, d, locale } = useI18n()
const things = items.slice(0, 4)

// Screen readers and the hyphenation of the browser follow the language of the page
watchEffect(() => {
  document.documentElement.lang = locale.value
})
</script>

<template>
  <main>
    <h1>{{ t('catalog') }}</h1>
    <label for="language">{{ t('language') }}</label>
    <select id="language" v-model="locale">
      <!-- Each name of a language is marked in its own language, as WCAG 3.1.2 asks -->
      <option value="de-CH" lang="de">Deutsch</option>
      <option value="en-US" lang="en">English</option>
    </select>
    <p role="status">{{ t('found', things.length) }}</p>
    <ul>
      <li v-for="thing in things" :key="thing.id">
        {{ thing.name }}, {{ t('deposit', { amount: n(thing.deposit, 'currency') }) }},
        {{ thing.availableFrom === null ? t('available') : t('availableFrom', { date: d(new Date(thing.availableFrom), 'day') }) }}
      </li>
    </ul>
  </main>
</template>
