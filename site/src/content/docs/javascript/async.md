---
title: Asynchrones JavaScript
description: Die Ereignisschleife, Promises, async und await, Daten mit fetch laden, Lade- und Fehlerzustände anzeigen und Anfragen mit AbortController abbrechen.
sidebar:
  order: 4
---

:::assignment
Der Katalog liegt jetzt auf dem Server des Vereins, und die Freiwilligen pflegen ihn dort direkt. Martina Hostettler hat den nächsten Wunsch aufgeschrieben.

> Als Freiwillige am Tresen möchte ich, dass die Übersicht immer den aktuellen Katalog vom Server zeigt, damit ich mich auf sie verlassen kann.

Die Akzeptanzkriterien lauten:

1. Die Übersicht lädt den Katalog vom Server des Vereins.
2. Ist der Server nicht erreichbar oder meldet er einen Fehler, erscheint eine verständliche Meldung.
3. Antwortet der Server nicht, gibt die Übersicht nach fünf Sekunden auf.
:::

:::goals
Nach diesem Kapitel kannst du

- die Reihenfolge von Code mit Timern und Promises vorhersagen und mit der Ereignisschleife erklären,
- Promises mit `then`, `catch` und `finally` und mit `async` und `await` verwenden,
- Daten mit `fetch` laden und dabei Fehler des Servers und des Netzes unterscheiden,
- Lade- und Fehlerzustände festhalten und anzeigen,
- eine Anfrage mit `AbortController` abbrechen.
:::

## Warten, ohne zu blockieren

Eine Anfrage an einen Server dauert, Millisekunden im besten Fall, Sekunden bei einer schlechten Verbindung. JavaScript läuft in einem einzigen Thread. Würde es auf die Antwort warten, stünde die ganze Seite still, kein Klick und kein Tippen käme an. Darum übergibt JavaScript das Warten an den Browser oder an Node und läuft weiter. Ist die Antwort da, ruft der Browser den Code auf, der sie verarbeitet. Dieser Code läuft asynchron, also später als der Code, der ihn angestossen hat.

## Die Ereignisschleife

Sag voraus, in welcher Reihenfolge die vier Zeilen erscheinen, bevor du das Beispiel ausführst.

::code{file="examples/01-javascript/async/{lang}/order.mjs"}

Die Ziffern verraten die Reihenfolge. Zuerst läuft das Programm von oben nach unten durch, die Zeilen 1 und 2. Erst dann kommen die Callbacks an die Reihe, und das Promise vor dem Timer, obwohl der Timer 0 Millisekunden wartet.

![Die Ereignisschleife mit Task-Queue und Microtask-Queue. Links steht der Aufrufstapel mit den Funktionen, die gerade laufen. Ein Pfeil führt nach rechts zu Timern und Anfragen, etwa setTimeout und fetch. Ist ein Timer abgelaufen, kommt sein Callback in die Task-Queue, ebenso Klicks. Promises legen ihre Fortsetzungen in die Microtask-Queue. Ist der Stapel leer, holt die Ereignisschleife zuerst alle Microtasks und danach einen Task.](../../../assets/figures/de/p1c4-event-loop.svg)

Der Aufrufstapel hält die Funktionen, die gerade laufen. Timer und Anfragen übernimmt der Browser oder Node. Ist ein Timer abgelaufen, kommt sein Callback in die Task-Queue, ebenso die Callbacks für Klicks und andere Events. Die Fortsetzungen von Promises kommen in die Microtask-Queue. Ist der Stapel leer, holt die Ereignisschleife zuerst alle Microtasks und danach einen einzigen Task, dann wieder alle Microtasks. Im Browser zeichnet sie zwischen den Tasks auch die Seite neu. Ein Callback, der lange rechnet, blockiert deshalb alles andere, auch das Neuzeichnen.

## Promises

Ein Promise steht für ein Ergebnis, das später kommt. Es ist zuerst offen und wird dann entweder erfüllt, mit einem Wert, oder abgelehnt, mit einem Fehler. Mit `then` hängst du Code an, der mit dem Wert weiterarbeitet, mit `catch` Code für den Fehler und mit `finally` Code, der in beiden Fällen läuft.

