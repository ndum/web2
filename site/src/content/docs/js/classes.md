---
title: Klassen und this
description: Der Tresen-Helfer hält Reservationen als Objekte einer Klasse fest und rechnet ihre Tage aus. Klassen mit Konstruktor und Methoden, Getter, Setter und toString, private Felder, statische Methoden und wovon this abhängt.
sidebar:
  order: 6
---

::::step{n="6"}
Er schreibt für jedes Ding eine Zeile und findet Dinge über ihren Namen. In diesem Schritt hält er Reservationen fest, mit Ding, Mitgliedernummer, Abhol- und Rückgabetag, und rechnet aus, wie viele Tage eine Ausleihe dauert.

:::details[Code bis Schritt 5]
::code{file="examples/js/strings/{lang}/desk.mjs"}
:::
::::

Vue-Code mit `<script setup>` kommt fast ohne Klassen und ohne `this` aus. Trotzdem begegnet dir beides, in eigenen Fehlerklassen in Schritt 7, in Bibliotheken und in älterem Vue-Code mit der Options API. Eine Klasse beschreibt, welche Daten ein Objekt hat und was es damit tun kann. Im Tresen-Helfer wird damit aus einer Reservation ein Objekt, das seine Tage selbst ausrechnet.

:::goals
Nach diesem Schritt kannst du

- eine Klasse mit Konstruktor und Methoden schreiben und mit `new` Objekte daraus erzeugen,
- Getter, Setter und `toString` einsetzen,
- Felder mit `#` privat machen und statische Methoden schreiben,
- erklären, wovon `this` abhängt, und eine Methode mit `bind` oder einer Pfeilfunktion weitergeben.
:::

## Klassen und Objekte

Eine Klasse ist ein Bauplan für Objekte. Der Konstruktor legt die Felder eines neuen Objekts an, Methoden beschreiben, was es kann. `new` erzeugt ein Objekt nach diesem Bauplan.

::code{file="examples/js/classes/{lang}/item.mjs"}

`new Item(...)` ruft den Konstruktor auf, und `this` zeigt dort auf das neue Objekt. `this.name = name` legt also ein Feld des Zelts an. Die Funktion `isIn` aus Schritt 3 steckt jetzt als Methode in der Klasse. Sie braucht keinen Parameter mehr, weil sie ihr Ding über `this` kennt. Fehlt beim Aufruf das vierte Argument, setzt der Standardwert `availableFrom` auf `null`.

`fromLine` ist eine statische Methode. Sie gehört zur Klasse selbst und nicht zu einem einzelnen Ding, darum rufst du sie über den Namen der Klasse auf, `Item.fromLine(...)`. Typisch sind solche Methoden für Objekte, die aus anderen Daten entstehen, hier aus einer Zeile Text. Zwei statische Methoden kennst du schon, `Object.keys` aus Schritt 4 und `Math.max` aus Schritt 5. `instanceof` prüft, ob ein Objekt nach dem Bauplan einer Klasse entstanden ist, und `typeof Item` ergibt `function`, denn eine Klasse ist in JavaScript eine besondere Art von Funktion.

## Getter und toString

Eine Reservation hält fest, wer welches Ding von wann bis wann ausleiht. Wie viele Tage das sind, muss sie nicht speichern, sie kann es aus den beiden Daten ausrechnen. Die Abbildung zeigt die Klasse `Reservation` und die zwei Objekte, die der Tresen-Helfer daraus erzeugt.

![Eine Klasse, zwei Objekte. Links die Klasse Reservation als Bauplan mit dem Konstruktor, dem Getter days und der Methode toString. Zwei Pfeile mit new führen zu zwei Objekten. R-1 hält den Beamer für M-117 vom 2026-11-07 bis 2026-11-11, R-2 die Festbankgarnitur für M-117 vom 2026-11-07 bis 2026-11-14. Der Getter days liefert 4 Tage für R-1 und 7 Tage für R-2. Die Werte gehören jedem Objekt selbst, die Methoden und der Getter stehen nur einmal in der Klasse.](../../../assets/figures/de/j6-class-and-objects.svg)

Im Tresen-Helfer sieht die Klasse so aus.

::code{file="examples/js/classes/{lang}/desk.mjs"}

