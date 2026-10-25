---
title: Animations and transitions
description: Transition and TransitionGroup in Vue, transitions between pages and respect for people who want less motion.
sidebar:
  order: 7
---

Without animation, the page jumps from one state to the next when an element appears, disappears or moves. A short transition shows what changed. Vue ships two components for this, `<Transition>` for a single element and `<TransitionGroup>` for lists. Both add CSS classes at the right moments, and you write the animation itself in CSS.

## In your project

Transitions help where something would otherwise happen unnoticed, for example when a message appears, an entry leaves a list or a dialog opens. Keep them short, a few tenths of a second are enough. Some people get dizzy or nauseous from motion and tell their operating system that they want less of it. CSS reads that setting with the media query `prefers-reduced-motion`, and every animation in your project should respect it.

## A small example

`<Transition>` wraps an element that appears and disappears with `v-if` or `v-show`. When it appears, Vue sets the classes `fade-enter-from`, `fade-enter-active` and `fade-enter-to` one after the other, and the matching classes with `leave` when it disappears. The `fade` part comes from the `name` attribute. Vue waits until the CSS transition has finished and only then removes the element.

::playground{dir="examples/optional/transition-fade"}

For lists, `<TransitionGroup>` handles every entry on its own. Each one needs a key, so Vue knows which entry arrives, leaves or moves. The class `list-move` animates the entries that change their place. So that the others can move up while an entry disappears, `position: absolute` takes the leaving entry out of the flow of the page.

::playground{dir="examples/optional/transition-list"}

Between pages, `<Transition>` animates the component that `RouterView` hands out through its slot. With `mode="out-in"`, the old page leaves before the new one appears.

::playground{dir="examples/optional/route-transition"}

In all three examples a media query switches the transitions off when the system asks for less motion. The change itself remains, it just happens without animation.

Browsers now bring their own interface for such transitions. `document.startViewTransition()` takes a picture of the page, lets you change the state and cross-fades from the old picture to the new one. The method exists in Chrome and Edge from version 111, in Safari from 18 and in Firefox from 144. Still check that it exists, and change the state directly otherwise.

## Official links

- [Vue documentation, Transition](https://vuejs.org/guide/built-ins/transition.html)
- [Vue documentation, TransitionGroup](https://vuejs.org/guide/built-ins/transition-group.html)
- [Vue Router, transitions between pages](https://router.vuejs.org/guide/advanced/transitions.html)
- [MDN, prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [MDN, View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [WCAG 2.2, Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
