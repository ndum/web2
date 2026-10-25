---
title: Competence grid for part 4
description: What you can do after part 4 and how to check it yourself, plus the state of the app after part 4.
sidebar:
  label: Competence grid
  order: 6
---

Use this grid to judge whether you are ready for part 5. Read each row and solve the check task next to it without looking anything up. If it feels easy, you have reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check task | Look it up |
|---|---|---|
| break an interface down into a tree of components | Draw the tree for the page of a thing and state the task of every component in one sentence. | [Breaking down an interface](../breaking-down/#the-tree-of-components) |
| name and file components well | Explain why a component shouldn't be called `Card` and which folder `CatalogView.vue` belongs in. | [Breaking down an interface](../breaking-down/#names-and-files) |
| decide which component owns a piece of state | Explain why the favorites belong to `App` and not to the cards. | [Breaking down an interface](../breaking-down/#the-place-for-state) |
| declare and pass props | Give a card a required prop `deposit` of type `Number` and pass it correctly. | [Props](../props/) |
| emit and check events | Let a card emit `reserve` with the id on a click and check the id in the object notation. | [Events and v-model](../events-and-v-model/#checking-events) |
| implement `v-model` on my own components | Build a search field with `defineModel` and bind it with `v-model` in the parent. | [Events and v-model](../events-and-v-model/#v-model-on-your-own-components) |
| pass content with slots | Build a component with a slot that shows a fallback text without content. | [Slots](../slots/#passing-content) |
| use named and scoped slots | Let a list have its entries shaped by the parent through a scoped slot. | [Slots](../slots/#scoped-slots) |
| build an accessible dialog | Name the attributes by which a screen reader recognizes a dialog and its title. | [Slots](../slots/#a-dialog-with-slots) |
| pass values through the tree with `provide` and `inject` | Provide a value in `App` and get it three levels down without props in between. | [Provide and inject](../provide-and-inject/#provide-and-inject) |
| design components by the rules | Sort five components of the app into presentational and container components. | [Provide and inject](../provide-and-inject/#rules-for-components) |
| move content with `Teleport` | Explain why a dialog inside a card with `overflow: hidden` gets clipped and what `Teleport` changes about it. | [Provide and inject](../provide-and-inject/#teleport) |

For part 5 you mainly need `ref`, `computed`, props and events, because it is about how Vue notices changes.

## The app after part 4

What Martina Hostettler's assignments in this part added up to is in the course repo in the folder `case/04-components/en`. The app of part 3 is split into components, the pages live in `src/views` and the building blocks in `src/components`. The cards have buttons to reserve and for favorites, a dialog asks before a request is recorded, and the test member appears in the header and in the form. The tests in the folder `tests` check the wishes from this part.

```bash
npm install
npm test
```

For the app, start the small server in one terminal and Vite in a second one, as before.

```bash
npm run server
npm run dev
```

If you didn't finish everything in part 4, start part 5 from this state.
