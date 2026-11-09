---
title: Control flow
description: The counter helper decides whether the drill is in and whether the counter is open, and goes through the days of a week. if and else, the conditional operator, switch, loops with for...of, for and while, break and continue.
sidebar:
  order: 2
---

::::step{n="2"}
It knows the drill with its name, deposit and `availableFrom` and turns the text of a form field into a number. In this step it decides whether the drill is in and whether the counter is open, and it goes through the days of a week.

:::details[Code up to step 1]
::code{file="examples/js/variables/{lang}/desk.mjs"}
:::
::::

Control flow decides which code runs and how often. In Vue templates it later becomes `v-if` and `v-for`, while the script keeps using the statements of this step.

:::goals
After this step you can

- distinguish between cases with `if`, `else if` and `else` and combine conditions with `&&`, `||` and `!`,
- use the conditional operator `? :` for short decisions,
- check a value against several fixed cases with `switch`,
- repeat code with `for...of`, `for` and `while` and steer loops with `break` and `continue`.
:::

## Decisions with if and else

`if` runs a block when a condition is true. With `else if` you check further cases in turn, and `else` catches whatever is left. A condition doesn't have to be a boolean, since JavaScript converts every value, as [Variables, types and operators](../variables/) describes.

::code{file="examples/js/control-flow/{lang}/pickup.mjs"}

The beer bench set is on loan, so `availableFrom` isn't `null` and the first case doesn't apply. The second one compares two dates. Strings in the format YYYY-MM-DD can be compared with `<` and `<=`, because the year comes first, then the month and the day last, and JavaScript compares strings character by character. November 3 comes before November 7, so the beer bench set is back in time for the pickup. As soon as one case applies, JavaScript skips all the others, the `else` block included.

You combine conditions with `&&` for "and", `||` for "or" and `!` for "not". `availableFrom !== null && availableFrom > pickup` is true when a thing is on loan and only comes back after the pickup. `!` flips a boolean, so `!(availableFrom === null)` means the same as `availableFrom !== null`.

## Cases with switch

When you check one value against several fixed cases, `switch` is easier to read than a long chain of `else if`. The counter helper uses it to name the opening hours of a day.

::code{file="examples/js/control-flow/{lang}/hours.mjs"}

`switch` compares `day` with each `case` in turn, using `===`. When a case matches, the code runs from there until a `break` comes. Without `break` it would run on into the next case. This is called fall-through, and it is a common source of bugs. `default` applies when no case matches. Click "Edit", put in another day such as `'Thursday'` and run the program again. `hours` is declared with `let` because the variable only gets its value in the matching case.

## Loops

A loop repeats code. For a list of values, `for...of` is the simplest one. It hands you the values in order without making you deal with positions. The counter helper uses it to go through the days of the week. Before that it says whether the counter is open today and whether the drill is in.

::code{file="examples/js/control-flow/{lang}/desk.mjs"}

`today` is the Saturday the counter helper works on, October 31, 2026. The first condition combines two comparisons with `||` and is true as soon as one of them holds. For the drill, the conditional operator `condition ? ifTrue : ifFalse` is enough. It is an expression and produces a value, so it fits right into `console.log`. You'll see it often in Vue templates, for example as `{{ available ? 'in' : 'on loan' }}`.

`week` holds the seven days in an array, a list of values in square brackets, and step 4 covers arrays in detail. `for (const day of week)` creates the constant `day` with the next day in every pass. The figure shows the seven passes.

![The loop over the week. On the left are the seven days of the week from Monday to Sunday, numbered 1 to 7 in the order in which the loop goes through them. On the right is what the counter helper prints. An arrow leads from Wednesday to "Open on Wednesday" and one from Saturday to "Open on Saturday". For the other five days a dashed frame says "no output".](../../../../assets/figures/en/j2-loop-over-week.svg)

The condition `day === 'Wednesday' || day === 'Saturday'` appears twice in the counter helper. In step 3 a function puts it in one place. `for...in` looks similar to `for...of`, but it loops over the keys of an object and isn't meant for arrays.

