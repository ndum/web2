---
title: Functions and scope
description: The counter helper checks with isIn whether a thing is in, counts the days of a loan with loanDays and hands out numbers for reservations. Functions and arrow functions, default values for parameters, where a variable is valid and how closures remember values.
sidebar:
  order: 3
---

::::step{n="3"}
It knows whether the drill is in and on which days the counter is open. In this step it puts its questions into functions, counts the days of a loan and hands out numbers for reservations.

:::details[Code up to step 2]
::code{file="examples/js/control-flow/{lang}/desk.mjs"}
:::
::::

In JavaScript, functions are values. You can store a function in a variable and return it from another function. Vue relies on this everywhere. An event handler is a function, and a composable from part 5 is a function that remembers values.

:::goals
After this step you can

- write functions as declarations and as arrow functions and call them,
- give parameters default values,
- explain in which area a variable is valid,
- recognize a closure and use it to remember values between calls.
:::

## Writing functions

A function puts code under a name, and you can call it as often as you like. You'll see two notations all the time in the course. A function declaration starts with `function` and a name. An arrow function is an expression that you usually assign to a constant.

::code{file="examples/js/functions/{lang}/open.mjs"}

`isOpen` is a declaration with the parameter `day` and a block in curly braces. In the call `isOpen('Saturday')`, `day` receives the value `'Saturday'`, the argument. `return` hands back the result of the comparison and ends the function. The condition that appeared twice in the counter helper now sits in this one place.

`isClosed` is an arrow function whose body is a single expression. In that case you need neither curly braces nor `return`, because the value of the expression is the result. It calls `isOpen` and flips the result with `!`. Arrow functions are short and suit small tasks, for example as an argument to another function. They have no `this` of their own, which [Classes and this](../classes/) explains. If an arrow function has exactly one parameter, you may leave out the parentheses around it. The course writes them anyway, so every arrow function looks the same.

## Default values for parameters

If someone calls a function with fewer arguments than it has parameters, the missing ones are `undefined`. A default value fills in a value for that case.

::code{file="examples/js/functions/{lang}/defaults.mjs"}

When the member number is missing, `member = 'M-117'` fills in the number of the test member. The default also applies when someone passes `undefined` explicitly, as for the projector. It doesn't apply for `null`, because `null` is a value someone passes on purpose, which is why the last line shows `null`. If `null` should get the number of the test member as well, write `member ?? 'M-117'` in the body of the function.

A default value may use parameters that come before it. `function loanDays(from, to = from)` sets the end to the start when it is missing.

## Scope

A variable you declare with `const` or `let` is valid in the block where it stands, that is, between the nearest curly braces. Outside of it, the variable doesn't exist. This area is called the scope of the variable.

::code{file="examples/js/functions/{lang}/scope.mjs"}

`maxDays` stands outside of all functions and blocks, so it is valid in the whole file, but not in other files. `allowed` can read it, because you can see from the inside out. `tooLong`, on the other hand, only exists in the body of `allowed`, and you can't see from the outside in. Click "Edit", remove the two slashes in front of the last line, and the program stops with a `ReferenceError`.

The loop creates its own `days` in every pass, and the parameter `days` of `allowed` is a second variable with the same name. Each one is valid only in its own block, so the two never get in each other's way.

## Closures

A function remembers the variables that existed where it was created, even long after the outer function has finished. This is called a closure. The counter helper uses one to hand out the numbers for reservations.

::code{file="examples/js/functions/{lang}/desk.mjs"}

After this step the counter helper has three functions. `isIn` receives a thing and checks whether its `availableFrom` is `null`. For that, the drill sits in an object that groups `name` and `availableFrom`, and step 4 covers objects in detail. `loanDays` counts the days between pickup and return. `Date.parse` turns a date into the milliseconds since January 1, 1970, and the difference divided by the 86,400,000 milliseconds of a day gives the days. From Saturday, November 7, to Wednesday, November 11, that makes 4 days. The underscores in `86_400_000` only make the number easier to read.

`makeNumbering('R')` creates the variable `count` and returns an arrow function that counts it up. This function is then stored in `nextNumber`, and it joins the prefix, a hyphen and the value of `count` with `+`. `makeNumbering` has finished after the call, but `nextNumber` keeps `count` alive. Every call of `nextNumber` increases the same `count` and returns the next number, first R-1 and then R-2. The figure shows what the closure remembers after each call.

