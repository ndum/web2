---
title: TypeScript with Vue
description: Describing props, events and data with types, checking them with vue-tsc and picking the right version of TypeScript.
sidebar:
  order: 1
---

TypeScript adds types to JavaScript. You write down which shape a value has, and a tool checks before the app starts whether the code fits. The course uses JavaScript, but create-vue asks whether you want TypeScript when it creates a project. In a project with TypeScript, every single file component starts with `<script setup lang="ts">`.

## In your project

According to the [project assignment](../../project/assignment/), TypeScript throughout earns one bonus point. It pays off as soon as your project has more than a handful of components or gets data from an API. The editor then tells you while you type when a prop is missing, an event passes the wrong data or a field of the API has a different name. Plan some extra time, because you describe the types yourself once. Vite only translates TypeScript and checks no types, that is the job of vue-tsc.

## A small example

The example under `optional/typescript/en` is a simplified catalog in TypeScript, with cards, search and favorites as in parts 3 to 5. An interface describes a thing the way the course API delivers it.

::code{file="optional/typescript/{lang}/src/types.ts"}

The card declares its props and its event with types instead of objects like `{ type: Boolean }`. `favorite = false` in the destructured props sets the default. `defineEmits` describes the event as a list of the values it passes along.

::code{file="optional/typescript/{lang}/src/components/ItemCard.vue" lines="1-13"}

In `App.vue`, `ref` only needs a type where the initial value does not reveal it. An empty array would otherwise have the type `never[]`, and no value could go into it.

::code{file="optional/typescript/{lang}/src/App.vue" lines="1-18"}

`npm run type-check` starts vue-tsc. If the template passes a string instead of a boolean as `favorite` to the card, vue-tsc reports the error with its line and column.

```text
src/App.vue(28,33): error TS2322: Type 'string' is not assignable to type 'boolean | undefined'.
```

`npm run build` checks the types first and only builds afterwards. Watch the version of TypeScript. TypeScript 7 is a new implementation in Go that vue-tsc does not run with, and the TypeScript team advises projects with Vue to stay on version 6 for now. That is why the example uses 6.0.3. If you install TypeScript without a version, you get version 7 and vue-tsc stops.

## Official links

- [Vue documentation, TypeScript](https://vuejs.org/guide/typescript/overview.html)
- [Vue documentation, TypeScript with the Composition API](https://vuejs.org/guide/typescript/composition-api.html)
- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Announcement of TypeScript 7](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
