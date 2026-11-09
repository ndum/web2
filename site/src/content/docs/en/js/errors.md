---
title: Handling errors
description: The counter helper checks a request and declines it with a reason when it breaks a rule. Raising errors with throw, catching them with try, catch and finally, the built-in error types and error classes of your own.
sidebar:
  order: 7
---

::::step{n="7"}
It records reservations as objects of a class and works out their days. In this step it checks a request before accepting it. If the day doesn't fit, the loan is too long or the thing is already reserved, it declines the request with a reason.

:::details[Code up to step 6]
::code{file="examples/js/classes/{lang}/desk.mjs"}
:::
::::

Programs fail on input that doesn't fit and on servers that don't answer. When that happens, an error shouldn't just end the program but land in a place that knows what to do about it. In part 1 and part 7 you load data from a server, and that's where you need these basics.

:::goals
After this step you can

- raise an error with `throw` and give it a clear message,
- catch errors with `try` and `catch` and explain when `finally` runs,
- recognize the most common error types of JavaScript,
- write an error class of your own and handle only the errors you know.
:::

## Throwing and catching errors

`throw` raises an error. The program stops at that point and jumps to the nearest matching `catch`. If there is none, the whole program ends with the error's message. Take the deposit of a new thing, which the volunteers type into a form. Anything from 10 to 80 francs is allowed.

::code{file="examples/js/errors/{lang}/parse.mjs"}

`parseDeposit` throws a `RangeError` when the text doesn't give a whole number from 10 to 80. `new RangeError(...)` creates the error object with its message, and `throw` throws it. The loop calls the function inside a `try` block. With `'40'` everything runs normally. With `'5'` and `'forty'` the program jumps to the `catch` block, which prints the name and the message of the error. After that the loop goes on with the next text, because the error has been caught. The `finally` block runs in every case, with or without an error. It's the place for cleaning up, for example hiding a loading indicator.

## Error types

JavaScript has several built-in error types. The language throws most of them itself, as with the four functions in this example.

::code{file="examples/js/errors/{lang}/types.mjs"}

Every arrow function in the array holds a typical mistake, and the loop calls them one after the other inside `try`. There is no `items[1]`, since the array holds only one thing, and `undefined.name` throws a `TypeError`. `itemz` is a typo, no variable has that name. `JSON.parse` expects double quotes, and `toFixed` allows at most 100 decimal places.

| Type | When it occurs | Example |
|---|---|---|
| `TypeError` | a value doesn't have the expected type | `items[1].name` when there is no `items[1]` |
| `ReferenceError` | a variable doesn't exist | a typo such as `itemz` |
| `SyntaxError` | code or JSON isn't valid | `JSON.parse("{ 'name': 'Tent' }")` |
| `RangeError` | a value is outside the allowed range | `(20).toFixed(200)` |
| `Error` | general error for your own cases | `throw new Error('The thing is already reserved then')` |

Every error has a field `name` with its type and a field `message` with its message. In the console you also see the stack, the chain of calls up to the place where the error occurred. The example prints only `error.name`, because the wording of the messages differs from browser to browser.

## Checking a request

Before the counter helper accepts a request, it checks it against the rules of the association. Pickup and return only happen on Wednesday or Saturday, a loan lasts at most seven days, and the thing must not already be reserved during that time. Picking up on the return day of another loan gets in nobody's way. The figure shows which check stops each request of the counter helper and which one gets through.

![A request through checkRequest. On the left, in the try block, the three checks of checkRequest one below the other, Wednesday or Saturday, at most seven days and thing still free, with accepted below them. A request that passes a check goes on to the next one with yes. From every check an arrow marked throw leads right into the catch block to the request that fails there. The drill from 2026-11-09 to 2026-11-11 fails the first check, the raclette oven from 2026-11-07 to 2026-11-18 the second and the projector from 2026-11-07 to 2026-11-11 the third. The projector from 2026-11-11 to 2026-11-14 passes all three and is accepted, catch stays empty for it.](../../../../assets/figures/en/j7-check-request.svg)

In the code, `checkRequest` throws an error with the reason for every rule a request breaks.

::code{file="examples/js/errors/{lang}/desk.mjs"}

For the check, the counter helper only needs the id of the thing and the two dates of a reservation, so the reservations are plain objects here. The one reservation in the array is R-1 from step 6.

