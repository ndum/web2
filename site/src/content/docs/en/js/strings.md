---
title: Strings and template literals
description: Building text with template literals, cleaning up, searching and splitting text, and sorting names in the right order.
sidebar:
  order: 5
---

An app shows a lot of text, names of things, search terms and messages. This unit shows how to build, clean up, search and sort text.

:::goals
After this unit you can

- build text with template literals,
- use the most common string methods,
- build a search that ignores upper and lower case,
- sort names in the right order with `localeCompare`.
:::

## Template literals

A template literal stands between backticks. With `${...}` you insert any expression into the text, and the text may span several lines.

::code{file="examples/js/strings/{lang}/template.mjs"}

In the first line the template literal inserts three values, the deposit with `toFixed(2)` and therefore with two decimal places. `padStart(3, '0')` pads a string at the front to three characters, so `'7'` becomes `'007'`. `split(';')` splits a string at every semicolon into an array.

Strings can't be changed. Every method returns a new string, and the original stays as it was. `name.toUpperCase()` on its own therefore does nothing, and you have to store or use the result.

## String methods

| Method | Result | Example |
|---|---|---|
| `trim()` | removes spaces at the start and the end | `'  Tent '.trim()` gives `'Tent'` |
| `toLowerCase()`, `toUpperCase()` | all in lowercase or uppercase | `'Tent'.toLowerCase()` gives `'tent'` |
| `includes(text)` | whether the text occurs | `'Jigsaw'.includes('saw')` gives `true` |
| `startsWith(text)`, `endsWith(text)` | whether the text is at the start or the end | `'Bike trailer'.startsWith('Bike')` gives `true` |
| `slice(start, end)` | a piece without position `end` | `'Raclette'.slice(0, 4)` gives `'Racl'` |
| `split(separator)` | an array of the parts | `'a,b'.split(',')` gives `['a', 'b']` |
| `replaceAll(old, new)` | replaces every occurrence | `'11-12-2026'.replaceAll('-', '/')` gives `'11/12/2026'` |
| `padStart(length, char)`, `padEnd(...)` | pads at the front or the back | `'7'.padStart(3, '0')` gives `'007'` |

## A search in the catalog

Members type search terms however they like, with spaces and in any case. So a search first cleans up the search term and then compares everything in lowercase.

::code{file="examples/js/strings/{lang}/search.mjs"}

`trim` removes the spaces around the search term, `toLowerCase` turns both sides into lowercase, and `includes` also finds the term in the middle of a name. That's how "SAW" finds the jigsaw. You will rebuild this search with Vue in part 3.

## Sorting

`sort` without an argument sorts strings by the codes of their characters. That's fine for simple cases, but not for mixed upper and lower case and not for umlauts.

::code{file="examples/js/strings/{lang}/sorting.mjs"}

In the first line "Drill" comes before "axe", because capital letters have lower codes than lowercase ones. `localeCompare` compares by the rules of a language, here `en-US`, and puts the names in alphabetical order. German names run into the same problem with umlauts, and `sort` puts "Äxte" after "Zelt". `sort` changes the array itself, which is why the example sorts a copy each time with `[...names]`. Since 2023 there is also `toSorted`, which always returns a new array.

`sort` without an argument also sorts numbers as strings, so `[10, 9, 1].sort()` gives `[1, 10, 9]`. For numbers you pass a compare function, `(a, b) => a - b`.

## Common mistakes

| Mistake | What helps |
|---|---|
| `name.trim()` on its own doesn't change `name`. | Store the result, `const tidy = name.trim()`. |
| The search doesn't find "Tent" when someone types "tent". | Compare both sides with `toLowerCase()`. |
| Names with mixed case or umlauts end up in the wrong place after sorting. | Sort with `localeCompare`, `names.toSorted((a, b) => a.localeCompare(b, 'en-US'))`. |
| Numbers are sorted as strings with `sort()`. | Pass a compare function, `(a, b) => a - b`. |
| Text is put together with `+` and lots of quotes. | Use a template literal. |

## Exercises

::::exercise[Getting started]
A name comes from a form with spaces, `'  Bike trailer '`. Remove the spaces and print the name in quotes, along with its length and whether it starts with "Bike".

:::solution[Solution]
::code{file="examples/js/strings/{lang}/solution-1.mjs"}

The output is `"Bike trailer" 12 true`. The quotes in the template literal show that no spaces are left at either end. The space between the two words counts toward the length.
:::
::::

::::exercise[Going further]
Write a function `receiptLine(name, deposit)` for a receipt. The name is padded with periods to 16 characters. Then come `CHF` and the deposit with two decimal places, right-aligned to 6 characters. Check with the tent (50) and the ladder (20) whether the amounts line up.

:::solution[Solution]
::code{file="examples/js/strings/{lang}/solution-2.mjs"}

`padEnd(16, '.')` pads the name with periods at the back, and `padStart(6)` pads the amount with spaces at the front. That way all amounts line up, as long as the font has characters of equal width, as in the console.
:::
::::

::::exercise[Challenge]
A line from the association's old spreadsheet reads `'Jigsaw; Tools; 20'`. Split it into name, category and deposit, each without spaces. Show that the deposit is a number afterwards by adding 5.

:::solution[Solution]
::code{file="examples/js/strings/{lang}/solution-3.mjs"}

The output is `Jigsaw Tools 25`. `split(';')` splits the line, `map` applies `trim` to every part, and destructuring distributes the three parts to variables. Without `Number(...)`, `'20' + 5` would give the string `'205'`. You get to know `map` in more detail in part 1.
:::
::::
