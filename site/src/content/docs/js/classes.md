---
title: Klassen und this
description: Klassen mit Konstruktor, Methoden, Gettern und privaten Feldern, statische Methoden und wovon this in Methoden und Pfeilfunktionen abhängt.
sidebar:
  order: 6
---

Vue-Code mit `<script setup>` kommt fast ohne Klassen und ohne `this` aus. Trotzdem begegnet dir beides, in eigenen Fehlerklassen, in Bibliotheken und in älterem Vue-Code mit der Options API, den KI-Assistenten gern vorschlagen. Diese Einheit zeigt, wie Klassen aufgebaut sind und wovon `this` abhängt.

:::goals
Nach dieser Einheit kannst du

- eine Klasse mit Konstruktor, Methoden und Gettern schreiben,
- Felder mit `#` privat machen,
- statische Methoden einsetzen,
- erklären, wovon der Wert von `this` abhängt, und typische Fehler damit vermeiden.
:::

## Klassen

Eine Klasse ist ein Bauplan für Objekte. Der Konstruktor legt die Felder eines neuen Objekts an, Methoden beschreiben, was das Objekt kann. Mit `new` entsteht ein Objekt nach diesem Bauplan.

::code{file="examples/js/classes/{lang}/reservation.mjs"}

`#id` ist ein privates Feld. Nur Code innerhalb der Klasse kann es lesen, von aussen ist `reservation.id` deshalb `undefined`. `days` ist ein Getter. Er sieht von aussen aus wie ein Feld, rechnet seinen Wert aber bei jedem Zugriff neu aus. `86_400_000` sind die Millisekunden eines Tages, die Unterstriche machen die Zahl nur lesbarer. Weil der erste und der letzte Tag mitzählen, kommt eins dazu.

## Statische Methoden

Eine statische Methode gehört zur Klasse selbst, nicht zu einem einzelnen Objekt. Du rufst sie über den Namen der Klasse auf, etwa `Item.fromLine('Leiter;20')`. Typisch sind Methoden, die aus anderen Daten ein neues Objekt erzeugen. Ein Beispiel dafür findest du in der Aufgabe «Vertiefung».

## Der Wert von this

In einer Methode zeigt `this` auf das Objekt, über das die Methode aufgerufen wurde. Es kommt auf den Aufruf an, nicht auf den Ort, an dem die Methode steht.

::code{file="examples/js/classes/{lang}/this.mjs"}

`counter.increase()` ruft die Methode über `counter` auf, `this` ist also `counter`. `const increase = counter.increase` nimmt die Funktion aus dem Objekt heraus. Beim Aufruf `increase()` steht kein Objekt davor, und `this` ist `undefined`, weil in Modulen und Klassen immer der Strict Mode gilt. Der Zugriff auf `this.count` wirft dann einen `TypeError`. `bind` erzeugt eine neue Funktion, deren `this` fest auf `counter` zeigt, darum zählt `bound()` wieder richtig.

Das passiert oft, wenn eine Methode als Callback weitergegeben wird, etwa an `addEventListener` oder `setTimeout`. Die Funktion wird später ohne ihr Objekt aufgerufen.

## Pfeilfunktionen und this

Pfeilfunktionen haben kein eigenes `this`. Sie verwenden das `this` der Umgebung, in der sie geschrieben stehen. Das ist praktisch für Callbacks innerhalb einer Methode, denn dort behalten sie das `this` der Methode. Als Methode eines Objekts taugen sie dagegen nicht, weil `this` dann nicht auf das Objekt zeigt.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine Methode wird als Callback übergeben und verliert ihr `this`, etwa `button.addEventListener('click', counter.increase)`. | Eine Pfeilfunktion übergeben, `() => counter.increase()`, oder `bind` verwenden. |
| Eine Methode eines Objekts ist als Pfeilfunktion geschrieben und findet `this.count` nicht. | Methoden in der Kurzform `increase() { ... }` schreiben. |
| Ein Objekt wird ohne `new` erzeugt, und `Reservation(...)` wirft einen `TypeError`. | Klassen immer mit `new` aufrufen. |
| Ein privates Feld wird von aussen gelesen und ist `undefined`. | Einen Getter anbieten, wenn der Wert von aussen lesbar sein soll. |
| Ein KI-Assistent schreibt in `<script setup>` `this.items` oder `this.$emit`. | In `<script setup>` gibt es kein `this`. Das ist Code der Options API, der hier nicht funktioniert. |

## Aufgaben

::::exercise[Einstieg]
Gib der Klasse `Reservation` eine Methode `overlaps(other)`, die prüft, ob sich zwei Reservationen überschneiden. Das ist der Fall, wenn beide dasselbe Ding betreffen und jede spätestens an dem Tag beginnt, an dem die andere endet. Prüfe ein Zelt vom 2. bis 4. November gegen eines vom 4. bis 6. November und gegen eines vom 5. bis 6. November.

:::solution[Lösung]
::code{file="examples/js/classes/{lang}/solution-1.mjs"}

Die Ausgabe ist `true false`. Am 4. November wäre das Zelt doppelt vergeben, darum überschneiden sich die ersten beiden. Datumswerte lassen sich mit `<=` direkt vergleichen, JavaScript vergleicht dabei ihre Millisekunden.
:::
::::

::::exercise[Vertiefung]
Schreib eine Klasse `Item` mit den Feldern `name` und `deposit` und einer statischen Methode `fromLine(line)`. Sie erzeugt aus einer Zeile wie `'Leiter;20'` ein `Item`, dessen Pfand eine Zahl ist.

:::solution[Lösung]
::code{file="examples/js/classes/{lang}/solution-2.mjs"}

Die Ausgabe ist `true Leiter 21`. `fromLine` ruft `new Item(...)` auf und gibt das neue Objekt zurück. `instanceof` bestätigt, dass es ein `Item` ist, und `deposit + 1` ergibt 21, weil `Number` aus dem Text eine Zahl gemacht hat.
:::
::::

::::exercise[Knobelei]
Das Objekt `shop` hat eine Methode `greetLater`, die eine Funktion zurückgibt. Diese Funktion soll später «Willkommen bei Lorraine Commons» liefern und den Namen dabei aus `this.name` lesen. Schreib die Methode und erkläre, warum die zurückgegebene Funktion eine Pfeilfunktion sein muss.

:::solution[Lösung]
::code{file="examples/js/classes/{lang}/solution-3.mjs"}

`shop.greetLater()` ruft die Methode über `shop` auf, in ihr ist `this` also `shop`. Die Pfeilfunktion hat kein eigenes `this` und verwendet das der Methode, auch wenn sie später allein aufgerufen wird. Eine Funktion mit `function () { ... }` hätte ihr eigenes `this`, und das wäre beim Aufruf `greet()` `undefined`.
:::
::::
