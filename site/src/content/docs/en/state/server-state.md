---
title: Server state libraries
description: Exkurs on data from the server as a cache, Pinia Colada with useQuery and useMutation, keys, fresh and stale data, and TanStack Query.
sidebar:
  order: 5
  badge:
    text: Exkurs
---

This chapter is an Exkurs, a deep dive. You don't need it for the exam, and the running case app gets by without the library. It shows how larger apps manage data from the server, though, and in a project with a lot of data from the server it saves a good deal of code.

:::goals
After this chapter you can

- explain what server state is and how it differs from the rest of the state,
- load and cache data with `useQuery` from Pinia Colada,
- choose a key that fits the data,
- change data with `useMutation` and reload stale queries,
- place Pinia Colada and TanStack Query.
:::

## Server state

The data from the server is only a copy in the browser. The documentation of [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview) describes such server state with four properties. It lives in a place the app doesn't own, the app only reaches it through asynchronous calls, others can change it without the app knowing, and the app's copy can go out of date.

A store like the one in chapter 7.3 handles all of that itself. It loads, keeps the status, loads again after a change and doesn't know whether another page is loading the same data right now. Libraries for server state take over this work and keep the answers in a cache.

## Setting up Pinia Colada

[Pinia Colada](https://pinia-colada.esm.dev/) calls itself the data fetching layer for Vue. It builds on Pinia and keeps its cache in a store. After `npm install @pinia/colada`, `main.js` installs it after Pinia.

::code{file="exercises/07-state/server-state/solution/{lang}/src/main.js" lines="10-15"}

## Queries with useQuery

`useQuery` gets a key and a function that fetches the data. Pinia Colada puts the answer into the cache under the key. According to the [documentation](https://pinia-colada.esm.dev/guide/queries.html), all queries with the same key share the same entry, and simultaneous requests only reach the server once.

::code{file="exercises/07-state/server-state/solution/{lang}/src/views/CatalogView.vue" lines="7-11"}

Among other things, `useQuery` returns `data`, `error` and `isPending`. According to the [source code](https://github.com/posva/pinia-colada/blob/main/src/query-options.ts), data counts as fresh for five seconds. After that it is stale, and Pinia Colada loads it again when a component needs it again, when the window gets the focus back or when the network comes back. Entries that no component needs anymore are cleared after five minutes. `staleTime` and `gcTime` change both. The function gets a `signal`, with which Pinia Colada aborts a request that has been overtaken.

## A key per thing

When the data depends on a value, such as the number of a thing, the value belongs in the key. Written as a function, the key follows the value, and every thing gets an entry of its own. A thing that was there before appears right away from the cache.

::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="11-15"}

## Changing data with useMutation

Whatever changes data on the server goes through `useMutation`. Afterwards the affected queries are stale, in the example the own requests. `invalidateQueries` from `useQueryCache` marks them as stale and loads the queries again that a component is showing right now.

::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="22-29"}

## TanStack Query

The other widely used library for server state is [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview), formerly Vue Query, with packages for Vue, React and other frameworks. For Vue the package is called `@tanstack/vue-query`. The ideas are the same, and `useQuery` takes `queryKey` and `queryFn` there.

```js
const { data, error, isPending } = useQuery({
  queryKey: ['items'],
  queryFn: () => getJson('/items'),
})
```

According to the [documentation](https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults), data counts as stale right away in TanStack Query, and a failing query tries three times before it shows the error. For a project that already uses Pinia, Pinia Colada is the natural choice. People who also work with React know TanStack Query.

## Exercises

The exercises are in the project `exercises/07-state/server-state/en` in the course repo. The tests need no server. For the app in the browser, start the course API and sign in with the button in the header.

```bash
npm install
npm test
```

::::exercise[Getting started]
`CatalogView` loads the catalog by hand and asks the course API on every visit. Load it with `useQuery` under the key `['items']` and show loading, error and the list.

:::solution[Solution]
::code{file="exercises/07-state/server-state/solution/{lang}/src/views/CatalogView.vue"}

When someone comes back to the catalog within five seconds, Pinia Colada doesn't ask the API again. The test counts the requests to `/items`.
:::
::::

::::exercise[Going further]
`ItemView` loads the thing again on every change. Load it with `useQuery` and a key made of `'items'` and the number.

:::solution[Solution]
::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="11-15"}

Without the function, the key would stay with the first thing, and after a change the page would still show the old thing.
:::
::::

::::exercise[Challenge]
Send the request with `useMutation` and then load the own requests under the key `['reservations']` again, so that the list on the page shows the new request.

:::solution[Solution]
::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="17-33"}

`onSettled` runs after success and after an error. A refused request can also show that the list is stale, for example when someone else has already requested the same days.
:::
::::

## Self-check

::::selfcheck
1. How does server state differ from the rest of an app's state?
2. What does `useQuery` need a key for?
3. When does Pinia Colada load data again by itself?
4. What does `invalidateQueries` do after a change?

:::solution[Answers]
1. It belongs to the server, others change it without the app knowing, and the copy in the browser can go out of date.
2. The answer sits in the cache under the key. Queries with the same key share the entry and a running request.
3. When the data is stale and a component needs it again, when the window gets the focus back or when the network comes back.
4. It marks the queries with the key as stale and loads the ones again that a component is showing right now.
:::
::::
