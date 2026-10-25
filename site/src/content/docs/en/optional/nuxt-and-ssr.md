---
title: Nuxt and server-side rendering
description: Rendering a Vue app on the server, hydrating it in the browser and what Nuxt adds on top.
sidebar:
  order: 2
---

An SPA first sends the browser an almost empty page and builds the content with JavaScript. With server-side rendering, SSR for short, the server already renders the same components to HTML. The browser shows the content right away, and then the same app takes over the page in the browser. That step is called hydration. Vue ships both parts. `createSSRApp` creates an app for this interplay, `renderToString` turns it into HTML on the server, and `mount` takes that HTML over in the browser. Nuxt is a framework on top of Vue that sets up SSR, routing and data loading for whole projects.

## In your project

SSR pays off when content has to show up quickly or search engines should find it, for example in a public catalog or a blog. It comes at a cost, though. The app needs a server that runs Node instead of one that only delivers files, and code that runs in the browser must also be able to run on the server. For an app behind a sign-in, SSR adds little. If you only want some pages ready in advance, you can render them as static pages during the build.

## A small example

The example under `optional/ssr/en` renders the catalog with Vue itself, without Nuxt. `app.js` creates the app with `createSSRApp`. The function creates a new app on every call, because on the server all requests share one process, and the state of one request must never end up in another.

::code{file="optional/ssr/{lang}/app.js"}

`renderToString` turns the app into a string of HTML. `render.js` puts it into a whole page, hands the data to the browser and loads the script that takes over the page. The comments `<!--[-->` in the HTML mark fragments that hydration relies on.

::code{file="optional/ssr/{lang}/render.js"}

In the browser, `client.js` calls the same function. Since the app comes from `createSSRApp`, `mount` does not draw the page again but attaches the event listeners to the existing HTML. Only then does the button "Save" react.

::code{file="optional/ssr/{lang}/client.js"}

With `npm start`, `server.js` serves the page at `http://localhost:3002`. The page source already contains the list in its HTML before any JavaScript has run. If the server delivers different HTML than the app would render in the browser, Vue reports a mismatch during hydration. That happens, for example, when a component uses the current time or a random number while rendering.

Nuxt sets all of this up for a whole project. The current version is Nuxt 4, and you create a new project with `npm create nuxt@latest`. Pages are components in the folder `app/pages`, and Nuxt turns the file names into routes instead of you listing them by hand. Nuxt imports components and composables automatically. `useFetch` loads data on the server and hands it to the page, so the browser does not fetch it a second time, and files in the folder `server/api` become routes of an API. Whether a page is rendered on the server, only in the browser or already during the build is something you decide per route. The Nuxt dev server uses port 3000, just like the course API, so don't start both on the same port.

## Official links

- [Vue documentation, server-side rendering](https://vuejs.org/guide/scaling-up/ssr.html)
- [Nuxt documentation, installation](https://nuxt.com/docs/4.x/getting-started/installation)
- [Nuxt documentation, rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)
