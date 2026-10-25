---
title: Lazy loading and 404
description: A route for unknown addresses, params with regular expressions, loading routes on demand, the scroll position and the title and focus after every navigation.
sidebar:
  order: 5
---

:::assignment
The volunteer has found two problems, and Martina Hostettler turns them into an assignment.

> As a member, I want a hint and a way back when I open a wrong address, so that I'm not left with an empty page.

The acceptance criteria are:

1. An address without a page shows "Page not found" with a link to the catalog.
2. The code for the team area only loads when someone opens the area.
3. After every change of page, the title of the tab is right, and the focus is on the heading of the new page.
:::

:::goals
After this chapter you can

- define a route for all unknown addresses,
- restrict a param with a regular expression,
- load routes on demand and spot the result in the build,
- control the scroll position with `scrollBehavior`,
- set the title and the focus after a navigation.
:::

## A page for unknown addresses

If no route matches an address, `RouterView` shows nothing, and Vue Router reports `No match found for location with path` in the console. The [documentation](https://router.vuejs.org/guide/essentials/dynamic-matching.html) catches such addresses with a route whose param has a regular expression of its own.

::playground{dir="examples/06-routing/not-found"}

`(.*)` matches any text, even across several segments of the address. The asterisk after it makes the param optional and repeatable, and `route.params.pathMatch` contains the segments as an array, which for `/club-night/2026` is `["club-night", "2026"]`. The route can go anywhere in the list, because according to the [documentation](https://router.vuejs.org/guide/essentials/route-matching-syntax.html) the order of the routes doesn't matter.

The same mechanism restricts a param. `/items/:id(\\d+)` only matches digits, and `/items/abc` ends up on the page for unknown addresses. The double backslashes are needed because the path sits in a JavaScript string. Only the page itself can detect a number without a thing, because the router doesn't know the list of things.

## Loading routes on demand

An `import` at the top of a file loads a component when the app starts. If a route uses a function with `import()` instead, the router only loads the component on the first visit and keeps it after that. The [documentation](https://router.vuejs.org/guide/advanced/lazy-loading.html) recommends this for all routes.

```js
{
  path: '/team',
  // The code of the team area loads only when someone opens it
  component: () => import('@/views/TeamView.vue'),
},
```

During the build, Vite puts every component loaded this way into a file of its own. In the exercise project, `npm run build` then shows an extra line for the team area, shortened roughly like this.

```text
dist/index.html                    0.40 kB
dist/assets/index-tJDboEPA.css     1.02 kB
dist/assets/TeamView-toIM6wF9.js   0.27 kB
dist/assets/index-Di6fJri9.js     95.09 kB
```

The characters after the hyphen and the sizes will look different for you. In the Network tab of the developer tools, the file only shows up when you open the area. The playground loads all files of an example at once, so the difference doesn't show there. The running case app loads the team area on demand. The other pages are small, and nearly all of them belong to the first visit anyway.

## The scroll position

When the page changes, the browser leaves the scroll position where it was, because it doesn't load a new page. The `scrollBehavior` option of the router decides where to go after a navigation.

::playground{dir="examples/06-routing/scroll-behavior"}

In the example, the page of a thing starts at the top, even if you clicked far down in the list. According to the [documentation](https://router.vuejs.org/guide/advanced/scroll-behavior.html), `savedPosition` only exists for back and forward in the history of the browser. Then a page returns to its old spot, and every other page starts at the top. The memory history of the playground keeps no positions, so you try the back button with the saved position in the running case app.

## Title and focus after navigation

`router.afterEach` runs after every navigation and can no longer stop it. The app uses it to set the title of the tab from a `title` field in `meta`. A third argument reports a navigation that was cancelled or led to the current page, and then the app changes nothing.

::playground{dir="examples/06-routing/title-and-focus"}

In an SPA, the browser doesn't load a new page, and a screen reader doesn't notice the change by itself. In a [user study by Gatsby](https://v2.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing) with people with disabilities, the focus on the heading of the new page did best. For this, the heading gets `tabindex="-1"`, so that it can take the focus without showing up in the order of the Tab key. The focus is set after `await nextTick()`, because `afterEach` runs before Vue renders the new page. On the first load, `from` is `START_LOCATION`, and the focus stays where the browser has it.

The running case app first checks whether the new page has already put the focus into `main` itself. The catalog does that with its search field from chapter 5.3 and keeps it. The page of a thing sets its own title, because only that page knows the name of the thing. Chapter 8.5 comes back to further techniques, such as a live region that announces the title of the new page.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the first example, remove the route for unknown addresses and click "An old link". What does the console report, and what does the page show?
2. In the same example, change the link to `/club-night`. What does `pathMatch` contain now?
3. In the example with the long list, scroll down and open a thing. Then remove `scrollBehavior` and do it again. Where does the page of the thing start?
4. In the example on title and focus, remove the line with `await nextTick()`. Where is the focus after a change of page?

## Exercises

The exercises build the points from the assignment. You'll find the project in the course repo in the folder `exercises/06-routing/lazy-404/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Add a route for all unknown addresses with the name `not-found`. It shows `NotFoundView` and has the title "Page not found" in its `meta` field. After that, `/items/abc` ends up there as well.

:::solution[Solution]
::code{file="exercises/06-routing/lazy-404/solution/{lang}/src/router/index.js" lines="26-27"}

The route for a thing already has `(\\d+)` and only matches digits. For `/items/abc`, only the route for unknown addresses is left.
:::
::::

::::exercise[Going further]
Load `TeamView` only when someone opens the area. Then check with `npm run build` whether a file of its own appears for the area.

:::solution[Solution]
::code{file="exercises/06-routing/lazy-404/solution/{lang}/src/router/index.js" lines="19-25"}

The `import` of `TeamView` at the top of the file goes away, otherwise the component would land in the first bundle despite the function. After the first visit, the router replaces the function with the loaded component.
:::
::::

::::exercise[Challenge]
After every navigation, set the title of the tab to the title from `meta` followed by " · Lorraine Commons". Also set the focus on the `h1` heading of the new page, but not on the first load. For this, the headings need `tabindex="-1"`.

:::solution[Solution]
::code{file="exercises/06-routing/lazy-404/solution/{lang}/src/router/index.js" lines="31-41"}

`START_LOCATION` comes from `vue-router`, and `nextTick` comes from `vue`. All pages now have their heading as `<h1 tabindex="-1">`.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| Vue Router reports `Catch all routes ("*") must now be defined using a param with a custom regexp.` | `path: '*'` comes from Vue Router 3. The route is now `/:pathMatch(.*)*`. |
| A route loads its component with `defineAsyncComponent`. | According to the documentation, a route takes a plain function with `import()`, not an async component. |
| After a change of page, the focus lands nowhere. | The heading needs `tabindex="-1"`, and the focus waits for the new page with `nextTick`. |
| After the back button, the list is at the top instead of its old spot. | `scrollBehavior` returns `savedPosition` when there is one. |

## Self-check

::::selfcheck
1. What does `route.params.pathMatch` contain for the address `/club-night/2026`?
2. What changes in the build when a route loads its component with `import()`?
3. When does `scrollBehavior` get a saved position?
4. Why does the app set the focus after a navigation but not on the first load?

:::solution[Answers]
1. The array `["club-night", "2026"]`, with one entry for each segment of the address.
2. Vite puts the component into a file of its own, which the browser only loads on the first visit to the route.
3. Only for back and forward in the browser.
4. On the first load, the browser starts at the top of the new page, as with any website. On a change inside the SPA, no page loads, and without the focus a screen reader doesn't notice the change.
:::
::::

:::assignment
The app has pages, addresses to share and an area for the team. Its data still lives in the browser, though. Only someone working in the same browser sees a return at the counter, and after a reload it's gone. Part 7 fetches the data from the server of the association and keeps shared state with Pinia. Before that, check with the [competence grid](../competences/) whether you're ready for part 7.
:::
