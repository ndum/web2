---
title: An SPA by hand
description: Building an SPA without a framework, with a state, a render function, events and a router on the hash, and seeing where the handwork reaches its limits.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler wants to see what makes an SPA work before the volunteers choose a tool.

> As a member, I want to browse the catalog in the browser and open a page of its own for every thing, so that I can send a friend a link to exactly this thing.

The acceptance criteria are:

1. The catalog shows all things with name, category and availability.
2. A click on a thing opens its page with the deposit and the date from which it is back. The address changes, and a link to this address opens this page directly.
3. The browser's "Back" button leads back to the catalog.
4. While loading and when the server reports an error, a clear message appears.
:::

:::goals
After this chapter you can

- build an interface from a state and a render function,
- handle events so that they change the state and draw again,
- insert text into HTML safely,
- build a router on the hash of the address that supports links and the "Back" button,
- explain where updating the page by hand reaches its limits.

For this you need the DOM and events from the [JS workshop](../../js/dom-and-events/) and loading with `fetch` from the chapter [Asynchronous JavaScript](../../javascript/async/).
:::

## One state for the whole app

An SPA rests on an idea that Vue uses as well. Everything the page shows lives in one object, the state. A function `render` reads the state and builds the page from it. When something happens, a click, some input, an answer from the server, the code only changes the state and calls `render` again.

::code{file="examples/02-spa/spa-by-hand/{lang}/state.html"}

The click on the button doesn't change the paragraph, it changes `state.reservations`. Then `render` draws the page anew. Since `render` replaces the button with a new one every time, the listener doesn't sit on the button but on the container. A click rises up through the DOM, and `data-action` says what to do. This pattern is called event delegation, and the unit [The DOM and events](../../js/dom-and-events/) shows it in more detail.

![The cycle of the SPA by hand. Four boxes form a cycle. The state is an object with status, items and route. The function render reads the state and writes the page from it. On the page, clicks, input and hashchange fire events. The event handlers change the state, and the cycle starts again.](../../../../assets/figures/en/p2c2-render-loop.svg)

The cycle has an advantage. What the page shows depends only on the state. Whoever wants to know why something appears on the page looks at the state, not at a long series of changes to the DOM.

## The render function

The render function builds HTML as text with template literals and inserts it with `innerHTML`. For a list, `map` turns every thing into an entry, and `join('')` puts the entries together.

::code{file="examples/02-spa/spa-by-hand/{lang}/render.html"}

The third thing has a name that looks like HTML. Without care, `innerHTML` would turn it into an element and run its code. That's why every text that comes from data goes through `escapeHtml`. The function replaces the characters that mean something in HTML with their text form. The output shows that no image was created and that the name appears as text. Fixed texts such as "Available" are written by the code itself and don't need this.

## A router on the hash

An SPA shows different views under different addresses. The simplest way to do this is the hash, the part of the address after the `#` sign. When only the hash changes, the browser doesn't load a new page. It adds the new address to the list for the "Back" button and fires the event `hashchange`.

::code{file="examples/02-spa/spa-by-hand/{lang}/router.html"}

`parseRoute` translates the hash into a route, an object with a name and, where needed, the id of the thing. A regular expression recognizes addresses such as `#/items/6`, and `Number` turns the text into a number so that the comparison with `===` works. `render` picks the view according to the route. The links are ordinary links to a hash, `<a href="#/items/6">`. A click changes the address, `hashchange` calls `render`, and the "Back" button works by itself.

The browser never sends the hash to the server. For the server there is only one page, no matter which thing is being shown. That's why a link such as `http://localhost:3000/#/items/6` also works as the first address someone opens. Nicer addresses without `#` are possible with the History API, which part 6 uses with Vue Router.

## The SPA with data

In the exercise project, the parts come together. The function `start` sets up the state, draws a loading message, loads the catalog with `loadItems` from part 1 and then draws the catalog or the message of an error.

::code{file="exercises/02-spa/spa-by-hand/{lang}/app/app.js"}

Besides the things, the state holds `status` and `error` from the chapter [Asynchronous JavaScript](../../javascript/async/) and the current route. `render` decides what appears based on this object alone. The functions that build the HTML live in the module `render.js` and know neither the state nor the DOM. They receive data and return text, which makes them easy to test.

## The SPA in the browser

The SPA consists of ES modules, and the browser loads modules only over HTTP. That's why the small server from part 1 now delivers the files of the app as well. At `http://localhost:3000/` the page comes from the folder `app`, and at `/items` the catalog, as before. Page and data share one address, which saves trouble that part 7 explains.

```bash
npm run server
```

Then open `http://localhost:3000/` in the browser and the "Network" area in the DevTools. On loading, the page, the modules and the request to `/items` appear. A click on a thing doesn't trigger a single request, as in the figure from the chapter [Web pages and web apps](../web-pages-and-web-apps/).

## The limits of handwork

The cycle of state and `render` is simple as long as `render` may draw everything anew. With input fields that goes wrong.

::code{file="examples/02-spa/spa-by-hand/{lang}/focus.html"}

After the first letter, `render` draws everything anew, the search field included. The field someone types into disappears and is replaced by a new one that doesn't have the focus. Whoever keeps typing types into nothing. That's not the only catch.

