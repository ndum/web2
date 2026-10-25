---
title: Handling errors
description: Raising errors with throw, catching them with try, catch and finally, the built-in error types and error classes of your own.
sidebar:
  order: 7
---

Programs fail on input that doesn't fit, on servers that don't answer and on data that looks different than expected. In part 1 and part 7 you load data from a server and have to deal with such errors there. This unit covers the basics.

:::goals
After this unit you can

- raise an error with `throw` and give it a clear message,
- catch errors with `try` and `catch` and explain when `finally` runs,
- recognize the most common error types of JavaScript,
- write an error class of your own and handle errors selectively.
:::

## Throwing and catching errors

`throw` raises an error. The program stops at that point and jumps to the nearest matching `catch`. If there is none, the whole program ends with the error's message.

::code{file="examples/js/errors/{lang}/parse.mjs"}

`parseDeposit` throws a `RangeError` when the text isn't a valid number or the number would be negative. The loop calls the function in a `try` block. With `'20'` everything runs normally. With `'-5'` and `'twenty'` the program jumps to the `catch` block, which prints the name and message of the error. The `finally` block runs in every case, with or without an error. It is the place for cleaning up, for example hiding a loading indicator.

## Error types

JavaScript has several built-in error types. The language throws most of them itself.

| Type | When it occurs | Example |
|---|---|---|
| `TypeError` | a value doesn't have the expected type | `undefined.name` |
| `ReferenceError` | a variable doesn't exist | a typo in the name of a variable |
| `SyntaxError` | code or JSON isn't valid | `JSON.parse("{ 'name': 'Tent' }")` |
| `RangeError` | a value is outside the allowed range | `(20).toFixed(200)` |
| `Error` | general error for your own cases | `throw new Error('Server unreachable')` |

Every error has a field `name` with its type and a field `message` with its message. In the console you also see the stack, the chain of calls up to the place where the error occurred.

## Error classes of your own

For errors that belong to your own app, a class of their own pays off. It extends `Error` and can carry extra fields.

::code{file="examples/js/errors/{lang}/custom.mjs"}

`NotAvailableError` calls the constructor of `Error` with `super`, sets its own name and remembers the thing. The `catch` block checks with `instanceof` whether it is this error. It rethrows other errors with `throw error`, because at this point the program doesn't know how to deal with them. Reserving the drill works, and for the tent the program jumps to the `catch` block.

## Common mistakes

| Mistake | What helps |
|---|---|
| An empty `catch` block swallows every error, and nobody notices anything. | At least print the error with `console.error` or rethrow it. |
| `catch` treats all errors the same, including programming errors such as a `TypeError`. | Check with `instanceof` and rethrow unknown errors. |
| `throw 'Invalid'` throws a string instead of an error, and `error.message` is `undefined`. | Always throw an error object, `throw new Error('Invalid')`. |
| Code after a `return` in the `try` block is meant to clean up and never runs. | Put the cleanup in `finally`, which also runs after a `return`. |
| An AI assistant wraps every call in `try` and `catch` and only prints "Error". | Handle errors where you can do something useful, and show a message that says what happened. |

## Exercises

::::exercise[Getting started]
Write a function `parseDays(text)` that reads a number of days from a form field. Whole numbers from 1 to 7 are allowed, otherwise the function throws a `RangeError` with a message that says what is allowed. Test with `'3'`, `'9'` and `'2.5'` and print the message when there is an error.

:::solution[Solution]
::code{file="examples/js/errors/{lang}/solution-1.mjs"}

`Number.isInteger` rejects `2.5` and also `NaN`, in case someone types text. The message names the allowed range and the wrong value, so the member knows what to change.
:::
::::

::::exercise[Going further]
The app's settings are stored as JSON text. Write a function `readSettings(text)` that reads the text with `JSON.parse`. If the text isn't valid JSON, it prints a message to the console and returns the default settings `{ pageSize: 20 }`.

:::solution[Solution]
::code{file="examples/js/errors/{lang}/solution-2.mjs"}

The output is 50, then the message with `SyntaxError`, and then 20. The second text isn't JSON, because the key would have to be in double quotes and the whole thing in curly braces. The `return` in the `catch` block makes sure the app keeps running with usable values.
:::
::::

::::exercise[Challenge]
Does `finally` run even when the `catch` block leaves the function with `return`? Write a function `load` that throws an error, catches it and returns `'fallback'` in the `catch` block. Record in an array which blocks run in which order.

:::solution[Solution]
::code{file="examples/js/errors/{lang}/solution-3.mjs"}

The output is `fallback try > catch > finally`. `finally` runs after `catch` has determined the return value, but before the function actually returns. That's why `finally` is the right place for cleaning up, no matter which way a function ends.
:::
::::
