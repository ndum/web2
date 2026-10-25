---
title: Competence grid for part 6
description: What you can do after part 6 and how to check it yourself, plus the state of the app after part 6.
sidebar:
  label: Competence grid
  order: 6
---

Use this grid to judge whether you are ready for part 7. Read each row and solve the check task next to it without looking anything up. If it feels easy, you have reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check task | Look it up |
|---|---|---|
| set up an app with Vue Router | Set up two routes in a new project and show them with `RouterView`. | [Vue Router](../vue-router/#routes-instead-of-a-hash) |
| link pages with `RouterLink` and style active links | Highlight the link to the current page in a navigation with the selector for `aria-current`. | [Vue Router](../vue-router/#links-and-active-links) |
| name routes and link to them by name | Change the path of a named route without touching a link. | [Vue Router](../vue-router/#named-routes) |
| tell history mode from hash mode | Explain why a server can answer with 404 after a reload of `/favorites` and what helps. | [Vue Router](../vue-router/#history-and-hash) |
| define routes with params | Create a route for a thing with its number and link to it by name. | [Params and query](../params-and-query/#routes-with-params) |
| pass params as props | Give a component the number from the address as a number. | [Params and query](../params-and-query/#params-as-props) |
| react to new params in the same component | Explain why `setup` doesn't run again on the change from `/items/1` to `/items/2`. | [Params and query](../params-and-query/#same-component-new-params) |
| read and write the query | Bind a search field to `q` in the query without adding an entry to the history for every letter. | [Params and query](../params-and-query/#the-query) |
| navigate in code | Go to the page of a thing with `router.push` after a form has been sent. | [Params and query](../params-and-query/#navigating-in-code) |
| build child routes and layouts | Build an area with two child pages and a shared heading. | [Nested routes and layouts](../nested-routes/#child-routes) |
| tell active from exactly active links | Explain why the link to the start page of an area is active on all of its pages. | [Nested routes and layouts](../nested-routes/#active-and-exactly-active-links) |
| use named views | Show a second component next to a page in a named `RouterView`. | [Nested routes and layouts](../nested-routes/#named-views) |
| write a global guard with `meta` | Send everyone without a login from flagged routes to the login page. | [Navigation guards](../navigation-guards/#global-guards-with-beforeeach) |
| lead back to the target safely after the login | Explain why the login checks the target from the address. | [Navigation guards](../navigation-guards/#back-to-the-target) |
| warn before someone leaves a page | Ask before someone leaves a half-filled form. | [Navigation guards](../navigation-guards/#warning-before-leaving) |
| name the limits of a guard | Explain why a guard in the browser protects no data. | [Navigation guards](../navigation-guards/#the-login-as-a-stand-in) |
| create a page for unknown addresses | Create a route that catches every unknown address, even across several segments. | [Lazy loading and 404](../lazy-loading-and-404/#a-page-for-unknown-addresses) |
| load routes on demand | Load a page only on its first visit and point out its own file in the build. | [Lazy loading and 404](../lazy-loading-and-404/#loading-routes-on-demand) |
| set the title and the focus after a navigation | After every change, set the title of the tab and the focus on the heading. | [Lazy loading and 404](../lazy-loading-and-404/#title-and-focus-after-navigation) |

For part 7 you mainly need `provide` and `inject`, composables and asynchronous JavaScript from part 1, because there the data comes from the server and the shared state moves into a store.

## The app after part 6

What Martina Hostettler's assignments in this part added up to is in the course repo in the folder `case/06-routing/en`. Vue Router shows the pages for the catalog, the things, the favorites and the association, and search, category and sort order are part of the address. The team at the counter signs in with the member number and records returns in an area of its own, which only loads on demand. Unknown addresses get a page of their own, and after every change the title and the focus are right. The tests in the folder `tests` check the wishes from this part.

```bash
npm install
npm test
```

For the app, start the small server in one terminal and Vite in a second one, as before. The app now fetches the catalog from `/api/items`.

```bash
npm run server
npm run dev
```

If you didn't finish everything in part 6, start part 7 from this state.
