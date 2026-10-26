---
title: Frameworks compared
description: Vue, React and Angular compared by five criteria, survey numbers and their limits, the concepts that carry over, and the free choice in the project.
sidebar:
  order: 1
---

:::assignment
The volunteer's warning from part 2 made an impression. The catalog is moving to a framework, and three names keep coming up in the association, Vue, React and Angular. Before the volunteers get going, the board wants to understand the choice.

> As the board, we want to know which framework the app will be built with and why, so that we can still find volunteers to work on it a few years from now.

The acceptance criteria for your answer are:

1. It compares Vue, React and Angular by the same criteria.
2. Numbers on how widespread they are name their source and year.
3. It says what a later switch of framework would cost and what would carry over.
:::

:::goals
After this chapter you can

- explain what work a framework takes off an SPA,
- compare Vue, React and Angular by entry barrier, scope, visibility of the concepts, spread and transfer,
- read survey numbers together with their source and name their limits,
- map the terms of Vue to those of React and Angular.
:::

## The work of a framework

In part 2 you saw where the SPA built by hand runs into limits. Every change rebuilds the whole page, the search field loses its focus, and every piece of text needs `escapeHtml`. A framework for user interfaces takes exactly this work off your hands. You describe what the page looks like for a given state, and the framework keeps the page in step with the state. It changes only what has changed, always inserts text safely and leaves input fields alone while someone is using them. On top of that come components, which let you split an interface into parts you can use in several places.

Three frameworks are especially widespread. React comes from Meta, back then still Facebook, and has been public since 2013. Evan You released Vue in 2014. It is an independent project that lives on donations and sponsors. Angular comes from Google and appeared in 2016 as a complete rewrite of the older AngularJS. All three are open source and can handle the same tasks. They differ in what they bring along and in how much they prescribe.

## Entry barrier

A component in Vue is a file ending in `.vue` that combines HTML, JavaScript and CSS in three blocks. The template is ordinary HTML with a few additions such as `v-if` or `{{ }}`. If you know HTML, CSS and JavaScript, you can read such a file from day one.

React describes the interface in JSX, an extension of JavaScript that puts HTML-like tags into the code. A component is a function that runs again whenever its state changes. State lives in hooks such as `useState`, which follow fixed rules. They must not be called inside a condition, for example.

Angular works with TypeScript, classes and decorators such as `@Component`. Dependency injection and fixed conventions for the structure of a project come on top. That helps large teams, but it takes more knowledge before the first component runs.

## Scope of the official ecosystem

An SPA needs more than components, namely routing, shared state, build tools and tests. In Vue, Vue Router, Pinia for state, the Vue DevTools and Vue Test Utils all come from the Vue team. Evan You originally built the build tool Vite for Vue, and today other frameworks use it too.

