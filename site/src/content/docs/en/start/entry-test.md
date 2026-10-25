---
title: JavaScript entry test
description: Thirteen short programs whose output you predict. The test shows which units of the JS workshop to refresh before part 1.
sidebar:
  label: Entry test
  order: 3
---

:::assignment
Martina Hostettler wrote that the volunteers are exporting the catalog from the spreadsheet for you. "You'll have the data next week." From part 1 on you work with this data in JavaScript. Until then you find out which basics are solid and which ones to refresh.
:::

:::goals
After this chapter you can

- predict the output of short JavaScript code without running it,
- judge which JavaScript basics you have mastered,
- choose the units of the JS workshop to work through before part 1.
:::

## The test

Vue assumes modern JavaScript. If you stumble over `??`, an arrow function or destructuring while reading Vue code, you have little attention left for Vue itself. So the test checks the basics from WEB1 and a few things that may have come up short there.

The test has thirteen questions and takes about 20 minutes. Every question comes with a short program. Read it without running it and type what it prints to the console. If the program prints several values or several lines, separate them with spaces. Upper and lower case count. "Check" shows you right away whether your answer is correct, and a wrong answer opens the solution. Below the test a list appears with the units of the JS workshop that match the questions you got wrong. Nobody grades the test. It is just for you.

:::::quiz
::::question{answer="object" unit="variables"}
Which type does `typeof` report for `null`?

::code{file="examples/js/entry-test/{lang}/q01.mjs" run="false"}

:::solution[Solution]
`typeof null` gives `object`. This is a bug from the first version of JavaScript that was never fixed, because existing code would break. To check whether a value is `null`, compare directly with `value === null`. More in the unit [Variables, types and operators](../../js/variables/).
:::
::::

::::question{answer="20 0|20, 0" unit="variables"}
A thing has no deposit, the field is 0. What does the program print?

::code{file="examples/js/entry-test/{lang}/q02.mjs" run="false"}

:::solution[Solution]
`||` takes the right-hand value as soon as the left one counts as false, and 0 counts as false. `??` takes the right-hand value only if the left one is `null` or `undefined`. The output is `20 0`. For a deposit that may be 0, `??` is the right choice. More in the unit [Variables, types and operators](../../js/variables/).
:::
::::

::::question{answer="50" unit="control-flow"}
What is the sum at the end?

::code{file="examples/js/entry-test/{lang}/q03.mjs" run="false"}

:::solution[Solution]
`continue` ends the current pass and jumps to the next value. 50 is greater than 40 and gets skipped, which leaves 20 and 30. The sum is 50. More in the unit [Control flow](../../js/control-flow/).
:::
::::

::::question{answer="3" unit="functions"}
What does the third call of `next` return?

::code{file="examples/js/entry-test/{lang}/q04.mjs" run="false"}

:::solution[Solution]
`createCounter` returns a function that remembers the variable `count`, even after `createCounter` has finished. This is called a closure. All three calls increase the same variable, and the third one returns 3. More in the unit [Functions and scope](../../js/functions/).
:::
::::

::::question{answer="unknown null|unknown, null" unit="functions"}
The parameter has a default value. What comes out for `undefined`, and what for `null`?

::code{file="examples/js/entry-test/{lang}/q05.mjs" run="false"}

:::solution[Solution]
A default value applies only when an argument is missing or `undefined`. `null` is a value someone passes on purpose, so it stays. The output is `unknown null`. More in the unit [Functions and scope](../../js/functions/).
:::
::::

::::question{answer="50" unit="objects-and-arrays"}
Which deposit does `first` have at the end?

::code{file="examples/js/entry-test/{lang}/q06.mjs" run="false"}

:::solution[Solution]
`const second = first` doesn't copy the object but the reference to it. Both variables point to the same object, so the change made through `second` is visible through `first` too. More in the unit [Objects and arrays](../../js/objects-and-arrays/).
:::
::::

::::question{answer="Tent Projector|Tent, Projector" unit="objects-and-arrays"}
Which two names does the program print?

::code{file="examples/js/entry-test/{lang}/q07.mjs" run="false"}

:::solution[Solution]
When you destructure an array, position counts. The empty slot between the two commas skips the second element, and `third` gets the third one. The output is `Tent Projector`. More in the unit [Objects and arrays](../../js/objects-and-arrays/).
:::
::::

::::question{answer="RACL" unit="strings"}
What is left of the text?

::code{file="examples/js/entry-test/{lang}/q08.mjs" run="false"}

:::solution[Solution]
`toUpperCase` returns a new string in capital letters. `slice(0, 4)` takes the characters at positions 0 to 3, and position 4 is no longer included. More in the unit [Strings and template literals](../../js/strings/).
:::
::::

::::question{answer="TypeError" unit="classes"}
The method is called without an object in front of it. What does the program print?

::code{file="examples/js/entry-test/{lang}/q09.mjs" run="false"}

:::solution[Solution]
Here `getName` is a function that no longer knows anything about `shop`. When it is called without an object in front, `this` is `undefined` in a module, and `this.name` throws a `TypeError`. The `catch` block prints the name of the error. More in the unit [Classes and this](../../js/classes/).
:::
::::

::::question{answer="a b c|a, b, c" unit="errors"}
In which order does the output appear?

::code{file="examples/js/entry-test/{lang}/q10.mjs" run="false"}

:::solution[Solution]
The `try` block prints `a` and then throws an error. The program jumps to the `catch` block, which prints the message `b`. The `finally` block always runs, with or without an error, and prints `c`. The answer is `a b c`. More in the unit [Handling errors](../../js/errors/).
:::
::::

::::question{answer="Ladder" unit="dom-and-events"}
The listener sits on the list, and the click goes to the last entry. What does the page print to the console?

::code{file="examples/js/entry-test/{lang}/q11.html" run="false"}

:::solution[Solution]
A click on an element rises up through the DOM, past the list and up to the document. That's why the listener on the list gets it too. `event.target` is the element that was clicked, the second entry "Ladder". More in the unit [The DOM and events](../../js/dom-and-events/).
:::
::::

::::question{answer='{"name":"Tent"}' unit="json"}
Which text does `JSON.stringify` produce?

::code{file="examples/js/entry-test/{lang}/q12.mjs" run="false"}

:::solution[Solution]
JSON has no value `undefined`, so `JSON.stringify` leaves out the field `note`. Keys and strings are in double quotes, and without further arguments there are no spaces. The output is `{"name":"Tent"}`. More in the unit [JSON and data formats](../../js/json/).
:::
::::

::::question{answer="CHF 20.00" unit="formatting"}
How does `Intl.NumberFormat` show a deposit of 20 francs?

::code{file="examples/js/entry-test/{lang}/q13.mjs" run="false"}

:::solution[Solution]
With `style: 'currency'`, `Intl.NumberFormat` puts the currency code in front of the amount and shows two decimal places. Swiss amounts of money use a period, not a comma. More in the unit [Formatting numbers and dates](../../js/formatting/).
:::
::::
:::::

## Next steps

If you answered every question correctly, you are ready for part 1. The JS workshop stays available anyway, for looking things up when a chapter assumes a topic.

Plan about half an hour for every unit the test names. Read the explanations, run the examples and solve at least the "Getting started" exercise. Fit the units in before part 1 starts, because there is little time for them in class. If you are still unsure after a unit, ask in class.

:::assignment
Martina Hostettler will get in touch as soon as the data is there. Until then, use the [competence grid](../competences/) to check whether you are ready for part 1.
:::
