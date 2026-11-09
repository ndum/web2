---
title: Variablen, Typen und Operatoren
description: Der Tresen-Helfer beginnt mit der Bohrmaschine in ein paar Variablen und macht aus dem Text eines Formularfelds eine Zahl. Variablen mit let und const, die primitiven Typen, Vergleiche mit ===, was als wahr und falsch gilt, und Standardwerte mit ??.
sidebar:
  order: 1
---

::::step{n="1"}
Der Tresen-Helfer ist ein kleines Programm für die Freiwilligen am Tresen von Lorraine Commons und beginnt in diesem Schritt. Du legst die Bohrmaschine in ein paar Variablen ab und machst aus dem Text eines Formularfelds eine Zahl.
::::

Ein Programm merkt sich Werte in Variablen, und jeder Wert hat einen Typ. Beides brauchst du überall im Kurs, denn Vue-Code besteht zum grössten Teil aus gewöhnlichem JavaScript.

:::goals
Nach diesem Schritt kannst du

- Variablen mit `const` und `let` anlegen und begründen, welche du wählst,
- die primitiven Typen von JavaScript nennen und mit `typeof` prüfen,
- Text aus einem Formularfeld in eine Zahl umwandeln und Werte mit `===` vergleichen,
- sagen, welche Werte als falsch gelten, und Standardwerte mit `??` setzen.
:::

## Variablen mit const und let

Eine Variable gibt einem Wert einen Namen. In modernem JavaScript legst du sie mit `const` oder `let` an. Eine Variable mit `const` lässt sich nicht neu zuweisen, eine mit `let` schon. Nimm `const`, wo immer es geht, und `let` nur, wenn sich der Wert später ändern muss, etwa bei einer Summe.

::code{file="examples/js/variables/{lang}/declare.mjs"}

`maxDays` steht mit `const` da, weil eine Ausleihe immer höchstens sieben Tage dauert. `depositOut` zählt das Pfand der ausgeliehenen Dinge zusammen. Für das Zelt, die Festbankgarnitur und den Velo-Anhänger liegen 50, 40 und 60 Franken in der Kasse, zusammen 150. `depositOut += 40` ist die kurze Form von `depositOut = depositOut + 40`. Entferne mit «Bearbeiten» die beiden Schrägstriche vor der letzten Zeile und führe das Programm erneut aus. Es bricht mit einem `TypeError` ab, weil sich `maxDays` nicht neu zuweisen lässt.

`const` schützt nur die Variable, nicht ihren Inhalt. Zeigt eine Konstante auf ein Objekt, kannst du seine Felder trotzdem ändern. Mehr dazu steht in [Objekte und Arrays](../objects-and-arrays/).

Das ältere `var` findest du noch in alten Anleitungen. Es gilt in der ganzen Funktion statt nur im Block, in dem es steht, und führt deshalb leicht zu Fehlern. Im Kurs kommt es nicht vor.

## Primitive Typen

JavaScript kennt sieben primitive Typen. Im Alltag begegnen dir fünf davon.

| Typ | Beispiel | Bedeutung |
|---|---|---|
| `string` | `'Raclette-Ofen'` | Text |
| `number` | `30`, `12.5` | Zahl, ganz oder mit Stellen nach dem Punkt |
| `boolean` | `true`, `false` | Wahrheitswert |
| `undefined` | `undefined` | noch kein Wert zugewiesen |
| `null` | `null` | absichtlich kein Wert |

Dazu kommen `bigint` für sehr grosse ganze Zahlen und `symbol` für eindeutige Schlüssel, beide brauchst du im Kurs nicht. Alles andere ist ein Objekt, auch Arrays und Funktionen. Mit `typeof` fragst du, welchen Typ ein Wert hat.

::code{file="examples/js/variables/{lang}/types.mjs"}

`typeof` liefert den Typ als Text. `available` ist ein Wahrheitswert, denn ein Vergleich ergibt immer `true` oder `false`. Bei `null` meldet `typeof` den Typ `object`. Das ist ein alter Fehler der Sprache, der aus Rücksicht auf bestehenden Code nie korrigiert wurde. Ob ein Wert `null` ist, prüfst du deshalb mit `value === null`. `pickup` hat noch keinen Wert bekommen und ist darum `undefined`. Den Wert `null` setzt dagegen jemand absichtlich. Im Katalog heisst `availableFrom: null`, dass ein Ding da ist.

## Text in eine Zahl umwandeln

