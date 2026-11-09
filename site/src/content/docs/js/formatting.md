---
title: Zahlen und Daten formatieren
description: Der Tresen-Helfer zeigt das Pfand in Franken und die Daten, ab denen ausgeliehene Dinge wieder verfügbar sind. Beträge und Prozente, Datum und Uhrzeit mit Intl und Zeitzonen.
sidebar:
  order: 10
---

::::step{n="10"}
Er zeigt die neun Dinge auf einer Seite und schreibt sie als JSON. Beträge und Daten gibt er bisher roh aus, 150 statt CHF 150.00 und 2026-11-12 statt 12. November 2026. In diesem Schritt formatiert er das Pfand in Franken und die Daten, ab denen ausgeliehene Dinge wieder verfügbar sind.

:::details[Code bis Schritt 9]
::code{file="examples/js/json/{lang}/desk.mjs"}
:::
::::

Die App zeigt Beträge, Daten und Uhrzeiten. Wie sie aussehen, hängt von Sprache und Land ab. In der Schweiz steht vor einem Betrag `CHF`, ein Apostroph trennt die Tausender, und ein Datum schreibt man mit Punkten. JavaScript bringt dafür das Objekt `Intl` mit, das diese Regeln kennt.

:::goals
Nach diesem Schritt kannst du

- Beträge in Franken und Prozente mit `Intl.NumberFormat` formatieren,
- Datum und Uhrzeit mit `Intl.DateTimeFormat` und Abstände wie «in 7 Tagen» anzeigen,
- erklären, warum ein Datum in einer anderen Zeitzone auf den Vortag fallen kann,
- Datumswerte ohne Uhrzeit so formatieren, dass überall der richtige Tag erscheint.
:::

## Beträge und Prozente

`Intl.NumberFormat` bekommt eine Sprache mit Region und Optionen. `de-CH` steht für Deutsch in der Schweiz.

::code{file="examples/js/formatting/{lang}/money.mjs"}

Mit `style: 'currency'` und `currency: 'CHF'` steht der Code der Währung vor dem Betrag, und es gibt immer zwei Stellen nach dem Punkt. Die Beiträge von rund 300 Mitgliedern zu je CHF 40 ergeben einen Betrag mit einem Apostroph als Tausendertrennzeichen. Mit `style: 'percent'` wird aus 6 von 9 Dingen der Text `67%`, gerundet auf ganze Prozent. Einen Formatierer kannst du für viele Zahlen verwenden, du legst ihn deshalb nur einmal an.

`toFixed(2)` genügt für einfache Fälle, setzt aber weder Tausendertrennzeichen noch eine Währung.

## Datum und Uhrzeit

Ein `Date` speichert einen Zeitpunkt als Anzahl Millisekunden seit dem 1. Januar 1970 in UTC. Wie dieser Zeitpunkt aussieht, bestimmt erst die Formatierung.

::code{file="examples/js/formatting/{lang}/dates.mjs"}

`toLocaleDateString` liefert das Datum in der Schreibweise der Sprache, für `de-CH` mit Punkten. `Intl.DateTimeFormat` nimmt Optionen, welche Teile erscheinen sollen, hier den ausgeschriebenen Wochentag, den Tag, den Monat und das Jahr. `Intl.RelativeTimeFormat` formuliert Abstände. Vom Samstag, 31. Oktober, an dem der Tresen-Helfer arbeitet, bis zum Abholtag sind es 7 Tage. Mit `numeric: 'auto'` sagt es «nächste Woche» und «morgen» statt «in 1 Woche» und «in 1 Tag».

## Zeitzonen

Ein Datum ohne Uhrzeit wie `'2026-11-12'` liest JavaScript als Mitternacht in UTC. Formatierst du es in einer Zeitzone westlich von UTC, liegt dieser Zeitpunkt dort noch am Vortag.

::code{file="examples/js/formatting/{lang}/timezones.mjs"}

![Ein Zeitpunkt in drei Zeitzonen. Links der Wert availableFrom des Zelts, der Text 2026-11-12 ohne Uhrzeit. new Date liest ihn als Mitternacht in UTC. Rechts derselbe Zeitpunkt in drei Zeitzonen. In UTC ist es der 12. November um Mitternacht, in Zürich der 12. November um 1 Uhr und in New York noch der 11. November um 19 Uhr. Mit timeZone UTC formatiert, zeigt ein Datum ohne Uhrzeit überall den 12. November.](../../../assets/figures/de/j10-time-zones.svg)

In UTC und in Zürich ist es der 12. November, in New York noch der Abend des 11. November. Ohne die Option `timeZone` nimmt der Browser die Zeitzone des Geräts. Bei Mitgliedern in der Schweiz ginge das gut, auf einem Server in Amerika oder bei Tests auf einem Rechner mit anderer Zeitzone aber nicht. Für reine Datumswerte wie den Tag, ab dem ein Ding wieder verfügbar ist, setzt du deshalb `timeZone: 'UTC'`, wie im Kapitel [Props](../../components/props/). Für Zeitpunkte wie den Beginn einer Öffnungszeit nimmst du `timeZone: 'Europe/Zurich'`. Der Laden öffnet am Samstag um 10 Uhr, in UTC ist es dann erst 9 Uhr, denn im November gilt in der Schweiz die Winterzeit.

## Ausgeliehene Dinge mit Datum und Pfand

