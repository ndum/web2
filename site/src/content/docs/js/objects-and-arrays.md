---
title: Objekte und Arrays
description: Der Tresen-Helfer nimmt die neun Dinge vom Tresen als Objekte in ein Array auf. Objekte und Arrays anlegen und lesen, Verweise und Kopien, Destrukturieren und optionale Verkettung.
sidebar:
  order: 4
---

::::step{n="4"}
Er kennt die Bohrmaschine, weiss, ob ein Ding da ist, und rechnet die Tage einer Ausleihe. In diesem Schritt nimmt er die neun Dinge vom Tresen als Objekte in ein Array auf und zählt, was da ist.

:::details[Code bis Schritt 3]
::code{file="examples/js/functions/{lang}/desk.mjs"}
:::
::::

Die Daten einer App sind fast immer Objekte und Arrays. Ein Ding im Katalog ist ein Objekt, der Katalog ein Array solcher Objekte. Vue macht diese Daten später reaktiv, die Grundlagen bleiben dieselben.

:::goals
Nach diesem Schritt kannst du

- Objekte und Arrays anlegen, ihre Werte lesen und ändern,
- mit einer Schleife über ein Array von Objekten gehen,
- erklären, warum zwei Variablen auf dasselbe Objekt zeigen können,
- Werte mit Destrukturieren herausholen und fehlende Werte mit `?.` abfangen.
:::

## Ein Ding als Objekt

Bisher standen die Angaben zur Bohrmaschine in einzelnen Variablen. Ein Objekt fasst solche Werte unter Namen zusammen, den Schlüsseln. Du liest einen Wert mit einem Punkt, `item.deposit`, oder mit eckigen Klammern, wenn der Schlüssel in einer Variablen steht.

::code{file="examples/js/objects-and-arrays/{lang}/item.mjs"}

`item[field]` liest den Schlüssel, dessen Namen `field` enthält, hier `availableFrom`. Ein Objekt lässt sich nach dem Anlegen erweitern. `item.category = 'Küche'` fügt einen neuen Schlüssel hinzu, obwohl `item` mit `const` angelegt ist. `Object.keys` liefert alle Schlüssel als Array, `Object.values` die Werte und `Object.entries` beides als Paare.

## Der Katalog als Array

Ein Array ist eine geordnete Liste. Die Zählung der Stellen beginnt bei 0, `items[0]` ist das erste Ding, und `items.length` sagt, wie viele es sind. Die Abbildung zeigt, wo der Raclette-Ofen im Katalog landet.

![Ein Ding als Objekt im Array. Links ein Objekt für den Raclette-Ofen mit den Schlüsseln id, name, deposit und availableFrom und ihren Werten 3, Raclette-Ofen, 30 und null. Ein Pfeil führt in ein Array mit den neun Dingen des Katalogs. Das Objekt steht dort an der dritten Stelle, items\[2\], nach der Bohrmaschine in items\[0\] und dem Zelt für vier Personen in items\[1\]. Die übrigen sechs Dinge stehen in items\[3\] bis items\[8\].](../../../assets/figures/de/j4-object-in-array.svg)

Im Tresen-Helfer stehen die neun Dinge vom Tresen in einem Array, eines pro Zeile. Eine Schleife aus Schritt 2 geht sie der Reihe nach durch, und `isIn` aus Schritt 3 sagt, ob ein Ding da ist. Was da ist, zählt `inStock`, das Pfand der ausgeliehenen Dinge zählt `depositOut`.

::code{file="examples/js/objects-and-arrays/{lang}/desk.mjs"}

`for...of` liefert in jeder Runde das nächste Objekt, darum heisst die Variable `item` und nicht `i`. Ein neues Ding hängt `push` hinten an, und die Länge wächst um eins. `includes` prüft, ob ein Wert vorkommt, und `indexOf` liefert seine Stelle oder -1, wenn er fehlt.

## Verweise und Kopien

Eine Variable enthält nicht das Objekt selbst, sondern einen Verweis darauf. Weist du ein Ding einer zweiten Variablen zu, zeigen beide auf dasselbe Objekt.

::code{file="examples/js/objects-and-arrays/{lang}/references.mjs"}

`sameDrill` ist keine zweite Bohrmaschine, sondern ein zweiter Name für dieselbe. Änderst du über `sameDrill` das Pfand, hat auch die Bohrmaschine im Katalog 25 Franken Pfand. Eine Kopie entsteht mit dem Spread-Operator `...`, der alle Felder in ein neues Objekt überträgt. Felder, die danach folgen, überschreiben die kopierten, darum hat `copy` wieder 20 Franken. Bei Arrays funktioniert Spread genauso, `[...favorites]` ist ein neues Array mit denselben Werten.

`===` vergleicht bei Objekten die Verweise, nicht den Inhalt. Die Kopie ist darum nicht gleich dem Original, der zweite Name schon. Spread kopiert nur die oberste Ebene. Wie du auch innere Objekte kopierst, zeigt die Einheit [JSON und Datenformate](../json/) mit `structuredClone`. Teil 1 geht im Kapitel [Werte und Referenzen](../../javascript/values-and-references/) genauer darauf ein.

