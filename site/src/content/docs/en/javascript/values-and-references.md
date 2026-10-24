---
title: Values and references
description: How primitive values and objects differ when you assign them, copies with spread and structuredClone, comparisons and changes that leave the original as it was.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler reports a bug. The association bought two more tents for four people, and a volunteer added them to the catalog with a small function.

> Since the new tents are in the catalog, something strange happens. When someone borrows one of them, the other one shows up as on loan too. And we have two of them.

The acceptance criteria are:

1. Every tent is an entry of its own in the catalog, with an id of its own.
2. Borrowing a tent changes only that one tent.
3. The parts of a tent, such as the pegs, belong to that tent only.
:::

:::goals
After this chapter you can

- explain how primitive values and objects differ when you assign them,
- find bugs in which two variables point to the same object,
- copy objects and arrays shallowly with spread and deeply with `structuredClone`,
- compare objects and change data without changing the original.
:::

## Values and references

When you assign a number to a second variable, that variable gets a copy of the value. With an object, JavaScript only copies the reference to it. Afterwards, both variables point to the same object.

::code{file="examples/01-javascript/values-and-references/{lang}/references.mjs"}

`copy += 1` changes only `copy`, and `count` stays 3. `sameTent`, on the other hand, isn't a second tent but a second name for the same object. Whatever you change through one name shows up through the other.

![Two variables, one object. On the left are the variables tent, sameTent and copy, on the right two objects in memory. An arrow leads from tent and one from sameTent to the same object, in which availableFrom equals 2026-11-14. An arrow leads from copy to a second object, which was made with the spread operator.](../../../../assets/figures/en/p1c2-references.svg)

All objects behave this way, including arrays, dates and functions. Only primitive values are copied, that is strings, numbers, booleans, `null` and `undefined`.

## Objects in functions

When you call a function, it gets the same references as the variables you pass in. So it can change an object passed to it.

::code{file="examples/01-javascript/values-and-references/{lang}/params.mjs"}

`markAsLent` changes the object that `drill` points to as well. `shout`, on the other hand, assigns a new value to its parameter `name`. That changes only the variable inside the function, and the variable `name` outside stays as it was. A function that changes objects passed to it has a side effect that nobody sees at the call. Such functions are the most common source of bugs like the one with the tents.

## The bug with the tents

The volunteer's function looks harmless. Read it and predict what the two lines at the end print.

::code{file="examples/01-javascript/values-and-references/{lang}/bug.mjs"}

The loop pushes the same object into the array twice. `items[0]` and `items[1]` are one single tent with two places in the list. That's why `items[1]` is on loan as well after `items[0]` was lent. The ids give the bug away too. The second pass overwrote the id of the one object, and both places show 2. Every tent needs an object of its own.

## Copies

The spread operator `...` carries all fields of an object over into a new object. With arrays, it carries all elements over into a new array.

::code{file="examples/01-javascript/values-and-references/{lang}/copies.mjs"}

After `{ ...tent }`, the copy has its own field `availableFrom`, and lending the copy leaves the original unchanged. But spread didn't copy the array `parts`, only the reference to it. Original and copy share the parts, which is why the original has three afterwards. Spread copies shallowly, only the top level.

`structuredClone` copies deeply, with all objects and arrays inside, and with dates, `Map` and `Set` as well. It can't copy functions and reports an error instead, and objects of a class lose their class. For data like the catalog, which comes from the server as JSON, it fits.

## Comparing

For objects, `===` compares the references, not the content.

::code{file="examples/01-javascript/values-and-references/{lang}/compare.mjs"}

Two objects with the same content are not equal, two equal strings are. That's why you compare things in the catalog through a field that makes every thing unique, the `id`. Comparing through `JSON.stringify` works here, but it's unreliable, because it depends on the order of the fields and turns dates into text.

## Changing without side effects

Instead of changing a thing in the catalog, a function can return a new list in which only the changed thing is a new object. `map` from the next chapter builds a new list from the old one for this.

::code{file="examples/01-javascript/values-and-references/{lang}/update.mjs"}

The old list stays as it was. The new list keeps every thing that didn't change as a reference, and only the lent tent is a new object. That costs little memory, and a single comparison with `===` shows whether a thing has changed. React, for example, detects changes to state in exactly this way. Vue does notice changes to existing objects too, as part 5 shows. A function without side effects is still easier to understand and to test, because it acts only through its return value.

