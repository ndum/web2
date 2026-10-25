---
title: Competence grid for part 5
description: What you can do after part 5 and how to check it yourself, plus the state of the app after part 5.
sidebar:
  label: Competence grid
  order: 5
---

Use this grid to judge whether you are ready for part 6. Read each row and solve the check task next to it without looking anything up. If it feels easy, you have reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check task | Look it up |
|---|---|---|
| explain how Vue tracks dependencies | Explain with a computed value what `track` and `trigger` do. | [Reactivity in detail](../in-detail/#effects-and-dependencies) |
| make the dependencies of a component visible | Make a component report with `onRenderTriggered` which change renders it again. | [Reactivity in detail](../in-detail/#making-dependencies-visible) |
| find bugs caused by copied values | Find the bug in `const total = props.items.length` and fix it. | [Reactivity in detail](../in-detail/#copied-values) |
| reset a reactive object without losing the connection | Reset an object created with `reactive` that has three fields in a single line. | [Reactivity in detail](../in-detail/#replaced-objects) |
| use `toRef` and `toRefs` | Take a reactive object apart so that the variables keep following it. | [Reactivity in detail](../in-detail/#single-fields-with-toref-and-torefs) |
| use `shallowRef` and `triggerRef` | Explain why `push` on an array inside a `shallowRef` doesn't change the page, and name two fixes. | [Reactivity in detail](../in-detail/#large-data-with-shallowref) |
| wait for the DOM with `nextTick` | Explain why an element still shows the old text right after a change. | [Reactivity in detail](../in-detail/#waiting-for-the-dom-with-nexttick) |
| implement side effects with `watch` | Store the chosen category in the browser's storage on every change. | [Watchers](../watchers/#side-effects) |
| choose sources and options of `watch` | Observe a single field of a reactive object and let the watcher run right on start. | [Watchers](../watchers/#sources) |
| clean up with `onWatcherCleanup` | Build a search that only filters after a pause of 300 milliseconds. | [Watchers](../watchers/#cleaning-up-with-onwatchercleanup) |
| choose between `computed`, `watch` and `watchEffect` | Match the number of hits, the title of the tab and a click on "Reserve" with the right tool. | [Watchers](../watchers/#choosing-between-computed-and-watch) |
| use the lifecycle hooks | Name the order of the hooks and the hook in which a timer starts. | [Lifecycle and template refs](../lifecycle/#the-lifecycle) |
| reach elements with `useTemplateRef` | Set the focus on a field as soon as its component appears. | [Lifecycle and template refs](../lifecycle/#template-refs-with-usetemplateref) |
| clean up listeners and timers | Build a clock that stops logging once it has been removed. | [Lifecycle and template refs](../lifecycle/#listeners-and-timers) |
| guide the focus in a dialog | Name the rules for the focus when a dialog opens and when it closes. | [Lifecycle and template refs](../lifecycle/#focus-in-a-dialog) |
| move stateful logic into a composable | Move a counter that the browser remembers into a composable. | [Composables](../composables/#moving-stateful-logic-out) |
| apply the rules for composables | Explain why `useSearch` returns an object of refs and not a `reactive` object. | [Composables](../composables/#rules-for-composables) |
| accept arguments with `toValue` | Make a composable accept a search text as a ref, as a function or as a string. | [Composables](../composables/#flexible-arguments-with-tovalue) |

For part 6 you mainly need components with props and events, plus `watch` and the lifecycle hooks. The router shows the pages of the app as components, and the pages react to parts of the address.

## The app after part 5

What Martina Hostettler's assignments in this part added up to is in the course repo in the folder `case/05-reactivity/en`. The app remembers search text, category and favorites with the composables in `src/composables`, and the list follows the search field after a short pause. In the catalog, the focus starts in the search field. The dialog closes with Escape and moves the focus into it and back out. `App` now adds the listener for the address in `onMounted` and removes it in `onUnmounted`. The tests in the folder `tests` check the wishes from this part.

```bash
npm install
npm test
```

For the app, start the small server in one terminal and Vite in a second one, as before.

```bash
npm run server
npm run dev
```

If you didn't finish everything in part 5, start part 6 from this state.
