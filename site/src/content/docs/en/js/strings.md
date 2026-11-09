---
title: Strings and template literals
description: The counter helper writes a line for every thing and finds things by their name. Template literals, string methods, columns with padStart and padEnd, a search that ignores case, and sorting.
sidebar:
  order: 5
---

::::step{n="5"}
It keeps the nine things from the counter as objects in an array and counts what is in. In this step it writes a line for every thing with its number, name, deposit and return date, and it finds things by their name.

:::details[Code up to step 4]
::code{file="examples/js/objects-and-arrays/{lang}/desk.mjs"}
:::
::::

An app shows a lot of text, such as the names of things, search terms and messages. You put strings together with template literals, and string methods clean text up or take it apart. You will rebuild the search from this step with Vue in part 3.

:::goals
After this step you can

- put text together with template literals,
- use the most common string methods and line up columns with `padStart` and `padEnd`,
- build a search that ignores upper and lower case,
- sort numbers and names in the right order.
:::

## Template literals

A template literal stands between backticks. `${...}` inserts any expression into the text, and the text may run over several lines.

::code{file="examples/js/strings/{lang}/template.mjs"}

`glued` builds the same line with `+`. The result is identical, as `true` shows, but in `glued` quoted text and values take turns, and a missing space only shows up in the output. The template literal reads the way the line will look. Any expression can go between `${` and `}`, and the third output uses the conditional operator from step 2 to pick "in" or "on loan". `hours` spans two lines. Its second line starts at the very left of the code, because a template literal keeps the spaces at the start of a line as well.

## String methods

Strings can't be changed. Every method returns a new string and leaves the original as it was. A member number often comes from a form with spaces around it and a lowercase m.

::code{file="examples/js/strings/{lang}/methods.mjs"}

`trim` removes the spaces at both ends, and `toUpperCase` turns the m into an M. Since every method returns a string again, you can chain the calls. Afterwards `number` has 5 characters while `typed` still has 8, because the methods left `typed` alone. `slice(2)` cuts from position 2 to the end and returns the digits `'117'`. `split('-')` breaks a date into an array at every hyphen.

| Method | Result | Example |
|---|---|---|
| `trim()` | removes spaces at the start and the end | `'  Tent '.trim()` gives `'Tent'` |
| `toLowerCase()`, `toUpperCase()` | all in lowercase or uppercase | `'Tent'.toLowerCase()` gives `'tent'` |
| `includes(text)` | whether the text occurs | `'Jigsaw'.includes('saw')` gives `true` |
| `startsWith(text)`, `endsWith(text)` | whether the text is at the start or the end | `'Bike trailer'.startsWith('Bike')` gives `true` |
| `indexOf(text)` | the position of the text, or -1 | `'Sleeping bag'.indexOf('bag')` gives `9` |
| `slice(start, end)` | a piece without position `end` | `'Raclette'.slice(0, 4)` gives `'Racl'` |
| `split(separator)` | an array of the parts | `'2026-11-12'.split('-')` gives `['2026', '11', '12']` |
| `replaceAll(old, new)` | replaces every occurrence | `'Beer bench set'.replaceAll(' ', '-')` gives `'Beer-bench-set'` |
| `padStart(length, char)`, `padEnd(...)` | pads at the front or the back | `'7'.padStart(3, '0')` gives `'007'` |

## Searching regardless of case

A member asks for a thing at the counter, and the volunteers type the name however it comes, in lowercase and sometimes with a space at the end. But `includes` compares character by character.

::code{file="examples/js/strings/{lang}/search.mjs"}

The first check fails on the space after `tent`. The second one fails on the T, since `T` and `t` are different characters to `includes`. Once both sides are in lowercase and the search term has no spaces left, `includes` finds the word, even in the middle of a name. The name needs no `trim`, because it is already clean in the catalog.

## One line per thing

In the list of the counter helper every thing should get a line of its own, with the amounts lined up. That only works if every name takes up the same number of characters. `padEnd` adds spaces until a string has the length you ask for. `padStart` pads at the front, which aligns numbers to the right.

![Columns with padEnd. At the top three lines of the counter helper without padding, for the drill, the beer bench set and the projector, each with number, name, deposit and whether the thing is in. The names differ in length, so the amount starts at a different place in every line. At the bottom the same lines with padEnd. It adds 9 spaces to the drill and 5 to the projector, until every name has 14 characters like the beer bench set. Now CHF 20, CHF 40 and CHF 80 line up exactly.](../../../../assets/figures/en/j5-columns-with-padend.svg)

This is how the counter helper writes its list of the nine things, and it prints the hits of a search in the same format.

::code{file="examples/js/strings/{lang}/desk.mjs"}

The loop before `line` looks for the longest name. With `Math.max`, `width` keeps the larger value in every round and ends up at 14, the length of "Beer bench set". `line` builds the line from a template literal. Numbers have no `padStart` method, so `String(item.id)` first turns the number into a string. Numbers 1 to 9 now get a space in front, which would leave room for a 10. `padEnd(width)` pads every name to 14 characters, so `CHF` starts at the same place in every line. This works in the console because every character there has the same width.

