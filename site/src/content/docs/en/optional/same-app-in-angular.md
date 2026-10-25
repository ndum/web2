---
title: The same app in Angular
description: The catalog as Angular components with signals, inputs and outputs, checked by the Angular compiler without the CLI.
sidebar:
  order: 11
---

Angular is a complete framework from Google with a router, forms, an HTTP client and a command line tool, as the chapter [Frameworks compared](../../vue/frameworks/) describes. Components are classes with the decorator `@Component` and a template, and Angular uses TypeScript throughout. This page shows the catalog with search and favorites as two Angular components.

## In your project

According to the [project assignment](../../project/assignment/), you may use Angular in your project too. It pays off if you need it at work or want to build a larger project with firm rules. You create a new project with `ng new` after `npm install -g @angular/cli`. Since version 22, a new major version comes out once a year and is usually supported for 24 months. Before you start, check which versions of Node and TypeScript it requires, Angular 22 needs TypeScript 6.0. The table in the section [Transfer](../../vue/frameworks/#transfer) maps the terms of Vue and Angular onto each other.

## A small example

The example under `optional/angular/en` does without the CLI. `npm run build` compiles the components with the Angular compiler `ngc`, which also checks the templates against the types. To see them in the browser, copy the files of `src/app` into a project of the CLI.

Signals hold the state, much like `ref` in Vue. `signal('')` creates a value that the template reads with `query()` and the code changes with `set` or `update`. `computed` derives the hits from it. `@for` needs a key through `track`, and `@empty` shows a text when the list is empty.

::code{file="optional/angular/{lang}/src/app/catalog.ts"}

The card gets its data through `input.required()` and `input()`, and `output()` reports the click, just as `defineProps` and `defineEmits` do in Vue. Since version 19 components are standalone, which is why the card is listed in the array `imports` of the catalog.

::code{file="optional/angular/{lang}/src/app/item-card.ts"}

The compiler finds mistakes in the templates. If the card is used without the input `item`, ngc reports the error NG8008, and if `@for` lacks `track`, the error NG5002. A signal without parentheses in the template is a type error, because only the call returns the value.

## Official links

- [Angular, installation](https://angular.dev/installation)
- [Angular, tutorial in the browser](https://angular.dev/tutorials/learn-angular)
- [Angular, signals](https://angular.dev/guide/signals)
- [Angular, versions and support](https://angular.dev/reference/releases)
