---
title: Template syntax
description: Showing values with interpolation and v-bind, binding classes and styles, rendering parts and lists with v-if, v-show and v-for, and reacting to events with v-on.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler wants to see the catalog in the new app, the way it looked in the version built by hand.

> As a member, I want to see every thing in the catalog with its category and availability, so that I know what I can borrow.

The acceptance criteria are:

1. The catalog shows every thing with its name and category.
2. Things that are in are marked "Available", things on loan show the date from which they are back, and they look different.
3. A click on the name shows the deposit of the thing.
:::

:::goals
After this chapter you can

- show values with interpolation and bind attributes with `v-bind`,
- set classes and styles depending on data,
- show parts of the page conditionally with `v-if` and `v-show`,
- render lists with `v-for` and `key`,
- react to events with `v-on` and use modifiers.
:::

## Interpolation

The template of a component is HTML with a few additions. The simplest one is interpolation with double curly braces. Vue evaluates the expression inside and inserts the result as text. Read the example and work out what each paragraph shows.

::playground{dir="examples/03-vue/interpolation"}

Between the braces goes a JavaScript expression, something that produces a value. Calls like `toUpperCase()`, arithmetic and the `? :` operator are fine, statements like `if`, loops or `const` are not. For anything longer there are functions in the script and the computed values from the next chapter.

The last paragraph shows the tags of `note` as characters. Vue always inserts interpolation as text and so does what you needed `escapeHtml` for in part 2. The directive `v-html`, on the other hand, inserts HTML without checking it. It belongs only to content you wrote yourself, never to data from members or from an API.

## Binding attributes

Interpolation only works in text, not in attributes. You bind an attribute to an expression with the directive `v-bind`, usually in its short form with a colon. `:href="'#/items/' + item.id"` sets the attribute `href` to the result of the expression. Directives are attributes that start with `v-` and tell Vue what to do with an element.

![The parts of a directive. A directive for a click is split into its parts, v-on is the name of the directive, click the argument, prevent a modifier and reserve the value, a JavaScript expression. Below are the shorthands, the at sign replaces v-on and the colon replaces v-bind.](../../../../assets/figures/en/p3c3-directive.svg)

For attributes that are simply on or off, such as `disabled`, Vue removes the attribute when the expression is `false`. `:disabled="item.availableFrom !== null"` therefore only disables the button for things on loan.

::playground{dir="examples/03-vue/bindings"}

## Classes and styles

`:class` has a notation of its own for classes. You pass an object whose keys are classes, and Vue sets every class whose value is truthy. `:class="{ 'on-loan': drill.availableFrom !== null }"` sets the class `on-loan` only for things on loan. A plain `class` attribute next to it stays, and Vue merges the two. Instead of an object, an array like `:class="['card', size]"` works too.

`:style` takes an object with CSS properties in camelCase, such as `{ borderWidth: '3px' }`. Classes are usually the better choice, because the looks then stay in the CSS and can be changed in one place.

## Conditions

`v-if` renders an element only if the expression is true. With `v-else-if` and `v-else` right after it, you get a chain of which Vue shows exactly one part. That fits the loading states you know from part 2.

::playground{dir="examples/03-vue/conditions"}

`v-show`, by contrast, only hides an element with `display: none`, and it stays on the page. That pays off for parts that open and close often. `v-if` fits when a part rarely appears or an element should be missing entirely. To show or hide several elements together without adding an extra element to the page, put `v-if` on a `<template>`. Vue doesn't render the `<template>` element itself.

## Lists

`v-for` renders one element for every entry of an array. `v-for="item in items"` provides the entry under the name `item`, and `v-for="(item, index) in items"` also its position.

::playground{dir="examples/03-vue/lists"}

The `:key` attribute tells Vue which element belongs to which entry. When the list changes, through a filter or a new sort order for instance, Vue moves the existing elements by their key instead of refilling them in order. Without a key, an input field or open details can end up at the wrong thing. The key must be unique and stable. The id of a thing works, the position `index` doesn't, because it changes when filtering.

Never put `v-if` and `v-for` on the same element. Vue evaluates `v-if` first, and the loop variable doesn't exist yet at that point. For a filtered list there are computed values from the next chapter, or you put `v-for` on a surrounding `<template>`.

## Events

`v-on` reacts to events, usually in its short form with `@`. `@click="reserve"` calls the function `reserve` on a click. If there is an expression, Vue runs it, for example `@click="count = 0"` or `@click="toggle(item.id)"`. The event itself is available as `$event`.

The examples need a value that can change. That's what `ref` is for, a value the template follows. In the script you read and write it through `.value`, in the template without it. The next chapter explains what's behind this.

::playground{dir="examples/03-vue/events"}