Der Konstruktor holt für jede neue Reservation eine Nummer aus `nextNumber`, der Closure aus Schritt 3, und speichert Ding, Mitgliedernummer und die beiden Daten. Abholen und Zurückbringen stehen als ISO-Datum wie `'2026-11-07'` im Objekt. So rechnet `loanDays` mit ihnen, und sie lassen sich als Text vergleichen, was Schritt 7 braucht.

`days` ist ein Getter. Von aussen liest du ihn wie ein Feld, `reservation.days`, ohne Klammern. Dahinter steht eine Funktion, die bei jedem Lesen aus `from` und `to` neu rechnet. Ändert sich das Rückgabedatum, stimmen die Tage also sofort.

`toString` bestimmt, wie eine Reservation als Text aussieht. JavaScript ruft die Methode selbst auf, wenn aus einem Objekt ein String werden muss, etwa im Template Literal `${reservation}`. `console.log(reservation)` ruft sie dagegen nicht auf, sondern zeigt die Felder des Objekts.

## Private Felder und Setter

Felder wie `number` oder `member` kann jeder Code ändern, der das Objekt in der Hand hat. Soll eine Regel immer gelten, schützt du das Feld. Eine Notiz zu einer Reservation hat zum Beispiel höchstens 200 Zeichen.

::code{file="examples/js/classes/{lang}/note.mjs"}

`#note` ist ein privates Feld. Nur Code innerhalb der Klasse kann es lesen und schreiben. Steht `reservation.#note` ausserhalb der Klasse, bricht das Programm schon beim Laden mit einem `SyntaxError` ab. Von aussen führt der Weg über den Getter und den Setter `note`. Die Zuweisung `reservation.note = ...` ruft den Setter auf, der die Leerzeichen entfernt und den Text auf 200 Zeichen kürzt. `'x'.repeat(250)` baut dafür einen Text mit 250 Zeichen, gespeichert werden nur 200. `Object.keys` listet nur `number` und `member`. Das private Feld bleibt unsichtbar, und Getter und Setter gehören zur Klasse, nicht zum einzelnen Objekt.

## Der Wert von this

In einer Methode zeigt `this` auf das Objekt, über das die Methode aufgerufen wurde. Es kommt auf den Aufruf an, nicht auf den Ort, an dem die Methode steht.

::code{file="examples/js/classes/{lang}/this.mjs"}

`desk.lend()` ruft die Methode über `desk` auf, `this` ist also `desk`, und von 6 Dingen bleiben 5. `const lend = desk.lend` nimmt die Funktion aus dem Objekt heraus. Beim Aufruf `lend()` steht kein Objekt davor, und `this` ist `undefined`, weil in Modulen und Klassen immer der Strict Mode gilt. Der Zugriff auf `this.inStock` wirft dann einen `TypeError`, den `try` und `catch` abfangen, mehr dazu in Schritt 7. `bind` erzeugt eine neue Funktion, deren `this` fest auf `desk` zeigt. Die Pfeilfunktion `later` ruft `lend` wieder über `desk` auf. Beide zählen richtig, am Schluss sind noch 3 Dinge da.

Das passiert oft, wenn eine Methode als Callback weitergegeben wird, etwa an `addEventListener` in Schritt 8 oder an `setTimeout`. Die Funktion wird später ohne ihr Objekt aufgerufen. Pfeilfunktionen haben kein eigenes `this`, sie verwenden das `this` der Umgebung, in der sie stehen. Darum taugen sie als Callback innerhalb einer Methode, als Methode eines Objekts dagegen nicht, weil `this` dann nicht auf das Objekt zeigt.

## Aufgaben

::::exercise[Einstieg]
Schreib eine Klasse `Member` mit den Feldern `number` und `since` und einer Methode `toString`. Erzeuge das Mitglied M-117, das seit 2024 dabei ist, und gib es mit einem Template Literal aus.

:::solution[Lösung]
::code{file="examples/js/classes/{lang}/solution-1.mjs"}

Das Template Literal `${member}` ruft `toString` auf, darum erscheint `M-117, Mitglied seit 2024`. `instanceof` bestätigt, dass `member` nach dem Bauplan von `Member` entstanden ist.
:::
::::

