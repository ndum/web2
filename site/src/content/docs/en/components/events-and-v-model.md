---
title: Events and v-model
description: Emitting and checking events with defineEmits, reacting to them in the parent, and implementing v-model on your own components with defineModel, several times if needed.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler has collected the wishes from the counter.

> As a member, I want to reserve a thing right on its card and mark it as a favorite, so that I get to the form faster and find my favorite things again.

The acceptance criteria are:

1. The button "Reserve" on a card opens the page of the thing with the form.
2. A button "Favorite" marks a thing and removes the mark again, and a screen reader learns whether the button is pressed.
3. The header shows how many favorites there are.
4. Search field and category are components of their own and work as before.
:::

:::goals
After this chapter you can

- declare events with `defineEmits` and emit them with data,
- react to events in the parent component,
- check events in the object notation,
- implement `v-model` on your own components with `defineModel`,
- use several `v-model` bindings on one component.
:::

## Emitting events

Props carry data from the parent to the child. For the way back, the child emits an event, and the parent reacts to it. So the card only reports that someone clicked "Reserve". What happens next is up to the component that owns the data.

`defineEmits` declares the events of a component and returns a function to emit them. Read the example and work out what appears after a click on the second card.

::playground{dir="examples/04-components/emit-reserve"}

`emit('reserve', id)` emits the event `reserve` and passes the id along as data. `App` listens with `@reserve="reserve"`, just as with a click on an HTML element, and the function `reserve` receives the id as its argument. Unlike events in the DOM, the events of a component don't travel further up. Only the direct parent can listen.

![Props down, events up. App is at the top. Below it on the left is ItemCard, App gives it the name and the availability through props, and the card reports the id back with the event reserve. Below it on the right is SearchBar, App gives it the value modelValue, and the search field reports changes with the event update:modelValue. v-model connects both.](../../../../assets/figures/en/p4c3-props-events.svg)

An event is named after what happened, such as `reserve` or `toggleFavorite`, not after what the parent should do with it. In the script you write the names in camelCase, in the parent's template usually in kebab-case, `@toggle-favorite`. Vue treats both spellings as the same, as with props.

## Checking events

Instead of an array, `defineEmits` also takes an object. Each event then gets a function that checks the data and returns `true` or `false`. If it returns `false`, Vue writes a warning to the console during development, but still emits the event.

::playground{dir="examples/04-components/emit-validate"}

The second card gets its id as the text "6", because the colon is missing. On load, Vue warns about the wrong type of the prop, and on the click about the data of the event with `Invalid event arguments: event validation failed for event "reserve".`. Declaring events with `defineEmits` also documents which events a component knows. Anyone using it sees at a glance what they can listen to.

## v-model on your own components

The search field becomes the component `SearchBar`. The search text still belongs to `App`, but the component should be able to read and change it, like an input field with `v-model`. Since Vue 3.4 there is the macro `defineModel` for this.

::playground{dir="examples/04-components/define-model"}

`defineModel` returns a ref. When `SearchBar` reads it, it gets the value from `App`. When it changes it because someone types, the value in `App` changes. Behind this are a prop and an event of the kind you already know. The two lines do the same.

```vue
<SearchBar v-model="query" />
<SearchBar :model-value="query" @update:model-value="query = $event" />
```

The prop is called `modelValue`, the event `update:modelValue`. `defineModel` declares both and saves you the code that connects them.

## Several v-model bindings

A component can bind several values. Each model then gets a name, `defineModel('query')` and `defineModel('category')`, and the parent binds them with `v-model:query` and `v-model:category`.

::playground{dir="examples/04-components/several-models"}

The case app uses this for the catalog page. `App` owns search text and category, so both survive a visit to the page of a thing, and `CatalogView` binds them to `SearchBar` and `CategoryFilter` through two models.

## Favorites

Favorites show how props and events work together. `App` owns the ids of the favorites in an array. Every card learns through the prop `favorite` whether it is a favorite and reports a click with the event `toggleFavorite`. `App` changes the array, and Vue updates the card and the header, which counts the favorites.

The button "Favorite" is a toggle. `:aria-pressed="favorite"` tells a screen reader whether it is pressed, and the CSS can highlight it with the selector `[aria-pressed='true']`. Until part 5 the app forgets the favorites on reload, then a composable comes along that remembers them.

