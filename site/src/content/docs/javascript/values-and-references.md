---
title: Werte und Referenzen
description: Wie sich primitive Werte und Objekte beim Zuweisen unterscheiden, Kopien mit Spread und structuredClone, Vergleiche und Änderungen, die das Original unverändert lassen.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler meldet einen Fehler. Der Verein hat zwei weitere Zelte für vier Personen gekauft, und ein Freiwilliger hat sie mit einer kleinen Funktion in den Katalog eingetragen.

> Seit die neuen Zelte im Katalog sind, passiert etwas Seltsames. Leiht jemand eines davon aus, steht das andere auch als ausgeliehen da. Dabei haben wir zwei.

Die Akzeptanzkriterien lauten:

1. Jedes Zelt ist im Katalog ein eigener Eintrag mit einer eigenen Nummer.
2. Wer ein Zelt ausleiht, ändert nur dieses eine Zelt.
3. Die Teile eines Zelts, etwa die Heringe, gehören nur zu diesem Zelt.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, wie sich primitive Werte und Objekte beim Zuweisen unterscheiden,
- Fehler finden, bei denen zwei Variablen auf dasselbe Objekt zeigen,
- Objekte und Arrays mit Spread flach und mit `structuredClone` tief kopieren,
- Objekte vergleichen und Daten ändern, ohne das Original zu verändern.
:::

## Werte und Verweise

Weist du eine Zahl einer zweiten Variablen zu, bekommt diese eine Kopie des Werts. Bei einem Objekt kopiert JavaScript dagegen nur den Verweis darauf, auf Englisch die Referenz. Beide Variablen zeigen danach auf dasselbe Objekt.

::code{file="examples/01-javascript/values-and-references/{lang}/references.mjs"}

`copy += 1` ändert nur `copy`, `count` bleibt 3. `sameTent` ist dagegen kein zweites Zelt, sondern ein zweiter Name für dasselbe Objekt. Was du über den einen Namen änderst, siehst du über den anderen.

![Zwei Variablen, ein Objekt. Links stehen die Variablen tent, sameTent und copy, rechts zwei Objekte im Speicher. Von tent und von sameTent führt je ein Pfeil zum selben Objekt, in dem availableFrom gleich 2026-11-14 steht. Von copy führt ein Pfeil zu einem zweiten Objekt, das mit dem Spread-Operator entstanden ist.](../../../assets/figures/de/p1c2-references.svg)

So verhalten sich alle Objekte, also auch Arrays, Datumswerte und Funktionen. Kopiert werden nur die primitiven Werte, Strings, Zahlen, Wahrheitswerte, `null` und `undefined`.

## Objekte in Funktionen

Eine Funktion bekommt beim Aufruf dieselben Verweise wie die Variablen, die du übergibst. Sie kann ein übergebenes Objekt deshalb ändern.

::code{file="examples/01-javascript/values-and-references/{lang}/params.mjs"}

`markAsLent` ändert das Objekt, auf das auch `drill` zeigt. `shout` weist ihrem Parameter `name` dagegen einen neuen Wert zu. Das ändert nur die Variable in der Funktion, die Variable `name` ausserhalb bleibt, wie sie war. Eine Funktion, die übergebene Objekte ändert, hat eine Nebenwirkung, die beim Aufruf niemand sieht. Solche Funktionen sind die häufigste Quelle für Fehler wie den mit den Zelten.

## Der Fehler mit den Zelten

Die Funktion des Freiwilligen sieht harmlos aus. Lies sie und sag voraus, was die beiden Zeilen am Schluss ausgeben.

::code{file="examples/01-javascript/values-and-references/{lang}/bug.mjs"}

Die Schleife schiebt zweimal dasselbe Objekt ins Array. `items[0]` und `items[1]` sind ein einziges Zelt mit zwei Plätzen in der Liste. Darum ist nach dem Ausleihen von `items[0]` auch `items[1]` ausgeliehen. Auch die Nummern verraten den Fehler. Der zweite Durchgang hat die Nummer des einen Objekts überschrieben, beide Plätze zeigen 2. Für jedes Zelt braucht es ein eigenes Objekt.

## Kopien

Der Spread-Operator `...` überträgt alle Felder eines Objekts in ein neues Objekt. Bei Arrays überträgt er alle Elemente in ein neues Array.