::code{file="examples/01-javascript/async/{lang}/promise.mjs"}

`answerLater` und `failLater` sind Stellvertreter für einen langsamen Server. Sie verpacken einen Timer in ein Promise, `resolve` erfüllt es, `reject` lehnt es ab. Beide starten fast gleichzeitig. Die Meldung des Fehlers erscheint zuerst, weil ihr Timer nach 100 Millisekunden abläuft, der andere erst nach 300. Ergebnisse kommen in der Reihenfolge an, in der sie fertig werden, nicht in der Reihenfolge des Codes.

`then` liefert selbst wieder ein Promise. Darum lassen sich `then`, `catch` und `finally` zu einer Kette verbinden, in der jeder Schritt mit dem Ergebnis des vorherigen arbeitet.

## async und await

Mit `async` und `await` liest sich Code mit Promises fast wie gewöhnlicher Code. Eine Funktion mit `async` liefert immer ein Promise. In ihr hält `await` die Funktion an, bis das Promise erfüllt ist, und liefert seinen Wert. Den Thread hält `await` dabei nicht an, die Ereignisschleife arbeitet in dieser Zeit anderes ab.

::code{file="examples/01-javascript/async/{lang}/await.mjs"}

`oneAfterTheOther` wartet auf die Dinge und fragt erst danach nach den Mitgliedern, zusammen 400 Millisekunden. `atTheSameTime` startet beide Anfragen sofort und wartet mit `Promise.all` auf beide, das dauert so lange wie die langsamere. Unabhängige Anfragen startest du deshalb gleichzeitig. Lehnt eines der Promises ab, lehnt auch `Promise.all` ab. Brauchst du alle Ergebnisse, auch die abgelehnten, nimmst du `Promise.allSettled`.

In einem Modul darf `await` auch ausserhalb einer Funktion stehen, wie in den letzten Zeilen des Beispiels. Ein abgelehntes Promise fängst du mit `try` und `catch` ab, genau wie einen Fehler aus der Einheit [Fehler behandeln](../../js/errors/).

## fetch

`fetch` schickt eine Anfrage an einen Server und liefert ein Promise, das sich mit einer Antwort erfüllt, einem `Response`. Die Beispiele dieses Kapitels laufen im Browser ohne den Server des Vereins, darum antwortet ein Stellvertreter. Er liefert echte Objekte vom Typ `Response`, wie `fetch` es täte.

::code{file="examples/01-javascript/async/{lang}/fetch.mjs"}

`response.ok` ist `true`, wenn der Status zwischen 200 und 299 liegt. `response.status` nennt den Status, etwa 200 für Erfolg oder 404, wenn es die Adresse nicht gibt. Den Inhalt liest `response.json()` und wandelt ihn mit `JSON.parse` in Daten um. Auch das liefert ein Promise, weil die Daten noch unterwegs sein können, wenn die Antwort schon da ist.

Wichtig ist der letzte Fall. `fetch` lehnt bei Status 404 oder 500 nicht ab. Für `fetch` ist eine Antwort eine Antwort, auch wenn sie einen Fehler meldet. Abgelehnt wird das Promise nur, wenn gar keine Antwort kommt, etwa weil das Netz fehlt oder der Server nicht läuft, und dann mit einem `TypeError`. Den Status musst du selbst prüfen.

## Laden und Fehler anzeigen

Während eine Anfrage läuft, soll die Oberfläche das zeigen, und wenn sie scheitert, eine Meldung, mit der Mitglieder etwas anfangen können. Dafür hält der Code den Zustand der Anfrage fest.

::code{file="examples/01-javascript/async/{lang}/states.mjs"}

Der Zustand ist ein Objekt mit dem Feld `status`, das `loading`, `success` oder `error` sein kann, dazu die Daten und die Meldung. Die Oberfläche richtet sich nach diesem Objekt. Im Browser sieht das so aus.

::code{file="examples/01-javascript/async/{lang}/loading.html"}

