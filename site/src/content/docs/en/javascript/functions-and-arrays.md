---
title: Functions and arrays
description: Functions as arguments, the methods map, filter, find, some, every and reduce, sorting with toSorted and localeCompare, and functions that build functions.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler is preparing the next board meeting and has written down two wishes.

> As a board member, I want to know how many things we have in each category, so that we can decide where to buy new things next.

> As a volunteer at the counter, I want to see which tools are in right now, sorted by name, so that I can answer members on the phone quickly.

The acceptance criteria are:

1. The overview shows the number of things for every category.
2. It names the tools that are in, sorted alphabetically, with names that start with an umlaut in the right place too.
3. The catalog itself stays unchanged.
:::

:::goals
After this chapter you can

- pass functions as arguments and read callbacks,
- analyze lists with `map`, `filter`, `find`, `some` and `every`,
- compute sums and counts with `reduce`,
- sort lists with `toSorted` and `localeCompare` without changing the original,
- write functions that build other functions.

You know arrow functions and closures from the unit [Functions and scope](../../js/functions/) of the JS workshop.
:::

## Functions as arguments

A function that you pass to another function so that it calls it is called a callback. You know this from `addEventListener`. Arrays also have methods that call a callback for every element.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/callbacks.mjs"}

`forEachItem` shows what happens. The loop sits inside the function, and the callback says what should happen with every element. `forEach` is the built-in version and passes the callback the position of the element as well. The following methods all work this way and differ in what they do with the results of the callback.

## map and filter

`map` calls the callback for every element and builds a new list from the return values, as long as the old one. `filter` keeps the elements for which the callback returns `true`.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/map-filter.mjs"}

Neither method changes the old list, both return a new one. That's why you can chain them. The last statement first filters the tools that are in and then turns the remaining things into a list of names. This chain is half of Martina Hostettler's second wish.

## find, some and every

Sometimes you need just one element or a yes or no answer.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/find-some.mjs"}

`find` returns the first element for which the callback returns `true`, or `undefined` if none matches. `findIndex` returns the position or -1. `some` asks whether at least one element matches, `every` whether all do. All four stop as soon as the answer is clear and check no more elements than necessary.

## reduce

`reduce` combines a list into a single value. The callback receives the result so far and the next element and returns the new result. The second argument of `reduce` is the starting value.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/reduce.mjs"}

The first count starts at 0 and adds up all deposits. The second starts with an empty object and counts for every category how often it occurs. `counts[item.category] ?? 0` returns 0 as long as a category is still missing. Since 2024 there is also `Object.groupBy` for grouping, which collects the things of a category in a list. For a count, `reduce` is enough.

## Sorting without side effects

`sort` sorts an array in place and thereby changes the original. `toSorted` returns a sorted copy. A compare function says how to compare. It returns a negative number if `a` comes before `b`, a positive one if `b` comes before `a`, and 0 if both are equal.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/sort.mjs"}

`localeCompare` compares text by the rules of a language and puts upper and lower case and umlauts in the right place. For numbers a subtraction is enough, and `b.deposit - a.deposit` sorts in descending order. The last line shows that the original kept its order.

## Functions that build functions

A function can return a function that remembers its arguments. That way you get a tailor-made callback for `filter`.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/closure.mjs"}

`byCategory('Tools')` returns a new function that only needs a thing and knows the category from its closure. Such functions make code readable, and `items.filter(isTool)` says what it does. In the challenge you build a filter from several criteria this way.

## In code

Work with the example on `reduce`. Read the code and write down what you expect before you run it.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/reduce.mjs"}

1. What does the first count print if you leave out the starting value 0? And the second one without `{}`?
2. Change the second count so that it returns the sum of the deposits for every category instead of the number of things.
3. What does the count look like if you write it with a `for...of` loop? Which is easier to read?
4. What does `[].reduce((sum, item) => sum + item.deposit)` print, without a starting value and with an empty list?

