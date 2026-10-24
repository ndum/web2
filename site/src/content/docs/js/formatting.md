---
title: Zahlen und Daten formatieren
description: Beträge in Franken, Prozente, Datum und Uhrzeit mit Intl für die Schweiz formatieren und Zeitzonen richtig behandeln.
sidebar:
  order: 10
---

Die App zeigt Beträge, Daten und Uhrzeiten. Wie sie aussehen, hängt von Sprache und Land ab. In der Schweiz steht vor einem Betrag `CHF`, ein Apostroph trennt die Tausender, und ein Datum schreibt man mit Punkten. JavaScript bringt dafür das Objekt `Intl` mit, das diese Regeln kennt.

:::goals
Nach dieser Einheit kannst du

- Beträge in Franken und Prozente mit `Intl.NumberFormat` formatieren,
- Datum und Uhrzeit mit `Intl.DateTimeFormat` und Abstände wie «gestern» anzeigen,
- erklären, warum ein Datum in einer anderen Zeitzone auf den Vortag fallen kann,
- Datumswerte ohne Uhrzeit so formatieren, dass überall der richtige Tag erscheint.
:::

## Beträge und Prozente

`Intl.NumberFormat` bekommt eine Sprache mit Region und Optionen. `de-CH` steht für Deutsch in der Schweiz.

::code{file="examples/js/formatting/{lang}/money.mjs"}

Mit `style: 'currency'` und `currency: 'CHF'` steht der Code der Währung vor dem Betrag, und es gibt immer zwei Stellen nach dem Punkt. Grosse Beträge bekommen einen Apostroph als Tausendertrennzeichen. Mit `style: 'percent'` wird aus 0.35 der Text 35%. Einen Formatierer kannst du für viele Zahlen verwenden, du legst ihn deshalb nur einmal an.

`toFixed(2)` aus den anderen Einheiten genügt für einfache Fälle, setzt aber weder Tausendertrennzeichen noch eine Währung.

## Datum und Uhrzeit

Ein `Date` speichert einen Zeitpunkt als Anzahl Millisekunden seit dem 1. Januar 1970 in UTC. Wie dieser Zeitpunkt aussieht, bestimmt erst die Formatierung.

::code{file="examples/js/formatting/{lang}/dates.mjs"}

`toLocaleDateString` liefert das Datum in der Schreibweise der Sprache, für `de-CH` mit Punkten. `Intl.DateTimeFormat` nimmt Optionen, welche Teile erscheinen sollen, hier den ausgeschriebenen Wochentag, den Tag und den Monat. `Intl.RelativeTimeFormat` formuliert Abstände wie «gestern» oder «in 3 Tagen». Mit `numeric: 'auto'` sagt es «gestern» statt «vor 1 Tag».

## Zeitzonen

Ein Datum ohne Uhrzeit wie `'2026-11-12'` liest JavaScript als Mitternacht in UTC. Formatierst du es in einer Zeitzone westlich von UTC, liegt dieser Zeitpunkt dort noch am Vortag.

::code{file="examples/js/formatting/{lang}/timezones.mjs"}

In UTC und in Zürich ist es der 12. November, in New York noch der Abend des 11. November. Ohne die Option `timeZone` nimmt der Browser die Zeitzone des Geräts. Bei Mitgliedern in der Schweiz ginge das gut, auf einem Server in Amerika oder bei Tests auf einem Rechner mit anderer Zeitzone aber nicht. Für reine Datumswerte wie ein Rückgabedatum setzt du deshalb `timeZone: 'UTC'`, wie im Kapitel [Props](../../components/props/). Für Zeitpunkte wie den Beginn einer Öffnungszeit nimmst du `timeZone: 'Europe/Zurich'`.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein Datum ohne Uhrzeit erscheint in manchen Zeitzonen als Vortag. | Mit `timeZone: 'UTC'` formatieren. |
| Beträge werden mit `'CHF ' + deposit` zusammengesetzt, und aus 12.5 wird `CHF 12.5`. | `Intl.NumberFormat` mit `style: 'currency'` verwenden. |
| Der Monat ist um eins verschoben, `new Date(2026, 11, 12)` liegt im Dezember. | Bei `new Date(jahr, monat, tag)` zählen die Monate ab 0. Ein Text wie `'2026-11-12'` ist eindeutiger. |
| Für jede Zahl entsteht ein neuer `Intl.NumberFormat`. | Den Formatierer einmal anlegen und wiederverwenden. |
| Ein KI-Assistent schlägt für das Formatieren eine Bibliothek wie Moment.js vor. | Für die Anzeige genügt `Intl`. Moment.js wird nicht mehr weiterentwickelt. |

## Aufgaben

::::exercise[Einstieg]
Formatiere die Pfänder 20, 50 und 12.5 als Beträge in Franken und gib jeden auf einer eigenen Zeile aus.

:::solution[Lösung]
::code{file="examples/js/formatting/{lang}/solution-1.mjs"}

Der Formatierer entsteht einmal vor der Schleife und formatiert danach alle drei Beträge. Aus 12.5 wird `CHF 12.50`, weil Beträge in Franken immer zwei Stellen nach dem Punkt haben.
:::
::::

::::exercise[Vertiefung]
Die Öffnungszeit am Mittwoch beginnt am 4. November 2026 um 16 Uhr UTC. Zeig sie als Wochentag und Uhrzeit in der Zeitzone der Schweiz an.

:::solution[Lösung]
::code{file="examples/js/formatting/{lang}/solution-2.mjs"}

Die Ausgabe ist `Mittwoch, 17:00`. Im November gilt in der Schweiz die Winterzeit, eine Stunde vor UTC. `timeZone: 'Europe/Zurich'` rechnet diese Verschiebung aus und berücksichtigt auch den Wechsel zur Sommerzeit.
:::
::::

::::exercise[Knobelei]
Gib die Namen Zelt, Äxte und Bohrmaschine als Aufzählung aus, wie man sie in einem Satz schreibt, mit Kommas und einem «und» vor dem letzten Namen. Formatiere ausserdem die Zahl 1234567.891 mit Tausendertrennzeichen für die Schweiz.

:::solution[Lösung]
::code{file="examples/js/formatting/{lang}/solution-3.mjs"}

`Intl.ListFormat` kennt die Regeln der Sprache. Im Deutschen steht vor dem «und» kein Komma, im amerikanischen Englisch schon. `Intl.NumberFormat` ohne Optionen zeigt bis zu drei Stellen nach dem Punkt und trennt die Tausender mit Apostrophen.
:::
::::
