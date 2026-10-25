---
title: State in the right place
description: Local, shared and global state, data from the server and from the address, lifting state into the parent, a module for shared state, and when an app needs no store.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler has a new wish.

> As a member, I want to see my requests everywhere in the app, so that I know what I have already requested.

The volunteer hesitates. `App` already provides the catalog, the favorites and the signed-in member, and every new page needs some of it again. Before a fourth piece comes along, the volunteer wants to settle where each piece belongs. The acceptance criteria are:

1. For favorites, login, filter and requests, it is decided and explained where they live.
2. The header and the list show the same favorites, and no component keeps a copy of its own.
3. The header and the overview show the same requests, no matter where someone requests a thing.
:::

:::goals
After this chapter you can

- tell local, shared and global state apart,
- recognize data from the server and state in the address,
- lift state into the parent and pass it on with props and events,
- put shared state into a module with functions,
- explain when an app needs no store.
:::

## Kinds of state

State is the data that changes while someone works with the app and that the page shows. The running case app already has plenty of it. The search field holds its text, the dialog knows whether it is open, `App` holds the catalog, the favorites and the member, and since part 6 search, category and sort order live in the address. These places differ in who needs the state and how long it should live.

| Kind | Example in the running case app | Place |
|---|---|---|
| local | whether the dialog is open | a `ref` in the component |
| shared | the favorites for header and list | the common parent component |
| global | the signed-in member | a module or a store |
| from the server | catalog and requests | the server, a copy in the browser |
| in the address | search, category and sort order | params and query |

The figure asks its questions in an order that leads to an answer. The address comes first, because whatever someone wants to share or reload has to live there. The server follows, because the app can only ask for data that belongs to others. Only after that does it matter how many components need a value.

![A decision tree with four questions from top to bottom. If an address should keep the value, to share and reload, it goes into the address, as route.params or route.query. If it lives on the server instead, a store fetches it in an action. If only one component needs it, it stays local as a ref in the component. If a few components with a common parent need it, it goes into the parent and travels with props and events. In every other case it belongs in a store with Pinia.](../../../../assets/figures/en/p7c1-state-decision.svg)

## Lifting state into the parent

When two siblings need the same state, it belongs in their common parent. The parent passes it on as a prop and changes it when a child reports an event, as in part 4.

::playground{dir="examples/07-state/lift-state-up"}

According to the [Vue documentation](https://vuejs.org/guide/scaling-up/state-management.html), this gets tedious in deep trees, because the props travel through components that don't need them. This is called prop drilling. For a subtree, `provide` and `inject` from chapter 4.5 help, and that's how the running case app has handled it since part 6.

## A module for shared state

A JavaScript module runs only once, and every component that imports it gets the same objects. A `ref` in a module is therefore already global state, without any library.

::playground{dir="examples/07-state/reactive-module"}

The Vue documentation names the catch. Every component that imports the module can change the state any way it likes, and in a large app nobody knows who changed what after a while. The module in the example therefore hands out the requests through `readonly` and only changes them in its functions `add` and `remove`. For apps that are rendered on a server, such a module doesn't work, because all requests to the server would share the same state there. An SPA like the one in this course isn't affected.

## Getting by without a store

A store pays off when many components in different places read and change the same state. If only one component needs a value, it stays local. If two siblings share it, the parent is enough. Data from the server is only a copy in the browser, and that copy can go out of date, because other members request things and the team records returns. A store can hold this copy, but it has to load it again whenever it may be outdated.

For the running case app, this leads to the following arrangement.

1. The header, the catalog and the page of favorites need the favorites. They go into a store and stay in the browser's storage, as chapter 7.4 shows.
2. The header, the guard and the form need the signed-in member. It goes into a store, but whether the login is valid is up to the server.
3. Search, category and sort order stay in the address.
4. The requests live on the association's server. A store holds the own requests as a copy for the header, the page of a thing and the overview.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the first example, give `ItemList` its own list of favorites again and remove the props. What does the header show now?
2. In the example with the module, try to change the requests in `AppHeader` with `requests.value.push({ id: 1 })`. What does the console report?
3. Replace `readonly(list)` with `list` in the module and try again.
4. Use the figure to place the three fields of the reservation form. Does anything change if someone should find a half-filled request again after a reload?

## Exercises

The exercises build the favorites and the requests from the assignment. You'll find the project in the course repo in the folder `exercises/07-state/where-state/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
`ItemList` keeps the favorites itself, and the header always shows 0. Lift the favorites into `App`. `ItemList` gets them as the prop `favorites` and reports a click on "Favorite" with the event `toggle-favorite`. `AppHeader` gets the number as the prop `favoriteCount`.

:::solution[Solution]
::code{file="exercises/07-state/where-state/solution/{lang}/src/App.vue"}

`ItemList` no longer changes anything itself. It shows the favorites from the prop and reports every click with `emit('toggle-favorite', item.id)`.
:::
::::

::::exercise[Going further]
Create `src/requests.js`. It exports the requests as the ref `requests` holding an array, plus the functions `add(item)` and `remove(id)`. The "Request" button in the list calls `add`, the header shows the number of requests, and `RequestList` shows them with a "Withdraw" button.

:::solution[Solution]
::code{file="exercises/07-state/where-state/solution/{lang}/src/requests.js"}

The solution already contains the challenge. For going further, `export const requests = ref([])` with the two functions is enough. The components import what they need, `AppHeader` for example only `requests`.
:::
::::

::::exercise[Challenge]
Other files should only be able to read `requests`, and changes only go through `add` and `remove`. Also, every thing appears in the list at most once.

:::solution[Solution]
::code{file="exercises/07-state/where-state/solution/{lang}/src/requests.js" lines="1-12"}

The module keeps the writable `list` to itself and only exports the view from `readonly`. An attempt to write from outside changes nothing, and Vue warns in the console.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| Two components show different favorites. | Each one keeps a copy of its own. Lift the state into the common parent. |
| Vue warns because a child component changes its prop. | The child reports an event, and the parent changes its state. |
| Many components change the state of a module, and nobody knows who changed what. | Hand out the state through `readonly` and change it only in functions of the module. |
| The filter lives in global state and is missing from a shared link. | Whatever should be shared and reloaded belongs in the address. |
| An AI assistant creates a store for every value, even for an open dialog. | Local state stays in the component. A store pays off for state that many parts of the app need. |

## Self-check

::::selfcheck
1. In which order does the figure ask, and why does the address come first?
2. What is prop drilling, and what helps against it?
3. Why does the module hand out the requests through `readonly`?
4. Why is the catalog in the browser only a copy?

:::solution[Answers]
1. Address, server, one component, a few components, otherwise a store. Whatever someone wants to share or reload has to be in the address, no matter how many components need it.
2. Props travel through components that don't need them, only to reach children further down. `provide` and `inject`, a module or a store help.
3. That way the state only changes in the functions of the module, and a bug can be narrowed down to a few places.
4. It belongs to the association's server. Other members and the team change it, and the app only notices on the next load.
:::
::::

:::assignment
The arrangement is settled. For the login and the requests, though, the volunteer wants more than a module. "I'd like to see in the developer tools what changes when, and to prepare the state easily in tests." That is what Pinia offers, the library for stores that the next chapter introduces.
:::
