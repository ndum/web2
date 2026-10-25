---
title: Variablen, Typen und Operatoren
description: Variablen mit let und const, die primitiven Typen, Vergleiche mit === und welche Werte als wahr oder falsch gelten.
sidebar:
  order: 1
---

Diese Einheit frischt auf, wie JavaScript Werte speichert, welche Typen es kennt und wie es Werte vergleicht. Das brauchst du überall im Kurs, denn Vue-Code besteht zum grössten Teil aus gewöhnlichem JavaScript.

:::goals
Nach dieser Einheit kannst du

- Variablen mit `const` und `let` anlegen und begründen, welche du wählst,
- die primitiven Typen von JavaScript nennen und mit `typeof` prüfen,
- Werte mit `===` vergleichen und erklären, warum `==` Überraschungen bringt,
- sagen, welche Werte als falsch gelten, und Standardwerte mit `??` setzen.
:::

## Variablen mit const und let

Eine Variable gibt einem Wert einen Namen. In modernem JavaScript legst du sie mit `const` oder `let` an. Eine Variable mit `const` lässt sich nicht neu zuweisen, eine mit `let` schon. Nimm `const`, wo immer es geht, und `let` nur, wenn sich der Wert später ändern muss, etwa bei einem Zähler.

```js
const deposit = 20
deposit = 30 // TypeError: Assignment to constant variable.
```

`const` schützt nur die Variable, nicht ihren Inhalt. Zeigt eine Konstante auf ein Objekt, kannst du seine Felder trotzdem ändern. Mehr dazu steht in der Einheit [Objekte und Arrays](../objects-and-arrays/).

Das ältere `var` findest du noch in alten Anleitungen. Es gilt in der ganzen Funktion statt nur im Block, in dem es steht, und führt deshalb leicht zu Fehlern. Im Kurs kommt es nicht vor.

## Primitive Typen

JavaScript kennt sieben primitive Typen. Im Alltag begegnen dir fünf davon.

| Typ | Beispiel | Bedeutung |
|---|---|---|
| `string` | `'Bohrmaschine'` | Text |
| `number` | `20`, `12.5` | Zahl, ganz oder mit Stellen nach dem Punkt |
| `boolean` | `true`, `false` | Wahrheitswert |
| `undefined` | `undefined` | noch kein Wert zugewiesen |
| `null` | `null` | absichtlich kein Wert |

Dazu kommen `bigint` für sehr grosse ganze Zahlen und `symbol` für eindeutige Schlüssel, beide brauchst du im Kurs nicht. Alles andere ist ein Objekt, auch Arrays und Funktionen. Mit `typeof` fragst du, welchen Typ ein Wert hat.

::code{file="examples/js/variables/{lang}/types.mjs"}

`typeof` liefert den Typ als Text. Bei `null` meldet es `object`. Das ist ein alter Fehler der Sprache, der aus Rücksicht auf bestehenden Code nie korrigiert wurde. Ob ein Wert `null` ist, prüfst du deshalb mit `value === null`. `returnDate` hat nie einen Wert bekommen und ist darum `undefined`.

## Werte vergleichen

`===` vergleicht Wert und Typ. `==` wandelt die Werte vorher um, wenn ihre Typen verschieden sind, und kommt dabei zu Ergebnissen, die kaum jemand erwartet. Verwende deshalb immer `===` und `!==`.

::code{file="examples/js/variables/{lang}/equality.mjs"}

Die erste Zeile zeigt den Unterschied. `20 === '20'` ist falsch, weil eine Zahl und ein Text verschiedene Typen haben. `20 == '20'` wandelt den Text in eine Zahl um und ist wahr. Werte aus Formularfeldern sind immer Text. Willst du mit ihnen rechnen, wandelst du sie mit `Number(...)` ausdrücklich um.

Lässt sich ein Text nicht als Zahl lesen, liefert `Number` den Wert `NaN`, «Not a Number». `NaN` ist nicht einmal mit sich selbst gleich, darum prüfst du mit `Number.isNaN`.

