---
title: Forms
description: Binding every kind of field with v-model, using modifiers, sending forms with submit.prevent and checking input with clear messages.
sidebar:
  order: 5
---

:::assignment
Now comes the part of the app the board has been waiting for most.

> As a member, I want to reserve a thing for a period of time, so that it is ready when I pick it up.

The acceptance criteria are:

1. The form asks for the member number, the first day and the last day.
2. Things can only be picked up and brought back on Wednesday or Saturday, and a loan lasts at most seven days.
3. Errors appear next to the field as soon as someone leaves it or sends the form, and a screen reader reads them out.
4. After sending, the app sums up the request.
:::

:::goals
After this chapter you can

- bind every kind of field to the state with `v-model`,
- use the modifiers `.trim`, `.number` and `.lazy`,
- send a form with `@submit.prevent`,
- check input with a computed object of errors,
- show error messages so that everyone notices them.
:::

## v-model

In the last chapter, `v-model` connected the search field to a ref. For a text field it is short for two things you already know. The two lines do the same.

```vue
<input :value="query" @input="query = $event.target.value">
<input v-model="query">
```

`:value` writes the ref's value into the field, and `@input` writes the field's value into the ref on every input. Depending on the kind of field, Vue picks the matching property and event. For checkboxes and radio buttons it binds `checked` and listens to `change`, for a select `value` and `change`.

The ref determines the initial value. `v-model` ignores a `value`, `checked` or `selected` attribute in the HTML.

## Every kind of field

The example shows all the usual fields and, below them, the values that end up in the refs. First work out the type of each value, then change the fields in the playground.

::playground{dir="examples/03-vue/form-fields"}

A single checkbox delivers `true` or `false`. Several checkboxes bound to the same array collect the values of the checked boxes. Radio buttons deliver the value of the selected button, a select the value of the selected option, and an option without a `value` attribute delivers its text. A date field delivers a string such as `2026-11-18` or an empty string. A number field with `type="number"` delivers a number, because there Vue applies the `.number` modifier by itself.

Every field needs a label. `<label for="days">` belongs to the field with the id `days`, a click on it puts the focus into the field, and a screen reader reads the label out. Radio buttons and checkboxes that belong together are grouped by a `<fieldset>` with a `<legend>`.

## Modifiers

Three modifiers change what `v-model` writes into the ref. `.trim` removes spaces at the start and end. `.number` converts the input into a number and leaves the text as it is if that isn't possible. `.lazy` writes only when someone leaves the field, instead of on every character.

::playground{dir="examples/03-vue/modifiers"}

## Sending a form

Fields belong in a `<form>` element with a `<button type="submit">`. Then the Enter key in a field sends the form too, as people expect. Left alone, the browser sends the form to the server and reloads the page, and the whole state of the app is gone. `@submit.prevent="submit"` prevents that and calls the function `submit` instead.

## Checking input

The check belongs in a computed value. It returns an object with a message for every field where something is wrong. If the object is empty, the form is valid. Because `computed` recalculates by itself, the messages always match the current state of the fields.

::playground{dir="examples/03-vue/suggestion-form"}

Someone filling in a field for the first time shouldn't see an error after the first letter. The example shows a message only once someone has left the field or sends the form. `touched` remembers the fields that were left, `submitted` the attempt to send, and `shownErrors` contains only the messages that may already appear.

So that everyone notices the messages, they appear as text next to the field and not just as red color. `aria-describedby` connects the field with the element of the message, and a screen reader then reads it out together with the label. `aria-invalid="true"` says that the input isn't right. The confirmation lives in an element with `role="status"`. A screen reader reads out new text in it by itself, as long as the element was already on the page before.

The `novalidate` attribute on the form switches off the browser's own messages. They look different in every browser and appear in the browser's language, not the app's. Attributes such as `min` and `max` are still worth it, because a number field then shows matching arrows and a date field a matching calendar.

Dates need no arithmetic for comparing. Strings such as `2026-11-18` can be compared directly, because the order of the characters matches the order of the days. `new Date('2026-11-18').getUTCDay()` returns the weekday, 0 for Sunday up to 6 for Saturday. JavaScript reads a date without a time as midnight in UTC, as you know from the [JS workshop](../../js/formatting/). That's why `getUTCDay` applies, not `getDay`.

## In code

Work with the example on the suggestion. Read the code and write down what you expect before you change anything.

1. What appears if you click "Suggest" right away? And what if you enter a name and leave the field with the Tab key?
2. Enter 85 as the deposit and leave the field. Which message appears, and which attributes does the field have afterwards? Check with the browser's developer tools.
3. Remove `.prevent` and send the form with valid values. What happens to the preview, and why?
4. Remove `novalidate` and add the `required` attribute to the name. What does the browser show when you send the form with an empty name?

