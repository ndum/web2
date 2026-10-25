---
title: Composables
description: Moving state and logic into functions, the rules for composables, useLocalStorage, useFavorites and useSearch built by hand, flexible arguments with toValue, and the VueUse library.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler wraps up the wish from part 4.

> As a member, I want the app to keep my favorites and the chosen category, so that I can carry on where I left off after a reload.

The volunteer doesn't want to write the same code three times for that. The acceptance criteria are:

1. Favorites, search text and category survive a reload of the page.
2. A broken entry in the browser's storage doesn't disturb the app. It then starts without a filter and without favorites.
3. Storing and reading live in a function that any component can use.
:::

:::goals
After this chapter you can

- explain what a composable is and when it pays off,
- move state and logic out of a component into a composable,
- apply the rules for naming, calling and returning from composables,
- accept refs, functions and plain values as arguments with `toValue`,
- judge when a library like VueUse fits.
:::

## Moving stateful logic out

An ordinary function like `formatDate` from part 3 takes values and returns a value. According to the [documentation](https://vuejs.org/guide/reusability/composables.html), a composable is a function that uses the Composition API to encapsulate and reuse stateful logic. It creates refs, computes values, starts watchers or registers hooks, and returns what the component needs from all that.

::playground{dir="examples/05-reactivity/use-local-storage"}

`useLocalStorage` returns a ref that you can use like any other, here with `v-model`. When its value changes, a watcher writes it to the storage. On the next start, the composable reads the value back. Type a note and then change something in the code, such as adding a space. The preview restarts, and the note is still there.

`localStorage` only knows strings. `JSON.stringify` turns any value into a string and `JSON.parse` brings it back, so lists like the favorites fit in as well. `read` treats a broken entry, and a value of a different type than the initial value, like a missing entry. The search text from the chapter on watchers, for example, sits under the same key as plain text. `JSON.parse` fails on "tent" and would turn "123" into a number, and `trim` fails on that number during the search.

## Rules for composables

The documentation names a few rules, and the composables of this course follow them.

1. The name starts with `use` and is written in camelCase, such as `useFavorites`.
2. A composable is only called in `<script setup>`, at the top and before the first `await`. Only there does Vue know which component its hooks and watchers belong to.
3. It returns a plain object of refs, so that the component can destructure the result without losing the connection.
4. Whatever it sets up in `onMounted`, it cleans up in `onUnmounted`, just like a component.

In this course, each composable lives in a file of its own in the folder `src/composables`. Every call creates state of its own. If two components call `useFavorites()`, each one gets its own favorites, and both read the same storage entry only at the start. That's why `App` in the running case calls `useFavorites` once and passes the favorites on, as in part 4. For state that many components share, part 7 brings Pinia.

## Combining composables

A composable may call other composables. `useFavorites` builds on `useLocalStorage` and adds what belongs to favorites.

::playground{dir="examples/05-reactivity/use-favorites"}

The component only sees `isFavorite`, `toggle` and `count`. Where the favorites live and how they get stored stays inside the composable. If that changes later, the component stays as it is.

## Flexible arguments with toValue

`useSearch` filters a list by a search text. To fit everywhere, it should accept the list and the search text as a ref, as a function or as a plain value. `toValue` from Vue 3.3 reads all three. For a ref, it returns `.value`, a function gets called, and a plain value comes back unchanged. When `toValue` runs inside a computed value, Vue records the refs it reads along the way.

::playground{dir="examples/05-reactivity/use-search"}

The example passes the list as a plain array and the search text as a ref. With a function like `() => props.query`, a prop could be passed as well without losing the connection. If the component passed `props.query` directly, only the text of that moment would arrive, just as in the first chapter.

## The VueUse library

Almost every app needs some of the same composables, for the browser's storage, the size of the window, keyboard shortcuts or a pause while typing. The [VueUse](https://vueuse.org/) library collects more than 200 such functions by its own account, among them `useLocalStorage` and `useDebounceFn`. This course builds its composables by hand so that you see what's inside. In a project of your own, it's worth looking at VueUse before you write something yourself. Then check, as with any dependency, whether the library is maintained and how much it adds to the size of the app.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. Type a note in the `useLocalStorage` example and look for the entry `example-note` in the browser's DevTools under "Application" and "Local Storage". What does a string look like as JSON?
2. In the favorites example, call `useFavorites()` a second time and show the second `count` next to the first one. What happens when you mark a favorite?
3. In the `useSearch` example, pass the value `query.value` instead of `query`. What happens when you type, and why?
4. Let `useSearch` return `reactive({ visibleItems, hits })` instead of the object `{ visibleItems, hits }`. What does the list show when you type?

## Exercises

The exercises build the three composables from this chapter. You'll find the project in the course repo in the folder `exercises/05-reactivity/composables/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Create `src/composables/useLocalStorage.js`. `useLocalStorage(key, initialValue)` returns a ref that starts with the stored value or the initial value and stores every change as JSON, including changes inside an array. A broken entry and a value of a different type than the initial value don't count. Use the composable in `App` for the search text under the key `lorraine-commons-search`.

:::solution[Solution]
::code{file="exercises/05-reactivity/composables/solution/{lang}/src/composables/useLocalStorage.js"}

`deep: true` makes the watcher react to `push` as well. `typeof` compares the type of the value that was read with the type of the initial value. An array and an object both have the type `object`, but this check is enough for the app. In `App`, `useLocalStorage('lorraine-commons-search', '')` replaces the former `ref('')`.
:::
::::

::::exercise[Going further]
Create `src/composables/useFavorites.js`. `useFavorites()` stores the ids of the favorites with `useLocalStorage` under the key `lorraine-commons-favorites` and returns `favorites`, `isFavorite`, `toggle` and `count`. `App` uses it instead of its own code for the favorites.

:::solution[Solution]
::code{file="exercises/05-reactivity/composables/solution/{lang}/src/composables/useFavorites.js"}

`toggle` replaces the array with a new one, as in part 4, and the watcher in `useLocalStorage` stores it. In `App`, a single line remains for the favorites.

::code{file="exercises/05-reactivity/composables/solution/{lang}/src/App.vue" lines="11-11"}
:::
::::

::::exercise[Challenge]
Create `src/composables/useSearch.js`. `useSearch(items, query)` returns `visibleItems` and `hits` and accepts the list and the search text each as a ref, as a function or as a plain value. Upper and lower case and spaces at the edges don't matter. `App` uses it to search the catalog.

:::solution[Solution]
::code{file="exercises/05-reactivity/composables/solution/{lang}/src/composables/useSearch.js"}

`toValue` sits inside the computed values, so Vue records the refs it reads. If `const text = toValue(query)` stood outside of `computed`, the search text would be a copy from the moment of the call again. In `App`, the line `useSearch(items, query)` passes the data as an array and the search text as the ref from `useLocalStorage`.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| Vue warns that a hook is called without an active component. | Call the composable at the top of `<script setup>`, not in an event handler and not after an `await`. |
| After destructuring the result, the values stop following. | Return a plain object of refs, not a `reactive` object. |
| Two components call the same composable and see different states. | Every call has its own state. Call the composable once and pass the result on, or share it with Pinia from part 7. |
| A composable receives `props.query` and doesn't react to changes. | Pass a function `() => props.query` and read it in the composable with `toValue` inside a computed value. |
| On start, `JSON.parse` reports a `SyntaxError`, and the app stays empty. | Wrap the reading in `try` and `catch` and fall back to the initial value. |
| An AI assistant writes a mixin with `mixins: [...]`. | Mixins come from the Options API, and the documentation no longer recommends them in Vue 3. Composables take over their job. |

## Self-check

::::selfcheck
1. How does a composable differ from an ordinary function like `formatDate`?
2. Why does a composable return a plain object of refs?
3. What does `toValue` do with a ref, a function and a plain value?
4. Why does `App` in the running case call `useFavorites` only once?

:::solution[Answers]
1. A composable creates state with the Composition API, such as refs, watchers or hooks, and returns it. `formatDate` only computes from its arguments.
2. So that the component can destructure the result without losing the connection to the state inside the composable.
3. For the ref, it returns `.value`, it calls the function, and it returns the plain value as it is.
4. Every call would have favorites of its own. One call in `App`, passed on to the header and the cards, keeps every part on the same state.
:::
::::

:::assignment
The app now remembers what members searched for and marked, and the code for it sits in one place. Martina Hostettler is already thinking ahead. "The favorites should get a page of their own, and the team at the counter needs an area that only they can see." For that, the app needs a router, the topic of part 6. Before that, use the [competence grid](../competences/) to check whether you're ready for part 6.
:::
