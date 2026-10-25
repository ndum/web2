---
title: Vue Router
description: Defining routes with Vue Router, showing pages with RouterView and linking them with RouterLink, named routes, active links, the kinds of history and the fallback address on the server and on GitHub Pages.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler wants the app to show more than the catalog.

> As a member, I want to find the favorites and the information about the association on pages of their own, so that I can open them directly and send them to another member.

The volunteer adds that the hand-written routes from part 2 get more awkward with every page. The acceptance criteria are:

1. The catalog, the favorites and the association each have an address of their own without a hash, such as `/favorites`.
2. A navigation in the header leads to all three pages and shows which page you are on.
3. An address that someone opens directly or reloads shows the right page.
:::

:::goals
After this chapter you can

- set up an app with Vue Router and a list of routes,
- show pages with `RouterView` and link them with `RouterLink`,
- name routes and link to them by name,
- style active links with classes and `aria-current`,
- tell history mode from hash mode,
- explain why the server has to deliver `index.html` for every address in history mode.
:::

## Routes instead of a hash

In part 2 you built the routing by hand. The app listened to `hashchange`, took the address apart with `parseRoute` and decided with one condition per page what to show. [Vue Router](https://router.vuejs.org/) takes over this work. You describe each route with a path and a component, and the router shows the matching component in the place of `RouterView`. `RouterLink` renders an ordinary link whose click the router intercepts, so the browser doesn't reload the page.

::playground{dir="examples/06-routing/router-start"}

`createRouter` gets the routes and a history, which decides how the router reads and writes the address. In the playground that's `createMemoryHistory`, because the preview has no address bar, so the example shows the address in a paragraph. `main.js` installs the router in the app with `use`. Only after that do all components know `RouterView`, `RouterLink` and `useRoute`.

A create-vue project with the router option already has these parts. The router lives in `src/router/index.js`, and the pages live in `src/views`.

```js
import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: CatalogView }],
})

export default router
```

## Links and active links

`RouterLink` renders an `a` element with a real `href`. A click changes the page without a reload, and a click with the key for a new tab still works, because the link has a proper address. The link to the current route gets the classes `router-link-active` and `router-link-exact-active`. The exactly matching link also gets `aria-current="page"`, and a screen reader announces it as the current page.

::playground{dir="examples/06-routing/active-links"}

According to the [documentation](https://router.vuejs.org/guide/essentials/active-links.html), a link is active when it points to the same route record as the current address and has the same params. The query doesn't count. For styling, the selector `[aria-current='page']` works well, because it describes the same information that a screen reader gets. The chapter [Nested routes and layouts](../nested-routes/) shows the difference between active and exactly active.

## Named routes

A route can have a name. A link with `:to="{ name: 'favorites' }"` looks up the route by that name and builds the address itself. If a path changes later, all links stay as they are.

::playground{dir="examples/06-routing/named-routes"}

In the next chapter, routes carry params such as the number of a thing. The router then also puts the address together from the name and the params, and no link contains glued-together text like `'/items/' + id` anymore.

## History and hash

Vue Router knows three ways of keeping the address. `createWebHistory` writes addresses like `/favorites` with the browser's History API, and the [documentation](https://router.vuejs.org/guide/essentials/history-mode.html) recommends this mode. `createWebHashHistory` puts everything behind a hash, `/#/favorites`, like the routes from part 2. According to the documentation, this mode needs no setup on the server but is worse for search engines. `createMemoryHistory` keeps the address in memory only, for tests and for the playground.

In history mode, an address that someone opens directly or reloads goes to the server. There is no file called `favorites` there, and without help the server answers with 404. The documentation therefore asks for a fallback rule that delivers `index.html` for every unknown address. The app then starts, and the router shows the page for the address. The Vite development server does this by itself, because its [`appType` option](https://vite.dev/config/shared-options.html#apptype) is set to `spa`.

GitHub Pages has no such rule. It does show the file `404.html` for pages that don't exist, though, if a project has one ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)). A copy of `index.html` under that name starts the app there as well. Chapter 8.6 shows how this happens during the build and the deployment.

`createWebHistory(import.meta.env.BASE_URL)` takes the base path from the `base` setting of Vite. For a project site on GitHub Pages, that's the name of the repo according to [Vite](https://vite.dev/guide/static-deploy.html#github-pages), such as `/lorraine-commons/`. The relative path `./` from part 2 no longer works in history mode. At `/items/6`, the browser would look for the files of the app below `/items/`. From this part on, the running case app therefore builds with the absolute path `/`.

:::deepdive[File-based routing]
Since version 5, Vue Router can generate the routes from the files of a folder. The `VueRouter` plugin from `vue-router/vite` goes into `vite.config.js` before `vue()`, the pages live in `src/pages`, and the finished routes come from `vue-router/auto-routes`.

```js
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
```

The names of the files determine the paths. `index.vue` stands for the empty path, `[id].vue` for a param and `[...path].vue` for all remaining addresses, and a file next to a folder with the same name becomes the parent route of the pages inside it ([documentation](https://router.vuejs.org/file-based-routing/file-based-routing.html)). This course writes the routes by hand. That way all routes sit in one file, and you see what the router makes of each one.
:::

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. Add a third page for the favorites to the first example. Which files do you change or add?
2. In the example with the active links, look at the classes and attributes of the links in the developer tools while you change the page.
3. In the same example, add a link to `/favorites?sort=deposit`. Is it active when the favorites are open?
4. In the example with the named routes, change the path of the favorites to `/saved`. What does the address show, and do you have to change a link?

## Exercises

The exercises build the pages from the assignment. You'll find the project in the course repo in the folder `exercises/06-routing/router/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Create `src/router/index.js`. The router uses `createWebHistory(import.meta.env.BASE_URL)` and the routes `/` for `CatalogView` and `/association` for `AssociationView`. Install it in `src/main.js` with `app.use(router)`, and replace the component `CatalogView` in `App.vue` with `RouterView`.

:::solution[Solution]
::code{file="exercises/06-routing/router/solution/{lang}/src/router/index.js"}

The solution already contains the route and the names from the next exercises. For getting started, the routes for `/` and `/association` are enough. Afterwards `src/main.js` looks like the one in a create-vue project.

::code{file="exercises/06-routing/router/solution/{lang}/src/main.js"}
:::
::::

::::exercise[Going further]
Add the route `/favorites` for `FavoritesView` and, in `App.vue`, a `<nav>` with a `RouterLink` each to the catalog, the favorites and the association, in this order. The link to the current page stands out in bold.

:::solution[Solution]
::code{file="exercises/06-routing/router/solution/{lang}/src/App.vue" lines="5-18"}

::code{file="exercises/06-routing/router/solution/{lang}/src/App.vue" lines="42-46"}

The links already use the names from the challenge. For going further, `to="/favorites"` is enough. The selector checks `aria-current`, which `RouterLink` sets by itself on the link to the current page.
:::
::::

::::exercise[Challenge]
Give the routes the names `catalog`, `favorites` and `association`, and link only by name in `App.vue`. Add a link "Back to the catalog" to `AssociationView`, also with the name of the route.

:::solution[Solution]
::code{file="exercises/06-routing/router/solution/{lang}/src/router/index.js" lines="10-14"}

::code{file="exercises/06-routing/router/solution/{lang}/src/views/AssociationView.vue"}

From the name, the router builds the same address `/` that was in the link before. A path of a route now only changes in one place.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The console reports `injection "Symbol(router)" not found`. | `app.use(router)` is missing in `main.js`. |
| A page stays empty, and the console reports `No match found for location with path`. | There is no route for the address. Check the path in the list. A route for all unknown addresses comes in chapter 6.5. |
| A link with `<a href="/favorites">` reloads the whole page. | Use `RouterLink`. It intercepts the click and changes the page without a reload. |
| After a reload of a page, the server reports 404. | The server has to deliver `index.html` for unknown paths. On GitHub Pages, a copy named `404.html` helps. |
| At an address like `/items/6`, the styles and the script of the app are missing. | The base path is relative. In history mode, set `base` to an absolute path. |
| An AI assistant writes `new VueRouter({ mode: 'history' })` or `<router-link tag="li">`. | That's Vue Router 3 for Vue 2. Since version 4, `createRouter` creates the router with `history: createWebHistory()`, and the `tag` attribute no longer exists. |

## Self-check

::::selfcheck
1. What do `RouterView` and `RouterLink` do?
2. Why is it better for the app to link by name than by path?
3. How does a screen reader recognize the link to the current page?
4. Why does history mode need help from the server while hash mode doesn't?

:::solution[Answers]
1. `RouterView` shows the component of the current route. `RouterLink` renders a link with which the router changes the page without a reload.
2. A path then only appears in the list of routes. If it changes, all links stay valid.
3. By the attribute `aria-current="page"`, which `RouterLink` sets on the exactly matching link.
4. In history mode, the whole address goes to the server, which has to deliver `index.html` for it. The part after the hash never reaches the server.
:::
::::

:::assignment
The app now has pages with addresses of their own. While trying it out, Martina Hostettler already has the next question. "Can I send a member a link to the drill? And one to all the saws among the tools?" For that, the address needs params and a query, which come in the next chapter.
:::
