---
title: Provide and inject
description: Passing values deep into the tree of components with provide and inject, applying rules for the design of components, and moving content to the end of the page with Teleport.
sidebar:
  order: 5
---

:::assignment
Until part 6 brings a login, Martina Hostettler with the member number M-117 counts as the signed-in test member. The app should already make use of that.

> As a signed-in member, I want my member number to be filled in on the form already, so that I don't have to type it every time.

The acceptance criteria are:

1. The header shows who is signed in.
2. The form fills in the member number of the signed-in member, and it stays editable.
3. The components between `App` and the form know nothing about the member.
4. The dialog sits at the end of the page in the DOM and covers everything.
:::

:::goals
After this chapter you can

- explain when passing props down becomes tedious,
- provide values with `provide` and get them with `inject`,
- define keys for `provide` and `inject` in a file of their own,
- apply the rules for the design of components,
- move content to another place on the page with `Teleport`.
:::

## Passing props down

`App` knows the signed-in member, and the form needs the member number. The page of the thing sits in between. With props, every component on the way has to take the member and pass it on, even if it does nothing with it itself. Look at how the member gets to the form in the example.

::playground{dir="examples/04-components/prop-drilling"}

`ItemPage` declares the prop `member` only to pass it on. With two levels that's still fine. With five levels, five components depend on a value only the last one needs, and a change to the member runs through all the files. This passing down is called prop drilling.

![Passing props down or provide and inject. On the left, App passes the member as a prop to ItemView, and ItemView passes it on to ReservationForm, although ItemView does not need it itself. On the right, App provides the member with provide, and ReservationForm gets it with inject, without ItemView knowing about it.](../../../../assets/figures/en/p4c5-provide-inject.svg)

## provide and inject

With `provide`, a component makes a value available to all components below it. Each of them gets it with `inject`, no matter how deep it sits. The components in between notice nothing.

::playground{dir="examples/04-components/provide-inject"}

The key is a `Symbol` from the file `keys.js`. Two symbols are never equal, even with the same description. That way no other `provide` can overwrite the value by accident, and whoever needs the value imports the key from the same file. The second argument of `inject` is the default value, in case no component above provides the value.

`App` provides a ref, so the value stays reactive. If the member changes, for example after the login in part 6, all components see the new value. `readonly` makes sure that only `App` can change it. If a component further down should be allowed to change something, `App` also provides a function, for signing out for example, and so keeps control over the value.

## Rules for components

With props, events, slots and `provide`, you now know all the ways in which components work together. A few rules help to choose the right one.

1. Props go down, events go up. Every value has one component that owns it and changes it.
2. Presentational components like `ItemCard`, `SearchBar` and `BaseDialog` only show what they get and report what happens. Container components like `App`, `CatalogView` and `ItemView` own data and decide. Presentational components can be reused and are easy to test.
3. Interfaces stay small. A component gets only the values it needs and knows only the events it really emits.
4. `provide` and `inject` fit values that many components deep in the tree need, such as the signed-in member, the language or a color scheme. Between parent and child, props stay clearer. For state that many parts of the app change, part 7 brings Pinia.

## Teleport

The dialog sits in the template of the form, so in the DOM it sits in the middle of the page. If an ancestor has `overflow: hidden` or `transform`, it clips the dialog or traps it, even with `position: fixed`. `<Teleport to="body">` renders the content at the end of `body` instead. For Vue it stays part of the component, and props, events and `inject` work as before.

::playground{dir="examples/04-components/teleport"}

Without Teleport, the dialog stays inside the card and gets clipped, with Teleport it lies over the whole page. The target must already exist when rendering. `body` is always there, while an element of your own like `<div id="modals">` has to be in `index.html`.

:::deepdive[Dynamic components and KeepAlive]
`<component :is="current">` renders the component stored in `current`. Changing the value swaps the component. `<KeepAlive>` around it keeps the component that isn't shown, together with its state, instead of destroying it.

::playground{dir="examples/04-components/dynamic-keepalive"}

Type a note, switch to the rules and back, and the note is still there. Without `KeepAlive` it's gone. `shallowRef` holds the component without making it reactive itself. In part 6, Vue Router renders the pages on the same principle, and `KeepAlive` can be used there as well. The case app keeps the search text in `App` instead, because that keeps it visible where it lives.
:::

