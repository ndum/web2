---
title: Reviewing AI-generated code
description: Typical mistakes in suggested Vue code with their source in the documentation, Vue 2 patterns, the Options API in script setup, Vuex, lost reactivity, changed props, lists without keys, a checklist and tests and a linter as a safety net.
sidebar:
  order: 7
---

:::assignment
The team at the counter needs an overview of the loans that are overdue.

> As the team at the counter, I want to see the overdue loans and remind members of them, so that the things come back on time.

The new volunteer asked an AI assistant for the components. The code looks reasonable, but the lists stay empty, and the console reports errors. The acceptance criteria are:

1. The code follows Vue 3 with `<script setup>`, without Vue 2 patterns.
2. No component changes a prop, and none loses the connection to its state.
3. A checklist and tests catch mistakes like these before the code reaches `main`.
:::

:::goals
After this chapter you can

- spot typical mistakes in suggested Vue code and find their source in the documentation,
- translate Vue 2 patterns into Vue 3,
- find and fix lost reactivity and changed props,
- write lists with keys and without `v-if` next to `v-for`,
- use a checklist, tests and a linter as a safety net.
:::

## Reviewing code you didn't write

Chapter 0.1 noted that assistants often write patterns from older versions of Vue. You're responsible for what you commit, no matter who wrote it. So read suggested code as you would in a review, line by line, and look up every pattern you don't know in the documentation. In the project, the AI declaration records what you checked and changed, and in the screencast you show a place where a suggestion was wrong.

## Vue 2 patterns

