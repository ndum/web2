---
title: End-to-end tests with Playwright
description: Checking the important flows of the app in a real browser, with locators by role, a server that Playwright starts itself and a run in CI.
sidebar:
  order: 8
---

The tests of the chapter [Testing](../../architecture/testing/) run in happy-dom, a stand-in for the browser in Node. End-to-end tests drive a real browser instead. They click and type like a person and check what appears on the page. Playwright from Microsoft drives Chromium, Firefox and WebKit for this.

## In your project

According to the [project assignment](../../project/assignment/), end-to-end tests earn one bonus point. They are slower and break more easily than tests with Vitest, so write only a few, for the flows that must never break, such as searching, signing in and sending a request. According to the Vue documentation, they catch problems in the router, the state and the requests that tests of single components miss. Keep testing components with Vitest.

## A small example

The example under `optional/end-to-end/en` checks the demo of the case app after part 8, which runs without an API. In the configuration, `webServer` starts the demo in the folder of the case app and waits until it answers. Locally Playwright reuses a server that is already running, on CI it always starts its own.

::code{file="optional/end-to-end/{lang}/playwright.config.js"}

The tests find elements the way a screen reader knows them, by their role and their name. Playwright waits before every action until the element is ready, and `expect` repeats its check for up to five seconds. That is why the test does not wait for the search to finish by itself. Every test gets a fresh browser context, without favorites or a sign-in from other tests.

::code{file="optional/end-to-end/{lang}/tests/catalog.spec.js"}

The links and buttons in the cards carry the name of the thing as hidden text after a colon. Chromium puts a space before that colon, because the hidden text is positioned absolutely. A test that compares the whole name exactly therefore does not find the button. The example looks for the card by its heading first and then for the button inside it.

`npx playwright install chromium` installs the browser, and `npm run test:e2e` starts the tests. In the workflow of the course repo, GitHub Actions installs only Chromium and runs the tests after the build in both languages.

## Official links

- [Playwright, installation](https://playwright.dev/docs/intro)
- [Playwright, locators](https://playwright.dev/docs/locators)
- [Playwright, web server](https://playwright.dev/docs/test-webserver)
- [Playwright, continuous integration](https://playwright.dev/docs/ci)
- [Vue documentation, testing](https://vuejs.org/guide/scaling-up/testing.html)
