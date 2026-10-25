---
title: JS-Werkstatt
description: Die Grundlagen von JavaScript, die der Kurs voraussetzt, zum Nachschlagen und Üben, mit Beispielen zum Ausführen und Lösungen.
sidebar:
  label: Übersicht
  order: 0
---

In der JS-Werkstatt steht das JavaScript, das der Kurs voraussetzt, in zehn Einheiten. Jede Einheit erklärt ein Thema kurz, zeigt es an Beispielen aus Lorraine Commons und schliesst mit Aufgaben auf drei Stufen und Lösungen.

Du kannst die Einheiten der Reihe nach durcharbeiten oder nur die, die dir der [Einstiegstest](../start/entry-test/) empfiehlt. Wenn ein Kapitel ein Thema voraussetzt, verweist es auf die passende Einheit.

## Beispiele ausführen

Unter jedem Beispiel steht der Knopf «Ausführen». Das Programm läuft dann direkt im Browser, und seine Ausgabe erscheint unter dem Code. Mit «Bearbeiten» änderst du den Code und führst ihn erneut aus, «Zurücksetzen» stellt das Original wieder her. Sag zuerst voraus, was ein Programm ausgibt, und prüfe es erst dann.

Die Beispiele der Einheit «DOM und Events» sind kleine HTML-Seiten. Sie erscheinen in einem Rahmen unter dem Code, die Ausgabe der Konsole steht darunter.

Alle Beispiele liegen auch im Kursrepo unter `examples/js`, eine Einheit pro Ordner. Dort führst du sie mit Node.js aus.

```bash
cd examples/js/variables/de
node types.mjs
```

## Die Einheiten

| Einheit | Inhalt | Im Kurs gebraucht |
|---|---|---|
| [Variablen, Typen und Operatoren](variables/) | `let` und `const`, primitive Typen, Vergleiche, was als wahr und falsch gilt, `??` | überall |
| [Kontrollstrukturen](control-flow/) | `if` und `else`, der Bedingungsoperator, `switch`, Schleifen mit `for...of` und `while`, `break` und `continue` | überall |
| [Funktionen und Gültigkeitsbereich](functions/) | Funktionen und Pfeilfunktionen, Standardwerte, Gültigkeitsbereich, Closures | ab Teil 1, Composables in Teil 5 |
| [Objekte und Arrays](objects-and-arrays/) | Objekte, Arrays, Verweise, Spread, Destrukturieren, optionale Verkettung | ab Teil 1 |
| [Strings und Template Literals](strings/) | Template Literals, Methoden für Text, Suchen ohne Rücksicht auf Gross- und Kleinschreibung, Sortieren | Suche und Filter ab Teil 3 |
| [Klassen und this](classes/) | Klassen, private Felder, Getter, statische Methoden, `this` und `bind` | eigene Fehlerklassen, Code mit `this` lesen |
| [Fehler behandeln](errors/) | `throw`, `try`, `catch` und `finally`, Fehlertypen, eigene Fehlerklassen | Daten vom Server in Teil 1 und Teil 7 |
| [DOM und Events](dom-and-events/) | Elemente finden und erzeugen, Events, Event-Delegation, Formulare | die SPA von Hand in Teil 2 |
| [JSON und Datenformate](json/) | `JSON.stringify` und `JSON.parse`, Datumswerte, Kopien mit `structuredClone` | Daten vom Server, Speichern im Browser |
| [Zahlen und Daten formatieren](formatting/) | Beträge in Franken, Datum und Uhrzeit, Zeitzonen mit `Intl` | überall, wo die App Beträge und Daten zeigt |

Was über diese Grundlagen hinausgeht, steht in Teil 1, etwa Module, Werte und Referenzen im Detail, `map`, `filter` und `reduce` sowie asynchrones JavaScript mit `fetch`.
