---
title: Strings und Template Literals
description: Text mit Template Literals zusammensetzen, Text bereinigen, durchsuchen und zerlegen, und Namen in der richtigen Reihenfolge sortieren.
sidebar:
  order: 5
---

Eine App zeigt viel Text, Namen von Dingen, Suchbegriffe und Meldungen. Diese Einheit zeigt, wie du Text zusammensetzt, bereinigst, durchsuchst und sortierst.

:::goals
Nach dieser Einheit kannst du

- Text mit Template Literals zusammensetzen,
- die häufigsten Methoden für Text einsetzen,
- eine Suche bauen, die Gross- und Kleinschreibung nicht beachtet,
- Namen mit `localeCompare` in der richtigen Reihenfolge sortieren.
:::

## Template Literals

Ein Template Literal steht zwischen Backticks. Mit `${...}` setzt du einen beliebigen Ausdruck in den Text ein, und der Text darf über mehrere Zeilen gehen.

::code{file="examples/js/strings/{lang}/template.mjs"}

In der ersten Zeile setzt das Template Literal drei Werte ein, das Pfand mit `toFixed(2)` und damit mit zwei Stellen nach dem Punkt. `padStart(3, '0')` füllt einen Text vorne auf drei Zeichen auf, aus `'7'` wird `'007'`. `split(';')` zerlegt einen Text an jedem Strichpunkt in ein Array.

Strings lassen sich nicht verändern. Jede Methode liefert einen neuen String, das Original bleibt, wie es war. `name.toUpperCase()` allein bewirkt deshalb nichts, du musst das Ergebnis speichern oder weiterverwenden.

## Methoden für Text

| Methode | Ergebnis | Beispiel |
|---|---|---|
| `trim()` | entfernt Leerzeichen am Anfang und am Ende | `'  Zelt '.trim()` ergibt `'Zelt'` |
| `toLowerCase()`, `toUpperCase()` | alles in Klein- oder Grossbuchstaben | `'Zelt'.toLowerCase()` ergibt `'zelt'` |
| `includes(text)` | ob der Text vorkommt | `'Stichsäge'.includes('säge')` ergibt `true` |
| `startsWith(text)`, `endsWith(text)` | ob der Text am Anfang oder am Ende steht | `'Velo-Anhänger'.startsWith('Velo')` ergibt `true` |
| `slice(start, end)` | ein Stück ohne die Stelle `end` | `'Raclette'.slice(0, 4)` ergibt `'Racl'` |
| `split(trenner)` | ein Array der Teile | `'a,b'.split(',')` ergibt `['a', 'b']` |
| `replaceAll(alt, neu)` | ersetzt jedes Vorkommen | `'1.5.2026'.replaceAll('.', '/')` ergibt `'1/5/2026'` |
| `padStart(länge, zeichen)`, `padEnd(...)` | füllt vorne oder hinten auf | `'7'.padStart(3, '0')` ergibt `'007'` |

## Eine Suche im Katalog

Mitglieder tippen Suchbegriffe, wie es ihnen gerade passt, mit Leerzeichen und in beliebiger Schreibweise. Eine Suche bereinigt deshalb zuerst den Suchbegriff und vergleicht dann alles in Kleinbuchstaben.

::code{file="examples/js/strings/{lang}/search.mjs"}

`trim` entfernt die Leerzeichen um den Suchbegriff, `toLowerCase` macht aus beiden Seiten Kleinbuchstaben, und `includes` findet den Begriff auch mitten im Namen. So findet «säge» die Stichsäge. Diese Suche baust du in Teil 3 mit Vue nach.

## Sortieren

`sort` ohne Argument sortiert Text nach den Codes der Zeichen. Das passt für einfache Fälle, aber nicht für Umlaute und nicht für gemischte Gross- und Kleinschreibung.

::code{file="examples/js/strings/{lang}/sorting.mjs"}

In der ersten Zeile landen die «Äxte» hinter dem «Zelt», weil das Ä einen höheren Code hat als das Z. `localeCompare` vergleicht nach den Regeln einer Sprache, hier `de-CH`, und sortiert das Ä beim A ein. `sort` verändert das Array selbst, darum sortiert das Beispiel mit `[...names]` jeweils eine Kopie. Seit 2023 gibt es dafür auch `toSorted`, das immer ein neues Array liefert.

Auch Zahlen sortiert `sort` ohne Argument als Text, `[10, 9, 1].sort()` ergibt `[1, 10, 9]`. Für Zahlen übergibst du eine Vergleichsfunktion, `(a, b) => a - b`.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `name.trim()` allein ändert `name` nicht. | Das Ergebnis speichern, `const tidy = name.trim()`. |
| Die Suche findet «Zelt» nicht, wenn jemand «zelt» tippt. | Beide Seiten mit `toLowerCase()` vergleichen. |
| Namen mit Umlauten stehen nach dem Sortieren am Schluss. | Mit `localeCompare` sortieren, `names.toSorted((a, b) => a.localeCompare(b, 'de-CH'))`. |
| Zahlen werden mit `sort()` als Text sortiert. | Eine Vergleichsfunktion übergeben, `(a, b) => a - b`. |
| Text wird mit `+` und vielen Anführungszeichen zusammengesetzt. | Ein Template Literal verwenden. |

## Aufgaben

::::exercise[Einstieg]
Ein Name kommt mit Leerzeichen aus einem Formular, `'  Velo-Anhänger '`. Entferne die Leerzeichen und gib den Namen in Anführungszeichen aus, dazu seine Länge und ob er mit «Velo» beginnt.

:::solution[Lösung]
::code{file="examples/js/strings/{lang}/solution-1.mjs"}

Die Ausgabe ist `"Velo-Anhänger" 13 true`. Die Anführungszeichen im Template Literal zeigen, dass vorne und hinten keine Leerzeichen mehr stehen. Der Bindestrich zählt bei der Länge mit.
:::
::::

::::exercise[Vertiefung]
Schreib eine Funktion `receiptLine(name, deposit)` für eine Quittung. Der Name wird mit Punkten auf 16 Zeichen aufgefüllt. Danach folgen `CHF` und das Pfand mit zwei Stellen nach dem Punkt, rechtsbündig auf 6 Zeichen. Prüfe mit dem Zelt (50) und der Leiter (20), ob die Beträge untereinander stehen.

:::solution[Lösung]
::code{file="examples/js/strings/{lang}/solution-2.mjs"}

`padEnd(16, '.')` füllt den Namen hinten mit Punkten auf, `padStart(6)` füllt den Betrag vorne mit Leerzeichen auf. So stehen alle Beträge untereinander, solange die Schrift gleich breite Zeichen hat, wie in der Konsole.
:::
::::

::::exercise[Knobelei]
Eine Zeile aus der alten Tabelle des Vereins lautet `'Stichsäge; Werkzeug; 20'`. Zerlege sie in Name, Kategorie und Pfand, jeweils ohne Leerzeichen. Zeig, dass das Pfand danach eine Zahl ist, indem du 5 dazuzählst.

:::solution[Lösung]
::code{file="examples/js/strings/{lang}/solution-3.mjs"}

Die Ausgabe ist `Stichsäge Werkzeug 25`. `split(';')` zerlegt die Zeile, `map` wendet `trim` auf jeden Teil an, und das Destrukturieren verteilt die drei Teile auf Variablen. Ohne `Number(...)` ergäbe `'20' + 5` den Text `'205'`. `map` lernst du in Teil 1 genauer kennen.
:::
::::
