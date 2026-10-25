---
title: Functions and scope
description: Declaring functions, arrow functions, default parameter values, where a variable is valid and how closures remember values.
sidebar:
  order: 3
---

In JavaScript, functions are values. You can store them in variables, pass them to other functions and return them from functions. Vue relies on this everywhere. An event handler is a function, `computed` takes a function, and a composable from part 5 is a function that remembers values.

:::goals
After this unit you can

- write functions as declarations and as arrow functions,
- give parameters default values,
- explain in which area a variable is valid,
- recognize a closure and use it to remember values between calls.
:::

## Writing functions

You will see two notations all the time in the course. A function declaration starts with `function` and a name. An arrow function is an expression that you usually assign to a constant.

::code{file="examples/js/functions/{lang}/defaults.mjs"}

`formatDeposit` is a declaration with a block in curly braces and a `return`. `days` is an arrow function whose body is a single expression. In that case you need neither curly braces nor `return`, because the value of the expression is the result. Subtracting two dates gives milliseconds, and divided by the milliseconds of a day that leaves 3 days.

Arrow functions are short and suit small tasks, for example as an argument to another function. They have no `this` of their own, which the unit [Classes and this](../classes/) explains. If an arrow function has exactly one parameter, you may leave out the parentheses around it. The course writes them anyway, so every arrow function looks the same.

## Default values for parameters

If someone calls a function with fewer arguments than it has parameters, the missing ones are `undefined`. A default value such as `currency = 'CHF'` fills in a value for that case. It also applies when someone passes `undefined` explicitly, but not for `null`, because `null` is a value.

A default value may use parameters that come before it. `function loanDays(from, to = from)` sets the end to the start when it is missing.

## Scope

A variable you declare with `const` or `let` is valid in the block where it stands, that is, between the nearest curly braces. Outside of it, the variable doesn't exist.

```js
if (available) {
  const message = 'Available'
}
console.log(message) // ReferenceError: message is not defined
```

You can see from the inside out, but not from the outside in. A function can read every variable that is valid where the function is written. This area is called scope. Variables that stand in a module outside of all functions and blocks are valid in the whole file, but not in other files.

## Closures

A function remembers the variables that existed where it was created, even long after the outer function has finished. This is called a closure.

::code{file="examples/js/functions/{lang}/closure.mjs"}

Every call of `createIdGenerator` creates its own variable `next` and returns a function that counts it up. `reservationId` and `loanId` each have their own variable, so they count independently. Nobody can reach `next` from outside, and only the returned function can change the value. `next++` returns the old value first and then counts up.

Composables in part 5 work on the same principle. A function creates state and returns functions that work with it.

## Common mistakes

| Mistake | What helps |
|---|---|
| An arrow function with curly braces returns `undefined`, for example `(a, b) => { a + b }`. | Write `return` in the block or drop the braces, `(a, b) => a + b`. |
| An arrow function is meant to return an object, and `() => { id: 1 }` returns `undefined`. | Wrap the object in parentheses, `() => ({ id: 1 })`. |
| A function is passed on and accidentally called, as in `addEventListener('click', reserve())`. | Pass the function itself, `addEventListener('click', reserve)`. |
| A default value is meant to apply for `null` too. | Use `??` in the function body, since defaults only apply for `undefined`. |

## Exercises

::::exercise[Getting started]
Write an arrow function `isExpensive(deposit)` that returns `true` when a deposit is higher than CHF 40. What does it return for 20, 50 and 40?

:::solution[Solution]
::code{file="examples/js/functions/{lang}/solution-1.mjs"}

The output is `false true false`, since 40 is not higher than 40. The comparison already produces a boolean, so an `if` with `return true` and `return false` isn't needed.
:::
::::

::::exercise[Going further]
Write a function `loanDays(from, to)` that counts on how many days a thing is on loan. The first and the last day both count. If `to` is missing, the loan lasts one day. Test with `'2026-11-02'` to `'2026-11-04'` and with `'2026-11-02'` alone.

:::solution[Solution]
::code{file="examples/js/functions/{lang}/solution-2.mjs"}

The output is 3 and then 1. The default `to = from` applies when the second argument is missing. Because both days count, one is added to the difference in days.
:::
::::

::::exercise[Challenge]
Write a function `createCounter()` that returns an object with the methods `increase` and `reset`. `increase` counts up by one and returns the new count, `reset` sets it to 0. The count itself must not be reachable from outside.

:::solution[Solution]
::code{file="examples/js/functions/{lang}/solution-3.mjs"}

The output is 3 and then 1. `count` lives in the closure of `createCounter`, and both methods access the same variable. There is no `reservations.count`, so the count can only change through the two methods. The assignment in parentheses `(count += 1)` produces the new value, which is why `increase` returns it.
:::
::::
