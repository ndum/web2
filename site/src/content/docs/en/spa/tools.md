---
title: Tools
description: Vite as a development server and bundler, hot module replacement, a proxy for the data, environment variables, build, dist and preview, the base path and the network panel.
sidebar:
  order: 3
---

:::assignment
A volunteer who works as a software developer looked at the SPA built by hand and gave Martina Hostettler two questions to pass on. A new wish came out of them.

> As a volunteer who develops the app further, I want to see changes in the browser right away and build the app for publishing with one command, so that work on the app goes faster.

The acceptance criteria are:

1. `npm run dev` starts the app, and changes appear without anyone reloading the browser.
2. The catalog still comes from the association's server, and its address isn't fixed in the code.
3. `npm run build` creates a folder `dist`, which `npm run preview` serves.
4. The built app also works in a subfolder, as GitHub Pages uses one.
:::

:::goals
After this chapter you can

- move an SPA into a Vite project and start it with `npm run dev`,
- explain what the development server and hot module replacement do,
- forward requests with a proxy and move addresses into environment variables,
- build an app, check the folder `dist` with `npm run preview` and set the base path for a subfolder,
- examine requests in the network panel of the DevTools.
:::

## Setting up Vite

Vite is a tool for web projects. During development it serves the app as a server, and for publishing it bundles it into a few files. You create a new project with `npm create vite@latest` and pick the template for JavaScript without a framework. The SPA from the last chapter can also be moved by hand, which is how the exercise project came about.

::code{file="exercises/02-spa/vite/{lang}/index.html"}

The page `index.html` now sits in the main folder of the project, and Vite reads it as the entry. It loads `/src/main.js` as a module, and this module also imports the CSS. The code of the app is the same as in the last chapter, it just lives in the folder `src`. `package.json` holds the commands for Vite.

::code{file="exercises/02-spa/vite/{lang}/package.json"}

`npm run dev` starts the development server, `npm run build` builds the app, and `npm run preview` serves the result for checking. The command `server` starts the association's small server, as before.

## The development server

`npm run dev` starts Vite at `http://localhost:5173/`. The server delivers the modules of the app one by one, as they are in the folder `src`, and transforms them where the browser wouldn't understand them otherwise. An import such as `import './style.css'` becomes CSS on the page that way, and an import of a package such as `import { ref } from 'vue'` finds the package in `node_modules`.

When you save a file, Vite notices right away. With CSS it swaps only the rules, and the page stays as it is, with the text in the search field and the scroll position. This is called hot module replacement, HMR for short. With a module of JavaScript without a framework, Vite reloads the page by itself, because it doesn't know how to swap the module while the app runs. A changed Vue component, on the other hand, Vite swaps without reloading the whole page. Part 3 shows this.

## The proxy

The app requests the catalog at `/items`. At this address, however, Vite now answers, not the small server on port 3000. A proxy solves this. Vite forwards requests for certain addresses to another server and returns its answer. In `vite.config.js`, the rule `proxy: { '/items': 'http://localhost:3000' }` goes under `server` for this.

To the browser, the app and the catalog share one address, and the app doesn't have to know anything about it. `npm run preview` uses the same rules as long as it doesn't get rules of its own. The proxy runs only during development and in the preview. For publishing, the catalog needs an address that is reachable everywhere. Part 7 connects the app to the API of the course, which has an address of its own.

## Environment variables

Addresses and similar settings don't belong in the code, because they differ from one environment to the next. For this, Vite reads environment variables from files whose names start with `.env` and makes them available in the code under `import.meta.env`.

1. `.env` always applies, `.env.development` only for `npm run dev` and `.env.production` only for the build.
2. Files ending in `.local`, such as `.env.local`, apply only on your own machine and never belong in the repo.
3. Only variables whose name starts with `VITE_` reach the code in the browser.
4. Vite puts the values into the code at build time. Whatever is in a variable with `VITE_` can therefore be read by anyone who opens the app.

So a secret such as a password or an API key has no business in such a variable. The file `.env.example` describes which variables a project knows. It belongs in the repo, and whoever takes over the project copies it to `.env.local` and adjusts the values.

::code{file="exercises/02-spa/vite/solution/{lang}/.env.example"}

In the code, the app reads the value and takes `/items` if it is missing, `loadItems(import.meta.env.VITE_CATALOG_URL ?? '/items')`. Next to this, Vite provides values of its own, such as `import.meta.env.DEV`, which is `true` during development, and `import.meta.env.BASE_URL` for the base path further down.

## Build and dist

`npm run build` builds the app for publishing. Vite bundles the modules into a few files, removes spaces and comments and writes everything into the folder `dist`.

```bash
npm run build
npm run preview
```

Afterwards `dist` holds `index.html` and, in the folder `assets`, one file each for JavaScript and CSS. Their names contain a hash, such as `index-B5G1k6eY.js`. When the content changes, the name changes. Browsers may therefore cache such files for a long time and still load the new version right away after a change. `npm run preview` serves `dist` at `http://localhost:4173/`, so that you can check the build before publishing. This server isn't meant for production. What gets published is the folder `dist`, as part 8 shows.

## The base path

Vite assumes that the app sits directly under a domain and writes paths such as `/assets/index-B5G1k6eY.js` into `index.html`. On GitHub Pages, however, a project sits in a subfolder, for example at `https://name.github.io/lorraine-commons/`. The browser then looks for `/assets/...` in the wrong place, and the page stays empty.

