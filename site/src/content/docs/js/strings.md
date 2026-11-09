---
title: Strings und Template Literals
description: Der Tresen-Helfer schreibt für jedes Ding eine Zeile und findet Dinge über ihren Namen. Template Literals, Methoden für Text, Spalten mit padStart und padEnd, Suchen ohne Rücksicht auf Gross- und Kleinschreibung und Sortieren.
sidebar:
  order: 5
---

::::step{n="5"}
Er kennt die neun Dinge vom Tresen als Objekte in einem Array und zählt, was da ist. In diesem Schritt schreibt er für jedes Ding eine Zeile mit Nummer, Name, Pfand und Rückgabe und findet Dinge über ihren Namen.

:::details[Code bis Schritt 4]
::code{file="examples/js/objects-and-arrays/{lang}/desk.mjs"}
:::
::::

Eine App zeigt viel Text, Namen von Dingen, Suchbegriffe und Meldungen. Du setzt Strings mit Template Literals zusammen, und ihre Methoden räumen Text auf oder zerlegen ihn. Die Suche aus diesem Schritt baust du in Teil 3 mit Vue nach.

:::goals
Nach diesem Schritt kannst du

- Text mit Template Literals zusammensetzen,
- die häufigsten Methoden für Text einsetzen und Spalten mit `padStart` und `padEnd` ausrichten,
- eine Suche bauen, die Gross- und Kleinschreibung nicht beachtet,
- Zahlen und Namen in der richtigen Reihenfolge sortieren.
:::

## Template Literals

Ein Template Literal steht zwischen Backticks. Mit `${...}` setzt du einen Ausdruck in den Text ein, und der Text darf über mehrere Zeilen gehen.

::code{file="examples/js/strings/{lang}/template.mjs"}

`glued` setzt dieselbe Zeile mit `+` zusammen. Das Ergebnis ist gleich, wie `true` zeigt, aber dort wechseln sich Text in Anführungszeichen und Werte ab, und ein vergessenes Leerzeichen fällt erst in der Ausgabe auf. Das Template Literal liest du so, wie die Zeile später aussieht. Zwischen `${` und `}` darf jeder Ausdruck stehen, in der dritten Ausgabe der Bedingungsoperator aus Schritt 2, der «da» oder «ausgeliehen» liefert. `hours` geht über zwei Zeilen. Die zweite Zeile beginnt im Code ganz links, denn ein Template Literal übernimmt auch die Leerzeichen am Anfang einer Zeile.

## Methoden für Text

Strings lassen sich nicht verändern. Jede Methode liefert einen neuen String, das Original bleibt, wie es war. Am Tresen kommt eine Mitgliedernummer oft mit Leerzeichen und kleinem m aus dem Formular.

::code{file="examples/js/strings/{lang}/methods.mjs"}

`trim` entfernt die Leerzeichen am Anfang und am Ende, `toUpperCase` macht aus dem m ein M. Weil jede Methode wieder einen String liefert, lassen sich die Aufrufe hintereinander schreiben. `number` hat danach 5 Zeichen, `typed` immer noch 8, denn die Methoden haben `typed` nicht verändert. `slice(2)` schneidet ab der Stelle 2 bis zum Ende aus und liefert die Ziffern `'117'`. `split('-')` zerlegt ein Datum an jedem Bindestrich in ein Array.

| Methode | Ergebnis | Beispiel |
|---|---|---|
| `trim()` | entfernt Leerzeichen am Anfang und am Ende | `'  Zelt '.trim()` ergibt `'Zelt'` |
| `toLowerCase()`, `toUpperCase()` | alles in Klein- oder Grossbuchstaben | `'Zelt'.toLowerCase()` ergibt `'zelt'` |
| `includes(text)` | ob der Text vorkommt | `'Stichsäge'.includes('säge')` ergibt `true` |
| `startsWith(text)`, `endsWith(text)` | ob der Text am Anfang oder am Ende steht | `'Velo-Anhänger'.startsWith('Velo')` ergibt `true` |
| `indexOf(text)` | die Stelle des Texts oder -1 | `'Schlafsack'.indexOf('sack')` ergibt `6` |
| `slice(start, end)` | ein Stück ohne die Stelle `end` | `'Raclette'.slice(0, 4)` ergibt `'Racl'` |
| `split(trenner)` | ein Array der Teile | `'2026-11-12'.split('-')` ergibt `['2026', '11', '12']` |
| `replaceAll(alt, neu)` | ersetzt jedes Vorkommen | `'Raclette-Ofen'.replaceAll('-', ' ')` ergibt `'Raclette Ofen'` |
| `padStart(länge, zeichen)`, `padEnd(...)` | füllt vorne oder hinten auf | `'7'.padStart(3, '0')` ergibt `'007'` |