According to [vuejs.org](https://v2.vuejs.org/eol/), Vue 2 reached its end of life on December 31, 2023. The [migration guide](https://v3-migration.vuejs.org/) lists what changed in Vue 3. Instead of `new Vue`, `createApp` starts an app, and global functions like `Vue.component` hang off the app. Filters are gone, and a function or a computed value takes over their job. `$on`, `$off` and `$once` were removed, as were the modifier `.native` and `$listeners`, and `Vue.set` is no longer needed.

Some of this doesn't stand out right away. A filter like `{{ loan.until | date }}` compiles without an error in Vue 3, because Vue reads the expression as JavaScript, where `|` is a bitwise OR. The page then shows a number instead of a date.

## The Options API in script setup

Code in `<script setup>` runs like the body of `setup()`, and according to the [Vue documentation](https://vuejs.org/api/composition-api-setup.html) there's no `this` there. A suggested `this.loans` in a computed value therefore fails at runtime. Fields like `data`, `methods` or `computed` in a second `<script>` belong to the Options API and don't fit `<script setup>`. Nobody needs to import `defineProps` and `defineEmits`. Whoever does gets a warning while compiling that `defineProps` is a compiler macro. Props without types, such as `defineProps(['loans'])`, are only fit for prototypes according to the [style guide](https://vuejs.org/style-guide/rules-essential.html).

## Vuex and Vue CLI

For shared state, the Vue documentation recommends Pinia, and Vuex is in maintenance mode. A suggestion with `new Vuex.Store`, `commit` and `mapState` therefore belongs in a store with `defineStore`, as in chapter 7.2. [Vue CLI](https://cli.vuejs.org/) is in maintenance mode as well, and a new project starts with create-vue and Vite. Instructions with `vue create` or `npm run serve` come from that time.

## Lost reactivity

Whoever takes a reactive object or a store apart directly gets copies of the values. The page then shows the state at the moment of taking it apart and follows no change anymore, as chapters 5.1 and 7.2 showed.

::playground{dir="examples/08-architecture/lost-reactivity"}

`toRefs` keeps the connection for a reactive object, `storeToRefs` for a store. Since Vue 3.5 you may destructure props, but according to the [Vue documentation](https://vuejs.org/guide/components/props.html#reactive-props-destructure) `watch` needs a destructured prop as a function, such as `watch(() => loans, …)`.

## Changed props

According to the Vue documentation, data only flow from the parent to the child. When a child changes its prop, Vue warns in the console, and the change has no effect.

::playground{dir="examples/08-architecture/mutated-prop"}

Instead, the child reports an event, and the parent changes its state. If the child only needs a starting value, it makes a copy of its own with `ref`.

## Lists with keys

The style guide asks for a `key` with every `v-for`. Without a key, or with the index as the key, Vue reuses the elements by their position. When an entry disappears, the state inside the elements, such as typed text, moves on to the next entry.

::playground{dir="examples/08-architecture/missing-key"}

According to the style guide, `v-if` and `v-for` never belong on the same element. In Vue 3, Vue evaluates `v-if` first, when the loop variable doesn't exist yet. A computed value filters the list beforehand, or a `<template v-for>` wraps the element with `v-if`.

## A checklist

These questions help with every suggested piece of Vue code.

1. Does the code run with Vue 3 and `<script setup>`, without `this`, filters, `$on` and `new Vue`?
2. Do props have types, and does no component change its props?
3. Do values from stores and reactive objects stay connected?
4. Does every `v-for` have a unique `key`, and is there no `v-if` on the same element?
5. Does the code use Pinia, Vue Router and Vite instead of Vuex, Vue CLI and older functions?
6. Does the page show loading, errors and empty lists when data come from a server?
7. Is there a test for what the code should do, and does it fail when the code is wrong?

## Tests and a linter as a safety net

Tests check what the code should do, and chapter 8.4 shows how to check whether they notice a mistake. A linter finds some mistakes while you type. With the option "Linter", create-vue sets up ESLint with [eslint-plugin-vue](https://eslint.vuejs.org/rules/), as chapter 3.2 showed. Its rules for Vue 3 report, among other things, changed props with `vue/no-mutating-props`, missing keys with `vue/require-v-for-key`, `v-if` next to `v-for` with `vue/no-use-v-if-with-v-for` and Vue 2 patterns with rules like `vue/no-deprecated-filter`. It only catches lost reactivity with rules that aren't part of the presets, and only a test knows whether a list sorts correctly.

## Giving the assistant context

An assistant doesn't know your project. Tell it the versions, such as Vue 3 with `<script setup>`, Pinia and Vue Router, and how your project is organized, and ask it to explain what its suggestion does. Whatever you can't explain, you don't take over. Passwords, keys and personal data never go into a request to an assistant.

## In your project

The AI declaration in your README states for every tool what you used it for, which parts are affected and what you checked or changed in the result. While you work, note the places where a suggestion was wrong, together with the commit that fixed it. The screencast asks about one of them.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the example with the changed prop, click "Count up". What does the console report, and what does the number show? Rewrite the child so that it reports an event.
2. In the example without keys, type some text into the second row and remove the first. Where is your text now? Change the key to `note.id` and repeat it.
3. In the example with the lost reactivity, click several times. Which number follows? Replace the destructuring with `toRefs(state)`.
4. In the exercise project of this chapter, run the tests before you change anything. Which messages point to Vue 2 patterns?

## Exercises

The exercises fix the code the assistant suggested for the team. You'll find the project in the folder `exercises/08-architecture/ai-review/en` of the course repo. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
`OverdueList.vue` mixes `<script setup>` with `this` and a Vue 2 filter, and its props have no types. Rewrite the component in Vue 3. It shows the loans whose day is before `today`, the oldest first, with a date as usual in the language of the page.

:::solution[Solution]
::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/components/OverdueList.vue"}
:::
::::

::::exercise[Going further]
The team page takes the store apart directly and therefore shows no loans. `LoanRow.vue` changes its prop `reminded` instead of reporting the click on "Remind". Fix both, so that the store records who was reminded.

:::solution[Solution]
::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/views/TeamPage.vue" lines="10-15"}

::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/components/LoanRow.vue"}
:::
::::

::::exercise[Challenge]
`NoteList.vue` has `v-if` and `v-for` on the same element, no key, and it changes the prop `notes` when removing a note. Show only the open notes, give every row a unique key and leave the prop unchanged.

:::solution[Solution]
::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/components/NoteList.vue"}
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A computed value in `<script setup>` reads `this` and fails. | Take the props from `defineProps` and read `props.loans`. |
| An interpolation with `\|` shows a number instead of text. | Vue 3 has no filters anymore. Call a function. |
| A list from a store stays empty although the store has loaded. | Take the store apart with `storeToRefs` or read through the store. |
| The console reports that a target is readonly. | A component changes its prop. Report an event. |
| Typed text jumps into another row after removing one. | Use a unique `key`, not the index. |
| Instructions start with `vue create` or install Vuex. | Use create-vue and Pinia. |

## Self-check

::::selfcheck
1. How do you recognize code that comes from Vue 2?
2. Why does a list from a store that was taken apart directly stay empty?
3. What happens when a list uses the index as its key and an entry disappears?
4. Which mistakes does a linter find, and which only a test?

:::solution[Answers]
1. By `new Vue`, `this` in `<script setup>`, filters, `$on`, `.native`, `Vue.set` or by Vuex and Vue CLI.
2. Taking it apart copies the values. When the store later replaces its list, the page still shows the old one.
3. Vue reuses the elements by their position, and their state ends up with another entry.
4. The linter finds patterns like changed props, missing keys and Vue 2 functions. Only a test shows whether the app does the right thing.
:::
::::

:::assignment
The team sees the overdue loans and reminds the members of them. With that, the app is complete for the course. The [competence grid](../competences/) shows you where you stand after part 8, and your own project applies the chapters of this part.
:::