1. Every field that should keep its focus, its selection or its scroll position must not be replaced by `render`. The render function has to know which parts it may draw anew.
2. Every text from data has to go through `escapeHtml`, also in the value of attributes such as `value`. A forgotten call is a hole.
3. With many entries, rebuilding everything on every change takes time.
4. With every feature, the code grows that keeps track of which parts of the page depend on which parts of the state.

A framework such as Vue takes exactly this work off your hands. In the template you describe what the page looks like based on the state, Vue keeps track of which parts depend on which data and changes only what has really changed. A search field keeps its focus, and Vue always inserts text safely. That's what part 3 is about.

## In code

Work with the example on the router. Read the code and write down what you expect before you change anything.

::code{file="examples/02-spa/spa-by-hand/{lang}/router.html"}

1. What appears if you write `location.hash = '#/items/99'` at the end instead of the click? And with `'#/items/projector'`?
2. Add a link to `#/about` to the catalog and catch the route in `parseRoute`, so that a short page about the association appears.
3. What happens if you leave out the `Number(...)` in `parseRoute`? Why?
4. Click a link in the frame below the code and then "To the catalog". Which lines appear in the output?

## Exercises

The exercises build the SPA of the assignment. You find the project in the course repo in the folder `exercises/02-spa/spa-by-hand/en`. Copy the folder, install the packages and run the tests.

```bash
npm install
npm test
```

With `npm run server` and the address `http://localhost:3000/` you see the app in the browser. The tests check the functions and the app without a server, with a stand-in for `fetch`.

::::exercise[Getting started]
Write the function `renderList(items)` in `app/render.js`. It returns a list `<ul class="catalog">` with one entry per thing. Every entry contains a link with the name of the thing that points to its page, such as `#/items/6`, plus the category and "Available" or "On loan". Names and categories go through `escapeHtml` from `app/html.js`.

:::solution[Solution]
::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/render.js" lines="1-19"}

`map` turns every thing into an entry, and `join('')` puts them together without commas. The availability sits in a small function of its own, because the page of a thing needs it too in the next step. Without `escapeHtml` the last test fails, and the name with `<b>` would appear in bold instead of as text.
:::
::::

::::exercise[Going further]
Write the function `parseRoute(hash)` in `app/router.js`. It returns `{ name: 'catalog' }` for an empty address and for `#/`, `{ name: 'item', id: 6 }` for `#/items/6` and `{ name: 'notFound' }` for everything else. Then write `renderDetail(item)` for the page of a thing, with the name as heading, the category, the deposit, the availability or the date from which it is back, and a link back to the catalog.

:::solution[Solution]
::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/router.js"}

::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/render.js" lines="21-31"}

After `#/items/` the regular expression accepts digits only, so `#/items/six` ends up as `notFound`. For deposit and date, `renderDetail` uses the functions from `app/format.js`, the date in UTC as in the chapter on [props](../../components/props/). You don't have to change the app itself, since `render` in `app.js` already calls the functions. The last test opens the app directly with the address of the projector.
:::
::::

::::exercise[Challenge]
Add a search field with the id `search` above the catalog. While someone types, the list shows only things whose name contains the search text, regardless of upper and lower case. The search field should keep its focus and its text.

:::solution[Solution]
::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/app.js" lines="10-40"}

The trick is not to draw everything anew. For the catalog, `render` draws the search field and an empty container `#results`. While someone types, the listener calls only `renderResults`, which fills the container alone. The search field stays the same element, with focus and text. The search text still lives in the state, so that it is back in the field after a visit to the page of a thing. Exactly this decision, which parts may be created anew, is what Vue makes for you in part 3.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A listener sits on a button that `render` later replaces and stops reacting. | Attach the listener to a container that `render` doesn't replace and work with event delegation. |
| A handler changes the page directly, and the change is gone after the next `render`. | Change only the state in the handler and then call `render`. |
| Text from data ends up in `innerHTML` without `escapeHtml`. | Send every text from data through `escapeHtml`, in attributes too. |
| `route.id === item.id` is never true, because the id from the address is a string. | Convert the id with `Number(...)`. |
| A link without `#` reloads the whole page. | Write links to a hash for the views of the SPA, `href="#/items/6"`. |
| The page stays empty because it was opened directly as a file. | Open the app through the server, `http://localhost:3000/`. |
| An AI assistant writes `onclick="reserve()"` into the HTML of the render function. | In a module the function isn't global and isn't found. Use event delegation. |

## Self-check

::::selfcheck
1. What does an event handler do in an SPA that follows the pattern of this chapter, and what doesn't it do?
2. Why does the listener for the buttons sit on the container and not on the buttons?
3. What happens on a click on `<a href="#/items/6">`, and why doesn't the browser load a new page?
4. Why does the search field in the example lose its focus, and what helps?

:::solution[Answers]
1. It changes the state and calls `render`. It doesn't change the page directly.
2. `render` replaces the buttons every time it draws. A listener on an old button would sit on an element that is no longer on the page. The container stays, and the click rises up to it.
3. The hash of the address changes, the browser adds the address to the history and fires `hashchange`. A change to the hash alone loads no new page, and the browser doesn't send the hash to the server.
4. `render` replaces all the HTML, the search field included, and the new field doesn't have the focus. What helps is drawing only the list anew and leaving the field in place.
:::
::::

:::assignment
The first version runs, and Martina Hostettler showed it to a volunteer who works as a software developer. He likes it, but he has two questions. "How do you want to publish this, with all these separate files? And do you reload the browser by hand on every change?" The next chapter is about the tools that take care of this.
:::
