---
title: End-to-End-Tests mit Playwright
description: Wichtige Abläufe der App in einem echten Browser prüfen, mit Locatoren nach Rolle, einem Server, den Playwright selbst startet, und einem Lauf in CI.
sidebar:
  order: 8
---

Die Tests aus dem Kapitel [Testen](../../architecture/testing/) laufen in happy-dom, einer Nachbildung des Browsers in Node. End-to-End-Tests steuern dagegen einen echten Browser. Sie klicken und tippen wie ein Mensch und prüfen, was auf der Seite erscheint. Playwright von Microsoft steuert dafür Chromium, Firefox und WebKit.

## In deinem Projekt

Laut [Projektauftrag](../../project/assignment/) bringen End-to-End-Tests einen Bonuspunkt. Sie sind langsamer und brechen leichter als Tests mit Vitest, schreib deshalb nur wenige, für die Abläufe, die nie kaputtgehen dürfen, etwa Suchen, Anmelden und Anfragen. Laut der Vue-Dokumentation finden sie Fehler im Router, im Zustand und bei Anfragen, die Tests einzelner Komponenten übersehen. Komponenten testest du weiterhin mit Vitest.

## Ein kleines Beispiel

Das Beispiel unter `optional/end-to-end/de` prüft die Demo der Fallbeispiel-App nach Teil 8, die ohne API läuft. In der Konfiguration startet `webServer` die Demo im Ordner der Fallbeispiel-App und wartet, bis sie antwortet. Lokal verwendet Playwright einen Server, der schon läuft, in CI startet es immer einen eigenen.

::code{file="optional/end-to-end/{lang}/playwright.config.js"}

Die Tests finden Elemente so, wie ein Screenreader sie kennt, über ihre Rolle und ihren Namen. Playwright wartet bei jeder Aktion, bis das Element bereit ist, und `expect` wiederholt seine Prüfung bis zu fünf Sekunden lang. Deshalb wartet der Test nicht selbst auf das Ende der Suche. Jeder Test bekommt einen frischen Kontext des Browsers, ohne Favoriten und Anmeldung aus anderen Tests.

::code{file="optional/end-to-end/{lang}/tests/catalog.spec.js"}

Die Links und Knöpfe in den Karten tragen nach einem Doppelpunkt den Namen des Dings als versteckten Text. Chromium setzt vor diesen Doppelpunkt ein Leerzeichen, weil der versteckte Text absolut positioniert ist. Ein Test, der den ganzen Namen genau vergleicht, findet den Knopf deshalb nicht. Das Beispiel sucht zuerst die Karte über ihre Überschrift und darin den Knopf.

Mit `npx playwright install chromium` installierst du den Browser, `npm run test:e2e` startet die Tests. Im Workflow des Kursrepos installiert GitHub Actions nur Chromium und führt die Tests nach dem Build in beiden Sprachen aus.

## Offizielle Links

- [Playwright, Installation](https://playwright.dev/docs/intro)
- [Playwright, Locators](https://playwright.dev/docs/locators)
- [Playwright, Web Server](https://playwright.dev/docs/test-webserver)
- [Playwright, Continuous Integration](https://playwright.dev/docs/ci)
- [Vue-Dokumentation, Testing](https://vuejs.org/guide/scaling-up/testing.html)