::code{file="examples/01-javascript/values-and-references/{lang}/copies.mjs"}

Nach `{ ...tent }` hat die Kopie ihr eigenes Feld `availableFrom`, das Ausleihen der Kopie lässt das Original unverändert. Das Array `parts` hat Spread aber nicht kopiert, nur den Verweis darauf. Original und Kopie teilen sich die Teile, darum hat das Original danach drei. Spread kopiert flach, nur die oberste Ebene.

`structuredClone` kopiert tief, mit allen Objekten und Arrays darin, auch mit Datumswerten, `Map` und `Set`. Funktionen kann `structuredClone` nicht kopieren und meldet dann einen Fehler, und bei Objekten einer Klasse geht die Klasse verloren. Für Daten wie den Katalog, die als JSON vom Server kommen, passt es.

## Vergleichen

`===` vergleicht bei Objekten die Verweise, nicht den Inhalt.

::code{file="examples/01-javascript/values-and-references/{lang}/compare.mjs"}

Zwei Objekte mit gleichem Inhalt sind nicht gleich, zwei gleiche Strings schon. Dinge im Katalog vergleichst du deshalb über ein Feld, das jedes Ding eindeutig macht, die Nummer `id`. Der Vergleich über `JSON.stringify` funktioniert hier, ist aber unzuverlässig, weil er von der Reihenfolge der Felder abhängt und Datumswerte zu Text macht.

## Ändern ohne Nebenwirkung

Statt ein Ding im Katalog zu ändern, kann eine Funktion eine neue Liste zurückgeben, in der nur das geänderte Ding ein neues Objekt ist. `map` aus dem nächsten Kapitel baut dafür eine neue Liste aus der alten.

::code{file="examples/01-javascript/values-and-references/{lang}/update.mjs"}

Die alte Liste bleibt, wie sie war. Die neue Liste übernimmt alle Dinge, die sich nicht geändert haben, als Verweis, nur das ausgeliehene Zelt ist ein neues Objekt. Das kostet wenig Speicher, und ein einziger Vergleich mit `===` zeigt, ob sich ein Ding geändert hat. React zum Beispiel erkennt Änderungen am Zustand genau so. Vue bemerkt zwar auch Änderungen an bestehenden Objekten, wie Teil 5 zeigt. Eine Funktion ohne Nebenwirkung bleibt trotzdem leichter zu verstehen und zu testen, weil sie nur über ihren Rückgabewert wirkt.

## Im Code

Arbeite mit dem Beispiel des Freiwilligen. Lies zuerst den Code und schreib auf, was du erwartest.

::code{file="examples/01-javascript/values-and-references/{lang}/bug.mjs"}

1. Was gibt `console.log(items.length)` am Schluss aus? Prüfe es mit «Bearbeiten» und «Ausführen».
2. Ersetze `items.push(thing)` durch `items.push({ ...thing, id: items.length + 1 })` und lösche die Zeile davor. Was geben die beiden Zeilen jetzt aus?
3. Gib dem Zelt ein Feld `parts: ['Heringe']` und hänge nach dem Aufruf bei `items[0].parts` ein weiteres Teil an. Was zeigt `items[1].parts`?
4. Wie musst du die Zeile aus Schritt 2 ändern, damit auch die Teile nicht mehr geteilt werden?

## Aufgaben

