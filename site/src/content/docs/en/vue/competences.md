---
title: Competence grid for part 3
description: What you can do after part 3 and how to check it yourself, plus the state of the app after part 3.
sidebar:
  label: Competence grid
  order: 6
---

Use this grid to judge whether you are ready for part 4. Read each row and solve the check task next to it without looking anything up. If it feels easy, you have reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check task | Look it up |
|---|---|---|
| compare Vue, React and Angular by criteria | Explain in three sentences what speaks for Vue and what for React when an association with changing volunteers builds an app. | [Frameworks compared](../frameworks/) |
| read survey numbers together with their source | Explain why the downloads of a package don't show the number of people who use it. | [Frameworks compared](../frameworks/#spread) |
| create a project with create-vue and explain its files | Create a project and explain what `index.html`, `src/main.js` and `src/App.vue` do. | [The first project](../first-project/) |
| write a single file component with a style of its own | Write a component whose heading is red without coloring the other headings of the app. | [The first project](../first-project/#using-components) |
| use the Vue DevTools | Find the state of a component in the DevTools and change a value in it. | [The first project](../first-project/#the-vue-devtools) |
| show values with interpolation and `v-bind` | Show a link for a thing whose address contains its id. | [Template syntax](../template-syntax/#binding-attributes) |
| render lists and conditions | Show only the things on loan without putting `v-if` and `v-for` on the same element. | [Template syntax](../template-syntax/#lists) |
| react to events and use modifiers | Write a link that counts a number up without the browser following it. | [Template syntax](../template-syntax/#events) |
| hold state with `ref` and `reactive` | Explain why `const { query } = filters` breaks the search. | [Reactive state](../reactive-state/#reactive) |
| derive values with `computed` | Calculate the number of tools that are in right now. | [Reactive state](../reactive-state/#computed) |
| bind fields with `v-model` and modifiers | Bind a text field for the number of days so that a number arrives in the ref. | [Forms](../forms/#modifiers) |
| check input and show messages accessibly | Connect an error message to its field so that a screen reader reads it out. | [Forms](../forms/#checking-input) |

For part 4 you mainly need single file components, the template syntax and `ref` with `computed`.

## The app after part 3

What Martina Hostettler's assignments in this part added up to is in the course repo in the folder `case/03-vue/en`. The app shows the catalog with a search, a filter by category and the number of things that are in. Every thing has a page of its own with the form for the reservation request. The rules of the request are in `src/reservation.js`, everything else in `src/App.vue`. The tests in the folder `tests` check the wishes from this part.

```bash
npm install
npm test
```

For the app, start the small server in one terminal and Vite in a second one, as in part 2.

```bash
npm run server
npm run dev
```

If you didn't finish everything in part 3, start part 4 from this state.
