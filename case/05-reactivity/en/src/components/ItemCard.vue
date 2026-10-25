<script setup>
defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  favorite: { type: Boolean, default: false },
})

// The card only reports what happened, App decides what follows
const emit = defineEmits({
  reserve: (id) => Number.isInteger(id),
  toggleFavorite: (id) => Number.isInteger(id),
})
</script>

<template>
  <article class="card">
    <h2>{{ name }}</h2>
    <p class="category">{{ category }}</p>
    <p class="state" :class="available ? 'free' : 'lent'">{{ available ? 'Available' : 'On loan' }}</p>
    <div class="actions">
      <button type="button" class="reserve" @click="emit('reserve', id)">Reserve</button>
      <button type="button" class="favorite" :aria-pressed="favorite" @click="emit('toggleFavorite', id)">Favorite</button>
    </div>
  </article>
</template>

<style scoped>
.card {
  padding: 0.75rem 1rem;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
}
h2 {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}
p {
  margin: 0.25rem 0 0;
}
.category {
  color: #5f5f5f;
}
.free {
  color: #1f6b4f;
}
.lent {
  color: #a3341f;
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.favorite[aria-pressed='true'] {
  font-weight: 700;
  color: #a3341f;
}
</style>