Die Seite zeigt eine halbe Sekunde lang den Hinweis zum Laden, danach die Liste und die Anzahl. Dieses Muster mit drei Zuständen begegnet dir in jeder App, die Daten lädt. In Vue schreibst du es in Teil 7 wieder, dann zeigt die Oberfläche die Zustände von selbst an.

## Anfragen abbrechen

Manchmal braucht es eine Antwort nicht mehr, etwa wenn ein Mitglied weitertippt und eine neue Suche schickt, oder sie kommt zu spät. Mit einem `AbortController` brichst du eine Anfrage ab.

::code{file="examples/01-javascript/async/{lang}/abort.mjs"}

Der Controller hat ein Signal, das du `fetch` mitgibst. `controller.abort()` bricht die Anfrage ab, und das Promise lehnt mit einem Fehler namens `AbortError` ab. Für eine Wartezeit gibt es `AbortSignal.timeout(300)`, das nach 300 Millisekunden von selbst abbricht, mit einem Fehler namens `TimeoutError`. Echte Anfragen bricht `fetch` genau so ab, der Stellvertreter im Beispiel ahmt das nach.

## Im Code

Arbeite mit dem Beispiel zu Promises. Schreib auf, was du erwartest, bevor du etwas änderst.

::code{file="examples/01-javascript/async/{lang}/promise.mjs"}

1. Was ändert sich an der Ausgabe, wenn `failLater` 500 statt 100 Millisekunden wartet?
2. Entferne das `catch` am Schluss. Was meldet der Knopf «Ausführen», und was Node mit `node promise.mjs`?
3. Schreib den ersten Teil mit `async` und `await` um, in einer Funktion mit `try` und `finally`.
4. Was gibt `console.log(answerLater(300, 'x'))` aus, und warum nicht `x`?

## Aufgaben

Die Aufgaben bauen die Übersicht, die den Katalog vom Server lädt. Du findest das Projekt im Kursrepo im Ordner `exercises/01-javascript/async/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Die Tests ersetzen `fetch` durch Stellvertreter und brauchen keinen Server. Im Projekt steckt aber auch ein kleiner Server, der den Katalog unter `http://localhost:3000/items` ausliefert. Starte ihn in einem Terminal und die Übersicht in einem zweiten.

```bash
npm run server
npm run overview
```

Mit `?status=503` am Ende der Adresse in `src/load.js` antwortet der Server mit einem Fehler, mit `?delay=8000` erst nach acht Sekunden. Beendest du den Server mit Ctrl+C, ist er nicht erreichbar. So probierst du jede Aufgabe auch von Hand aus.

::::exercise[Einstieg]
Schreib in `src/load.js` die Funktion `loadItems(url)`. Sie lädt den Katalog mit `fetch` von der übergebenen Adresse und liefert die Dinge als Array. Mit dem laufenden Server zeigt `npm run overview` danach 60 Dinge.

:::solution[Lösung]
Zwei Zeilen genügen, `const response = await fetch(url)` und `return response.json()`. Die Funktion braucht dafür `async`. Sie gibt das Promise von `response.json()` zurück, und wer `loadItems` mit `await` aufruft, bekommt die Dinge. Die vollständige Lösung mit allen drei Stufen steht in der Knobelei.
:::
::::

::::exercise[Vertiefung]
Exportiere aus `src/load.js` eine Fehlerklasse `LoadError`. `loadItems` wirft sie mit der Meldung «Der Server antwortet mit dem Status 503.», wenn der Server einen Fehler meldet, mit seinem Status statt 503. Ist der Server nicht erreichbar, lautet die Meldung «Der Server ist nicht erreichbar.».

:::solution[Lösung]
Die Klasse erbt von `Error` und setzt ihren Namen, wie in der Einheit [Fehler behandeln](../../js/errors/). `loadItems` fängt den `TypeError` von `fetch` mit `try` und `catch` ab und wirft stattdessen einen `LoadError`. Nach dem `try` prüft sie `response.ok` und wirft bei einem Fehler des Servers einen `LoadError` mit dem Status. Die Übersicht gibt dann nur noch `error.message` aus. Den Code zeigt die Lösung der Knobelei.
:::
::::