The option `base` in `vite.config.js` sets the base path. With `base: '/lorraine-commons/'`, all paths start with the name of the subfolder. With `base: './'`, Vite writes relative paths that work in any folder. For an SPA with routes on the hash that's enough. The router with nice addresses from part 6, on the other hand, needs the absolute path.

## The network panel

In the network panel of the DevTools you see every request of the page with address, status, type, size and time. Load the app once with `npm run dev` and once with `npm run preview` and compare. During development many single modules appear, in the build only a few files. In both cases the request to `/items` goes to Vite, which forwards it.

Two settings help when checking. With "Disable cache", the browser loads everything anew, as on a first visit. With throttling you simulate a slow mobile connection and see the loading message that otherwise hardly shows. The filter for requests made with `fetch` hides everything else.

## In code

Work with the exercise project after you have solved the exercises. Each time, predict what will happen before you try it.

1. Change a color in `src/style.css` while the app runs with `npm run dev` and the search field contains text. What happens to the text? Then change something in `src/render.js`.
2. Create a file `.env.local` with `VITE_CATALOG_URL=/items?delay=3000` and restart `npm run dev`. What does the app show for three seconds? And with `?status=503`?
3. Stop the small server. What does the app show, and what does Vite report in the terminal?
4. Build the app once without `base` and once with `base: './'` and compare the paths in `dist/index.html`.

## Exercises

The exercises move the SPA from the last chapter to Vite. You find the project in the course repo in the folder `exercises/02-spa/vite/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

For the app itself you need two terminals, one with `npm run server` and one with `npm run dev`. Until the proxy is in place, an error message appears instead of the catalog.

::::exercise[Getting started]
Add the proxy to `vite.config.js`, so that requests to `/items` end up at the small server on port 3000. Then start both servers and check in the network panel that the request to `/items` comes back with status 200.

:::solution[Solution]
::code{file="exercises/02-spa/vite/solution/{lang}/vite.config.js"}

The rule under `server.proxy` forwards every request whose path starts with `/items` to the small server. The network panel still shows `localhost:5173` as the address, and the browser notices nothing of the forwarding. The option `base` belongs to the challenge.
:::
::::

::::exercise[Going further]
Change `src/app.js` so that the app reads the address of the catalog from `import.meta.env.VITE_CATALOG_URL` and takes `/items` if the variable is missing. Describe the variable in a file `.env.example` with the value `/items`. Try it with a file `.env.local` and `?delay=3000`.

:::solution[Solution]
::code{file="exercises/02-spa/vite/solution/{lang}/src/app.js" lines="47-56"}

`??` applies when the variable is missing, so the app also runs without a file `.env.local`. The file `.env.example` is shown earlier in the chapter. After changing an `.env` file you have to restart `npm run dev`, since Vite reads it only on start.
:::
::::

::::exercise[Challenge]
The app should run on GitHub Pages at `https://name.github.io/lorraine-commons/`. Set a base path in `vite.config.js` with which the build works in this subfolder, and check the paths in `dist/index.html` after `npm run build`.

:::solution[Solution]
The solution of the first exercise contains the line `base: './'`. After that, the paths in `dist/index.html` start with `./assets/`, and the app finds its files in any folder. `base: '/lorraine-commons/'` works as well, but it is tied to the name of the repo. The test really builds the app and checks the path of the script in `index.html`. For Vue Router with addresses without `#`, part 6 needs the absolute path.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `index.html` opened directly from the folder in the browser, and the page stays empty. | Open the app with `npm run dev` or `npm run preview`. |
| The code says `process.env.VITE_CATALOG_URL`, and in the browser `process` isn't defined. | In Vite it's `import.meta.env`. |
| A variable without `VITE_` at the start is `undefined` in the code. | Start the name with `VITE_`. Only such variables reach the code. |
| An API key sits in a variable with `VITE_`. | Never put secrets into code that runs in the browser, they belong on a server. |
| The app requests `/items`, and Vite reports a proxy error in the terminal. | The small server isn't running. Start it with `npm run server`. |
| On GitHub Pages the built app doesn't find its files. | Set `base` and build again. |
| An AI assistant suggests Create React App, the Vue CLI or webpack for a new project. | These tools are hardly developed anymore. New projects start with Vite. |

## Self-check

::::selfcheck
1. What does Vite do during development, and what at build time?
2. Why does a change to the CSS appear without a reload, but a change to `render.js` with one?
3. Which environment variables reach the browser, and what must never be in one?
4. What is the option `base` for?

:::solution[Answers]
1. During development, Vite delivers the modules one by one, transforms them where needed and loads changes right away. At build time it bundles everything into a few files in `dist`, with a hash in the name.
2. Vite can swap CSS while the app runs. For a module of JavaScript without a framework it doesn't know how, so it reloads the page.
3. Only variables whose name starts with `VITE_`. Their values end up in code that anyone can read, so no secrets belong in them.
4. It sets the path under which the app lives, so that the build finds its files in a subfolder as on GitHub Pages too.
:::
::::

:::assignment
The app runs with Vite, loads changes right away and can be built. Martina Hostettler is happy, but the volunteer added a warning. "With every new feature, with filters, reservations and favorites, it gets harder to keep the page in step with the data by hand." So in part 3 the catalog moves to Vue. Before that, use the [competence grid](../competences/) to check whether you are ready for part 3.
:::
