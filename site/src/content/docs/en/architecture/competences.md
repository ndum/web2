---
title: Competence grid for part 8
description: What you can do after part 8 and how to check it yourself, plus the state of the app after part 8.
sidebar:
  label: Competence grid
  order: 8
---

Use this grid to judge whether you can apply the chapters of part 8 in your project. Read each row and solve the check next to it without looking anything up. If it comes easily, you've reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check | Look it up |
|---|---|---|
| organize an app by feature | Sort an app with a catalog and favorites by feature and explain where the card of a thing belongs. | [Project structure and layers](../structure-and-layers/#folders-by-feature) |
| name the layers of an SPA | Draw the layers of the running case app and the direction of their imports. | [Project structure and layers](../structure-and-layers/#layers) |
| check the rules of the structure with a test | Write a test that reports `fetch` outside of `src/api`. | [Project structure and layers](../structure-and-layers/#checking-the-rules) |
| separate presentational and container components | Make a card independent of every store. | [Design patterns in SPAs](../design-patterns/#presentational-and-container-components) |
| pass dependencies with `provide` and `inject` | Give a store the API through `inject` and replace it in a test. | [Design patterns in SPAs](../design-patterns/#dependencies-with-provide-and-inject) |
| write an adapter and strategies | Translate another format with an adapter and sort with a table of strategies. | [Design patterns in SPAs](../design-patterns/#an-adapter-for-the-api) |
| record an architecture decision | Write an ADR with status, context, decision and consequences. | [Recording architecture decisions](../architecture-decisions/#the-structure) |
| supersede a decision | Supersede an ADR with a new one without deleting the old one. | [Recording architecture decisions](../architecture-decisions/#a-decision-supersedes-another) |
| test components through their behavior | Test a form through input, messages and events. | [Testing](../testing/#testing-a-component) |
| test stores with a replaced `fetch` | Test a store that sends a request, without a server. | [Testing](../testing/#testing-a-store-and-replacing-fetch) |
| check my tests with mutants | Explain what a mutant that passes all tests says about your tests. | [Testing](../testing/#checking-tests-with-mutants) |
| name and label controls | Give a button that only shows a sign a name. | [Accessibility](../accessibility/#names-for-buttons-and-links) |
| set the focus after a change | Move the focus to the next entry after removing one. | [Accessibility](../accessibility/#the-focus-after-a-change) |
| announce status messages | Announce the number of hits in a live region. | [Accessibility](../accessibility/#status-messages) |
| build an SPA for GitHub Pages | Set the base path and `404.html` for a project page. | [Build and deployment](../build-and-deployment/#a-fallback-page-for-github-pages) |
| use environment variables and modes | Explain which files `vite build --mode demo` reads and what of them reaches the browser. | [Build and deployment](../build-and-deployment/#environment-variables-and-modes) |
| write a workflow that tests, builds and publishes | Write a workflow for GitHub Pages that publishes nothing when a test fails. | [Build and deployment](../build-and-deployment/#a-github-actions-workflow) |
| spot and translate Vue 2 patterns | Translate a filter and `this` in `<script setup>` into Vue 3. | [Reviewing AI-generated code](../reviewing-ai-code/#vue-2-patterns) |
| fix lost reactivity and changed props | Find a store that was taken apart directly and a changed prop in suggested code. | [Reviewing AI-generated code](../reviewing-ai-code/#lost-reactivity) |
| check suggested code with a checklist | Check a piece of Vue code with the checklist and name the source of every finding. | [Reviewing AI-generated code](../reviewing-ai-code/#a-checklist) |

These rows describe what your project should show. You design your own SPA, document it, test it, make it accessible and publish it, and you use AI tools responsibly. The exam doesn't cover part 8.

## The app after part 8

What Martina Hostettler's assignments in this part have led to is in the folder `case/08-architecture/en` of the course repo. The files are organized by feature, only `src/api` talks to the server, and the stores get the API from `main.js`. The decisions are in `docs/adr`. The app works with the keyboard and a screen reader, and the [demo](../../../demo/en/) runs without a server on the course site. The tests in the folder `tests` check the wishes from all parts, plus the rules of the structure and the accessibility.

```bash
npm install
npm test
npm run demo
```