## In code

Work with the example on checking events. Read the code and write down what you expect before you change anything.

1. Click both buttons "Reserve". What appears in the playground's console afterwards, and which line comes from `App`?
2. Put the colon in front of `id="6"`. Which warnings disappear?
3. Change the check to `(id) => id > 0` and remove the colon again. Why doesn't Vue warn on the click anymore?
4. Switch to the example with `defineModel` and set the initial value of `query` in `App` to "saw". What do the field and the list show?

## Exercises

The exercises build the card and the catalog from the assignment. You find the project in the course repo in the folder `exercises/04-components/events/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Add a button "Reserve" with the class `reserve` to `ItemCard`. A click emits the event `reserve` with the id of the thing, declared with `defineEmits`. `App` then shows, in an element with the class `message`, for example "Reservation requested for Drill.".

:::solution[Solution]
`ItemCard` declares the event and emits it on a click.

::code{file="exercises/04-components/events/solution/{lang}/src/components/ItemCard.vue" lines="10-14"}

::code{file="exercises/04-components/events/solution/{lang}/src/components/ItemCard.vue" lines="23-23"}

`App` listens with `@reserve="reserve"` and looks up the thing for the id.

::code{file="exercises/04-components/events/solution/{lang}/src/App.vue" lines="22-25"}

The solution already declares the event of the challenge too. For getting started, `defineEmits(['reserve'])` is enough.
:::
::::

::::exercise[Going further]
Turn the search field into the component `src/components/SearchBar.vue`. It binds the search text with `defineModel`, and `App` uses it with `<SearchBar v-model="query" />` instead of the field. The search works as before afterwards.

:::solution[Solution]
::code{file="exercises/04-components/events/solution/{lang}/src/components/SearchBar.vue"}

`query` is the ref from `defineModel`, and the field binds it with `v-model` like an ordinary ref. `App` keeps `const query = ref('')` and the computed value `visibleItems` and only replaces the label and the field with `<SearchBar v-model="query" />`.
:::
::::

::::exercise[Challenge]
Add a button "Favorite" with the class `favorite` to the card. The card gets the prop `favorite`, shows it with `aria-pressed` and reports a click with the event `toggleFavorite` and the id. `App` owns the ids of the favorites and shows how many there are in an element with the class `favorites`, "2 favorites" or "1 favorite".

:::solution[Solution]
::code{file="exercises/04-components/events/solution/{lang}/src/App.vue"}

`toggleFavorite` replaces the array with a new one, with or without the id. Changing the array with `push` and `splice` would work too, but the new array makes the intent clearer. The card learns through `favorites.includes(item.id)` whether it is a favorite. It never changes its prop itself, it only reports the click.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `<script setup>` contains `this.$emit('reserve')`. | There is no `this`. `const emit = defineEmits([...])` returns the function `emit`. |
| The grandparent listens to an event of its grandchild and gets nothing. | Events don't travel further up. The component in between passes the event on, `@reserve="emit('reserve', $event)"`. |
| The child changes its prop, and Vue warns that it is readonly. | Emit an event, or use `defineModel` for a bound value. |
| An event arrives in the parent without data. | Pass the data as the second argument of `emit`, `emit('reserve', id)`. |
| An AI assistant suggests `.sync` or the `model` option. | Both come from Vue 2. In Vue 3, `defineModel` takes over this job. |
| An AI assistant connects components through an event bus. | Props and events are enough between parent and child. For state that many components share, part 7 brings Pinia. |

## Self-check

::::selfcheck
1. How does a child component tell its parent something?
2. What happens when the check function of an event returns `false`?
3. What is `v-model` on a component short for?
4. Why does `App` own the favorites and not the cards?

:::solution[Answers]
1. It emits an event with the function from `defineEmits`, with data if needed, and the parent listens with `@`.
2. Vue warns in the console during development and still emits the event.
3. For the prop `modelValue` together with the event `update:modelValue`.
4. All cards and the header need the favorites. The lowest component above all of them is `App`.
:::
::::

:::assignment
Reserving and favorites work, and Martina Hostettler already has the next wish. "Before a request goes out, I'd like to see it once more and confirm it." The volunteer adds that all pages should share the same frame with header and footer. Both need slots, the next chapter.
:::