`isOpenOn` reads the weekday with `getUTCDay`, where 0 is Sunday, 3 Wednesday and 6 Saturday. `new Date('2026-11-09')` stands for midnight in UTC, so `getUTCDay` returns the same day anywhere in the world. `checkRequest` returns nothing. If the function runs through without a `throw`, the request is fine and the loop prints "accepted". As soon as a check throws an error, the program leaves `checkRequest` and the rest of the `try` block and lands in the `catch` block, which prints the reason from `error.message`. The request for the drill fails the first check, because November 9 is a Monday.

The last check compares ISO dates as strings. Two loans overlap when each one starts before the other one ends. Since the comparison uses the strict `<`, the first request may pick up the projector on November 11, the day it comes back.

## Error classes of your own

For errors that belong to your own app, a class of their own pays off. It builds on `Error` with `extends` and can carry extra fields. The `catch` block then recognizes the error by its class rather than by its text.

::code{file="examples/js/errors/{lang}/custom.mjs"}

`NotAvailableError` calls the constructor of `Error` with `super`, which stores the message. Then the class sets a name of its own and keeps the thing in the field `item`. The drill is in and goes out without an error. For the tent, `handOut` throws the new error, and the `catch` block reads from `error.item` when the tent is back. Before that, it checks with `instanceof` whether it's this error at all. It rethrows every other error with `throw error`, because at this point the program doesn't know how to deal with a typo or a missing field.

## Exercises

::::exercise[Getting started]
A member swaps the dates in the form, picking up on November 14 and returning on November 11. First find out what `checkRequest` from the counter helper makes of it. Then add a check that declines this request with a reason of its own.

:::solution[Solution]
::code{file="examples/js/errors/{lang}/solution-1.mjs"}

Without the new check, `checkRequest` accepts the request. Both days are opening days, and `loanDays` gives -3, which is not more than seven. The new check compares the two ISO dates as strings and throws an error when the return comes before the pickup.
:::
::::

::::exercise[Going further]
While the counter helper loads its list, it shows a loading indicator that has to go away in every case. Write a function `loadList()` that throws an error for testing, catches it and returns an empty list with `return` in the `catch` block. Turn the loading indicator off in the `finally` block and record in an array which blocks run in which order.

:::solution[Solution]
::code{file="examples/js/errors/{lang}/solution-2.mjs"}

The output is `0 false` and `try > catch > finally`. `finally` runs after `return []` in the `catch` block has set the return value, but before the function actually returns. That's why the loading indicator is off no matter which way `loadList` ends.
:::
::::

::::exercise[Challenge]
When a thing is already reserved, the counter helper should name the day from which it is free again. Write an error class `ReservedError` that carries this day in the field `until`, and a function `checkFree(request)` that throws it. In the `catch` block, handle only this error. Check the projector from November 7 to 11 and from November 11 to 14.

:::solution[Solution]
::code{file="examples/js/errors/{lang}/solution-3.mjs"}

`ReservedError` passes the message on to `Error` with `super` and stores the return day of the other reservation in `until`. Since the next member may pick up on the return day, the thing is free from exactly that day. The `catch` block reads the day from the error instead of digging it out of the message, and it rethrows every other error.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| An empty `catch` block swallows every error, and nobody notices anything. | At least print the error with `console.error` or rethrow it. |
| `catch` treats all errors the same, including programming errors such as a `TypeError`. | Check with `instanceof` and rethrow unknown errors. |
| `throw 'Invalid'` throws a string instead of an error, and `error.message` is `undefined`. | Always throw an error object, `throw new Error('Invalid')`. |
| Code after a `return` in the `try` block is meant to clean up and never runs. | Put the cleanup in `finally`, which also runs after a `return`. |
| The call to `checkRequest` sits outside `try`, and the first declined request ends the whole program. | Put the call that can throw inside `try`, as the loop of the counter helper does. |
| An AI assistant wraps every call in `try` and `catch` and only prints "Error". | Handle errors where you can do something useful, and show a message that says what happened. |

## Self-check

::::selfcheck
1. What happens to the remaining checks of `checkRequest` when the first one throws an error?
2. Why does the counter helper accept the request for the projector from November 11 to 14, even though the projector is reserved until November 11?
3. When does a `finally` block run?

:::solution[Answers]
1. They don't run anymore. `throw` leaves `checkRequest` at once, and the program continues in the `catch` block. Then the next request gets its turn, because `try` and `catch` sit inside the loop.
2. The check requires `request.from < other.to`, and `'2026-11-11' < '2026-11-11'` is `false`. Picking up on the return day doesn't count as an overlap.
3. Always, after the `try` block or after the `catch` block, even when one of them ends with `return`.
:::
::::

:::next
In step 8 the counter helper shows the nine things on a page, and a click reserves one. Continue with [J8 The DOM and events](../dom-and-events/).
:::
