---
title: Funktionen und Arrays
description: Funktionen als Argumente, die Methoden map, filter, find, some, every und reduce, sortieren mit toSorted und localeCompare und Funktionen, die Funktionen bauen.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler bereitet die nächste Vorstandssitzung vor und hat zwei Wünsche aufgeschrieben.

> Als Vorstand möchte ich wissen, wie viele Dinge wir in jeder Kategorie haben, damit wir entscheiden können, wo wir als Nächstes Dinge anschaffen.

> Als Freiwillige am Tresen möchte ich sehen, welches Werkzeug gerade da ist, nach Namen sortiert, damit ich Mitgliedern am Telefon schnell antworten kann.

Die Akzeptanzkriterien lauten:

1. Die Übersicht zeigt für jede Kategorie die Anzahl Dinge.
2. Sie nennt das Werkzeug, das da ist, alphabetisch sortiert, auch Namen mit Umlauten am richtigen Platz.
3. Der Katalog selbst bleibt dabei unverändert.
:::

:::goals
Nach diesem Kapitel kannst du

- Funktionen als Argumente übergeben und Callbacks lesen,
- Listen mit `map`, `filter`, `find`, `some` und `every` auswerten,
- mit `reduce` Summen und Zählungen berechnen,
- Listen mit `toSorted` und `localeCompare` sortieren, ohne das Original zu ändern,
- Funktionen schreiben, die andere Funktionen bauen.

Pfeilfunktionen und Closures kennst du aus der Einheit [Funktionen und Gültigkeitsbereich](../../js/functions/) der JS-Werkstatt.
:::

## Funktionen als Argumente

Eine Funktion, die du einer anderen Funktion übergibst, damit diese sie aufruft, heisst Callback. Du kennst das von `addEventListener`. Auch Arrays haben Methoden, die für jedes Element einen Callback aufrufen.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/callbacks.mjs"}

`forEachItem` zeigt, was dabei passiert. Die Schleife steckt in der Funktion, und der Callback sagt, was mit jedem Element geschehen soll. `forEach` ist die eingebaute Variante und übergibt dem Callback neben dem Element auch seine Stelle. Die folgenden Methoden funktionieren alle nach diesem Muster, sie unterscheiden sich darin, was sie mit den Ergebnissen des Callbacks machen.

## map und filter

`map` ruft den Callback für jedes Element auf und baut aus den Rückgabewerten eine neue Liste, gleich lang wie die alte. `filter` behält die Elemente, für die der Callback `true` liefert.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/map-filter.mjs"}

Beide Methoden ändern die alte Liste nicht, sie liefern eine neue. Darum lassen sie sich verketten. Die letzte Anweisung filtert zuerst das Werkzeug, das da ist, und macht aus den übrigen Dingen eine Liste von Namen. Diese Kette ist die Hälfte des zweiten Wunsches von Martina Hostettler.

## find, some und every

Manchmal braucht es nur ein Element oder eine Antwort mit Ja oder Nein.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/find-some.mjs"}

`find` liefert das erste Element, für das der Callback `true` liefert, oder `undefined`, wenn keines passt. `findIndex` liefert die Stelle oder -1. `some` fragt, ob mindestens ein Element passt, `every`, ob alle passen. Alle vier hören auf, sobald die Antwort feststeht, und prüfen nicht mehr Elemente als nötig.

## reduce

`reduce` fasst eine Liste zu einem einzigen Wert zusammen. Der Callback bekommt das bisherige Ergebnis und das nächste Element und gibt das neue Ergebnis zurück. Das zweite Argument von `reduce` ist der Startwert.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/reduce.mjs"}

Die erste Zählung beginnt bei 0 und zählt alle Pfänder zusammen. Die zweite beginnt mit einem leeren Objekt und zählt für jede Kategorie mit, wie oft sie vorkommt. `counts[item.category] ?? 0` liefert 0, solange eine Kategorie noch fehlt. Seit 2024 gibt es für das Gruppieren auch `Object.groupBy`, das die Dinge einer Kategorie als Liste sammelt. Für eine Zählung genügt `reduce`.