## Suchen ohne Rücksicht auf Gross- und Kleinschreibung

Ein Mitglied fragt am Tresen nach einem Ding, und die Freiwilligen tippen den Namen so ein, wie er gerade kommt, klein geschrieben und manchmal mit einem Leerzeichen am Ende. `includes` vergleicht dagegen Zeichen für Zeichen.

::code{file="examples/js/strings/{lang}/search.mjs"}

Der erste Vergleich scheitert am Leerzeichen hinter `zelt`. Der zweite scheitert am Z, denn für `includes` sind `Z` und `z` verschiedene Zeichen. Erst wenn beide Seiten in Kleinbuchstaben vorliegen und der Suchbegriff keine Leerzeichen mehr hat, findet `includes` das Wort, auch mitten in einem Namen. Den Namen musst du nicht trimmen, er steht schon sauber im Katalog.

## Eine Zeile pro Ding

In der Liste des Tresen-Helfers soll jedes Ding eine Zeile bekommen, und die Beträge sollen untereinander stehen. Das geht nur, wenn jeder Name gleich viele Zeichen belegt. `padEnd` hängt dafür Leerzeichen an, bis ein Text die gewünschte Länge hat. `padStart` füllt vorne auf und richtet so Zahlen rechtsbündig aus.

![Spalten mit padEnd. Oben drei Zeilen des Tresen-Helfers ohne Auffüllen, für die Bohrmaschine, das Zelt für vier Personen und den Beamer, je mit Nummer, Name, Pfand und dem Hinweis, ob das Ding da ist. Die Namen sind verschieden lang, darum beginnt der Betrag in jeder Zeile an einer anderen Stelle. Unten dieselben Zeilen mit padEnd. Es hängt an die Bohrmaschine 10 und an den Beamer 16 Leerzeichen an, bis jeder Name 22 Zeichen hat wie das Zelt. Jetzt stehen CHF 20, CHF 50 und CHF 80 genau untereinander.](../../../assets/figures/de/j5-columns-with-padend.svg)

Der Tresen-Helfer schreibt so seine Liste der neun Dinge und gibt die Treffer einer Suche im selben Format aus.

::code{file="examples/js/strings/{lang}/desk.mjs"}

Die Schleife vor `line` sucht den längsten Namen. Mit `Math.max` behält `width` in jeder Runde den grösseren Wert, am Schluss 22 für das Zelt für vier Personen. `line` setzt die Zeile aus einem Template Literal zusammen. Zahlen haben keine Methode `padStart`, darum macht `String(item.id)` aus der Nummer zuerst einen Text. Vor den Nummern 1 bis 9 steht nun ein Leerzeichen, so hätte auch eine 10 Platz. `padEnd(width)` füllt jeden Namen auf 22 Zeichen auf, so beginnt `CHF` in jeder Zeile an derselben Stelle. Das klappt in der Konsole, weil dort jedes Zeichen gleich breit ist.

`search` bereinigt den Suchbegriff einmal und vergleicht ihn dann mit jedem Namen in Kleinbuchstaben. Die Treffer sammelt die Funktion in einem neuen Array, und der Tresen-Helfer gibt sie mit `line` aus.

## Sortieren

`sort` ohne Argument vergleicht Werte als Text, Zeichen für Zeichen nach ihren Codes. Für Zahlen mit verschieden vielen Stellen geht das schief, und die Nummern der Dinge reichen über 9 hinaus.

::code{file="examples/js/strings/{lang}/sorting.mjs"}

Ohne Vergleichsfunktion landet die 10 vor der 2, weil der Text `'10'` mit einer 1 beginnt. Die Vergleichsfunktion `(a, b) => a - b` liefert eine negative Zahl, wenn `a` vor `b` gehört, eine positive, wenn es dahinter gehört, und 0 bei Gleichstand. Für Text taugt `a - b` nicht, `'Zelt' - 'Beamer'` ergibt `NaN`. Dafür gibt es `localeCompare`. Es liefert ebenfalls eine negative Zahl, 0 oder eine positive Zahl und vergleicht nach den Regeln einer Sprache, hier `de-CH`. So stehen Wörter mit Umlaut und mit kleinem Anfangsbuchstaben dort, wo man sie im Alphabet erwartet. Ohne `localeCompare` stellt `sort` ein Ä und ein kleines a hinter das Z.

`toSorted` liefert ein neues Array und lässt `ids` in der alten Reihenfolge. `sort` ordnet dagegen das Array selbst um, wie bei `names`. Teil 1 geht im Kapitel [Funktionen und Arrays](../../javascript/functions-and-arrays/) genauer auf das Sortieren ein.

## Aufgaben

::::exercise[Einstieg]
Der Rasenmäher kommt als zehntes Ding dazu, mit der `id` 10 und CHF 40 Pfand. Er ist gerade da. Hänge ihn an die neun Dinge an und gib mit `line` die Zeilen der Dinge 9 und 10 aus. Prüfe, ob die beiden Namen untereinander beginnen.

