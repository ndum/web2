<template>
  <div class="layout">
    <header class="page-header">
      <slot name="header">Lorraine Commons</slot>
    </header>
    <main>
      <slot />
    </main>
    <footer class="page-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.page-header,
.page-footer {
  padding: 0.5rem 1rem;
  background: #eef6f2;
}
</style>
