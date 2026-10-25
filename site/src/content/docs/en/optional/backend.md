---
title: A backend of your own with Node
description: A small JSON API with node:http and node:test, when a backend of your own pays off and how the SPA talks to it.
sidebar:
  order: 3
---

Since part 7, the case app gets its data from the course API in the folder `api` of the course repo. The course API runs on Node with the built-in module `node:http` and no framework. If your project needs to store data that no public API provides, you need such a backend yourself. This page shows a small API for the catalog that you can read and extend.

## In your project

According to the [project assignment](../../project/assignment/), a backend of your own earns four bonus points. Otherwise only the frontend is graded, so plan the SPA first and the server second. A backend pays off when your app creates or changes data that other people should see, or when it combines data from several sources. For an app that only reads, a public API or a JSON file is often enough.

## A small example

The example lives in the course repo under `optional/backend/en`. The function `createHandler` answers every request. It checks the method and the path, searches the names of the things with `?q=` and takes a member's wish for a new thing with `POST`. It reads the body of a request piece by piece to the end and checks it before storing anything.

::code{file="optional/backend/{lang}/app.js"}

`server.js` starts the server on port 3001. `npm run dev` restarts it with `node --watch` whenever you change a file.

::code{file="optional/backend/{lang}/server.js"}

The tests start the API on a free port and query it with `fetch`, the same way an SPA does. Node ships `node:test` and `fetch` for this, so you need no extra packages.

::code{file="optional/backend/{lang}/app.test.js" lines="8-26"}

The wishes only live in memory and are gone after a restart. That is why the course API writes its data to files, and a project with a lot of data uses a database.

The easiest way for the SPA to talk to the backend is the Vite proxy, as in the chapter [Data from an API](../../state/data-from-an-api/). To the browser, app and API then share one origin, and no CORS is needed. If the API runs at another address, it has to allow the browser to hand its answers to the app with the header `Access-Control-Allow-Origin`. The course API shows how in `api/src/app.js`. Credentials for a database or another service belong in environment variables of the server and never in the code of the SPA, because anyone can read everything in the SPA's build in the browser.

For a bigger API, frameworks take care of routes, reading JSON and handling errors. Since version 5, Express passes rejected promises on to its error handling by itself. Fastify validates requests with JSON Schema, and Hono builds on the web standards `Request` and `Response`. Node reads secret values with `node --env-file=.env` from a file that stays out of the repository.

## Official links

- [Node.js, HTTP module](https://nodejs.org/api/http.html)
- [Node.js, test runner](https://nodejs.org/api/test.html)
- [MDN, cross-origin resource sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [Vite, proxy of the dev server](https://vite.dev/config/server-options.html#server-proxy)
- [Express](https://expressjs.com/), [Fastify](https://fastify.dev/) and [Hono](https://hono.dev/)
