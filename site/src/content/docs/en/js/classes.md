---
title: Classes and this
description: The counter helper records reservations as objects of a class and works out their days. Classes with a constructor and methods, getters, setters and toString, private fields, static methods and what this depends on.
sidebar:
  order: 6
---

::::step{n="6"}
It writes a line for every thing and finds things by their name. In this step it records reservations with the thing, the member number, the pickup and the return date, and it works out how many days a loan lasts.

:::details[Code up to step 5]
::code{file="examples/js/strings/{lang}/desk.mjs"}
:::
::::

Vue code with `<script setup>` gets by almost without classes and without `this`. You still meet both, in error classes of your own in step 7, in libraries and in older Vue code written with the Options API. A class describes which data an object holds and what it can do with it. In the counter helper, this turns a reservation into an object that works out its own days.

:::goals
After this step you can

- write a class with a constructor and methods and create objects from it with `new`,
- use getters, setters and `toString`,
- make fields private with `#` and write static methods,
- explain what `this` depends on and pass a method on with `bind` or an arrow function.
:::

## Classes and objects

A class is a blueprint for objects. The constructor sets up the fields of a new object, and methods describe what it can do. `new` creates an object from the blueprint.

::code{file="examples/js/classes/{lang}/item.mjs"}

`new Item(...)` calls the constructor, and inside it `this` points to the new object. So `this.name = name` creates a field on the tent. The function `isIn` from step 3 now lives in the class as a method. It no longer needs a parameter, because it knows its thing through `this`. When a call leaves out the fourth argument, the default value sets `availableFrom` to `null`.

`fromLine` is a static method. It belongs to the class itself rather than to a single thing, so you call it through the class name, `Item.fromLine(...)`. Static methods typically create objects from other data, here from a line of text. You already know two of them, `Object.keys` from step 4 and `Math.max` from step 5. `instanceof` checks whether an object was built from a class, and `typeof Item` gives `function`, because in JavaScript a class is a special kind of function.

## Getters and toString

A reservation records who borrows which thing from when to when. It doesn't need to store how many days that is, since it can work that out from the two dates. The figure shows the class `Reservation` and the two objects the counter helper creates from it.

![One class, two objects. On the left the class Reservation as a blueprint with the constructor, the getter days and the method toString. Two arrows marked new lead to two objects. R-1 holds the projector for M-117 from 2026-11-07 to 2026-11-11, R-2 the beer bench set for M-117 from 2026-11-07 to 2026-11-14. The getter days gives 4 days for R-1 and 7 days for R-2. The values belong to each object, while the methods and the getter exist only once, in the class.](../../../../assets/figures/en/j6-class-and-objects.svg)

Here is the class in the counter helper.

::code{file="examples/js/classes/{lang}/desk.mjs"}

For every new reservation, the constructor takes a number from `nextNumber`, the closure from step 3, and stores the thing, the member number and both dates. Pickup and return sit in the object as ISO dates such as `'2026-11-07'`. That way `loanDays` can count with them, and they can be compared as strings, which step 7 relies on.

`days` is a getter. From outside you read it like a field, `reservation.days`, without parentheses. Behind it is a function that recomputes the value from `from` and `to` on every read. If the return date changes, the days are right straight away.

`toString` decides what a reservation looks like as text. JavaScript calls the method on its own whenever an object has to become a string, for example in the template literal `${reservation}`. `console.log(reservation)`, however, doesn't call it and shows the fields of the object instead.

## Private fields and setters

Any code that holds an object can change fields such as `number` or `member`. If a rule must always hold, you protect the field. A note on a reservation, for example, has at most 200 characters.

::code{file="examples/js/classes/{lang}/note.mjs"}

`#note` is a private field. Only code inside the class can read and write it. If `reservation.#note` appears outside the class, the program stops with a `SyntaxError` before it even runs. From outside, the way in leads through the getter and the setter `note`. The assignment `reservation.note = ...` calls the setter, which removes the spaces and cuts the text to 200 characters. `'x'.repeat(250)` builds a string of 250 characters to test this, and only 200 of them are stored. `Object.keys` lists only `number` and `member`. The private field stays invisible, and the getter and setter belong to the class, not to the single object.

## The value of this

In a method, `this` points to the object the method was called on. What counts is the call, not the place where the method is written.

