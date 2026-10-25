# 6. Folders by feature

## Status

Accepted in part 8.

## Context

The app was sorted by the kind of file in `views`, `components`, `stores` and `composables`. Whoever worked on the requests jumped between four folders, and a new volunteer could not find the parts of one function. The stores called `fetch` themselves.

## Decision

Every feature has a folder in `src/features` with its pages, its own components, its store, its routes and an `index.js` that defines what others may use of it. Shared building blocks live in `src/components`, `src/composables` and `src/utils`, only `src/api` talks to the server. A test checks these rules.

## Consequences

Whoever works on a feature finds almost everything in one folder. Imports between features go through their `index.js` and stay easy to follow. For code that two features need, someone has to decide where it belongs, and a new rule needs a change in the test.
