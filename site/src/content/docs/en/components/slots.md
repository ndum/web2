---
title: Slots
description: Passing content to a component with slots, setting fallback content, using named and scoped slots, and building a page frame and an accessible dialog with them.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler doesn't want to send anything she hasn't seen once more.

> As a member, I want to see my request once more and confirm it before it is sent, so that I don't send wrong details.

The volunteer has attached a second wish. The catalog and the page of a thing should share the same frame with header and footer, without every page putting it together itself. The acceptance criteria are:

1. After "Send request", a dialog appears with the thing, the days and the member number.
2. The dialog has the buttons "Confirm" and "Back", and only after "Confirm" is the request recorded.
3. The catalog and the page of a thing sit in the same frame with header and footer.
:::

:::goals
After this chapter you can

- pass content to a component with a default slot,
- set fallback content for an empty slot,
- use named slots for several places in a component,
- pass data back to the parent with scoped slots,
- build a page frame and an accessible dialog as components.
:::

## Passing content

With props you give a component values, a name or a number. Sometimes, though, it should take whole pieces of content, a paragraph with emphasis, a button or another component. That's what slots are for. `<slot />` in the template marks the spot where the content appears that the parent writes between the component's tags.

::playground{dir="examples/04-components/default-slot"}

The first `InfoBox` shows the text with the name in bold. The second gets nothing and shows the fallback content between `<slot>` and `</slot>`. The content of a slot belongs to the parent. It can use the parent's data, but not those of the component it goes into.

## Named slots

A page frame needs several places, the header, the content and the footer. For that, slots get a name, `<slot name="header">`. The parent fills them with `<template #header>`, short for `v-slot:header`. Everything that isn't inside such a `<template>` ends up in the default slot without a name.

::playground{dir="examples/04-components/named-slots"}

`PageLayout` defines how header, content and footer are arranged. The pages only decide what goes in them. If the association changes the frame later, one file changes, not every page.

![Content fills the slots of a component. On the left the template of the parent component with BaseDialog. It fills the slot title with the title, the default slot with the text of the request and the slot actions with a button. On the right the template of BaseDialog with the three places for the title, the content and the buttons. Arrows connect each piece of content with its slot.](../../../../assets/figures/en/p4c4-slots.svg)

## A dialog with slots

The dialog for the request is a general building block, which is why it is called `BaseDialog`. It knows nothing about reservations. Its slots take the title, the content and the buttons, and without buttons it shows a close button that emits the event `close`.

::playground{dir="examples/04-components/dialog"}

So that a screen reader recognizes the dialog, it carries `role="dialog"` and `aria-modal="true"`. `aria-labelledby` points to the id of the title, and a screen reader reads it out when the dialog opens. The id comes from `useId()`, a function from Vue 3.5 that returns a unique id in every component. That way two dialogs don't get in each other's way.

Two things are still missing from the dialog. The focus doesn't move into it when it opens, and the Escape key doesn't close it. That needs access to elements of the DOM, which part 5 shows with template refs. The HTML element `<dialog>` with its method `showModal()` handles both by itself and is an alternative that also needs a template ref.

## Scoped slots

Sometimes the component knows the data, but the parent should decide how they look. `ItemList` knows the things and builds the list, but the catalog wants to show cards in it, and a short overview only names. For that, the component passes data to the slot, `<slot name="item" :item="item">`. The parent receives them with `<template #item="{ item }">`.

::playground{dir="examples/04-components/scoped-slot"}

The first list shapes its entries itself, the second shows the fallback content with the name. Because the data come per entry, this form is called a scoped slot, a slot with a scope of its own.

## In code

Work with the example on the dialog. Read the code and write down what you expect before you change anything.

1. What does the dialog show if `App` leaves out the `<template #actions>`? And what if `#title` is missing too?
2. Open the dialog and inspect it with the browser's developer tools. Which element does `aria-labelledby` point to?
3. Put two `BaseDialog` components next to each other in `App`. Do their titles have the same id?
4. Move the paragraph with the drill into a `<template #default>`. Does anything change, and why?

