---
title: Einstiegstest JavaScript
description: Dreizehn kurze Programme, deren Ausgabe du vorhersagst. Der Test zeigt dir, welche Einheiten der JS-Werkstatt du vor Teil 1 auffrischen solltest.
sidebar:
  label: Einstiegstest
  order: 3
---

:::assignment
Martina Hostettler hat geschrieben, dass die Freiwilligen den Katalog für dich aus der Tabelle exportieren. «Nächste Woche hast du die Daten.» Ab Teil 1 arbeitest du mit diesen Daten in JavaScript. Bis dahin findest du heraus, welche Grundlagen sitzen und welche du auffrischen solltest.
:::

:::goals
Nach diesem Kapitel kannst du

- die Ausgabe von kurzem JavaScript-Code vorhersagen, ohne ihn auszuführen,
- einschätzen, welche Grundlagen von JavaScript du sicher beherrschst,
- die Einheiten der JS-Werkstatt auswählen, die du vor Teil 1 durcharbeitest.
:::

## Der Test

Vue setzt modernes JavaScript voraus. Wer beim Lesen von Vue-Code über `??`, eine Pfeilfunktion oder eine Destrukturierung stolpert, hat für Vue selbst kaum noch Aufmerksamkeit übrig. Der Test prüft deshalb die Grundlagen aus WEB1 und ein paar Dinge, die dort vielleicht zu kurz kamen.

Der Test hat dreizehn Fragen und dauert etwa 20 Minuten. Zu jeder Frage gehört ein kurzes Programm. Lies es, ohne es auszuführen, und schreib in das Feld, was es in der Konsole ausgibt. Gibt das Programm mehrere Werte oder mehrere Zeilen aus, trennst du sie mit Leerzeichen. Gross- und Kleinschreibung zählen. Mit «Prüfen» siehst du sofort, ob deine Antwort stimmt, und bei einer falschen Antwort öffnet sich die Lösung. Unter dem Test erscheint eine Liste der Einheiten aus der JS-Werkstatt, die zu den Fragen passen, die noch nicht geklappt haben. Den Test bewertet niemand, er ist nur für dich.

:::::quiz
::::question{answer="object" unit="variables"}
Welchen Typ meldet `typeof` für `null`?

::code{file="examples/js/entry-test/{lang}/q01.mjs" run="false"}

:::solution[Lösung]
`typeof null` ergibt `object`. Das ist ein Fehler aus der ersten Version von JavaScript, der nie korrigiert wurde, weil sonst bestehender Code nicht mehr liefe. Ob ein Wert `null` ist, prüfst du deshalb direkt mit `value === null`. Mehr dazu in der Einheit [Variablen, Typen und Operatoren](../../js/variables/).
:::
::::

::::question{answer="20 0|20, 0" unit="variables"}
Ein Ding hat kein Pfand, das Feld steht auf 0. Was gibt das Programm aus?

::code{file="examples/js/entry-test/{lang}/q02.mjs" run="false"}

:::solution[Lösung]
`||` nimmt den rechten Wert, sobald der linke als falsch gilt, und 0 gilt als falsch. `??` nimmt den rechten Wert nur, wenn der linke `null` oder `undefined` ist. Die Ausgabe ist `20 0`. Für ein Pfand, das 0 sein darf, ist `??` die richtige Wahl. Mehr dazu in der Einheit [Variablen, Typen und Operatoren](../../js/variables/).
:::
::::

::::question{answer="50" unit="control-flow"}
Wie gross ist die Summe am Schluss?

::code{file="examples/js/entry-test/{lang}/q03.mjs" run="false"}

:::solution[Lösung]
`continue` beendet den aktuellen Durchgang und springt zum nächsten Wert. Die 50 ist grösser als 40 und wird übersprungen, es bleiben 20 und 30. Die Summe ist 50. Mehr dazu in der Einheit [Kontrollstrukturen](../../js/control-flow/).
:::
::::

::::question{answer="3" unit="functions"}
Was gibt der dritte Aufruf von `next` zurück?

::code{file="examples/js/entry-test/{lang}/q04.mjs" run="false"}

:::solution[Lösung]
`createCounter` gibt eine Funktion zurück, die sich die Variable `count` merkt, auch nachdem `createCounter` fertig ist. Das heisst Closure. Alle drei Aufrufe erhöhen dieselbe Variable, der dritte gibt 3 zurück. Mehr dazu in der Einheit [Funktionen und Gültigkeitsbereich](../../js/functions/).
:::
::::

::::question{answer="unbekannt null|unbekannt, null" unit="functions"}
Der Parameter hat einen Standardwert. Was kommt bei `undefined` heraus und was bei `null`?

::code{file="examples/js/entry-test/{lang}/q05.mjs" run="false"}

:::solution[Lösung]
Ein Standardwert gilt nur, wenn ein Argument fehlt oder `undefined` ist. `null` ist ein Wert, den jemand absichtlich übergibt, deshalb bleibt er stehen. Die Ausgabe ist `unbekannt null`. Mehr dazu in der Einheit [Funktionen und Gültigkeitsbereich](../../js/functions/).
:::
::::

::::question{answer="50" unit="objects-and-arrays"}
Welches Pfand hat `first` am Schluss?

::code{file="examples/js/entry-test/{lang}/q06.mjs" run="false"}

