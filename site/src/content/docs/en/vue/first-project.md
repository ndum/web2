---
title: The first project
description: Setting up a Vue project with create-vue, understanding its files, single file components, createApp and mount, the Vue DevTools and linting.
sidebar:
  order: 2
---

:::assignment
The volunteer who works as a software developer has some advice for getting started. "Set up the project with the official tool, then it looks like any other Vue project." Martina Hostettler turned that into an assignment.

> As a volunteer, I want the app to be structured like a typical Vue project, so that new volunteers can find their way around right away.

The acceptance criteria are:

1. The project is created with create-vue and uses JavaScript.
2. The start page shows the name of the association and the number of things in the catalog.
3. The opening hours live in a component of their own.
4. The Vue DevTools are available during development.
:::

:::goals
After this chapter you can

- create a project with create-vue in JavaScript and start it,
- explain the files of a Vue project and what each one is for,
- write a single file component with template, script and style,
- explain how `createApp` and `mount` get the app onto the page,
- use the Vue DevTools and the linter.

For this you need Node and npm from the chapter "Setup" and Vite from the chapter "Tools".
:::

## A project with create-vue

create-vue is the official tool for new Vue projects. It sets up a Vite project like the one you know from part 2, and first asks you what should go into it. You start it in the folder where the project should be created.

```bash
npm create vue@latest
```

The tool asks a few questions. For this course you answer them as follows, based on create-vue 3.24.0 from fall 2026.

1. Enter `lorraine-commons` as the name.
2. For "Use TypeScript?" choose No. The course uses JavaScript, and create-vue suggests TypeScript by default.
3. Among the features, select only "Linter". Router, Pinia and Vitest join in parts 6 to 8.
4. Leave the experimental features empty.
5. When asked whether to skip the example code, choose No so you can look at it.

Then install the packages and start the development server.

```bash
cd lorraine-commons
npm install
npm run dev
```

At `http://localhost:5173/` a page appears with the Vue logo and the words "You did it!".

## The files of the project

create-vue sets up more files than the SPA from part 2. You already know most of them.

| File or folder | Purpose |
|---|---|
| `index.html` | the only HTML page, with the element `<div id="app">` and the script `src/main.js` |
| `src/main.js` | starts the app with `createApp` and `mount` |
| `src/App.vue` | the top component, the app grows from here |
| `src/components/` | more components, in the example `HelloWorld.vue` and `TheWelcome.vue` |
| `src/assets/` | CSS and images that Vite processes during the build |
| `public/` | files that Vite serves unchanged, such as `favicon.ico` |
| `vite.config.js` | the configuration of Vite with the plugins for Vue and the DevTools |
| `jsconfig.json` | tells the editor where the alias `@` points |
| `package.json` | the packages and the commands `dev`, `build`, `preview` and `lint` |
| `eslint.config.js`, `.oxlintrc.json` | the rules for the linter |
| `.vscode/extensions.json` | recommends extensions for VS Code, among them "Vue (Official)" |

In the exercise projects of this part, the Vite configuration looks like this. Compared with the project from create-vue, only the `test` block for the tests has been added.

::code{file="exercises/03-vue/first-project/{lang}/vite.config.js"}

`vue()` teaches Vite to translate files ending in `.vue`. `vueDevTools()` adds the DevTools to the page during development. Under `resolve.alias` it says that `@` stands for the folder `src`.

## Single file components

A component in Vue is usually a single file component, SFC for short. A file ending in `.vue` combines up to three blocks, the template with the structure, the script with state and logic, and the style with the looks. Look at the smallest useful component and work out what it shows before you open it in the playground.

::playground{dir="examples/03-vue/first-component"}

The `<script setup>` block runs once when Vue creates the component. Everything at its top level, constants, functions and imports, is available to the template. `{{ association }}` inserts the value of the constant as text, and the next chapter covers this notation in detail. The `<style scoped>` block applies only to this component.

