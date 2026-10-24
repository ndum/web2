---
title: Funktionen und Gültigkeitsbereich
description: Funktionen deklarieren, Pfeilfunktionen, Standardwerte für Parameter, wo eine Variable gilt und wie Closures sich Werte merken.
sidebar:
  order: 3
---

Funktionen sind in JavaScript Werte. Du kannst sie in Variablen speichern, anderen Funktionen übergeben und aus Funktionen zurückgeben. Vue nutzt das überall. Ein Event-Handler ist eine Funktion, `computed` bekommt eine Funktion, und ein Composable aus Teil 5 ist eine Funktion, die sich Werte merkt.

:::goals
Nach dieser Einheit kannst du

- Funktionen als Deklaration und als Pfeilfunktion schreiben,
- Parametern Standardwerte geben,
- erklären, in welchem Bereich eine Variable gilt,
- eine Closure erkennen und nutzen, um dir Werte zwischen Aufrufen zu merken.
:::

## Funktionen schreiben

Zwei Schreibweisen siehst du im Kurs ständig. Eine Funktionsdeklaration beginnt mit `function` und einem Namen. Eine Pfeilfunktion ist ein Ausdruck, den du meist einer Konstanten zuweist.

::code{file="examples/js/functions/{lang}/defaults.mjs"}

`formatDeposit` ist eine Deklaration mit einem Block in geschweiften Klammern und einem `return`. `days` ist eine Pfeilfunktion, deren Körper nur aus einem Ausdruck besteht. Dann braucht es weder geschweifte Klammern noch `return`, der Wert des Ausdrucks ist das Ergebnis. Zieht man zwei Datumswerte voneinander ab, ergibt das Millisekunden, geteilt durch die Millisekunden eines Tages bleiben 3 Tage.

Pfeilfunktionen sind kurz und eignen sich für kleine Aufgaben, etwa als Argument für eine andere Funktion. Sie haben kein eigenes `this`, was die Einheit [Klassen und this](../classes/) erklärt. Hat eine Pfeilfunktion genau einen Parameter, darfst du die runden Klammern darum weglassen. Der Kurs schreibt sie trotzdem, so sieht jede Pfeilfunktion gleich aus.

## Standardwerte für Parameter

Ruft jemand eine Funktion mit weniger Argumenten auf, als sie Parameter hat, sind die fehlenden `undefined`. Mit einem Standardwert wie `currency = 'CHF'` setzt du für diesen Fall einen Wert ein. Er gilt auch, wenn jemand ausdrücklich `undefined` übergibt, aber nicht bei `null`, denn `null` ist ein Wert.

Ein Standardwert darf auf Parameter zugreifen, die vor ihm stehen. `function loanDays(from, to = from)` setzt das Ende auf den Anfang, wenn es fehlt.

## Gültigkeitsbereich

Eine Variable, die du mit `const` oder `let` anlegst, gilt im Block, in dem sie steht, also zwischen den nächsten geschweiften Klammern. Ausserhalb davon gibt es sie nicht.

```js
if (available) {
  const message = 'Verfügbar'
}
console.log(message) // ReferenceError: message is not defined
```

Von innen sieht man nach aussen, von aussen nicht nach innen. Eine Funktion kann alle Variablen lesen, die dort gelten, wo sie geschrieben steht. Diesen Bereich nennt man Gültigkeitsbereich, auf Englisch «scope». Variablen, die in einem Modul ausserhalb aller Funktionen und Blöcke stehen, gelten in der ganzen Datei, aber nicht in anderen Dateien.

## Closures

Eine Funktion merkt sich die Variablen, die es dort gab, wo sie entstanden ist, auch wenn die äussere Funktion längst fertig ist. Das nennt man Closure.

::code{file="examples/js/functions/{lang}/closure.mjs"}

Jeder Aufruf von `createIdGenerator` legt eine eigene Variable `next` an und gibt eine Funktion zurück, die sie hochzählt. `reservationId` und `loanId` haben je ihre eigene Variable, darum zählen sie unabhängig voneinander. Von aussen kommt niemand an `next` heran, nur die zurückgegebene Funktion kann den Wert ändern. `next++` liefert zuerst den alten Wert und zählt danach hoch.

Composables in Teil 5 funktionieren nach demselben Prinzip. Eine Funktion legt Zustand an und gibt Funktionen zurück, die damit arbeiten.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine Pfeilfunktion mit geschweiften Klammern gibt `undefined` zurück, etwa `(a, b) => { a + b }`. | Im Block `return` schreiben oder die Klammern weglassen, `(a, b) => a + b`. |
| Eine Pfeilfunktion soll ein Objekt zurückgeben, und `() => { id: 1 }` liefert `undefined`. | Das Objekt in runde Klammern setzen, `() => ({ id: 1 })`. |
| Eine Funktion wird übergeben und dabei aus Versehen aufgerufen, etwa `addEventListener('click', reserve())`. | Die Funktion selbst übergeben, `addEventListener('click', reserve)`. |
| Ein Standardwert soll auch bei `null` greifen. | Im Körper der Funktion `??` verwenden, Standardwerte greifen nur bei `undefined`. |

## Aufgaben

::::exercise[Einstieg]
Schreib eine Pfeilfunktion `isExpensive(deposit)`, die `true` zurückgibt, wenn ein Pfand höher als CHF 40 ist. Was gibt sie für 20, 50 und 40 zurück?

:::solution[Lösung]
::code{file="examples/js/functions/{lang}/solution-1.mjs"}

Die Ausgabe ist `false true false`, denn 40 ist nicht höher als 40. Der Vergleich liefert schon einen Wahrheitswert, ein `if` mit `return true` und `return false` ist nicht nötig.
:::
::::

::::exercise[Vertiefung]
Schreib eine Funktion `loanDays(from, to)`, die zählt, an wie vielen Tagen ein Ding ausgeliehen ist. Der erste und der letzte Tag zählen mit. Fehlt `to`, dauert die Ausleihe einen Tag. Teste mit `'2026-11-02'` bis `'2026-11-04'` und mit `'2026-11-02'` allein.

:::solution[Lösung]
::code{file="examples/js/functions/{lang}/solution-2.mjs"}

Die Ausgabe ist 3 und danach 1. Der Standardwert `to = from` greift, wenn das zweite Argument fehlt. Weil beide Tage mitzählen, kommt zur Differenz der Tage eins dazu.
:::
::::

::::exercise[Knobelei]
Schreib eine Funktion `createCounter()`, die ein Objekt mit den Methoden `increase` und `reset` zurückgibt. `increase` zählt um eins hoch und gibt den neuen Stand zurück, `reset` setzt ihn auf 0. Der Zählerstand selbst soll von aussen nicht erreichbar sein.

:::solution[Lösung]
::code{file="examples/js/functions/{lang}/solution-3.mjs"}

Die Ausgabe ist 3 und danach 1. `count` lebt in der Closure von `createCounter`, beide Methoden greifen auf dieselbe Variable zu. Ein `reservations.count` gibt es nicht, ändern lässt sich der Stand nur über die beiden Methoden. Die Zuweisung in Klammern `(count += 1)` liefert den neuen Wert, darum gibt `increase` ihn zurück.
:::
::::
