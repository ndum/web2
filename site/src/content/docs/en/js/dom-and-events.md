---
title: The DOM and events
description: The counter helper shows the nine things on a page, and a click reserves one. Finding and creating elements, reacting to events, event delegation and forms without reloading the page.
sidebar:
  order: 8
---

::::step{n="8"}
It knows the nine things from the counter, writes a line for each one and checks a request before accepting it. So far everything ends up in the console. In this step the nine things move onto a page. Every thing that is in gets a button, and a click on it reserves the thing.

:::details[Code up to step 7]
::code{file="examples/js/errors/{lang}/desk.mjs"}
:::
::::

The DOM is the page as the browser holds it in memory, a tree of elements. JavaScript can read and change this tree. In part 2 you use it to build a first SPA by hand, before Vue takes this work off your hands. The examples of this step are small HTML pages. When you click "Run", the page appears in a frame below the code, with the console output underneath.

:::goals
After this step you can

- find elements with `querySelector` and create new ones with `createElement`,
- set text safely with `textContent` and explain why `innerHTML` can be dangerous,
- react to clicks with `addEventListener` and serve many buttons with a single listener,
- handle a form without the browser reloading the page.
:::

## Finding and creating elements

`document.querySelector` takes a CSS selector and returns the first matching element or `null`. `querySelectorAll` returns all matching elements. `document.createElement` creates a new element, which only becomes visible once you insert it into the tree with `append`.

::code{file="examples/js/dom-and-events/{lang}/list.html"}

The loop creates an `<li>` for every name, sets its text and appends it to the list. The list then has three children, and `querySelector('li')` finds the first of them, the drill. This page has no element with the id `count`, so `querySelector('#count')` returns `null`.

`textContent` sets plain text. With `innerHTML` you could insert HTML as well, but that is dangerous as soon as the text comes from members. Someone who writes HTML with a script into a note would otherwise bring foreign code into the page. This hole is called cross-site scripting, XSS for short. The "Getting started" exercise shows the difference.

## Reacting to events

Clicks, input and other occurrences are called events. With `addEventListener` you attach a function to an element, and the browser calls it for every matching event. At the counter, a button counts the visits of the day.

::code{file="examples/js/dom-and-events/{lang}/events.html"}

`countVisit` appears without parentheses in the call to `addEventListener`. You hand over the function, and the browser calls it on every click and passes it an event object. `event.type` says what happened, and `event.target` is the element that was clicked. So every line of the output shows `click`, the text of the button and the number of visits. At the end the script clicks the button twice with `click()`, so that the output shows something. Then click the button yourself and watch the number on the page grow.

## Event delegation

In the counter helper every thing that is in gets a "Reserve" button. Instead of giving each button a listener of its own, a single one sits on the list. This works because an event rises from the clicked element up through the tree, past the entry to the list and on up to the document. The figure follows a click on the projector's button.

![Event delegation in the list. On the left the path of a click through the DOM. It hits the Reserve button of the projector with data-id 6, rises to its entry li, then to the list ul with the id items and on up to the document. The only listener sits on the list. At the top right is the call list.addEventListener that registers it, below it what the listener does with the click in three steps. event.target is the clicked element, closest returns the button or null, and Number turns dataset.id into the number 6 of the projector. This way one listener serves every button in the list.](../../../../assets/figures/en/j8-event-delegation.svg)

The counter helper builds the list from the nine things of step 4. A thing that is in gets a button that carries its `id` in the attribute `data-id`, a thing on loan only the note "on loan". `showCount` writes the line above the list.

::code{file="examples/js/dom-and-events/{lang}/desk.html"}

The listener asks `event.target.closest('button')` for the button the click came from. If someone clicks inside the list but next to a button, `closest` returns `null` and `return` ends the listener. `button.dataset.id` reads the attribute `data-id`, but as a string. `Number` turns it into the number that `===` can compare with the `id` in the array. `find` returns the first thing for which the arrow function returns `true`, just like `byId` from the exercises of step 4.

Then the button reads "reserved", `disabled` blocks further clicks, and `showCount` writes the line again. At the end the script clicks the projector's button itself, which is why the output shows `Reserved: Projector` and `6 of 9 things are in, 1 reserved`. A reserved thing stays on the shelf until it is picked up, so the count remains 6 of 9.

