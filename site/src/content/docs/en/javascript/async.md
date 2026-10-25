---
title: Asynchronous JavaScript
description: The event loop, promises, async and await, loading data with fetch, showing loading and error states and aborting requests with AbortController.
sidebar:
  order: 4
---

:::assignment
The catalog now lives on the association's server, and the volunteers maintain it there directly. Martina Hostettler has written down the next wish.

> As a volunteer at the counter, I want the overview to always show the current catalog from the server, so that I can rely on it.

The acceptance criteria are:

1. The overview loads the catalog from the association's server.
2. If the server can't be reached or reports an error, a clear message appears.
3. If the server doesn't answer, the overview gives up after five seconds.
:::

:::goals
After this chapter you can

- predict the order of code with timers and promises and explain it with the event loop,
- use promises with `then`, `catch` and `finally` and with `async` and `await`,
- load data with `fetch` and tell errors of the server from errors of the network,
- keep track of loading and error states and show them,
- abort a request with `AbortController`.
:::

## Waiting without blocking

A request to a server takes time, milliseconds at best, seconds over a bad connection. JavaScript runs in a single thread. If it waited for the answer, the whole page would freeze, and no click and no typing would get through. So JavaScript hands the waiting over to the browser or to Node and moves on. Once the answer is there, the browser calls the code that processes it. This code runs asynchronously, that is later than the code that started it.

## The event loop

Predict in which order the four lines appear before you run the example.

::code{file="examples/01-javascript/async/{lang}/order.mjs"}

The digits give away the order. First the program runs from top to bottom, lines 1 and 2. Only then do the callbacks get their turn, the promise before the timer, even though the timer waits 0 milliseconds.

![The event loop with task queue and microtask queue. On the left is the call stack with the functions that are running. An arrow leads right to timers and requests, such as setTimeout and fetch. When a timer has run out, its callback goes into the task queue, and so do clicks. Promises put their continuations into the microtask queue. When the stack is empty, the event loop takes all microtasks first and then one task.](../../../../assets/figures/en/p1c4-event-loop.svg)

The call stack holds the functions that are running. The browser or Node take care of timers and requests. When a timer has run out, its callback goes into the task queue, and so do the callbacks for clicks and other events. The continuations of promises go into the microtask queue. When the stack is empty, the event loop takes all microtasks first and then one single task, then all microtasks again. In the browser it also redraws the page between tasks. A callback that computes for a long time therefore blocks everything else, redrawing included.

## Promises

A promise stands for a result that comes later. At first it is pending, then it is either fulfilled with a value or rejected with an error. With `then` you attach code that works with the value, with `catch` code for the error and with `finally` code that runs in both cases.

::code{file="examples/01-javascript/async/{lang}/promise.mjs"}

`answerLater` and `failLater` stand in for a slow server. They wrap a timer in a promise, `resolve` fulfills it and `reject` rejects it. Both start at almost the same time. The error message appears first, because its timer runs out after 100 milliseconds and the other one only after 300. Results arrive in the order in which they finish, not in the order of the code.

`then` itself returns a promise again. That's why `then`, `catch` and `finally` can be linked into a chain, in which every step works with the result of the previous one.

## async and await

With `async` and `await`, code with promises reads almost like ordinary code. A function marked `async` always returns a promise. Inside it, `await` pauses the function until the promise is fulfilled and returns its value. It doesn't pause the thread, and the event loop handles other work in the meantime.

::code{file="examples/01-javascript/async/{lang}/await.mjs"}

`oneAfterTheOther` waits for the things and only then asks for the members, 400 milliseconds in total. `atTheSameTime` starts both requests right away and waits for both with `Promise.all`, which takes as long as the slower one. So you start independent requests at the same time. If one of the promises rejects, `Promise.all` rejects too. If you need all results, the rejected ones included, use `Promise.allSettled`.

In a module, `await` may also stand outside a function, as in the last lines of the example. You catch a rejected promise with `try` and `catch`, just like an error from the unit [Handling errors](../../js/errors/).

## fetch

`fetch` sends a request to a server and returns a promise that is fulfilled with a response, a `Response`. The examples of this chapter run in the browser without the association's server, so a stand-in answers. It returns real objects of type `Response`, just as `fetch` would.

::code{file="examples/01-javascript/async/{lang}/fetch.mjs"}

`response.ok` is `true` when the status is between 200 and 299. `response.status` gives the status, such as 200 for success or 404 when the address doesn't exist. `response.json()` reads the content and turns it into data with `JSON.parse`. It returns a promise too, because the data may still be on their way when the response has already arrived.

The last case is the important one. `fetch` doesn't reject for status 404 or 500. To `fetch`, an answer is an answer, even if it reports an error. The promise rejects only when no answer comes at all, for example because the network is down or the server isn't running, and then with a `TypeError`. You have to check the status yourself.

## Showing loading and errors

While a request is running, the interface should show it, and if it fails, a message that members can make sense of. For this the code keeps track of the state of the request.

::code{file="examples/01-javascript/async/{lang}/states.mjs"}

The state is an object with the field `status`, which can be `loading`, `success` or `error`, plus the data and the message. The interface follows this object. In the browser it looks like this.

::code{file="examples/01-javascript/async/{lang}/loading.html"}

For half a second the page shows the loading hint, then the list and the number of things. You will meet this pattern with three states in every app that loads data. In part 7 you write it again in Vue, and then the interface shows the states by itself.

## Aborting requests

