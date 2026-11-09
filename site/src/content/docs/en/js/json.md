---
title: JSON and data formats
description: The counter helper writes the nine things as JSON, reads them back and stores the favorites as text. JSON.stringify and JSON.parse, what JSON doesn't know, dates and copies with structuredClone.
sidebar:
  order: 9
---

::::step{n="9"}
It shows the nine things on a page, and a click on "Reserve" reserves one. In this step it writes the nine things as JSON, reads them back and keeps a member's favorites as text.

:::details[Code up to step 8]
::code{file="examples/js/dom-and-events/{lang}/desk.html"}
:::
::::

JSON is the format servers and browsers use to exchange data. Whatever an app stores in the browser, such as the favorites, is usually JSON text as well. JSON looks like JavaScript but knows fewer types, and that's where the common mistakes come from. The volunteers of Lorraine Commons exported their spreadsheet with 60 things as JSON, and you work with that export from part 1 on. The counter helper does the same on a small scale with its nine things.

:::goals
After this step you can

- turn data into text with `JSON.stringify` and get it back with `JSON.parse`,
- say which values JSON doesn't know and what happens to them,
- keep dates intact through JSON,
- copy objects including all inner objects with `structuredClone`.
:::

## Turning data into text and back

`JSON.stringify` turns a value into text, and `JSON.parse` reads the text back in. The text follows strict rules. Keys and strings are in double quotes, and there are only objects, arrays, strings, numbers, `true`, `false` and `null`.

::code{file="examples/js/json/{lang}/stringify.mjs"}

The tent becomes one single string with no spaces between the fields, as `typeof` confirms. `JSON.parse` turns it back into an object, and the deposit is the number 50 again. It is a new object, though, so `back === tent` is false. With the third argument, here 2, `JSON.stringify` indents the text for reading.

With single quotes or a trailing comma, `JSON.parse` throws a `SyntaxError`. That's why you don't write JSON by hand but create it with `JSON.stringify`.

## The catalog as an export

The counter helper writes its nine things into a text with `JSON.stringify`, the way the volunteers did with the whole spreadsheet. Then it reads the text back and counts what is in.

::code{file="examples/js/json/{lang}/desk.mjs"}

The first line of the output is the export, one long string. You can write it to a file, send it to a server or store it in the browser. `JSON.parse` returns a new array with new objects, and the loop from step 4 counts 6 of 9 things in it, just as before. The favorites of M-117 become the text `[3,6,8]`, which is how the browser stores them. After `JSON.parse` they are numbers again, and `includes` finds the things with these ids.

## Dates and missing fields

A reservation has a date, and a note is often missing. JSON knows neither of them, it has no `Date` and no `undefined`.

::code{file="examples/js/json/{lang}/dates.mjs"}

`JSON.stringify` writes the date as text in ISO 8601 format. The field `note` is missing from the text entirely, because JSON doesn't know `undefined`, so the object read back has only four keys. After `JSON.parse`, `from` is a string. `new Date(back.from)` turns it into a date again, and `getUTCDay` returns 6, a Saturday. The figure follows the reservation on its way.

![A reservation through JSON and back. At the top the reservation as an object with the fields itemId 6, member M-117, from as a Date for November 7, 2026, days 4 and note with the value undefined. JSON.stringify turns it into one single string, in which from is text in ISO 8601 format and note is missing. JSON.parse reads the string into a new object. There from is a string and no longer a Date, and the field note does not exist.](../../../../assets/figures/en/j9-json-round-trip.svg)

The table lists what JSON makes of values it doesn't know.

| Value in JavaScript | What it becomes in JSON |
|---|---|
| `undefined` and functions in an object | the field is missing |
| `undefined` and functions in an array | `null` |
| `Date` | a string such as `"2026-11-07T00:00:00.000Z"` |
| `NaN` and `Infinity` | `null` |
| `Map` and `Set` | an empty object `{}` |

## Copies

Because `JSON.parse` always creates new objects, some programs copy data with `JSON.parse(JSON.stringify(original))`. That copies nested objects too, but loses everything JSON doesn't know. `structuredClone` also copies all levels and keeps dates, `Map` and `Set` intact. All major browsers have supported it since 2022.

