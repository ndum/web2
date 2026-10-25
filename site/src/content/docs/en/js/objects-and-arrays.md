---
title: Objects and arrays
description: Creating, reading and changing objects and arrays, references and copies, spread, destructuring and optional chaining.
sidebar:
  order: 4
---

An app's data almost always consists of objects and arrays. A thing in the catalog is an object, and the catalog is an array of such objects. Vue later makes this data reactive, but the basics stay the same.

:::goals
After this unit you can

- create objects and arrays and read and change their values,
- explain why two variables can point to the same object,
- copy objects and arrays with spread,
- pull values out with destructuring and catch missing values with `?.`.
:::

## Objects

An object groups values under names, its keys. You read a value with a dot or with square brackets. You need the square brackets when the key is stored in a variable or isn't a valid name.

::code{file="examples/js/objects-and-arrays/{lang}/item.mjs"}

An object can be extended after it was created. `item.available = true` adds a new key, even though `item` was declared with `const`. `Object.keys` returns all keys as an array, `Object.values` the values and `Object.entries` both as pairs.

The last line asks for the name of the owner, which doesn't exist. Without protection, `item.owner.name` would throw a `TypeError`, because `item.owner` is `undefined`. Optional chaining with `?.` stops in this case and returns `undefined`, and `??` puts "association" in its place.

## Arrays

An array is an ordered list. Positions are counted from 0, and `length` says how many elements it has.

::code{file="examples/js/objects-and-arrays/{lang}/list.mjs"}

`push` appends an element at the end and changes the array itself. `includes` checks whether a value occurs, and `indexOf` returns its position or -1 if it is missing. The second and third lines of output show destructuring, which comes further down.

## References and copies

A variable doesn't hold the object itself, but a reference to it. If you assign one variable to another, both point to the same object.

::code{file="examples/js/objects-and-arrays/{lang}/references.mjs"}

`sameTent` isn't a second tent, but a second name for the same one. That's why `tent.available` is `false` as well after the change through `sameTent`. A copy is made with the spread operator `...`, which carries all fields over into a new object. Fields that come after it overwrite the copied ones, so `copy.available` is `true` again. Spread works the same with arrays, and `[...names, 'Projector']` is a new array with one more element.

For objects, `===` compares the references, not the content. Two objects with the same content are therefore not equal, but an object is equal to itself.

Spread only copies the top level. If an object contains another object or an array, the original and the copy share that inner object. The unit [JSON and data formats](../json/) shows how to copy inner objects as well with `structuredClone`. Part 1 covers this in more detail in the chapter "Values and references".

## Destructuring

Destructuring pulls several values out of an array or an object at once. For arrays, position counts. `const [first, ...rest] = names` takes the first element and collects the rest in a new array. For objects, the name counts. `const { name, deposit = 20 } = item` takes two fields and sets a default in case `deposit` is missing. In the example above the jigsaw has no deposit, so it is 20.

Destructuring also works for parameters, and `function describe({ name, deposit })` takes the fields straight from the object passed in. In Vue you meet it with composables that return several values in one object, such as `const { favorites, toggle } = useFavorites()`.

## Common mistakes

| Mistake | What helps |
|---|---|
| A copy made with `const copy = original` changes the original too. | Copy with `{ ...original }` or `[...original]`, and nested data with `structuredClone`. |
| `item.owner.name` throws a `TypeError` because `owner` is missing. | Write `item.owner?.name`. |
| Two objects with the same content are compared with `===`. | Compare a unique field such as the `id`. |
| `names[names.length]` is meant to return the last element and is `undefined`. | Use `names[names.length - 1]` or `names.at(-1)`. |
| `const` is meant to protect an object from changes. | `const` only prevents reassigning the variable, and the fields can still change. |

## Exercises

::::exercise[Getting started]
Create an object `member` with the fields `id` (`'M-117'`), `firstName` (`'Martina'`) and `memberSince` (2024). Use it to print the line "Martina (M-117) since 2024".

:::solution[Solution]
::code{file="examples/js/objects-and-arrays/{lang}/solution-1.mjs"}

A template literal inserts the three values into the text. The unit [Strings and template literals](../strings/) has more on template literals.
:::
::::

::::exercise[Going further]
Create an empty basket `basket` and add "Tent" and "Sleeping bag". Then add "Tent" a second time, but only if it isn't in the basket yet. At the end the program should print `2 Tent + Sleeping bag`.

:::solution[Solution]
::code{file="examples/js/objects-and-arrays/{lang}/solution-2.mjs"}

`includes` prevents the second tent, and `join(' + ')` joins the names into one string. `basket` is declared with `const` and can still be filled, because `push` changes the array, not the variable.
:::
::::

::::exercise[Challenge]
You have `const reservation = { item: { name: 'Projector' }, from: '2026-11-07' }`. With a single destructuring, get the thing's name as `name`, the end as `to` with the start as its default, and the note as `note`. Then print the member's e-mail address or "no e-mail" without the program crashing.

:::solution[Solution]
::code{file="examples/js/objects-and-arrays/{lang}/solution-3.mjs"}

The output is `Projector 2026-11-07 undefined` and then `no e-mail`. `item: { name }` steps into the inner object, and `item` itself doesn't become a variable. `to = reservation.from` applies because there is no `to`, and `note` stays `undefined`. `reservation.member` is missing, so `?.` stops before `.email` is read, and `??` puts in the text.
:::
::::
