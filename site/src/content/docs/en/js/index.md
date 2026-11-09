---
title: JS workshop
description: The JavaScript basics the course assumes, in ten steps with the counter helper, with runnable examples and solutions.
sidebar:
  label: Overview
  order: 0
---

The JS workshop refreshes the JavaScript the course assumes. Along the way you build a small program for the counter of Lorraine Commons in ten steps, the counter helper. It starts with a single thing in a few variables, and in step 8 it shows the nine things from the counter on a page where a click reserves one. At the end it writes deposits in francs and return dates in your language.

You can work through the steps in order or only through the ones the [entry test](../start/entry-test/) recommends. Every step shows at the top what the counter helper already does and the code so far, so you can also join in the middle. When a chapter assumes a topic, it points you to the matching step.

## Running the examples

Below every example there is a "Run" button. The program then runs right in the browser, and its output appears below the code. "Edit" lets you change the code and run it again, and "Reset" brings back the original. Predict first what a program prints, and only then check it.

The examples of the step "The DOM and events" are small HTML pages. They appear in a frame below the code, with the console output underneath.

All examples are also in the course repo under `examples/js`, one step per folder. There you run them with Node.js, and the counter helper of a step with `desk.mjs`.

```bash
cd examples/js/objects-and-arrays/en
node desk.mjs
```

## The ten steps

Every step teaches the counter helper something new and practices one topic of JavaScript on the way. The examples use things 1 to 9 of the catalog with the fields the course needs from part 1 on, such as `deposit` and `availableFrom`.

| Step | The counter helper learns | Content | Needed in the course |
|---|---|---|---|
| [J1 Variables, types and operators](variables/) | one thing in variables, text from a form as a number | `let` and `const`, primitive types, comparisons, what counts as true and false, `??` | everywhere |
| [J2 Control flow](control-flow/) | in or on loan, open on Wednesday and Saturday | `if` and `else`, the conditional operator, `switch`, loops, `break` and `continue` | everywhere |
| [J3 Functions and scope](functions/) | `isIn` and `loanDays`, numbers for reservations | functions and arrow functions, default values, scope, closures | from part 1, composables in part 5 |
| [J4 Objects and arrays](objects-and-arrays/) | the nine things as objects in an array | objects, arrays, references, spread, destructuring, optional chaining | from part 1 |
| [J5 Strings and template literals](strings/) | one line per thing, a search by name | template literals, methods for text, case-insensitive search, sorting | search and filters from part 3 |
| [J6 Classes and this](classes/) | a reservation with member number and days | classes, private fields, getters, static methods, `this` and `bind` | custom error classes, reading code with `this` |
| [J7 Handling errors](errors/) | checking a request and declining it with a reason | `throw`, `try`, `catch` and `finally`, error types, custom error classes | data from the server in part 1 and part 7 |
| [J8 The DOM and events](dom-and-events/) | the things on a page, reserving with a click | finding and creating elements, events, event delegation, forms | the SPA by hand in part 2 |
| [J9 JSON and data formats](json/) | the catalog as an export, saving favorites | `JSON.stringify` and `JSON.parse`, dates, copies with `structuredClone` | data from the server, storing in the browser |
| [J10 Formatting numbers and dates](formatting/) | deposits in francs, return dates in English | amounts in francs, date and time, time zones with `Intl` | wherever the app shows amounts and dates |

What goes beyond these basics is in part 1, such as modules, values and references in detail, `map`, `filter` and `reduce` and asynchronous JavaScript with `fetch`.

## The structure of a step

At the top you see what the counter helper already does and what this step adds, with the code up to the step before. Then come the learning goals, the sections with examples and a figure, the exercises at three levels with solutions, the common mistakes and a self-check. At the end the step shows where to go next.
