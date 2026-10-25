---
title: Several languages
description: Translating texts and formats with vue-i18n, switching the language at run time and telling the browser the language of the page.
sidebar:
  order: 6
---

The course and the case app exist in German and English, each language as a build of its own. Many apps switch the language at run time instead, without reloading the page. For that, all texts sit in an object split by language, and a function inserts them by key. For Vue there is the library vue-i18n, which also formats numbers and dates by the rules of a language.

## In your project

The [project assignment](../../project/assignment/) names several languages as an example of an extended requirement. They pay off when people with different languages use the app. Plan them early, because afterwards every text in templates and messages has to go through a key. The attribute `lang` on `<html>` has to match the chosen language. Screen readers pick their pronunciation from it, and WCAG requires it in criterion 3.1.1.

## A small example

The example under `optional/i18n/en` shows four things of the catalog in German or English. `createI18n` gets the texts and formats per language. `legacy: false` switches on the interface for the Composition API, without that option version 11 still works with the old one. A text with a plural separates its forms with `|`, from none through one to many, and vue-i18n fills in `{count}` by itself.

::code{file="optional/i18n/{lang}/src/i18n.js"}

In the component, `useI18n` returns the functions `t` for texts, `n` for numbers and `d` for dates. `locale` is a ref. The select changes it with `v-model`, and a `watchEffect` updates `lang` on `<html>`. The names of the languages in the select are written in their own language and therefore carry a `lang` of their own, as criterion 3.1.2 asks.

::code{file="optional/i18n/{lang}/src/App.vue"}

The names of the things come from the data and stay the same when the language changes. An API delivers them per language, like the course API does under `/api/de/items` and `/api/en/items` in the case app. Never compare formatted numbers with fixed strings in tests. `Intl` puts a no-break space between currency and amount, and the thousands separator of `de-CH` looks different depending on the locale data of the browser.

## Official links

- [vue-i18n, Composition API](https://vue-i18n.intlify.dev/guide/advanced/composition.html)
- [vue-i18n, pluralization](https://vue-i18n.intlify.dev/guide/essentials/pluralization.html)
- [MDN, the attribute lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang)
- [WCAG 2.2, Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html)