Sometimes an answer isn't needed anymore, for example when a member keeps typing and sends a new search, or it comes too late. With an `AbortController` you abort a request.

::code{file="examples/01-javascript/async/{lang}/abort.mjs"}

The controller has a signal that you pass to `fetch`. `controller.abort()` aborts the request, and the promise rejects with an error named `AbortError`. For a time limit there is `AbortSignal.timeout(300)`, which aborts by itself after 300 milliseconds, with an error named `TimeoutError`. `fetch` aborts real requests in exactly this way, and the stand-in in the example imitates it.

## In code

Work with the example on promises. Write down what you expect before you change anything.

::code{file="examples/01-javascript/async/{lang}/promise.mjs"}

1. What changes in the output if `failLater` waits 500 instead of 100 milliseconds?
2. Remove the `catch` at the end. What does the "Run" button report, and what does Node report with `node promise.mjs`?
3. Rewrite the first part with `async` and `await`, in a function with `try` and `finally`.
4. What does `console.log(answerLater(300, 'x'))` print, and why not `x`?

## Exercises

The exercises build the overview that loads the catalog from the server. You find the project in the course repo in the folder `exercises/01-javascript/async/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

The tests replace `fetch` with stand-ins and need no server. But the project also contains a small server that delivers the catalog at `http://localhost:3000/items`. Start it in one terminal and the overview in a second one.

```bash
npm run server
npm run overview
```

With `?status=503` at the end of the address in `src/load.js`, the server answers with an error, with `?delay=8000` only after eight seconds. If you stop the server with Ctrl+C, it can't be reached. That way you try every exercise by hand as well.

::::exercise[Getting started]
Write the function `loadItems(url)` in `src/load.js`. It loads the catalog with `fetch` from the address passed in and returns the things as an array. With the server running, `npm run overview` then shows 60 things.

:::solution[Solution]
Two lines are enough, `const response = await fetch(url)` and `return response.json()`. The function needs `async` for this. It returns the promise of `response.json()`, and whoever calls `loadItems` with `await` gets the things. The complete solution with all three levels is in the challenge.
:::
::::

::::exercise[Going further]
Export an error class `LoadError` from `src/load.js`. `loadItems` throws it with the message "The server answers with status 503." when the server reports an error, with its status instead of 503. If the server can't be reached, the message is "The server cannot be reached.".

:::solution[Solution]
The class extends `Error` and sets its name, as in the unit [Handling errors](../../js/errors/). `loadItems` catches the `TypeError` from `fetch` with `try` and `catch` and throws a `LoadError` instead. After the `try`, it checks `response.ok` and throws a `LoadError` with the status when the server reports an error. The overview then only prints `error.message`. The solution of the challenge shows the code.
:::
::::

::::exercise[Challenge]
`loadItems` shouldn't wait forever. Add an option `timeout` in milliseconds with a default of 5000, `loadItems(url, { timeout: 1000 })`. If the server doesn't answer in time, the function throws a `LoadError` with the message "The server is too slow to answer.".

:::solution[Solution]
::code{file="exercises/01-javascript/async/solution/{lang}/src/load.js"}

`AbortSignal.timeout` aborts the request after the time limit, and `fetch` rejects with a `TimeoutError`. The `catch` block tells from the name of the error whether the time ran out or the server is missing. `cause` attaches the original error, so it stays available for debugging without members seeing it. The time limit sits in an object with a default value, so `loadItems(url)` without options keeps working.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `console.log(loadItems(url))` shows `Promise { <pending> }` instead of the things. | Write `await` in front of it or continue with `then`. |
| For status 404, `fetch` reports no error, and `response.json()` fails on an error page. | Check `response.ok` before reading. |
| `await` inside a callback of `forEach` doesn't wait. | Use `for...of` with `await`, or collect the promises with `map` and wait for them with `Promise.all`. |
| A rejected promise without `catch` shows up as `Uncaught (in promise)` in the console. | Put `await` inside `try` and `catch` or attach `.catch`. |
| `response.json()` without `await` returns a promise instead of the data. | Write `await response.json()`. |
| Two independent requests run one after the other with two `await` and take twice as long. | Start both and wait for both with `Promise.all`. |
| An AI assistant installs a package such as axios for a simple request. | `fetch` is built into browsers and Node and is enough. |

## Self-check

::::selfcheck
1. In which order does output from ordinary code, from `then` and from `setTimeout` with 0 milliseconds appear, and why?
2. Why doesn't `fetch` reject for status 503, and how do you notice the error?
3. What is the difference between two `await` one after the other and `Promise.all`?
4. What is an `AbortController` for?

:::solution[Answers]
1. First the ordinary code, then `then`, then the timer. The event loop takes callbacks only when the stack is empty, and it takes all microtasks before the next task.
2. To `fetch`, every answer is a success, even one that reports an error. It rejects only when no answer comes. `response.ok` shows the error, since it is `false` for 503.
3. With two `await` one after the other, the second request starts only when the first is done. `Promise.all` waits for requests that are already running at the same time.
4. It aborts a running request, for example when nobody needs its answer anymore or it takes too long.
:::
::::

:::assignment
The overview loads the catalog from the server and reports problems clearly. Martina Hostettler showed it to the board, and a question came up there. "Why do we need an app? Wouldn't an ordinary website with pages do?" Part 2 looks into this question. Before that, use the [competence grid](../competences/) to check whether you are ready for part 2. The deep dive [Proxies and getters](../proxies/) shows how Vue notices that data change.
:::