Modifiers are attached to the directive with a dot and take care of common tasks. `.prevent` calls `preventDefault()`, so the link goes nowhere. `.stop` stops the event before it reaches surrounding elements, and `.once` reacts only to the first event. For keys, modifiers like `.enter` or `.esc` select the key, so `@keyup.enter` reacts only to the Enter key.

## In code

Work with the example on the list. Read the code and write down what you expect before you change anything.

1. What does the list show if you set `availableFrom` of the raclette oven to `'2026-11-20'`?
2. Add `v-if="item.availableFrom === null"` to the `li` element as well. What does the playground report, and why?
3. Fix the problem from question 2 with a `<template v-for="item in items" :key="item.id">` around the `li` element, which now carries only `v-if`.
4. Change `:key="item.id"` to `:key="index"`. What do you see, and why doesn't the difference show in this example?

## Exercises

The exercises build the catalog from the assignment. You find the project in the course repo in the folder `exercises/03-vue/template-syntax/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

With `npm run dev` you see the catalog in the browser. At first all tests fail.

::::exercise[Getting started]
In `App.vue`, show all things as a list `<ul class="catalog">`. Every `li` entry contains the name in an element with the class `name` and the category in an element with the class `category`. Give every entry its id as the `key`.

:::solution[Solution]
The list comes from `<li v-for="item in items" :key="item.id">`. Inside are `<span class="name">{{ item.name }}</span>` and `<span class="category">{{ item.category }}</span>`. The solution to the challenge later turns the name into a button, and the class `name` stays.
:::
::::

::::exercise[Going further]
For every thing, show "Available" or "Available again from 11/12/2026" in an element with the class `state`. `formatDate` from `src/format.js` formats the date. Give the entries of things on loan the class `on-loan`, and the CSS then turns their state red.

:::solution[Solution]
The class sits on the `li` element.

::code{file="exercises/03-vue/template-syntax/solution/{lang}/src/App.vue" lines="19-19"}

For the state, two elements with `v-if` and `v-else` follow each other directly.

::code{file="exercises/03-vue/template-syntax/solution/{lang}/src/App.vue" lines="24-25"}

To make `formatDate` available in the template, you import it in the script. Everything that `<script setup>` imports can be used in the template.
:::
::::

::::exercise[Challenge]
Turn the name into a `button` with the class `name`. A click on it shows the deposit in an element with the class `details`, such as "Deposit CHF 80.00", and a second click hides it again. At most one thing is open at any time. The details sit in every entry with `v-show`, and `aria-expanded` on the button tells screen readers whether they are open. `const openId = ref(null)` holds the state, and `formatDeposit` formats the deposit.

:::solution[Solution]
::code{file="exercises/03-vue/template-syntax/solution/{lang}/src/App.vue"}

`openId` remembers the id of the open thing. Since there is only one such value, only one thing can be open at a time. `toggle` closes the details when someone clicks the same name a second time. `:aria-expanded` gets `true` or `false`, and Vue writes the value into the attribute as text. A button instead of plain text can also be reached and triggered with the keyboard.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `href="{{ link }}"` leads to an address with curly braces. | Attributes have no interpolation. Write `:href="link"`. |
| `disabled="false"` still disables the button. | Without the colon the value is text, and the attribute is set. Write `:disabled="false"`. |
| Vue reports `v-else/v-else-if has no adjacent v-if or v-else-if.` | `v-else` must follow the element with `v-if` directly, with no other element in between. |
| After filtering, input or open details end up at the wrong thing. | Use a stable id as the `key`, not the position. |
| `v-if` and `v-for` on the same element, and the loop variable is missing. | Put `v-for` on a surrounding `<template>` or filter the list beforehand. |
| An AI assistant shows text from the data with `v-html`. | Use interpolation. `v-html` inserts HTML unchecked and opens the door to injected code. |

## Self-check

::::selfcheck
1. How does `{{ note }}` differ from `v-html="note"`?
2. What happens with `disabled="false"`, and what with `:disabled="false"`?
3. When do you choose `v-show` over `v-if`?
4. Why does `v-for` need a `key`, and which value is suitable?

:::solution[Answers]
1. Interpolation inserts the value as text, and tags appear as characters. `v-html` inserts it as HTML without checking it.
2. Without the colon, `"false"` is text, the attribute is set and the button is disabled. With the colon, the expression is `false`, and Vue removes the attribute.
3. When a part opens and closes often. `v-show` only hides the element, `v-if` removes it and builds it again.
4. So that Vue matches the elements to the right entries when the list changes. A unique, stable value such as the id is suitable.
:::
::::

:::assignment
The catalog is up, and the first volunteers at the counter are already looking at it. With 60 things, though, the list gets long. "Can you search it and filter by category?" asks Martina Hostettler. "And at the counter we'd like to see how many things are in right now." The next chapter makes the catalog reactive.
:::
