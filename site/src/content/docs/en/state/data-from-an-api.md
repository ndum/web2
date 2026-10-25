---
title: Data from an API
description: The course API, loading data in actions, loading, error and empty states, sending requests as JSON, signing in at the API, aborting the previous request, the address of the API and CORS.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler wants the requests to reach the association.

> As a volunteer at the counter, I want to see the members' requests on the association's server, so that we can get the things ready.

The volunteer adds that the catalog should come from the server as well, so that a return at the counter reaches everyone. The acceptance criteria are:

1. The catalog comes from the course API. The app shows that it is loading and reports errors clearly.
2. A request goes to the course API, and the app shows its answer, a refusal included.
3. The overview "My requests" loads from the course API and cancels the loading when someone leaves the page before it is done.
:::

:::goals
After this chapter you can

- read the routes of the course API and start the API,
- load data in an action and show loading, error and empty states,
- send data as JSON and evaluate the answers of the API,
- abort a request with `AbortController`,
- set the address of the API and explain when CORS is needed.
:::

## The course API

The small server of the earlier parts could only deliver the catalog. From this part on, the course API in the folder `api` of the course repo plays the association's server. It is a Node program without dependencies and runs in a terminal of its own.

```bash
cd api
npm start
```

After that it answers at `http://localhost:3000`. Every path starts with `/de` or `/en`, which chooses the language of the data and of the messages. The answers are JSON, and an error comes as `{ "error": "…" }`.

| Method and path | Who | Answer |
|---|---|---|
| `GET /items` | everyone | all things |
| `GET /items/:id` | everyone | one thing, 404 for an unknown number |
| `POST /session` | everyone | signs in with `{ "number": "M-117" }`, 401 for an unknown number |
| `GET /session` | everyone | the signed-in member, 401 without a login |
| `DELETE /session` | everyone | signs out |
| `GET /reservations` | members | the own requests |
| `POST /reservations` | members | a request, 201, 422 with a message per field, 409 for days already requested |
| `DELETE /reservations/:id` | members | withdraws an own request |
| `POST /items/:id/return` | team | records a return, 403 without a team account |

Like the small server, the API waits two seconds with `?delay=2000` and answers with that status for `?status=503`. It keeps returns and requests in `api/storage/state.json`, and `npm run reset` starts over.

## Loading in an action

An action of the store loads the data from the server. Next to the data, the store keeps the status of the request, and every page shows something for every status. `fetch` only rejects when no answer arrives at all, and the action checks a status like 503 itself, as in chapter 1.4.

::playground{dir="examples/07-state/load-in-action"}

The playground has no server. That's why the file `mock-api.js` plays the course API. It intercepts calls of `fetch` below `/api/` and answers like the API, with `?delay` and `?status`. In a project it goes away, and the real API answers.

## Sending requests

A request goes to the API with `method: 'POST'`. Its content sits as JSON in `body`, and the `Content-Type` header tells the API that it is JSON. The course API only accepts JSON and answers with 415 otherwise.

::playground{dir="examples/07-state/send-request"}

The status of the answer tells how things turned out. 201 means created, 422 means that fields are wrong, and 409 reports a conflict, which for the course API means days that are already requested. The form already checks the rules of the association before sending, as it has since part 3. The API checks them once more anyway, because anyone can send a request without the app, and only the server knows about conflicts with other members' requests.

## Signing in at the course API

The course API simulates the login with the member number and knows no password. After `POST /session` it sets a cookie, and the browser sends it along with every further request to the same address. That's how the API knows who sends a request. The store of the login doesn't see this cookie, it only keeps the member from the answer.

::code{file="case/07-state/{lang}/src/stores/auth.js" lines="21-28"}

Now the server protects the team area as well. The API refuses a return without a team account with 403, no matter what the guard in the browser shows. Chapter 7.4 explains why a cookie suits the login better than the browser's storage.

## Aborting the previous request

Chapter 5.2 skipped outdated answers with a cleanup function. With an `AbortController` from chapter 1.4, the same cleanup function aborts the old request instead of only skipping its answer.

::playground{dir="examples/07-state/abort-previous"}

When you click "Next thing" quickly several times, the console reports the cancelled requests, and only the last answer appears. A call of `fetch` that was aborted rejects with an `AbortError`, and the page skips it. As in chapter 1.4, `AbortSignal.timeout` aborts a request that takes too long.

## The address of the API and CORS

The projects of this part read the address of the API from `VITE_API_URL` and otherwise use `/api/en`. The Vite proxy from chapter 6.2 forwards everything below `/api` to the course API. For the browser, the app and the API share one address that way.

::code{file="exercises/07-state/api/solution/{lang}/.env.example"}

