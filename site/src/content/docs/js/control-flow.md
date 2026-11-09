---
title: Kontrollstrukturen
description: Der Tresen-Helfer entscheidet, ob die Bohrmaschine da ist und ob der Tresen offen ist, und geht die Tage einer Woche durch. if und else, der Bedingungsoperator, switch, Schleifen mit for...of, for und while, break und continue.
sidebar:
  order: 2
---

::::step{n="2"}
Er kennt die Bohrmaschine mit Namen, Pfand und `availableFrom` und macht aus dem Text eines Formularfelds eine Zahl. In diesem Schritt entscheidet er, ob die Bohrmaschine da ist und ob der Tresen offen ist, und geht die Tage einer Woche durch.

:::details[Code bis Schritt 1]
::code{file="examples/js/variables/{lang}/desk.mjs"}
:::
::::

Kontrollstrukturen entscheiden, welcher Code läuft und wie oft. In Vue-Templates heissen sie später `v-if` und `v-for`, im Script bleiben es die Anweisungen dieses Schritts.

:::goals
Nach diesem Schritt kannst du

- mit `if`, `else if` und `else` zwischen Fällen unterscheiden und Bedingungen mit `&&`, `||` und `!` verknüpfen,
- den Bedingungsoperator `? :` für kurze Entscheidungen einsetzen,
- mit `switch` einen Wert auf mehrere feste Fälle prüfen,
- mit `for...of`, `for` und `while` Code wiederholen und Schleifen mit `break` und `continue` steuern.
:::

## Entscheidungen mit if und else

`if` führt einen Block aus, wenn eine Bedingung wahr ist. Mit `else if` prüfst du weitere Fälle der Reihe nach, `else` fängt alles auf, was übrig bleibt. Eine Bedingung muss kein Wahrheitswert sein, JavaScript wandelt jeden Wert um, wie es [Variablen, Typen und Operatoren](../variables/) beschreibt.

::code{file="examples/js/control-flow/{lang}/pickup.mjs"}

Die Festbankgarnitur ist ausgeliehen, `availableFrom` ist also nicht `null`, und der erste Fall trifft nicht zu. Der zweite vergleicht zwei Daten. Texte im Format JJJJ-MM-TT lassen sich mit `<` und `<=` vergleichen, weil vorne das Jahr steht, dann der Monat und am Schluss der Tag, und JavaScript Texte Zeichen für Zeichen vergleicht. Der 3. November liegt vor dem 7. November, die Festbankgarnitur ist also bis zur Abholung zurück. Sobald ein Fall zutrifft, überspringt JavaScript alle weiteren, auch den Block von `else`.

Bedingungen verknüpfst du mit `&&` für «und», `||` für «oder» und `!` für «nicht». `availableFrom !== null && availableFrom > pickup` ist wahr, wenn ein Ding ausgeliehen ist und erst nach der Abholung zurückkommt. `!` kehrt einen Wahrheitswert um, `!(availableFrom === null)` ist dasselbe wie `availableFrom !== null`.

## Fälle mit switch

Prüfst du einen Wert auf mehrere feste Fälle, ist `switch` übersichtlicher als eine lange Kette von `else if`. Der Tresen-Helfer nennt damit die Öffnungszeiten eines Tages.

::code{file="examples/js/control-flow/{lang}/hours.mjs"}

`switch` vergleicht `day` der Reihe nach mit jedem `case`, und zwar mit `===`. Trifft ein Fall zu, läuft der Code ab dort weiter, bis ein `break` kommt. Ohne `break` liefe er in den nächsten Fall hinein, auf Englisch heisst das «fall through», und es ist eine häufige Fehlerquelle. `default` greift, wenn kein Fall passt. Setz mit «Bearbeiten» einen anderen Tag ein, etwa `'Donnerstag'`, und führe das Programm erneut aus. `hours` steht mit `let` da, weil die Variable ihren Wert erst im passenden Fall bekommt.

## Schleifen

