---
title: Params and query
description: Dynamic routes with params, params as props, useRoute and useRouter, search, category and sort order in the query, navigating in code and a reused component.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler wants to be able to send links.

> As a member, I want to send another member a link to a thing or to a filtered list, so that we both see the same page.

The acceptance criteria are:

1. Every thing has a page under `/items/` and its number, such as `/items/6`.
2. Search text, category and sort order are part of the address, and `/?q=saw&category=Tools` shows the saws among the tools.
3. The back button of the browser leads from the thing back to the filtered list.
:::

:::goals
After this chapter you can

- define routes with params,
- read params with `useRoute` and pass them on as props,
- read and write the query of an address,
- navigate in code with `router.push` and `router.replace`,
- react when the router reuses a component for a new param.
:::

## Routes with params

A colon turns part of the path into a param. The route `/items/:id` matches `/items/1` as well as `/items/6`, and `route.params.id` returns the number from the address.

::playground{dir="examples/06-routing/route-params"}

The line above the heading shows the value in quotes, because params always arrive as strings. The numbers of the things are numbers, though, so `Number()` converts the param before the comparison. A link to the page of a thing names the route and adds the param, `{ name: 'item', params: { id: 6 } }`.

![Parts of an address. At the top /items/6, where /items/ is the fixed part of the route /items/:id and 6 is the param, which route.params.id returns as a string. At the bottom /?q=saw&category=Tools&sort=deposit, where / is the path and the query consists of q, category and sort, which route.query.q, route.query.category and route.query.sort return.](../../../../assets/figures/en/p6c2-url-parts.svg)

## Params as props

A component that reads `useRoute` only works with a router. It's simpler when the route hands it the values as props. `props: true` passes the params as they are, which means as strings. A function gets the route and returns the props, and it can convert the param along the way.

::playground{dir="examples/06-routing/params-as-props"}

