---
title: Component libraries and CSS
description: Scoped CSS, CSS modules and v-bind in single file components, and what a component library or Tailwind CSS brings to a project.
sidebar:
  order: 9
---

So far every component of the course has brought its own CSS. In single file components, Vue offers several ways to limit styles to one component. If you'd rather not design forms, tables, menus and dialogs yourself, you can reach for a library of ready-made components or for a CSS framework.

## In your project

A library saves time on elements that are hard to build well, such as a date field, a sortable table or an accessible menu. In return it brings its own look, extra size in the build and a dependency you will hardly get rid of later. Before you choose one, check that it fits your version of Vue, that it is maintained and that it describes how it handles the keyboard and screen readers. For a small project, your own CSS with `scoped` is often enough.

## A small example

With `<style scoped>`, Vue gives every element of the component an attribute of its own and adds it to the selectors. The rules then only apply inside this component. The outermost element of a child component also gets the attribute of its parent, which is why `.card .price` reaches the price. An element deeper inside the child can only be reached with `:deep()`. The paragraph below the card has the same class `price` but stays plain, because it is not inside the card.

::playground{dir="examples/optional/scoped-styles"}

`v-bind()` in CSS ties a value to the state of the component. Vue sets it as a CSS variable and changes it as soon as the state changes.

::playground{dir="examples/optional/css-binding"}

`<style module>` turns every class into a unique name that the template gets through `$style`. The playground does not support CSS modules, but in a project with Vite the component works as shown.

::code{file="examples/optional/css-module/{lang}/StatusBadge.vue"}

The well-known libraries for Vue 3 differ mostly in their look. Vuetify follows Material Design, Quasar brings more than 120 components and its own build tools, and Element Plus and Naive UI have designs of their own. Reka UI, formerly Radix Vue, ships components without styles that only bring behavior and accessibility. These libraries are under the MIT license. Since version 5, PrimeVue needs a license key and comes under a license of its own, PrimeVue 4 is still under MIT. Read the license and the page on accessibility before you choose, not every library has one.

Tailwind CSS takes a different path. Instead of ready-made components, you write small classes such as `flex` or `p-4` straight into the template. With Vite you add it through the plugin `@tailwindcss/vite` and the line `@import "tailwindcss";` in the CSS. Tailwind looks for the classes as plain text in your files, so a class name that the code puts together at run time gets no CSS. Tailwind also removes the bullets of lists, and VoiceOver then no longer announces such lists as lists unless they carry `role="list"`.

## Official links

- [Vue documentation, CSS in single file components](https://vuejs.org/api/sfc-css-features.html)
- [Vuetify](https://vuetifyjs.com/), [Quasar](https://quasar.dev/), [Element Plus](https://element-plus.org/), [Naive UI](https://www.naiveui.com/), [Reka UI](https://reka-ui.com/) and [PrimeVue](https://primevue.dev/)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
