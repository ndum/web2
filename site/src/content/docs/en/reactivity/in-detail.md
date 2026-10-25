---
title: Reactivity in detail
description: How Vue tracks dependencies and triggers effects, bugs caused by copied and replaced values, toRef and toRefs, shallowRef with triggerRef, and nextTick.
sidebar:
  order: 1
---

:::assignment
The volunteer reworked the header of the app. Since then, the favorites counter stays at the number it showed when the page loaded, and Martina Hostettler reports the bug from the counter.

> I mark three things as favorites, and the header still says "0 favorites".

While hunting for the bug, the volunteer finds two more places where the app loses its connection to its state. The acceptance criteria for the fix are:

1. The counter in the header follows every change to the favorites.
2. "Reset the filter" empties the search field and the category, and the search keeps working afterwards.
3. A thing that comes back shows up as available right away, even though Vue no longer watches every field of the catalog.
:::

:::goals
After this chapter you can

- explain how Vue tracks the dependencies between reactive values and effects,
- make the dependencies of a component visible with `onRenderTracked` and `onRenderTriggered`,
- find bugs where a value gets copied or a reactive object gets replaced,
- keep single fields connected with `toRef` and `toRefs`,
- use `shallowRef` and `triggerRef` for large data,
- wait for the updated page with `nextTick`.
:::

## Effects and dependencies

In part 3 you saw that Vue renders a component again as soon as a ref changes that its template reads. The deep dive [Proxies and getters](../../javascript/proxies/) in part 1 showed how something like that can work. Vue calls a function that it runs and observes an effect. While an effect runs, Vue records every reactive value it reads. Vue calls this step `track`. When one of those values changes later, Vue runs the effects that read it again. Vue calls this step `trigger`.

A component has several effects. The render function that the compiler builds from the template is one of them. Every computed value is another one, and the watchers from the next chapter belong to the same family.

![Dependencies in the header of the app. Three boxes in a row, the ref favorites, the computed value favoriteCount and the render function of AppHeader, with the page showing 3 favorites next to them on the right. At the top, arrows show who reads whom, and Vue remembers each of these dependencies. At the bottom, arrows show what the change favorites.value.push(3) triggers until the page shows the new value.](../../../../assets/figures/en/p5c1-dependencies.svg)

The figure shows the favorites counter. The render function of `AppHeader` reads the computed value `favoriteCount`, which in turn reads the ref `favorites`. Vue records both dependencies. When `push` adds a favorite, Vue marks `favoriteCount` as stale and runs the render function again. The render function reads `favoriteCount`, which now recalculates, and the page shows the new value.

## Making dependencies visible

