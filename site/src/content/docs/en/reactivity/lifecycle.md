---
title: Lifecycle and template refs
description: The hooks in the life of a component, reaching elements with useTemplateRef, setting the focus, adding listeners and timers and cleaning them up again, and guiding the focus in a dialog.
sidebar:
  order: 3
---

:::assignment
The volunteers at the counter mostly work with the keyboard, and Martina Hostettler has written down their wish.

> As a volunteer at the counter, I want to use the catalog and the dialog with the keyboard alone, so that I don't have to reach for the mouse while lending things out.

The acceptance criteria are:

1. When the catalog opens, the focus is in the search field.
2. Escape closes an open dialog.
3. When a dialog opens, the focus is on its first button. When it closes, the focus returns to where it was before.
:::

:::goals
After this chapter you can

- name the hooks in the life of a component in their order,
- reach an element in the DOM with `useTemplateRef`,
- set the focus as soon as a component appears,
- add listeners and timers in `onMounted` and clean them up in `onUnmounted`,
- guide the focus in a dialog following the rules for accessible dialogs.
:::

## The lifecycle

A component is created, appears in the DOM, changes and disappears again. At each of these points, Vue calls functions that you register with the lifecycle hooks. Read the example and work out in which order the messages appear in the console.

::playground{dir="examples/05-reactivity/lifecycle-hooks"}

On load, the console shows `setup`, `onBeforeMount` and `onMounted`. A click on the counter changes the state, and Vue reports `onBeforeUpdate` and `onUpdated`. "Remove the card" makes the component disappear with `v-if`, followed by `onBeforeUnmount` and `onUnmounted`.

![The lifecycle of a component as a timeline from top to bottom. First setup runs, then onBeforeMount and onMounted, from here on the component is in the DOM. Every change of the state is followed by onBeforeUpdate and onUpdated, and an arrow leads from onUpdated back to onBeforeUpdate. When the component disappears, onBeforeUnmount and onUnmounted follow. On the right it says that setup creates the state, that focus, measuring and listeners belong in onMounted and that onUnmounted cleans up listeners and timers.](../../../../assets/figures/en/p5c3-lifecycle.svg)

