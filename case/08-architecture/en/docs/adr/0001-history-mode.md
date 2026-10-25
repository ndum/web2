# 1. History mode with an absolute base path

## Status

Accepted in part 6, written down in part 8.

## Context

Every page of the app gets an address of its own, such as `/items/6` for the projector. Martina Hostettler wants to send members links to single things. Vue Router has the history mode with ordinary paths and the hash mode, which hides the path behind `#`. In history mode, the browser asks the server for `/items/6` on a reload.

## Decision

The app uses `createWebHistory` with the base path of Vite. `base` is the absolute path `/`, so the browser finds the files of the app below `/items/6` as well.

## Consequences

The addresses look like those of a website and can be shared. Every server has to deliver `index.html` for unknown paths. Vite does that during development, on GitHub Pages a copy of `index.html` as `404.html` helps. The demo on the course site differs, see ADR 7.
