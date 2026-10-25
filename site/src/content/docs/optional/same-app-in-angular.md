---
title: Dieselbe App in Angular
description: Der Katalog als Angular-Komponenten mit Signals, Inputs und Outputs, geprüft vom Angular-Compiler ohne die CLI.
sidebar:
  order: 11
---

Angular ist ein vollständiges Framework von Google mit Router, Formularen, einem Client für HTTP und einem Werkzeug für die Kommandozeile, wie das Kapitel [Frameworks im Vergleich](../../vue/frameworks/) beschreibt. Komponenten sind Klassen mit dem Decorator `@Component` und einem Template, und Angular arbeitet durchgehend mit TypeScript. Diese Seite zeigt den Katalog mit Suche und Favoriten als zwei Komponenten in Angular.

## In deinem Projekt

Auch Angular darfst du laut [Projektauftrag](../../project/assignment/) im Projekt verwenden. Es lohnt sich, wenn du es im Beruf brauchst oder ein grösseres Projekt mit festen Regeln bauen willst. Ein neues Projekt legst du nach `npm install -g @angular/cli` mit `ng new` an. Seit Version 22 erscheint einmal im Jahr eine neue Hauptversion, die in der Regel 24 Monate lang unterstützt wird. Prüf vor dem Start, welche Versionen von Node und TypeScript sie verlangt, Angular 22 braucht TypeScript 6.0. Die Tabelle im Abschnitt [Übertragbarkeit](../../vue/frameworks/#übertragbarkeit) ordnet die Begriffe von Vue und Angular einander zu.

## Ein kleines Beispiel

Das Beispiel unter `optional/angular/de` braucht die CLI nicht. `npm run build` übersetzt die Komponenten mit dem Angular-Compiler `ngc`, der dabei auch die Templates mit den Typen prüft. Im Browser siehst du sie, wenn du die Dateien aus `src/app` in ein Projekt der CLI übernimmst.

Signals halten den Zustand, ähnlich wie `ref` in Vue. `signal('')` erzeugt einen Wert, den das Template mit `query()` liest und der Code mit `set` oder `update` ändert. `computed` leitet die Treffer davon ab. `@for` braucht mit `track` einen Schlüssel, und `@empty` zeigt einen Text, wenn die Liste leer ist.

::code{file="optional/angular/{lang}/src/app/catalog.ts"}

Die Karte bekommt ihre Daten über `input.required()` und `input()`, und `output()` meldet den Klick, so wie `defineProps` und `defineEmits` in Vue. Seit Version 19 sind Komponenten standalone, die Karte steht deshalb im Array `imports` des Katalogs.

::code{file="optional/angular/{lang}/src/app/item-card.ts"}

Der Compiler findet Fehler in den Templates. Fehlt beim Einsetzen der Karte das Input `item`, meldet ngc den Fehler NG8008, fehlt bei `@for` das `track`, den Fehler NG5002. Steht ein Signal im Template ohne Klammern, ist das ein Fehler bei den Typen, denn erst der Aufruf liefert den Wert.

## Offizielle Links

- [Angular, Installation](https://angular.dev/installation)
- [Angular, Tutorial im Browser](https://angular.dev/tutorials/learn-angular)
- [Angular, Signals](https://angular.dev/guide/signals)
- [Angular, Versionen und Unterstützung](https://angular.dev/reference/releases)
