---
title: Exam
description: Frame, competences, subject areas and learning goals of the practical exam after part 7.
---

After part 7 you take a practical exam in lessons 29 and 30. It lasts 60 minutes and is open book, which means you may use your own notes and materials. The exam counts for 40 percent of the module grade and the [project](../project/assignment/) for the other 60 percent. There is no practice exam. This page describes the competences the exam covers and the topics and learning goals that go with them. Your teacher tells you which other aids are allowed and how the exam will run.

## Competences

The course describes nine competences. The exam covers the first seven, which you build up in parts 0 to 7. After part 7 you can

1. use the JavaScript features that SPA frameworks rely on, such as modules, destructuring, array methods and `async` and `await`,
2. explain how an SPA is built and how it works, and tell it apart from web pages that the server renders,
3. break an interface down into components and connect them with props, events and slots,
4. use the reactivity of Vue on purpose and move reusable logic into composables,
5. build client-side routing with params, nested routes and guards,
6. place state on purpose (local, global, on the server or in the address) and manage shared state with Pinia,
7. load and save data through an HTTP API and handle loading, error and empty states along the way.

You gain competences 8 and 9 in the project with part 8. You design an SPA of your own, record its decisions, test it, make it accessible and publish it. Along the way you use AI tools responsibly and review the code they generate. The project builds on competences 3 to 7.

## Subject areas and learning goals

The sections follow the parts of the course. Each one names the competences its part belongs to and sums up the learning goals of its chapters. The full list of learning goals is at the start of each chapter.

### Part 0, Getting started

Part 0 sets up your working environment. After the chapter [Setup](../start/setup/) you can install a project, start it, run its tests and read errors in the console of the DevTools. You need this for every practical task. The exam assumes the JavaScript basics that the [entry test](../start/entry-test/) asks about.

### Part 1, JavaScript for SPAs

Part 1 belongs to competence 1. Loading data with `fetch` also belongs to competence 7.

| Chapter | You can … |
|---|---|
| [Modules and packages](../javascript/modules/) | split code with `export` and `import`, describe a project with `package.json`, install packages, run scripts and explain what the lock file is for |
| [Values and references](../javascript/values-and-references/) | tell primitive values and objects apart when assigning them, make shallow and deep copies of objects and arrays and change data without changing the original |
| [Functions and arrays](../javascript/functions-and-arrays/) | read callbacks, analyze lists with `map`, `filter`, `find`, `some`, `every` and `reduce`, sort without changing the original and write functions that build functions |
| [Asynchronous JavaScript](../javascript/async/) | predict the order of timers and promises, work with `async` and `await`, load data with `fetch`, tell server errors from network errors, show loading and error states and abort requests |

### Part 2, SPA basics

Part 2 belongs to competence 2.

| Chapter | You can … |
|---|---|
| [Web pages and web apps](../spa/web-pages-and-web-apps/) | explain how a multi-page website and an SPA load pages, place server-side rendering and statically generated pages, name the costs of an SPA and decide with reasons whether an SPA is worth it |
| [An SPA by hand](../spa/spa-by-hand/) | build an interface from state and a render function, change the state through events, insert text safely into HTML and build a router on the hash of the address |
| [Tools](../spa/tools/) | develop and build an SPA with Vite, explain the dev server and hot module replacement, forward requests through a proxy, set environment variables and the base path and inspect requests in the DevTools |

### Part 3, Getting started with Vue

Part 3 lays the groundwork for competences 3 and 4.

| Chapter | You can … |
|---|---|
| [Frameworks compared](../vue/frameworks/) | explain the work a framework takes off an SPA, compare Vue, React and Angular, read survey numbers together with their limits and match the terms of the three frameworks |
| [The first project](../vue/first-project/) | create a project with create-vue, explain its files, write a single file component, explain `createApp` and `mount` and use the Vue DevTools |
| [Template syntax](../vue/template-syntax/) | bind values, attributes, classes and styles, show things conditionally with `v-if` and `v-show`, render lists with `v-for` and `key` and react to events with `v-on` |
| [Reactive state](../vue/reactive-state/) | explain why a plain variable does not update the page, hold state with `ref` and `reactive`, derive values with `computed` and choose between a function and a computed value |
| [Forms](../vue/forms/) | bind fields with `v-model` and its modifiers, submit a form with `@submit.prevent`, validate input and show errors so that everyone notices them |

### Part 4, Components

Part 4 belongs to competence 3.

