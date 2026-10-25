---
title: TypeScript mit Vue
description: Props, Events und Daten mit Typen beschreiben, mit vue-tsc prüfen und die passende Version von TypeScript wählen.
sidebar:
  order: 1
---

TypeScript erweitert JavaScript um Typen. Du schreibst dazu, welche Form ein Wert hat, und ein Werkzeug prüft vor dem Start, ob der Code dazu passt. Der Kurs verwendet JavaScript, create-vue fragt aber beim Anlegen eines Projekts, ob du TypeScript willst. In einem Projekt mit TypeScript steht in jeder Single File Component `<script setup lang="ts">`.

## In deinem Projekt

Laut [Projektauftrag](../../project/assignment/) bringt durchgehend TypeScript einen Bonuspunkt. Es lohnt sich, sobald dein Projekt mehr als eine Handvoll Komponenten hat oder Daten von einer API bekommt. Der Editor zeigt dir dann schon beim Tippen, wenn eine Prop fehlt, ein Event die falschen Daten mitgibt oder ein Feld der API anders heisst. Plane etwas mehr Zeit ein, denn die Typen beschreibst du einmal selbst. Vite übersetzt TypeScript nur und prüft keine Typen, das macht erst vue-tsc.

## Ein kleines Beispiel

Das Beispiel unter `optional/typescript/de` ist ein vereinfachter Katalog in TypeScript, mit Karten, Suche und Favoriten wie in den Teilen 3 bis 5. Ein Interface beschreibt ein Ding so, wie die Kurs-API es liefert.

::code{file="optional/typescript/{lang}/src/types.ts"}

Die Karte legt ihre Props und ihr Event mit Typen fest statt mit Objekten wie `{ type: Boolean }`. `favorite = false` beim Zerlegen der Props gibt den Standardwert. `defineEmits` beschreibt das Event als Liste der Werte, die es mitgibt.

::code{file="optional/typescript/{lang}/src/components/ItemCard.vue" lines="1-13"}

In `App.vue` braucht `ref` einen Typ nur dort, wo er sich nicht aus dem Anfangswert ergibt. Ein leeres Array hätte sonst den Typ `never[]`, und kein Wert dürfte hinein.

::code{file="optional/typescript/{lang}/src/App.vue" lines="1-18"}

`npm run type-check` startet vue-tsc. Gibt das Template der Karte als `favorite` einen Text statt eines Wahrheitswerts mit, meldet vue-tsc den Fehler mit Zeile und Spalte.

```text
src/App.vue(28,33): error TS2322: Type 'string' is not assignable to type 'boolean | undefined'.
```

`npm run build` prüft die Typen zuerst und baut erst danach. Achte auf die Version von TypeScript. TypeScript 7 ist eine neue Umsetzung in Go, mit der vue-tsc nicht läuft, und das Team von TypeScript rät Projekten mit Vue, vorerst bei Version 6 zu bleiben. Das Beispiel verwendet deshalb 6.0.3. Installierst du TypeScript ohne Angabe der Version, bekommst du Version 7, und vue-tsc bricht ab.

## Offizielle Links

- [Vue-Dokumentation, TypeScript](https://vuejs.org/guide/typescript/overview.html)
- [Vue-Dokumentation, TypeScript mit der Composition API](https://vuejs.org/guide/typescript/composition-api.html)
- [TypeScript-Handbuch](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Ankündigung von TypeScript 7](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