## Exercises

The exercises build the reservation request on the page of the drill. You find the project in the course repo in the folder `exercises/03-vue/forms/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

The tests act as if today were Monday, November 2, 2026. The file `src/dates.js` provides three helpers, `today()` for today's date, `daysBetween(from, to)` for the number of days in between and `formatDate(date)` for display.

::::exercise[Getting started]
Bind the three fields with `v-model` to the refs `member`, `from` and `to`, the member number with `.trim`. When the form is sent, the page doesn't reload but shows the summary in an element `<p class="summary" role="status">`, for example "Reservation request from M-117 for Drill from 11/18/2026 to 11/21/2026 recorded.".

:::solution[Solution]
The fields get `v-model.trim="member"`, `v-model="from"` and `v-model="to"`, and the form calls `submit` when it is sent.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="68-68"}

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="57-61"}

The two lines with `submitted` and the early return on errors come with the next exercise. `summary` is a ref holding an empty string, so the status element is there from the start.
:::
::::

::::exercise[Going further]
Check the input by these rules and show each message in an element with the id `member-error`, `from-error` or `to-error` and the class `error`. The field then gets `aria-invalid="true"` and `aria-describedby` with the id of the message. The messages appear as soon as someone sends the form, and only a valid form produces a summary.

| Field | Rule | Message |
|---|---|---|
| Member number | "M-" and three digits | The member number looks like M-117. |
| First day | not empty | Choose the first day. |
| First day | not before today | The first day is in the past. |
| Last day | not empty | Choose the last day. |
| Last day | not before the first day | The last day is before the first. |
| Last day | at most seven days after the first | A loan lasts at most seven days. |

:::solution[Solution]
The check lives in a computed value. Here are the rules for the member number and the first day.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="24-32"}

For the last day, the three rules from the table follow.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="36-41"}

The field and its message are connected through the id.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="69-77"}

For this exercise, `submitted && errors.member` is enough as the condition instead of `shownErrors.member`, and `@blur` only comes with the challenge. `/^M-\d{3}$/` requires exactly "M-" and three digits, with `^` and `$` standing for the start and end of the text.
:::
::::

::::exercise[Challenge]
Things can only be picked up and brought back on opening days. Add the message "You can pick things up on Wednesday or Saturday." for the first day and "You can bring things back on Wednesday or Saturday." for the last day. Also, the message for a field should appear as soon as someone leaves that field. `new Date(date).getUTCDay()` returns 3 for Wednesday and 6 for Saturday.

:::solution[Solution]
::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue"}

`isOpeningDay` checks the weekday, and that check comes last each time, so that the more important message appears first. `@blur` records the field that was left in `touched`, and `shownErrors` shows a message when its field was left or the form was sent. From Saturday to Saturday is exactly seven days, the longest loan the rules allow.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| Sending reloads the page, and all input is gone. | Put `@submit.prevent` on the form. |
| `value="3"` in the HTML doesn't appear in the field. | `v-model` ignores the attribute. Set the initial value in the ref, `ref(3)`. |
| A text field for numbers delivers `'3'` instead of `3`, and `days + 1` gives `'31'`. | Use `v-model.number` or `type="number"`, then Vue converts the value. |
| `<textarea>{{ note }}</textarea>` doesn't keep field and ref in step. | Bind text areas with `v-model` too, interpolation doesn't work inside them. |
| The weekday is wrong in some time zones. | For dates without a time, use `getUTCDay` instead of `getDay`. |
| Errors are only a red border or sit in the placeholder. | Show the message as text next to the field and connect it with `aria-describedby`. |
| An AI assistant suggests a validation library for a small form. | For a few fields, a computed object of errors is enough. Libraries pay off for many and nested forms. |

## Self-check

::::selfcheck
1. What is `v-model` short for on a text field?
2. What do `.trim`, `.number` and `.lazy` do?
3. Why does the form need `@submit.prevent`?
4. How do you connect an error message to its field so that a screen reader reads it out?

:::solution[Answers]
1. For `:value="query"` together with `@input="query = $event.target.value"`.
2. `.trim` removes spaces at the edges, `.number` converts into a number, and `.lazy` writes only when the field is left.
3. Without `.prevent`, the browser sends the form and reloads the page, and the state of the app is lost.
4. The message gets an id, and the field refers to it with `aria-describedby`. `aria-invalid="true"` also says that the input isn't right.
:::
::::

:::assignment
The first reservation request is recorded, and Martina Hostettler is pleased. While looking through the code, though, the volunteer noticed something. "App.vue is almost 180 lines long by now, and catalog, search and form are all crammed into it. We should split that up." That's exactly what part 4 does with components. Before that, use the [competence grid](../competences/) to check whether you're ready for part 4.
:::