::::exercise[Knobelei]
`loadItems` soll nicht ewig warten. Ergänze eine Option `timeout` in Millisekunden mit dem Standardwert 5000, `loadItems(url, { timeout: 1000 })`. Antwortet der Server nicht rechtzeitig, wirft die Funktion einen `LoadError` mit der Meldung «Der Server antwortet zu langsam.».

:::solution[Lösung]
::code{file="exercises/01-javascript/async/solution/{lang}/src/load.js"}

`AbortSignal.timeout` bricht die Anfrage nach der Wartezeit ab, und `fetch` lehnt mit einem `TimeoutError` ab. Der `catch`-Block unterscheidet am Namen des Fehlers, ob die Zeit abgelaufen ist oder der Server fehlt. `cause` hängt den ursprünglichen Fehler an, so bleibt er für die Fehlersuche erhalten, ohne dass Mitglieder ihn sehen. Die Wartezeit steckt in einem Objekt mit Standardwert, so bleibt `loadItems(url)` ohne Optionen gültig.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `console.log(loadItems(url))` zeigt `Promise { <pending> }` statt der Dinge. | `await` davor schreiben oder mit `then` weiterarbeiten. |
| Bei Status 404 meldet `fetch` keinen Fehler, und `response.json()` scheitert an einer Fehlerseite. | Vor dem Lesen `response.ok` prüfen. |
| `await` in einem Callback von `forEach` wartet nicht. | `for...of` mit `await` verwenden oder die Promises mit `map` sammeln und mit `Promise.all` abwarten. |
| Ein abgelehntes Promise ohne `catch` erscheint als `Uncaught (in promise)` in der Konsole. | `await` in `try` und `catch` setzen oder `.catch` anhängen. |
| `response.json()` ohne `await` liefert ein Promise statt der Daten. | `await response.json()` schreiben. |
| Zwei unabhängige Anfragen laufen mit zwei `await` nacheinander und dauern doppelt so lange. | Beide starten und mit `Promise.all` auf beide warten. |
| Ein KI-Assistent installiert ein Paket wie axios für eine einfache Anfrage. | `fetch` ist in Browsern und in Node eingebaut und genügt. |

## Selbstcheck

::::selfcheck
1. In welcher Reihenfolge erscheinen Ausgaben aus gewöhnlichem Code, aus `then` und aus `setTimeout` mit 0 Millisekunden, und warum?
2. Warum lehnt `fetch` bei Status 503 nicht ab, und woran merkst du den Fehler?
3. Was ist der Unterschied zwischen zwei `await` nacheinander und `Promise.all`?
4. Wozu dient ein `AbortController`?

:::solution[Antworten]
1. Zuerst der gewöhnliche Code, dann `then`, dann der Timer. Erst wenn der Stapel leer ist, holt die Ereignisschleife Callbacks, und zwar alle Microtasks vor dem nächsten Task.
2. Für `fetch` ist jede Antwort ein Erfolg, auch eine mit einem Fehler. Abgelehnt wird nur, wenn keine Antwort kommt. Den Fehler zeigt `response.ok`, das bei 503 `false` ist.
3. Zwei `await` nacheinander starten die zweite Anfrage erst, wenn die erste fertig ist. `Promise.all` wartet auf Anfragen, die schon gleichzeitig laufen.
4. Er bricht eine laufende Anfrage ab, etwa wenn ihre Antwort niemand mehr braucht oder sie zu lange dauert.
:::
::::

:::assignment
Die Übersicht lädt den Katalog vom Server und meldet Probleme verständlich. Martina Hostettler hat sie dem Vorstand gezeigt, und dort kam eine Frage auf. «Wozu braucht es eine App? Würde nicht eine gewöhnliche Website mit Seiten reichen?» Teil 2 geht dieser Frage nach. Vorher prüfst du mit dem [Kompetenzraster](../competences/), ob du für Teil 2 bereit bist. Wie Vue merkt, dass sich Daten ändern, zeigt der Exkurs [Proxy und Getter](../proxies/).
:::
