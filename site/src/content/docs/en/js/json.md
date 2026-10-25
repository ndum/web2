---
title: JSON and data formats
description: Turning data into text with JSON.stringify and back with JSON.parse, what JSON doesn't know, dates and deep copies with structuredClone.
sidebar:
  order: 9
---

JSON is the format in which servers and browsers exchange data. Whatever an app stores in the browser, such as the favorites, is usually JSON text as well. JSON looks like JavaScript but knows fewer types, and that's exactly where the common mistakes come from.

:::goals
After this unit you can

- turn data into text with `JSON.stringify` and get it back with `JSON.parse`,
- say which values JSON doesn't know and what happens to them,
- keep dates intact through JSON,
- copy objects including all inner objects with `structuredClone`.
:::

## Turning data into text and back

`JSON.stringify` turns a value into text, and `JSON.parse` reads the text back in. The text follows strict rules. Keys and strings are in double quotes, and there are only objects, arrays, strings, numbers, `true`, `false` and `null`.

::code{file="examples/js/json/{lang}/stringify.mjs"}

The first line shows what JSON makes of an object with a date. The date becomes a string in ISO 8601 format, and the field `note` is missing entirely, because JSON doesn't know `undefined`. After `JSON.parse`, `lentUntil` is therefore a string and no longer a `Date`. With the third argument, here 2, `JSON.stringify` indents the text for reading.

| Value in JavaScript | What it becomes in JSON |
|---|---|
| `undefined` and functions in an object | the field is missing |
| `undefined` and functions in an array | `null` |
| `Date` | a string such as `"2026-11-12T00:00:00.000Z"` |
| `NaN` and `Infinity` | `null` |
| `Map` and `Set` | an empty object `{}` |

## Copies

Because `JSON.parse` always creates new objects, some programs copy data with `JSON.parse(JSON.stringify(original))`. That copies nested objects too, but loses everything JSON doesn't know. Since 2022 all major browsers have `structuredClone`, which also copies dates, `Map` and `Set` correctly.

::code{file="examples/js/json/{lang}/copy.mjs"}

The copy made with `structuredClone` has an array `parts` of its own, so `push` doesn't change the original. With `structuredClone` the date stays a `Date`, while the copy through JSON turns it into text. The last line shows a mistake you will run into often. JSON requires double quotes, and with single ones `JSON.parse` throws a `SyntaxError`.

`structuredClone` can't copy functions and throws an error in that case. For data that comes from a server this doesn't matter, because such data contains no functions.

## Common mistakes

| Mistake | What helps |
|---|---|
| After `JSON.parse` a date is a string, and `date.getDay()` throws a `TypeError`. | Turn the text back into a date with `new Date(...)` after reading it. |
| JSON is written by hand with single quotes or a trailing comma. | Create JSON with `JSON.stringify`, not by hand. |
| A `Set` is stored and comes back as `{}`. | Turn it into an array before storing it, `[...set]`. |
| `JSON.parse` runs without `try`, and one broken entry in storage brings the app down. | Wrap data you read in `try` and `catch`, as in the unit [Handling errors](../errors/). |
| An AI assistant copies data with `JSON.parse(JSON.stringify(...))`. | Use `structuredClone`, which keeps dates as well. |

## Exercises

::::exercise[Getting started]
Read the JSON text `'{"id": 6, "name": "Projector", "deposit": 80, "available": false}'` with `JSON.parse`. Print the name, half the deposit and "free" or "on loan", depending on what `available` says.

:::solution[Solution]
::code{file="examples/js/json/{lang}/solution-1.mjs"}

The output is `Projector 40 on loan`. After `JSON.parse`, `deposit` is a number and `available` a boolean, so you can calculate and decide with them directly.
:::
::::

::::exercise[Going further]
Turn the reservation `{ item: 'Tent', from: new Date('2026-11-02T00:00:00Z') }` into JSON and back. Make sure `from` is a `Date` again afterwards, and print the day of the month.

:::solution[Solution]
::code{file="examples/js/json/{lang}/solution-2.mjs"}

The JSON text contains the date as a string in ISO 8601 format. `new Date(back.from)` reads this string as a date again. `getUTCDate` returns the day in UTC, so the result is 2 everywhere in the world.
:::
::::

::::exercise[Challenge]
A member's favorites are stored in a `Set`, `{ pageSize: 20, favorites: new Set([3, 7]) }`. What does `JSON.stringify` make of these settings? Store them so that the numbers of the favorites are kept.

:::solution[Solution]
::code{file="examples/js/json/{lang}/solution-3.mjs"}

A `Set` has no fields that JSON could see, so it becomes `{}`, and the favorites are gone. With `[...settings.favorites]` the `Set` becomes an array before storing. When reading, `new Set(array)` turns it back into a `Set`.
:::
::::