| Chapter | You can … |
|---|---|
| [Breaking down an interface](../components/breaking-down/) | break an interface down into a tree of components with one job each, name and file the components and decide which component owns a piece of state |
| [Props](../components/props/) | declare props and their types with `defineProps`, pass values as text or as expressions, use required props and defaults and explain why data only flows from parent to child |
| [Events and v-model](../components/events-and-v-model/) | declare, emit and validate events with `defineEmits`, react to them in the parent and implement `v-model` on your own components with `defineModel` |
| [Slots](../components/slots/) | pass content through default slots, fallback content, named slots and scoped slots and build a page frame and an accessible dialog |
| [Provide and inject](../components/provide-and-inject/) | provide values with `provide` and receive them with `inject`, keep the keys in a file of their own, apply the rules for designing components and move content with `Teleport` |

### Part 5, Reactivity and composables

Part 5 belongs to competence 4.

| Chapter | You can … |
|---|---|
| [Reactivity in detail](../reactivity/in-detail/) | explain how Vue tracks dependencies, find bugs with copied values and replaced objects, keep fields connected with `toRef` and `toRefs`, use `shallowRef` and wait for the updated page with `nextTick` |
| [Watchers](../reactivity/watchers/) | react to changes with `watch` and `watchEffect`, use the options `immediate`, `deep` and `once`, clean up with `onWatcherCleanup` and choose between `computed`, `watch` and `watchEffect` |
| [Lifecycle and template refs](../reactivity/lifecycle/) | name the hooks of a component in order, reach elements with `useTemplateRef`, set the focus and add and clean up listeners and timers |
| [Composables](../reactivity/composables/) | move state and logic into a composable, follow the rules for names, calls and return values, accept arguments with `toValue` and judge when a library such as VueUse fits |

### Part 6, Routing

Part 6 belongs to competence 5.

| Chapter | You can … |
|---|---|
| [Vue Router](../routing/vue-router/) | set up an app with Vue Router, show pages with `RouterView` and link them with `RouterLink`, name routes, style active links and tell history mode from hash mode |
| [Params and query](../routing/params-and-query/) | define and read routes with params, pass params as props, read and write the query and navigate with `router.push` and `router.replace` |
| [Nested routes and layouts](../routing/nested-routes/) | build child routes and layouts with their own `RouterView`, set a start page for a section and tell active links from exactly active ones |
| [Navigation guards](../routing/navigation-guards/) | describe how a navigation runs, write global guards and guards for single routes, return to the original target after signing in and explain why a guard in the browser protects no data |
| [Lazy loading and 404](../routing/lazy-loading-and-404/) | define a route for unknown addresses, load routes on demand, control scrolling with `scrollBehavior` and set the title and the focus after a navigation |

### Part 7, State and data

Part 7 belongs to competences 6 and 7.

| Chapter | You can … |
|---|---|
| [State in the right place](../state/where-state-belongs/) | tell local, shared and global state, data from the server and state in the address apart, lift state into the parent or move it into a module and explain when an app needs no store |
| [Pinia](../state/pinia/) | set up Pinia, write a setup store with state, getters and actions, take it apart with `storeToRefs`, use it in other stores and in guards and test stores |
| [Data from an API](../state/data-from-an-api/) | load data in an action, show loading, error and empty states, send data as JSON, evaluate the answers of the API, abort requests and explain when CORS is needed |
| [Persistence](../state/persistence/) | keep values as JSON in `localStorage` and `sessionStorage`, connect a store to the browser storage, keep tabs in sync, explain what never belongs in that storage and ask the server about a sign-in after a reload |

## Not part of the exam

The exam leaves out the two deep dives [Proxies and getters](../javascript/proxies/) and [Server state libraries](../state/server-state/), the optional topics and part 8. The [JS workshop](../js/) is not a subject area of its own, but you need its basics in every task.

## Preparation

Every part ends with a competence grid. Solve its check tasks without looking anything up and go back over the rows where you are unsure. The grids of parts 0 to 7 are on these pages.

- [Competence grid for part 0](../start/competences/)
- [Competence grid for part 1](../javascript/competences/)
- [Competence grid for part 2](../spa/competences/)
- [Competence grid for part 3](../vue/competences/)
- [Competence grid for part 4](../components/competences/)
- [Competence grid for part 5](../reactivity/competences/)
- [Competence grid for part 6](../routing/competences/)
- [Competence grid for part 7](../state/competences/)

The folder `case` in the course repo holds the state of the case app after every part. There you can see what the assignments of Martina Hostettler look like as finished code. In lesson 29 there is time for your questions before the exam, so bring the ones the grids raised.

Since you may use your own materials, it pays to keep them in order. File your solutions to the exercise projects and your notes so that you find them quickly. Looking things up helps with details, but 60 minutes leaves no time to learn a topic from scratch.
