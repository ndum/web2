---
title: Reactive state
description: Holding state with ref and reactive, deriving values with computed, and making the catalog reactive with search, filter and the number of things that are in.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler has turned the questions from the counter into an assignment.

> As a member, I want to search the catalog by name and filter it by category, so that I quickly find what I need.

The acceptance criteria are:

1. A search field shows only things whose name contains the search text, regardless of upper and lower case.
2. A select filters by category and can be combined with the search.
3. Above the list it says how many things are in right now, and below the filter how many things were found.
4. If nothing matches, "No things found." appears.
:::

:::goals
After this chapter you can

- explain why an ordinary variable doesn't update the page,
- hold and change state with `ref` and `reactive`,
- derive values with `computed`,
- decide when a function fits and when a computed value does,
- watch the state of a component in the Vue DevTools.
:::

## State the page follows

In the SPA built by hand you called `render` after every change. In Vue that call goes away, as long as Vue learns about the change. For that, the value has to be reactive. The example counts returned things once with an ordinary variable and once with `ref`. Work out what the two lines show after a few clicks, then open the playground's console.

::playground{dir="examples/03-vue/plain-and-ref"}

A click on "Count without ref" increases the variable, as the console shows, but the page stays at 0. Vue learns nothing about the change. A click on "Count with ref" changes a reactive value, Vue renders the component again and reads the ordinary variable again in the process. That's why the first line suddenly jumps to the current count. Don't rely on that. Everything the page should show that changes belongs in a reactive value.

## ref

`ref(0)` returns an object with the property `value`. In the script you read and write the value through `.value`, while in the template Vue unwraps it for you, and `{{ returned }}` is enough. While rendering, Vue remembers which refs the template reads and renders the component again as soon as one of them changes.

A ref can hold any value, numbers, strings, arrays and objects. With arrays and objects, Vue also notices changes inside them, such as `items.value.push(item)` or `item.value.name = 'Ladder'`. You can replace the whole value, as the app does with `items.value = data` after loading. Declare the variable itself with `const`, because you never change the variable, only its `value`.

## reactive

`reactive` makes an object itself reactive. Its fields need no `.value`. Behind it is a proxy, like the ones you met in the deep dive [Proxies and getters](../../javascript/proxies/) in part 1. Read the example and work out what the last line shows after a click on the button that searches for "saw".

::playground{dir="examples/03-vue/reactive-filters"}

The last line stays empty. `const { query } = filters` copies the value `query` has at that moment, and the copy doesn't follow the object. The same happens when you assign a new object to the variable. The template then keeps showing the old one, which is why `reset` changes the fields one by one. Also, `reactive` works only with objects, not with numbers or strings.

The Vue documentation recommends `ref` as the first choice, because it works the same way for every value and avoids these traps. This course follows that advice. `reactive` fits a group of fields that belong together, such as the fields of a form.

## computed

Many values can be calculated from others, such as the number of things that are in or the list that matches the search text. You don't store such values in a ref of their own, you derive them with `computed`. Vue calls the function, remembers the result and only recalculates when one of the values the function read changes.

::playground{dir="examples/03-vue/computed-search"}

The search field is bound to the ref `query` with `v-model`. `v-model` keeps field and ref in step in both directions, and the chapter on forms shows what's behind it. When someone types into the search field, `query` changes. Vue recalculates `visibleItems` and renders the list. `availableCount` only depends on `items` and stays as it is.

![Dependencies of the computed values in the catalog. On the left are the data items and the refs query and onlyAvailable. The computed value visibleItems reads all three, availableCount reads only items. The template shows the list from visibleItems and the number from availableCount. When query changes, Vue recalculates only visibleItems.](../../../../assets/figures/en/p3c4-computed.svg)

A computed value is a ref you only read. In the script you write `visibleItems.value`, in the template `visibleItems`. The function inside should only calculate and return a value. Loading data, changing other refs or waiting for something doesn't belong there, that's what event handlers and `watch` from part 5 are for.

Instead of `computed` you could write a function and call it in the template, `{{ availableCount() }}`. The result is the same, but Vue runs the function on every render, even when nothing it depends on has changed. For everything that follows from the state, `computed` is the clearer choice. Functions fit actions such as `toggle` and small conversions with an argument such as `formatDate`.

## State in the DevTools

