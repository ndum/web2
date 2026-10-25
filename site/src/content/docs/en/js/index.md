---
title: JS workshop
description: The JavaScript basics the course assumes, for looking things up and practicing, with runnable examples and solutions.
sidebar:
  label: Overview
  order: 0
---

The JS workshop holds the JavaScript the course assumes, in ten units. Every unit explains a topic briefly, shows it with examples from Lorraine Commons and ends with exercises at three levels with solutions.

You can work through the units in order or only through the ones the [entry test](../start/entry-test/) recommends. When a chapter assumes a topic, it points you to the matching unit.

## Running the examples

Below every example there is a "Run" button. The program then runs right in the browser, and its output appears below the code. "Edit" lets you change the code and run it again, and "Reset" restores the original. Predict what a program prints first, and only then check.

The examples of the unit "The DOM and events" are small HTML pages. They appear in a frame below the code, with the console output underneath.

All examples are also in the course repo under `examples/js`, one folder per unit. There you run them with Node.js.

```bash
cd examples/js/variables/en
node types.mjs
```

## The units

| Unit | Contents | Needed in the course |
|---|---|---|
| [Variables, types and operators](variables/) | `let` and `const`, primitive types, comparisons, what counts as true and false, `??` | everywhere |
| [Control flow](control-flow/) | `if` and `else`, the conditional operator, `switch`, loops with `for...of` and `while`, `break` and `continue` | everywhere |
| [Functions and scope](functions/) | functions and arrow functions, default values, scope, closures | from part 1, composables in part 5 |
| [Objects and arrays](objects-and-arrays/) | objects, arrays, references, spread, destructuring, optional chaining | from part 1 |
| [Strings and template literals](strings/) | template literals, string methods, search that ignores case, sorting | search and filter from part 3 |
| [Classes and this](classes/) | classes, private fields, getters, static methods, `this` and `bind` | error classes of your own, reading code with `this` |
| [Handling errors](errors/) | `throw`, `try`, `catch` and `finally`, error types, error classes of your own | data from the server in part 1 and part 7 |
| [The DOM and events](dom-and-events/) | finding and creating elements, events, event delegation, forms | the SPA built by hand in part 2 |
| [JSON and data formats](json/) | `JSON.stringify` and `JSON.parse`, dates, copies with `structuredClone` | data from the server, saving in the browser |
| [Formatting numbers and dates](formatting/) | amounts in francs, date and time, time zones with `Intl` | wherever the app shows amounts and dates |

Anything beyond these basics is in part 1, such as modules, values and references in detail, `map`, `filter` and `reduce`, and asynchronous JavaScript with `fetch`.
