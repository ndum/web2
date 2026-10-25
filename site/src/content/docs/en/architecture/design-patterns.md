---
title: Design patterns in SPAs
description: Patterns as a shared language, the observer in reactivity, presentational and container components, dependencies with provide and inject, an adapter for the API, the store as a facade and strategies for sorting.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler wants to show the app at the general meeting.

> As a board member, I want to demonstrate the app at the general meeting, even if no server of the association runs there, so that the members can try it out.

The volunteer would also like to sort by availability, and the new volunteer asks why the card of a thing knows no store. The acceptance criteria are:

1. The stores get the API from outside and run with the course API and with a stand-in, without their code changing.
2. A new sort order needs no change to the template.
3. The card of a thing works on every page without knowing a store.
:::

:::goals
After this chapter you can

- use design patterns as a shared language,
- recognize the observer in Vue's reactivity,
- separate presentational and container components,
- pass dependencies with `provide` and `inject`,
- write an adapter and strategies and use a store as a facade.
:::

## Patterns as a shared language

A design pattern describes a proven solution to a problem that keeps coming up when designing software. Many of them became known through the book "Design Patterns" by Gamma, Helm, Johnson and Vlissides from 1994, which describes 23 patterns for object-oriented software. Their names make it easier to talk about code. "There's an adapter behind the stores" says in one sentence what would otherwise take a paragraph. In an SPA with Vue, the patterns rarely show up as classes. They appear as functions, modules and components.

## The observer in reactivity

