---
title: Formatting numbers and dates
description: The counter helper shows the deposits in francs and the dates when things on loan are available again. Amounts and percentages, dates and times with Intl, and time zones.
sidebar:
  order: 10
---

::::step{n="10"}
It shows the nine things on a page and writes them as JSON. So far it prints amounts and dates raw, 150 instead of CHF 150.00 and 2026-11-12 instead of November 12, 2026. In this step it formats the deposits in francs and the dates when things on loan are available again.

:::details[Code up to step 9]
::code{file="examples/js/json/{lang}/desk.mjs"}
:::
::::

The app shows amounts, dates and times. How they look depends on language and country. In Switzerland `CHF` comes before an amount, an apostrophe separates the thousands, and dates are written with periods. JavaScript has the `Intl` object for this, which knows these rules. The English examples format dates for `en-US` and the German ones for `de-CH`. Amounts in francs use `de-CH` in both, because the association is in Bern.

:::goals
After this step you can

- format amounts in francs and percentages with `Intl.NumberFormat`,
- show dates and times with `Intl.DateTimeFormat` and distances such as "in 7 days",
- explain why a date can fall on the previous day in another time zone,
- format dates without a time so that the right day shows everywhere.
:::

## Amounts and percentages

`Intl.NumberFormat` takes a language with a region and options. `de-CH` stands for German as used in Switzerland.

::code{file="examples/js/formatting/{lang}/money.mjs"}

With `style: 'currency'` and `currency: 'CHF'` the currency code comes before the amount, and there are always two decimal places. The fees of about 300 members at CHF 40 each add up to an amount with an apostrophe as the thousands separator. With `style: 'percent'`, 6 out of 9 things becomes the text `67%`, rounded to a whole percent. One formatter works for many numbers, so you create it only once.

`toFixed(2)` is enough for simple cases, but adds neither thousands separators nor a currency.

## Dates and times

A `Date` stores a point in time as the number of milliseconds since January 1, 1970, in UTC. Only the formatting decides how this point in time looks.

::code{file="examples/js/formatting/{lang}/dates.mjs"}

`toLocaleDateString` returns the date in the notation of the language, for `en-US` with the month first. `Intl.DateTimeFormat` takes options for which parts to show, here the full weekday, the day, the month and the year. `Intl.RelativeTimeFormat` phrases distances in time. The pickup day is 7 days after Saturday, October 31, the day the counter helper works. With `numeric: 'auto'` it says "next week" and "tomorrow" instead of "in 1 week" and "in 1 day".

## Time zones

JavaScript reads a date without a time, such as `'2026-11-12'`, as midnight in UTC. If you format it in a time zone west of UTC, that point in time is still on the previous day there.

::code{file="examples/js/formatting/{lang}/timezones.mjs"}

![One point in time in three time zones. On the left the value availableFrom of the tent, the text 2026-11-12 without a time. new Date reads it as midnight in UTC. On the right the same point in time in three time zones. In UTC it is midnight on November 12, in Zurich 1 a.m. on November 12, and in New York still 7 p.m. on November 11. Formatted with timeZone UTC, a date without a time shows November 12 everywhere.](../../../../assets/figures/en/j10-time-zones.svg)

In UTC and in Zurich it is November 12, in New York it is still the evening of November 11. Without the option `timeZone`, the browser uses the time zone of the device. For members in Switzerland that would work, but not on a server in America or for tests on a machine with a different time zone. For plain dates such as the day a thing is available again you therefore set `timeZone: 'UTC'`, as in the chapter on [props](../../components/props/). For points in time such as the start of the opening hours, use `timeZone: 'Europe/Zurich'`. The shop opens at 10 a.m. on Saturday, which is only 9 a.m. in UTC, because Switzerland is on standard time in November.

## Things on loan with date and deposit

The counter helper now formats what it used to print raw. For every thing on loan it writes the deposit in francs and the date from which the thing is available again, and at the end the total deposit on loan.

::code{file="examples/js/formatting/{lang}/desk.mjs"}

Both formatters are created once, before the loop. `dateStyle: 'long'` spells out the month, and `timeZone: 'UTC'` makes sure the tent shows November 12 everywhere. `continue` from step 2 skips the things that are in. The line `Deposit on loan: 150` from step 4 turns into `Deposit on loan: CHF 150.00`. The dates come out in English, while the amounts keep the Swiss notation because the association is in Bern.

## Exercises

::::exercise[Getting started]
A member has the raclette oven, the projector and the sleeping bag as favorites. Print the deposit of each favorite in francs and, at the end, the total the member would have to leave for all three.

:::solution[Solution]
::code{file="examples/js/formatting/{lang}/solution-1.mjs"}

The formatter is created once before the loop and then formats every amount. The loop adds up the numbers, and formatting happens only for the output. With text such as `'CHF 30.00'` you couldn't calculate anymore.
:::
::::

::::exercise[Going further]
The counter helper works on Saturday, October 31, 2026. For the three things on loan, print in how many days they are available again, as text such as "in 12 days".

:::solution[Solution]
::code{file="examples/js/formatting/{lang}/solution-2.mjs"}

`daysBetween` counts the days between two dates like `loanDays` from step 3. `Intl.RelativeTimeFormat` turns the number into text. If a thing were back on November 1, `numeric: 'auto'` would make it "tomorrow".
:::
::::

::::exercise[Challenge]
Bring deposit and date onto the page from step 8. Every entry of the list shows the name, the deposit in francs and "in" or the date from which the thing is available again. You may leave out the reserve buttons for this exercise.

:::solution[Solution]
::code{file="examples/js/formatting/{lang}/solution-3.html"}

The formatters work in the browser just as they do in Node. `textContent` puts the formatted text into every entry. The output shows the number of entries and the entry of the tent. Add the buttons and the listener from step 8, and you have the whole counter helper on one page.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A date without a time shows up as the previous day in some time zones. | Format with `timeZone: 'UTC'`. |
| Amounts are put together with `'CHF ' + amount`, and `40 / 12` becomes `CHF 3.3333333333333335`. | Use `Intl.NumberFormat` with `style: 'currency'`. |
| The month is off by one, and `new Date(2026, 11, 12)` is in December. | Months count from 0 in `new Date(year, month, day)`. A string such as `'2026-11-12'` is clearer. |
| A new `Intl.NumberFormat` is created for every number. | Create the formatter once and reuse it. |
| The code keeps calculating with formatted amounts such as `'CHF 30.00'`. | Calculate with numbers and format only for the output. |
| An AI assistant suggests a library such as Moment.js for formatting. | `Intl` is enough for display. Moment.js is no longer developed. |

## Self-check

::::selfcheck
1. What does `new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(150)` print?
2. Why does the counter helper format the date `'2026-11-12'` with `timeZone: 'UTC'`?
3. When do you use `timeZone: 'Europe/Zurich'` instead of `'UTC'`?

:::solution[Answers]
1. `CHF 150.00`, with the currency code in front and two decimal places.
2. JavaScript reads a date without a time as midnight in UTC. Formatted in UTC, it shows November 12 everywhere, otherwise New York gets November 11.
3. For points in time with a clock time that applies in Switzerland, such as the start of the opening hours at 10 a.m. on Saturday.
:::
::::

:::next
With this step the counter helper is done. Part 1 starts with the export the volunteers made of their whole spreadsheet with 60 things and splits the code into modules. Continue in part 1 with the chapter [Modules and packages](../../javascript/modules/).
:::
