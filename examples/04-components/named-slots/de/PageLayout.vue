<template>
  <div class="layout">
    <header>
      <slot name="header">Lorraine Commons</slot>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 0.5rem;
}
header,
footer {
  padding: 0.5rem 1rem;
  background: #eef6f2;
}
</style>