## In code

Work with the volunteer's example. Read the code first and write down what you expect.

::code{file="examples/01-javascript/values-and-references/{lang}/bug.mjs"}

1. What does `console.log(items.length)` print at the end? Check it with "Edit" and "Run".
2. Replace `items.push(thing)` with `items.push({ ...thing, id: items.length + 1 })` and delete the line above it. What do the two lines print now?
3. Give the tent a field `parts: ['Pegs']` and, after the call, add another part to `items[0].parts`. What does `items[1].parts` show?
4. How do you have to change the line from step 2 so that the parts aren't shared anymore either?

## Exercises

The exercises work with the volunteer's functions. You find them in the course repo in the folder `exercises/01-javascript/references/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
Fix `addCopies` in `src/catalog.js`. Every copy should be an object of its own with the next free id, and the thing passed in should stay unchanged. The tests in `level-1.test.js` check this.

:::solution[Solution]
One line is enough, `items.push({ ...thing, id: items.length + 1 })`. Spread creates a new object in every pass and carries all fields over, and the `id` after it overwrites the id. Since the function no longer sets `thing.id`, the thing passed in stays unchanged. The solution of the challenge later replaces the line with a deep copy.
:::
::::

::::exercise[Going further]
`lend` changes the thing in the array passed in. Rewrite the function so that it returns a new list and leaves the old list and its things unchanged. All things except the lent one should remain the same objects in the new list.

:::solution[Solution]
::code{file="exercises/01-javascript/references/solution/{lang}/src/catalog.js" lines="9-12"}

`map` creates a new list. For the thing it looks for, spread creates a new object with the new date, and `map` takes all other things over unchanged. The third test checks exactly that with `toBe`, that is with `===`.
:::
::::

::::exercise[Challenge]
Tents have parts, such as `parts: ['Pegs', 'Poles']`. Change `addCopies` so that every copy has parts of its own and the parts of the template stay unchanged when someone adds or removes a part of a copy.

:::solution[Solution]
::code{file="exercises/01-javascript/references/solution/{lang}/src/catalog.js" lines="1-7"}

With spread alone, all copies share the same array `parts`. `structuredClone` copies the thing with all arrays inside, and then spread sets the new id. The order matters. The `id` has to come after the copied thing, otherwise the old id overwrites the new one.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `const copy = original` is meant as a copy. | Copy with `{ ...original }` or `[...original]`. |
| After a copy with spread, an array or object inside also changes in the original. | Spread copies shallowly. Use `structuredClone` for nested data. |
| `sort`, `push`, `splice` or `reverse` change an array that others use too. | Work on a copy or use methods such as `toSorted` and `toReversed`, which return a new array. |
| Two things are compared with `===` and are never equal. | Compare the ids, `a.id === b.id`. |
| `structuredClone` reports `DataCloneError`. | The object contains a function or another value it can't copy. Copy only the data. |
| An AI assistant copies deeply with `JSON.parse(JSON.stringify(...))`. | Use `structuredClone`, which also copies dates, `Map` and `Set` correctly. |

## Self-check

::::selfcheck
1. What does `const a = { n: 1 }; const b = a; b.n = 2; console.log(a.n)` print, and why?
2. When is a copy with spread enough, and when do you need `structuredClone`?
3. A function receives an array and calls `sort()` on it. What does the code that called it notice?
4. Why can `===` quickly tell whether a thing has changed when functions never change existing objects?

:::solution[Answers]
1. `2`. `b` points to the same object as `a`, the assignment only copied the reference.
2. Spread is enough when the object contains only primitive values or when the objects inside don't change. As soon as arrays or objects inside are changed, you need `structuredClone`.
3. Its array is sorted afterwards. `sort` changes the array itself, so the function has a side effect.
4. Every change creates a new object. If a thing is still the same object as before, it hasn't changed, and nobody has to compare its fields one by one.
:::
::::

:::assignment
The tents are fixed, and Martina Hostettler is preparing the next board meeting. The board wants to know how many things there are in each category, and volunteers at the counter ask which tools are in right now. For such reports JavaScript has methods that process a whole list with one function. That's what the next chapter is about.
:::
