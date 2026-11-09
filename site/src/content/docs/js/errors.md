---
title: Fehler behandeln
description: Der Tresen-Helfer prüft eine Anfrage und lehnt sie mit einem Grund ab, wenn sie gegen eine Regel verstösst. Fehler mit throw auslösen, mit try, catch und finally abfangen, die eingebauten Fehlertypen und eigene Fehlerklassen.
sidebar:
  order: 7
---

::::step{n="7"}
Er hält Reservationen als Objekte einer Klasse fest und rechnet ihre Tage aus. In diesem Schritt prüft er eine Anfrage, bevor er sie annimmt. Passt der Tag nicht, dauert die Ausleihe zu lang oder ist das Ding schon reserviert, lehnt er sie mit einem Grund ab.

:::details[Code bis Schritt 6]
::code{file="examples/js/classes/{lang}/desk.mjs"}
:::
::::

Programme scheitern an Eingaben, die nicht passen, und an Servern, die nicht antworten. Ein Fehler soll das Programm dann nicht einfach beenden, sondern an einer Stelle landen, die weiss, was zu tun ist. In Teil 1 und Teil 7 lädst du Daten von einem Server und brauchst dafür genau diese Grundlagen.

:::goals
Nach diesem Schritt kannst du

- einen Fehler mit `throw` auslösen und ihm eine verständliche Meldung mitgeben,
- Fehler mit `try` und `catch` abfangen und erklären, wann `finally` läuft,
- die häufigsten Fehlertypen von JavaScript erkennen,
- eine eigene Fehlerklasse schreiben und nur die Fehler behandeln, die du kennst.
:::

## Fehler auslösen und abfangen

`throw` löst einen Fehler aus. Das Programm bricht an dieser Stelle ab und springt zum nächsten passenden `catch`. Gibt es keines, endet das ganze Programm mit der Meldung des Fehlers. Ein Beispiel ist das Pfand eines neuen Dings, das die Freiwilligen in ein Formular tippen. Erlaubt sind 10 bis 80 Franken.

::code{file="examples/js/errors/{lang}/parse.mjs"}

`parseDeposit` wirft einen `RangeError`, wenn der Text keine ganze Zahl von 10 bis 80 ergibt. `new RangeError(...)` erzeugt das Fehlerobjekt mit seiner Meldung, und `throw` wirft es. Die Schleife ruft die Funktion in einem `try`-Block auf. Bei `'40'` läuft alles normal. Bei `'5'` und `'vierzig'` springt das Programm in den `catch`-Block, der Name und Meldung des Fehlers ausgibt. Danach macht die Schleife mit dem nächsten Text weiter, denn der Fehler ist abgefangen. Der `finally`-Block läuft in jedem Fall, mit oder ohne Fehler. Er eignet sich zum Aufräumen, etwa um eine Ladeanzeige auszublenden.

## Fehlertypen

JavaScript kennt mehrere eingebaute Fehlertypen. Die meisten wirft die Sprache selbst, wie bei den vier Funktionen in diesem Beispiel.

::code{file="examples/js/errors/{lang}/types.mjs"}

Jede Pfeilfunktion im Array enthält einen typischen Fehler, und die Schleife ruft sie der Reihe nach in `try` auf. `items[1]` gibt es nicht, weil das Array nur ein Ding hat, und `undefined.name` wirft einen `TypeError`. `itemz` ist ein Tippfehler, eine solche Variable gibt es nicht. `JSON.parse` erwartet doppelte Anführungszeichen, und `toFixed` erlaubt höchstens 100 Stellen nach dem Punkt.

| Typ | Wann er auftritt | Beispiel |
|---|---|---|
| `TypeError` | ein Wert hat nicht den erwarteten Typ | `items[1].name`, wenn es `items[1]` nicht gibt |
| `ReferenceError` | eine Variable gibt es nicht | ein Tippfehler wie `itemz` |
| `SyntaxError` | Code oder JSON ist nicht gültig | `JSON.parse("{ 'name': 'Zelt' }")` |
| `RangeError` | ein Wert liegt ausserhalb des erlaubten Bereichs | `(20).toFixed(200)` |
| `Error` | allgemeiner Fehler für eigene Fälle | `throw new Error('Das Ding ist dann schon reserviert')` |

Jeder Fehler hat ein Feld `name` mit dem Typ und ein Feld `message` mit der Meldung. In der Konsole siehst du ausserdem den Stack, die Kette der Aufrufe bis zu der Stelle, an der der Fehler auftrat. Das Beispiel gibt nur `error.name` aus, weil der Wortlaut der Meldungen je nach Browser verschieden ist.