::code{file="examples/js/json/{lang}/copy.mjs"}

The spread operator from step 4 copies only the top level. `spread.parts` is the same array as `tent.parts`, so after the `push` the tent has three parts as well. The copies made with `structuredClone` and through JSON each have an array of their own with two parts. Only with `structuredClone` does `availableFrom` stay a `Date`, while the copy made through JSON holds a string there.

`structuredClone` can't copy functions and throws an error in that case. For data that comes from a server this doesn't matter, because such data contains no functions.

## Exercises

::::exercise[Getting started]
Read the JSON text `'{"id": 6, "name": "Projector", "deposit": 80, "availableFrom": null}'` with `JSON.parse`. Print the name, "in" or "on loan", and the deposit a member pays when borrowing the projector together with the ladder, which has a deposit of CHF 20.

:::solution[Solution]
::code{file="examples/js/json/{lang}/solution-1.mjs"}

The output is `Projector in 100`. After `JSON.parse`, `deposit` is the number 80 and `availableFrom` is `null`, so `isIn` from step 3 and the addition work right away. If the text had `"80"` in quotes, the result would be `8020`.
:::
::::

::::exercise[Going further]
The browser stores a member's favorites as JSON text. An entry can be broken, though, for example `[3,6,`. Write a function `readFavorites(text)` that reads the text and returns an empty list for a broken one instead of stopping the program.

:::solution[Solution]
::code{file="examples/js/json/{lang}/solution-2.mjs"}

`JSON.parse` throws a `SyntaxError` for the broken text. `catch` catches it as in [J7 Handling errors](../errors/), reports it and returns `[]`. That way the app still starts with a broken entry, just without favorites.
:::
::::

::::exercise[Challenge]
The favorites of M-117 are kept in a `Set`, `{ member: 'M-117', favorites: new Set([3, 6, 8]) }`. What does `JSON.stringify` make of these settings? Store them so that the numbers of the favorites survive, and turn them back into a `Set` when reading.

:::solution[Solution]
::code{file="examples/js/json/{lang}/solution-3.mjs"}

A `Set` has no fields that JSON could see, so it becomes `{}` and the favorites are gone. `[...settings.favorites]` turns the `Set` into an array before storing. When reading, `new Set(back.favorites)` makes it a `Set` again, and `has(6)` finds the projector.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| The export is treated like an array, and `text.length` counts characters instead of things. | `JSON.stringify` returns a string. Only `JSON.parse` turns it back into an array. |
| After `JSON.parse` a date is a string, and `back.from.getUTCDay()` throws a `TypeError`. | Turn the text back into a date with `new Date(...)` after reading it. |
| JSON is written by hand with single quotes or a trailing comma. | Create JSON with `JSON.stringify`, not by hand. |
| A `Set` is stored and comes back as `{}`. | Turn it into an array before storing it, `[...set]`. |
| `JSON.parse` runs without `try`, and one broken entry in storage brings the app down. | Wrap data you read in `try` and `catch`, as in the "Going further" exercise. |
| An AI assistant copies data with `JSON.parse(JSON.stringify(...))`. | Use `structuredClone`, which keeps dates as well. |

## Self-check

::::selfcheck
1. What does `typeof JSON.stringify(items)` return, and what does `JSON.parse` make of this text?
2. Why is `from` no longer a `Date` after `JSON.parse`?
3. How does a copy made with `{ ...tent }` differ from one made with `structuredClone(tent)`?

:::solution[Answers]
1. `'string'`. From this text `JSON.parse` makes a new array with new objects that have the same content.
2. JSON has no type for dates. `JSON.stringify` writes the date as text, and `JSON.parse` can't know that this text was a date.
3. Spread copies only the top level, so original and copy share inner arrays and objects. `structuredClone` copies all levels and keeps `Date`, `Map` and `Set` as well.
:::
::::

:::next
In step 10 the counter helper shows the deposits in francs and the dates when things on loan are available again, written out in English. Continue with [J10 Formatting numbers and dates](../formatting/).
:::
