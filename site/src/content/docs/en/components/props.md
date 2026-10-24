---
title: Props
description: Give a component its data through props, set type, requirement and default, and see why data flow only from parent to child.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler wrote after the board meeting. Members at the counter keep asking whether the drill is in, and in the catalog of the app every thing looks the same.

> As a member, I want to see every thing in the catalog as a card with its name, category and availability, so that I can tell at a glance what I can borrow.

The acceptance criteria are:

1. Every card shows the name and the category of the thing.
2. A thing that is on loan is marked "On loan", all others "Available".
3. The same card will later appear on the favorites page as well.
:::

:::goals
After this chapter you can

- give a component props with `defineProps` and declare their types,
- pass values as plain text or, with a colon, as expressions,
- use required props and default values,
- explain why data flow only from the parent to the child component,
- decide whether a component gets single values or a whole object.

You need the template syntax from part 3 and the chapter on breaking down an interface, where the component `ItemCard` came into being.
:::

## One card for every thing

In the last chapter you moved the card of a thing into its own component, `ItemCard`. The catalog uses it three times. Look at both files and predict what the preview shows before you open the example in the playground.

::playground{dir="examples/04-components/props-start"}

All three cards show the drill. The catalog is not to blame. `ItemCard` has the name and the category written into its template, and every card renders the same template. For one component to show different things in different places, it needs input from outside. In Vue this input is called props, short for properties.

## Declaring props

A component with props works like a function with parameters. The function states which values it expects, and whoever calls it supplies them. For `ItemCard` these are the name and the category. The parent component, `App.vue` here, owns the data and hands them over when it uses the card.

![Props flow from the parent to the child component. At the top is App.vue, the component that owns the data. Three arrows lead down to three cards of the component ItemCard, each arrow carries the props passed down, for example name equals Drill and category equals Tools. There is no arrow back up.](../../../../assets/figures/en/p4c2-props-flow.svg)

In `<script setup>` you declare props with `defineProps`. You pass an object in which every key is a prop and the value describes what that prop expects.

::code{file="examples/04-components/props-card/{lang}/ItemCard.vue" lines="1-6"}

`type: String` says the prop expects text, and `required: true` makes it mandatory. In the template you use props like variables, so `{{ name }}` shows the name. You don't import `defineProps`. It is a macro that the Vue compiler resolves when it translates the component, which is why it only works in `<script setup>`.

The parent passes the values as attributes, just like on an HTML element.

::playground{dir="examples/04-components/props-card"}

Each card now gets its own values, and one component shows three different things.

## Passing text and expressions

The second acceptance criterion needs a third prop that says whether a thing is available. That is a truth value, so its type is `Boolean`.

::code{file="examples/04-components/props-available/{lang}/ItemCard.vue" lines="1-16"}

Passing it is where the most common mistake with props happens. An attribute without a colon always passes text. `available="false"` passes the text "false", and any text that isn't empty counts as true in JavaScript. Only with the colon does Vue evaluate the content as a JavaScript expression, so `:available="false"` passes the boolean `false`. The same goes for numbers, arrays, objects and variables. The colon is the shorthand for `v-bind` that you know from part 3.

::code{file="examples/04-components/props-available/{lang}/App.vue" lines="7-11"}

| In the template | What the component receives |
|---|---|
| `name="Drill"` | the text "Drill" |
| `:available="false"` | the boolean `false` |
| `:deposit="20"` | the number 20 |
| `:name="item.name"` | the value of `item.name` |
| `available` without a value | `true`, for props of type `Boolean` only |

## Required props and defaults

The prop `available` has the default value `true`. If the parent leaves it out, Vue uses this value, which is why the drill shows as available even though `App.vue` says nothing about it. A prop is either required or has a default, both at once make no sense.

If a required prop is missing or has the wrong type, Vue still renders the component and writes a warning to the browser console, such as `Missing required prop: "category"`. This check only runs during development, a production build checks nothing. So the declarations in `defineProps` don't protect the app at runtime. They help while you develop, and they document what a component needs, for you and for anyone who uses it later.

