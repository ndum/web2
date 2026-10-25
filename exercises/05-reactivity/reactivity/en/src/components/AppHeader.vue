<script setup>
const props = defineProps({ favorites: { type: Array, default: () => [] } })

// The label for the header, such as 2 favorites
const count = props.favorites.length
const label = count === 1 ? '1 favorite' : `${count} favorites`
</script>

<template>
  <header class="site">
    <a href="#/" class="brand">Lorraine Commons</a>
    <span class="favorites">{{ label }}</span>
  </header>
</template>

<style scoped>
.site {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  align-items: baseline;
  margin: -1rem -1.5rem 1rem;
  padding: 0.75rem 1.5rem;
  background: #1f6b4f;
  color: #ffffff;
}
.brand {
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
}
</style>