Die dritte Zeile zeigt, welche Werte als wahr oder falsch gelten. In einer Bedingung wandelt JavaScript jeden Wert in einen Wahrheitswert um. Als falsch gelten `false`, die Zahl 0, der leere Text `''`, `null`, `undefined` und `NaN`, auf Englisch heissen sie «falsy». Alles andere gilt als wahr, auch der Text `'0'` und ein leeres Array.

## Standardwerte mit `??` und `||`

Oft fehlt ein Wert, und du willst an seiner Stelle einen Standardwert einsetzen. Dafür gibt es zwei Operatoren, die sich in einem Punkt unterscheiden.

::code{file="examples/js/variables/{lang}/fallback.mjs"}

`a || b` liefert `b`, sobald `a` als falsch gilt. Bei einem Pfand ist das ein Fehler, denn 0 ist ein gültiges Pfand, und `input || 20` macht daraus 20. `a ?? b` liefert `b` nur, wenn `a` `null` oder `undefined` ist. Bei der Bemerkung zeigt sich der Unterschied von der anderen Seite. Für `||` gilt der leere Text als fehlend, für `??` ist er ein Wert, darum gibt die letzte Zeile eine leere Zeile aus.

Nimm `??`, wenn 0 oder ein leerer Text gültige Werte sind, und `||` nur dann, wenn du jeden falschen Wert ersetzen willst.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Mit dem Inhalt eines Formularfelds wird gerechnet, und `'20' + 5` ergibt `'205'`. | Den Text zuerst mit `Number(...)` in eine Zahl umwandeln und mit `Number.isNaN` prüfen. |
| `==` statt `===`, und `0 == ''` ist plötzlich wahr. | Immer `===` und `!==` verwenden. |
| `value \|\| 20` ersetzt auch ein Pfand von 0. | `value ?? 20` verwenden, wenn 0 ein gültiger Wert ist. |
| `typeof value === 'object'` soll prüfen, ob ein Objekt da ist, und ist auch bei `null` wahr. | Zusätzlich `value !== null` prüfen. |
| `x === NaN` ist nie wahr. | `Number.isNaN(x)` verwenden. |
| Ein KI-Assistent schreibt `var`. | `const` verwenden und `let` nur, wenn sich der Wert ändert. |

## Aufgaben

::::exercise[Einstieg]
Sag für jeden der Werte `50`, `'50'`, `false`, `undefined` und `null` voraus, was `typeof` meldet. Schreib danach ein Programm, das alle fünf Typen in einer Zeile ausgibt, und vergleiche.

:::solution[Lösung]
::code{file="examples/js/variables/{lang}/solution-1.mjs"}

Die Ausgabe ist `number string boolean undefined object`. Die Anführungszeichen machen aus 50 einen Text. Bei `null` meldet `typeof` den alten Fehler `object`.
:::
::::

::::exercise[Vertiefung]
Schreib eine Funktion `depositOrDefault(value)`, die ein Pfand zurückgibt oder 20, wenn keines angegeben ist. Ein Pfand von 0 ist erlaubt und muss erhalten bleiben. Teste sie mit 50, 0, `null` und `undefined`.

:::solution[Lösung]
::code{file="examples/js/variables/{lang}/solution-2.mjs"}

Die Ausgabe ist `50 0 20 20`. Mit `value || 20` käme beim Pfand von 0 ebenfalls 20 heraus, weil 0 als falsch gilt.
:::
::::

::::exercise[Knobelei]
Rechne `0.1 + 0.2` und vergleiche das Ergebnis mit `0.3`. Erkläre, was passiert. Finde dann einen Weg, mit Beträgen in Franken so zu rechnen, dass der Vergleich stimmt.

:::solution[Lösung]
::code{file="examples/js/variables/{lang}/solution-3.mjs"}

JavaScript speichert Zahlen im Binärsystem mit 64 Bit. 0.1 und 0.2 lassen sich darin nicht genau darstellen, so wie ein Drittel im Dezimalsystem nicht aufgeht. Die Summe ist deshalb `0.30000000000000004` und nicht gleich `0.3`. Ganze Zahlen bis gut 9 Billiarden stellt JavaScript dagegen genau dar. Darum rechnen viele Programme mit Rappen statt mit Franken und wandeln erst für die Anzeige um, hier mit `(rappen / 100).toFixed(2)`.
:::
::::
