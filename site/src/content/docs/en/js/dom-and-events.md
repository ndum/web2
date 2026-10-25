---
title: The DOM and events
description: Finding, creating and changing elements, reacting to clicks and input, event delegation and forms without reloading the page.
sidebar:
  order: 8
---

The DOM is the page as the browser holds it in memory, a tree of elements. JavaScript can read and change this tree. In part 2 you build a first SPA by hand this way, before Vue takes this work off your hands. The examples of this unit are small HTML pages. When you click "Run", they appear below the code, with the console output underneath.

:::goals
After this unit you can

- find elements with `querySelector` and create new elements,
- set text safely with `textContent` and explain why `innerHTML` can be dangerous,
- react to clicks and input with `addEventListener`,
- serve many elements with a single listener and handle a form without reloading.
:::

## Finding and creating elements

`document.querySelector` takes a CSS selector and returns the first matching element or `null`. `querySelectorAll` returns all matching elements. `document.createElement` creates a new element, which only becomes visible once you insert it into the tree with `append`.

::code{file="examples/js/dom-and-events/{lang}/list.html"}

The loop creates an `<li>` for every name, sets its text and appends it to the list. Afterwards `list.children` contains three elements.

`textContent` sets plain text. With `innerHTML` you could insert HTML as well, but that is dangerous as soon as the text comes from members. Someone who writes HTML with a script into a note would otherwise bring foreign code into the page. This hole is called cross-site scripting, XSS for short. The "Getting started" exercise shows the difference.

## Reacting to events

Clicks, input and other occurrences are called events. With `addEventListener` you attach a function to an element, and the browser calls it for every matching event.

::code{file="examples/js/dom-and-events/{lang}/events.html"}

The first listener counts the clicks on the button. The second one sits on the whole list. An event rises from the clicked element up through the tree, so the list also gets the clicks on its entries. `event.target` is the element that was actually clicked, and `closest('li')` looks upward from there for the nearest entry. This pattern is called event delegation. One listener is enough for all entries, including those added later.

`data-id` is a custom attribute that you read in the script through `dataset.id`. Values from `dataset` are always strings. At the end the script triggers two clicks itself, so that the output shows something. Afterwards, click the button and the entries yourself.

## Forms

A form normally sends its data to a server and then loads a new page. An SPA prevents this with `event.preventDefault()` and processes the data itself.

::code{file="examples/js/dom-and-events/{lang}/form.html"}

The listener is attached to the form's `submit` event, not to the click on the button. That way submitting with the Enter key works too. `FormData` reads all fields that have a `name` at once, and `data.get('days')` returns the value as a string. The browser checks the attributes `required`, `min` and `max` itself before it fires the event. `requestSubmit` submits the form from the script, just as a click on the button would.

## Common mistakes

| Mistake | What helps |
|---|---|
| `querySelector` returns `null` because the script runs before the HTML. | Put the script at the end of the page or use `type="module"`, since modules only run once the HTML has been read. |
| Text from members is inserted with `innerHTML`. | Use `textContent`. |
| The form reloads the page, and the output disappears right away. | Call `event.preventDefault()` in the `submit` listener. |
| Every entry of a list gets its own listener, and new entries don't react. | Put one listener on the list and find the entry with `event.target.closest(...)`. |
| `addEventListener('click', handle())` calls the function right away. | Pass the function itself, without parentheses. |

## Exercises

::::exercise[Getting started]
A member enters `<img src=x onerror=alert(1)> Tent` as a note. Show the note in a paragraph without it turning into an element. How many child elements does the paragraph have afterwards?

:::solution[Solution]
::code{file="examples/js/dom-and-events/{lang}/solution-1.html"}

The output is 0. `textContent` shows the characters exactly as they were entered, angle brackets included. With `innerHTML` an `<img>` element would be created whose image doesn't load, and `onerror` would run the member's code.
:::
::::

::::exercise[Going further]
A click on an entry of the list marks it as a favorite, and a second click removes the mark again. Use a single listener on the list and the class `favorite`. After every click, print the name and whether the entry is currently a favorite.

:::solution[Solution]
::code{file="examples/js/dom-and-events/{lang}/solution-2.html"}

`classList.toggle` adds the class when it is missing and removes it when it is there. `classList.contains` reads the current state. The `return` at the start of the listener catches clicks that land inside the list but not on an entry.
:::
::::

::::exercise[Challenge]
Build a search. On every input in the search field, the list shows only the names that contain the search text, ignoring upper and lower case. Write a function `render(query)` for it that rebuilds the list each time.

:::solution[Solution]
::code{file="examples/js/dom-and-events/{lang}/solution-3.html"}

`replaceChildren()` without arguments empties the list, and then the loop inserts the matching entries. The `input` event fires on every change in the field, not only when you leave it. At the end the script sets the search text "saw" and fires the event itself, which is why the output shows 3 first and then 1. Changing state and rebuilding the list is the work Vue takes off your hands in part 3.
:::
::::