Der Tresen-Helfer beginnt mit der Bohrmaschine. Ihr Name, ihr Pfand und das Datum, ab dem sie wieder da ist, stehen in je einer Variablen. Dazu kommt die Zahl der Tage, die jemand für eine Ausleihe in ein Formularfeld tippt.

::code{file="examples/js/variables/{lang}/desk.mjs"}

`availableFrom` ist `null`, weil die Bohrmaschine da ist, darum ergibt `availableFrom === null` den Wert `true`. Ein Formularfeld liefert immer Text, auch wenn darin 4 steht. Mit Text rechnet JavaScript anders als mit Zahlen, `'4' + 1` hängt die beiden aneinander und ergibt `'41'`. `Number(daysField)` wandelt den Text in die Zahl 4 um, und `typeof` zeigt in der letzten Zeile, dass `days` eine Zahl ist. Die Abbildung zeigt die Variablen des Tresen-Helfers mit ihren Werten und Typen.

![Variablen mit Wert und Typ. Links stehen die Variablen name, deposit, availableFrom, daysField und days, rechts ihre Werte mit dem Typ. name enthält den Text 'Bohrmaschine', deposit die Zahl 20 und availableFrom den Wert null. daysField enthält den Text '4' aus einem Formularfeld. Ein Pfeil mit Number(daysField) führt von diesem Text zu days, das die Zahl 4 enthält.](../../../assets/figures/de/j1-variables-and-types.svg)

`Number` liest auch Zahlen mit einem Dezimalpunkt wie `'12.5'`. Mit einem Komma wie in `'12,5'` liefert es dagegen `NaN`, wie bei jedem Text, der sich nicht als Zahl lesen lässt. Der nächste Abschnitt zeigt, wie du das prüfst. Wie du den Text aus einem echten Formular im Browser liest, zeigt [DOM und Events](../dom-and-events/).

## Werte vergleichen

`===` vergleicht Wert und Typ. `==` wandelt die Werte vorher um, wenn ihre Typen verschieden sind, und kommt dabei zu Ergebnissen, die kaum jemand erwartet. Verwende deshalb immer `===` und `!==`.

::code{file="examples/js/variables/{lang}/equality.mjs"}

Die erste Zeile zeigt den Unterschied. `daysField === days` ist falsch, weil ein Text und eine Zahl verschiedene Typen haben. `daysField == days` wandelt den Text vorher in eine Zahl um und ist wahr. Wandelst du selbst mit `Number` um, stimmt auch der strenge Vergleich.

Lässt sich ein Text nicht als Zahl lesen, liefert `Number` den Wert `NaN`, «Not a Number». `NaN` ist nicht einmal mit sich selbst gleich, darum prüfst du mit `Number.isNaN`.

Die dritte Zeile zeigt, welche Werte als wahr oder falsch gelten. In einer Bedingung wandelt JavaScript jeden Wert in einen Wahrheitswert um, `Boolean(...)` macht dasselbe ausdrücklich. Als falsch gelten `false`, die Zahl 0, der leere Text `''`, `null`, `undefined` und `NaN`, auf Englisch heissen sie «falsy». Alles andere gilt als wahr, auch der Text `'0'`.

## Standardwerte mit `??` und `||`

Oft fehlt ein Wert, und du willst an seiner Stelle einen Standardwert einsetzen. Dafür gibt es zwei Operatoren, die sich in einem Punkt unterscheiden.

::code{file="examples/js/variables/{lang}/fallback.mjs"}

`a || b` liefert `b`, sobald `a` als falsch gilt. Bei einer Anzahl ist das ein Fehler. Der Velo-Anhänger ist ausgeliehen, darum ist von den Dingen für Kinder keines da, und `kidsIn || 'unbekannt'` macht aus der gültigen 0 den Text «unbekannt». `a ?? b` liefert `b` nur, wenn `a` `null` oder `undefined` ist. Bei der Bemerkung zeigt sich der Unterschied von der anderen Seite. Für `||` gilt der leere Text als fehlend, für `??` ist er ein Wert, darum gibt die letzte Zeile eine leere Zeile aus.

Nimm `??`, wenn 0 oder ein leerer Text gültige Werte sind, und `||` nur dann, wenn du jeden falschen Wert ersetzen willst.

## Aufgaben

