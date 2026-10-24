<template>
  <div class="layout">
    <header class="site">
      <slot name="header">Lorraine Commons</slot>
    </header>
    <main>
      <slot />
    </main>
    <footer class="site-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.site {
  padding: 0.75rem 1.5rem;
  background: #1f6b4f;
  color: #ffffff;
}
main,
.site-footer {
  max-width: 48rem;
  padding: 1rem 1.5rem;
}
.site-footer {
  border-top: 1px solid #e2e2e2;
}
</style>