Der Tresen-Helfer formatiert jetzt, was er bisher roh ausgegeben hat. Für jedes ausgeliehene Ding schreibt er das Pfand in Franken und das Datum, ab dem es wieder verfügbar ist, am Schluss das ganze Pfand, das ausgeliehen ist.

::code{file="examples/js/formatting/{lang}/desk.mjs"}

Die beiden Formatierer entstehen einmal vor der Schleife. `dateStyle: 'long'` schreibt den Monat aus, und `timeZone: 'UTC'` sorgt dafür, dass beim Zelt überall der 12. November steht. `continue` aus Schritt 2 überspringt die Dinge, die da sind. Aus der Zeile `Pfand ausgeliehen: 150` von Schritt 4 wird `Pfand ausgeliehen: CHF 150.00`. Die englische Seite zeigt die Daten auf Englisch, die Beträge bleiben in Schweizer Schreibweise, denn der Verein ist in Bern.

## Aufgaben

::::exercise[Einstieg]
Ein Mitglied hat Raclette-Ofen, Beamer und Schlafsack als Favoriten. Gib das Pfand jedes Favoriten in Franken aus und am Schluss die Summe, die es für alle drei hinterlegen müsste.

:::solution[Lösung]
::code{file="examples/js/formatting/{lang}/solution-1.mjs"}

Der Formatierer entsteht einmal vor der Schleife und formatiert danach alle Beträge. Die Schleife zählt die Zahlen zusammen, formatiert wird erst bei der Ausgabe. Mit einem Text wie `'CHF 30.00'` liesse sich nicht mehr rechnen.
:::
::::

::::exercise[Vertiefung]
Der Tresen-Helfer arbeitet am Samstag, 31. Oktober 2026. Gib für die drei ausgeliehenen Dinge aus, in wie vielen Tagen sie wieder verfügbar sind, als Text wie «in 12 Tagen».

:::solution[Lösung]
::code{file="examples/js/formatting/{lang}/solution-2.mjs"}

`daysBetween` rechnet wie `loanDays` aus Schritt 3 die Tage zwischen zwei Daten. `Intl.RelativeTimeFormat` macht aus der Zahl einen Text. Wäre ein Ding schon am 1. November zurück, käme dank `numeric: 'auto'` «morgen» heraus.
:::
::::

::::exercise[Knobelei]
Bring Pfand und Datum auf die Seite aus Schritt 8. Jeder Eintrag der Liste zeigt den Namen, das Pfand in Franken und «da» oder das Datum, ab dem das Ding wieder verfügbar ist. Die Knöpfe zum Reservieren darfst du für diese Aufgabe weglassen.

:::solution[Lösung]
::code{file="examples/js/formatting/{lang}/solution-3.html"}

Die Formatierer funktionieren im Browser genauso wie in Node. `textContent` setzt den formatierten Text in jeden Eintrag. Die Ausgabe zeigt die Zahl der Einträge und den Eintrag des Zelts. Mit den Knöpfen und dem Listener aus Schritt 8 hast du den ganzen Tresen-Helfer auf einer Seite.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein Datum ohne Uhrzeit erscheint in manchen Zeitzonen als Vortag. | Mit `timeZone: 'UTC'` formatieren. |
| Beträge werden mit `'CHF ' + amount` zusammengesetzt, und aus `40 / 12` wird `CHF 3.3333333333333335`. | `Intl.NumberFormat` mit `style: 'currency'` verwenden. |
| Der Monat ist um eins verschoben, `new Date(2026, 11, 12)` liegt im Dezember. | Bei `new Date(jahr, monat, tag)` zählen die Monate ab 0. Ein Text wie `'2026-11-12'` ist eindeutiger. |
| Für jede Zahl entsteht ein neuer `Intl.NumberFormat`. | Den Formatierer einmal anlegen und wiederverwenden. |
| Mit formatierten Beträgen wie `'CHF 30.00'` wird weitergerechnet. | Mit Zahlen rechnen und erst bei der Ausgabe formatieren. |
| Ein KI-Assistent schlägt für das Formatieren eine Bibliothek wie Moment.js vor. | Für die Anzeige genügt `Intl`. Moment.js wird nicht mehr weiterentwickelt. |

## Selbstcheck

::::selfcheck
1. Was gibt `new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(150)` aus?
2. Warum formatiert der Tresen-Helfer das Datum `'2026-11-12'` mit `timeZone: 'UTC'`?
3. Wann nimmst du `timeZone: 'Europe/Zurich'` statt `'UTC'`?

:::solution[Antworten]
1. `CHF 150.00`, mit dem Code der Währung vorne und zwei Stellen nach dem Punkt.
2. JavaScript liest ein Datum ohne Uhrzeit als Mitternacht in UTC. In UTC formatiert, zeigt es überall den 12. November, sonst in New York den 11.
3. Für Zeitpunkte mit einer Uhrzeit, die in der Schweiz gilt, etwa den Beginn der Öffnungszeit am Samstag um 10 Uhr.
:::
::::

:::next
Damit ist der Tresen-Helfer fertig. Teil 1 beginnt mit dem Export, den die Freiwilligen aus ihrer ganzen Tabelle mit 60 Dingen gemacht haben, und verteilt den Code auf Module. Weiter geht es in Teil 1 mit dem Kapitel [Module und Pakete](../../javascript/modules/).
:::