::code{file="examples/js/classes/{lang}/this.mjs"}

`desk.lend()` calls the method on `desk`, so `this` is `desk`, and 6 things become 5. `const lend = desk.lend` takes the function out of the object. When `lend()` is called, there is no object in front of it, and `this` is `undefined`, because strict mode always applies in modules and classes. Accessing `this.inStock` then throws a `TypeError`, which `try` and `catch` handle here, as step 7 explains. `bind` creates a new function whose `this` always points to `desk`. The arrow function `later` calls `lend` on `desk` again. Both count correctly, and in the end 3 things are left.

This happens a lot when a method is passed on as a callback, for example to `addEventListener` in step 8 or to `setTimeout`. The function is called later without its object. Arrow functions have no `this` of their own and use the `this` of the code around them. That makes them a good fit for callbacks inside a method, but not for methods of an object, because `this` then doesn't point to the object.

## Exercises

::::exercise[Getting started]
Write a class `Member` with the fields `number` and `since` and a method `toString`. Create the member M-117, who joined in 2024, and print the member with a template literal.

:::solution[Solution]
::code{file="examples/js/classes/{lang}/solution-1.mjs"}

The template literal `${member}` calls `toString`, which is why `M-117, member since 2024` appears. `instanceof` confirms that `member` was built from the blueprint `Member`.
:::
::::

::::exercise[Going further]
Give the class `Reservation` a method `overlaps(other)`. It returns `true` when both reservations are for the same thing and their days overlap. Picking up on the return day of another loan doesn't count as an overlap. Check the projector from November 7 to 11 against a reservation from November 11 to 14 and against one from November 7 to 14.

:::solution[Solution]
::code{file="examples/js/classes/{lang}/solution-2.mjs"}

The output is `false true`. ISO dates can be compared as strings, because year, month and day always have the same number of digits and come in that order. Two loans overlap when each one starts before the other one ends. The strict `<` allows November 11, when the projector comes back and goes straight out again.
:::
::::

::::exercise[Challenge]
M-117 has three reservations, R-1 and R-2 from the counter helper and R-3 from November 11 to 14. Write a static method `Reservation.byDays(a, b)` that lets `toSorted` order the reservations by how long they last, shortest first. Explain why you can pass `Reservation.byDays` to `toSorted` without `bind`, but not `desk.lend` as a callback.

:::solution[Solution]
::code{file="examples/js/classes/{lang}/solution-3.mjs"}

`byDays` reads the days through the getter and returns a negative number when `a` is shorter than `b`, just as `toSorted` expects. The method doesn't use `this`, it gets both reservations as arguments. So it makes no difference that `toSorted` calls it without an object in front. `desk.lend`, on the other hand, needs `this` to find `inStock`.
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A method is passed on as a callback and loses its `this`, as in `button.addEventListener('click', desk.lend)`. | Pass an arrow function, `() => desk.lend()`, or use `bind`. |
| An object's method is written as an arrow function and can't find `this.inStock`. | Write methods in the short form `lend() { ... }`. |
| `Reservation(...)` without `new` throws a `TypeError`. | Always call classes with `new`. |
| `reservation.days()` throws a `TypeError`. | Read a getter without parentheses, `reservation.days`. |
| `console.log(reservation)` shows the fields instead of the line from `toString`. | Put the object into a string, `${reservation}`, or write `String(reservation)`. |
| An AI assistant writes `this.items` or `this.$emit` in `<script setup>`. | There is no `this` in `<script setup>`. That is Options API code, and it doesn't work there. |

## Self-check

::::selfcheck
1. What is the difference between the class `Reservation` and `new Reservation(...)`?
2. Why do you write `reservation.days` without parentheses but `reservation.toString()` with them?
3. Why does `lend()` throw a `TypeError` after `const lend = desk.lend`?

:::solution[Answers]
1. The class is the blueprint. `new` creates an object with values of its own from it, and every further `new` creates another object.
2. `days` is a getter and is read like a field, even though a function stands behind it. `toString` is an ordinary method and needs a call.
3. `lend` is called without an object in front, so in strict mode `this` is `undefined`. `this.inStock` then reads a field of `undefined`.
:::
::::

:::next
In step 7 the counter helper checks a request before it accepts it and declines it with a reason. Continue with [J7 Handling errors](../errors/).
:::
