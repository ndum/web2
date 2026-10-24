---
title: Classes and this
description: Classes with constructor, methods, getters and private fields, static methods and what this depends on in methods and arrow functions.
sidebar:
  order: 6
---

Vue code with `<script setup>` gets by almost without classes and without `this`. You still meet both, in error classes of your own, in libraries and in older Vue code with the Options API, which AI assistants like to suggest. This unit shows how classes are built and what `this` depends on.

:::goals
After this unit you can

- write a class with a constructor, methods and getters,
- make fields private with `#`,
- use static methods,
- explain what the value of `this` depends on and avoid the common mistakes with it.
:::

## Classes

A class is a blueprint for objects. The constructor sets up the fields of a new object, and methods describe what the object can do. `new` creates an object from the blueprint.

::code{file="examples/js/classes/{lang}/reservation.mjs"}

`#id` is a private field. Only code inside the class can read it, so from outside `reservation.id` is `undefined`. `days` is a getter. From outside it looks like a field, but it computes its value anew on every access. `86_400_000` is the number of milliseconds in a day, and the underscores only make the number easier to read. Because the first and the last day both count, one is added.

## Static methods

A static method belongs to the class itself, not to a single object. You call it through the class name, for example `Item.fromLine('Ladder;20')`. Typical static methods create a new object from other data. You find an example in the "Going further" exercise.

## The value of this

In a method, `this` points to the object the method was called on. It depends on the call, not on the place where the method is written.

::code{file="examples/js/classes/{lang}/this.mjs"}

`counter.increase()` calls the method on `counter`, so `this` is `counter`. `const increase = counter.increase` takes the function out of the object. When `increase()` is called, there is no object in front of it, and `this` is `undefined`, because strict mode always applies in modules and classes. Accessing `this.count` then throws a `TypeError`. `bind` creates a new function whose `this` always points to `counter`, which is why `bound()` counts correctly again.

This happens often when a method is passed on as a callback, for example to `addEventListener` or `setTimeout`. The function is called later without its object.

## Arrow functions and this

Arrow functions have no `this` of their own. They use the `this` of the surroundings in which they are written. That's handy for callbacks inside a method, because there they keep the method's `this`. As methods of an object, however, they don't work, because `this` then doesn't point to the object.

## Common mistakes

| Mistake | What helps |
|---|---|
| A method is passed as a callback and loses its `this`, as in `button.addEventListener('click', counter.increase)`. | Pass an arrow function, `() => counter.increase()`, or use `bind`. |
| An object's method is written as an arrow function and can't find `this.count`. | Write methods in the short form `increase() { ... }`. |
| An object is created without `new`, and `Reservation(...)` throws a `TypeError`. | Always call classes with `new`. |
| A private field is read from outside and is `undefined`. | Offer a getter if the value should be readable from outside. |
| An AI assistant writes `this.items` or `this.$emit` in `<script setup>`. | There is no `this` in `<script setup>`. That is Options API code, and it doesn't work there. |

## Exercises

::::exercise[Getting started]
Give the class `Reservation` a method `overlaps(other)` that checks whether two reservations overlap. They do if both are for the same thing and each one starts no later than the day the other one ends. Check a tent from November 2 to 4 against one from November 4 to 6 and against one from November 5 to 6.

:::solution[Solution]
::code{file="examples/js/classes/{lang}/solution-1.mjs"}

The output is `true false`. On November 4 the tent would be booked twice, so the first two overlap. Dates can be compared directly with `<=`, and JavaScript compares their milliseconds.
:::
::::

::::exercise[Going further]
Write a class `Item` with the fields `name` and `deposit` and a static method `fromLine(line)`. It creates an `Item` from a line such as `'Ladder;20'`, with the deposit as a number.

:::solution[Solution]
::code{file="examples/js/classes/{lang}/solution-2.mjs"}

The output is `true Ladder 21`. `fromLine` calls `new Item(...)` and returns the new object. `instanceof` confirms that it is an `Item`, and `deposit + 1` gives 21 because `Number` turned the text into a number.
:::
::::

::::exercise[Challenge]
The object `shop` has a method `greetLater` that returns a function. Later, this function should return "Welcome to Lorraine Commons" and read the name from `this.name`. Write the method and explain why the returned function has to be an arrow function.

:::solution[Solution]
::code{file="examples/js/classes/{lang}/solution-3.mjs"}

`shop.greetLater()` calls the method on `shop`, so inside it `this` is `shop`. The arrow function has no `this` of its own and uses the method's, even when it is called on its own later. A function written with `function () { ... }` would have its own `this`, and for the call `greet()` that would be `undefined`.
:::
::::