:::solution[Lösung]
`const second = first` kopiert nicht das Objekt, sondern den Verweis darauf. Beide Variablen zeigen auf dasselbe Objekt, darum ist die Änderung über `second` auch über `first` zu sehen. Mehr dazu in der Einheit [Objekte und Arrays](../../js/objects-and-arrays/).
:::
::::

::::question{answer="Zelt Beamer|Zelt, Beamer" unit="objects-and-arrays"}
Welche zwei Namen gibt das Programm aus?

::code{file="examples/js/entry-test/{lang}/q07.mjs" run="false"}

:::solution[Lösung]
Beim Destrukturieren eines Arrays zählt die Position. Die leere Stelle zwischen den beiden Kommas überspringt das zweite Element, `third` bekommt das dritte. Die Ausgabe ist `Zelt Beamer`. Mehr dazu in der Einheit [Objekte und Arrays](../../js/objects-and-arrays/).
:::
::::

::::question{answer="RACL" unit="strings"}
Was bleibt vom Text übrig?

::code{file="examples/js/entry-test/{lang}/q08.mjs" run="false"}

:::solution[Lösung]
`toUpperCase` liefert einen neuen String in Grossbuchstaben. `slice(0, 4)` nimmt die Zeichen an den Stellen 0 bis 3, die Stelle 4 gehört nicht mehr dazu. Mehr dazu in der Einheit [Strings und Template Literals](../../js/strings/).
:::
::::

::::question{answer="TypeError" unit="classes"}
Die Methode wird ohne Objekt davor aufgerufen. Was gibt das Programm aus?

::code{file="examples/js/entry-test/{lang}/q09.mjs" run="false"}

:::solution[Lösung]
`getName` ist hier eine Funktion, die nichts mehr von `shop` weiss. Beim Aufruf ohne Objekt davor ist `this` in einem Modul `undefined`, und `this.name` wirft einen `TypeError`. Der `catch`-Block gibt den Namen des Fehlers aus. Mehr dazu in der Einheit [Klassen und this](../../js/classes/).
:::
::::

::::question{answer="a b c|a, b, c" unit="errors"}
In welcher Reihenfolge erscheinen die Ausgaben?

::code{file="examples/js/entry-test/{lang}/q10.mjs" run="false"}

:::solution[Lösung]
Der `try`-Block gibt `a` aus und wirft dann einen Fehler. Das Programm springt in den `catch`-Block, der die Meldung `b` ausgibt. Der `finally`-Block läuft immer, mit oder ohne Fehler, und gibt `c` aus. Die Antwort ist `a b c`. Mehr dazu in der Einheit [Fehler behandeln](../../js/errors/).
:::
::::

::::question{answer="Leiter" unit="dom-and-events"}
Der Listener hängt an der Liste, geklickt wird auf den letzten Eintrag. Was gibt die Seite in der Konsole aus?

::code{file="examples/js/entry-test/{lang}/q11.html" run="false"}

:::solution[Lösung]
Ein Klick auf ein Element steigt im DOM nach oben, über die Liste bis zum Dokument. Der Listener auf der Liste bekommt ihn deshalb auch. `event.target` ist das Element, auf das geklickt wurde, also der zweite Eintrag «Leiter». Mehr dazu in der Einheit [DOM und Events](../../js/dom-and-events/).
:::
::::

::::question{answer='{"name":"Zelt"}' unit="json"}
Welchen Text erzeugt `JSON.stringify`?

::code{file="examples/js/entry-test/{lang}/q12.mjs" run="false"}

:::solution[Lösung]
JSON kennt den Wert `undefined` nicht, darum lässt `JSON.stringify` das Feld `note` weg. Schlüssel und Strings stehen in doppelten Anführungszeichen, und ohne weitere Argumente gibt es keine Leerzeichen. Die Ausgabe ist `{"name":"Zelt"}`. Mehr dazu in der Einheit [JSON und Datenformate](../../js/json/).
:::
::::

::::question{answer="CHF 20.00" unit="formatting"}
Wie zeigt `Intl.NumberFormat` ein Pfand von 20 Franken?

::code{file="examples/js/entry-test/{lang}/q13.mjs" run="false"}

:::solution[Lösung]
Mit `style: 'currency'` setzt `Intl.NumberFormat` den Code der Währung vor den Betrag und zeigt zwei Stellen nach dem Punkt. Bei Geldbeträgen steht in der Schweiz ein Punkt, kein Komma. Mehr dazu in der Einheit [Zahlen und Daten formatieren](../../js/formatting/).
:::
::::
:::::

## So geht es weiter

Hast du alle Fragen richtig beantwortet, bist du für Teil 1 bereit. Die JS-Werkstatt bleibt trotzdem da, zum Nachschlagen, wenn ein Kapitel ein Thema voraussetzt.

Für jede Einheit, die der Test dir nennt, rechnest du mit etwa einer halben Stunde. Lies die Erklärungen, führe die Beispiele aus und löse mindestens die Aufgabe «Einstieg». Plane die Einheiten vor dem Beginn von Teil 1 ein, im Unterricht bleibt dafür wenig Zeit. Wenn du nach einer Einheit unsicher bist, frag im Unterricht nach.

:::assignment
Martina Hostettler meldet sich, sobald die Daten da sind. Bis dahin prüfst du mit dem [Kompetenzraster](../competences/), ob du für Teil 1 bereit bist.
:::