`search` cleans up the search term once and then compares it with every name in lowercase. The function collects the hits in a new array, and the counter helper prints them with `line`.

## Sorting

`sort` without an argument compares values as strings, character by character by their codes. That goes wrong as soon as numbers differ in length, and the ids of the things go past 9.

::code{file="examples/js/strings/{lang}/sorting.mjs"}

Without a compare function, 10 ends up before 2 because the string `'10'` starts with a 1. The compare function `(a, b) => a - b` returns a negative number when `a` belongs before `b`, a positive one when it belongs after, and 0 when both are equal. `a - b` doesn't work for strings, `'Tent' - 'Drill'` gives `NaN`. That's what `localeCompare` is for. It also returns a negative number, 0 or a positive number, and it compares by the rules of a language, here `en-US`. Words with a lowercase first letter then end up where you would look for them in the alphabet. Without `localeCompare`, `sort` puts a lowercase a after an uppercase Z.

`toSorted` returns a new array and leaves `ids` in its old order. `sort`, on the other hand, rearranges the array itself, as with `names`. Part 1 covers sorting in more depth in the chapter [Functions and arrays](../../javascript/functions-and-arrays/).

## Exercises

::::exercise[Getting started]
The lawn mower joins the list as the tenth thing, with the `id` 10 and a deposit of CHF 40. It is in right now. Add it to the nine things and print the lines of things 9 and 10 with `line`. Check whether the two names start in the same column.

:::solution[Solution]
::code{file="examples/js/strings/{lang}/solution-1.mjs"}

Both names start in the same column. `padStart(2)` puts a space in front of the 9, while the 10 fills both places itself. Without `padStart`, the lawn mower would start one character further to the right.
:::
::::

::::exercise[Going further]
The counter helper should print a receipt for the deposit. Write a function `receiptLine(label, amount)` that pads the label with periods to 16 characters, followed by `CHF` and the amount with two decimal places. The amounts should line up on the right. Try it with the projector, the raclette oven and the total of both.

:::solution[Solution]
::code{file="examples/js/strings/{lang}/solution-2.mjs"}

`padEnd(16, '.')` pads the label with periods at the back. `toFixed(2)` turns the number into a string with two decimal places, and `padStart(6)` pads it with spaces at the front. That puts the six characters of `110.00` right under the five of `80.00` and `30.00`, with the decimal points lined up.
:::
::::

::::exercise[Challenge]
The list of hits should show where the search term sits in the name. Write a function `mark(name, query)` that puts the matching part in square brackets and keeps the capitalization of the name. With the search term `TRAIL`, "Bike trailer" becomes `Bike [trail]er`. If the function finds nothing, it returns the name unchanged.

:::solution[Solution]
::code{file="examples/js/strings/{lang}/solution-3.mjs"}

`indexOf` searches the lowercase name and returns the position of the hit or -1. For these names `toLowerCase` doesn't change the length, so the positions hold for the original too. `slice` cuts the original into the part before the hit, the hit and the rest, and the template literal puts them back together with the brackets. That's why the brackets hold `trail` as the name spells it, not `TRAIL` as it was typed.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `name.trim()` on its own doesn't change `name`. | Store the result, `const tidy = name.trim()`. |
| `'CHF ${deposit}'` prints `${deposit}` literally. | A template literal stands between backticks, not between single quotes. |
| The search doesn't find "Tent" when someone types "tent". | Compare both sides with `toLowerCase()`. |
| `item.id.padStart(2)` throws a `TypeError`. | Numbers have no `padStart`. Turn them into a string with `String(item.id)` first. |
| The columns shift when a name is longer than the width given to `padEnd`. | `padEnd` never cuts. Compute the width from the longest name. |
| `[10, 9, 1].sort()` gives `[1, 10, 9]`. | Sort numbers with a compare function, `(a, b) => a - b`. |

## Self-check

::::selfcheck
1. Why does `typed` still contain spaces after `typed.trim()`?
2. What do `'Projector'.padEnd(12, '.')` and `'Beer bench set'.padEnd(12, '.')` return?
3. Why does `search` remove spaces only from the search term but lowercase both sides?

:::solution[Answers]
1. Strings can't be changed. `trim` returns a new string, and as long as you don't store it, `typed` stays as it was.
2. `'Projector...'` with three periods, because "Projector" has nine characters. The longer name stays as it is, since `padEnd` only pads and never cuts.
3. Spaces only get into the search term through the form, while the names in the catalog are clean. Upper and lower case differ on both sides, "Tent" in the catalog and "tent" in the search field.
:::
::::

:::next
In step 6 the counter helper records reservations with the thing, the member number and the days of the loan. Continue with [J6 Classes and this](../classes/).
:::