## Eine Anfrage prüfen

Bevor der Tresen-Helfer eine Anfrage annimmt, prüft er sie gegen die Regeln des Vereins. Abholen und Zurückbringen gehen nur am Mittwoch oder Samstag, eine Ausleihe dauert höchstens sieben Tage, und das Ding darf in dieser Zeit nicht schon reserviert sein. Wer am Rückgabetag einer anderen Ausleihe abholt, kommt niemandem in die Quere. Die Abbildung zeigt, an welcher Prüfung jede Anfrage des Tresen-Helfers scheitert und welche durchkommt.

![Eine Anfrage durch checkRequest. Links im Block try die drei Prüfungen von checkRequest untereinander, Mittwoch oder Samstag, höchstens sieben Tage und Ding noch frei, darunter angenommen. Wer eine Prüfung besteht, geht mit ja zur nächsten. Von jeder Prüfung führt ein Pfeil mit throw nach rechts in den Block catch zu der Anfrage, die dort scheitert. Die Bohrmaschine vom 2026-11-09 bis 2026-11-11 scheitert an der ersten Prüfung, der Raclette-Ofen vom 2026-11-07 bis 2026-11-18 an der zweiten und der Beamer vom 2026-11-07 bis 2026-11-11 an der dritten. Der Beamer vom 2026-11-11 bis 2026-11-14 besteht alle drei und wird angenommen, für ihn bleibt catch leer.](../../../assets/figures/de/j7-check-request.svg)

Im Code wirft `checkRequest` für jede verletzte Regel einen Fehler mit dem Grund.

::code{file="examples/js/errors/{lang}/desk.mjs"}

Für die Prüfung braucht der Tresen-Helfer von einer Reservation nur die Nummer des Dings und die beiden Daten, darum stehen die Reservationen hier als einfache Objekte. Die eine Reservation im Array ist R-1 aus Schritt 6.

`isOpenOn` liest mit `getUTCDay` den Wochentag, 0 ist der Sonntag, 3 der Mittwoch und 6 der Samstag. `new Date('2026-11-09')` steht für Mitternacht in UTC, darum liefert `getUTCDay` überall auf der Welt denselben Tag. `checkRequest` gibt nichts zurück. Läuft die Funktion ohne `throw` durch, ist die Anfrage in Ordnung, und die Schleife gibt «angenommen» aus. Sobald eine Prüfung einen Fehler wirft, verlässt das Programm `checkRequest` und den Rest des `try`-Blocks und landet im `catch`-Block, der den Grund aus `error.message` ausgibt. Die Anfrage für die Bohrmaschine scheitert an der ersten Prüfung, denn der 9. November ist ein Montag.

Die letzte Prüfung vergleicht ISO-Daten als Text. Zwei Ausleihen überschneiden sich, wenn jede beginnt, bevor die andere endet. Weil der Vergleich mit dem strengen `<` arbeitet, darf die erste Anfrage den Beamer am 11. November abholen, an dem Tag, an dem er zurückkommt.

## Eigene Fehlerklassen

Für Fehler, die zur eigenen App gehören, lohnt sich eine eigene Klasse. Sie erbt mit `extends` von `Error` und kann zusätzliche Felder tragen. Der `catch`-Block erkennt den Fehler dann an seiner Klasse und nicht an seinem Text.

::code{file="examples/js/errors/{lang}/custom.mjs"}

`NotAvailableError` ruft mit `super` den Konstruktor von `Error` auf, der die Meldung speichert. Danach setzt die Klasse einen eigenen Namen und merkt sich das Ding im Feld `item`. Die Bohrmaschine ist da und wird ohne Fehler ausgegeben. Beim Zelt wirft `handOut` den neuen Fehler, und der `catch`-Block liest aus `error.item`, ab wann das Zelt wieder da ist. Vorher prüft er mit `instanceof`, ob es überhaupt dieser Fehler ist. Jeden anderen wirft er mit `throw error` weiter, denn an dieser Stelle weiss das Programm nicht, wie es mit einem Tippfehler oder einem fehlenden Feld umgehen soll.

## Aufgaben

::::exercise[Einstieg]
Ein Mitglied vertauscht im Formular die Daten, abholen am 14. und zurückbringen am 11. November. Prüfe zuerst, was `checkRequest` aus dem Tresen-Helfer dazu sagt. Ergänze dann eine Prüfung, die diese Anfrage mit einem eigenen Grund ablehnt.

:::solution[Lösung]
::code{file="examples/js/errors/{lang}/solution-1.mjs"}