## break and continue

Sometimes a loop should stop early or skip a value. That's how the counter helper finds the next day the counter is open.

::code{file="examples/js/control-flow/{lang}/next-open.mjs"}

`days` holds the eight days from today to the next Saturday. Since the search has to know how many days it takes to reach an open day, it uses the classic counting loop. `let ahead = 1` creates the counter, `ahead < days.length` is the condition for every pass, and `ahead++` adds one after each pass, just like `ahead += 1`. The counter starts at 1 rather than 0 because today doesn't count.

The condition before `continue` is the opposite of the condition in the counter helper. If a day is neither Wednesday nor Saturday, `continue` skips the rest of the pass and the loop moves on to the next day. On Wednesday it prints the day, and `break` ends the whole loop. Without `break` it would keep going and print the Saturday in 7 days as well.

A `while` loop runs as long as its condition holds. It fits when you don't know in advance how many passes it takes. In the exercise "Going further" you write the search with it. In part 1 you learn the methods `map`, `filter` and `find`, which make many loops over arrays shorter. The loops of this step stay useful anyway, for example when you want to stop early.

## Exercises

::::exercise[Getting started]
Print the opening hours for every day of the week. Take the loop from the counter helper and put the `switch` with the opening hours inside it.

:::solution[Solution]
::code{file="examples/js/control-flow/{lang}/solution-1.mjs"}

The `switch` sits in the block of the loop, so it runs once for every day. Here `break` only ends the `switch`, not the loop. `default` applies to the five days without a case of their own.
:::
::::

::::exercise[Going further]
Someone who picks something up on a Wednesday wants to know when the counter is open next. Write the search from the section with `while` instead of `for`, for the days from one Wednesday to the next. Print the day and the number of days until then.

:::solution[Solution]
::code{file="examples/js/control-flow/{lang}/solution-2.mjs"}

The loop runs as long as the day is neither Wednesday nor Saturday. On Saturday the condition is false, the loop ends and `ahead` is 3. Since `days` ends with the next Wednesday, the loop is sure to find an open day and never reads past the end of the array.
:::
::::

::::exercise[Challenge]
The counter helper checks the number of days from the form. For the entries `'4'`, `'11'` and `'four'`, print whether the loan is allowed, too long or not a number at all. A loan lasts at most seven days. Watch out for what a comparison with `NaN` gives.

:::solution[Solution]
::code{file="examples/js/control-flow/{lang}/solution-3.mjs"}

The check for `NaN` comes first. Every comparison with `NaN` gives `false`, `NaN > 7` included. If the check for more than seven days came first, `'four'` would end up in the `else` and count as allowed.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `if (today = 'Saturday')` assigns instead of comparing and is always true. | Compare with `===`. |
| `if (day === 'Wednesday' \|\| 'Saturday')` always counts as true. | Write out both comparisons, `day === 'Wednesday' \|\| day === 'Saturday'`. |
| A `case` without `break` runs into the next case. | End every case with `break`. |
| `for (const day in week)` gives the positions as strings, not the days. | Use `for...of` for arrays. |
| A `while` loop never changes its condition and runs forever. | Make sure every pass gets closer to the exit condition. The "Stop" button aborts such a program. |
| `for (let i = 0; i <= week.length; i++)` reads one element too many. | Compare with `<`, the last position is `length - 1`. |

## Self-check

::::selfcheck
1. When do you use `switch` instead of a chain of `else if`?
2. What is the difference between `break` and `continue`?
3. Why does the conditional operator fit right into a `console.log` while an `if` doesn't?

:::solution[Answers]
1. When you check one value against several fixed cases, such as a weekday. `switch` compares with `===`, so ranges like "more than seven days" stay with `if`.
2. `break` ends the whole loop. `continue` only ends the current pass, and the loop goes on with the next value.
3. The conditional operator is an expression and produces a value. `if` is a statement that only decides which block runs.
:::
::::

:::next
In step 3 the counter helper uses functions to count the days of a loan and hand out numbers for reservations. Continue with [J3 Functions and scope](../functions/).
:::
