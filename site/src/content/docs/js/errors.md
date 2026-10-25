---
title: Fehler behandeln
description: Fehler mit throw auslösen, mit try, catch und finally abfangen, die eingebauten Fehlertypen und eigene Fehlerklassen.
sidebar:
  order: 7
---

Programme scheitern an Eingaben, die nicht passen, an Servern, die nicht antworten, und an Daten, die anders aussehen als erwartet. In Teil 1 und Teil 7 lädst du Daten von einem Server und musst dort mit solchen Fehlern umgehen. Diese Einheit zeigt die Grundlagen.

:::goals
Nach dieser Einheit kannst du

- einen Fehler mit `throw` auslösen und eine verständliche Meldung mitgeben,
- Fehler mit `try` und `catch` abfangen und erklären, wann `finally` läuft,
- die häufigsten Fehlertypen von JavaScript erkennen,
- eine eigene Fehlerklasse schreiben und Fehler gezielt behandeln.
:::

## Fehler auslösen und abfangen

`throw` löst einen Fehler aus. Das Programm bricht an dieser Stelle ab und springt zum nächsten passenden `catch`. Gibt es keines, endet das ganze Programm mit der Meldung des Fehlers.

::code{file="examples/js/errors/{lang}/parse.mjs"}

`parseDeposit` wirft einen `RangeError`, wenn der Text keine gültige Zahl ist oder die Zahl negativ wäre. Die Schleife ruft die Funktion in einem `try`-Block auf. Bei `'20'` läuft alles normal. Bei `'-5'` und `'zwanzig'` springt das Programm in den `catch`-Block, der Name und Meldung des Fehlers ausgibt. Der `finally`-Block läuft in jedem Fall, mit oder ohne Fehler. Er eignet sich zum Aufräumen, etwa um eine Ladeanzeige auszublenden.

## Fehlertypen

JavaScript kennt mehrere eingebaute Fehlertypen. Die meisten wirft die Sprache selbst.

| Typ | Wann er auftritt | Beispiel |
|---|---|---|
| `TypeError` | ein Wert hat nicht den erwarteten Typ | `undefined.name` |
| `ReferenceError` | eine Variable gibt es nicht | ein Tippfehler im Namen einer Variablen |
| `SyntaxError` | Code oder JSON ist nicht gültig | `JSON.parse("{ 'name': 'Zelt' }")` |
| `RangeError` | ein Wert liegt ausserhalb des erlaubten Bereichs | `(20).toFixed(200)` |
| `Error` | allgemeiner Fehler für eigene Fälle | `throw new Error('Server nicht erreichbar')` |

Jeder Fehler hat ein Feld `name` mit dem Typ und ein Feld `message` mit der Meldung. In der Konsole siehst du ausserdem den Stack, die Kette der Aufrufe bis zu der Stelle, an der der Fehler auftrat.

## Eigene Fehlerklassen

Für Fehler, die zur eigenen App gehören, lohnt sich eine eigene Klasse. Sie erbt von `Error` und kann zusätzliche Felder tragen.

::code{file="examples/js/errors/{lang}/custom.mjs"}

`NotAvailableError` ruft mit `super` den Konstruktor von `Error` auf, setzt einen eigenen Namen und merkt sich das Ding. Der `catch`-Block prüft mit `instanceof`, ob es dieser Fehler ist. Andere Fehler wirft er mit `throw error` weiter, denn an dieser Stelle weiss das Programm nicht, wie es mit ihnen umgehen soll. Die Reservation der Bohrmaschine klappt, beim Zelt springt das Programm in den `catch`-Block.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein leerer `catch`-Block verschluckt jeden Fehler, und niemand merkt etwas. | Den Fehler mindestens mit `console.error` ausgeben oder weiterwerfen. |
| `catch` behandelt alle Fehler gleich, auch Programmierfehler wie einen `TypeError`. | Mit `instanceof` prüfen und unbekannte Fehler weiterwerfen. |
| `throw 'Ungültig'` wirft einen Text statt eines Fehlers, und `error.message` ist `undefined`. | Immer ein Fehlerobjekt werfen, `throw new Error('Ungültig')`. |
| Code nach einem `return` im `try`-Block soll aufräumen und läuft nicht. | Aufräumen in `finally` schreiben, das läuft auch nach einem `return`. |
| Ein KI-Assistent packt jeden Aufruf in `try` und `catch` und gibt nur «Fehler» aus. | Fehler dort behandeln, wo du etwas Sinnvolles tun kannst, und eine Meldung zeigen, die sagt, was passiert ist. |

## Aufgaben

::::exercise[Einstieg]
Schreib eine Funktion `parseDays(text)`, die eine Anzahl Tage aus einem Formularfeld liest. Erlaubt sind ganze Zahlen von 1 bis 7, sonst wirft die Funktion einen `RangeError` mit einer Meldung, die sagt, was erlaubt ist. Teste mit `'3'`, `'9'` und `'2.5'` und gib bei einem Fehler die Meldung aus.

:::solution[Lösung]
::code{file="examples/js/errors/{lang}/solution-1.mjs"}

`Number.isInteger` lehnt `2.5` ab und auch `NaN`, falls jemand Text eingibt. Die Meldung nennt den erlaubten Bereich und den falschen Wert, so weiss das Mitglied, was es ändern muss.
:::
::::

::::exercise[Vertiefung]
Die Einstellungen der App liegen als JSON-Text vor. Schreib eine Funktion `readSettings(text)`, die den Text mit `JSON.parse` liest. Ist der Text kein gültiges JSON, gibt sie eine Meldung in der Konsole aus und liefert die Standardeinstellung `{ pageSize: 20 }`.

:::solution[Lösung]
::code{file="examples/js/errors/{lang}/solution-2.mjs"}

Die Ausgabe ist 50, danach die Meldung mit `SyntaxError` und 20. Der zweite Text ist kein JSON, weil der Schlüssel in doppelten Anführungszeichen und das Ganze in geschweiften Klammern stehen müsste. Das `return` im `catch`-Block sorgt dafür, dass die App mit brauchbaren Werten weiterläuft.
:::
::::

::::exercise[Knobelei]
Läuft `finally` auch dann, wenn der `catch`-Block die Funktion mit `return` verlässt? Schreib eine Funktion `load`, die einen Fehler wirft, ihn abfängt und im `catch`-Block `'fallback'` zurückgibt. Halte in einem Array fest, welche Blöcke in welcher Reihenfolge laufen.

:::solution[Lösung]
::code{file="examples/js/errors/{lang}/solution-3.mjs"}

Die Ausgabe ist `fallback try > catch > finally`. `finally` läuft, nachdem `catch` den Rückgabewert bestimmt hat, aber bevor die Funktion wirklich zurückkehrt. Darum eignet sich `finally` zum Aufräumen, egal auf welchem Weg eine Funktion endet.
:::
::::
