---
title: Funktionen und Gültigkeitsbereich
description: Der Tresen-Helfer prüft mit isIn, ob ein Ding da ist, rechnet mit loanDays die Tage einer Ausleihe und vergibt Nummern für Reservationen. Funktionen und Pfeilfunktionen, Standardwerte für Parameter, wo eine Variable gilt und wie Closures sich Werte merken.
sidebar:
  order: 3
---

::::step{n="3"}
Er weiss, ob die Bohrmaschine da ist, und kennt die Tage, an denen der Tresen offen ist. In diesem Schritt packt er seine Fragen in Funktionen, rechnet die Tage einer Ausleihe und vergibt Nummern für Reservationen.

:::details[Code bis Schritt 2]
::code{file="examples/js/control-flow/{lang}/desk.mjs"}
:::
::::

In JavaScript sind Funktionen Werte. Du kannst sie in einer Variablen ablegen und aus einer anderen Funktion zurückgeben. Vue nutzt das überall, ein Event-Handler ist eine Funktion, und ein Composable aus Teil 5 ist eine Funktion, die sich Werte merkt.

:::goals
Nach diesem Schritt kannst du

- Funktionen als Deklaration und als Pfeilfunktion schreiben und aufrufen,
- Parametern Standardwerte geben,
- erklären, in welchem Bereich eine Variable gilt,
- eine Closure erkennen und nutzen, um dir Werte zwischen Aufrufen zu merken.
:::

## Funktionen schreiben

Eine Funktion fasst Code unter einem Namen zusammen, und du rufst sie so oft auf, wie du willst. Zwei Schreibweisen siehst du im Kurs ständig. Eine Funktionsdeklaration beginnt mit `function` und einem Namen. Eine Pfeilfunktion ist ein Ausdruck, den du meist einer Konstanten zuweist.

::code{file="examples/js/functions/{lang}/open.mjs"}

`isOpen` ist eine Deklaration mit dem Parameter `day` und einem Block in geschweiften Klammern. Beim Aufruf `isOpen('Samstag')` bekommt `day` den Wert `'Samstag'`, das Argument. `return` gibt das Ergebnis des Vergleichs zurück und beendet die Funktion. Die Bedingung, die im Tresen-Helfer zweimal stand, steht jetzt nur noch an dieser einen Stelle.

`isClosed` ist eine Pfeilfunktion, deren Körper nur aus einem Ausdruck besteht. Dann braucht es weder geschweifte Klammern noch `return`, der Wert des Ausdrucks ist das Ergebnis. Sie ruft `isOpen` auf und kehrt das Ergebnis mit `!` um. Pfeilfunktionen sind kurz und eignen sich für kleine Aufgaben, etwa als Argument für eine andere Funktion. Sie haben kein eigenes `this`, was [Klassen und this](../classes/) erklärt. Hat eine Pfeilfunktion genau einen Parameter, darfst du die runden Klammern darum weglassen. Der Kurs schreibt sie trotzdem, so sieht jede Pfeilfunktion gleich aus.

## Standardwerte für Parameter

Ruft jemand eine Funktion mit weniger Argumenten auf, als sie Parameter hat, sind die fehlenden `undefined`. Mit einem Standardwert setzt du für diesen Fall einen Wert ein.

::code{file="examples/js/functions/{lang}/defaults.mjs"}

Fehlt die Mitgliedernummer, setzt `member = 'M-117'` die Nummer des Testmitglieds ein. Der Standardwert gilt auch, wenn jemand ausdrücklich `undefined` übergibt, wie beim Beamer. Bei `null` gilt er nicht, denn `null` ist ein Wert, den jemand absichtlich übergibt, darum steht in der letzten Zeile `null`. Soll auch `null` die Nummer des Testmitglieds bekommen, schreibst du im Körper der Funktion `member ?? 'M-117'`.

Ein Standardwert darf auf Parameter zugreifen, die vor ihm stehen. `function loanDays(from, to = from)` setzt das Ende auf den Anfang, wenn es fehlt.

## Gültigkeitsbereich

Eine Variable, die du mit `const` oder `let` anlegst, gilt im Block, in dem sie steht, also zwischen den nächsten geschweiften Klammern. Ausserhalb davon gibt es sie nicht. Diesen Bereich nennt man Gültigkeitsbereich, auf Englisch «scope».

