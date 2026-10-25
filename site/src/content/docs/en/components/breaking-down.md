---
title: Breaking down an interface
description: Breaking an interface down into a tree of components based on a wireframe, giving every component one task and a name, and deciding who owns which data.
sidebar:
  order: 1
---

:::assignment
The volunteer has looked through `App.vue` and made a suggestion. "Let's split the app into components, then nobody has to understand 180 lines to change the form." Martina Hostettler agrees. "As long as the members don't notice anything."

> As a volunteer, I want to split the app into small components with one task each, so that I can change one spot without understanding the rest.

The acceptance criteria are:

1. A tree shows all components of the app and the task of each one.
2. Every component has a multi-word name and a file of its own.
3. For every piece of state it is settled which component owns it.
4. Header, footer and opening hours are already components of their own, and the page looks as before.
:::

:::goals
After this chapter you can

- break an interface down into a tree of components based on a wireframe,
- give every component exactly one task and a fitting name,
- put components into files and folders,
- decide which component owns a piece of state,
- move parts that need no data into components of their own.

For this you need single file components from the chapter "The first project".
:::

## The tree of components

At the end of part 3, `App.vue` contains the catalog, the search, the filter, the page of a thing and the form with its rules. Anyone changing the form scrolls past the search, and a change in one place can hit another. That's the point at which splitting the app pays off.

The easiest way is to start from a wireframe of the page, a sketch on paper or a screenshot. You draw frames around the areas that belong together. Every frame becomes a component, and frames inside another frame become its children. The result is a tree with `App` at the top.

![The tree of components drawn from a wireframe. On the left a wireframe of the catalog page. The header is AppHeader, the search field SearchBar, the category select CategoryFilter, the list ItemList with an ItemCard for every thing and the footer AppFooter. On the right the tree of the whole app. App contains AppHeader, CatalogView, ItemView and AppFooter. CatalogView contains SearchBar, CategoryFilter and ItemList with ItemCard, ItemView contains ReservationForm and BaseDialog, AppFooter contains OpeningHours. App owns catalog, favorites, search text and category, ReservationForm the request.](../../../../assets/figures/en/p4c1-component-tree.svg)

`CatalogView` and `ItemView` are the two pages of the app. They put the building blocks below them together. In part 6, Vue Router takes over switching between them. `BaseDialog` only joins later in part 4, and the tree already shows the goal.

## One task per component

A good component can be described in one sentence without an "and". `ItemCard` shows a thing. `SearchBar` takes a search text. `ReservationForm` collects a request and checks it. If a component needs an "and", such as "shows the catalog and the form", it holds more than one task.

Too small isn't good either. A component for a single paragraph adds a file but no benefit. Good candidates are parts that repeat, like the card of a thing, and parts with logic of their own, like the form or the opening hours.

## Names and files

Components get multi-word names in PascalCase, so they can't be confused with HTML elements like `header` or `footer`. The Vue style guide recommends a few conventions for this.

1. Components that exist only once in the app share a prefix. The style guide suggests `The`, as in `TheWelcome` from the create-vue example. This course uses `App`, as in `AppHeader` and `AppFooter`.
2. General building blocks without a connection to the app start with `Base`, like `BaseDialog`.
3. Names go from general to specific, which is why the parts of the catalog are called `ItemList` and `ItemCard` and not `ListOfItems`.

Every component gets a file of its own named after it. Building blocks live in `src/components`, whole pages like `CatalogView` in `src/views`. create-vue uses that folder as well once you select the router.

## The place for state

Every piece of state belongs to exactly one component. It holds it, changes it and passes it on to the components below. Which one that is follows from a rule. State belongs in the lowest component that sits above all the components that need it.

1. Both `CatalogView` and `ItemView` need the catalog. The lowest component above both is `App`.
2. Only `CatalogView` needs the search text. But it should survive when someone opens a thing and comes back. During that time `CatalogView` disappears, so the search text belongs to `App` as well.
3. The cards and the header need the favorites, so again `App`.
4. Only `ReservationForm` needs the fields of the request, so they stay there.

The chapter "Props" shows how data get from `App` to the cards. The chapter "Events and v-model" shows how a card tells `App` that someone wants to reserve.

## Moving out parts without data

The easiest parts to move out are the ones that need nothing from outside, the header, the footer and the opening hours. Look at how the example puts the page together, and work out which components it has before you open it.

::playground{dir="examples/04-components/split-layout"}

`App.vue` has become short and reads like a table of contents. `AppFooter` in turn uses `OpeningHours`, so components can be nested as deeply as you like. The style moves with the component into its file and applies only there thanks to `scoped`.

