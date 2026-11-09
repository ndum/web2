---
title: Objects and arrays
description: The counter helper keeps the nine things from the counter as objects in an array. Creating and reading objects and arrays, references and copies, destructuring and optional chaining.
sidebar:
  order: 4
---

::::step{n="4"}
It knows the drill, can tell whether a thing is in and counts the days of a loan. In this step it takes the nine things from the counter as objects into an array and counts what is in.

:::details[Code up to step 3]
::code{file="examples/js/functions/{lang}/desk.mjs"}
:::
::::

The data of an app is almost always objects and arrays. A thing in the catalog is an object, and the catalog is an array of such objects. Vue later makes this data reactive, but the basics stay the same.

:::goals
After this step you can

- create objects and arrays and read and change their values,
- loop over an array of objects,
- explain why two variables can point to the same object,
- pull values out with destructuring and guard against missing values with `?.`.
:::

## A thing as an object

In step 1 the details of the drill sat in separate variables, and `isIn` from step 3 already received a small object. An object groups such values under names, its keys. You read a value with a dot, `item.deposit`, or with square brackets when the key is stored in a variable.

::code{file="examples/js/objects-and-arrays/{lang}/item.mjs"}

`item[field]` reads the key whose name `field` holds, here `availableFrom`. You can add to an object after creating it. `item.category = 'Kitchen'` adds a new key even though `item` was declared with `const`. `Object.keys` returns all keys as an array, `Object.values` the values and `Object.entries` both as pairs.

## The catalog as an array

An array is an ordered list. Positions are counted from 0, `items[0]` is the first thing, and `items.length` tells you how many there are. The figure shows where the raclette oven ends up in the catalog.

![A thing as an object in the array. On the left an object for the raclette oven with the keys id, name, deposit and availableFrom and their values 3, Raclette oven, 30 and null. An arrow leads into an array with the nine things of the catalog. There the object stands in third place, at items\[2\], after the drill at items\[0\] and the tent for four at items\[1\]. The other six things stand at items\[3\] to items\[8\].](../../../../assets/figures/en/j4-object-in-array.svg)

In the counter helper the nine things from the counter sit in an array, one per line. A loop from step 2 walks through them in order, and `isIn` from step 3 tells whether a thing is in. `inStock` counts the things that are in, and `depositOut` adds up the deposits of the things on loan.

::code{file="examples/js/objects-and-arrays/{lang}/desk.mjs"}

`for...of` hands you the next object in every round, which is why the variable is called `item` and not `i`. `push` adds a new thing at the end, and the length grows by one. `includes` checks whether a value is there, and `indexOf` returns its position or -1 when it is missing.

## References and copies

A variable doesn't hold the object itself but a reference to it. When you assign a thing to a second variable, both point to the same object.

::code{file="examples/js/objects-and-arrays/{lang}/references.mjs"}

`sameDrill` is not a second drill but a second name for the same one. Change the deposit through `sameDrill` and the drill in the catalog has a deposit of 25 francs too. The spread operator `...` makes a copy by moving all fields into a new object. Fields that follow overwrite the copied ones, which is why `copy` is back at 20 francs. Spread works the same way for arrays, `[...favorites]` is a new array with the same values.

For objects, `===` compares the references, not the content. So the copy is not equal to the original, but the second name is. Spread copies only the top level. The unit [JSON and data formats](../json/) shows how to copy inner objects as well with `structuredClone`, and part 1 covers this in more detail in the chapter [Values and references](../../javascript/values-and-references/).

## Destructuring and missing values

Destructuring pulls several values out of an array or an object at once. For arrays the position counts, for objects the name.

::code{file="examples/js/objects-and-arrays/{lang}/destructure.mjs"}

`const [first, ...rest] = items` takes the first thing and collects the rest in a new array. `const { name, availableFrom, category = 'no category' } = items[1]` pulls out two fields and sets a default, because the tent has no category in this array. The last line asks for the name of the owner, which doesn't exist. Without protection, `items[1].owner.name` would throw a `TypeError`, since `owner` is `undefined`. Optional chaining `?.` stops in that case and returns `undefined`, and `??` puts "association" in its place.

Destructuring works for parameters too, `function describe({ name, deposit })` takes the fields straight from the object it receives. In Vue you'll meet this with composables that return several values in one object, such as `const { favorites, toggle } = useFavorites()`.

## Exercises

::::exercise[Getting started]
Create the lawn mower as the tenth thing, with the `id` 10 and a deposit of CHF 40. It is in right now. Add it to the catalog of nine things with `push` and print the new length and the name of the last thing.

:::solution[Solution]
::code{file="examples/js/objects-and-arrays/{lang}/solution-1.mjs"}

`push` changes the array itself, so `const` is fine. The last thing sits at position `items.length - 1`, here at position 9.
:::
::::

::::exercise[Going further]
Write a function `byId(items, id)` that returns the thing with that `id`, or `undefined` if there is none. Try it with the projector and with the `id` 12, which the counter helper doesn't know.

:::solution[Solution]
::code{file="examples/js/objects-and-arrays/{lang}/solution-2.mjs"}

The loop returns the thing as soon as the `id` matches, which also ends the function. If it finds none, the last line returns `undefined`. `items.find((item) => item.id === id)` is shorter, and part 1 shows these array methods.
:::
::::

::::exercise[Challenge]
A member keeps their favorites as an array of ids, `[3, 6, 8]`, and wants to take the projector with the `id` 6 off the list. Copy the list before you remove the `id`, and show with your output that the old list stays the same.

:::solution[Solution]
::code{file="examples/js/objects-and-arrays/{lang}/solution-3.mjs"}

`[...favorites]` creates a new array. `splice` removes one element at the position that `indexOf` returns and changes only the copy. Without the copy, `splice` would change the member's list as well.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| After `sameDrill.deposit = 25` the drill in the catalog has a deposit of 25 francs too. | `sameDrill` points to the same object. Copy with `{ ...drill }` when the original should stay as it is. |
| `items[9]` returns `undefined`. | Arrays count from 0, the ninth thing is `items[8]` and the last one `items[items.length - 1]`. |
| `item.owner.name` stops with a `TypeError`. | Write `item.owner?.name` when a value can be missing. |
| Two objects with the same content aren't equal with `===`. | Compare a unique field such as the `id`. |
| `const` is expected to protect an object from changes. | `const` only prevents a new assignment to the variable, the fields can still change. |

## Self-check

::::selfcheck
1. Why does `sameDrill.deposit = 25` change `items[0]` as well?
2. When do you need `item[key]` instead of `item.key`?
3. What does `items.length` return after a `push`, and at which position is the new thing?

:::solution[Answers]
1. `sameDrill` and `items[0]` are two names for the same object. The assignment changes the object itself, not one of the variables.
2. When the key is stored in a variable or isn't a valid name, as with `item[field]`.
3. The old length plus one. The new thing sits at the end, at position `items.length - 1`.
:::
::::

:::next
In step 5 the counter helper writes a line for every thing and finds things by their name. Continue with [J5 Strings and template literals](../strings/).
:::
