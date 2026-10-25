---
title: Pinia
description: Setting up stores with Pinia, setup stores with state, getters and actions, storeToRefs, stores that use other stores, a store in a navigation guard, the Vue DevTools and tests for stores.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler gets in touch from the counter.

> As a volunteer at the counter, I want nothing of the previous member's requests to be visible after signing out, so that the next member at the same device only sees their own.

The volunteer suggests putting the login and the requests into stores with Pinia. The acceptance criteria are:

1. The login and the requests each live in a store.
2. The header, the page of a thing and the guard read the login from the store.
3. After signing out, no request of the previous member is left in memory.
:::

:::goals
After this chapter you can

- set up Pinia in an app,
- write a setup store with state, getters and actions,
- take a store apart with `storeToRefs` without losing the connection,
- use a store in another store and in a navigation guard,
- test stores and components that use stores.
:::

## Setting up Pinia

[Pinia](https://pinia.vuejs.org/) is the library for stores that Vue recommends. According to the [Vue documentation](https://vuejs.org/guide/scaling-up/state-management.html), the Vue core team maintains it, and the older Vuex no longer gets new features. Compared with a module like the one in the last chapter, Pinia brings fixed conventions for working together and a connection to the Vue DevTools.

A create-vue project with the Pinia option already has everything it needs. Pinia is among the dependencies, an example store sits in `src/stores`, and `main.js` installs Pinia before the router.

```js
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

## Setup stores

`defineStore` creates a store. The first argument is an id that has to be unique in the app. The second is a function like `<script setup>`. According to the [Pinia documentation](https://pinia.vuejs.org/core-concepts/), refs in it become state, computed values become getters and functions become actions. By convention the store is called `use` plus a name plus `Store`.

::playground{dir="examples/07-state/first-store"}

Every component that calls `useFavoritesStore()` gets the same store. A setup store has to return all of its state, otherwise Pinia and the developer tools miss it, according to the documentation. That's why private state doesn't exist. Besides setup stores, Pinia knows option stores with the fields `state`, `getters` and `actions`, like the Options API. This course uses setup stores, because they look like `<script setup>` and can use composables.

## Taking stores apart with storeToRefs

A store is a reactive object. Taking it apart directly gives you copies of the values, as with `reactive` in chapter 5.1. `storeToRefs` turns state and getters into refs that stay connected to the store.

::playground{dir="examples/07-state/store-to-refs"}

Actions can be destructured directly, because according to the documentation they are bound to the store. `storeToRefs` leaves them out.

## Stores that use other stores

A store may use another store. The store of the requests asks the store of the login who is signed in right now and only shows that member's requests in its getter `mine`.

::playground{dir="examples/07-state/stores-together"}

Pinia hands out the same store on every call of `useAuthStore()`, inside the other store too. When someone else signs in, `mine` is computed again.

## A store in a navigation guard

A guard runs outside of components. According to the [Pinia documentation](https://pinia.vuejs.org/core-concepts/outside-component-usage.html), it therefore calls the store inside its function and not at the top of the module. There, depending on the order of the imports, the call could run before Pinia is installed and fail.

::playground{dir="examples/07-state/store-in-guard"}

As in chapter 6.4, a member without a team account ends up on the login page, and the information now comes from the store.

## Stores in the developer tools

According to the Vue documentation, Pinia connects to the Vue DevTools, with a timeline of the changes and a view into the stores that a component uses. The id of a store is its name in the developer tools. A create-vue project comes with the Vue DevTools as a Vite plugin, and its button appears at the bottom of the page while `npm run dev` is running.

## Testing stores

A store can be tested without a component. According to the [Pinia documentation](https://pinia.vuejs.org/cookbook/testing.html), `setActivePinia(createPinia())` sets up a fresh Pinia before every test, and `useAuthStore()` then returns a fresh store.

::code{file="exercises/07-state/pinia/solution/{lang}/tests/level-2.test.js" lines="13-19"}

For components there's `createTestingPinia` from the package `@pinia/testing`. It replaces every action with a spy that only records its calls, and it takes the state a test should start from. With Vitest without global functions, it needs `createSpy: vi.fn` for that.

::code{file="exercises/07-state/pinia/solution/{lang}/tests/level-2.test.js" lines="55-66"}

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the first example, take `count` out of the `return` of the store. What does the header show now?
2. In the example with `storeToRefs`, click "Favorite" several times. Which number stays where it was, and why?
3. In the example with the two stores, sign in as M-117, request two things, then sign out and sign in as M-204. What does "My requests" show?
4. In the example with the guard, move the line `const auth = useAuthStore()` to the top of the module, before `createRouter`. What happens on start?

## Exercises

The exercises build the two stores from the assignment. You'll find the project in the course repo in the folder `exercises/07-state/pinia/en`. The login still lives there as a module in `src/auth.js`, as in part 6. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Turn `src/auth.js` into the store `useAuthStore` with the id `auth` in `src/stores/auth.js`. It has the state `member`, the getter `isTeam` and the actions `signIn(number)` and `signOut()`. `signIn` returns `true` when the number is known. The header, the login page and the guard use the store, and then you delete `src/auth.js`.

:::solution[Solution]
::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/auth.js"}

::code{file="exercises/07-state/pinia/solution/{lang}/src/router/index.js" lines="19-25"}

With the line `useRequestsStore().$reset()`, the solution already contains the challenge. In the header, `storeToRefs(auth)` takes the store apart, and the action `signOut` is called through `auth.signOut()`.
:::
::::

::::exercise[Going further]
Create the store `useRequestsStore` with the id `requests` in `src/stores/requests.js`. It has the state `list`, the getter `mine` with the requests of the signed-in member and the action `add(itemId)`. Without a login, `add` accepts nothing, and every member requests a thing at most once. The "Request" button on the page of a thing calls `add`, and the header shows the number of the own requests.

:::solution[Solution]
::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/requests.js"}

The store asks the store of the login inside its function. On the page of a thing, a computed value with `requests.mine` shows whether the thing has been requested already, and the button then reads "Requested".
:::
::::

::::exercise[Challenge]
At the counter, several members sign in one after the other. Give the store of the requests an action `$reset` that empties the list, and call it on signing out.

:::solution[Solution]
::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/requests.js" lines="17-20"}

::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/auth.js" lines="21-25"}

An option store gets `$reset` from Pinia, while a setup store needs an action of its own with that name, according to the documentation. The two stores import each other. That works because each one calls the other store only inside its functions.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The console reports that there is no active Pinia. | `app.use(createPinia())` is missing in `main.js`, or a module calls the store while it loads. Call the store only inside a function. |
| A value from the store stays put in the component. | The store was taken apart directly. Use `storeToRefs`, or read through the store, such as `auth.member`. |
| A value doesn't show up in the developer tools. | The setup store doesn't return it. Return all of the state. |
| `store.$reset()` reports an error. | Setup stores have no `$reset` of their own. Write an action with that name. |
| An AI assistant writes a store with `new Vuex.Store`. | That's Vuex for older apps. New apps use Pinia with `defineStore`. |

## Self-check

::::selfcheck
1. What becomes state, what becomes a getter and what becomes an action in a setup store?
2. Why does a store that was taken apart directly lose the connection, and what helps?
3. Where does a navigation guard call its store, and why?
4. What does `createTestingPinia` do with the actions of a store?

:::solution[Answers]
1. Refs become state, computed values become getters and functions become actions.
2. The store is a reactive object, and taking it apart creates copies of the values. `storeToRefs` creates refs that stay connected to the store.
3. Inside its function. By then Pinia is installed for sure, while at the top of the module it might not be yet.
4. It replaces them with spies that only record their calls, unless `stubActions: false` is set.
:::
::::

:::assignment
The login and the requests have their stores, and at the counter nothing is left behind after signing out. For now, though, the requests only live in the browser's memory, and the login knows two members from the code. The team wants to see the requests, and the catalog should come from the association's server. That's what the next chapter is about.
:::