## Sortieren ohne Nebenwirkung

`sort` sortiert ein Array an Ort und Stelle und ändert damit das Original. `toSorted` liefert eine sortierte Kopie. Wie verglichen wird, sagt eine Vergleichsfunktion. Sie liefert eine negative Zahl, wenn `a` vor `b` kommt, eine positive, wenn `b` vor `a` kommt, und 0, wenn beide gleich sind.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/sort.mjs"}

`localeCompare` vergleicht Text nach den Regeln einer Sprache und setzt Umlaute an die richtige Stelle. Für Zahlen genügt eine Subtraktion, `b.deposit - a.deposit` sortiert absteigend. Die letzte Zeile zeigt, dass das Original seine Reihenfolge behalten hat.

## Funktionen, die Funktionen bauen

Eine Funktion kann eine Funktion zurückgeben, die sich ihre Argumente merkt. So entsteht ein Callback für `filter` nach Mass.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/closure.mjs"}

`byCategory('Werkzeug')` liefert eine neue Funktion, die nur noch ein Ding braucht und die Kategorie aus ihrer Closure kennt. Solche Funktionen machen Code lesbar, `items.filter(isTool)` sagt, was es tut. In der Knobelei baust du so einen Filter aus mehreren Kriterien.

## Im Code

Arbeite mit dem Beispiel zu `reduce`. Lies den Code und schreib auf, was du erwartest, bevor du ihn ausführst.

::code{file="examples/01-javascript/functions-and-arrays/{lang}/reduce.mjs"}

1. Was gibt die erste Zählung aus, wenn du den Startwert 0 weglässt? Und was die zweite ohne `{}`?
2. Ändere die zweite Zählung so, dass sie für jede Kategorie die Summe der Pfänder liefert statt der Anzahl.
3. Wie sieht die Zählung aus, wenn du sie mit einer Schleife `for...of` schreibst? Was ist leichter zu lesen?
4. Was gibt `[].reduce((sum, item) => sum + item.deposit)` aus, ohne Startwert und mit einer leeren Liste?

Ohne Startwert nimmt `reduce` das erste Element als Startwert. Bei der ersten Zählung ist das ein Objekt, und die Summe wird zu Text. Bei der zweiten zählt `reduce` in die Bohrmaschine hinein, ändert sie dabei und lässt sie selbst in der Zählung aus. Bei einer leeren Liste meldet `reduce` ohne Startwert einen `TypeError`. Gib den Startwert deshalb immer an.

## Aufgaben

Die Aufgaben bauen die Auswertungen für die Vorstandssitzung. Du findest das Projekt im Kursrepo im Ordner `exercises/01-javascript/arrays/de`, mit dem ganzen Katalog in `data/items.json`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Mit `npm run overview` siehst du die Übersicht, die deine Funktionen verwendet. Zu Beginn ist sie leer.

::::exercise[Einstieg]
Schreib in `src/catalog.js` die Funktion `availableNames(items, category)`. Sie liefert die Namen der Dinge einer Kategorie, die da sind, nach den Regeln der Sprache sortiert. Für das Werkzeug sind es acht Namen, von der Bohrmaschine bis zum Werkzeugkoffer.

:::solution[Lösung]
::code{file="exercises/01-javascript/arrays/solution/{lang}/src/catalog.js" lines="1-7"}

`filter` behält das Werkzeug, das da ist, `map` macht daraus Namen, und `toSorted` sortiert sie mit `localeCompare`. Ohne `localeCompare` stünde die Ölkanne aus dem zweiten Test nach der Zange, weil das Ö einen höheren Code hat als das Z.
:::
::::

::::exercise[Vertiefung]
Schreib die Funktion `countByCategory(items)`. Sie liefert ein Objekt, das für jede Kategorie die Anzahl Dinge nennt. Im Katalog sind es zehn pro Kategorie.