Vue offers two debugging hooks that show which values a component reads while rendering. `onRenderTracked` reports every value the render function reads, and `onRenderTriggered` reports every change that makes it run again. According to the [documentation](https://vuejs.org/api/composition-api-lifecycle.html#onrendertracked), both only work in development. Read the example, open the playground console and then click both buttons.

::playground{dir="examples/05-reactivity/render-tracking"}

The first render prints two lines. The template reads `value` of the ref `favorites` and then `length` of the array inside it. A click on "Save the raclette oven" reports `triggered add 2`, because `push` added an element at index 2. After that, the two lines for reading appear again, since Vue collects the dependencies anew on every run. A click on "Change the search text" prints nothing. The template doesn't read `query`, so rendering doesn't depend on it.

## Copied values

That explains the bug in the header. The volunteer computed the number of favorites once and stored it in a constant.

```js
const count = props.favorites.length
```

This line runs exactly once, when the component is created. It reads `props.favorites`, but not inside an effect, so Vue records nothing, and `count` stays a plain number. From then on, the template only reads that number. The example shows the difference between a copy and a computed value.

::playground{dir="examples/05-reactivity/lost-connection"}

After two clicks, the copy still says 2 while the computed value says 4. A computed value is an effect. Vue runs its function, records what it reads and recalculates after a change. The same trap hides in any line at the top level of `<script setup>` that reads a reactive value and keeps the result, such as `const name = props.item.name`.

## Replaced objects

The second bug sits in the button "Reset the filter". The filter is a reactive object, and the volunteer replaces it with a new one on reset.

```js
let filter = reactive({ query: '', category: '' })

function resetFilter() {
  filter = reactive({ query: '', category: '' })
}
```

The template and the computed list read the fields of the old proxy. Vue tracks access to that proxy, but the variable `filter` is an ordinary variable. Assigning something new to it triggers nothing. The fields keep showing the old text, and since the search field writes into the new object from then on, the list stops following the search.

So a reactive object keeps its identity, and only its fields change. `Object.assign` writes several fields at once.

```js
const filter = reactive({ query: '', category: '' })

function resetFilter() {
  Object.assign(filter, { query: '', category: '' })
}
```

With `const`, JavaScript doesn't allow a new assignment, which is why `reactive` always goes with `const`. A ref works the other way around. A new value for `.value` is allowed and triggers updates, because Vue tracks writes to `value`.

## Single fields with toRef and toRefs

Destructuring copies too, as you saw in part 3. When you need a single field as a variable of its own, `toRef` gives you a ref that reads and writes the field of the object. `toRefs` does the same for every field of an object at once, and you can destructure the result safely.

::playground{dir="examples/05-reactivity/to-refs"}

After both clicks, the copy of `query` still shows an empty string, while the ref for `category` shows "Tools". `toRefs` is mostly useful where a function returns a reactive object and the caller wants to take it apart. The chapter [Composables](../composables/) comes back to this.

## Large data with shallowRef

A ref holding an array of objects also makes the objects inside reactive as soon as someone reads them. Every access to a field then goes through a proxy that records dependencies. The [documentation](https://vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures) says the overhead becomes noticeable when a single render reads more than 100,000 fields of large, nested arrays. For data like that, there's `shallowRef`. It only tracks `.value` itself, and whatever is inside stays an ordinary object.

::playground{dir="examples/05-reactivity/shallow-ref"}

A click on "Add inside the array" changes the array, but the list stays the same, because `push` doesn't give `.value` a new value. "Replace the array" does, and the list shows every entry, including the one from `push`. After a change inside, `triggerRef` triggers the effects by hand. In the template, `items` would already arrive unwrapped, so the example calls `triggerRef` from a function in the script. With `shallowRef`, you treat the data inside as immutable and replace it on every change.

## Waiting for the DOM with nextTick

Vue doesn't update the page after every single change. It collects the triggered effects and runs them together once the current code has finished. If a function changes three refs, the component renders once instead of three times. The [documentation](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing) explains that this way every component updates only once. Code that needs to work with the updated page after a change waits with `await nextTick()`.

::playground{dir="examples/05-reactivity/next-tick"}

After a click, the log says "before nextTick 0, after nextTick 1". Right after `count.value++`, the paragraph still shows the old number, and after `await nextTick()` Vue has rendered. You rarely need this, for example to focus an element that only appears because of the change. The chapter [Lifecycle and template refs](../lifecycle/) shows such a case.

## In code

Work with the examples of this chapter. Read the code and write down what you expect before you change anything.

1. In the debugging example, add a paragraph with `{{ query }}` to the template. What does the console report now when you click "Change the search text"?
2. In the example with the copy, turn `copiedCount` into a function that returns the length and call it in the template. What does the line show after two clicks, and why?
3. In the example with `shallowRef`, replace the call with `ref`. What changes for the button "Add inside the array"?
4. In the `nextTick` example, increase the counter three times in a row with `count.value++` inside `add`. What does the log say afterwards?

## Exercises

The exercises fix the practice version of the app from the assignment. You'll find the project in the course repo in the folder `exercises/05-reactivity/reactivity/en`. Copy the folder, install the packages and start the tests.

```bash
npm install
npm test
```

::::exercise[Getting started]
The counter in the header stays at "0 favorites", even when buttons are pressed. Find the line in `src/components/AppHeader.vue` that copies the value and turn the text into a computed value. Afterwards the header shows "1 favorite" or "2 favorites".

:::solution[Solution]
::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/components/AppHeader.vue" lines="1-11"}

`computed` reads `props.favorites` on every run and records the dependency. When `App` changes the favorites, `AppHeader` receives a new array as a prop, and Vue recalculates the text. A function called from the template would work too, because the render function is an effect itself.
:::
::::

::::exercise[Going further]
After "Reset the filter", the search text and the category stay where they were, and the list no longer follows the search. Fix `resetFilter` in `src/App.vue` so that the reactive object is kept.

:::solution[Solution]
::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="14-15"}

::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="37-40"}