## Destrukturieren und fehlende Werte

Mit Destrukturieren holst du mehrere Werte auf einmal aus einem Array oder einem Objekt. Bei Arrays zählt die Position, bei Objekten der Name.

::code{file="examples/js/objects-and-arrays/{lang}/destructure.mjs"}

`const [first, ...rest] = items` nimmt das erste Ding und sammelt den Rest in einem neuen Array. `const { name, availableFrom, category = 'ohne Kategorie' } = items[1]` holt zwei Felder und setzt einen Standardwert, weil das Zelt in diesem Array keine Kategorie hat. Die letzte Zeile fragt nach dem Namen des Besitzers, den es nicht gibt. Ohne Schutz würde `items[1].owner.name` einen `TypeError` werfen, denn `owner` ist `undefined`. Die optionale Verkettung `?.` bricht in diesem Fall ab und liefert `undefined`, und `??` setzt dafür «Verein» ein.

Destrukturieren funktioniert auch bei Parametern, `function describe({ name, deposit })` holt die Felder direkt aus dem übergebenen Objekt. In Vue begegnet dir das bei Composables, die mehrere Werte in einem Objekt zurückgeben, etwa `const { favorites, toggle } = useFavorites()`.

## Aufgaben

::::exercise[Einstieg]
Lege den Rasenmäher als zehntes Ding an, mit der `id` 10 und CHF 40 Pfand. Er ist gerade da. Hänge ihn mit `push` an den Katalog der neun Dinge und gib die neue Länge und den Namen des letzten Dings aus.

:::solution[Lösung]
::code{file="examples/js/objects-and-arrays/{lang}/solution-1.mjs"}

`push` ändert das Array selbst, darum reicht `const`. Das letzte Ding steht an der Stelle `items.length - 1`, hier an der Stelle 9.
:::
::::

::::exercise[Vertiefung]
Schreibe eine Funktion `byId(items, id)`, die das Ding mit dieser `id` liefert, oder `undefined`, wenn es keines gibt. Prüfe sie mit dem Beamer und mit der `id` 12, die es im Tresen-Helfer nicht gibt.

:::solution[Lösung]
::code{file="examples/js/objects-and-arrays/{lang}/solution-2.mjs"}

Die Schleife gibt das Ding zurück, sobald die `id` passt, und beendet damit auch die Funktion. Findet sie keines, liefert die letzte Zeile `undefined`. Kürzer geht es mit `items.find((item) => item.id === id)`, Teil 1 zeigt diese Methoden der Arrays.
:::
::::

::::exercise[Knobelei]
Ein Mitglied merkt sich seine Favoriten als Array von ids, `[3, 6, 8]`. Es will den Beamer mit der `id` 6 von der Liste nehmen. Kopiere die Liste, bevor du die `id` entfernst, und zeige mit einer Ausgabe, dass die alte Liste gleich bleibt.

:::solution[Lösung]
::code{file="examples/js/objects-and-arrays/{lang}/solution-3.mjs"}

`[...favorites]` legt ein neues Array an. `splice` entfernt an der Stelle, die `indexOf` liefert, ein Element und ändert dabei nur die Kopie. Ohne die Kopie würde `splice` auch die Liste des Mitglieds ändern.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Nach `sameDrill.deposit = 25` hat auch die Bohrmaschine im Katalog 25 Franken Pfand. | `sameDrill` zeigt auf dasselbe Objekt. Mit `{ ...drill }` kopieren, wenn das Original bleiben soll. |
| `items[9]` liefert `undefined`. | Arrays zählen ab 0, das neunte Ding ist `items[8]`, das letzte `items[items.length - 1]`. |
| `item.owner.name` bricht mit einem `TypeError` ab. | `item.owner?.name` schreiben, wenn ein Wert fehlen kann. |
| Zwei Objekte mit gleichem Inhalt sind mit `===` nicht gleich. | Ein eindeutiges Feld wie die `id` vergleichen. |
| `const` soll ein Objekt vor Änderungen schützen. | `const` verhindert nur eine neue Zuweisung der Variablen, die Felder lassen sich weiter ändern. |

## Selbstcheck

::::selfcheck
1. Warum ändert `sameDrill.deposit = 25` auch `items[0]`?
2. Wann brauchst du `item[key]` statt `item.key`?
3. Was liefert `items.length` nach einem `push`, und an welcher Stelle steht das neue Ding?

:::solution[Antworten]
1. `sameDrill` und `items[0]` sind zwei Namen für dasselbe Objekt. Die Zuweisung ändert das Objekt selbst, nicht eine der Variablen.
2. Wenn der Schlüssel in einer Variablen steht oder kein gültiger Name ist, etwa bei `item[field]`.
3. Die alte Länge plus eins. Das neue Ding steht am Ende, an der Stelle `items.length - 1`.
:::
::::

:::next
In Schritt 5 schreibt der Tresen-Helfer für jedes Ding eine Zeile und findet Dinge über ihren Namen. Weiter geht es mit [J5 Strings und Template Literals](../strings/).
:::