One listener for many elements is called event delegation. It also serves buttons that join the list later, for example when a thing on loan comes back. Part 2 builds the SPA by hand on this pattern.

## Forms

A form normally sends its data to a server and then loads a new page. An SPA prevents this with `event.preventDefault()` and processes the data itself. At the counter, a form takes a request with the member number, the pickup day and the return day.

::code{file="examples/js/dom-and-events/{lang}/form.html"}

The listener is attached to the form's `submit` event, not to the click on the button. That way submitting with the Enter key works too. `FormData` reads all fields that have a `name` at once, and `data.get('from')` returns the value as a string such as `2026-11-07`. `loanDays` from step 3 understands this string directly. The browser checks the attribute `required` itself before it fires the event. At the end the script fills in the member number M-117 and submits the form with `requestSubmit`, just as a click on the button would. That's why the output shows `M-117, 4 days`.

## Exercises

::::exercise[Getting started]
A member writes `<img src=x onerror=alert(1)> Tent` into the note of their request. Show the note in a paragraph without it turning into an element. How many child elements does the paragraph have afterwards?

:::solution[Solution]
::code{file="examples/js/dom-and-events/{lang}/solution-1.html"}

The paragraph shows the characters exactly as they were typed, angle brackets included, and has 0 child elements. With `innerHTML` an `<img>` element would be created whose image doesn't load, and `onerror` would run the member's code.
:::
::::

::::exercise[Going further]
A member marks favorites in a list with the raclette oven, the projector and the sleeping bag. A click on an entry makes it a favorite, and a second click removes the mark again. Use a single listener on the list and the class `favorite`. After every click, print the name and whether the entry is currently a favorite.

:::solution[Solution]
::code{file="examples/js/dom-and-events/{lang}/solution-2.html"}

`classList.toggle` adds the class when it is missing and removes it when it is there. `classList.contains` reads the current state. The `return` at the start of the listener catches clicks that land inside the list but not on an entry. The rule in `<style>` shows favorites in bold, so you can see your own clicks in the frame.
:::
::::

::::exercise[Challenge]
Bring the search from step 5 onto the page. On every input in the search field, the list shows only the things whose name contains the search text, ignoring upper and lower case. Write a function `render(query)` that rebuilds the list each time.

:::solution[Solution]
::code{file="examples/js/dom-and-events/{lang}/solution-3.html"}

`replaceChildren()` without arguments empties the list, and then the loop inserts the matching entries. As in step 5, `render` compares everything in lower case and without spaces at the edges. The `input` event fires on every change in the field, not only when you leave it. At the end the script sets the search text "saw" and fires the event itself, which is why the output shows 9 first and then 1. Changing state and rebuilding the list is the work Vue takes off your hands in part 3.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| `querySelector` returns `null` because the script runs before the HTML. | Put the script at the end of the page or use `type="module"`, since modules only run once the HTML has been read. |
| Text from members is inserted with `innerHTML`. | Use `textContent`. |
| `addEventListener('click', countVisit())` calls the function right away. | Pass the function itself, without parentheses. |
| Every button gets a listener of its own, and new buttons don't react. | Put one listener on the list and find the button with `event.target.closest('button')`. |
| `button.dataset.id === 6` is never true. | Values from `dataset` are strings. Convert them with `Number(button.dataset.id)`. |
| The form reloads the page, and the output disappears right away. | Call `event.preventDefault()` in the `submit` listener. |

## Self-check

::::selfcheck
1. Why does the listener on the list also get the clicks on the buttons?
2. What does `event.target.closest('button')` return when someone clicks inside the list next to a button?
3. Why does the form's listener call `event.preventDefault()`?

:::solution[Answers]
1. An event rises from the clicked element up through the tree. A click on a button then reaches its entry, the list and the document.
2. `null`, because neither the clicked element nor any element above it is a button. The listener then ends with `return`.
3. Otherwise the browser sends the form away and loads a new page. The data would be gone before the script could process it.
:::
::::

:::next
In step 9 the counter helper writes the nine things as JSON, reads them back and keeps a member's favorites as text. Continue with [J9 JSON and data formats](../json/).
:::
