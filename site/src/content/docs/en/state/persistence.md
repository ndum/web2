---
title: Persistence
description: localStorage and sessionStorage, values as JSON, favorites in several tabs with the storage event, a draft per tab, what never belongs in the browser's storage, and the login that lasts one session.
sidebar:
  order: 4
---

:::assignment
Three pieces of feedback reach Martina Hostettler.

> As a member, I want to see my favorites in every tab, so that I don't have to think about where I marked them.

> As a volunteer at the counter, I want to stay signed in after a reload, but not overnight, so that nobody works with my login the next day.

> As a member, I want to find a request I started when I quickly check the catalog, so that I don't have to enter everything again.

The acceptance criteria are:

1. Favorites survive a reload and are the same in every tab.
2. The login survives a reload and ends when the browser closes.
3. A request someone started stays in its tab, even after a reload.
:::

:::goals
After this chapter you can

- tell `localStorage` from `sessionStorage` and store values as JSON,
- connect a store to the browser's storage,
- keep several tabs in step with the `storage` event,
- explain what never belongs in the browser's storage,
- ask the server about a login after a reload.
:::

## Storage in the browser

A store lives in the memory of the page and is empty after a reload. For values that should last longer, the browser has the Web Storage API with two storage areas. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), all tabs of an origin share the same `localStorage`, and it stays when the browser closes. `sessionStorage` belongs to one tab instead, survives a reload and ends when the tab closes. Both only store text, so lists and objects go in with `JSON.stringify` and come back out with `JSON.parse`.

Chapter 5.2 stored the search text in `localStorage`, and chapter 5.4 built the composable `useLocalStorage` for it. Since part 6 the filter lives in the address, and the favorites stay in the browser's storage.

## Favorites in localStorage

When it is created, a setup store reads what the storage holds and writes every change back. Because an entry can be broken or come from another version of the app, it checks that a list comes out.

::playground{dir="examples/07-state/local-storage"}

The running case app uses the composable `useLocalStorage` from chapter 5.4 inside the store. A setup store can use composables the same way a component does.

::code{file="case/07-state/{lang}/src/stores/favorites.js"}

## Several tabs

When a tab changes an entry in `localStorage`, the browser fires the `storage` event in the other tabs of the same origin. According to MDN, the tab that makes the change doesn't get it. The event names the key and the new value, and the store reads it again.

::playground{dir="examples/07-state/storage-event"}

Both examples on this page run in the same origin and therefore share the storage. When you mark a favorite in the first example, the second one follows, because it listens to the event. The first example only follows the second one after a restart.

## A draft per tab

A form someone started belongs in `sessionStorage`. It survives a reload, but it stays in the tab where someone started it and disappears when the tab closes.

::playground{dir="examples/07-state/session-draft"}

An empty form deletes the draft, and after sending the form is empty. In the running case app, the draft replaces the question on leaving from chapter 6.4, because whoever leaves the page finds the input again on coming back.

## Nothing secret in storage

Every script of the page can read what's in the browser's storage. The [HTML5 Security Cheat Sheet by OWASP](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) warns that a single cross-site scripting hole can steal all the data in these storage areas. It advises against keeping sensitive data or session identifiers there. Passwords, API keys and session identifiers therefore never go in, not into `sessionStorage` either.

That's why the course API keeps the login in a cookie with `HttpOnly`. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie), JavaScript can't read such a cookie, but `fetch` still sends it. Without an expiry date it's a session cookie, which ends when the browser closes. Many browsers restore tabs on the next start, and such cookies along with them. `SameSite=Strict` sends the cookie only with requests from the same site.

![Four bars across six events, load page, reload, second tab, close tab, close browser and open browser. A store in memory lasts until the reload. sessionStorage survives the reload, belongs to this tab only and ends when it closes. A cookie without expiry applies to all tabs and ends when the browser closes. localStorage applies to all tabs and is still there after the next start.](../../../../assets/figures/en/p7c4-storage-lifetime.svg)

## The login after a reload

After a reload the store of the login is empty, but the cookie is still there. The app therefore asks the course API with `GET /session` on start who is signed in. The action keeps its promise, so it only asks once, even when both the app and the guard call it.

