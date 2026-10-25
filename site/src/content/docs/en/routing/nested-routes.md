---
title: Nested routes and layouts
description: Child routes with children, a layout with a RouterView of its own, the empty child route as the start page of an area, active and exactly active links and named views.
sidebar:
  order: 3
---

:::assignment
The team at the counter needs an area of its own in the app.

> As a volunteer at the counter, I want to find the loans and the returns under a shared address, so that I can switch between the two quickly.

The acceptance criteria are:

1. `/team` lists the things that are on loan, with the next return first.
2. At `/team/returns`, the team records a return, and the catalog then shows the thing as available.
3. Both pages share a heading and a navigation that shows where you are.
:::

:::goals
After this chapter you can

- define child routes with `children`,
- build a layout with a `RouterView` of its own,
- use a child route with an empty path as the start page of an area,
- tell active links from exactly active links,
- spread several components over one route with named views.
:::

## Child routes

A route can have child routes. They go into `children`, and their paths are appended to the path of the parent route, so `returns` under `/team` becomes `/team/returns`. The component of the parent route appears in the `RouterView` of `App`. The component of the child route appears in a second `RouterView` inside the parent component.

::playground{dir="examples/06-routing/nested-routes"}

The child route with the empty path `''` belongs to the address `/team` itself and is the start page of the area. Without it, `/team` would only show the heading and an empty space. According to the [documentation](https://router.vuejs.org/guide/essentials/nested-routes.html), a child path that starts with `/` would count from the root, which is why child paths have no leading slash.

## Layouts

The parent component of an area is its layout. `TeamLayout` has the heading and the navigation that all pages of the team share, plus a `RouterView` for the page that's currently showing. When someone switches from the loans to the returns, the layout stays in place, and only the content inside it changes.

![The routes of the case app as a tree. At the top App with its RouterView, below it the routes / with CatalogView, /items/:id with ItemView, /favorites with FavoritesView, /association with AssociationView, /login with LoginView, /team with TeamLayout and the catch-all route with NotFoundView. TeamLayout has a RouterView of its own with the child routes for the loans and the returns. Next to /team a note says that the area is for the team only and loads on demand, next to the catch-all route that it catches all other addresses.](../../../../assets/figures/en/p6c3-route-tree.svg)

The figure shows all routes of the running case app after this part. The dashed boxes only load on demand, and the team area needs a login. Both come in the next two chapters.

## Active and exactly active links

In the example, the "Team" link in the header is bold on both pages of the area. It's active because the current route lies below its route. The "Loans" link points to the empty child route and therefore counts as active on all pages of the area. Only the link to the page that's currently open is exactly active, and only that link gets `router-link-exact-active` and `aria-current="page"`. The navigation in the header therefore styles `router-link-active`, and the navigation of the area styles `router-link-exact-active`.

## Named views

A page can have more than one place for components, such as a column next to the content. A `RouterView` with a name is such a second place. A route fills it with `components` instead of `component`, an object with a component for each name and `default` for the `RouterView` without a name.

::playground{dir="examples/06-routing/named-views"}

In the catalog, the column stays empty, because its route has nothing for it. Named views pay off when several routes fill the same page with different parts. The running case app doesn't need any, but the challenge shows them in use once.

## Data for the pages of the router

Up to part 5, `App` passed the pages their data as props. Now the router shows the pages, and `App` no longer has them in its template. In the running case app, `App` therefore provides the catalog, the favorites and the signed-in member with `provide`, like the member in chapter 4.5, and every page takes what it needs with `inject`. The catalog comes with the function `markReturned`, with which the page for returns marks a thing as available. Until part 7 this only holds in your own browser. Then every return goes to the server of the association, and Pinia holds the shared state.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the example with the child routes, open the returns. Which links are bold, which are underlined, and why?
2. Remove `RouterView` from `TeamLayout`. What does `/team` show now?
3. Write the path of the returns as `/returns` and adjust the link in the layout. At which address do the returns appear, and does the layout still appear?
4. In the example with the named views, open the catalog and the team in turn. What happens to the column?

## Exercises

The exercises build the team area from the assignment. You'll find the project in the course repo in the folder `exercises/06-routing/nested-routes/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Turn the flat page `TeamView` into the layout `TeamLayout` with the heading "Team at the counter" and a `RouterView`. Move the list of loans and its heading into `TeamLoansView`. In `src/router/index.js`, `/team` gets the layout as its component and a child route with an empty path and the name `team-loans`.

:::solution[Solution]
::code{file="exercises/06-routing/nested-routes/solution/{lang}/src/router/index.js" lines="13-22"}

The solution already contains the second child route and the column from the challenge. For getting started, the route has `component: TeamLayout` and only the child route with the empty path. `TeamLayout` holds the heading and a `RouterView`, and `TeamLoansView` holds the list.
:::
::::

::::exercise[Going further]
Add the child route `returns` with the name `team-returns` for `TeamReturnsView`, and a navigation `<nav class="team-nav">` in the layout with links to "Loans" and "Returns". The link to the current page of the area is bold.

:::solution[Solution]
::code{file="exercises/06-routing/nested-routes/solution/{lang}/src/views/TeamLayout.vue"}

The selector checks `aria-current`, which only the exactly active link has. With `router-link-active`, the link to the loans would be bold on the returns as well, because it points to the empty child route.
:::
::::

::::exercise[Challenge]
`TeamHints` should sit in a column of its own next to all pages of the team, but not next to the catalog. Add a `RouterView` named `aside` to `App.vue`, and give the route `/team` the hints as a second component.

:::solution[Solution]
::code{file="exercises/06-routing/nested-routes/solution/{lang}/src/App.vue" lines="13-19"}

In the route, `components: { default: TeamLayout, aside: TeamHints }` replaces the single component. The child routes inherit the column, because it belongs to the parent route. The route of the catalog has no component for `aside`, and the named `RouterView` stays empty there.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A child route only shows the layout. | The layout is missing `<RouterView />`. |
| At `/team`, the place for the page stays empty. | A child route with the empty path `''` shows the start page of the area. |
| A child page sits at `/returns` instead of `/team/returns`. | Write the child path without a leading `/`, otherwise it counts from the root. |
| The link to the start page of the area stays highlighted on every page. | Style `router-link-exact-active` or `aria-current` in the navigation of the area. |
| An AI assistant switches the pages of the area with `v-if` and a variable. | With child routes, every page has an address of its own that people can share and reload. |

## Self-check

::::selfcheck
1. Where does the component of a child route appear?
2. What is a child route with an empty path for?
3. How do `router-link-active` and `router-link-exact-active` differ?
4. Where do the pages of the router in the running case app get their data from?

:::solution[Answers]
1. In the `RouterView` of the parent component, which is the layout of the area.
2. It shows the start page of the area at the address of the parent route itself.
3. A link is also active when the current route lies below its route. Only the link to the current page is exactly active, and only that link gets `aria-current="page"`.
4. `App` provides the catalog, the favorites and the member with `provide`, and every page takes them with `inject`.
:::
::::

:::assignment
The team area is in place. Martina Hostettler still gets in touch. "Right now any member can open the area. And yesterday a member lost a half-filled form by clicking a link." Navigation guards cover both, and they come in the next chapter.
:::
