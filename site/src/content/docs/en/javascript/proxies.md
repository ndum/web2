---
title: Proxies and getters
description: A deep dive into getters, setters and Proxy and a small reactive system that shows how Vue notices that data change.
sidebar:
  order: 5
  badge:
    text: Deep dive
---

This chapter is a deep dive. You don't need it for the exam, and Vue works without you having read it. But it shows how Vue notices that data have changed, and why some bugs with Vue look the way they do. Part 5 comes back to it.

:::goals
After this chapter you can

- write getters and setters and explain when their code runs,
- intercept reading and writing an object with a `Proxy`,
- explain how a reactive system notices changes with `track` and `trigger`,
- describe how the example differs from Vue.
:::

## Getters and setters

A getter looks like a field from outside but is a function that runs on every read. A setter runs on every write. You know both from the classes in the unit [Classes and this](../../js/classes/), and in objects they work the same way.

::code{file="examples/01-javascript/proxies/{lang}/getter.mjs"}

`days` computes anew on every read, so the value is right even after the end of the reservation has changed. The setter of `deposit` checks every new value before it stores it. Getters and setters show the principle that reactivity rests on. Reading and writing a field can trigger code. But they have a limit. Getters and setters only work for fields that are known when the code is written.

## Proxy

A `Proxy` wraps a whole object. Every access goes first to functions that you define, the so-called traps. `get` runs when a field is read, `set` when it is written, even for fields that don't exist yet.

::code{file="examples/01-javascript/proxies/{lang}/proxy.mjs"}

The proxy reports every access and then passes it on to the actual object. That's why the new date ends up in `item` as well. A `set` has to return `true`, otherwise the write counts as failed, and in a module JavaScript then reports a `TypeError`.

## A small reactive system

With a proxy, you can tell which code reads which fields. If one of these fields changes later, you can run exactly this code again. That is the core of Vue's reactivity.

::code{file="examples/01-javascript/proxies/{lang}/reactive.mjs"}

`watchEffect` remembers the function as the active effect and runs it once. While it runs, it reads `counts.available` and `counts.total`, and the `get` trap notes for both fields that this effect needs them. Vue calls this step `track`. When someone later writes one of the fields, the `set` trap runs all noted effects again. Vue calls this step `trigger`. That's how a new line appears after every change without anyone calling the output by hand.

## The difference from Vue

The example shows the idea, and Vue implements it more thoroughly.

1. Vue notes the effects per object and per field, in a `WeakMap` with the objects as keys. The example notes them per field only, so two objects with the same fields get in each other's way, as the challenge shows.
2. `reactive()` returns a proxy as in the example. For single values such as a number there is `ref()`. Since a number can't be wrapped in a proxy, Vue puts it into an object with a getter and setter for `value`.
3. Vue doesn't run effects right after every change. It collects them and updates the interface once, before the browser redraws the page.
4. Vue makes nested objects reactive only when someone reads them.

This explains a bug that part 5 shows in more detail. If you take a reactive object apart into single variables with destructuring, you read the values from the proxy once. The variables then hold ordinary values, and no effect is triggered anymore when the object changes.

## Exercises

The exercises of this deep dive run right in the browser. You can start their solutions with "Run" and change them with "Edit".

::::exercise[Getting started]
A basket has a list `items` with things and their deposit. Give it a getter `total` that returns the sum of the deposits. Check that `total` is right after another thing has been added.

:::solution[Solution]
::code{file="examples/01-javascript/proxies/{lang}/solution-1.mjs"}

The getter computes anew with `reduce` on every read, so the sum is right after `push` without any further steps. A field `total` that you compute once when creating the basket would be outdated afterwards.
:::
::::

::::exercise[Going further]
Write a function `checked(item)` that wraps a thing in a proxy. The proxy allows only deposits between 10 and 80 francs and reports a `RangeError` otherwise. All other fields can be changed freely.

:::solution[Solution]
::code{file="examples/01-javascript/proxies/{lang}/solution-2.mjs"}

The `set` trap checks only the field `deposit` and lets all others through. Unlike a setter, the proxy acts on the whole object, so the check also applies when the field didn't exist yet when the thing was created.
:::
::::

::::exercise[Challenge]
In the reactive system of the example, two objects get in each other's way. When the field `available` of a tent changes, the effect of a drill runs too, even though it reads only the drill. Rebuild the system so that it notes the effects per object and per field, as Vue does.

:::solution[Solution]
::code{file="examples/01-javascript/proxies/{lang}/solution-3.mjs"}

A `WeakMap` gives every object a `Map` of its own from fields to effects. The change to the tent finds no effect in the tent's map, and the output shows only the two lines of the drill. A `WeakMap` doesn't hold on to its keys. When nobody needs an object anymore, JavaScript may clear it from memory together with its entries. Vue uses the same structure.
:::
::::

## Self-check

::::selfcheck
1. When does the code of a getter run?
2. What can a proxy do that a setter can't?
3. What does a reactive system note when a field is read, and what does it do when a field is written?
4. Why does a variable taken from a destructured reactive object lose its reactivity?

:::solution[Answers]
1. Every time the field is read.
2. A proxy intercepts access to all fields of an object, including fields that are added later. A setter applies only to the one field it was written for.
3. When a field is read, it notes which effect needs which field. When a field is written, it runs the effects that need the changed field.
4. Destructuring reads the value from the proxy once. The variable then holds an ordinary value, and access to it no longer goes through the proxy.
:::
::::