A browser can't do anything with a `.vue` file. Vite translates it into a JavaScript module with the plugin for Vue. The template turns into a render function that creates the elements of the page, and the style into ordinary CSS.

![How a single file component gets onto the page. On the left the file App.vue with the blocks template, script setup and style scoped. Vite translates it with the plugin for Vue into CSS and a JavaScript module with a render function. main.js imports the module, creates the app with createApp and mounts it into the element with the id app in index.html.](../../../../assets/figures/en/p3c2-sfc.svg)

## createApp and mount

The module `src/main.js` connects the component with the page.

::code{file="exercises/03-vue/first-project/{lang}/src/main.js"}

`createApp(App)` creates an app whose top component is `App`. `mount('#app')` looks for the element with the id `app` on the page and replaces its content with what the component renders. From then on, Vue keeps the page in step with the state. Between the two calls you can set up the app, and in part 6 the router gets added there, for example. The import of the CSS file brings in the rules that apply to the whole app.

## Using components

A component can use other components. You import the file in the script, and the component is available in the template as a tag of its own. In the example, `App.vue` includes the opening hours.

::playground{dir="examples/03-vue/scoped-style"}

Both components have an `h2` heading, but only the one in `OpeningHours.vue` is red. With `scoped`, Vue adds an attribute such as `data-v-7ba5bd90` to every element of the component during translation, and the same attribute to every selector in the style. So the rule only matches elements of this component.

In a project from create-vue, components live in the folder `src/components`. Instead of a path like `../components/OpeningHours.vue` you write `@/components/OpeningHours.vue`. The alias `@` always points to `src`, no matter in which folder the importing file lives. Components get multi-word names in PascalCase, such as `OpeningHours`, so they can't be confused with HTML elements. Only `App` is exempt from this.

## The Vue DevTools

While `npm run dev` is running, the page shows a small bar with two buttons at the bottom center. The button with the Vue logo opens the DevTools right inside the page. Under "Components" you see the tree of components, and next to it the state of the selected component. You can change values there too, and the page follows immediately. The button with the crosshair switches on the inspector. When you then move across the page, it shows which component an element belongs to, and a click opens the file in your editor.

The DevTools come from the plugin `vite-plugin-vue-devtools` and only run during development, the build doesn't contain them. For Chromium browsers and Firefox there is also the extension "Vue.js devtools", which adds a tab for Vue to the browser's developer tools.

## Linting

A linter reads the code without running it and reports errors and suspicious spots. When you answer "Linter", create-vue sets up two of them, the fast Oxlint and ESLint with the rules for Vue. `npm run lint` runs both, one after the other, and lets them fix whatever can be fixed automatically. What remains, they report with file, line and rule, like this.

```text
src/components/ItemList.vue
   5:7  error  'unused' is assigned a value but never used                   no-unused-vars
  10:5  error  Elements in iteration expect to have 'v-bind:key' directives  vue/require-v-for-key
```

The first message is about a variable that isn't used anywhere. The second concerns a list without a `key`, and the next chapter explains why Vue needs that key. In VS Code, the "ESLint" extension shows the same messages while you type, and "Vue (Official)" adds highlighting, completion and checks for `.vue` files. The exercise projects of this course skip the linter to keep the installation small. In your own project it is worth having.

## In code

Work with the example on the opening hours. Read both files first and write down what you expect before you change anything.

1. What color is the heading "Catalog" if you remove the word `scoped` in `OpeningHours.vue`? Try it in the playground.
2. Put `scoped` back and add a `<style>` block to `App.vue` with `h2 { color: blue; }`. Which heading turns blue, and why does the other one stay red?
3. Change the import in `App.vue` to `import Hours from './OpeningHours.vue'`. What do you have to adjust in the template?
4. Open the DevTools in your create-vue project and expand the component `TheWelcome` in the tree. How many `WelcomeItem` components does it contain, and where are they in `TheWelcome.vue`?

## Exercises

