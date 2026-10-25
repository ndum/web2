---
title: Navigation guards
description: The navigation flow, global guards with beforeEach and meta, the way back to the target after the login, beforeEnter for a single route and a warning before leaving a form.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler has written down two wishes.

> As a volunteer at the counter, I want to sign in, so that only the team sees the area for loans and returns.

> As a member, I want a warning before I leave a half-filled form, so that my input doesn't get lost.

The acceptance criteria are:

1. Anyone who isn't signed in with a team account and opens a page of the team ends up on the login page.
2. After the login, the app leads to the page that the person wanted to open.
3. Anyone who wants to leave a page with a half-filled form gets asked and can stay.
:::

:::goals
After this chapter you can

- describe the flow of a navigation with its guards,
- write a global guard with `beforeEach` and fields in `meta`,
- lead back to the original target after the login and accept only targets inside the app,
- write a guard for a single route with `beforeEnter`,
- ask before someone leaves a page with `onBeforeRouteLeave`,
- explain why a guard in the browser protects no data.
:::

## The navigation flow

Between the click on a link and the new page, the router asks a series of functions whether the navigation may go on. These functions are called navigation guards. The [documentation](https://router.vuejs.org/guide/advanced/navigation-guards.html) describes the exact order, and the figure shows the steps that this course needs.

![The flow of a navigation from top to bottom. It starts with a RouterLink or router.push. Then come onBeforeRouteLeave in the page being left, beforeEach for every navigation, beforeEnter only when a route is entered, the loading of the components and beforeResolve. After that the navigation is confirmed, afterEach runs, and the DOM shows the new page. On the right, a note says that every guard cancels the navigation with false and redirects to a new navigation with a route.](../../../../assets/figures/en/p6c4-guard-flow.svg)

A guard gets the target `to` and the previous route `from`. If it returns nothing, the navigation goes on. `false` cancels the navigation, and a route redirects to a new navigation. Older examples use a third argument, `next`. The documentation still supports it but advises against it, because it's a common source of bugs.

## Global guards with beforeEach

`router.beforeEach` runs before every navigation. Instead of a list of paths, the guard checks a field in `meta` that the route itself carries. According to the documentation, `to.meta` contains the fields of all matching routes, from the parent route down to the child route. A flag on `/team` therefore also applies to `/team/returns`.

::playground{dir="examples/06-routing/team-guard"}

Without a login, a click on "Team" leads to `/login?redirect=/team`. The guard passes the target along as `redirect` in the query, so the login page knows where to go afterwards.

## The login as a stand-in

A real login needs a server that checks passwords, and that comes in part 7. Until then, the running case app has a stand-in in `src/auth.js`. It knows two members, Martina Hostettler with the number M-117 and a team account, and member M-204 without one. Signing in only takes the member number, and the code contains no passwords. The module keeps the state itself, and the login is gone after a reload.

A guard in the browser protects no data. It makes sure that members don't end up on pages that aren't meant for them by accident. Anyone who changes the code in the browser gets past it. According to the [OWASP Top 10:2025](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/), access control only works in code on a server that an attacker can't modify. The server therefore has to protect the data of the team.

## Back to the target

After the login, the page reads the target from `route.query.redirect` and goes there with `router.replace`. `replace` fits because the login doesn't need a step of its own in the history. The value comes from the address, though, and anyone can build an address and send it around. The [OWASP cheat sheet on redirects](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) recommends accepting only addresses of your own site for such return targets. The login therefore checks that the target starts with a single `/`, and otherwise it goes to the catalog.

## Guards for a single route

A guard that belongs to only one route goes into that route as `beforeEnter`. According to the documentation, it only runs when someone enters the route, not when params, query or hash change.

::playground{dir="examples/06-routing/before-enter"}

Once you're signed in, "Sign in" takes you straight to the team area. For a guard that concerns only one route, `beforeEnter` is easier to follow than a condition in `beforeEach`. When a guard checks many routes, `beforeEach` with `meta` fits better.

## Warning before leaving

`onBeforeRouteLeave` runs before someone leaves the page that the component is on. According to the documentation, this works in any component that a `RouterView` renders, even deep inside the page, which in the running case app is the reservation form.

::playground{dir="examples/06-routing/leave-guard"}

If the field contains something, `window.confirm` asks whether to really leave the page, and on "Cancel" the guard stops the navigation with `false`. Reloading and closing the tab aren't changes of route. For those, the browser has the `beforeunload` event, which this course doesn't use any further.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the first example, click "Team" without signing in. Which address does the paragraph show, and what does the login page say?
2. Let the guard return `false` instead of the route. What happens now when you click "Team"?
3. In the example with `beforeEnter`, sign in, go back to the catalog and click "Sign in".
4. In the example with the form, write a note and click "Catalog". Answer once with "Cancel" and once with "OK".

## Exercises

The exercises build the login and the warning from the assignment. You'll find the project in the course repo in the folder `exercises/06-routing/guards/en`. The stand-in for the login is already in `src/auth.js`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Protect the team area with a global guard in `src/router/index.js`. Anyone who isn't signed in with a team account and wants to open a route with `meta.requiresTeam` ends up on the route `login`, and the query keeps the target as `redirect`.

:::solution[Solution]
::code{file="exercises/06-routing/guards/solution/{lang}/src/router/index.js" lines="19-25"}

`currentMember` comes from `src/auth.js`. The question mark in `currentMember.value?.team` covers the case where nobody is signed in and the value is `null`.
:::
::::

::::exercise[Going further]
After the login, `LoginView` leads to the address from `redirect`, and to the catalog when there is no `redirect`. Only paths inside the app count, which means values that start with a single `/`.

:::solution[Solution]
::code{file="exercises/06-routing/guards/solution/{lang}/src/views/LoginView.vue" lines="12-24"}

`typeof redirect === 'string'` rules out a missing value, and also a query with two values, which arrives as an array. `startsWith('//')` catches an address without a protocol that points to another host.
:::
::::

::::exercise[Challenge]
Warn before someone leaves the page of a thing while the form contains something. Ask with `window.confirm`, and stay on the page if the answer is "Cancel".

:::solution[Solution]
::code{file="exercises/06-routing/guards/solution/{lang}/src/views/ItemView.vue" lines="13-21"}

`dirty` checks all fields at once. After sending, `Object.assign` clears the form, and the warning doesn't appear. The tests replace `window.confirm` with `vi.stubGlobal` and give the answer themselves, while in the browser the dialog appears.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The console reports `Detected a possibly infinite redirection in a navigation guard`. | The guard redirects the login page itself as well. Only redirect for routes with `meta.requiresTeam`, and return nothing otherwise. |
| `next` gets called twice or not at all, and the navigation hangs. | Return a value instead of calling `next`, either `false`, a route or nothing. |
| After the login you end up at `/` instead of the page you wanted. | Pass the target along as `redirect` in the query and read it after the login. |
| The warning doesn't appear on a reload or when the tab closes. | That's not a change of route. The browser has the `beforeunload` event for it. |
| An AI assistant protects the data of the team with a guard alone. | A guard steers members, it doesn't protect anything. The server checks access, see part 7. |

## Self-check

::::selfcheck
1. What can a guard return, and what does each value do?
2. Why does the guard check a field in `meta` instead of a list of paths?
3. Why does the login check the target from the address?
4. Why doesn't a guard in the browser protect any data?

:::solution[Answers]
1. Nothing or `true` lets the navigation go on, `false` cancels it, and a route redirects to a new navigation.
2. The flag sits on the route itself and also applies to its child routes, and a new page of the team needs no change in the guard.
3. Anyone can build an address with a target and send it around. Only paths of the app are safe as targets.
4. The code runs in the browser of the person who wants to get around it. Only code on the server can check access reliably.
:::
::::

:::assignment
Only the team gets into its area, and no form gets lost unnoticed anymore. At the end, the volunteer looks at what comes over the network on the first load. "Every member loads the code for the team area, even though they never get to see it. And a wrong address shows an empty page." The next chapter solves both.
:::
