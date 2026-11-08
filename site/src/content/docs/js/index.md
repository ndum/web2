---
title: JS-Werkstatt
description: Die Grundlagen von JavaScript, die der Kurs voraussetzt, in zehn Schritten am Tresen-Helfer, mit Beispielen zum Ausführen und Lösungen.
sidebar:
  label: Übersicht
  order: 0
---

Die JS-Werkstatt frischt das JavaScript auf, das der Kurs voraussetzt. In zehn Schritten baust du dabei ein kleines Programm für den Tresen von Lorraine Commons, den Tresen-Helfer. Er beginnt mit einem einzigen Ding in ein paar Variablen und zeigt am Schluss die neun Dinge vom Tresen auf einer Seite, mit Pfand, Rückgabedatum und Reservation.

Du kannst die Schritte der Reihe nach durcharbeiten oder nur die, die dir der [Einstiegstest](../start/entry-test/) empfiehlt. Jeder Schritt zeigt oben, was der Tresen-Helfer schon kann, und den Code bis dahin, so kannst du auch mitten drin einsteigen. Wenn ein Kapitel ein Thema voraussetzt, verweist es auf den passenden Schritt.

## Beispiele ausführen

Unter jedem Beispiel steht der Knopf «Ausführen». Das Programm läuft dann direkt im Browser, und seine Ausgabe erscheint unter dem Code. Mit «Bearbeiten» änderst du den Code und führst ihn erneut aus, «Zurücksetzen» stellt das Original wieder her. Sag zuerst voraus, was ein Programm ausgibt, und prüfe es erst dann.

Die Beispiele des Schritts «DOM und Events» sind kleine HTML-Seiten. Sie erscheinen in einem Rahmen unter dem Code, die Ausgabe der Konsole steht darunter.

Alle Beispiele liegen auch im Kursrepo unter `examples/js`, ein Schritt pro Ordner. Dort führst du sie mit Node.js aus, den Tresen-Helfer eines Schritts mit `desk.mjs`.

```bash
cd examples/js/objects-and-arrays/de
node desk.mjs
```

## Die zehn Schritte

Jeder Schritt bringt dem Tresen-Helfer etwas Neues bei und übt dabei ein Thema von JavaScript. Die Beispiele verwenden die Dinge 1 bis 9 des Katalogs mit den Feldern, die der Kurs ab Teil 1 braucht, etwa `deposit` und `availableFrom`.

| Schritt | Der Tresen-Helfer lernt | Inhalt | Im Kurs gebraucht |
|---|---|---|---|
| [J1 Variablen, Typen und Operatoren](variables/) | ein Ding in Variablen, Text aus dem Formular als Zahl | `let` und `const`, primitive Typen, Vergleiche, was als wahr und falsch gilt, `??` | überall |
| [J2 Kontrollstrukturen](control-flow/) | da oder ausgeliehen, offen am Mittwoch und Samstag | `if` und `else`, der Bedingungsoperator, `switch`, Schleifen, `break` und `continue` | überall |
| [J3 Funktionen und Gültigkeitsbereich](functions/) | `isIn` und `loanDays`, Nummern für Reservationen | Funktionen und Pfeilfunktionen, Standardwerte, Gültigkeitsbereich, Closures | ab Teil 1, Composables in Teil 5 |
| [J4 Objekte und Arrays](objects-and-arrays/) | die neun Dinge als Objekte in einem Array | Objekte, Arrays, Verweise, Spread, Destrukturieren, optionale Verkettung | ab Teil 1 |
| [J5 Strings und Template Literals](strings/) | eine Zeile pro Ding, Suche nach Namen | Template Literals, Methoden für Text, Suchen ohne Rücksicht auf Gross- und Kleinschreibung, Sortieren | Suche und Filter ab Teil 3 |
| [J6 Klassen und this](classes/) | eine Reservation mit Mitgliedernummer und Tagen | Klassen, private Felder, Getter, statische Methoden, `this` und `bind` | eigene Fehlerklassen, Code mit `this` lesen |
| [J7 Fehler behandeln](errors/) | eine Anfrage prüfen und mit einem Grund ablehnen | `throw`, `try`, `catch` und `finally`, Fehlertypen, eigene Fehlerklassen | Daten vom Server in Teil 1 und Teil 7 |
| [J8 DOM und Events](dom-and-events/) | die Dinge auf einer Seite, reservieren per Klick | Elemente finden und erzeugen, Events, Event-Delegation, Formulare | die SPA von Hand in Teil 2 |
| [J9 JSON und Datenformate](json/) | der Katalog als Export, Favoriten speichern | `JSON.stringify` und `JSON.parse`, Datumswerte, Kopien mit `structuredClone` | Daten vom Server, Speichern im Browser |
| [J10 Zahlen und Daten formatieren](formatting/) | Pfand in Franken, Rückgabedaten auf Deutsch | Beträge in Franken, Datum und Uhrzeit, Zeitzonen mit `Intl` | überall, wo die App Beträge und Daten zeigt |

Was über diese Grundlagen hinausgeht, steht in Teil 1, etwa Module, Werte und Referenzen im Detail, `map`, `filter` und `reduce` sowie asynchrones JavaScript mit `fetch`.

## So ist ein Schritt aufgebaut

Oben steht, was der Tresen-Helfer schon kann und was dieser Schritt hinzufügt, darunter der Code bis zum Schritt davor. Danach folgen die Lernziele, die Abschnitte mit Beispielen und einer Abbildung, die Aufgaben auf drei Stufen mit Lösungen, die typischen Fehler und ein Selbstcheck. Am Ende zeigt der Schritt, wie es weitergeht.
