---
title: Watchers
description: Reacting to changes with watch and watchEffect, sources, immediate, deep and once, cleaning up with onWatcherCleanup, timing with flush, and choosing between computed and watch.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler brings back the wish from the end of part 4.

> As a member, I want the app to keep my last search, so that I can pick it up again after a reload.

While testing, the volunteer noticed something else. On every keystroke the list recalculates and jumps around before the word is finished. The acceptance criteria are:

1. The app stores the search text in the browser under the key `lorraine-commons-search` and puts it back into the search field on start.
2. The list only follows the search field once nobody has typed for 300 milliseconds.
:::

:::goals
After this chapter you can

- explain when a change needs a side effect,
- react to refs, functions and several sources with `watch`,
- use the options `immediate`, `deep` and `once`,
- clean up timers and outdated answers with `onWatcherCleanup`,
- choose the timing of a watcher with `flush`,
- choose between `computed`, `watch` and `watchEffect`.
:::

## Side effects

A computed value should only compute. Some changes, however, should do something outside the component, such as writing an entry to the browser's storage, setting a new title for the tab or sending a request to the server. Effects like these are called side effects, and `watch` exists for them. It observes a source and calls a function as soon as the source changes.

::playground{dir="examples/05-reactivity/watch-title"}

The watcher observes the ref `query`. Its function receives the new value, plus the old one as its second argument, and sets the title. Without options, it only runs after the first change. `immediate: true` runs it once right away, so the title is correct from the start. The playground shows its preview in a frame of its own, so the title of your tab doesn't change there, and the paragraph displays the value instead. In an app, the same code changes the title in the tab.

## Sources

The source can be a ref, a computed value, a reactive object, a function that reads values, or an array of such sources. To observe a single field, you pass a function such as `() => filters.value.category`. If you write just `filters.value.category`, `watch` gets the string of that moment and warns with `Invalid watch source`.

::playground{dir="examples/05-reactivity/watch-sources"}

The first letter in the search field prints "filters, deep" and "first search". After that, each letter only prints "filters, deep", because `once` stops the third watcher after its first call. When you pick a category, the first watcher reports the old and the new value. `deep: true` is needed because `filters` is a ref holding an object. Without the option, the watcher only reacts when `.value` receives a new object. With a reactive object as its source, `watch` observes all fields on its own.

Several sources go into an array, and the function receives the new values in the same order.

```js
watch([query, category], ([text, name]) => {
  console.log(text, name)
})
```

## Cleaning up with onWatcherCleanup

The list should follow the search field only after a pause. To get there, a watcher on `query` starts a timer on every keystroke. If the next keystroke comes before the timer has run out, the old timer must not fire anymore. `onWatcherCleanup` from Vue 3.5 registers a function that Vue calls before the watcher runs the next time and when it stops because the component goes away.

::playground{dir="examples/05-reactivity/watch-cleanup"}

Type a word quickly. The first line follows every letter, the second one only once you stop typing for 300 milliseconds. Each new run of the watcher first cancels the timer of the previous run, so in the end only the timer of the last letter runs out. This technique is called debouncing.