:::solution[Lösung]
::code{file="exercises/01-javascript/arrays/solution/{lang}/src/catalog.js" lines="9-15"}

Der Startwert ist ein leeres Objekt, und jede Runde zählt bei der Kategorie des Dings eins dazu. Wichtig ist das `return counts` am Ende des Callbacks. Ohne es wäre das Ergebnis der nächsten Runde `undefined`.
:::
::::

::::exercise[Knobelei]
Schreib die Funktion `createFilter(criteria)`. Sie bekommt ein Objekt mit den Kriterien `category`, `query` und `onlyAvailable`, jedes davon freiwillig, und liefert eine Funktion, die `filter` verwenden kann. Der Suchtext soll ohne Rücksicht auf Gross- und Kleinschreibung im Namen vorkommen.

:::solution[Lösung]
::code{file="exercises/01-javascript/arrays/solution/{lang}/src/catalog.js" lines="17-24"}

Die Kriterien zerlegt die Funktion schon in der Parameterliste. Den Suchtext bereitet sie einmal vor, nicht bei jedem Ding. Die zurückgegebene Funktion prüft jedes Kriterium nur, wenn es angegeben ist, `!category ||` lässt jedes Ding durch, solange keine Kategorie gesetzt ist. Diesen Filter brauchst du in Teil 3 wieder, wenn der Katalog in Vue ein Suchfeld bekommt.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `map` mit geschweiften Klammern liefert eine Liste voller `undefined`. | Im Block `return` schreiben oder die Klammern weglassen. |
| Das Ergebnis von `forEach` wird weiterverwendet und ist `undefined`. | `forEach` liefert nichts. Für eine neue Liste `map` oder `filter` nehmen. |
| `find` findet nichts, und der Zugriff auf `.name` wirft einen `TypeError`. | Das Ergebnis prüfen oder `?.name` schreiben. |
| `reduce` ohne Startwert meldet bei einer leeren Liste einen `TypeError`. | Den Startwert immer angeben. |
| `sort` ändert den Katalog für alle, die ihn verwenden. | `toSorted` verwenden. |
| Zahlen werden mit `sort()` als Text sortiert, 10 kommt vor 9. | Eine Vergleichsfunktion wie `(a, b) => a - b` übergeben. |
| Ein KI-Assistent installiert eine Bibliothek wie Lodash für `groupBy` oder `sortBy`. | `reduce`, `Object.groupBy` und `toSorted` erledigen das ohne Paket. |

## Selbstcheck

::::selfcheck
1. Was ist der Unterschied zwischen `map` und `forEach`?
2. Was liefert `find`, wenn kein Element passt, und was `filter`?
3. Wozu dient das zweite Argument von `reduce`?
4. Warum verwendet der Kurs `toSorted` statt `sort`?

:::solution[Antworten]
1. `map` liefert eine neue Liste mit den Rückgabewerten des Callbacks. `forEach` ruft den Callback nur auf und liefert `undefined`.
2. `find` liefert `undefined`, `filter` eine leere Liste.
3. Es ist der Startwert. Ohne ihn nimmt `reduce` das erste Element und meldet bei einer leeren Liste einen Fehler.
4. `toSorted` liefert eine sortierte Kopie und lässt das Original unverändert. `sort` ändert das Array selbst, eine Nebenwirkung, die andere Stellen überrascht.
:::
::::

:::assignment
Die Auswertungen haben den Vorstand überzeugt. Martina Hostettler hat gute Nachrichten. Der Katalog liegt ab jetzt auf dem Server des Vereins, und die Freiwilligen pflegen ihn dort direkt. Die Übersicht soll ihn von dort laden. Ein Server antwortet aber nicht sofort, und manchmal gar nicht. Wie JavaScript mit solchem Warten umgeht, zeigt das nächste Kapitel.
:::
