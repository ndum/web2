---
title: Kontrollstrukturen
description: Entscheidungen mit if, else und switch, der Bedingungsoperator und Schleifen mit for...of und while.
sidebar:
  order: 2
---

Kontrollstrukturen entscheiden, welcher Code läuft und wie oft. In Vue-Templates heissen sie später `v-if` und `v-for`, im Script bleiben es die Anweisungen dieser Einheit.

:::goals
Nach dieser Einheit kannst du

- mit `if`, `else if` und `else` zwischen Fällen unterscheiden,
- den Bedingungsoperator `? :` für kurze Entscheidungen einsetzen,
- mit `switch` einen Wert auf mehrere feste Fälle prüfen,
- mit `for...of` und `while` über Werte laufen und Schleifen mit `break` und `continue` steuern.
:::

## Entscheidungen

`if` führt einen Block aus, wenn eine Bedingung wahr ist. Mit `else if` prüfst du weitere Fälle der Reihe nach, `else` fängt alles auf, was übrig bleibt. Bedingungen verknüpfst du mit `&&` für «und», `||` für «oder» und `!` für «nicht». Eine Bedingung muss kein Wahrheitswert sein, JavaScript wandelt jeden Wert um, wie es die Einheit [Variablen, Typen und Operatoren](../variables/) beschreibt.

::code{file="examples/js/control-flow/{lang}/conditions.mjs"}

Ein `return` beendet die Funktion sofort. Weil jeder Fall mit `return` endet, könntest du die beiden `else` auch weglassen. Viele schreiben Funktionen so, dass sie Sonderfälle früh mit `return` erledigen und der Hauptfall am Schluss steht.

Für eine Entscheidung zwischen zwei Werten gibt es den Bedingungsoperator `bedingung ? wennWahr : wennFalsch`. Er ist ein Ausdruck und liefert einen Wert, darum passt er in eine Zuweisung oder in ein Template Literal. In Vue-Templates begegnet er dir oft, etwa als `{{ item.available ? 'Verfügbar' : 'Ausgeliehen' }}`.

## Fälle mit switch

Prüfst du einen Wert auf mehrere feste Fälle, ist `switch` übersichtlicher als eine lange Kette von `else if`.

::code{file="examples/js/control-flow/{lang}/categories.mjs"}

`switch` vergleicht mit `===`. Trifft ein Fall zu, läuft der Code ab dort weiter, bis ein `return` oder `break` kommt. Ohne `break` läuft er in den nächsten Fall hinein, auf Englisch heisst das «fall through», und es ist eine häufige Fehlerquelle. `default` greift, wenn kein Fall passt, hier bei `'music'`.

## Schleifen

Für Arrays ist `for...of` die einfachste Schleife. Sie liefert die Werte der Reihe nach, ohne dass du dich um einen Index kümmern musst.

::code{file="examples/js/control-flow/{lang}/loops.mjs"}

Die erste Schleife zählt alle Pfänder zusammen, 20, 50, 30 und 40 ergeben 140. Die zweite läuft mit `while`, solange eine Bedingung gilt, hier bis zum ersten Pfand ab 40. Das ist das Pfand an der Stelle 1, denn die Zählung beginnt bei 0. `index < deposits.length` steht zuerst, damit die Schleife auch dann endet, wenn kein Pfand passt.

Brauchst du den Index, gibt es die klassische Zählschleife `for (let i = 0; i < deposits.length; i++)`. Mit `break` verlässt du eine Schleife sofort, mit `continue` überspringst du den Rest des aktuellen Durchgangs. `for...in` dagegen läuft über die Schlüssel eines Objekts und ist für Arrays nicht gedacht.

In Teil 1 lernst du die Methoden `map`, `filter` und `find` kennen, die viele Schleifen über Arrays kürzer machen. Die Schleifen dieser Einheit bleiben trotzdem nützlich, etwa wenn du früh abbrechen willst.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `if (x = 5)` weist zu, statt zu vergleichen, und ist immer wahr. | Mit `===` vergleichen. |
| Ein `case` ohne `break` oder `return` läuft in den nächsten Fall. | Jeden Fall mit `break` oder `return` beenden. |
| `for (const i in names)` liefert die Indizes als Text, nicht die Namen. | Für Arrays `for...of` verwenden. |
| Eine `while`-Schleife ändert ihre Bedingung nie und läuft endlos. | Prüfen, dass jeder Durchgang der Abbruchbedingung näher kommt. Der Knopf «Stopp» bricht ein solches Programm ab. |
| `for (let i = 0; i <= names.length; i++)` liest einmal zu viel. | Mit `<` vergleichen, der letzte Index ist `length - 1`. |

## Aufgaben

::::exercise[Einstieg]
Das Array `[true, false, true, true, false]` sagt für fünf Dinge, ob sie da sind. Zähle mit einer Schleife, wie viele verfügbar sind.

:::solution[Lösung]
::code{file="examples/js/control-flow/{lang}/solution-1.mjs"}

Die Ausgabe ist 3. Weil `isIn` schon ein Wahrheitswert ist, genügt `if (isIn)`, ein Vergleich mit `=== true` ist nicht nötig.
:::
::::

::::exercise[Vertiefung]
Finde im Array `[20, 30, 50, 80, 10]` das erste Pfand über CHF 40. Brich die Schleife ab, sobald du es gefunden hast. Gibt es keines, soll `null` herauskommen.

:::solution[Lösung]
::code{file="examples/js/control-flow/{lang}/solution-2.mjs"}

Die Ausgabe ist 50. Dank `break` prüft die Schleife die 80 und die 10 gar nicht mehr. `found` beginnt mit `null`, damit das Ergebnis auch stimmt, wenn kein Pfand passt. In Teil 1 erledigt `deposits.find((deposit) => deposit > 40)` dasselbe in einer Zeile, liefert aber `undefined` statt `null`, wenn nichts passt.
:::
::::

::::exercise[Knobelei]
Schreib eine Funktion `isOpen(day, hour)`, die sagt, ob Lorraine Commons zu einer vollen Stunde offen ist. Geöffnet ist am Mittwoch von 17 bis 19 Uhr und am Samstag von 10 bis 13 Uhr, die Tage heissen `'wednesday'` und `'saturday'`. Um 19 Uhr ist schon geschlossen. Prüfe Mittwoch 18 Uhr, Mittwoch 19 Uhr, Samstag 10 Uhr und Montag 11 Uhr.

:::solution[Lösung]
::code{file="examples/js/control-flow/{lang}/solution-3.mjs"}

Die Ausgabe ist `true false true false`. Der Beginn zählt dazu, das Ende nicht, darum steht links `>=` und rechts `<`. Mit dieser Regel überschneiden sich zwei Zeitfenster nie, wenn das eine endet, wo das andere beginnt. Für alle anderen Tage gibt die Funktion am Schluss `false` zurück.
:::
::::
