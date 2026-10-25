---
title: The same app in React
description: The catalog with search and favorites in React, with useState, props, a function as a prop and a test without an extra library.
sidebar:
  order: 10
---

The chapter [Frameworks compared](../../vue/frameworks/) set Vue, React and Angular side by side. This page shows the catalog of Lorraine Commons with search and favorites in React, just as parts 3 to 5 built it in Vue. In React a component is a function that returns JSX, a syntax that looks like HTML but is JavaScript.

## In your project

According to the [project assignment](../../project/assignment/), you choose the framework of your project yourself. React pays off if you need it at work or already know it. You know components, props, state, derived values and routing from the course, only the names and some rules change. The table in the section [Transfer](../../vue/frameworks/#transfer) maps the terms onto each other.

For a new project, [react.dev](https://react.dev/learn/creating-a-react-app) recommends a framework such as Next.js or React Router. You can also build an SPA without a server of its own with Vite, as the example does. Some rules differ from Vue. You never change state directly but set a new value with the function from `useState`, a copy in the case of an array. You only call Hooks like `useState` at the top level of the component and never inside a condition, and you only need `useEffect` to keep the component in sync with something outside React.

## A small example

The example lives under `optional/react/en` and runs with Vite. `useState` returns the current value and a function that sets a new one. React then runs the whole function `App` again and draws what has changed. A derived value such as the hits of the search therefore needs no `computed`, it is simply computed on every run. The search field is controlled, its value comes from the state, and `onChange` reports every keystroke.

::code{file="optional/react/{lang}/src/App.jsx"}

The card gets its props as one object. Instead of emitting an event, it calls the function that the parent gave it as a prop. That way `App` keeps holding the state of the favorites, as in the chapter [State in the right place](../../state/where-state-belongs/).

::code{file="optional/react/{lang}/src/ItemCard.jsx"}

The test renders the app with `createRoot` into an element of happy-dom. `act` makes sure that React has finished all changes before the test checks anything. Larger projects usually use React Testing Library, which makes it easier to find elements and to type.

::code{file="optional/react/{lang}/tests/app.test.jsx" lines="1-25"}

## Official links

- [react.dev, Learn React](https://react.dev/learn)
- [react.dev, build a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch)
- [react.dev, act](https://react.dev/reference/react/act)
- [Vite, getting started](https://vite.dev/guide/)