## Exercises

The exercises build the frame of the page, the dialog and a list with a scoped slot. You find the project in the course repo in the folder `exercises/04-components/slots/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Create `src/components/PageLayout.vue`. The component has a slot `header` in a `header` element, the default slot in a `main` element and a slot `footer` in a `footer` element. Without content for the header, it shows "Lorraine Commons". Frame the page in `App.vue` with it, so that `App.vue` itself no longer contains a `header` element.

:::solution[Solution]
::code{file="exercises/04-components/slots/solution/{lang}/src/components/PageLayout.vue"}

In `App.vue`, the content of the page sits between `<PageLayout>` and `</PageLayout>`, and header and footer sit in `<template #header>` and `<template #footer>`.

::code{file="exercises/04-components/slots/solution/{lang}/src/App.vue" lines="21-39"}
:::
::::

::::exercise[Going further]
Create `src/components/BaseDialog.vue`. The slot `title` sits in an `h2`, the default slot below it and the slot `actions` at the end. Without buttons, the dialog shows a button "Close" that emits the event `close`. The outer element of the dialog carries `role="dialog"`, `aria-modal="true"` and `aria-labelledby` with the id of the title. In `App`, the button "Send request" opens the dialog with the title "Check the request" and the buttons "Confirm" and "Back".

:::solution[Solution]
::code{file="exercises/04-components/slots/solution/{lang}/src/components/BaseDialog.vue" lines="1-24"}

`App` shows the dialog with `v-if` and fills its slots.

::code{file="exercises/04-components/slots/solution/{lang}/src/App.vue" lines="41-48"}

`$emit('close')` in the template emits the event without the script needing `defineEmits` as a function. Declaring it with `defineEmits(['close'])` still documents the event.
:::
::::

::::exercise[Challenge]
Create `src/components/ItemList.vue`. It gets the prop `items` and shows an entry for every thing. Every entry is a slot `item` that passes the thing as `item` and shows the name without content. Use the list in `App` for the other things and show the deposit for each thing in it, for example "Drill, deposit CHF 20.00".

:::solution[Solution]
::code{file="exercises/04-components/slots/solution/{lang}/src/components/ItemList.vue"}

::code{file="exercises/04-components/slots/solution/{lang}/src/App.vue" lines="30-34"}

`ItemList` takes care of the list and the keys, `App` only of the content of an entry. The same list can show cards on the favorites page and a short line here.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The content of a slot accesses data of the component and gets nothing. | A slot only sees the parent's data. The component passes data through a scoped slot. |
| Vue reports `v-slot can only be used on components or <template> tags.` | Put `#header` on a `<template>` or directly on the component, not on a `div`. |
| Content meant for a named slot appears in the default slot. | Put the content into a `<template #name>`. |
| A dialog without `role` and label, and a screen reader doesn't recognize it. | Set `role="dialog"`, `aria-modal="true"` and `aria-labelledby`. |
| Every dialog uses the fixed id `dialog-title`, and two dialogs share it. | Create the id with `useId()`. |
| An AI assistant writes `slot="header"` on an element. | That notation comes from Vue 2, and in Vue 3 the content ends up in the default slot. Use `<template #header>`. |

## Self-check

::::selfcheck
1. How do props and slots differ?
2. When does the fallback content of a slot appear?
3. How does content get into a named slot?
4. What do you need a scoped slot for?

:::solution[Answers]
1. Props pass values, slots pass whole pieces of content made of HTML and components.
2. When the parent passes nothing for that slot.
3. The parent puts it into a `<template #name>`, and the component shows it where `<slot name="name">` is.
4. When the component knows the data but the parent should decide how they look, such as the entries of a list.
:::
::::

:::assignment
The dialog goes down well. Martina Hostettler has noticed, though, that she types in her member number every time. "The app knows who's signed in, doesn't it?" The volunteer adds that the dialog should sit at the end of the page and not in the middle of the form. The next chapter solves both.
:::