The code directly in `<script setup>` runs before the DOM of the component exists. State, computed values and watchers belong there. Anything that needs the DOM, such as the focus or the size of an element, belongs in `onMounted`. According to the [documentation](https://vuejs.org/api/composition-api-lifecycle.html#onmounted), a component counts as mounted once its DOM has been created and inserted and its child components have been mounted. `onUnmounted` is the place to clean up timers, DOM listeners and connections to servers. Don't change the state in `onUpdated`, because according to the documentation that easily leads to an endless series of updates.

## Template refs with useTemplateRef

Sometimes the code needs a specific element, for example to give it the focus. A template ref connects an element with a variable in the script. Since Vue 3.5, there's `useTemplateRef` for this. The element gets the attribute `ref` with a name, and `useTemplateRef` with the same name returns a ref that points to the element once it's mounted.

::playground{dir="examples/05-reactivity/template-ref-focus"}

Once the preview has loaded, the focus is in the search field, and you can start typing right away. Before `onMounted`, `search.value` is still `null`, because the element doesn't exist yet. If the element later disappears with `v-if`, the value becomes `null` again. Code that runs at some other point therefore checks first whether the element is there. When `ref` sits on a component instead of an element, the template ref points to the component. The parent only sees what the child exposes with `defineExpose`.

In older examples, you'll find `const search = ref(null)` with the same name as in the attribute. That still works, but `useTemplateRef` makes the connection explicit.

## Listeners and timers

A listener on `window` or a timer created with `setInterval` doesn't belong to the component. It keeps running after the component is gone and holds its state in memory. Whatever you set up in `onMounted`, you therefore tear down again in `onUnmounted`.

::playground{dir="examples/05-reactivity/interval-cleanup"}

The clock logs a `tick` to the console every second. After "Remove the clock", the messages stop, because `onUnmounted` stops the timer with `clearInterval`. Without that line, the messages keep coming although no clock is visible anymore, and every time you show it again, another timer starts.

For keys like Escape, a component listens to `keydown` on `window`. That way the key works wherever the focus happens to be. In the example, click into the preview first, so that the keys arrive there.

::playground{dir="examples/05-reactivity/escape-key"}

`removeEventListener` needs the same function as `addEventListener`. That's why `onKeydown` is a named function and not an arrow function created inside the call. A second arrow function with the same code would be a different function for JavaScript, and the listener would stay.

## Focus in a dialog

Dialogs follow rules from the [dialog pattern of the WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). When a dialog opens, the focus moves into it, usually to the first element that can take the focus. Escape closes the dialog. When it closes, the focus returns to the element that opened it. If that element no longer exists, the app picks another one that fits the workflow.

For the way back, the dialog has to remember where the focus was before. `document.activeElement` is the element that currently has the focus. In `onMounted`, that's still the element in front of the dialog, because the focus only moves inside when you call `focus`. A template ref also works inside `Teleport`, even though the element sits at the end of `body` in the DOM.

The running case has a situation where the opening element disappears. After a request is confirmed, the form starts over with a new `key`, and the button "Send request" that opened the dialog is gone. So `ItemView` puts the focus on the heading of the form. The heading gets `tabindex="-1"`, so it can take the focus without showing up in the order of the Tab key. The dialog and the old form are only gone after the next render, which is why `ItemView` first waits with `await nextTick()`.

::code{file="case/05-reactivity/{lang}/src/views/ItemView.vue" lines="17-29"}

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the focus example, move `search.value.focus()` out of `onMounted` and directly into `<script setup>`. What does the console report?
2. In the lifecycle example, click the counter a few times, remove the card and show it again. What does the counter say, and which hooks run?
3. In the clock example, remove the line with `clearInterval`, remove the clock and show it again. What appears in the console now?
4. In the Escape example, add `console.log(event.key)` to `onKeydown` and remove the line with `onUnmounted`. What appears when you press keys after closing the notice?

## Exercises

The exercises implement the assignment in the practice version of the catalog. You'll find the project in the course repo in the folder `exercises/05-reactivity/lifecycle/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Put the focus into the search field as soon as the catalog appears. Get the field in `src/components/SearchBar.vue` with `useTemplateRef` and call its method `focus` in `onMounted`.

:::solution[Solution]
::code{file="exercises/05-reactivity/lifecycle/solution/{lang}/src/components/SearchBar.vue"}

`input.value` only points to the field in `onMounted`. Since `SearchBar` sets the focus itself, every page that shows the search field gets it without code of its own.
:::
::::

::::exercise[Going further]
The dialog with the details of a thing should close with Escape. In `src/components/BaseDialog.vue`, add a listener for `keydown` on `window` that emits the event `close` on Escape. Remove it again when the dialog disappears.

:::solution[Solution]
::code{file="exercises/05-reactivity/lifecycle/solution/{lang}/src/components/BaseDialog.vue" lines="13-15"}

In `onMounted`, `window.addEventListener('keydown', onKeydown)` registers the function, and in `onUnmounted`, `window.removeEventListener('keydown', onKeydown)` removes it again. To call `emit` in the script, you need `const emit = defineEmits(['close'])`. The whole file is in the solution of the challenge.
:::
::::

::::exercise[Challenge]
When the dialog opens, the focus should be on its first button. When it closes, the focus returns to the element that had it before, usually the button "Details". Add this to `BaseDialog`.

:::solution[Solution]
::code{file="exercises/05-reactivity/lifecycle/solution/{lang}/src/components/BaseDialog.vue" lines="1-30"}

The template ref `dialog` points to the element with `role="dialog"`, and `querySelector('button')` finds the first button inside it. Without actions of its own, that's "Close". `opener` remembers the element that had the focus before, and `onUnmounted` gives the focus back to it. If a dialog had fields in front of its buttons, the focus would belong on the first field, and `querySelector` would better look for fields and buttons together.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The console reports `Cannot read properties of null (reading 'focus')`. | Only reach the element in `onMounted` or later. Before that, the template ref is `null`. |
| The template ref stays `null` even after mounting. | Spell the name the same way in `useTemplateRef` and in the attribute `ref`. |
| Timers or listeners keep running after you leave a page. | Tear down in `onUnmounted` whatever `onMounted` set up, with `clearInterval` or `removeEventListener`. |
| `removeEventListener` doesn't remove the listener. | Pass the same function as to `addEventListener`, not a new arrow function. |
| After a dialog closes, the focus lands at the top of the page. | Remember the element that had the focus when the dialog opened, and give the focus back to it on close. |
| An AI assistant gets an element of a component with `document.querySelector('#search')`. | Use `useTemplateRef`. It finds the element of its own component, even when the component appears several times on the page. |
| An AI assistant writes `this.$refs.search`. | That's the Options API. In `<script setup>`, you use `useTemplateRef` instead. |

## Self-check

::::selfcheck
1. In which order do the hooks run when a component appears, changes and disappears?
2. Why is a template ref empty before `onMounted`?
3. Why does a listener on `window` need a counterpart in `onUnmounted`?
4. Where does the focus belong when a dialog appears, and where when it closes?

:::solution[Answers]
1. `setup`, `onBeforeMount`, `onMounted`, on every change `onBeforeUpdate` and `onUpdated`, and at the end `onBeforeUnmount` and `onUnmounted`.
2. The DOM of the component is only created during mounting. Before that, there is no element the ref could point to.
3. `window` lives longer than the component. Without `removeEventListener`, the listener keeps reacting and holds the component's state in memory.
4. On opening, on an element inside the dialog, usually the first one that can take the focus. On closing, back on the element that opened the dialog, or on another fitting one if that element no longer exists.
:::
::::

:::assignment
Everything works with the keyboard now. The second half of the wish from part 4 is still open, the favorites after a reload. The volunteer doesn't want to copy the code from the chapter on watchers for that. "Storing and reading should be handled by a function that any component can use." In Vue, functions like that are called composables, the topic of the next chapter.
:::
