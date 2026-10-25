---
title: Project structure and layers
description: Folders by kind or by feature, the layers of an SPA from the app down to the API, dependencies that point one way, shared code, an interface per feature and rules that a test checks.
sidebar:
  order: 1
---

:::assignment
A second volunteer has started helping with the app. After a week she writes to Martina Hostettler that she can't find her way around.

> As a new volunteer, I want to find everything about one function of the app in one place, so that I can change the requests without knowing the whole app.

The volunteer agrees with her. The files of the requests sit in four folders, and the addresses of the course API are spread across the stores. The acceptance criteria are:

1. Everything that belongs to a feature lives in one folder.
2. Only one layer knows the addresses of the API and calls `fetch`.
3. A test reports when someone breaks one of these rules.
:::

:::goals
After this chapter you can

- compare folders by kind with folders by feature,
- name the layers of an SPA and make their dependencies point one way,
- keep shared code apart from the features,
- give a feature an interface,
- check the rules of the structure with a test.
:::

## Folders by kind

create-vue sets up a project with folders by the kind of file, `components`, `views` for the pages, `router` and, with Pinia, `stores`. In a small app you find every file quickly that way. But every folder grows with every function, and things that belong together end up spread out. In the running case app after part 7, the page "My requests" sits in `views`, the form in `components`, the store in `stores` and the rules of a request in `src/reservation.js`.

## Folders by feature

A feature is a function that members also recognize as part of the app, such as the catalog, the favorites or the requests. Every feature gets a folder in `src/features` with its pages, its own components, its store and its routes. Whoever works on the requests finds almost everything in `src/features/reservations`.

![Two folder trees side by side. On the left the app is sorted by the kind of file, in views, components, stores and composables, and the four files of the requests sit in four different folders. On the right every feature has a folder below features, catalog and reservations with their pages, components, stores and routes. The files of the requests sit together there. Shared building blocks live in components, the layer for the API in api.](../../../../assets/figures/en/p8c1-folders.svg)

Both ways are common, and folders by kind are enough for an app with a few pages. Folders by feature pay off once several people work on different functions or a function has many files. Switching is a decision of the kind that chapter 8.3 records.

## Layers

Besides its folders, an SPA has layers that take on different jobs. At the top, `main.js`, `App.vue` and the router put the app together. Below them are the features with pages, components and stores. They use shared building blocks and the layer for the API, and only that layer talks to the server.

![Four levels from top to bottom, the arrows show who imports whom. At the top, main.js, App.vue and the router put the app together and import the features. The features hold pages, their own components and stores, and they import shared building blocks and the layer for the API. Shared building blocks in components, composables and utils know no feature. Only the layer for the API in src/api talks to the server with fetch. No arrow points upwards.](../../../../assets/figures/en/p8c1-layers.svg)

Imports only point down. A shared building block like the card of a thing knows no feature, and the layer for the API knows neither pages nor stores. That way every lower layer can change or be tested without knowing the ones above it.

## The layer for the API

In the running case app after part 8, only `src/api/http.js` knows the addresses and methods of the course API. The stores call functions like `loadItems()` and don't know that `GET /items` is behind it.

::code{file="case/08-architecture/{lang}/src/api/http.js" lines="30-40"}

If the API renames an address, one line in this file changes and no store notices. The next chapter shows how the stores get hold of this layer.

## Shared code

Whatever only one feature needs lives in that feature's folder. As soon as a second feature needs the same thing, it moves to the shared building blocks. In the running case app, the catalog and the favorites show the same card, so `ItemCard.vue` lives in `src/components`, the composable `useLocalStorage` in `src/composables` and the formatting of dates and amounts in `src/utils`. The header and the footer belong to the frame of the app and live in `src/layout`, because they read the stores of several features.

## An interface per feature

Each feature decides in an `index.js` what others may use from it. The page of a thing belongs to the catalog and shows the request form, so the feature of the requests exposes the form, its store and the key for drafts.

::code{file="case/08-architecture/{lang}/src/features/reservations/index.js"}

Each feature brings its routes in a `routes.js`, and the router puts them together.

::code{file="case/08-architecture/{lang}/src/router/index.js" lines="20-31"}

When a file inside a feature changes, only the other files in it are affected, as long as the `index.js` stays the same.

## Checking the rules

A rule that only lives in people's heads breaks with the first change made under time pressure. So a test reads the sources of the running case app and checks the rules of the structure.

