---
title: JSON und Datenformate
description: Der Tresen-Helfer schreibt die neun Dinge als JSON, liest sie wieder ein und speichert die Favoriten als Text. JSON.stringify und JSON.parse, was JSON nicht kennt, Datumswerte und Kopien mit structuredClone.
sidebar:
  order: 9
---

::::step{n="9"}
Er zeigt die neun Dinge auf einer Seite, und ein Klick auf «Reservieren» reserviert ein Ding. In diesem Schritt schreibt er die neun Dinge als JSON, liest sie wieder ein und merkt sich die Favoriten eines Mitglieds als Text.

:::details[Code bis Schritt 8]
::code{file="examples/js/dom-and-events/{lang}/desk.html"}
:::
::::

JSON ist das Format, in dem Server und Browser Daten austauschen. Auch was eine App im Browser speichert, etwa die Favoriten, liegt meist als JSON-Text vor. JSON sieht aus wie JavaScript, kennt aber weniger Typen, und genau dort entstehen die typischen Fehler. Die Freiwilligen von Lorraine Commons haben ihre Tabelle mit 60 Dingen als JSON exportiert, mit diesem Export arbeitest du ab Teil 1. Der Tresen-Helfer macht dasselbe im Kleinen mit seinen neun Dingen.

:::goals
Nach diesem Schritt kannst du

- Daten mit `JSON.stringify` in Text verwandeln und mit `JSON.parse` zurückholen,
- sagen, welche Werte JSON nicht kennt und was mit ihnen passiert,
- Datumswerte durch JSON hindurch erhalten,
- Objekte mit `structuredClone` samt allen inneren Objekten kopieren.
:::

## Daten in Text verwandeln und zurück

`JSON.stringify` verwandelt einen Wert in Text, `JSON.parse` liest den Text wieder ein. Der Text folgt strengen Regeln. Schlüssel und Strings stehen in doppelten Anführungszeichen, und es gibt nur Objekte, Arrays, Strings, Zahlen, `true`, `false` und `null`.

::code{file="examples/js/json/{lang}/stringify.mjs"}

Aus dem Zelt wird ein einziger String ohne Leerzeichen zwischen den Feldern, wie `typeof` bestätigt. `JSON.parse` macht daraus wieder ein Objekt, und das Pfand ist darin wieder die Zahl 50. Es ist aber ein neues Objekt, darum ist `back === tent` falsch. Mit dem dritten Argument, hier 2, rückt `JSON.stringify` den Text zum Lesen ein.

Bei einfachen Anführungszeichen oder einem Komma am Schluss wirft `JSON.parse` einen `SyntaxError`. JSON schreibst du darum nicht von Hand, sondern mit `JSON.stringify`.

## Der Katalog als Export

Der Tresen-Helfer schreibt seine neun Dinge mit `JSON.stringify` in einen Text, wie es die Freiwilligen mit der ganzen Tabelle gemacht haben. Danach liest er den Text wieder ein und zählt, was da ist.

::code{file="examples/js/json/{lang}/desk.mjs"}

Die erste Zeile der Ausgabe ist der Export, ein einziger langer Text. Er lässt sich in eine Datei schreiben, an einen Server schicken oder im Browser speichern. `JSON.parse` liefert ein neues Array mit neuen Objekten, und die Schleife aus Schritt 4 zählt darin wie vorher 6 von 9 Dingen. Die Favoriten von M-117 werden zum Text `[3,6,8]`, so wie der Browser sie speichert. Nach `JSON.parse` sind es wieder Zahlen, und `includes` findet die Dinge mit diesen ids.

## Datumswerte und fehlende Felder

Eine Reservation hat ein Datum, und eine Bemerkung fehlt oft. JSON kennt beides nicht, es gibt darin weder `Date` noch `undefined`.

::code{file="examples/js/json/{lang}/dates.mjs"}

`JSON.stringify` schreibt das Datum als Text im Format ISO 8601. Das Feld `note` fehlt im Text ganz, weil JSON `undefined` nicht kennt, darum hat das gelesene Objekt nur noch vier Schlüssel. `from` ist nach `JSON.parse` ein String. `new Date(back.from)` macht wieder ein Datum daraus, und `getUTCDay` liefert 6, einen Samstag. Die Abbildung zeigt den Weg der Reservation.

![Eine Reservation durch JSON und zurück. Oben die Reservation als Objekt mit den Feldern itemId 6, member M-117, from als Date für den 7. November 2026, days 4 und note mit dem Wert undefined. JSON.stringify macht daraus einen einzigen String. Darin steht from als Text im Format ISO 8601, und note fehlt. JSON.parse liest den String als neues Objekt. Dort ist from ein String und kein Date mehr, und das Feld note gibt es nicht.](../../../assets/figures/de/j9-json-round-trip.svg)

Die Tabelle zeigt, was JSON aus Werten macht, die es nicht kennt.

| Wert in JavaScript | Was in JSON daraus wird |
|---|---|
| `undefined` und Funktionen in einem Objekt | das Feld fehlt |
| `undefined` und Funktionen in einem Array | `null` |
| `Date` | ein Text wie `"2026-11-07T00:00:00.000Z"` |
| `NaN` und `Infinity` | `null` |
| `Map` und `Set` | ein leeres Objekt `{}` |

## Kopien

Weil `JSON.parse` immer neue Objekte erzeugt, kopieren manche Programme Daten mit `JSON.parse(JSON.stringify(original))`. Das kopiert auch verschachtelte Objekte, verliert aber alles, was JSON nicht kennt. `structuredClone` kopiert ebenfalls alle Ebenen und erhält dabei auch Datumswerte, `Map` und `Set`. Alle grossen Browser kennen es seit 2022.