For objects and arrays the default must be a function that returns a new object every time, for example `default: () => []`. Otherwise all cards would share the same array. With `validator` you can add a check of your own, for instance that a number isn't negative, with `validator: (value) => value >= 0`.

:::deepdive[Destructuring props]
Since Vue 3.5 you can destructure props into variables and set the default right there.

::code{file="examples/04-components/props-destructure/{lang}/ItemCard.vue" lines="1-8"}

The card stays reactive, because the compiler turns `name` back into `props.name` behind the scenes. If you pass such a variable on to another function, though, that function only gets the current value. For `watch` from part 5 you therefore write `watch(() => available, ...)`. The course mostly uses `const props = defineProps(...)`, because it keeps visible what is a prop.
:::

## Data flow downward only

Props are a one-way street. The parent owns the data and passes them down, the child only reads them. When a value in `App.vue` changes, Vue renders the affected cards again. The card itself must not change its props.

```vue
<script setup>
const props = defineProps({ available: Boolean })

function reserve() {
  props.available = false // blocked, Vue warns that props are readonly
}
</script>
```

Vue blocks this assignment and warns in the console that the prop is readonly. The reason is traceability. If every card could change the catalog's data, soon nobody would know where a value came from. This way exactly one component owns and changes each value.

If the card needs a value of its own that it changes, such as the number of days someone wants to borrow a thing, it keeps its own state with `ref`. If it needs to tell the parent something, such as that someone clicked "Reserve", it emits an event. That is the subject of the next chapter.

## Single values or one object

The catalog keeps its things in an array, and `v-for` creates a card for each of them. Instead of passing name, category and availability one by one, you can also pass the whole object as a single prop.

::playground{dir="examples/04-components/props-item"}

Both ways are common, and each has its strengths and weaknesses.

| | Single props | One object as a prop |
|---|---|---|
| Interface | shows exactly what the card needs | depends on the shape of the data |
| Reuse | fits data from another source too, such as a list of favorites | other data first need the same shape |
| Tests | a few values are enough | a matching object has to be built |
| Typing | more, hard to read with many fields | less |
| Pitfall | none in particular | fields of the object can be changed without a warning |

Vue only protects the prop itself. It blocks `props.item = ...`, but not `props.item.available = false`, because the object stays the same one that `App.vue` points to. The change ends up in the parent's data without any warning. So if you pass an object, never change its fields in the child.

For small components that only display something, like the card, single props are usually the better choice. Components that work with a whole record, such as a form for editing a thing, are better served by an object.

## In code

Work with the availability example. Read the code first and write down what you expect before you change anything.

::playground{dir="examples/04-components/props-available"}

1. What does the third card show if you remove `:available="true"` entirely? What does the second one show if you delete the colon there?
2. Open the example in the playground and check your predictions.
3. Remove the category from one card. Which warning appears in the playground's console, and what does the card show?
4. Change the default of `available` to `false`. Which cards change, and why exactly those?

After that you build things yourself in the exercises.

## Exercises

