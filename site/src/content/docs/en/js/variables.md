---
title: Variables, types and operators
description: The counter helper starts with the drill in a few variables and turns the text of a form field into a number. Variables with let and const, the primitive types, comparing with ===, what counts as true and false, and defaults with ??.
sidebar:
  order: 1
---

::::step{n="1"}
The counter helper is a small program for the volunteers at the counter of Lorraine Commons, and it starts in this step. You put the drill into a few variables and turn the text of a form field into a number.
::::

A program keeps values in variables, and every value has a type. You need both everywhere in the course, because Vue code is mostly ordinary JavaScript.

:::goals
After this step you can

- declare variables with `const` and `let` and explain your choice,
- name the primitive types of JavaScript and check them with `typeof`,
- turn the text of a form field into a number and compare values with `===`,
- say which values count as false and set defaults with `??`.
:::

## Variables with const and let

A variable gives a value a name. In modern JavaScript you declare it with `const` or `let`. A variable declared with `const` can't be reassigned, one declared with `let` can. Use `const` wherever you can and `let` only when the value has to change later, as with a running total.

::code{file="examples/js/variables/{lang}/declare.mjs"}

`maxDays` is a `const` because a loan never lasts more than seven days. `depositOut` adds up the deposits of the things on loan. For the tent, the beer bench set and the bike trailer, the cash box holds 50, 40 and 60 francs, 150 in all. `depositOut += 40` is short for `depositOut = depositOut + 40`. Click "Edit", remove the two slashes in front of the last line and run the program again. It stops with a `TypeError`, because `maxDays` can't be reassigned.

`const` only protects the variable, not its content. If a constant points to an object, you can still change its fields. [Objects and arrays](../objects-and-arrays/) has more on this.

You'll still find the older `var` in old tutorials. It applies to the whole function instead of just the block it stands in, which easily leads to bugs. The course doesn't use it.

## Primitive types

JavaScript has seven primitive types, and you meet five of them every day.

| Type | Example | Meaning |
|---|---|---|
| `string` | `'Raclette oven'` | text |
| `number` | `30`, `12.5` | number, whole or with decimal places |
| `boolean` | `true`, `false` | truth value |
| `undefined` | `undefined` | no value assigned yet |
| `null` | `null` | deliberately no value |

There are also `bigint` for very large whole numbers and `symbol` for unique keys, and the course needs neither. Everything else is an object, arrays and functions included. `typeof` tells you the type of a value.

::code{file="examples/js/variables/{lang}/types.mjs"}

`typeof` returns the type as a string. `available` is a boolean, since a comparison always produces `true` or `false`. For `null`, `typeof` reports `object`. That's an old bug of the language that was never fixed so that existing code keeps working. To check whether a value is `null`, use `value === null`. `pickup` hasn't received a value yet, so it's `undefined`. `null`, on the other hand, is a value someone sets on purpose. In the catalog, `availableFrom: null` means that a thing is in.

## Turning text into a number

The counter helper starts with the drill. Its name, its deposit and the date it's back from each go into a variable of their own. Then there's the number of days someone types into a form field for a loan.

::code{file="examples/js/variables/{lang}/desk.mjs"}

`availableFrom` is `null` because the drill is in, so `availableFrom === null` gives `true`. A form field always delivers text, even when it holds a 4. JavaScript treats text differently from numbers, and `'4' + 1` joins the two into `'41'`. `Number(daysField)` turns the string into the number 4, and `typeof` in the last line shows that `days` is a number. The figure shows the variables of the counter helper with their values and types.

![Variables with value and type. On the left are the variables name, deposit, availableFrom, daysField and days, on the right their values with the type. name holds the string 'Drill', deposit the number 20 and availableFrom the value null. daysField holds the string '4' from a form field. An arrow with Number(daysField) leads from this string to days, which holds the number 4.](../../../../assets/figures/en/j1-variables-and-types.svg)

`Number` also reads numbers with a decimal point such as `'12.5'`. With a comma, as in `'12,5'`, it returns `NaN`, just as for any text that can't be read as a number. The next section shows how to check for that. [The DOM and events](../dom-and-events/) shows how to read the text of a real form in the browser.

## Comparing values

`===` compares value and type. `==` first converts the values if their types differ, and the results surprise almost everyone. So always use `===` and `!==`.

::code{file="examples/js/variables/{lang}/equality.mjs"}

The first line shows the difference. `daysField === days` is false because a string and a number have different types. `daysField == days` converts the string to a number first and is true. If you convert it yourself with `Number`, the strict comparison holds as well.