::::exercise[Vertiefung]
Gib der Klasse `Reservation` eine Methode `overlaps(other)`. Sie liefert `true`, wenn beide Reservationen dasselbe Ding betreffen und sich ihre Tage überschneiden. Wer am Rückgabetag einer anderen Ausleihe abholt, überschneidet sich nicht. Prüfe den Beamer vom 7. bis 11. November gegen eine Reservation vom 11. bis 14. November und gegen eine vom 7. bis 14. November.

:::solution[Lösung]
::code{file="examples/js/classes/{lang}/solution-2.mjs"}

Die Ausgabe ist `false true`. ISO-Daten lassen sich als Text vergleichen, weil Jahr, Monat und Tag immer gleich viele Stellen haben und in dieser Reihenfolge stehen. Zwei Ausleihen überschneiden sich, wenn jede beginnt, bevor die andere endet. Das strenge `<` lässt den 11. November zu, an dem der Beamer zurückkommt und gleich wieder abgeholt wird.
:::
::::

::::exercise[Knobelei]
M-117 hat drei Reservationen, R-1 und R-2 aus dem Tresen-Helfer und R-3 vom 11. bis 14. November. Schreib eine statische Methode `Reservation.byDays(a, b)`, mit der `toSorted` die Reservationen nach ihrer Dauer ordnet, die kürzeste zuerst. Erkläre, warum du `Reservation.byDays` ohne `bind` an `toSorted` übergeben kannst, `desk.lend` als Callback aber nicht.

:::solution[Lösung]
::code{file="examples/js/classes/{lang}/solution-3.mjs"}

`byDays` liest die Tage über den Getter und liefert eine negative Zahl, wenn `a` kürzer ist als `b`, so wie `toSorted` es braucht. Die Methode verwendet kein `this`, sie bekommt beide Reservationen als Argumente. Darum spielt es keine Rolle, dass `toSorted` sie ohne Objekt davor aufruft. `desk.lend` braucht dagegen `this`, um `inStock` zu finden.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine Methode wird als Callback weitergegeben und verliert ihr `this`, etwa `button.addEventListener('click', desk.lend)`. | Eine Pfeilfunktion übergeben, `() => desk.lend()`, oder `bind` verwenden. |
| Eine Methode eines Objekts ist als Pfeilfunktion geschrieben und findet `this.inStock` nicht. | Methoden in der Kurzform `lend() { ... }` schreiben. |
| `Reservation(...)` ohne `new` wirft einen `TypeError`. | Klassen immer mit `new` aufrufen. |
| `reservation.days()` wirft einen `TypeError`. | Einen Getter ohne Klammern lesen, `reservation.days`. |
| `console.log(reservation)` zeigt die Felder statt der Zeile aus `toString`. | Das Objekt in einen Text einsetzen, `${reservation}`, oder `String(reservation)` schreiben. |
| Ein KI-Assistent schreibt in `<script setup>` `this.items` oder `this.$emit`. | In `<script setup>` gibt es kein `this`. Das ist Code der Options API, der dort nicht funktioniert. |

## Selbstcheck

::::selfcheck
1. Was ist der Unterschied zwischen der Klasse `Reservation` und `new Reservation(...)`?
2. Warum schreibst du `reservation.days` ohne Klammern, `reservation.toString()` aber mit?
3. Warum wirft `lend()` nach `const lend = desk.lend` einen `TypeError`?

:::solution[Antworten]
1. Die Klasse ist der Bauplan. `new` erzeugt daraus ein Objekt mit eigenen Werten, jedes weitere `new` ein weiteres Objekt.
2. `days` ist ein Getter und wird wie ein Feld gelesen, auch wenn dahinter eine Funktion steht. `toString` ist eine gewöhnliche Methode und braucht einen Aufruf.
3. `lend` wird ohne Objekt davor aufgerufen, darum ist `this` im Strict Mode `undefined`. `this.inStock` liest dann ein Feld von `undefined`.
:::
::::

:::next
In Schritt 7 prüft der Tresen-Helfer eine Anfrage, bevor er sie annimmt, und lehnt sie mit einem Grund ab. Weiter geht es mit [J7 Fehler behandeln](../errors/).
:::
