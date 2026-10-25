---
title: Testing
description: Kinds of tests, functions with Vitest, components with Vue Test Utils, stores and composables with a replaced fetch, the whole app in a test, tests that pay off and mutants that check the tests themselves.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler reports an old bug. After a change to the rules, the app accepts requests whose first day has already passed again.

> As a board member, I want a fixed bug to stay fixed, so that members and the team can rely on the rules of the app.

The volunteer finds no test in the app that checks a day in the past. The acceptance criteria are:

1. The rules of a request have tests that notice every bug that has occurred before.
2. Components have tests that check what someone sees and what they report.
3. Stores have tests that set the answer of the API, without a server.
:::

:::goals
After this chapter you can

- tell kinds of tests and their purpose apart,
- test functions with Vitest,
- test components through their behavior with Vue Test Utils,
- test stores and composables while replacing `fetch`,
- decide what's worth testing and check your tests with mutants.
:::

## Kinds of tests

The [Vue documentation](https://vuejs.org/guide/scaling-up/testing.html) distinguishes three kinds. Unit tests check a function, a composable or a store on its own, and it recommends Vitest for them. Component tests mount a component and check what it renders and reports, with Vitest and Vue Test Utils. End-to-end tests drive the whole app in a real browser, and for those it names Playwright and Cypress. All the exercise projects of this course have tests of the first two kinds, which you have been starting with `npm test` since part 3.

## Testing a function

A test calls a function with known values and compares its result with `expect`. `describe` groups tests, and `it` describes one test in a sentence. In the running case app, the rules of a request now have a test for the bug that came back.

::code{file="case/08-architecture/{lang}/tests/reservation.test.js" lines="17-33"}

The day is an argument in the test, so the test gives the same result tomorrow as today. The second test checks ten days, and it doesn't notice a wrong limit of eight or nine days. That's why a test checks a limit on both sides, just allowed and just not allowed anymore.

## Testing a component

Vue Test Utils mounts a component with `mount`, finds elements with `find`, fills in fields with `setValue` and fires events with `trigger`. Both return a promise, and only after `await` is the new state in the DOM. What a component has reported is in `emitted`.

::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-2.test.js" lines="6-25"}

According to the Vue documentation, a component test checks the public interface, meaning props, slots and events, and what ends up in the DOM afterwards. It doesn't check internal variables, otherwise it breaks with every refactoring, even when the component still does what it should. A snapshot of the HTML alone doesn't tell whether the component works correctly either, according to the documentation.

## Testing a store and replacing fetch

A store needs a fresh Pinia for every test, as in chapter 7.2. The test replaces `fetch` with `vi.stubGlobal` by a function from `vi.fn`, which delivers a prepared answer and records every call. That way it checks the address, the method, the headers and the body, without any server running.

::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-3.test.js" lines="1-27"}

`vi.unstubAllGlobals` restores the real `fetch` after every test, otherwise the stand-in leaks into the next test.

## Testing composables

A composable that only uses `ref`, `computed` and `watch` can be called directly from a test, which then checks the refs it returns, like the tests for chapter 5.4. If it uses hooks like `onMounted` or `inject`, it needs a host component, according to the Vue documentation. The documentation shows a small function for this that creates and mounts an app just for the composable.

## The app in a test

The tests of the running case app mount the whole app with the router, Pinia and the API, and only replace `fetch` with a stand-in for the course API in `tests/fake-api.js`. A helper goes to an address, as if someone had typed it into the browser.

::code{file="case/08-architecture/{lang}/tests/visit.js" lines="14-38"}

Tests like these check how pages, stores and the router work together, and they still need no browser. They run in happy-dom, a stand-in for the browser in Node that draws nothing. Whether a button sits visibly on top of another one is something only an end-to-end test can check.

## Tests that pay off

Tests pay off most for rules with limits, for error states, for what members see and for every bug that has occurred before. Such a test is best written before the fix. It fails first, and after the fix it passes. Tests that check Vue itself or a library bring little, and so do tests that pin down every internal line.

## Checking tests with mutants

Coverage shows which lines a test ran. Vitest measures it with the package `@vitest/coverage-v8` and `vitest run --coverage`, according to the [Vitest documentation](https://vitest.dev/guide/coverage.html). Whether a test would notice a mistake in those lines is something coverage doesn't show. A mutation test checks exactly that. It builds small mistakes into the code, so-called mutants, and checks whether the tests fail afterwards. A mutant that passes all the tests shows a gap. Tools like [StrykerJS](https://stryker-mutator.io/) do this for whole projects. The exercise project of this chapter comes with a small version of it.

## In your project

The minimum scope asks for three automated tests, six for a pair. Choose them so that they check something important, such as a rule of your app, a component with behavior and a store with a replaced `fetch`. Write a test whenever you fix a bug. The screencast asks about the bug that kept you busy the longest, and a test for it shows that you understood it.

## In code

Work with the running case app in the folder `case/08-architecture/en` of the course repo and with the exercise project of this chapter. Write down what you expect before you run anything.

1. Set the limit `MAX_DAYS` in `src/features/reservations/rules.js` to `9` and run the tests. Does any test notice the mistake? Why not?
2. In the second component test of the solution, remove the `await` before `trigger('submit')`. What happens, and why?
3. Run `npm test` in the exercise project before you write any tests. What does the check report?
4. A test only compares `wrapper.html()` with a stored snapshot. Which mistakes does it find, and which doesn't it?

## Exercises

In this project you write the tests yourself. You'll find it in the folder `exercises/08-architecture/testing/en` of the course repo, with the rules of a request in `src/rules.js`, a form and a store. `npm test` first runs your tests against the correct code, where they have to pass. Then the tests of each level run against mutants, and `npm test` reports how many mistakes your tests find. With `npm run test:watch` only your tests run, again after every change.

```bash
npm install
npm test
```

::::exercise[Getting started]
Write tests for `validateRequest` in `tests/level-1.test.js`. A request over seven days is valid, one over eight days isn't, a first day in the past isn't either, and neither is a last day before the first. Choose today's date in the test yourself. Your tests find all three mutants of this level.

:::solution[Solution]
::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-1.test.js"}
:::
::::

::::exercise[Going further]
Write tests for `RequestForm.vue` in `tests/level-2.test.js`. The form reports a valid request as the event `send`, it doesn't send a request with mistakes, and messages only appear after the first attempt to send. Your tests find all three mutants of this level.

:::solution[Solution]
::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-2.test.js"}
:::
::::

::::exercise[Challenge]
Write tests for the store `useRequestsStore` in `tests/level-3.test.js`, with a fresh Pinia and a replaced `fetch`. Check the address, method, header and body of the request, an accepted request in the list and a refusal of the API with its message. Your tests find all three mutants of this level.

:::solution[Solution]
::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-3.test.js"}
:::
::::

## Common mistakes

| Mistake | What helps |
|---|---|
| A test always passes, even when the code is wrong. | Run the test once against code that's wrong on purpose, it has to fail. |
| A component test checks internal variables and breaks with every refactoring. | Check what the component shows and reports. |
| After `setValue` or `trigger`, the test still sees the old state. | Put `await` in front, and call `flushPromises` after requests. |
| A test calls the real server and fails when it isn't running. | Replace `fetch` with `vi.stubGlobal` and restore it with `vi.unstubAllGlobals` after the test. |
| Tests affect each other through a store. | Create a fresh Pinia before every test with `setActivePinia(createPinia())`. |
| An AI assistant writes tests that only mirror what the code currently does. | Derive the expectations from the requirements and run every test once against a mistake. |

## Self-check

::::selfcheck
1. Which kinds of tests does the Vue documentation distinguish, and what do you write them with?
2. What does a component test check, and what doesn't it?
3. How does a test check a store that calls `fetch`, without a server?
4. What does a mutant show that coverage doesn't?

:::solution[Answers]
1. Unit tests and component tests with Vitest and Vue Test Utils, end-to-end tests with Playwright or Cypress.
2. What the component renders and reports after props, slots and input. It doesn't check internal variables.
3. With a fresh Pinia and a `fetch` that `vi.stubGlobal` replaces with a stand-in that delivers a prepared answer.
4. Whether a test also notices a mistake in a line that ran.
:::
::::

:::assignment
The bug with the day in the past now has a test that notices it. A little later, a member who works with a screen reader writes to the association. The number of hits in the catalog stays silent, all the "Favorite" buttons sound the same, and after the back button the focus lands in the search field instead of on the thing. The next chapter takes care of accessibility.
:::