According to the [documentation](https://vuejs.org/guide/essentials/watchers.html#side-effect-cleanup), `onWatcherCleanup` has to be called in the synchronous part of the function. After an `await`, Vue warns that it can't find an active watcher. In an `async` function, the call therefore comes before the first `await`. The same tool helps with server answers that arrive in the wrong order, as the challenge shows.

## Timing with flush

Vue doesn't call a watcher at the moment of the change. It collects the changes, just like it does for rendering. Without options, the watcher runs after the parent component has updated and before its own component updates. If it reads the DOM of its component, it still finds the old state. With `flush: 'post'`, it only runs after Vue has updated the DOM.

```js
watch(
  query,
  () => {
    // Vue has updated the DOM, the list already shows the new hits
  },
  { flush: 'post' },
)
```

`flush: 'sync'` calls the watcher immediately on every change, without collecting anything. The documentation advises against using it for data that changes many times in a row, such as arrays.

## Automatic dependencies with watchEffect

`watchEffect` does without a source. Its function runs right away and then every time a value changes that it read during its last run. That makes it an effect just like the render function from the previous chapter.

::playground{dir="examples/05-reactivity/watch-effect"}

On start, the console shows a line with two empty values, and after that one line for every change to the search field or the category. `watchEffect` is shorter when the code reads many values. `watch`, on the other hand, makes visible what the code reacts to, hands you the old value and only runs when the source really changes. The examples in this course mostly use `watch`.

Watchers that you create directly in `<script setup>` are stopped by Vue together with their component. A watcher created only after an `await` doesn't belong to any component and stays alive. `watch` and `watchEffect` return a function that you then call to stop it yourself.

## Choosing between computed and watch

![Choosing between computed and watch. If a value is derived from other values, such as the number of hits, then computed. Otherwise, if something should happen outside the component, such as storing, the title of the tab or a request to the server, then watch or watchEffect. If the code only reacts to an action such as a click, then a function for the event.](../../../../assets/figures/en/p5c2-computed-or-watch.svg)

The figure boils the choice down to two questions. A watcher that derives a value from other refs and writes it into a ref of its own is almost always a computed value in disguise. It can get out of step, for example when it misses the initial value because `immediate` is missing. The pause in the search is an exception. The ref that the list filters by depends not only on the search text but also on time, and `computed` can't observe time.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the title example, remove `immediate: true`. What does the paragraph show on start, and when does it change?
2. In the example with the sources, replace the function `() => filters.value.category` with `filters.value.category`. What does the console report, and what happens when you pick a new category?
3. In the cleanup example, remove the line with `onWatcherCleanup` and quickly type "tent". What does the second line show, one after the other?
4. In the `watchEffect` example, wrap the line with `console.log` in the condition `if (query.value !== '')`. Does the effect report a new category while the search field is empty? And afterwards?

## Exercises

The exercises build the search from the assignment. You'll find the project in the course repo in the folder `exercises/05-reactivity/watch/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Store the search text on every change with `localStorage.setItem` under the key `lorraine-commons-search`. On start, the app reads the text with `localStorage.getItem` and puts it into the search field. Without a stored text, the field stays empty.

:::solution[Solution]
::code{file="exercises/05-reactivity/watch/solution/{lang}/src/App.vue" lines="7-15"}

`getItem` returns `null` when the key doesn't exist, and `?? ''` turns that into an empty string. `localStorage` only stores strings, which suits the search text. The storage belongs to the address of the page. All projects running on `localhost:5173` therefore share the same entries. You can see them in the browser's DevTools under "Application" and "Local Storage".
:::
::::

::::exercise[Going further]
The list should only follow the search field once nothing has been typed for 300 milliseconds. Create a second ref `settledQuery` that the list filters by, and set it in a watcher with `setTimeout`. Every new keystroke cancels the timer of the previous one. A stored search text applies right away on start.

:::solution[Solution]
::code{file="exercises/05-reactivity/watch/solution/{lang}/src/App.vue" lines="17-31"}

The initial value `ref(query.value)` makes a stored search apply on start without a pause. `onWatcherCleanup` cancels the timer before the watcher runs for the next letter. Without that line, every timer fires, and the list jumps through all the intermediate states one after the other.
:::
::::

::::exercise[Challenge]
In the box "In right now?", you pick a thing, and the app asks `checkAvailability` from `src/availability.js` whether it's in right now. The function stands in for the association's server and answers sometimes quickly and sometimes slowly. If you pick two things in quick succession, the app sometimes shows the answer for the first one. Make sure that only the answer for the thing picked last counts.

:::solution[Solution]
::code{file="exercises/05-reactivity/watch/solution/{lang}/src/App.vue" lines="33-50"}

`outdated` belongs to a single run of the watcher. If someone picks another thing before the answer arrives, Vue calls the cleanup function of the old run, and its `outdated` becomes `true`. When the old answer arrives later, that run ends without changing anything. `onWatcherCleanup` comes before the `await`, as the documentation requires. With a real request made with `fetch`, an `AbortController` could even cancel the old request.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `watch(filters.category, …)` reports `Invalid watch source`. | Observe the field through a function, `watch(() => filters.category, …)`. |
| A watcher on a ref holding an object doesn't react to changes inside it. | Pass `deep: true` or observe the field through a function. |
| A value is only correct after the first change, not on start. | Create the watcher with `immediate: true`. |
| After fast typing, every timer fires and the list jumps through all intermediate states. | Cancel the timer with `onWatcherCleanup`. |
| Vue warns that `onWatcherCleanup()` can't find an active watcher. | Move the call before the first `await`. |
| A watcher computes a value and writes it into a ref of its own. | Use `computed`, unless the value depends on time, like the pause in the search. |
| An AI assistant writes `this.$watch` or a `watch` option in an object. | That's the Options API. In `<script setup>`, you import `watch` from `vue`. |

## Self-check

::::selfcheck
1. What is a side effect, and why doesn't it belong in `computed`?
2. Which sources does `watch` accept?
3. When does Vue call the function you register with `onWatcherCleanup`?
4. How do `watch` and `watchEffect` differ?

:::solution[Answers]
1. An effect outside the component, such as an entry in the browser's storage. A computed value should only derive a result from its dependencies, and Vue decides on its own when and how often to compute it.
2. A ref or a computed value, a reactive object, a function that reads values, or an array of such sources.
3. Before the watcher runs the next time and when it stops, for example because its component goes away.
4. `watch` only reacts to the given source, runs only after a change and hands you the old value. `watchEffect` runs right away and reacts to everything its function reads.
:::
::::

:::assignment
The app remembers the search, and the list waits until someone has finished typing. Something else bothers the volunteers at the counter, and Martina Hostettler passes it on. "When you open the catalog, you have to click into the search field first. And the dialog doesn't close with Escape." For that, the app needs access to elements in the DOM and the right moment in the life of a component, the topic of the next chapter.
:::