![The closure of nextNumber. On the left are three calls in order. The first, makeNumbering('R'), creates prefix and count and returns the function nextNumber. The second and the third call nextNumber and return 'R-1' and 'R-2'. On the right is what the closure remembers, prefix equal to 'R' and count equal to 0 after the first call, count equal to 1 after the second and count equal to 2 after the third. An arrow leads from each call to the matching line.](../../../../assets/figures/en/j3-closure.svg)

Nobody can reach `count` from outside, and only the returned function can change the value. A second call such as `makeNumbering('L')` creates a `count` of its own, so two series of numbers count independently. Composables in part 5 work on the same principle. A function creates state and returns functions that work with it.

## Exercises

::::exercise[Getting started]
Write an arrow function `tooLong(from, to)` that uses `loanDays` from the counter helper to check whether a loan lasts longer than seven days. Try Saturday, November 7, to Saturday, November 14, and Saturday, November 7, to Wednesday, November 18.

:::solution[Solution]
::code{file="examples/js/functions/{lang}/solution-1.mjs"}

The output is `7 false` followed by `11 true`. Saturday to Saturday is exactly seven days, the longest loan allowed. From November 7 to November 18 it's 11 days, which is too long. `tooLong` calls `loanDays` and compares the result, since a function may use other functions.
:::
::::

::::exercise[Going further]
Give the parameter `prefix` of `makeNumbering` the default value `'R'`, so that `makeNumbering()` returns numbers for reservations. Next to it, create a second counter for loans with `'L'` and show that the two count independently.

:::solution[Solution]
::code{file="examples/js/functions/{lang}/solution-2.mjs"}

The output is `R-1 R-2` followed by `L-1 R-3`. Every call of `makeNumbering` creates its own `count`. That's why `nextLoan` starts at 1 while `nextNumber` goes on at 3.
:::
::::

::::exercise[Challenge]
The volunteers want to know how many numbers the counter helper has handed out so far. Rewrite `makeNumbering` so that it returns an object with two functions. `next` returns the next number, and `issued` returns how many numbers have been handed out. `count` itself must not be reachable from outside.

:::solution[Solution]
::code{file="examples/js/functions/{lang}/solution-3.mjs"}

`{ next: ..., issued: ... }` creates an object with two keys, and step 4 covers objects in detail. Both functions are created in the same call of `makeNumbering`, so they share the same `count`. The object only has the keys `next` and `issued`, and `numbers.count` is `undefined`. The count can only change through `next`. A composable in part 5 returns an object with values and functions in the same way.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| An arrow function with curly braces returns `undefined`, for example `(day) => { isOpen(day) }`. | Write `return` in the block or drop the braces, `(day) => isOpen(day)`. |
| An arrow function is meant to return an object, and `() => { count: 1 }` returns `undefined`. | Wrap the object in parentheses, `() => ({ count: 1 })`. |
| A function is passed on and accidentally called, as in `addEventListener('click', reserve())`. | Pass the function itself, `addEventListener('click', reserve)`. |
| A default value is meant to apply for `null` too. | Use `??` in the function body, since defaults only apply for `undefined`. |
| `makeNumbering('R')` runs before every reservation, and each one gets the number R-1. | Call `makeNumbering` once and keep the function it returns. |

## Self-check

::::selfcheck
1. What does an arrow function without curly braces return, and what does one with braces but without `return` return?
2. Why does `requestLabel('Jigsaw', null)` give the text "Jigsaw for null" and not "Jigsaw for M-117"?
3. Why does `nextNumber` keep counting even though `makeNumbering` finished long ago?

:::solution[Answers]
1. Without braces, the value of the expression is the result. With braces, the body is a block, and without `return` the function returns `undefined`.
2. A default value only applies when the argument is missing or `undefined`. `null` is a value someone passes on purpose.
3. `nextNumber` is a closure. It remembers the `count` from the call of `makeNumbering` in which it was created, and every call changes that `count`.
:::
::::

:::next
In step 4 the counter helper takes the nine things from the counter as objects into an array and counts what is in. Continue with [J4 Objects and arrays](../objects-and-arrays/).
:::