::code{file="examples/js/functions/{lang}/scope.mjs"}

`maxDays` steht ausserhalb aller Funktionen und Blöcke und gilt darum in der ganzen Datei, aber nicht in anderen Dateien. `allowed` liest es, denn von innen sieht man nach aussen. `tooLong` dagegen gibt es nur im Körper von `allowed`, von aussen sieht man nicht nach innen. Entferne mit «Bearbeiten» die beiden Schrägstriche vor der letzten Zeile, dann bricht das Programm mit einem `ReferenceError` ab.

Die Schleife legt in jedem Durchgang ihr eigenes `days` an, und der Parameter `days` von `allowed` ist eine zweite Variable mit demselben Namen. Jede gilt nur in ihrem Block, darum kommen sich die beiden nicht in die Quere.

## Closures

Eine Funktion merkt sich die Variablen, die es dort gab, wo sie entstanden ist, auch wenn die äussere Funktion längst fertig ist. Das nennt man Closure. Der Tresen-Helfer vergibt damit die Nummern für Reservationen.

::code{file="examples/js/functions/{lang}/desk.mjs"}

Nach diesem Schritt stehen im Tresen-Helfer drei Funktionen. `isIn` bekommt ein Ding und prüft, ob sein `availableFrom` `null` ist. Die Bohrmaschine steht dafür in einem Objekt, das `name` und `availableFrom` zusammenfasst, Schritt 4 zeigt Objekte genauer. `loanDays` rechnet die Tage zwischen Abholen und Zurückbringen. `Date.parse` macht aus einem Datum die Millisekunden seit dem 1. Januar 1970, und die Differenz geteilt durch die 86’400’000 Millisekunden eines Tages ergibt die Tage. Von Samstag, 7. November bis Mittwoch, 11. November sind es 4 Tage. Die Unterstriche in `86_400_000` machen die Zahl nur lesbarer.

`makeNumbering('R')` legt die Variable `count` an und gibt eine Pfeilfunktion zurück, die sie hochzählt. Diese Funktion steht danach in `nextNumber` und hängt mit `+` den Präfix, einen Bindestrich und den Stand von `count` aneinander. `makeNumbering` ist nach dem Aufruf fertig, doch `nextNumber` hält `count` am Leben. Jeder Aufruf von `nextNumber` erhöht dasselbe `count` und liefert die nächste Nummer, zuerst R-1 und dann R-2. Die Abbildung zeigt, was sich die Closure nach jedem Aufruf merkt.

![Die Closure von nextNumber. Links stehen drei Aufrufe der Reihe nach. Der erste, makeNumbering('R'), legt prefix und count an und gibt die Funktion nextNumber zurück. Der zweite und der dritte rufen nextNumber auf und liefern 'R-1' und 'R-2'. Rechts steht, was die Closure sich merkt, nach dem ersten Aufruf prefix gleich 'R' und count gleich 0, nach dem zweiten count gleich 1 und nach dem dritten count gleich 2. Von jedem Aufruf führt ein Pfeil zur passenden Zeile.](../../../assets/figures/de/j3-closure.svg)

Von aussen kommt niemand an `count` heran, nur die zurückgegebene Funktion kann den Wert ändern. Ein zweiter Aufruf wie `makeNumbering('L')` legt ein eigenes `count` an, so zählen zwei Nummernkreise unabhängig voneinander. Composables in Teil 5 funktionieren nach demselben Prinzip. Eine Funktion legt Zustand an und gibt Funktionen zurück, die damit arbeiten.

## Aufgaben

::::exercise[Einstieg]
Schreib eine Pfeilfunktion `tooLong(from, to)`, die mit `loanDays` aus dem Tresen-Helfer prüft, ob eine Ausleihe länger als sieben Tage dauert. Prüfe Samstag, 7. bis Samstag, 14. November und Samstag, 7. bis Mittwoch, 18. November.

:::solution[Lösung]
::code{file="examples/js/functions/{lang}/solution-1.mjs"}