Eine Schleife wiederholt Code. Für eine Liste von Werten ist `for...of` die einfachste, sie liefert die Werte der Reihe nach, ohne dass du dich um die Stellen kümmern musst. Der Tresen-Helfer geht damit die Tage der Woche durch. Vorher sagt er, ob der Tresen heute offen ist und ob die Bohrmaschine da ist.

::code{file="examples/js/control-flow/{lang}/desk.mjs"}

`today` ist der Samstag, an dem der Tresen-Helfer arbeitet, der 31. Oktober 2026. Die erste Bedingung verknüpft zwei Vergleiche mit `||` und ist wahr, sobald einer davon zutrifft. Für die Bohrmaschine reicht der Bedingungsoperator `bedingung ? wennWahr : wennFalsch`. Er ist ein Ausdruck und liefert einen Wert, darum passt er direkt in `console.log`. In Vue-Templates begegnet er dir oft, etwa als `{{ available ? 'da' : 'ausgeliehen' }}`.

`week` hält die sieben Tage in einem Array, einer Liste von Werten in eckigen Klammern, mehr dazu in Schritt 4. `for (const day of week)` legt in jedem Durchgang die Konstante `day` mit dem nächsten Tag an. Die Abbildung zeigt die sieben Durchgänge.

![Die Schleife über die Woche. Links stehen die sieben Tage der Woche von Montag bis Sonntag, nummeriert von 1 bis 7 in der Reihenfolge, in der die Schleife sie durchgeht. Rechts steht, was der Tresen-Helfer ausgibt. Vom Mittwoch und vom Samstag führt je ein Pfeil zu «Offen am Mittwoch» und «Offen am Samstag». Bei den anderen fünf Tagen steht «keine Ausgabe» in einem gestrichelten Rahmen.](../../../assets/figures/de/j2-loop-over-week.svg)

Die Bedingung `day === 'Mittwoch' || day === 'Samstag'` steht zweimal im Tresen-Helfer. In Schritt 3 fasst eine Funktion sie an einer Stelle zusammen. `for...in` sieht ähnlich aus wie `for...of`, läuft aber über die Schlüssel eines Objekts und ist für Arrays nicht gedacht.

## break und continue

Manchmal soll eine Schleife früher aufhören oder einen Wert überspringen. Der Tresen-Helfer sucht so den nächsten Tag, an dem der Tresen offen ist.

::code{file="examples/js/control-flow/{lang}/next-open.mjs"}

`days` hält die acht Tage von heute bis zum nächsten Samstag. Weil die Suche wissen muss, wie viele Tage es bis zum offenen Tag sind, läuft hier die klassische Zählschleife. `let ahead = 1` legt den Zähler an, `ahead < days.length` ist die Bedingung für jeden Durchgang, und `ahead++` zählt danach eins dazu, so wie `ahead += 1`. Der Zähler beginnt bei 1 und nicht bei 0, weil heute nicht zählt.

Die Bedingung vor `continue` ist das Gegenteil der Bedingung im Tresen-Helfer. Ist ein Tag weder Mittwoch noch Samstag, überspringt `continue` den Rest des Durchgangs, und die Schleife macht mit dem nächsten Tag weiter. Am Mittwoch gibt sie den Tag aus, und `break` beendet die ganze Schleife. Ohne `break` ginge sie weiter und gäbe auch den Samstag in 7 Tagen aus.

Eine Schleife mit `while` läuft, solange ihre Bedingung gilt. Sie passt, wenn vorher nicht feststeht, wie viele Durchgänge es braucht. In der Aufgabe «Vertiefung» schreibst du die Suche damit. In Teil 1 lernst du die Methoden `map`, `filter` und `find` kennen, die viele Schleifen über Arrays kürzer machen. Die Schleifen dieses Schritts bleiben trotzdem nützlich, etwa wenn du früh abbrechen willst.

## Aufgaben

::::exercise[Einstieg]
Gib für jeden Tag der Woche die Öffnungszeiten aus. Nimm dafür die Schleife aus dem Tresen-Helfer und setz den `switch` mit den Öffnungszeiten hinein.