## A card for a thing

The card of a thing is the next candidate, because it repeats for every thing. But it needs data, the name, the category and the availability. Without a way to give it these data, its content is fixed in the template.

::playground{dir="examples/04-components/props-start"}

All three cards show the drill. The component has been moved out correctly, but it can't show anything different yet. The next chapter changes that.

## In code

Work with the example on the header and the footer. Read the files first and write down what you expect before you change anything.

1. Draw the tree of components of the example before you open the playground. Does it match what the preview shows?
2. Change the opening hours on Saturday. In how many files do you have to change something, and in which not?
3. Move the line with the address out of `AppFooter` into a new component `AppAddress.vue` and include it in the footer.
4. Think about why `OpeningHours` sits in `AppFooter` and not directly in `App`. When would `App` be the better place?

## Exercises

The exercises split a shortened version of the app from part 3. You find the project in the course repo in the folder `exercises/04-components/breaking-down/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Move the header out of `App.vue` into the component `src/components/AppHeader.vue` and include it in `App.vue` with the alias `@`. The page looks as before afterwards.

:::solution[Solution]
::code{file="exercises/04-components/breaking-down/solution/{lang}/src/components/AppHeader.vue"}

`App.vue` then contains the import `import AppHeader from '@/components/AppHeader.vue'` and `<AppHeader />` where the header used to be. The style of the header now belongs to the component and applies only to it thanks to `scoped`.
:::
::::

::::exercise[Going further]
Move the footer into the component `AppFooter.vue`. The opening hours in it become a component of their own, `OpeningHours.vue`, which `AppFooter` uses. Afterwards `App.vue` contains neither a `header` nor a `footer` element.

:::solution[Solution]
::code{file="exercises/04-components/breaking-down/solution/{lang}/src/components/AppFooter.vue"}

`OpeningHours.vue` contains the heading and the two lines with the hours from `App.vue`. The template of `App.vue` then consists of three parts.

::code{file="exercises/04-components/breaking-down/solution/{lang}/src/App.vue" lines="16-30"}
:::
::::

::::exercise[Challenge]
Below the hours, `OpeningHours` should say in an element with the class `today` whether the shop is open today. On Wednesday it says "Open today, 5 to 7 p.m.", on Saturday "Open today, 10 a.m. to 1 p.m.", and on all other days "Closed today, next opening on Wednesday" or "Closed today, next opening on Saturday". `new Date().getDay()` returns 0 for Sunday up to 6 for Saturday.

:::solution[Solution]
::code{file="exercises/04-components/breaking-down/solution/{lang}/src/components/OpeningHours.vue"}

The opening days live once in an array, and `v-for` creates the lines with the hours from it. `find` looks for today, and if none matches, for the next opening day in the same week. After Saturday no such day is left, so `??` falls back to Wednesday. `getDay` uses the time zone of the device here, because it is about today for the person who opens the page. All the logic sits in `OpeningHours`, and neither `AppFooter` nor `App` needs to know about it.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| Every element gets a component of its own. | Move out only parts with a task of their own, such as repeated parts and parts with logic of their own. |
| A component is called `Header` or `Card`. | Choose multi-word names, such as `AppHeader` and `ItemCard`. |
| Two components hold the same state, such as the search text, and drift apart. | Give every piece of state to exactly one component and pass it on from there. |
| The search text gets lost when someone opens a thing and comes back. | Put the state into a component that stays when the page changes. |
| A component that was moved out imports the data itself, although `App` already loads them. | Pass data down from above, as the chapter "Props" shows. |
| An AI assistant registers every component with `app.component` in `main.js`. | Import components where they are used. That keeps it visible where they come from, and the build leaves out what isn't used. |

## Self-check

::::selfcheck
1. How can you tell that a component does too much?
2. Which prefixes does this course use for components that exist only once and for general building blocks?
3. By which rule do you decide which component owns a piece of state?
4. Why does `App` own the search text and not `CatalogView`?

:::solution[Answers]
1. Its task can't be described in one sentence without an "and", its template is long, and it holds state that has nothing to do with each other.
2. `App` for components that exist only once, such as `AppHeader`, and `Base` for general building blocks, such as `BaseDialog`.
3. State belongs in the lowest component that sits above all the components that need it.
4. `CatalogView` disappears when someone opens a thing. The search text should survive that, so it lives in `App`, which is always there.
:::
::::

:::assignment
The page looks as before, and the volunteer finds his way around the files faster. The card of a thing is already a component of its own, but it shows the same details for every thing. In the next chapter it gets its data.
:::
