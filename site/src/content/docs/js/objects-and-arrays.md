---
title: Objekte und Arrays
description: Objekte und Arrays anlegen, lesen und ändern, Verweise und Kopien, Spread, Destrukturieren und optionale Verkettung.
sidebar:
  order: 4
---

Die Daten einer App sind fast immer Objekte und Arrays. Ein Ding im Katalog ist ein Objekt, der Katalog ein Array solcher Objekte. Vue macht diese Daten später reaktiv, die Grundlagen bleiben dieselben.

:::goals
Nach dieser Einheit kannst du

- Objekte und Arrays anlegen, ihre Werte lesen und ändern,
- erklären, warum zwei Variablen auf dasselbe Objekt zeigen können,
- Objekte und Arrays mit Spread kopieren,
- Werte mit Destrukturieren herausholen und fehlende Werte mit `?.` abfangen.
:::

## Objekte

Ein Objekt fasst Werte unter Namen zusammen, den Schlüsseln. Du liest einen Wert mit einem Punkt oder mit eckigen Klammern. Die eckigen Klammern brauchst du, wenn der Schlüssel in einer Variablen steht oder kein gültiger Name ist.

::code{file="examples/js/objects-and-arrays/{lang}/item.mjs"}

Ein Objekt lässt sich nach dem Anlegen erweitern. `item.available = true` fügt einen neuen Schlüssel hinzu, obwohl `item` mit `const` angelegt ist. `Object.keys` liefert alle Schlüssel als Array, `Object.values` die Werte und `Object.entries` beides als Paare.

Die letzte Zeile fragt nach dem Namen des Besitzers, den es nicht gibt. Ohne Schutz würde `item.owner.name` einen `TypeError` werfen, denn `item.owner` ist `undefined`. Die optionale Verkettung `?.` bricht in diesem Fall ab und liefert `undefined`, und `??` setzt dafür «Verein» ein.

## Arrays

Ein Array ist eine geordnete Liste. Die Zählung der Stellen beginnt bei 0, und `length` sagt, wie viele Elemente es hat.

::code{file="examples/js/objects-and-arrays/{lang}/list.mjs"}

`push` hängt ein Element hinten an und ändert dabei das Array selbst. `includes` prüft, ob ein Wert vorkommt, und `indexOf` liefert seine Stelle oder -1, wenn er fehlt. Die zweite und die dritte Zeile der Ausgabe zeigen das Destrukturieren, um das es weiter unten geht.

## Verweise und Kopien

Eine Variable enthält nicht das Objekt selbst, sondern einen Verweis darauf. Weist du eine Variable einer anderen zu, zeigen beide auf dasselbe Objekt.

::code{file="examples/js/objects-and-arrays/{lang}/references.mjs"}

`sameTent` ist kein zweites Zelt, sondern ein zweiter Name für dasselbe. Darum ist `tent.available` nach der Änderung über `sameTent` ebenfalls `false`. Eine Kopie entsteht mit dem Spread-Operator `...`, der alle Felder in ein neues Objekt überträgt. Felder, die danach folgen, überschreiben die kopierten, darum ist `copy.available` wieder `true`. Bei Arrays funktioniert Spread genauso, `[...names, 'Beamer']` ist ein neues Array mit einem Element mehr.

`===` vergleicht bei Objekten die Verweise, nicht den Inhalt. Zwei Objekte mit gleichem Inhalt sind deshalb nicht gleich, ein Objekt mit sich selbst schon.

Spread kopiert nur die oberste Ebene. Enthält ein Objekt ein weiteres Objekt oder ein Array, teilen sich Original und Kopie dieses innere Objekt. Wie du auch innere Objekte kopierst, zeigt die Einheit [JSON und Datenformate](../json/) mit `structuredClone`. Teil 1 geht im Kapitel «Werte und Referenzen» genauer darauf ein.

## Destrukturieren

Mit Destrukturieren holst du mehrere Werte auf einmal aus einem Array oder einem Objekt. Bei Arrays zählt die Position. `const [first, ...rest] = names` nimmt das erste Element und sammelt den Rest in einem neuen Array. Bei Objekten zählt der Name. `const { name, deposit = 20 } = item` holt zwei Felder und setzt einen Standardwert, falls `deposit` fehlt. Im Beispiel oben fehlt das Pfand der Stichsäge, darum ist es 20.

Destrukturieren funktioniert auch bei Parametern, `function describe({ name, deposit })` holt die Felder direkt aus dem übergebenen Objekt. In Vue begegnet dir das bei Composables, die mehrere Werte in einem Objekt zurückgeben, etwa `const { favorites, toggle } = useFavorites()`.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine Kopie mit `const copy = original` ändert auch das Original. | Mit `{ ...original }` oder `[...original]` kopieren, bei verschachtelten Daten mit `structuredClone`. |
| `item.owner.name` wirft einen `TypeError`, weil `owner` fehlt. | `item.owner?.name` schreiben. |
| Zwei Objekte mit gleichem Inhalt werden mit `===` verglichen. | Ein eindeutiges Feld wie die `id` vergleichen. |
| `names[names.length]` soll das letzte Element liefern und ist `undefined`. | `names[names.length - 1]` oder `names.at(-1)` verwenden. |
| `const` soll ein Objekt vor Änderungen schützen. | `const` verhindert nur eine neue Zuweisung der Variablen, die Felder lassen sich weiter ändern. |

## Aufgaben

::::exercise[Einstieg]
Lege ein Objekt `member` mit den Feldern `id` (`'M-117'`), `firstName` (`'Martina'`) und `memberSince` (2024) an. Gib daraus die Zeile «Martina (M-117) seit 2024» aus.

:::solution[Lösung]
::code{file="examples/js/objects-and-arrays/{lang}/solution-1.mjs"}

Ein Template Literal setzt die drei Werte in den Text ein. Mehr zu Template Literals steht in der Einheit [Strings und Template Literals](../strings/).
:::
::::

::::exercise[Vertiefung]
Lege einen leeren Warenkorb `basket` an und füge «Zelt» und «Schlafsack» hinzu. Füge danach «Zelt» ein zweites Mal hinzu, aber nur, wenn es noch nicht im Warenkorb liegt. Am Schluss soll das Programm `2 Zelt + Schlafsack` ausgeben.

:::solution[Lösung]
::code{file="examples/js/objects-and-arrays/{lang}/solution-2.mjs"}

`includes` verhindert das doppelte Zelt, `join(' + ')` verbindet die Namen zu einem Text. `basket` ist mit `const` angelegt und lässt sich trotzdem füllen, weil `push` das Array verändert und nicht die Variable.
:::
::::

::::exercise[Knobelei]
Gegeben ist `const reservation = { item: { name: 'Beamer' }, from: '2026-11-07' }`. Hole mit einer einzigen Destrukturierung den Namen des Dings als `name`, das Ende als `to` mit dem Anfang als Standardwert und die Bemerkung als `note`. Gib danach die E-Mail-Adresse des Mitglieds aus oder «keine E-Mail», ohne dass das Programm abbricht.

:::solution[Lösung]
::code{file="examples/js/objects-and-arrays/{lang}/solution-3.mjs"}

Die Ausgabe ist `Beamer 2026-11-07 undefined` und danach `keine E-Mail`. `item: { name }` steigt in das innere Objekt hinab, `item` selbst wird dabei keine Variable. `to = reservation.from` greift, weil es kein `to` gibt, und `note` bleibt `undefined`. `reservation.member` fehlt, darum bricht `?.` ab, bevor `.email` gelesen wird, und `??` setzt den Text ein.
:::
::::
