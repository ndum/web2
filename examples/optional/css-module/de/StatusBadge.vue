<script setup>
defineProps({
  available: { type: Boolean, required: true },
})
</script>

<template>
  <span :class="[$style.badge, available ? $style.in : $style.out]">{{ available ? 'Da' : 'Ausgeliehen' }}</span>
</template>

<style module>
/* The module turns every class into a unique name, $style returns it by its name in the CSS */
.badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  color: #fff;
}

.in {
  background: #2e7d32;
}

.out {
  background: #b71c1c;
}
</style>