Die Ausgabe ist `7 false` und danach `11 true`. Von Samstag bis Samstag sind es genau sieben Tage, die längste erlaubte Ausleihe. Vom 7. bis zum 18. November sind es 11 Tage, das ist zu lang. `tooLong` ruft `loanDays` auf und vergleicht das Ergebnis, eine Funktion darf andere Funktionen benutzen.
:::
::::

::::exercise[Vertiefung]
Gib dem Parameter `prefix` von `makeNumbering` den Standardwert `'R'`, damit `makeNumbering()` Nummern für Reservationen liefert. Leg daneben mit `'L'` einen zweiten Zähler für Ausleihen an und zeig, dass die beiden unabhängig voneinander zählen.

:::solution[Lösung]
::code{file="examples/js/functions/{lang}/solution-2.mjs"}

Die Ausgabe ist `R-1 R-2` und danach `L-1 R-3`. Jeder Aufruf von `makeNumbering` legt ein eigenes `count` an. `nextLoan` beginnt darum bei 1, während `nextNumber` bei 3 weiterzählt.
:::
::::

::::exercise[Knobelei]
Die Freiwilligen wollen wissen, wie viele Nummern der Tresen-Helfer schon vergeben hat. Schreib `makeNumbering` so um, dass es ein Objekt mit zwei Funktionen zurückgibt. `next` liefert die nächste Nummer, `issued` die Zahl der vergebenen Nummern. `count` selbst soll von aussen nicht erreichbar sein.

:::solution[Lösung]
::code{file="examples/js/functions/{lang}/solution-3.mjs"}

`{ next: ..., issued: ... }` legt ein Objekt mit zwei Schlüsseln an, Schritt 4 zeigt Objekte genauer. Beide Funktionen entstehen im selben Aufruf von `makeNumbering` und teilen sich darum dasselbe `count`. Das Objekt hat nur die Schlüssel `next` und `issued`, `numbers.count` ist `undefined`. Ändern lässt sich der Stand nur über `next`. Ein Composable in Teil 5 gibt auf dieselbe Weise ein Objekt mit Werten und Funktionen zurück.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine Pfeilfunktion mit geschweiften Klammern gibt `undefined` zurück, etwa `(day) => { isOpen(day) }`. | Im Block `return` schreiben oder die Klammern weglassen, `(day) => isOpen(day)`. |
| Eine Pfeilfunktion soll ein Objekt zurückgeben, und `() => { count: 1 }` liefert `undefined`. | Das Objekt in runde Klammern setzen, `() => ({ count: 1 })`. |
| Eine Funktion wird übergeben und dabei aus Versehen aufgerufen, etwa `addEventListener('click', reserve())`. | Die Funktion selbst übergeben, `addEventListener('click', reserve)`. |
| Ein Standardwert soll auch bei `null` greifen. | Im Körper der Funktion `??` verwenden, Standardwerte greifen nur bei `undefined`. |
| `makeNumbering('R')` steht vor jeder Reservation, und jede bekommt die Nummer R-1. | `makeNumbering` einmal aufrufen und die zurückgegebene Funktion behalten. |

## Selbstcheck

::::selfcheck
1. Was liefert eine Pfeilfunktion ohne geschweifte Klammern, und was eine mit Klammern, aber ohne `return`?
2. Warum ergibt `requestLabel('Stichsäge', null)` den Text «Stichsäge für null» und nicht «Stichsäge für M-117»?
3. Warum zählt `nextNumber` weiter, obwohl `makeNumbering` längst fertig ist?

:::solution[Antworten]
1. Ohne Klammern ist der Wert des Ausdrucks das Ergebnis. Mit Klammern ist der Körper ein Block, und ohne `return` liefert die Funktion `undefined`.
2. Ein Standardwert gilt nur, wenn das Argument fehlt oder `undefined` ist. `null` ist ein Wert, den jemand absichtlich übergibt.
3. `nextNumber` ist eine Closure. Sie merkt sich das `count` aus dem Aufruf von `makeNumbering`, in dem sie entstanden ist, und jeder Aufruf ändert dieses `count`.
:::
::::

:::next
In Schritt 4 nimmt der Tresen-Helfer die neun Dinge vom Tresen als Objekte in ein Array auf und zählt, was da ist. Weiter geht es mit [J4 Objekte und Arrays](../objects-and-arrays/).
:::