::code{file="case/08-architecture/{lang}/tests/architecture.test.js" lines="24-34"}

The test needs no browser, it reads the files with `node:fs`. If someone breaks a rule, the test names the file.

## In your project

Decide on the folders of your project before the first page exists, by kind or by feature, and record the decision in your README. Let only one layer talk to the server from the start, and a switch to another data source stays small.

## In code

Work with the running case app after part 8 in the folder `case/08-architecture/en` of the course repo. Read first and write down what you expect before you change anything.

1. Count the folders that hold the files of the requests now. Where were they in `case/07-state/en`?
2. Add a call `fetch('/api/en/items')` to `src/features/catalog/CatalogView.vue` and run the tests. Which test speaks up, and what does it name?
3. In `src/features/catalog/ItemView.vue`, import the store from `@/features/reservations/reservationsStore.js` instead of `@/features/reservations`. What does the test report now?
4. The course API renames `/reservations` to `/requests`. Which files do you have to change?

## Exercises

The exercises sort a small app with a catalog and favorites by feature. You'll find the project in the folder `exercises/08-architecture/structure/en` of the course repo. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Sort the files by feature. `CatalogView.vue` goes to `src/features/catalog`, `FavoritesView.vue` and the favorites store as `favoritesStore.js` go to `src/features/favorites`. `AppHeader.vue` and `ItemCard.vue` stay in `src/components`, and the folders `src/views` and `src/stores` disappear. Adjust the imports in the router and the header.

:::solution[Solution]
```text
src/
  components/AppHeader.vue, ItemCard.vue
  features/catalog/CatalogView.vue
  features/favorites/FavoritesView.vue, favoritesStore.js
  router/index.js
```

The solution in the course repo already contains going further and the challenge, so its router reads the routes of the features.
:::
::::

::::exercise[Going further]
Both pages load the catalog themselves with `fetch`. Create the layer for the API in `src/api/items.js` with a function `fetchItems()`, and a store `useCatalogStore` in `src/features/catalog/catalogStore.js` that loads the catalog with it, only once for both pages. Outside of `src/api`, nobody calls `fetch` anymore.

:::solution[Solution]
::code{file="exercises/08-architecture/structure/solution/{lang}/src/api/items.js"}

::code{file="exercises/08-architecture/structure/solution/{lang}/src/features/catalog/catalogStore.js"}

The action `load` returns right away when the catalog is already loading or there. The favorites page calls it anyway, in case someone opens that page directly.
:::
::::

::::exercise[Challenge]
Give both features an `index.js` through which others get their store, and a `routes.js` with their routes. The router puts the routes together, and no feature reaches deeper into another one.

:::solution[Solution]
::code{file="exercises/08-architecture/structure/solution/{lang}/src/features/catalog/index.js"}

::code{file="exercises/08-architecture/structure/solution/{lang}/src/router/index.js"}

The favorites page gets the catalog through `@/features/catalog`, the header gets the favorites through `@/features/favorites`. Inside a feature, the files import each other directly with `./`.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A file fits no feature and ends up in a folder for miscellaneous things. | If it belongs to exactly one feature, it goes there. If several need it, it belongs to the shared building blocks. |
| Two features reach deep into each other's files. | Go through the `index.js` and check whether a part belongs to the shared building blocks. |
| A component in `src/components` reads a store. | It gets its data as props, and the page of the feature knows the store. |
| After moving files, imports break all over the app. | Import with the alias `@`, and reach other features only through their `index.js`. |
| An AI assistant puts every new file into `src/components`. | Tell it how the project is organized, and check where the file belongs. |

## Self-check

::::selfcheck
1. How do folders by kind differ from folders by feature?
2. Which layers does the running case app have, and which way do its imports point?
3. What is the `index.js` of a feature for?
4. Why does a test check the rules of the structure?

:::solution[Answers]
1. By kind, files of the same kind sit together, such as all pages. By feature, everything that belongs to one function sits together.
2. App and router, features, shared building blocks and the layer for the API. Imports only point down.
3. It defines what other features may use. Whatever isn't in it may change without others noticing.
4. A rule that only someone remembers breaks easily. The test reports every violation together with the file.
:::
::::

:::assignment
The new volunteer finds her way around now. Martina Hostettler wants to show the app at the general meeting, and no course API runs there. The volunteer also wants to sort by availability, and the new volunteer asks why the card of a thing knows no store. The answers come from the next chapter on design patterns.
:::