::code{file="examples/js/json/{lang}/copy.mjs"}

Der Spread-Operator aus Schritt 4 kopiert nur die oberste Ebene. `spread.parts` ist dasselbe Array wie `tent.parts`, darum hat nach dem `push` auch das Zelt drei Teile. Die Kopien mit `structuredClone` und über JSON haben je ein eigenes Array mit zwei Teilen. Nur bei `structuredClone` bleibt `availableFrom` ein `Date`, die Kopie über JSON hat dort einen Text.

`structuredClone` kann keine Funktionen kopieren und wirft in diesem Fall einen Fehler. Für Daten, die von einem Server kommen, spielt das keine Rolle, denn sie enthalten keine Funktionen.

## Aufgaben

::::exercise[Einstieg]
Lies den JSON-Text `'{"id": 6, "name": "Beamer", "deposit": 80, "availableFrom": null}'` mit `JSON.parse`. Gib den Namen aus, «da» oder «ausgeliehen» und das Pfand, das ein Mitglied zahlt, wenn es den Beamer zusammen mit der Leiter für CHF 20 Pfand ausleiht.

:::solution[Lösung]
::code{file="examples/js/json/{lang}/solution-1.mjs"}

Die Ausgabe ist `Beamer da 100`. Nach `JSON.parse` ist `deposit` die Zahl 80 und `availableFrom` der Wert `null`, darum funktionieren `isIn` aus Schritt 3 und die Addition direkt. Stünde im Text `"80"` in Anführungszeichen, käme `8020` heraus.
:::
::::

::::exercise[Vertiefung]
Der Browser speichert die Favoriten eines Mitglieds als JSON-Text. Ein Eintrag kann aber kaputt sein, etwa `[3,6,`. Schreib eine Funktion `readFavorites(text)`, die den Text liest und bei einem kaputten Text eine leere Liste liefert, statt das Programm abzubrechen.

:::solution[Lösung]
::code{file="examples/js/json/{lang}/solution-2.mjs"}

`JSON.parse` wirft beim kaputten Text einen `SyntaxError`. `catch` fängt ihn ab wie in [J7 Fehler behandeln](../errors/), meldet ihn und gibt `[]` zurück. So startet die App auch mit einem kaputten Eintrag, nur eben ohne Favoriten.
:::
::::

::::exercise[Knobelei]
Die Favoriten von M-117 liegen in einem `Set`, `{ member: 'M-117', favorites: new Set([3, 6, 8]) }`. Was macht `JSON.stringify` aus diesen Einstellungen? Speichere sie so, dass die Nummern der Favoriten erhalten bleiben, und mach beim Lesen wieder ein `Set` daraus.

:::solution[Lösung]
::code{file="examples/js/json/{lang}/solution-3.mjs"}

Ein `Set` hat keine Felder, die JSON sehen könnte, darum wird es zu `{}`, und die Favoriten sind weg. Mit `[...settings.favorites]` wird das `Set` vor dem Speichern zu einem Array. Beim Lesen macht `new Set(back.favorites)` wieder ein `Set` daraus, und `has(6)` findet den Beamer.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Der Export wird wie ein Array behandelt, und `text.length` zählt Zeichen statt Dinge. | `JSON.stringify` liefert einen String. Erst `JSON.parse` macht wieder ein Array daraus. |
| Nach `JSON.parse` ist ein Datum ein String, und `back.from.getUTCDay()` wirft einen `TypeError`. | Den Text nach dem Lesen mit `new Date(...)` wieder in ein Datum verwandeln. |
| JSON wird von Hand mit einfachen Anführungszeichen oder einem Komma am Schluss geschrieben. | JSON mit `JSON.stringify` erzeugen, nicht von Hand. |
| Ein `Set` wird gespeichert und kommt als `{}` zurück. | Vor dem Speichern in ein Array verwandeln, `[...set]`. |
| `JSON.parse` steht ohne `try`, und ein kaputter Eintrag im Speicher legt die App lahm. | Gelesene Daten in `try` und `catch` einpacken wie in der Aufgabe «Vertiefung». |
| Ein KI-Assistent kopiert Daten mit `JSON.parse(JSON.stringify(...))`. | `structuredClone` verwenden, das auch Datumswerte erhält. |

## Selbstcheck

::::selfcheck
1. Was liefert `typeof JSON.stringify(items)`, und was macht `JSON.parse` aus diesem Text?
2. Warum ist `from` nach `JSON.parse` kein `Date` mehr?
3. Was unterscheidet eine Kopie mit `{ ...tent }` von einer mit `structuredClone(tent)`?

:::solution[Antworten]
1. `'string'`. `JSON.parse` macht aus dem Text ein neues Array mit neuen Objekten, die denselben Inhalt haben.
2. JSON kennt keinen Typ für Datumswerte. `JSON.stringify` schreibt das Datum als Text, und `JSON.parse` weiss nicht, dass dieser Text ein Datum war.
3. Spread kopiert nur die oberste Ebene, innere Arrays und Objekte teilen sich Original und Kopie. `structuredClone` kopiert alle Ebenen und erhält dabei auch `Date`, `Map` und `Set`.
:::
::::

:::next
In Schritt 10 zeigt der Tresen-Helfer das Pfand in Franken und die Daten, ab denen ausgeliehene Dinge wieder verfügbar sind, auf Deutsch. Weiter geht es mit [J10 Zahlen und Daten formatieren](../formatting/).
:::