![The path of a request from top to bottom. A component calls an action of the store, and the store sends fetch to /api/de/items. Vite on port 5173 takes the request and forwards everything below /api to the course API on port 3000, which answers GET /de/items and keeps returns and requests in storage/state.json. On the right, a dashed path leads from the store directly to http://localhost:3000. That path goes to another origin and therefore needs CORS.](../../../../assets/figures/en/p7c3-request-path.svg)

If the app calls the API directly at `http://localhost:3000/en`, the request goes to another port and thus to another origin. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), the browser restricts such requests from scripts. It only hands out the answer when the server allows the origin of the page with the `Access-Control-Allow-Origin` header. For requests with JSON, the browser first asks with `OPTIONS` whether the method and the headers are allowed. A simple request still gets processed by the server, and the browser only withholds the answer. The course API allows the addresses of Vite on the ports 5173 and 4173. With cookies, it also takes `credentials: 'include'` in `fetch` and the server's permission, which is why the projects stick with the proxy.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the first example, choose "slow" and right afterwards "with an error". Which state stays in the end?
2. In the example with the request, send the same days twice. What does the stand-in for the API answer the second time?
3. In the same example, remove the `Content-Type` header. The stand-in doesn't notice, but what would the course API answer?
4. In the example on aborting, remove the line with `onWatcherCleanup` and click quickly several times. Which thing ends up as the heading?

## Exercises

The exercises build the catalog and the requests from the assignment. You'll find the project in the course repo in the folder `exercises/07-state/api/en`. The store of the login already talks to the course API. Copy the folder, install the packages and start the tests. The tests need no server, and for the app in the browser you start the course API in a second terminal.

```bash
npm install
npm test
```

::::exercise[Getting started]
The store `catalog` still reads the catalog from a file. Load it in the action `load` from `${API}/items`. The state `status` is `loading`, `error` or `ready`, and on an error `error` holds a message such as "The course API answers with the status 503.".

:::solution[Solution]
::code{file="exercises/07-state/api/solution/{lang}/src/stores/catalog.js" lines="6-24"}

Without an answer, `fetch` rejects with a `TypeError`, and for that the solution reports that the course API cannot be reached. `App` calls `load` on start, and the catalog page shows something for every status.
:::
::::

::::exercise[Going further]
The action `send` in the store `requests` only keeps requests in the browser so far. Send them as JSON with `POST` to `${API}/reservations`. On success, `send` returns `{ reservation, fields: {} }`, and on a refusal `{ error, fields }` with the message and the messages per field from the answer.

:::solution[Solution]
::code{file="exercises/07-state/api/solution/{lang}/src/stores/requests.js" lines="11-22"}

The page of a thing already shows `result.error` and the messages per field. In the browser, a member can sign in as M-117 or M-204, and the store `auth` handles the login at the course API.
:::
::::

::::exercise[Challenge]
So far the overview "My requests" only shows what was requested in the browser. Load it in an action `load(signal)` from `${API}/reservations`, show loading, error and an empty list, and abort the loading with an `AbortController` when someone leaves the page before it is done.

:::solution[Solution]
::code{file="exercises/07-state/api/solution/{lang}/src/stores/requests.js" lines="24-38"}

::code{file="exercises/07-state/api/solution/{lang}/src/views/RequestsView.vue" lines="10-13"}

An abort is no error, so the action sets no status for it. Without a login, the API answers with 401, and the page shows its message.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A status like 500 shows up as a success. | `fetch` only rejects without an answer. Check `response.ok`. |
| The course API answers with 415. | The header `Content-Type: application/json` is missing, or the content isn't JSON. |
| The console reports that CORS blocked a request. | The app calls the API at another origin. Use the proxy, or allow the origin on the server. |
| After leaving a page, a late answer still sets some state. | Abort the request with an `AbortController` when the page goes away. |
| An AI assistant relies on the checks in the form alone. | The server checks every request once more, and the app shows its messages. |

## Self-check

::::selfcheck
1. When does `fetch` reject, and when does the action have to detect an error itself?
2. What do the answers 201, 401, 409 and 422 of the course API mean?
3. Why does the course API check the rules even though the form already does?
4. Why doesn't the app need CORS with the Vite proxy?

:::solution[Answers]
1. `fetch` only rejects when no answer arrives or the request gets aborted. The action checks every status itself with `response.ok`.
2. 201 means created, 401 a missing login, 409 a conflict with days already requested and 422 fields that are wrong.
3. Anyone can send requests without the app, and only the server knows about conflicts with other people's requests.
4. For the browser, all requests go to the address of the app. Only Vite forwards them to the API, and the browser never sees another origin.
:::
::::

:::assignment
The catalog, the requests and the returns all go through the course API. After a reload, though, the login is gone from the store, and a member who marks favorites in a second tab doesn't see them in the first one. Martina Hostettler also reports that half-filled requests get lost at the counter as soon as someone confirms the question on leaving to check the catalog quickly. The next chapter settles what the app keeps where in the browser.
:::