The exercises build on a small project that shows the catalog of Lorraine Commons with six things. You find it in the course repository in the folder `exercises/04-components/props/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

`npm run dev` shows the catalog in the browser. The tests in the folder `tests` tell you which exercises are done. At the start almost all of them fail, and that is intended.

::::exercise[Getting started]
Lorraine Commons asks for a deposit for every thing. Give `ItemCard` a required prop `deposit` of type `Number` and show the deposit below the category, for example `Deposit: CHF 20.00`. `toFixed(2)` gives a number two decimal places. Then pass the value in `App.vue`. The tests in `level-1.test.js` check both.

:::solution[Solution]
`ItemCard.vue` gets the new prop, and the template shows it.

::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemCard.vue" lines="4-9"}

::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemCard.vue" lines="19-26"}

In `App.vue` the value needs a colon, `:deposit="item.deposit"`. Without it the card would receive the text "item.deposit", Vue would warn about the wrong type, and the first test would fail.
:::
::::

::::exercise[Going further]
A thing that is on loan has a date in `availableFrom` in its record, otherwise the field is `null`. Give the card a prop `availableFrom` of type `String` with the default `null`. The card shows "Available" as long as there is no date and otherwise, for example, "Available again from 11/12/2026". Compute this text with `computed` from part 3. For `computed` to reach the prop you need `const props = defineProps(...)`. You format the date with `new Date(props.availableFrom).toLocaleDateString('en-US', { timeZone: 'UTC' })`.

:::solution[Solution]
::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemCard.vue" lines="1-17"}

JavaScript reads a date without a time, such as `2026-11-12`, as midnight UTC. Formatted in the time zone of Switzerland it still shows the right day, but in the Americas it shows the day before. With `timeZone: 'UTC'` the day is right everywhere. Because `state` is a `computed`, Vue recalculates the text as soon as the prop changes, which the third test checks.
:::
::::

::::exercise[Challenge]
Create a new component `ItemList.vue`. It receives the array of things as the required prop `items`, shows an `ItemCard` for every thing and passes on all four values. If the array is empty, it shows "No things found.". Use `ItemList` in `App.vue`. Then think about the favorites page from the assignment and why it pays off that `ItemList` gives the card single props instead of the whole object.

:::solution[Solution]
::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemList.vue"}

::code{file="exercises/04-components/props/solution/{lang}/src/App.vue"}

In its template `ItemList` writes the prop as `available-from`. Vue treats it as the same prop as `availableFrom`, templates accept both. Because the card only knows single values, the favorites page can feed it with data from another source, such as a list of reservations, without that data having the same shape as the catalog.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The child changes a prop, for example with `props.available = false`. | Change the value in the parent and tell the parent with an event (next chapter). |
| `deposit="20"` without a colon, so the prop receives the text "20". | Use the colon for everything that isn't fixed text. The type warning in the console points to the mistake. |
| The child changes fields of an object it received as a prop. | Never change fields in the child. Tell the parent, or work with a copy. |
| Unsure whether `available-from` in the template and `availableFrom` in the script are the same prop. | Vue treats both spellings as the same. Use camelCase in scripts, templates accept both. |
| An AI assistant writes `props: { ... }` and `this.name` inside `<script setup>`. | That is the Options API. `<script setup>` has no `this`, props come from `defineProps`. |
| An AI assistant imports `defineProps` from `vue`. | Drop the import. `defineProps` is a compiler macro, and the compiler warns about the import. |
| An AI assistant suggests the `.sync` modifier. | `.sync` comes from Vue 2. In Vue 3, `v-model` on components does that job, which the next chapter covers as well. |

## Self-check

::::selfcheck
1. What is the difference between `available="false"` and `:available="false"`?
2. A required prop is missing. What happens during development, and what in a production build?
3. Why must the default of a prop of type `Array` be a function?
4. A card receives an object `item` and sets `item.available = false`. Who sees this change, and why doesn't Vue warn?

:::solution[Answers]
1. Without the colon the card receives the text "false", which counts as true in JavaScript. With the colon Vue evaluates the expression and passes the boolean `false`.
2. During development Vue renders the component and warns in the console. A production build no longer checks props, the card simply stays empty where the missing prop would go.
3. Otherwise all instances of the component would share the same array, and a change in one place would show up everywhere.
4. Every component that uses the same object, so `App.vue` and every other place that shows this thing. Vue only protects the prop itself from being reassigned, not the fields of the object behind it.
:::
::::

:::assignment
Martina Hostettler likes the cards and already has her next wish. Members should be able to reserve a thing right on its card. The button for that lives in `ItemCard`, but the list of reservations belongs to the catalog. Props carry data downward only, the way back up needs events. That is what the next chapter is about.
:::