::::exercise[Einstieg]
Lege wie im Tresen-Helfer das Zelt für vier Personen in drei Variablen an. Es hat CHF 50 Pfand und ist ab dem 12. November wieder da. Gib Namen und Pfand aus, ob es da ist, und welchen Typ `availableFrom` hat.

:::solution[Lösung]
::code{file="examples/js/variables/{lang}/solution-1.mjs"}

Das Datum steht als Text im Format JJJJ-MM-TT in `availableFrom`, darum meldet `typeof` den Typ `string`. Weil der Wert nicht `null` ist, ergibt der Vergleich `false`, das Zelt ist ausgeliehen.
:::
::::

::::exercise[Vertiefung]
Im Formularfeld für die Tage kann `'4'` stehen, `'vier'` oder gar nichts. Wandle die drei Texte mit `Number` um und prüfe mit `Number.isNaN`, ob eine Zahl herauskommt. Was fällt dir beim leeren Feld auf?

:::solution[Lösung]
::code{file="examples/js/variables/{lang}/solution-2.mjs"}

Aus `'4'` wird die Zahl 4 und aus `'vier'` der Wert `NaN`. Das leere Feld ergibt 0 und nicht `NaN`, `Number.isNaN` hält es darum für eine gültige Zahl. Ein leeres Feld prüfst du deshalb vorher mit einem Vergleich wie `empty === ''`. Wie du mit `if` auf solche Fälle reagierst, zeigt Schritt 2.
:::
::::

::::exercise[Knobelei]
Im Formularfeld steht `'4'`. Sag voraus, was `daysField + 1`, `daysField - 1`, `daysField * 2`, `daysField == 4` und `daysField === 4` ergeben. Prüfe deine Antworten mit einem Programm und erkläre, warum `+` anders rechnet als `-` und `*`.

:::solution[Lösung]
::code{file="examples/js/variables/{lang}/solution-3.mjs"}

Die Ausgabe ist `41 3 8` und danach `true false`. Ist bei `+` eine Seite ein Text, hängt JavaScript die beiden Werte als Text aneinander. `-` und `*` gibt es nur für Zahlen, darum wandelt JavaScript `'4'` vorher in 4 um. `==` wandelt ebenfalls um, `===` nicht. Wandle Text aus einem Formular deshalb einmal mit `Number` um, statt dich auf solche Umwandlungen zu verlassen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Mit dem Inhalt eines Formularfelds wird gerechnet, und `'4' + 1` ergibt `'41'`. | Den Text zuerst mit `Number(...)` in eine Zahl umwandeln und mit `Number.isNaN` prüfen. |
| `==` statt `===`, und `0 == ''` ist plötzlich wahr. | Immer `===` und `!==` verwenden. |
| `kidsIn \|\| 'unbekannt'` ersetzt auch die Zahl 0. | `kidsIn ?? 'unbekannt'` verwenden, wenn 0 ein gültiger Wert ist. |
| `typeof value === 'object'` soll prüfen, ob ein Objekt da ist, und ist auch bei `null` wahr. | Zusätzlich `value !== null` prüfen. |
| `x === NaN` ist nie wahr. | `Number.isNaN(x)` verwenden. |
| Ein KI-Assistent schreibt `var`. | `const` verwenden und `let` nur, wenn sich der Wert ändert. |

## Selbstcheck

::::selfcheck
1. Wann legst du eine Variable mit `let` an statt mit `const`?
2. Welchen Typ hat der Wert eines Formularfelds, in dem 4 steht, und was tust du, bevor du damit rechnest?
3. Warum gibt `kidsIn || 'unbekannt'` bei 0 den Text «unbekannt» aus, `kidsIn ?? 'unbekannt'` aber 0?

:::solution[Antworten]
1. Wenn sich der Wert später ändern muss, etwa bei einer Summe wie `depositOut`. Sonst nimmst du `const`, dann kann niemand die Variable aus Versehen neu zuweisen.
2. Den Typ `string`, denn ein Formularfeld liefert immer Text. Mit `Number(...)` wandelst du ihn in eine Zahl um und prüfst mit `Number.isNaN`, ob das geklappt hat.
3. `||` nimmt den rechten Wert, sobald der linke als falsch gilt, und 0 gilt als falsch. `??` nimmt ihn nur bei `null` oder `undefined`.
:::
::::

:::next
In Schritt 2 entscheidet der Tresen-Helfer, ob die Bohrmaschine da ist und ob der Tresen offen ist. Weiter geht es mit [J2 Kontrollstrukturen](../control-flow/).
:::
