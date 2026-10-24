---
title: JSON und Datenformate
description: Daten mit JSON.stringify in Text verwandeln und mit JSON.parse zurückholen, was JSON nicht kennt, Datumswerte und tiefe Kopien mit structuredClone.
sidebar:
  order: 9
---

JSON ist das Format, in dem Server und Browser Daten austauschen. Auch was eine App im Browser speichert, etwa die Favoriten, liegt meist als JSON-Text vor. JSON sieht aus wie JavaScript, kennt aber weniger Typen, und genau dort entstehen die typischen Fehler.

:::goals
Nach dieser Einheit kannst du

- Daten mit `JSON.stringify` in Text verwandeln und mit `JSON.parse` zurückholen,
- sagen, welche Werte JSON nicht kennt und was mit ihnen passiert,
- Datumswerte durch JSON hindurch erhalten,
- Objekte mit `structuredClone` samt allen inneren Objekten kopieren.
:::

## Daten in Text verwandeln und zurück

`JSON.stringify` verwandelt einen Wert in Text, `JSON.parse` liest den Text wieder ein. Der Text folgt strengen Regeln. Schlüssel und Strings stehen in doppelten Anführungszeichen, und es gibt nur Objekte, Arrays, Strings, Zahlen, `true`, `false` und `null`.

::code{file="examples/js/json/{lang}/stringify.mjs"}

Die erste Zeile zeigt, was JSON aus einem Objekt mit einem Datum macht. Das Datum wird zu einem Text im Format ISO 8601, und das Feld `note` fehlt ganz, weil JSON `undefined` nicht kennt. Nach `JSON.parse` ist `lentUntil` deshalb ein String und kein `Date` mehr. Mit dem dritten Argument, hier 2, rückt `JSON.stringify` den Text zum Lesen ein.

| Wert in JavaScript | Was in JSON daraus wird |
|---|---|
| `undefined` und Funktionen in einem Objekt | das Feld fehlt |
| `undefined` und Funktionen in einem Array | `null` |
| `Date` | ein Text wie `"2026-11-12T00:00:00.000Z"` |
| `NaN` und `Infinity` | `null` |
| `Map` und `Set` | ein leeres Objekt `{}` |

## Kopien

Weil `JSON.parse` immer neue Objekte erzeugt, kopieren manche Programme Daten mit `JSON.parse(JSON.stringify(original))`. Das kopiert auch verschachtelte Objekte, verliert aber alles, was JSON nicht kennt. Seit 2022 gibt es in allen grossen Browsern `structuredClone`, das auch Datumswerte, `Map` und `Set` richtig kopiert.

::code{file="examples/js/json/{lang}/copy.mjs"}

Die Kopie mit `structuredClone` hat ein eigenes Array `parts`, darum ändert `push` das Original nicht. Das Datum bleibt bei `structuredClone` ein `Date`, bei der Kopie über JSON wird es zu Text. Die letzte Zeile zeigt einen Fehler, dem du oft begegnen wirst. JSON verlangt doppelte Anführungszeichen, und bei einfachen wirft `JSON.parse` einen `SyntaxError`.

`structuredClone` kann keine Funktionen kopieren und wirft in diesem Fall einen Fehler. Für Daten, die von einem Server kommen, spielt das keine Rolle, denn sie enthalten keine Funktionen.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Nach `JSON.parse` ist ein Datum ein String, und `date.getDay()` wirft einen `TypeError`. | Den Text nach dem Lesen mit `new Date(...)` wieder in ein Datum verwandeln. |
| JSON wird von Hand mit einfachen Anführungszeichen oder einem Komma am Schluss geschrieben. | JSON mit `JSON.stringify` erzeugen, nicht von Hand. |
| Ein `Set` wird gespeichert und kommt als `{}` zurück. | Vor dem Speichern in ein Array verwandeln, `[...set]`. |
| `JSON.parse` steht ohne `try`, und ein kaputter Eintrag im Speicher legt die App lahm. | Gelesene Daten in `try` und `catch` einpacken, wie in der Einheit [Fehler behandeln](../errors/). |
| Ein KI-Assistent kopiert Daten mit `JSON.parse(JSON.stringify(...))`. | `structuredClone` verwenden, das auch Datumswerte erhält. |

## Aufgaben

::::exercise[Einstieg]
Lies den JSON-Text `'{"id": 6, "name": "Beamer", "deposit": 80, "available": false}'` mit `JSON.parse`. Gib den Namen aus, das halbe Pfand und «frei» oder «ausgeliehen», je nachdem, was in `available` steht.

:::solution[Lösung]
::code{file="examples/js/json/{lang}/solution-1.mjs"}

Die Ausgabe ist `Beamer 40 ausgeliehen`. Nach `JSON.parse` ist `deposit` eine Zahl und `available` ein Wahrheitswert, damit lässt sich direkt rechnen und entscheiden.
:::
::::

::::exercise[Vertiefung]
Verwandle die Reservation `{ item: 'Zelt', from: new Date('2026-11-02T00:00:00Z') }` in JSON und wieder zurück. Sorge dafür, dass `from` danach wieder ein `Date` ist, und gib den Tag des Monats aus.

:::solution[Lösung]
::code{file="examples/js/json/{lang}/solution-2.mjs"}

Der JSON-Text enthält das Datum als Text im Format ISO 8601. `new Date(back.from)` liest diesen Text wieder als Datum. `getUTCDate` liefert den Tag in UTC, so kommt überall auf der Welt die 2 heraus.
:::
::::

::::exercise[Knobelei]
Die Favoriten eines Mitglieds liegen in einem `Set`, `{ pageSize: 20, favorites: new Set([3, 7]) }`. Was macht `JSON.stringify` aus diesen Einstellungen? Speichere sie so, dass die Nummern der Favoriten erhalten bleiben.

:::solution[Lösung]
::code{file="examples/js/json/{lang}/solution-3.mjs"}

Ein `Set` hat keine Felder, die JSON sehen könnte, darum wird es zu `{}`, und die Favoriten sind weg. Mit `[...settings.favorites]` wird das `Set` vor dem Speichern zu einem Array. Beim Lesen machst du mit `new Set(array)` wieder ein `Set` daraus.
:::
::::