:::solution[Lösung]
::code{file="examples/js/strings/{lang}/solution-1.mjs"}

Die beiden Namen beginnen an derselben Stelle. `padStart(2)` setzt vor die 9 ein Leerzeichen, die 10 füllt beide Stellen selbst. Ohne `padStart` stünde der Rasenmäher ein Zeichen weiter rechts.
:::
::::

::::exercise[Vertiefung]
Der Tresen-Helfer soll eine Quittung für das Pfand drucken. Schreib eine Funktion `receiptLine(label, amount)`, die den Text mit Punkten auf 16 Zeichen auffüllt und danach `CHF` und den Betrag mit zwei Stellen nach dem Punkt ausgibt. Die Beträge sollen rechtsbündig untereinander stehen. Prüfe sie mit dem Beamer, dem Raclette-Ofen und dem Total der beiden.

:::solution[Lösung]
::code{file="examples/js/strings/{lang}/solution-2.mjs"}

`padEnd(16, '.')` füllt den Text hinten mit Punkten auf. `toFixed(2)` macht aus der Zahl einen Text mit zwei Stellen nach dem Punkt, und `padStart(6)` füllt ihn vorne mit Leerzeichen auf. So stehen die sechs Zeichen von `110.00` unter den fünf von `80.00` und `30.00`, und die Dezimalpunkte stehen genau untereinander.
:::
::::

::::exercise[Knobelei]
In der Trefferliste soll man sehen, wo der Suchbegriff im Namen steht. Schreib eine Funktion `mark(name, query)`, die den gefundenen Teil in eckige Klammern setzt und die Schreibweise des Namens behält. Aus «Velo-Anhänger» und dem Suchbegriff `anh` wird `Velo-[Anh]änger`. Findet die Funktion nichts, gibt sie den Namen unverändert zurück.

:::solution[Lösung]
::code{file="examples/js/strings/{lang}/solution-3.mjs"}

`indexOf` sucht im Namen in Kleinbuchstaben und liefert die Stelle des Treffers oder -1. Bei diesen Namen ändert `toLowerCase` die Länge nicht, darum gelten die Stellen auch im Original. `slice` schneidet daraus den Teil vor dem Treffer, den Treffer und den Rest, und das Template Literal setzt sie mit den Klammern wieder zusammen. So bleibt das grosse A in `[Anh]` erhalten.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `name.trim()` allein ändert `name` nicht. | Das Ergebnis speichern, `const tidy = name.trim()`. |
| `'CHF ${deposit}'` gibt `${deposit}` wörtlich aus. | Ein Template Literal steht zwischen Backticks, nicht zwischen einfachen Anführungszeichen. |
| Die Suche findet «Zelt» nicht, wenn jemand «zelt» tippt. | Beide Seiten mit `toLowerCase()` vergleichen. |
| `item.id.padStart(2)` wirft einen `TypeError`. | Zahlen haben kein `padStart`. Zuerst mit `String(item.id)` einen Text daraus machen. |
| Die Spalten verrutschen bei einem Namen, der länger ist als die Breite von `padEnd`. | `padEnd` kürzt nie. Die Breite aus dem längsten Namen berechnen. |
| `[10, 9, 1].sort()` ergibt `[1, 10, 9]`. | Zahlen mit einer Vergleichsfunktion sortieren, `(a, b) => a - b`. |

## Selbstcheck

::::selfcheck
1. Warum enthält `typed` nach `typed.trim()` immer noch Leerzeichen?
2. Was liefern `'Beamer'.padEnd(10, '.')` und `'Zelt für vier Personen'.padEnd(10, '.')`?
3. Warum entfernt `search` nur beim Suchbegriff die Leerzeichen, setzt aber beide Seiten in Kleinbuchstaben?

:::solution[Antworten]
1. Strings lassen sich nicht verändern. `trim` liefert einen neuen String, und solange du ihn nicht speicherst, bleibt `typed`, wie es war.
2. `'Beamer....'` mit vier Punkten, weil «Beamer» sechs Zeichen hat. Der lange Name bleibt unverändert, denn `padEnd` füllt nur auf und kürzt nie.
3. Leerzeichen kommen nur über das Formular in den Suchbegriff, die Namen im Katalog sind sauber. Gross- und Kleinbuchstaben unterscheiden sich dagegen auf beiden Seiten, «Zelt» im Katalog und «zelt» im Suchfeld.
:::
::::

:::next
In Schritt 6 hält der Tresen-Helfer Reservationen fest, mit Ding, Mitgliedernummer und den Tagen der Ausleihe. Weiter geht es mit [J6 Klassen und this](../classes/).
:::