Die Aufgaben arbeiten mit den Funktionen des Freiwilligen. Du findest sie im Kursrepo im Ordner `exercises/01-javascript/references/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Korrigiere `addCopies` in `src/catalog.js`. Jede Kopie soll ein eigenes Objekt mit der nächsten freien Nummer sein, und das übergebene Ding soll unverändert bleiben. Die Tests in `level-1.test.js` prüfen das.

:::solution[Lösung]
Eine Zeile genügt, `items.push({ ...thing, id: items.length + 1 })`. Spread legt bei jedem Durchgang ein neues Objekt an und übernimmt alle Felder, `id` dahinter überschreibt die Nummer. Weil die Funktion `thing.id` nicht mehr setzt, bleibt das übergebene Ding unverändert. Die Lösung der Knobelei ersetzt die Zeile später durch eine tiefe Kopie.
:::
::::

::::exercise[Vertiefung]
`lend` ändert das Ding im übergebenen Array. Schreib die Funktion so um, dass sie eine neue Liste zurückgibt und die alte Liste mit ihren Dingen unverändert lässt. Alle Dinge ausser dem ausgeliehenen sollen in der neuen Liste dieselben Objekte bleiben.

:::solution[Lösung]
::code{file="exercises/01-javascript/references/solution/{lang}/src/catalog.js" lines="9-12"}

`map` erzeugt eine neue Liste. Für das gesuchte Ding entsteht mit Spread ein neues Objekt mit dem neuen Datum, alle anderen Dinge übernimmt `map` unverändert. Der dritte Test prüft genau das mit `toBe`, also mit `===`.
:::
::::

::::exercise[Knobelei]
Zelte haben Teile, etwa `parts: ['Heringe', 'Gestänge']`. Ändere `addCopies` so, dass jede Kopie ihre eigenen Teile hat und die Teile der Vorlage unverändert bleiben, wenn jemand bei einer Kopie ein Teil ergänzt oder entfernt.

:::solution[Lösung]
::code{file="exercises/01-javascript/references/solution/{lang}/src/catalog.js" lines="1-7"}

Mit Spread allein teilen sich alle Kopien dasselbe Array `parts`. `structuredClone` kopiert das Ding mit allen Arrays darin, danach setzt Spread die neue Nummer. Die Reihenfolge ist wichtig, `id` muss nach dem kopierten Ding stehen, sonst überschreibt die alte Nummer die neue.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `const copy = original` soll eine Kopie sein. | Mit `{ ...original }` oder `[...original]` kopieren. |
| Nach einer Kopie mit Spread ändert sich ein Array oder Objekt darin auch im Original. | Spread kopiert flach. Für verschachtelte Daten `structuredClone` verwenden. |
| `sort`, `push`, `splice` oder `reverse` ändern ein Array, das auch andere verwenden. | Mit einer Kopie arbeiten oder Methoden wie `toSorted` und `toReversed` nehmen, die ein neues Array liefern. |
| Zwei Dinge werden mit `===` verglichen und sind nie gleich. | Die Nummern vergleichen, `a.id === b.id`. |
| `structuredClone` meldet `DataCloneError`. | Das Objekt enthält eine Funktion oder einen anderen Wert, den es nicht kopieren kann. Nur die Daten kopieren. |
| Ein KI-Assistent kopiert tief mit `JSON.parse(JSON.stringify(...))`. | `structuredClone` verwenden, das auch Datumswerte, `Map` und `Set` richtig kopiert. |

## Selbstcheck

::::selfcheck
1. Was gibt `const a = { n: 1 }; const b = a; b.n = 2; console.log(a.n)` aus, und warum?
2. Wann genügt eine Kopie mit Spread, und wann braucht es `structuredClone`?
3. Eine Funktion bekommt ein Array und ruft darauf `sort()` auf. Was merkt die Stelle, die sie aufgerufen hat?
4. Warum lässt sich mit `===` schnell erkennen, ob sich ein Ding geändert hat, wenn Funktionen nie bestehende Objekte ändern?

:::solution[Antworten]
1. `2`. `b` zeigt auf dasselbe Objekt wie `a`, die Zuweisung hat nur den Verweis kopiert.
2. Spread genügt, wenn das Objekt nur primitive Werte enthält oder die inneren Objekte sich nicht ändern. Sobald Arrays oder Objekte darin geändert werden, braucht es `structuredClone`.
3. Ihr Array ist danach sortiert. `sort` ändert das Array selbst, die Funktion hat eine Nebenwirkung.
4. Jede Änderung erzeugt ein neues Objekt. Ist ein Ding noch dasselbe Objekt wie vorher, hat es sich nicht geändert, ohne dass jemand die Felder einzeln vergleichen muss.
:::
::::

:::assignment
Die Zelte sind korrigiert, und Martina Hostettler bereitet die nächste Vorstandssitzung vor. Der Vorstand möchte wissen, wie viele Dinge es in jeder Kategorie gibt, und am Tresen fragen Freiwillige, welches Werkzeug gerade da ist. Für solche Auswertungen bringt JavaScript Methoden mit, die eine ganze Liste mit einer Funktion bearbeiten. Darum geht es im nächsten Kapitel.
:::