If a string can't be read as a number, `Number` returns `NaN`, "Not a Number". `NaN` isn't even equal to itself, which is why you check with `Number.isNaN`.

The third line shows which values count as true or false. In a condition, JavaScript converts every value to a boolean, and `Boolean(...)` does the same explicitly. `false`, the number 0, the empty string `''`, `null`, `undefined` and `NaN` count as false and are called falsy. Everything else counts as true, including the string `'0'`.

## Defaults with `??` and `||`

Often a value is missing and you want a default in its place. Two operators do that, and they differ in one point.

::code{file="examples/js/variables/{lang}/fallback.mjs"}

`a || b` returns `b` as soon as `a` counts as false. For a count, that's a bug. The bike trailer is on loan, so none of the things for kids is in, and `kidsIn || 'unknown'` turns the valid 0 into "unknown". `a ?? b` returns `b` only if `a` is `null` or `undefined`. The note shows the difference from the other side. For `||` the empty string counts as missing, while for `??` it's a value, so the last line prints an empty line.

Use `??` when 0 or an empty string are valid values, and `||` only when you want to replace every falsy value.

## Exercises

::::exercise[Getting started]
Store the tent for four in three variables, the way the counter helper does with the drill. It has a deposit of CHF 50 and is back from November 12. Print its name and deposit, whether it's in and the type of `availableFrom`.

:::solution[Solution]
::code{file="examples/js/variables/{lang}/solution-1.mjs"}

The date sits in `availableFrom` as a string in the format YYYY-MM-DD, so `typeof` reports `string`. Since the value isn't `null`, the comparison gives `false`, and the tent is on loan.
:::
::::

::::exercise[Going further]
The form field for the days can hold `'4'`, `'four'` or nothing at all. Convert the three strings with `Number` and use `Number.isNaN` to check whether you get a number. What do you notice about the empty field?

:::solution[Solution]
::code{file="examples/js/variables/{lang}/solution-2.mjs"}

`'4'` becomes the number 4 and `'four'` becomes `NaN`. The empty field gives 0 rather than `NaN`, so `Number.isNaN` takes it for a valid number. Check for an empty field first, with a comparison such as `empty === ''`. Step 2 shows how to react to such cases with `if`.
:::
::::

::::exercise[Challenge]
The form field holds `'4'`. Predict what `daysField + 1`, `daysField - 1`, `daysField * 2`, `daysField == 4` and `daysField === 4` give. Check your answers with a program and explain why `+` works differently from `-` and `*`.

:::solution[Solution]
::code{file="examples/js/variables/{lang}/solution-3.mjs"}

The output is `41 3 8` followed by `true false`. When one side of `+` is a string, JavaScript joins both values as text. `-` and `*` only exist for numbers, so JavaScript converts `'4'` to 4 first. `==` converts as well, `===` doesn't. That's why you convert text from a form once with `Number` instead of relying on these conversions.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The content of a form field is used in a calculation, and `'4' + 1` gives `'41'`. | Convert the string to a number with `Number(...)` first and check it with `Number.isNaN`. |
| `==` instead of `===`, and suddenly `0 == ''` is true. | Always use `===` and `!==`. |
| `kidsIn \|\| 'unknown'` also replaces the number 0. | Use `kidsIn ?? 'unknown'` when 0 is a valid value. |
| `typeof value === 'object'` is meant to check for an object and is also true for `null`. | Also check `value !== null`. |
| `x === NaN` is never true. | Use `Number.isNaN(x)`. |
| An AI assistant writes `var`. | Use `const`, and `let` only when the value changes. |

## Self-check

::::selfcheck
1. When do you declare a variable with `let` instead of `const`?
2. What type does the value of a form field holding 4 have, and what do you do before calculating with it?
3. Why does `kidsIn || 'unknown'` print "unknown" for 0, while `kidsIn ?? 'unknown'` prints 0?

:::solution[Answers]
1. When the value has to change later, as with a running total such as `depositOut`. Otherwise use `const`, so nobody can reassign the variable by accident.
2. The type `string`, because a form field always delivers text. Convert it with `Number(...)` and check with `Number.isNaN` that it worked.
3. `||` takes the right-hand value as soon as the left one counts as false, and 0 counts as false. `??` takes it only for `null` or `undefined`.
:::
::::

:::next
In step 2 the counter helper decides whether the drill is in and whether the counter is open. Continue with [J2 Control flow](../control-flow/).
:::
