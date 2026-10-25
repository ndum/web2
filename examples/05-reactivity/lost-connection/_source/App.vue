<script setup>
import { computed, reactive } from 'vue'

const state = reactive({ favorites: [1, 6] })

// The number is read once, when the component is created, and never again
const copiedCount = state.favorites.length

// A computed value reads the array again whenever it changes
const favoriteCount = computed(() => state.favorites.length)

function addFavorite() {
  state.favorites.push(state.favorites.length + 10)
}
</script>

<template>
  <button type="button" @click="addFavorite">[%Favorit hinzufügen|Add a favorite%]</button>
  <p>[%Kopie|Copy%]: {{ copiedCount }}</p>
  <p>computed: {{ favoriteCount }}</p>
</template>