React itself is a library for components. Routing, state, data loading and the build come from other projects. For a new app, the documentation on [react.dev](https://react.dev/learn/creating-a-react-app) recommends a framework such as Next.js or React Router that brings these parts along. Angular, on the other hand, ships everything from one source, a router, forms, an HTTP client, testing tools and a command line tool.

## Visibility of the concepts

In Vue the code shows what is reactive. A value the page should react to is created with `ref`, a derived value with `computed`. Vue keeps track of which parts of the page read which values and updates only those. The chapter "Reactive state" and part 5 look at this more closely.

When something changes, React runs the whole component function again and compares the result with the previous one. To keep this from doing too much work, there are helpers such as `useMemo` and, since 2025, the React Compiler, which applies such optimizations automatically. For several versions now, Angular has built on signals, which resemble `ref` and `computed` in Vue, and since version 21 new apps run without the library Zone.js, which used to detect changes.

## Spread

Surveys among developers and download counts show how widespread a framework is.

![Usage and satisfaction of React, Vue and Angular. Two bar charts on a scale from 0 to 100%. At the top the Stack Overflow survey of 2026, share of the answers that use the framework, React 41.5, Vue.js 17.2 and Angular 16.0%. At the bottom State of JS 2025, share of the users who would use the framework again, React 72, Vue.js 84 and Angular 48%.](../../../../assets/figures/en/p3c1-surveys.svg)

In the [2026 Developer Survey by Stack Overflow](https://survey.stackoverflow.co/2026/technology/data), 10,281 people answered the question on web frameworks. 41.5% had done extensive development work in React over the past year, 17.2% in Vue and 16.0% in Angular. In the [2025 survey](https://survey.stackoverflow.co/2025/technology), React also led among professional developers, with 46.9% compared to 19.8% for Angular and 18.4% for Vue.

[State of JS 2025](https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/), with 13,002 responses, also asks whether people would use a framework again. Of those who had used it, 84% would use Vue again, 72% React and 48% Angular. On npm, the registry of JavaScript packages, the package `react` was downloaded about 224 million times in the week starting September 29, 2026, `vue` about 20 million times and `@angular/core` about 7 million times.

Such numbers have limits. Only people who hear about a survey and feel like answering take part, and every survey reaches a different audience. State of JS asks whether someone has ever used a framework, Stack Overflow what someone did extensive work in over the past year. Downloads count every installation, including automated ones on build servers and installations as a dependency of other packages. So the numbers point in a direction rather than measure anything precisely. The direction is clear. React is by far the most widespread, Vue and Angular are roughly level, and people who use Vue tend to stick with it.

## Transfer

Once you master one framework, you find the same ideas in the others under different names. The table maps the terms of this course to those of React and Angular.

| Concept | Vue | React | Angular |
|---|---|---|---|
| Component | single file component, `.vue` | function that returns JSX | class with `@Component` |
| Reactive state | `ref` | `useState` | `signal` |
| Derived value | `computed` | `useMemo` or computed directly | `computed` |
| Data for child components | props with `defineProps` | props | `input()` |
| Message to the parent | events with `defineEmits` | function passed as a prop | `output()` |
| Condition in the template | `v-if` | `&&` or `? :` in JSX | `@if` |
| List | `v-for` with `:key` | `map` with `key` | `@for` with `track` |
| Inserting content | slots | `children` | `<ng-content>` |
| Routing | Vue Router | React Router or a framework | Angular Router |

So the concepts come with you, while the syntax and the quirks are new. A switch mainly costs the code that has to be rewritten and the experience with the tools. What a component should do, how data flow and where state lives stay the same.

## The choice for Lorraine Commons

This course uses Vue. For people who know HTML, CSS and JavaScript, it has the shortest way in, router, state and tools come from one team, and reactivity is visible in the code. That way you learn the concepts without having to learn JSX, TypeScript or dependency injection at the same time. That React is used more often belongs in an honest answer.

For the project at the end of the module, you choose the framework yourself, as long as the result is an SPA with routing in the browser. Two optional topics later show the same app in React and in Angular.

## Common mistakes

| Mistake | What helps |
|---|---|
| A survey number gets passed on without source and year. | Always name the source, the year and the exact question, because the numbers change every year. |
| Downloads are read as the number of people using a framework. | Downloads count installations, automated ones included. They show a direction, not a head count. |
| One framework is considered the best. | Base the criteria on the task and the team, not on a ranking. |
| People claim that Vue teaches you nothing about React or Angular. | Components, props, events, state and routing exist everywhere, only the names change. |
| An AI assistant produces examples for Vue 2, for instance with `new Vue()` or the Options API. | Insist on Vue 3 with `<script setup>`. Vue 2 has not been maintained since the end of 2023. |
| An AI assistant quotes numbers on how widespread frameworks are. | Check the numbers at the source. An assistant only knows the state of its training data. |

## Exercises

::::exercise[Getting started]
One volunteer knows React, another one Angular. Name the Vue counterpart of `useState`, `@for`, `input()`, `children` and `signal`, and of a function that a parent component passes to its child component as a prop.

:::solution[Solution]
`useState` and `signal` correspond to `ref`, `@for` corresponds to `v-for`, and `input()` corresponds to a prop declared with `defineProps`. `children` corresponds to a slot. A function passed as a prop plays the role in React that an event with `defineEmits` plays in Vue. The child component reports something, and the parent decides what happens.
:::
::::

::::exercise[Going further]
Write the answer to the board of Lorraine Commons, six to ten sentences long. It meets the three acceptance criteria of the assignment.

:::solution[Solution]
For example this answer.

> We compared Vue, React and Angular by entry barrier, scope, spread and transfer. Vue is the quickest to learn for people who know HTML, CSS and JavaScript, and its router, state management and tools come from the same team. React is the most widespread. In the 2026 Developer Survey by Stack Overflow, 41.5% used it, compared to 17.2% for Vue. For routing and state, however, React relies on additional projects. Angular brings everything along but requires TypeScript and more prior knowledge. In State of JS 2025, 84% of those who had used Vue would use it again. We recommend Vue because new volunteers can get started quickly. If the association switched later, the code would have to be rewritten, but the split into components, the data and the workflows would stay the same.

The answer gives a source and a year for every number, does not hide React's strength and answers the question about switching.
:::
::::

::::exercise[Challenge]
In State of JS 2025, 52% have used Vue, while in the 2026 Developer Survey by Stack Overflow it is 17.2%. Explain the difference with at least two reasons and derive a rule for dealing with such numbers.

:::solution[Solution]
The surveys reach different audiences. State of JS mostly draws people who are interested in JavaScript and who often try several frameworks. Stack Overflow reaches developers of every kind, including many who never build user interfaces. The two surveys also ask different things. State of JS wants to know whether someone has ever used a framework, Stack Overflow what someone did extensive work in over the past year. That leads to a rule. Don't compare numbers from different surveys directly, compare only within the same survey, and always state who was asked and what.
:::
::::

## Self-check

::::selfcheck
1. Compared with the SPA built by hand in part 2, what work does a framework take off an SPA?
2. How do Vue, React and Angular differ in the scope of their official ecosystem?
3. Why do npm download counts say little about how many people use a framework?
4. What are `ref`, `v-for` and props called in React and in Angular?

:::solution[Answers]
1. It keeps the page in step with the state, changes only what has changed, inserts text safely and leaves input fields alone. Components come on top.
2. In Vue, the router, state management, DevTools and testing tools come from the Vue team. React is a library for components, and the rest comes from other projects or from a framework such as Next.js. Angular ships everything from one source.
3. They count installations, including automated ones on build servers and installations as a dependency of other packages.
4. `ref` is `useState` in React and `signal` in Angular. `v-for` corresponds to `map` in JSX and to `@for`. Props are also called props in React and `input()` in Angular.
:::
::::

:::assignment
The board follows the recommendation, and the catalog moves to Vue. Martina Hostettler replies with a single sentence. "Then go ahead, and do it in a way the next volunteer can find their way around." In the next chapter you set up the project.
:::