The exercises build on a project with the structure of create-vue. You find it in the course repo in the folder `exercises/03-vue/first-project/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

With `npm run dev` you see the app and the DevTools in the browser. At first all tests fail, which is intended.

::::exercise[Getting started]
In `src/App.vue`, replace the example with the start of the catalog. The main heading reads "Lorraine Commons", and below it is the number of things, such as "60 things in the catalog". You import the data with `import items from '../data/items.json'`, and the number is `items.length`.

:::solution[Solution]
The script imports the data with `import items from '../data/items.json'`. The template shows the name and the number.

::code{file="exercises/03-vue/first-project/solution/{lang}/src/App.vue" lines="11-15"}

Vite loads the JSON file as an ordinary array on import. `{{ items.length }}` is in the template so the number comes from the data and adjusts when the catalog grows.
:::
::::

::::exercise[Going further]
Create the component `src/components/OpeningHours.vue`. It shows the heading "Opening hours" and below it "Wednesday 5 to 7 p.m." and "Saturday 10 a.m. to 1 p.m.". Give it a style of its own with `scoped` and include it in `App.vue` with the alias `@`.

:::solution[Solution]
::code{file="exercises/03-vue/first-project/solution/{lang}/src/components/OpeningHours.vue"}

`App.vue` gets the import `import OpeningHours from '@/components/OpeningHours.vue'`, and the template contains `<OpeningHours />`. A component without a script doesn't need a `<script setup>` block.
:::
::::

::::exercise[Challenge]
Add a `footer` to `App.vue` that names the version of Vue and the mode in which Vite runs the app, for example "Built with Vue 3.5.44, mode development". The version comes from `import { version } from 'vue'`, and you know the mode from the chapter "Tools". What does the footer show after `npm run build` and `npm run preview`, and what in the tests?

:::solution[Solution]
::code{file="exercises/03-vue/first-project/solution/{lang}/src/App.vue"}

`import.meta.env.MODE` is `development` with `npm run dev`, `production` in the build and `test` in the tests. Vite inserts the value during translation, so the build contains a fixed "production". The constant `mode` is needed because the template only accesses values from the script and doesn't understand `import.meta`.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| You picked Yes for "Use TypeScript?" by accident, and the project contains `.ts` files. | Create the project again and choose No. The course uses JavaScript. |
| You opened `index.html` directly in the browser, and the page stays empty. | Start the app with `npm run dev`. The browser can't read `.vue` files by itself. |
| The console says `Failed to resolve component: OpeningHours`. | Import the component in the script and spell its name exactly the same in the template. |
| VS Code colors `.vue` files wrongly or reports odd errors. | Install the extension "Vue (Official)" and disable the older extension Vetur. |
| An AI assistant suggests `vue create`. | That's the Vue CLI, which is only maintained now. New projects start with `npm create vue@latest`. |
| An AI assistant writes `new Vue({ el: '#app' })` or demands a single root element in the template. | Both come from Vue 2. In Vue 3, `createApp(App).mount('#app')` starts the app, and a template may have several roots. |

## Self-check

::::selfcheck
1. How do you answer the questions of create-vue for this course, and why?
2. What are `index.html`, `src/main.js` and `src/App.vue` for?
3. What does `scoped` do in the `<style>` block?
4. What does `@` stand for in an import, and where is that defined?

:::solution[Answers]
1. TypeScript No, because the course uses JavaScript, only "Linter" among the features, because router, Pinia and Vitest come later, and keep the example code to look at it.
2. `index.html` is the only page and contains the element `#app`. `main.js` creates the app with `createApp` and mounts it there with `mount`. `App.vue` is the top component.
3. Its rules apply only to the elements of this component. For that, Vue adds a `data-v-` attribute to the elements and the selectors during translation.
4. For the folder `src`. It is defined in `vite.config.js` under `resolve.alias`, and `jsconfig.json` tells the editor.
:::
::::

:::assignment
The start page is up, and the volunteer finds his way around the files. Next, Martina Hostettler wants to see the catalog. "Show all the things with their category and whether they're in right now, like in the version built by hand." That's what the next chapter is about.
:::