`Object.assign` writes both fields into the existing object, and Vue triggers for each field. Two assignments to `filter.query` and `filter.category` do the same. With `const` instead of `let`, the old line fails right away with an error, because you can't assign anything new to a constant.
:::
::::

::::exercise[Challenge]
The catalog only changes as a whole when a thing comes back. Put `catalog` in `src/App.vue` into a `shallowRef`. After that, the button "Returned" stops working. Get it working again without going back to `ref`. Afterwards the thing shows up as available, the button disappears, and the line above the list says "50 of 60 things are in".

:::solution[Solution]
::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="8-9"}

::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="42-45"}

`map` returns a new array in which the returned thing is a copy with `availableFrom: null`. The assignment to `.value` triggers, and Vue renders the card and recalculates the number above the list. Copying with `...item` leaves the object from the data untouched. A solution that calls `triggerRef(catalog)` after changing the inside passes the tests as well, but it depends on nobody forgetting that call.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A value stays at whatever it was when the page loaded. | Look for a line at the top level of `<script setup>` that reads a reactive value and keeps the result, and turn it into `computed`. |
| After assigning a new object to a variable with `reactive`, the page stops reacting. | Keep the object and change its fields, for example with `Object.assign`, and always declare `reactive` with `const`. |
| Destructured fields of a reactive object don't follow it. | Call `toRefs` before destructuring, or use `toRef` for a single field. |
| A change inside a `shallowRef` doesn't show up on the page. | Give `.value` a new object or array, or call `triggerRef` after the change. |
| Code right after a change still finds the old state in the DOM. | Call `await nextTick()` before reading the DOM. |
| `onRenderTracked` reports nothing in the built app. | The debugging hooks only work in development. |
| An AI assistant makes the component render again with `$forceUpdate` or a changing `key`. | Look for the cause, usually a copied value or a replaced object. A reactive value doesn't need forced rendering. |

## Self-check

::::selfcheck
1. What does Vue record while an effect runs, and what does it do on a change?
2. Why doesn't `const count = props.favorites.length` follow the favorites?
3. Why does assigning a new object to a variable with `reactive` trigger nothing, while assigning to `.value` of a ref does?
4. When is `shallowRef` worth it, and what do you have to keep in mind when changing its data?
5. What is `nextTick` for?

:::solution[Answers]
1. Which reactive values the effect reads. When one of them changes, Vue runs the effects that read it again.
2. The line runs once when the component is created, and not inside an effect. After that, `count` is a plain number.
3. Vue tracks access to the proxy of a reactive object and to `.value` of a ref. A variable is neither, so nobody notices the new assignment.
4. For large data that only changes as a whole. A change needs a new value for `.value`, or a call to `triggerRef` afterwards.
5. To wait until Vue has written the collected changes to the DOM.
:::
::::

:::assignment
The counter is right again, and the app keeps its connection to its state. The wish from part 4 is still waiting at the counter, though. "After a reload, the search always starts from scratch." For the app to remember the search, it has to do something outside the component on every change and write to the browser's storage. That's what watchers are for, the topic of the next chapter.
:::