## In code

Work with the example on `provide` and `inject`. Read the code and write down what you expect before you change anything.

1. What does the form show? Where do the name and the number come from?
2. Comment out `provide` in `App`. What does the form show now, and why is there no warning?
3. Also remove the default value `null` in `inject`. What does the console report?
4. Switch to the example with Teleport, uncheck "With Teleport" and open the dialog. Where does it sit in the DOM now?

## Exercises

The exercises pass the test member through the tree and move the dialog. You find the project in the course repo in the folder `exercises/04-components/provide-inject/en`. Copy the folder, install the packages and run the tests. The key `memberKey` is already in `src/keys.js`.

```bash
npm install
npm test
```

::::exercise[Getting started]
In `App.vue`, provide the member with `provide` and the key `memberKey`, read-only with `readonly`. `AppHeader` gets it with `inject` and the default value `null` and shows "Signed in as Martina Hostettler" in an element with the class `member`. Without a member, the line is missing.

:::solution[Solution]
::code{file="exercises/04-components/provide-inject/solution/{lang}/src/App.vue" lines="9-13"}

::code{file="exercises/04-components/provide-inject/solution/{lang}/src/components/AppHeader.vue"}

In the template Vue unwraps the ref, so `member.name` is enough. Without `App` above it, in a test for example, `inject` returns the default value `null`, and `v-if` leaves out the line.
:::
::::

::::exercise[Going further]
`ReservationForm` also gets the member with `inject` and fills in the field for the member number with it. Without a member, the field stays empty. `ItemPage` gets no prop for the member.

:::solution[Solution]
::code{file="exercises/04-components/provide-inject/solution/{lang}/src/components/ReservationForm.vue" lines="9-11"}

`member?.value.number` reads the number if there is a member, otherwise `?? ''` steps in. The field only gets its initial value, after that its content belongs to the form. A member reserving for someone else can therefore change the number.
:::
::::

::::exercise[Challenge]
The dialog after sending should sit at the end of the page in the DOM, not inside the form. Change `BaseDialog` so that it moves its content to the end of `body` with `Teleport`. The dialog still shows the thing and the member number and can be closed.

:::solution[Solution]
::code{file="exercises/04-components/provide-inject/solution/{lang}/src/components/BaseDialog.vue" lines="10-27"}

Because `Teleport` sits in `BaseDialog`, every dialog of the app ends up at the end of the page without the forms knowing about it. Slots, props and the event `close` work as before, because for Vue the content stays part of the component.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `inject` sits in an event handler, and Vue warns that it only works during setup. | Call `inject` at the top of `<script setup>` and keep the value in a constant. |
| Two parts of the app use the same text as a key and overwrite each other. | Define keys as a `Symbol` in a file of their own. |
| A change of the provided value doesn't arrive further down. | Provide a ref or a reactive object, not a plain value. |
| A component far down changes the provided value, and nobody knows where the change comes from. | Provide the value with `readonly` and add a function for changing it. |
| Vue reports `Failed to locate Teleport target with selector "#modals"`. | The target must exist when rendering. Use `body` or add the element to `index.html`. |
| An AI assistant stores the member on `window` or accesses it through `$root`. | Provide values for the whole tree with `provide`, and use Pinia later for widely shared state. |

## Self-check

::::selfcheck
1. When are `provide` and `inject` worth it instead of props?
2. Why is a `Symbol` a good key?
3. How do you make sure that only `App` changes the member?
4. What does `Teleport` do, and what stays the same?

:::solution[Answers]
1. When a value is needed deep in the tree and the components in between would only pass it on.
2. Two symbols are never equal, so no other `provide` can use the same key by accident.
3. `App` provides the member with `readonly`. If someone further down should change it, they get a function from `App`.
4. The content ends up in another place in the DOM, such as the end of `body`. For Vue it stays part of the component, with props, events, slots and `inject`.
:::
::::

:::assignment
The app is now made of components, and each one has a clear task. One annoyance remains at the counter, though. "After a reload my favorites are gone, and the search always starts from scratch," a member says. That's what part 5 is about. Before that, use the [competence grid](../competences/) to check whether you're ready for part 5.
:::