:::solution[Lösung]
::code{file="examples/js/control-flow/{lang}/solution-1.mjs"}

Der `switch` steht im Block der Schleife und läuft darum für jeden Tag einmal. `break` beendet hier nur den `switch`, nicht die Schleife. Für die fünf Tage ohne eigenen Fall greift `default`.
:::
::::

::::exercise[Vertiefung]
Wer am Mittwoch etwas abholt, will wissen, wann der Tresen das nächste Mal offen ist. Schreib die Suche aus dem Abschnitt mit `while` statt mit `for`, für die Tage von einem Mittwoch bis zum nächsten. Gib den Tag und die Zahl der Tage bis dahin aus.

:::solution[Lösung]
::code{file="examples/js/control-flow/{lang}/solution-2.mjs"}

Die Schleife läuft, solange der Tag weder Mittwoch noch Samstag ist. Am Samstag ist die Bedingung falsch, die Schleife endet, und `ahead` steht auf 3. Weil `days` mit dem nächsten Mittwoch endet, findet die Schleife sicher einen offenen Tag und liest nicht über das Ende des Arrays hinaus.
:::
::::

::::exercise[Knobelei]
Der Tresen-Helfer prüft die Zahl der Tage aus dem Formular. Gib für die Eingaben `'4'`, `'11'` und `'vier'` aus, ob die Ausleihe erlaubt ist, zu lang dauert oder ob die Eingabe keine Zahl ist. Eine Ausleihe dauert höchstens sieben Tage. Achte darauf, was ein Vergleich mit `NaN` ergibt.

:::solution[Lösung]
::code{file="examples/js/control-flow/{lang}/solution-3.mjs"}

Die Prüfung auf `NaN` steht zuerst. Jeder Vergleich mit `NaN` ergibt `false`, auch `NaN > 7`. Stünde die Prüfung auf mehr als sieben Tage vorne, landete `'vier'` im `else` und wäre erlaubt.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `if (today = 'Samstag')` weist zu, statt zu vergleichen, und ist immer wahr. | Mit `===` vergleichen. |
| `if (day === 'Mittwoch' \|\| 'Samstag')` gilt immer als wahr. | Beide Vergleiche ausschreiben, `day === 'Mittwoch' \|\| day === 'Samstag'`. |
| Ein `case` ohne `break` läuft in den nächsten Fall. | Jeden Fall mit `break` beenden. |
| `for (const day in week)` liefert die Stellen als Text, nicht die Tage. | Für Arrays `for...of` verwenden. |
| Eine `while`-Schleife ändert ihre Bedingung nie und läuft endlos. | Prüfen, dass jeder Durchgang der Abbruchbedingung näher kommt. Der Knopf «Stopp» bricht ein solches Programm ab. |
| `for (let i = 0; i <= week.length; i++)` liest einmal zu viel. | Mit `<` vergleichen, die letzte Stelle ist `length - 1`. |

## Selbstcheck

::::selfcheck
1. Wann nimmst du `switch` statt einer Kette von `else if`?
2. Was ist der Unterschied zwischen `break` und `continue`?
3. Warum passt der Bedingungsoperator direkt in ein `console.log`, ein `if` aber nicht?

:::solution[Antworten]
1. Wenn du einen Wert auf mehrere feste Fälle prüfst, etwa einen Wochentag. `switch` vergleicht mit `===`, für Bereiche wie «mehr als sieben Tage» bleibt `if`.
2. `break` beendet die ganze Schleife. `continue` beendet nur den aktuellen Durchgang, danach geht es mit dem nächsten Wert weiter.
3. Der Bedingungsoperator ist ein Ausdruck und liefert einen Wert. `if` ist eine Anweisung, die nur entscheidet, welcher Block läuft.
:::
::::

:::next
In Schritt 3 rechnet der Tresen-Helfer mit Funktionen die Tage einer Ausleihe und vergibt Nummern für Reservationen. Weiter geht es mit [J3 Funktionen und Gültigkeitsbereich](../functions/).
:::
