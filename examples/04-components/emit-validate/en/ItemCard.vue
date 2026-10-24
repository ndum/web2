<script setup>
defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
})

// In the object notation every event gets a check, Vue warns in the console if it fails
const emit = defineEmits({
  reserve: (id) => Number.isInteger(id),
})
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <button type="button" @click="emit('reserve', id)">Reserve</button>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
}
h2 {
  margin: 0;
  font-size: 1.05rem;
}
</style>
