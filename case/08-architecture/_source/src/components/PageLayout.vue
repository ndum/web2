<script setup>
// The skip link moves the focus to the content without changing the address. A link to #main would
// become a navigation of the router in the hash mode of the demo.
function skipToContent() {
  document.getElementById('main').focus()
}
</script>

<template>
  <div class="layout">
    <a class="skip-link" href="#main" @click.prevent="skipToContent">[%Zum Inhalt springen|Skip to content%]</a>
    <header class="site">
      <slot name="header">Lorraine Commons</slot>
    </header>
    <main id="main" tabindex="-1">
      <slot />
    </main>
    <footer class="site-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -4rem;
  left: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #ffffff;
  color: #1f6b4f;
}
/* Visible as soon as the keyboard reaches it, the first stop of the page */
.skip-link:focus {
  top: 0.5rem;
}
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
