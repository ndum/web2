---
title: Variables, types and operators
description: Variables with let and const, the primitive types, comparing with === and which values count as true or false.
sidebar:
  order: 1
---

This unit refreshes how JavaScript stores values, which types it knows and how it compares values. You need this everywhere in the course, because Vue code consists mostly of ordinary JavaScript.

:::goals
After this unit you can

- declare variables with `const` and `let` and explain your choice,
- name the primitive types of JavaScript and check them with `typeof`,
- compare values with `===` and explain why `==` brings surprises,
- say which values count as false and set defaults with `??`.
:::

## Variables with const and let

A variable gives a value a name. In modern JavaScript you declare it with `const` or `let`. A variable declared with `const` can't be reassigned, one declared with `let` can. Use `const` wherever possible and `let` only when the value has to change later, for example for a counter.

```js
const deposit = 20
deposit = 30 // TypeError: Assignment to constant variable.
```

`const` only protects the variable, not its content. If a constant points to an object, you can still change its fields. The unit [Objects and arrays](../objects-and-arrays/) has more on this.

You still find the older `var` in old tutorials. It applies to the whole function instead of just the block it stands in, which easily leads to bugs. The course doesn't use it.

## Primitive types

JavaScript has seven primitive types. You meet five of them every day.

| Type | Example | Meaning |
|---|---|---|
| `string` | `'Drill'` | text |
| `number` | `20`, `12.5` | number, whole or with decimal places |
| `boolean` | `true`, `false` | truth value |
| `undefined` | `undefined` | no value assigned yet |
| `null` | `null` | deliberately no value |

There are also `bigint` for very large whole numbers and `symbol` for unique keys, and the course needs neither. Everything else is an object, arrays and functions included. `typeof` tells you the type of a value.

::code{file="examples/js/variables/{lang}/types.mjs"}

`typeof` returns the type as a string. For `null` it reports `object`. That's an old bug of the language that was never fixed so that existing code keeps working. To check whether a value is `null`, use `value === null`. `returnDate` never got a value and is therefore `undefined`.

## Comparing values

`===` compares value and type. `==` first converts the values if their types differ, and the results surprise almost everyone. So always use `===` and `!==`.

::code{file="examples/js/variables/{lang}/equality.mjs"}

The first line shows the difference. `20 === '20'` is false because a number and a string have different types. `20 == '20'` converts the string to a number and is true. Values from form fields are always strings. If you want to calculate with them, convert them explicitly with `Number(...)`.

If a string can't be read as a number, `Number` returns `NaN`, "Not a Number". `NaN` isn't even equal to itself, which is why you check with `Number.isNaN`.

The third line shows which values count as true or false. In a condition, JavaScript converts every value to a truth value. `false`, the number 0, the empty string `''`, `null`, `undefined` and `NaN` count as false and are called falsy. Everything else counts as true, including the string `'0'` and an empty array.

## Defaults with `??` and `||`

Often a value is missing and you want a default in its place. There are two operators for that, and they differ in one point.

::code{file="examples/js/variables/{lang}/fallback.mjs"}

`a || b` returns `b` as soon as `a` counts as false. For a deposit that's a bug, because 0 is a valid deposit, and `input || 20` turns it into 20. `a ?? b` returns `b` only if `a` is `null` or `undefined`. The note shows the difference from the other side. For `||` the empty string counts as missing, for `??` it is a value, so the last line prints an empty line.

Use `??` when 0 or an empty string are valid values, and `||` only when you want to replace every falsy value.

## Common mistakes

| Mistake | What helps |
|---|---|
| The content of a form field is used in a calculation, and `'20' + 5` gives `'205'`. | Convert the string to a number with `Number(...)` first and check it with `Number.isNaN`. |
| `==` instead of `===`, and suddenly `0 == ''` is true. | Always use `===` and `!==`. |
| `value \|\| 20` also replaces a deposit of 0. | Use `value ?? 20` when 0 is a valid value. |
| `typeof value === 'object'` is meant to check for an object and is also true for `null`. | Also check `value !== null`. |
| `x === NaN` is never true. | Use `Number.isNaN(x)`. |
| An AI assistant writes `var`. | Use `const`, and `let` only when the value changes. |

## Exercises

::::exercise[Getting started]
For each of the values `50`, `'50'`, `false`, `undefined` and `null`, predict what `typeof` reports. Then write a program that prints all five types on one line, and compare.

:::solution[Solution]
::code{file="examples/js/variables/{lang}/solution-1.mjs"}

The output is `number string boolean undefined object`. The quotes turn 50 into a string. For `null`, `typeof` reports the old bug `object`.
:::
::::

::::exercise[Going further]
Write a function `depositOrDefault(value)` that returns a deposit, or 20 if none is given. A deposit of 0 is allowed and must be kept. Test it with 50, 0, `null` and `undefined`.

:::solution[Solution]
::code{file="examples/js/variables/{lang}/solution-2.mjs"}

The output is `50 0 20 20`. With `value || 20` a deposit of 0 would turn into 20 as well, because 0 counts as false.
:::
::::

::::exercise[Challenge]
Compute `0.1 + 0.2` and compare the result with `0.3`. Explain what happens. Then find a way to calculate with amounts in francs so that the comparison holds.

:::solution[Solution]
::code{file="examples/js/variables/{lang}/solution-3.mjs"}

JavaScript stores numbers in binary with 64 bits. 0.1 and 0.2 can't be represented exactly that way, just as one third doesn't come out evenly in decimal. The sum is therefore `0.30000000000000004` and not equal to `0.3`. Whole numbers up to about 9 quadrillion, on the other hand, are represented exactly. That's why many programs calculate in centimes, called Rappen in Switzerland, instead of francs and convert only for display, here with `(rappen / 100).toFixed(2)`.
:::
::::