`ItemView` now gets a number and no longer knows anything about the router. A test can check the component with `mount(ItemView, { props: { id: 6 } })`, without an address and without a router. The [documentation](https://router.vuejs.org/guide/essentials/passing-props.html) advises writing the function without state of its own, because the router only calls it when the route changes.

## Same component, new params

When a link leads from `/items/1` to `/items/2`, the router keeps the component and only changes the param. The code in `<script setup>` then doesn't run a second time.

::playground{dir="examples/06-routing/param-change"}

The console reports "ItemView is created" only for the first thing. After that, only the watcher reports the new number. Whatever depends on the param therefore goes into `computed`, and whatever should happen on the change goes into a watcher. That's how the running case app resets the form when another thing appears. The documentation also mentions `onBeforeRouteUpdate`, which runs before the change and can cancel it as well.

## The query

The part after the question mark is the query. It suits values that change a page without making it a different page, such as search, filter and sort order. `route.query.q` reads the search text, and a link with `query` sets it.

::playground{dir="examples/06-routing/query-filter"}

The search field binds a computed value with `get` and `set`. `get` reads the text from the address, and `set` writes every change back with `router.replace`. `replace` replaces the current entry of the history. Otherwise every keystroke would add a new entry, and the back button would go back letter by letter. A value of `undefined` removes the key from the address altogether.

In the running case app, search text, category and sort order move into the query. The search field writes to the address only after the pause of 300 milliseconds from chapter 5.2, while category and sort order go there right away. The three values no longer need the browser storage from part 5. A reload keeps the address, the back button restores it, and a link passes it on.

## Navigating in code

Sometimes code leads to the next page instead of a link, for example after a form has been sent. `useRouter` returns the router, and `router.push` takes the same targets as `RouterLink`.

::playground{dir="examples/06-routing/navigate-in-code"}

`push` adds an entry to the history, `replace` replaces the current one, and `back` goes back one step like the button of the browser. According to the [documentation](https://router.vuejs.org/guide/essentials/navigation.html), the router ignores `params` when a target has a `path`, which is why the example uses the name of the route. `push` and `replace` return a promise that resolves once the navigation is over.

## Addresses for pages and for the server

The page of a thing lives at `/items/6`. Until now, the development server of the running case app forwarded everything below `/items` to the small server, and this page with it. From this part on, the app fetches the catalog from `/api/items`. Vite now only forwards addresses below `/api` and removes the prefix, and all other addresses belong to the app.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the example with `useRoute`, remove the call to `Number()`. What does the page show for the drill, and why?
2. In the example with the props, replace the function with `props: true`. What does Vue report in the console?
3. In the example with the reused component, click "Next thing" several times. How often does "ItemView is created" appear?
4. In the example with the query, replace `router.replace` with `router.push` and add a button that calls `router.back()`. Type a word and click the button several times. What happens to the search field?

## Exercises

The exercises build the links from the assignment. You'll find the project in the course repo in the folder `exercises/06-routing/params-query/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
`ItemView` shows a thing and expects its number as the prop `id` of type Number. In `src/router/index.js`, add the route `/items/:id` with the name `item`, and give `ItemView` the number as a number. The name of every thing in the catalog leads to its page with `RouterLink`.

:::solution[Solution]
::code{file="exercises/06-routing/params-query/solution/{lang}/src/router/index.js" lines="8-18"}

::code{file="exercises/06-routing/params-query/solution/{lang}/src/views/CatalogView.vue" lines="47-52"}

With `props: true`, the number would arrive as a string. `ItemView` would then find no thing, because `'6'` isn't equal to `6`, and Vue would warn about the wrong type of the prop.
:::
::::

::::exercise[Going further]
The search belongs in the address. The search field reads the text from `route.query.q` and writes every change into the query as `q` with `router.replace`. A link like `/?q=tent` shows the three tents right away, and an empty field removes `q` from the address.

:::solution[Solution]
::code{file="exercises/06-routing/params-query/solution/{lang}/src/views/CatalogView.vue" lines="7-15"}

`...route.query` keeps the other values of the query, so that a sort order added later survives. The field binds `query` with `v-model` like an ordinary ref, and `visibleItems` reads `query.value` as before.
:::
::::

::::exercise[Challenge]
Add a `<select id="sort">` with "Name" for the value `''` and "Deposit" for the value `deposit`. It writes `sort=deposit` into the query. Without a choice, the catalog sorts by name. With `deposit` it sorts by deposit, and by name for equal deposits. The search stays when the sort order changes.

:::solution[Solution]
::code{file="exercises/06-routing/params-query/solution/{lang}/src/views/CatalogView.vue"}

`toSorted` returns a new sorted array and leaves the data unchanged. `a.deposit - b.deposit || byName(a, b)` goes on to sort by name when two things have the same deposit, because the difference is 0 then.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `route.params.id === 6` is never true. | Params are strings. Convert them with `Number()`, best in the `props` function of the route. |
| `router.push({ path: '/items', params: { id: 6 } })` ends up at `/items`. | With `path`, the router ignores `params`. Use the name of the route. |
| After a change from `/items/1` to `/items/2`, the page still shows the old thing. | The component stays, only the param changes. Compute the value from the param with `computed` instead of copying it once. |
| Every keystroke in the search field adds an entry to the history. | Use `router.replace` instead of `router.push`. |
| Of two changes to the query in a row, the first one gets lost. | `route` only changes after the navigation. Change both values in one call, or wait with `await` until the first navigation is over. |
| An AI assistant reads `this.$route.params` in `<script setup>`. | There is no `this` there. `useRoute()` returns the current route. |

## Self-check

::::selfcheck
1. How does the value of `:id` get into a component?
2. Why does the route convert the param into a number?
3. When does `router.replace` fit, and when `router.push`?
4. What happens to the code in `<script setup>` when only the param changes?

:::solution[Answers]
1. Through `route.params.id` from `useRoute`, or the route passes it on as a prop with `props`.
2. Params arrive as strings, but the numbers of the things are numbers. Without the conversion, the comparison would find no thing.
3. `replace` for changes that don't deserve a step back of their own, such as each letter of the search. `push` for a change of page that the back button should undo.
4. It doesn't run again, because the router keeps the component. Only computed values and watchers react to the new param.
:::
::::

:::assignment
Members can now send each other links. At the counter, the team asks for an area of its own. "We need an overview of what's on loan, and a place where we record returns." Several pages under a shared address are what nested routes are for, and they come in the next chapter.
:::
