---
title: Build and deployment
description: The build of an SPA, the base path and a fallback page for GitHub Pages, environment variables and modes of Vite, a stand-in for the API for a demo and a GitHub Actions workflow that tests, builds and publishes.
sidebar:
  order: 6
---

:::assignment
Martina Hostettler wants to show the app at the general meeting, and the members should be able to try it out on their own afterwards.

> As a board member, I want to show the app publicly at a fixed address, so that the members can try it out at the meeting and afterwards.

The association doesn't have a server yet. The volunteer also wants no change to go online whose tests fail. The acceptance criteria are:

1. The app is publicly reachable at a fixed address.
2. It runs without the course API, with data to try out.
3. Every change on `main` goes online by itself once the tests pass.
:::

:::goals
After this chapter you can

- explain the build of an SPA and its output,
- set up the base path and a fallback page for GitHub Pages,
- use environment variables and modes of Vite,
- use a stand-in for the API for a demo,
- write a GitHub Actions workflow that tests, builds and publishes.
:::

## The build

`npm run build` turns the sources into the folder `dist` with `index.html` and the files in `assets`, whose names carry a hash, as in chapter 2.3. In the running case app, the team area sits in files of its own that only load when someone opens it. `npm run preview` shows the build locally. According to the [Vite documentation](https://vite.dev/guide/static-deploy.html), that's only for checking and isn't a server for production. `dist` gets served by a host for static sites.

## The base path

A project page on GitHub Pages lives at `https://name.github.io/repo/`, so in a subfolder. According to its documentation, Vite then sets `base` to `/repo/`, and the router takes over the path with `import.meta.env.BASE_URL`, as chapter 6.1 showed. Instead of in `vite.config.js`, you can also pass the path when building, with `vite build --base /repo/`.

## A fallback page for GitHub Pages

GitHub Pages only knows the files in `dist`. When someone opens `/repo/items/6` directly, there's no such file. According to the [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site), Pages then shows the file `404.html`, if a project has one. If it's a copy of `index.html`, the app starts there, and the router shows the page for the address. A small Vite plugin creates the copy with every build.

::code{file="exercises/08-architecture/deployment/solution/{lang}/vite.config.js" lines="9-28"}

Other providers like Netlify or Vercel send every address to `index.html` with rules of their own, and their documentation describes them.

## Environment variables and modes

According to the [Vite documentation](https://vite.dev/guide/env-and-mode.html), Vite reads variables from `.env`, from `.env.local` and from a file for the mode, such as `.env.demo`. The file for the mode wins over the general files, and variables that are already set in the shell at startup win over all files. `npm run dev` runs in the mode `development`, `npm run build` in the mode `production`, and `--mode demo` picks a mode of your own. Only variables that start with `VITE_` make it into the code in the browser, and they're readable in the built files afterwards. So an API key or a password never belongs in such a variable.

## A stand-in for the API for the demo

The demo of the running case app runs in the mode `demo`. Its file sets two variables.

::code{file="case/08-architecture/{lang}/.env.demo"}

`VITE_API=memory` gives the stores the stand-in for the API from chapter 8.2, which keeps the catalog, the login and the requests in the browser's memory. `VITE_HISTORY=hash` makes the router keep the path behind `#`.

::code{file="case/08-architecture/{lang}/src/router/index.js" lines="13-18"}

The reason for hash mode is where the demo lives. It sits in a folder of the course site, and a site on GitHub Pages has only one `404.html`, which belongs to the course here. With the hash, the browser only asks the server for the folder of the demo, and every address also works on a reload. The demo also shares its origin with the course site, and with it the browser's storage. That's why favorites from the examples of chapter 7.4 show up in the demo too. The same goes for all project pages of one account on GitHub Pages, which live at the same address `name.github.io`. So keys in `localStorage` need a name that belongs to the app.

Another kind of stand-in intercepts requests in the network instead of in the code. [Mock Service Worker](https://mswjs.io/) installs a service worker for this, and the app keeps calling `fetch`. The running case app doesn't need it, because its stores already get the API through an adapter.

## A GitHub Actions workflow

A workflow describes in a file below `.github/workflows` what GitHub should do after an event like a push. The example in the Vite documentation and the [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) use the actions `configure-pages`, `upload-pages-artifact` and `deploy-pages` for this.

![A flow from top to bottom. A push to main starts a workflow of GitHub Actions that installs the packages with npm ci, runs the tests with npm test and builds with npm run build. If a test fails, the workflow ends and nothing goes online. The folder dist goes to GitHub Pages as an artifact, and Pages serves the app at name.github.io/lorraine-commons/. On the right, an address that GitHub Pages does not know branches off, such as /lorraine-commons/items/6. For it, Pages serves the file 404.html, a copy of index.html, and the router shows the page of the thing.](../../../../assets/figures/en/p8c6-deploy-flow.svg)

::code{file="exercises/08-architecture/deployment/solution/{lang}/.github/workflows/deploy.yml"}

The job `build` tests and builds, and the job `deploy` only publishes after it. If a test fails, `build` ends and `deploy` never starts. To be allowed to publish, the workflow needs the permissions `pages: write` and `id-token: write`, and under "Settings" and "Pages" the source is set to "GitHub Actions". As in the course repo, the actions are pinned to a commit here, and the comment names the version. According to the GitHub Docs, a site on Pages is public even when the repository is private.

## The course's demo

The course site publishes the demo itself. The script `scripts/build_demo.mjs` in the course repo builds the running case app in the mode `demo` in both languages into the folder of the course site, and the course's workflow publishes it together with the pages. The [demo of the running case app](../../../demo/en/) runs without a server, and the login and the requests last until you close the tab.

## In your project

The minimum scope asks for a public deployment. Set the base path, create `404.html` if your app uses history mode, and write the workflow as soon as the first page exists, not just before handing in. Describe in the README how the app is built and published, and put one line for every environment variable in `.env.example`, without secrets.

## In code

Work with the running case app in the folder `case/08-architecture/en` of the course repo. Write down what you expect before you run anything.

1. Build the app with `npm run build` and open `dist/index.html`. Which path do the references to the files start with?
2. Build it once more with `npx vite build --base /lorraine-commons/`. What changes in `dist/index.html`?
3. Start the demo with `npm run demo` and open a thing. What does the address look like, and why?
4. Write `VITE_API=memory` into a file `.env.local` and start `npm run dev`. What changes, and what stays the same? Delete the file again afterwards.

## Exercises

The exercises get a small app with a router ready for GitHub Pages. You'll find the project in the folder `exercises/08-architecture/deployment/en` of the course repo. The tests of the first two levels build the project into a temporary folder, which takes a few seconds.

```bash
npm install
npm test
```

::::exercise[Getting started]
The app should run at `https://name.github.io/lorraine-commons/`. Set the base path in `vite.config.js` and check the paths in `dist/index.html` after `npm run build`.

:::solution[Solution]
::code{file="exercises/08-architecture/deployment/solution/{lang}/vite.config.js" lines="25-28"}

The router reads the path with `import.meta.env.BASE_URL` and needs no change of its own.
:::
::::

::::exercise[Going further]
A direct link to `/lorraine-commons/items/6` ends up on the error page of GitHub Pages. Write a plugin in `vite.config.js` that copies `dist/index.html` to `dist/404.html` after every build.

:::solution[Solution]
::code{file="exercises/08-architecture/deployment/solution/{lang}/vite.config.js" lines="9-23"}

`apply: 'build'` limits the plugin to the build. `configResolved` remembers the output folder, even when someone changes it with `--outDir`.
:::
::::

::::exercise[Challenge]
Write the workflow `.github/workflows/deploy.yml`. It starts on every push to `main`, installs with `npm ci`, tests with `npm test`, builds with `npm run build`, uploads `dist` and publishes to GitHub Pages in a job of its own.

:::solution[Solution]
The solution is above, in the section on the workflow. It only runs once the project lives in a repository of its own on GitHub and "GitHub Actions" is chosen as the source under "Settings" and "Pages".
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The published app shows a blank page. | `base` is missing or doesn't match the name of the repository. |
| A direct link to a page shows the error page of GitHub Pages. | Ship `404.html` as a copy of `index.html`. |
| An API key sits in a variable starting with `VITE_`. | Everything with `VITE_` ends up readable in the code in the browser. Secrets belong on a server. |
| The workflow publishes although tests fail. | Run `npm test` before the build, and publish in a job that waits for the build. |
| The workflow fails because permissions are missing. | Set `pages: write` and `id-token: write` and choose "GitHub Actions" as the source of Pages. |
| An AI assistant suggests Vue CLI or `vite preview` as the server for publishing. | According to its [documentation](https://cli.vuejs.org/), Vue CLI is in maintenance mode, and `vite preview` isn't a server for production. Build with `vite build` and serve from a host for static sites. |

## Self-check

::::selfcheck
1. Why does a project page on GitHub Pages need a base path?
2. What is `404.html` for, and why is a copy of `index.html` enough?
3. Which file does `vite build --mode demo` read, and which variables make it into the browser?
4. Why does the workflow publish nothing when a test fails?

:::solution[Answers]
1. It lives in a subfolder. Without a base path, the browser looks for the files of the app from the root of the domain.
2. Pages shows it for every unknown address. As a copy of `index.html`, the app starts there, and the router shows the page for the address.
3. `.env.demo`, plus `.env` and `.env.local`. Only variables that start with `VITE_` make it into the browser.
4. The tests run in the job `build`. If one fails, the job ends, and the job `deploy` waits for it in vain.
:::
::::

:::assignment
The demo runs at the general meeting, and members try it out at home afterwards. In the meantime, the new volunteer has asked an AI assistant for a list of the overdue loans for the team. The code looks reasonable, but the lists stay empty, and the console reports errors. The next chapter shows how you check code like that.
:::