::code{file="case/07-state/{lang}/src/stores/auth.js" lines="12-19"}

The guard of the team area waits for this answer. Otherwise it would send a signed-in team member to the login page after a reload of `/team`, because the store doesn't know the answer yet.

::code{file="case/07-state/{lang}/src/router/index.js" lines="48-56"}

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. Mark two favorites in the first example and then change something in the code, so that the preview restarts. What stays?
2. Open this page in a second tab and mark a favorite there. What do the examples in the first tab show?
3. Type a note in the example with the draft, restart the preview and then open the page in a new tab. Where is the note?
4. In the first example, write the value `{` into the entry `lorraine-commons-favorites` under "Application" in the developer tools and restart the preview. What does the page show?

## Exercises

The exercises build the three wishes for the favorites and the form. The running case app shows the login. You'll find the project in the course repo in the folder `exercises/07-state/persistence/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
The store `favorites` forgets the favorites on a reload. Read them from `localStorage` under the key `lorraine-commons-favorites` when the store is created, and write every change back as JSON. A broken entry counts as none.

:::solution[Solution]
::code{file="exercises/07-state/persistence/solution/{lang}/src/stores/favorites.js" lines="4-21"}

`JSON.parse(null)` gives `null`, and `Array.isArray` then lets the empty list apply, as for a broken entry. `deep: true` is needed in case someone changes the list with `push`.
:::
::::

::::exercise[Going further]
A second tab changes the favorites, and the first one doesn't notice. Let the store listen to the `storage` event and read the favorites again when its key changes.

:::solution[Solution]
::code{file="exercises/07-state/persistence/solution/{lang}/src/stores/favorites.js" lines="23-26"}

A store lives as long as the app runs, so it doesn't have to remove the listener again. In a composable for components, `onUnmounted` or `onScopeDispose` belongs with it, as in the composable of the running case app.
:::
::::

::::exercise[Challenge]
The page of a thing keeps a draft of the form in `sessionStorage` under `lorraine-commons-draft-` followed by the number of the thing. After a reload it is back in the form, and after sending it is gone.

:::solution[Solution]
::code{file="exercises/07-state/persistence/solution/{lang}/src/views/ItemView.vue" lines="12-37"}

The router keeps the page when only the number changes, as in chapter 6.2. The watcher on `key` then fetches the draft of the new thing.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `[object Object]` comes out of the storage. | The storage only takes text. Store values with `JSON.stringify` and read them with `JSON.parse`. |
| A broken entry makes the app crash on start. | Put `JSON.parse` into `try` and `catch`, and check the shape of the value. |
| One tab doesn't notice the changes of another. | Listen to the `storage` event. The tab that writes doesn't get it. |
| A password or a session identifier sits in `localStorage`. | Never. A login belongs in a cookie with `HttpOnly` that the server sets. |
| An AI assistant stores the whole member in `localStorage` to stay signed in after a reload. | The server knows who is signed in. The app asks it after a reload. |

## Self-check

::::selfcheck
1. How do `localStorage` and `sessionStorage` differ?
2. When does the browser fire the `storage` event, and when doesn't it?
3. Why doesn't a session identifier belong in the browser's storage?
4. Why does the guard wait for the course API after a reload?

:::solution[Answers]
1. All tabs of an origin share `localStorage`, and it survives closing the browser. `sessionStorage` belongs to one tab and ends with it.
2. In the other tabs of the same origin, when a tab changes an entry. The tab that writes doesn't get it.
3. Every script of the page can read the storage, and a single cross-site scripting hole is enough to steal it. A cookie with `HttpOnly` stays invisible to scripts.
4. After a reload the store is empty, and only the answer to `GET /session` tells who is signed in. Without waiting, a signed-in team member would end up on the login page.
:::
::::

:::assignment
The app keeps what it should keep and forgets what it must not keep. Martina Hostettler wants to show it to the association as soon as it runs publicly, and that comes with part 8. With this chapter the material of the exam is complete, and the [competence grid](../competences/) shows you where you stand. If you want to know how libraries cache data from the server, read the deep dive on server state libraries.
:::