The observer pattern makes sure that all dependent objects find out automatically when an object changes. That's exactly what Vue's reactivity does. According to the [Vue documentation](https://vuejs.org/guide/extras/reactivity-in-depth.html), Vue keeps track of which effects read a reactive value and runs them again after a change. Every component renders inside such an effect, and a `watch` is an observer you write yourself. The Exkurs 1.5 built a small system of this kind with a proxy.

## Presentational and container components

A presentational component only shows what it receives as props and reports clicks as events. A container knows stores and the API and passes the data on.

::playground{dir="examples/08-architecture/presentational-container"}

Dan Abramov described this split for React in 2015. In 2019 he added that he no longer recommends it, because Hooks move stateful logic out without such a split, which composables do in Vue. The idea stays useful wherever a component appears in several places. In the running case app, the catalog and the favorites show the same `ItemCard`, which knows no store, and the pages decide what a click on "Favorite" means. Not every component has to be one or the other.

## Dependencies with provide and inject

A dependency is something a piece of code needs to do its job, such as the API for a store. With dependency injection, a piece of code doesn't fetch its dependency itself, it receives it from outside. The [Vue documentation](https://vuejs.org/guide/components/provide-inject.html) offers `provide` and `inject` for this, and with `app.provide` a value applies to the whole app.

::playground{dir="examples/08-architecture/api-adapter"}

`App.vue` only calls `useApi()` and doesn't know which implementation `main.js` provided. In the running case app, `main.js` does the same for the stores.

::code{file="case/08-architecture/{lang}/src/main.js" lines="10-18"}

Pinia runs a setup store in the context of the app, so `inject` works inside a store too. The running case app wraps the call in a function that complains when someone forgot to provide the API.

::code{file="case/08-architecture/{lang}/src/api/index.js" lines="9-23"}

The key is a `Symbol` that other files import, as the Vue documentation advises for larger apps. Tests provide the same API or a stand-in, and that way they call the real stores.

## An adapter for the API

An adapter translates one interface into the one another piece of code expects. The stores expect functions like `loadItems()` that answer with `ok`, `status` and `data`. `createHttpApi` translates the addresses, methods, status codes and JSON of the course API for them, as chapter 8.1 showed. `createMemoryApi` gives the same answers from the browser's memory, without a server. `createApi` picks one of the two, and no store notices the difference. Chapter 8.6 shows how the demo for the general meeting makes use of it.

## The store as a facade

A facade gives a whole subsystem one simple entry point. The catalog store offers the things, a status and the actions `load` and `markReturned`. How it loads, how the API answers and which messages come up on an error stay hidden from the pages.

::code{file="case/08-architecture/{lang}/src/features/catalog/catalogStore.js" lines="6-25"}

Pinia doesn't call its stores facades. But a store that loads its own data and only exposes finished values and actions does exactly that job.

## Strategies for sorting

A strategy is an interchangeable procedure for the same task. Each sort order is a function that compares two things, and the page picks one of them instead of knowing every sort order itself.

::playground{dir="examples/08-architecture/sort-strategies"}

The running case app keeps its sort orders in `src/features/catalog/sorters.js` and builds the menu from them. Sorting by availability is one more entry, and the template of the catalog stayed the same.

## In your project

Use a pattern where you actually have its problem, not as decoration. If you have an API that you want to swap later or replace in tests, an adapter pays off. Name the pattern in your README or in an architecture decision, so your teacher knows what to look for in the screencast.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the first example, give every `ItemCard` its own list of favorites and remove the prop `favorite`. What does the number at the top show?
2. In the example with the adapter, replace the call `createMemoryApi()` in `main.js` with `createBrokenApi()`. What changes in `App.vue`, and what on the page?
3. In the example with the strategies, add a sort order "Deposit, highest first". Which files do you write in?
4. The course API delivers the things in another format. Which files of the running case app change?

## Exercises

The exercises build a catalog with presentational and container components, an adapter and strategies. You'll find the project in the folder `exercises/08-architecture/patterns/en` of the course repo. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
`ItemCard.vue` gets the favorites store itself and can't be shown without Pinia. Turn it into a presentational component with the props `id`, `name`, `category`, `deposit` and `favorite` that reports a click on "Favorite" as the event `toggle-favorite` with the number. The catalog page becomes the container that knows the store.

:::solution[Solution]
::code{file="exercises/08-architecture/patterns/solution/{lang}/src/components/ItemCard.vue"}

The page passes the state with `:favorite="favorites.isFavorite(item.id)"` and calls the store with `@toggle-favorite="favorites.toggle"`.
:::
::::

::::exercise[Going further]
The association is trying out a lending software. It delivers its things in `public/things.json` in a format of its own, with `itemId`, `title`, `group`, the deposit in cents as `depositCents` and the return date as `returnDate`. Write a function `toItem(thing)` in `src/api/adapter.js` that turns such a thing into an item in the app's format, and let `fetchItems()` deliver only items like that. Afterwards, no component knows the other format.

:::solution[Solution]
::code{file="exercises/08-architecture/patterns/solution/{lang}/src/api/adapter.js"}

::code{file="exercises/08-architecture/patterns/solution/{lang}/src/api/items.js"}

If the lending software changes its format, only the adapter changes.
:::
::::

::::exercise[Challenge]
The page sorts with one `if` per sort order, and the menu is fixed in the template. Create the strategies `name`, `deposit` and `availability` in `src/sorters.js`, each with a `label` and a `compare`, and build the menu from these entries. Sorted by availability, the things that are in come first, then the rest by their return date.

:::solution[Solution]
::code{file="exercises/08-architecture/patterns/solution/{lang}/src/sorters.js"}

::code{file="exercises/08-architecture/patterns/solution/{lang}/src/views/CatalogView.vue" lines="18-26"}

A thing that's in has no date. `?? ''` turns that into an empty text, which comes before every date.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A pattern without a fitting problem makes the code longer, not simpler. | Only use a pattern once the problem it solves shows up. |
| A presentational component calls a store and can no longer be shown or tested on its own. | Pass data as props and report clicks as events. |
| `inject` returns `undefined`. | `provide` is missing or uses another key. Import the key as a `Symbol` from one file. |
| Fields of the other API show up in components. | Only the adapter knows the other format. |
| A new sort order brings another `if` into the page. | Put each sort order into a table as a strategy. |
| An AI assistant suggests a global event bus with `$on`. | According to the [migration guide](https://v3-migration.vuejs.org/breaking-changes/events-api.html), Vue 3 removed `$on`. Use props and events, `provide` and `inject` or a store. |

## Self-check

::::selfcheck
1. What does a design pattern describe, and what are its names good for?
2. Where is the observer in Vue?
3. How does a presentational component differ from a container?
4. Why don't the stores change when the app gets a stand-in for the API?

:::solution[Answers]
1. A proven solution to a recurring problem. With its name, a solution can be named in one word.
2. In reactivity. Effects like rendering a component or a `watch` read reactive values and run again after a change.
3. The presentational component gets everything through props and reports events. The container knows stores and the API.
4. They only call functions of the API that both adapters offer in the same way, and they get their API through `inject`.
:::
::::

:::assignment
The stores no longer know where the data come from, and the card of a thing fits on every page. Now the new volunteer asks why the app uses Pinia, why the API goes through a proxy and why the form no longer asks before leaving. Nobody remembers all the reasons. The next chapter records decisions like these.
:::