Without a starting value, `reduce` takes the first element as the starting value. In the first count that's an object, and the sum turns into text. In the second, `reduce` counts into the drill, changes it in the process and leaves the drill itself out of the count. With an empty list and no starting value, `reduce` reports a `TypeError`. So always give the starting value.

## Exercises

The exercises build the reports for the board meeting. You find the project in the course repo in the folder `exercises/01-javascript/arrays/en`, with the whole catalog in `data/items.json`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

`npm run overview` shows the overview that uses your functions. At the start it is empty.

::::exercise[Getting started]
Write the function `availableNames(items, category)` in `src/catalog.js`. It returns the names of the things of a category that are in, sorted by the rules of the language. For the tools these are eight names, from the circular saw to the toolbox.

:::solution[Solution]
::code{file="exercises/01-javascript/arrays/solution/{lang}/src/catalog.js" lines="1-7"}

`filter` keeps the tools that are in, `map` turns them into names, and `toSorted` sorts them with `localeCompare`. Without `localeCompare`, the oil can from the second test would come before the awl, because a capital letter has a lower code than a lowercase one.
:::
::::

::::exercise[Going further]
Write the function `countByCategory(items)`. It returns an object that gives the number of things for every category. In the catalog there are ten per category.

:::solution[Solution]
::code{file="exercises/01-javascript/arrays/solution/{lang}/src/catalog.js" lines="9-15"}

The starting value is an empty object, and every round adds one to the category of the thing. The `return counts` at the end of the callback matters. Without it, the result of the next round would be `undefined`.
:::
::::

::::exercise[Challenge]
Write the function `createFilter(criteria)`. It receives an object with the criteria `category`, `query` and `onlyAvailable`, each of them optional, and returns a function that `filter` can use. The search text should occur in the name regardless of upper and lower case.

:::solution[Solution]
::code{file="exercises/01-javascript/arrays/solution/{lang}/src/catalog.js" lines="17-24"}

The function takes the criteria apart right in its parameter list. It prepares the search text once, not for every thing. The returned function checks each criterion only if it is given, and `!category ||` lets every thing through as long as no category is set. You will need this filter again in part 3, when the catalog in Vue gets a search field.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `map` with curly braces returns a list full of `undefined`. | Write `return` in the block or leave out the braces. |
| The result of `forEach` is used and is `undefined`. | `forEach` returns nothing. Use `map` or `filter` for a new list. |
| `find` finds nothing, and accessing `.name` throws a `TypeError`. | Check the result or write `?.name`. |
| `reduce` without a starting value reports a `TypeError` for an empty list. | Always give the starting value. |
| `sort` changes the catalog for everyone who uses it. | Use `toSorted`. |
| Numbers are sorted as text with `sort()`, and 10 comes before 9. | Pass a compare function such as `(a, b) => a - b`. |
| An AI assistant installs a library such as Lodash for `groupBy` or `sortBy`. | `reduce`, `Object.groupBy` and `toSorted` do this without a package. |

## Self-check

::::selfcheck
1. What is the difference between `map` and `forEach`?
2. What does `find` return if no element matches, and what does `filter` return?
3. What is the second argument of `reduce` for?
4. Why does the course use `toSorted` instead of `sort`?

:::solution[Answers]
1. `map` returns a new list with the return values of the callback. `forEach` only calls the callback and returns `undefined`.
2. `find` returns `undefined`, `filter` an empty list.
3. It is the starting value. Without it, `reduce` takes the first element and reports an error for an empty list.
4. `toSorted` returns a sorted copy and leaves the original unchanged. `sort` changes the array itself, a side effect that surprises other parts of the code.
:::
::::

:::assignment
The reports convinced the board. Martina Hostettler has good news. From now on the catalog lives on the association's server, and the volunteers maintain it there directly. The overview should load it from there. But a server doesn't answer right away, and sometimes not at all. The next chapter shows how JavaScript deals with this kind of waiting.
:::
