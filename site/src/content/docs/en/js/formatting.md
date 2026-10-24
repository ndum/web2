---
title: Formatting numbers and dates
description: Formatting amounts in francs, percentages, dates and times with Intl and handling time zones correctly.
sidebar:
  order: 10
---

The app shows amounts, dates and times. How they look depends on language and country. In Switzerland `CHF` comes before an amount, an apostrophe separates the thousands, and dates are written with periods. JavaScript has the `Intl` object for this, which knows these rules. The English examples format dates for `en-US` and the German ones for `de-CH`. Amounts in francs use `de-CH` in both, because the association is in Bern.

:::goals
After this unit you can

- format amounts in francs and percentages with `Intl.NumberFormat`,
- show dates and times with `Intl.DateTimeFormat` and distances such as "yesterday",
- explain why a date can fall on the previous day in another time zone,
- format dates without a time so that the right day shows everywhere.
:::

## Amounts and percentages

`Intl.NumberFormat` takes a language with a region and options. `de-CH` stands for German as used in Switzerland.

::code{file="examples/js/formatting/{lang}/money.mjs"}

With `style: 'currency'` and `currency: 'CHF'` the currency code comes before the amount, and there are always two decimal places. Large amounts get an apostrophe as the thousands separator. With `style: 'percent'`, 0.35 becomes the text 35%. You can use one formatter for many numbers, so you create it only once.

`toFixed(2)` from the other units is enough for simple cases, but adds neither thousands separators nor a currency.

## Dates and times

A `Date` stores a point in time as the number of milliseconds since January 1, 1970, in UTC. Only the formatting decides how this point in time looks.

::code{file="examples/js/formatting/{lang}/dates.mjs"}

`toLocaleDateString` returns the date in the notation of the language, for `en-US` with the month first. `Intl.DateTimeFormat` takes options for which parts to show, here the full weekday, the day and the month. `Intl.RelativeTimeFormat` phrases distances such as "yesterday" or "in 3 days". With `numeric: 'auto'` it says "yesterday" instead of "1 day ago".

## Time zones

JavaScript reads a date without a time, such as `'2026-11-12'`, as midnight in UTC. If you format it in a time zone west of UTC, that point in time is still on the previous day there.

::code{file="examples/js/formatting/{lang}/timezones.mjs"}

In UTC and in Zurich it is November 12, in New York it is still the evening of November 11. Without the option `timeZone`, the browser uses the time zone of the device. For members in Switzerland that would work, but not on a server in America or for tests on a machine with a different time zone. For plain dates such as a return date you therefore set `timeZone: 'UTC'`, as in the chapter on [props](../../components/props/). For points in time such as the start of the opening hours, use `timeZone: 'Europe/Zurich'`.

## Common mistakes

| Mistake | What helps |
|---|---|
| A date without a time shows up as the previous day in some time zones. | Format with `timeZone: 'UTC'`. |
| Amounts are put together with `'CHF ' + deposit`, and 12.5 becomes `CHF 12.5`. | Use `Intl.NumberFormat` with `style: 'currency'`. |
| The month is off by one, and `new Date(2026, 11, 12)` is in December. | Months count from 0 in `new Date(year, month, day)`. A string such as `'2026-11-12'` is clearer. |
| A new `Intl.NumberFormat` is created for every number. | Create the formatter once and reuse it. |
| An AI assistant suggests a library such as Moment.js for formatting. | `Intl` is enough for display. Moment.js is no longer developed. |

## Exercises

::::exercise[Getting started]
Format the deposits 20, 50 and 12.5 as amounts in francs and print each one on a line of its own.

:::solution[Solution]
::code{file="examples/js/formatting/{lang}/solution-1.mjs"}

The formatter is created once before the loop and then formats all three amounts. 12.5 becomes `CHF 12.50`, because amounts in francs always have two decimal places.
:::
::::

::::exercise[Going further]
The Wednesday opening hours start on November 4, 2026, at 4 p.m. UTC. Show this as weekday and time in the Swiss time zone.

:::solution[Solution]
::code{file="examples/js/formatting/{lang}/solution-2.mjs"}

The output is `Wednesday 5:00 PM`. In November Switzerland is on standard time, one hour ahead of UTC. `timeZone: 'Europe/Zurich'` works out this offset and also takes the switch to daylight saving time into account.
:::
::::

::::exercise[Challenge]
Print the names tent, Drill and axe as a list the way you would write them in a sentence, with commas and an "and" before the last name. Also format the number 1234567.891 with thousands separators for Switzerland.

:::solution[Solution]
::code{file="examples/js/formatting/{lang}/solution-3.mjs"}

`Intl.ListFormat` knows the rules of the language. American English puts a comma before the "and", German doesn't. `Intl.NumberFormat` without options shows up to three decimal places and separates the thousands with apostrophes.
:::
::::
