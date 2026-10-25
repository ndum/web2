---
title: Competence grid for part 7
description: What you can do after part 7 and how to check it yourself, plus the state of the app after part 7.
sidebar:
  label: Competence grid
  order: 6
---

Use this grid to judge whether you are ready for the exam and the project. Read each row and solve the check task next to it without looking anything up. If it feels easy, you have reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check task | Look it up |
|---|---|---|
| tell the kinds of state apart | Assign the search text, an open dialog, the login and the catalog to a kind of state each. | [State in the right place](../where-state-belongs/#kinds-of-state) |
| lift state into the parent | Show the same favorites in two siblings without either of them keeping a copy. | [State in the right place](../where-state-belongs/#lifting-state-into-the-parent) |
| put shared state into a module | Hand out a list from a module so that other files can only read it. | [State in the right place](../where-state-belongs/#a-module-for-shared-state) |
| explain when an app needs no store | Explain why an open dialog needs no store. | [State in the right place](../where-state-belongs/#getting-by-without-a-store) |
| write a setup store with Pinia | Write a store for the favorites with state, a getter and an action. | [Pinia](../pinia/#setup-stores) |
| take a store apart without losing the connection | Explain why `const { count } = store` stays put, and fix it. | [Pinia](../pinia/#taking-stores-apart-with-storetorefs) |
| use a store in a guard | Let a guard check the login from the store. | [Pinia](../pinia/#a-store-in-a-navigation-guard) |
| test stores | Test a store with a fresh Pinia for every test. | [Pinia](../pinia/#testing-stores) |
| load data in an action and show every state | Load the catalog in an action and show loading, error and the list. | [Data from an API](../data-from-an-api/#loading-in-an-action) |
| send data as JSON and evaluate the answers | Send a request with `POST` and show the messages for 422 and 409. | [Data from an API](../data-from-an-api/#sending-requests) |
| abort a request | Abort the loading when someone leaves the page before it is done. | [Data from an API](../data-from-an-api/#aborting-the-previous-request) |
| set the address of an API and explain CORS | Explain why the app needs no CORS with the Vite proxy. | [Data from an API](../data-from-an-api/#the-address-of-the-api-and-cors) |
| keep values in the browser's storage | Keep the favorites in `localStorage` and a draft in `sessionStorage`. | [Persistence](../persistence/#favorites-in-localstorage) |
| keep several tabs in step | Let a store listen to the `storage` event. | [Persistence](../persistence/#several-tabs) |
| explain what never belongs in the browser's storage | Explain why a login belongs in a cookie with `HttpOnly`. | [Persistence](../persistence/#nothing-secret-in-storage) |
| ask about a login after a reload | Explain why the guard waits for the course API after a reload. | [Persistence](../persistence/#the-login-after-a-reload) |
| load data with a server state library (Exkurs) | Load the catalog with `useQuery` and explain what the key is for. | [Server state libraries](../server-state/#queries-with-usequery) |

With part 7, the material of the [exam](../../exam/) is complete. For the project and for part 8 you mainly need components, the router, stores and data from an API. The last row belongs to the Exkurs and is optional.

## The app after part 7

What Martina Hostettler's assignments in this part added up to is in the course repo in the folder `case/07-state/en`. Pinia keeps the catalog, the login, the favorites and the requests in stores, and the data come from the course API. Members sign in at the API, stay signed in for one session and see their requests in the header and on the page "My requests". The team records returns at the API, the favorites are the same in every tab, and a request someone started stays in its tab. The tests in the folder `tests` check the wishes from this part.

```bash
npm install
npm test
```

For the app, start the course API in one terminal, in the folder `api` of the course repo, and Vite in a second one.

```bash
npm start
npm run dev
```

If you didn't finish everything in part 7, start part 8 from this state.
