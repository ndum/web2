---
title: Competence grid for part 2
description: What you can do after part 2 and how to check it yourself, plus the state of the app after part 2.
sidebar:
  label: Competence grid
  order: 4
---

Use this grid to judge whether you are ready for part 3. Read each row and solve the check task next to it without looking anything up. If it feels easy, you have reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check task | Look it up |
|---|---|---|
| explain how a multi-page website and an SPA load pages | Draw the requests of both ways of building for three clicks. | [Web pages and web apps](../web-pages-and-web-apps/) |
| place server-side rendering and statically generated pages | Explain when the pages of this course site are created. | [Web pages and web apps](../web-pages-and-web-apps/#pages-on-the-server-and-ahead-of-time) |
| name the costs of an SPA and justify a decision | Explain in three sentences whether the page of a sports club should be an SPA. | [Web pages and web apps](../web-pages-and-web-apps/#the-costs-of-an-spa) |
| build an interface from state and a render function | Build a counter whose button changes only the state. | [An SPA by hand](../spa-by-hand/) |
| insert text into HTML safely | Explain what happens to a name like `<b>Tent</b>` without `escapeHtml`. | [An SPA by hand](../spa-by-hand/#the-render-function) |
| build a router on the hash | Add a route `#/about` with a view of its own. | [An SPA by hand](../spa-by-hand/#a-router-on-the-hash) |
| explain where updating by hand reaches its limits | Explain why the search field in the example loses its focus. | [An SPA by hand](../spa-by-hand/#the-limits-of-handwork) |
| start, build and check a project with Vite | Build the app, name the files in `dist` and start the preview. | [Tools](../tools/#build-and-dist) |
| forward requests with a proxy and move addresses into environment variables | Change the address of the catalog with a file `.env.local` without changing the code. | [Tools](../tools/#environment-variables) |
| set the base path for a subfolder | Explain why the built app stays empty on GitHub Pages without `base`. | [Tools](../tools/#the-base-path) |
| examine requests in the network panel | Use throttling to show the loading message of the catalog. | [Tools](../tools/#the-network-panel) |

For part 3 you mainly need the idea of state and render function and a Vite project that runs.

## The app after part 2

What Martina Hostettler's assignments in this part added up to is in the course repo in the folder `case/02-spa/en`. The app shows the catalog with a search and a page of its own for every thing, built with Vite and without a framework. The tests in the folder `tests` check the wishes from the chapters "An SPA by hand" and "Tools".

```bash
npm install
npm test
```

If you didn't finish everything in part 2, start part 3 from this state.