In the Vue DevTools, the area next to the component tree shows the state of the selected component, refs, reactive objects and computed values. When you type into the search field, `query` and `visibleItems` change there as well. You can also change the value of a ref in the DevTools, and the page follows right away. That's a quick way to check whether a bug lives in the state or in the template.

## In code

Work with the example on the search. Read the code and write down what you expect before you change anything.

1. How many things does the list show when you search for "tent"? And how many when "Only available" is active as well?
2. Add the line `console.log('recalculated')` to `visibleItems`. When does the message appear, and when doesn't it?
3. Turn `availableCount` into an ordinary function and adjust the template. What changes for the page, and what for the work Vue does?
4. Replace `const query = ref('')` with `let query = ''`. What happens when you type, and why?

## Exercises

The exercises make the catalog from the last chapter searchable. You find the project in the course repo in the folder `exercises/03-vue/reactive-state/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Above the list, show how many things are in, in an element with the class `summary`, for example "49 of 60 things are in". Calculate the number with `computed`.

:::solution[Solution]
::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue" lines="10-10"}

::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue" lines="31-31"}

`items` doesn't change in this project, so Vue calculates the number only once. When the data come from the server, as in the running case, the same code recalculates by itself after loading.
:::
::::

::::exercise[Going further]
Add a search field `<input id="search" type="search">` with a label and bind it to a ref `query` with `v-model`. The list shows only things whose name contains the search text, regardless of case and of spaces at the start and end. Calculate the list with `computed` and let `v-for` run over that list.

:::solution[Solution]
::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue" lines="17-22"}

The condition with `category` only comes in the challenge. Without it, the filter reads `item.name.toLowerCase().includes(text)`. `trim` removes the spaces at the edges, and `toLowerCase` evens out the case. An empty search text is contained in every name, so the list then shows all things. In the template, `v-for` runs over `visibleItems` instead of `items`.
:::
::::

::::exercise[Challenge]
Add a select `<select id="category">`. The first option "All categories" has the value `''`, followed by the categories from the data, each once and in alphabetical order. The list takes search and category into account together. An element with the class `hits` names the number of hits, "10 things found" or "1 thing found". If nothing matches, "No things found." appears instead of the list. `new Set` removes duplicate values, and `localeCompare` compares strings for sorting.

:::solution[Solution]
::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue"}

`categories` collects the categories with `new Set` and sorts them with `localeCompare` and the language of the page, which matters for languages with umlauts and accents. An option without a `value` attribute delivers its text as the value, which is why `{{ name }}` is enough. `hits` is a computed value of its own because it depends on `visibleItems`. Computed values may read other computed values.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `count++` in the script changes nothing, or an error appears. | Write `count.value++` in the script, the ref itself is an object. |
| `{{ count.value }}` in the template shows nothing. | In the template Vue unwraps the ref, `{{ count }}` is enough. |
| After `const { query } = filters`, `query` no longer follows the object. | Access it through the object, `filters.query`, or use `ref` in the first place. |
| A variable with `reactive` gets a new object, and the page keeps showing the old values. | Change the fields one by one, or use a `ref` and replace `.value`. |
| Vue reports `Write operation failed: computed value is readonly`. | Don't assign to a computed value. Change the refs it is calculated from. |
| An AI assistant writes `data()` and `this.query`. | That's the Options API. In `<script setup>`, state comes from `ref`, and there is no `this`. |
| An AI assistant keeps a filtered list up to date in a ref of its own with `watch`. | Derive values with `computed`, which is shorter and can't get out of step. |

## Self-check

::::selfcheck
1. Why doesn't the page show the change of an ordinary variable?
2. When do you need `.value`, and when not?
3. What gets lost when you destructure a reactive object?
4. How does a computed value differ from a function the template calls?

:::solution[Answers]
1. Vue learns nothing about the change. Only reactive values tell Vue that something has changed.
2. In the script, for refs and computed values. In the template Vue unwraps them, and `reactive` never needs `.value`.
3. The connection. The variables get the value of that moment and no longer follow the object afterwards.
4. Vue remembers the result of a computed value and recalculates only when its dependencies change. A function runs on every render.
:::
::::

:::assignment
Search and filter go down well at the counter. Now Martina Hostettler is missing only the most important part. "Members should be able to reserve a thing, with the first and the last day, and the app should report mistakes right away." The next chapter builds the form for it.
:::
