---
title: Control flow
description: Decisions with if, else and switch, the conditional operator and loops with for...of and while.
sidebar:
  order: 2
---

Control flow decides which code runs and how often. In Vue templates it later becomes `v-if` and `v-for`, while the script keeps using the statements of this unit.

:::goals
After this unit you can

- distinguish between cases with `if`, `else if` and `else`,
- use the conditional operator `? :` for short decisions,
- check a value against several fixed cases with `switch`,
- loop over values with `for...of` and `while` and steer loops with `break` and `continue`.
:::

## Decisions

`if` runs a block when a condition is true. With `else if` you check further cases in turn, and `else` catches whatever is left. You combine conditions with `&&` for "and", `||` for "or" and `!` for "not". A condition doesn't have to be a boolean, since JavaScript converts every value, as the unit [Variables, types and operators](../variables/) describes.

::code{file="examples/js/control-flow/{lang}/conditions.mjs"}

A `return` ends the function immediately. Since every case ends with `return`, you could also leave out both `else`. Many developers write functions that deal with special cases early with `return` and keep the main case at the end.

For a decision between two values there is the conditional operator `condition ? ifTrue : ifFalse`. It is an expression and produces a value, so it fits into an assignment or a template literal. You will see it often in Vue templates, for example as `{{ item.available ? 'Available' : 'On loan' }}`.

## Cases with switch

When you check one value against several fixed cases, `switch` is easier to read than a long chain of `else if`.

::code{file="examples/js/control-flow/{lang}/categories.mjs"}

`switch` compares with `===`. When a case matches, the code runs from there until a `return` or `break` comes. Without `break` it runs on into the next case. This is called fall-through, and it is a common source of bugs. `default` applies when no case matches, here for `'music'`.

## Loops

For arrays, `for...of` is the simplest loop. It hands you the values in order without making you deal with an index.

::code{file="examples/js/control-flow/{lang}/loops.mjs"}

The first loop adds up all deposits, and 20, 50, 30 and 40 make 140. The second one runs with `while` as long as a condition holds, here up to the first deposit of 40 or more. That's the deposit at position 1, since counting starts at 0. `index < deposits.length` comes first so that the loop also ends when no deposit matches.

When you need the index, there's the classic counting loop `for (let i = 0; i < deposits.length; i++)`. `break` leaves a loop immediately, `continue` skips the rest of the current pass. `for...in`, by contrast, loops over the keys of an object and isn't meant for arrays.

In part 1 you learn the methods `map`, `filter` and `find`, which make many loops over arrays shorter. The loops of this unit stay useful anyway, for example when you want to stop early.

## Common mistakes

| Mistake | What helps |
|---|---|
| `if (x = 5)` assigns instead of comparing and is always true. | Compare with `===`. |
| A `case` without `break` or `return` runs into the next case. | End every case with `break` or `return`. |
| `for (const i in names)` gives the indexes as strings, not the names. | Use `for...of` for arrays. |
| A `while` loop never changes its condition and runs forever. | Make sure every pass gets closer to the exit condition. The "Stop" button aborts such a program. |
| `for (let i = 0; i <= names.length; i++)` reads one element too many. | Compare with `<`, the last index is `length - 1`. |

## Exercises

::::exercise[Getting started]
The array `[true, false, true, true, false]` tells for five things whether they are in. Count with a loop how many are available.

:::solution[Solution]
::code{file="examples/js/control-flow/{lang}/solution-1.mjs"}

The output is 3. Since `isIn` already is a boolean, `if (isIn)` is enough, and there's no need to compare with `=== true`.
:::
::::

::::exercise[Going further]
Find the first deposit above CHF 40 in the array `[20, 30, 50, 80, 10]`. Stop the loop as soon as you have found it. If there is none, the result should be `null`.

:::solution[Solution]
::code{file="examples/js/control-flow/{lang}/solution-2.mjs"}

The output is 50. Thanks to `break`, the loop never looks at 80 and 10. `found` starts as `null` so that the result is right even if no deposit matches. In part 1, `deposits.find((deposit) => deposit > 40)` does the same in one line, but returns `undefined` instead of `null` when nothing matches.
:::
::::

::::exercise[Challenge]
Write a function `isOpen(day, hour)` that tells whether Lorraine Commons is open at a full hour. It is open on Wednesday from 5 to 7 p.m. and on Saturday from 10 a.m. to 1 p.m. The days are called `'wednesday'` and `'saturday'`, and the hour uses the 24-hour clock. At 7 p.m. the shop is already closed. Check Wednesday at 6 p.m., Wednesday at 7 p.m., Saturday at 10 a.m. and Monday at 11 a.m.

:::solution[Solution]
::code{file="examples/js/control-flow/{lang}/solution-3.mjs"}

The output is `true false true false`. The start counts, the end doesn't, so the left side has `>=` and the right side `<`. With this rule two time slots never overlap when one ends where the other begins. For all other days the function returns `false` at the end.
:::
::::