Ohne die neue Prüfung nimmt `checkRequest` die Anfrage an. Beide Tage sind Öffnungstage, und `loanDays` ergibt -3, was nicht mehr als sieben ist. Die neue Prüfung vergleicht die beiden ISO-Daten als Text und wirft einen Fehler, wenn das Zurückbringen vor dem Abholen liegt.
:::
::::

::::exercise[Vertiefung]
Während der Tresen-Helfer seine Liste lädt, zeigt er eine Ladeanzeige, die in jedem Fall wieder verschwinden soll. Schreib eine Funktion `loadList()`, die zum Testen einen Fehler wirft, ihn abfängt und im `catch`-Block mit `return` eine leere Liste zurückgibt. Schalte die Ladeanzeige im `finally`-Block aus und halte in einem Array fest, welche Blöcke in welcher Reihenfolge laufen.

:::solution[Lösung]
::code{file="examples/js/errors/{lang}/solution-2.mjs"}

Die Ausgabe ist `0 false` und `try > catch > finally`. `finally` läuft, nachdem `return []` im `catch`-Block den Rückgabewert bestimmt hat, aber bevor die Funktion wirklich zurückkehrt. Darum ist die Ladeanzeige aus, egal auf welchem Weg `loadList` endet.
:::
::::

::::exercise[Knobelei]
Ist ein Ding schon reserviert, soll der Tresen-Helfer den Tag nennen, ab dem es wieder frei ist. Schreib eine Fehlerklasse `ReservedError`, die diesen Tag im Feld `until` mitträgt, und eine Funktion `checkFree(request)`, die den Fehler wirft. Behandle im `catch`-Block nur diesen Fehler. Prüfe den Beamer vom 7. bis 11. November und vom 11. bis 14. November.

:::solution[Lösung]
::code{file="examples/js/errors/{lang}/solution-3.mjs"}

`ReservedError` gibt die Meldung mit `super` an `Error` weiter und speichert den Rückgabetag der anderen Reservation in `until`. Weil am Rückgabetag schon das nächste Mitglied abholen darf, ist das Ding genau ab diesem Tag frei. Der `catch`-Block liest den Tag aus dem Fehler, statt ihn aus der Meldung herauszusuchen, und wirft andere Fehler weiter.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein leerer `catch`-Block verschluckt jeden Fehler, und niemand merkt etwas. | Den Fehler mindestens mit `console.error` ausgeben oder weiterwerfen. |
| `catch` behandelt alle Fehler gleich, auch Programmierfehler wie einen `TypeError`. | Mit `instanceof` prüfen und unbekannte Fehler weiterwerfen. |
| `throw 'Ungültig'` wirft einen Text statt eines Fehlers, und `error.message` ist `undefined`. | Immer ein Fehlerobjekt werfen, `throw new Error('Ungültig')`. |
| Code nach einem `return` im `try`-Block soll aufräumen und läuft nicht. | Aufräumen in `finally` schreiben, das läuft auch nach einem `return`. |
| Der Aufruf von `checkRequest` steht ausserhalb von `try`, und die erste abgelehnte Anfrage beendet das ganze Programm. | Den Aufruf, der werfen kann, in `try` setzen, wie in der Schleife des Tresen-Helfers. |
| Ein KI-Assistent packt jeden Aufruf in `try` und `catch` und gibt nur «Fehler» aus. | Fehler dort behandeln, wo du etwas Sinnvolles tun kannst, und eine Meldung zeigen, die sagt, was passiert ist. |

## Selbstcheck

::::selfcheck
1. Was passiert mit den übrigen Prüfungen von `checkRequest`, wenn die erste einen Fehler wirft?
2. Warum nimmt der Tresen-Helfer die Anfrage für den Beamer vom 11. bis 14. November an, obwohl der Beamer bis zum 11. November reserviert ist?
3. Wann läuft ein `finally`-Block?

:::solution[Antworten]
1. Sie laufen nicht mehr. `throw` verlässt `checkRequest` sofort, und das Programm macht im `catch`-Block weiter. Danach kommt die nächste Anfrage an die Reihe, weil `try` und `catch` in der Schleife stehen.
2. Die Prüfung verlangt `request.from < other.to`, und `'2026-11-11' < '2026-11-11'` ist `false`. Eine Abholung am Rückgabetag gilt nicht als Überschneidung.
3. Immer, nach dem `try`-Block oder nach dem `catch`-Block, auch wenn einer davon mit `return` endet.
:::
::::

:::next
In Schritt 8 zeigt der Tresen-Helfer die neun Dinge auf einer Seite, und ein Klick reserviert eines. Weiter geht es mit [J8 DOM und Events](../dom-and-events/).
:::
