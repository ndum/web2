---
title: Testen
description: Arten von Tests, Funktionen mit Vitest, Komponenten mit Vue Test Utils, Stores und Composables mit ersetztem fetch, die ganze App im Test, Tests, die sich lohnen, und Mutanten, die die Tests selbst prüfen.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler meldet einen alten Fehler. Nach einer Änderung an den Regeln nimmt die App wieder Anfragen an, deren erster Tag schon vorbei ist.

> Als Vorstand möchte ich, dass ein behobener Fehler nicht zurückkommt, damit sich Mitglieder und Team auf die Regeln der App verlassen können.

Der Freiwillige findet in den Tests der App keinen, der einen Tag in der Vergangenheit prüft. Die Akzeptanzkriterien lauten:

1. Die Regeln einer Anfrage haben Tests, die jeden Fehler bemerken, der schon einmal aufgetreten ist.
2. Komponenten haben Tests, die prüfen, was jemand sieht und was sie melden.
3. Stores haben Tests, die eine Antwort der API vorgeben, ohne Server.
:::

:::goals
Nach diesem Kapitel kannst du

- Arten von Tests und ihren Zweck unterscheiden,
- Funktionen mit Vitest testen,
- Komponenten mit Vue Test Utils über ihr Verhalten testen,
- Stores und Composables testen und `fetch` dabei ersetzen,
- entscheiden, was sich zu testen lohnt, und deine Tests mit Mutanten prüfen.
:::

## Arten von Tests

Die [Vue-Dokumentation](https://vuejs.org/guide/scaling-up/testing.html) unterscheidet drei Arten. Unit-Tests prüfen eine Funktion, ein Composable oder einen Store für sich, sie empfiehlt dafür Vitest. Komponententests zeigen eine Komponente und prüfen, was sie darstellt und meldet, mit Vitest und Vue Test Utils. End-to-End-Tests steuern die ganze App in einem echten Browser, dafür nennt sie Playwright und Cypress. Alle Übungsprojekte dieses Kurses haben Tests der ersten beiden Arten, die du seit Teil 3 mit `npm test` startest.

## Eine Funktion testen

Ein Test ruft eine Funktion mit bekannten Werten auf und vergleicht ihr Ergebnis mit `expect`. `describe` fasst Tests zusammen, `it` beschreibt einen Test in einem Satz. Die Regeln einer Anfrage haben in der Fallbeispiel-App jetzt einen Test für den Fehler, der zurückgekommen ist.

::code{file="case/08-architecture/{lang}/tests/reservation.test.js" lines="17-33"}

Der Tag steht als Argument im Test, darum gibt der Test morgen dasselbe Ergebnis wie heute. Der zweite Test prüft zehn Tage, eine falsche Grenze von acht oder neun Tagen bemerkt er nicht. Grenzen prüft ein Test darum auf beiden Seiten, gerade noch erlaubt und gerade nicht mehr.

## Eine Komponente testen

Vue Test Utils zeigt eine Komponente mit `mount`, findet Elemente mit `find`, füllt Felder mit `setValue` und löst Events mit `trigger` aus. Beide geben ein Promise zurück, und erst nach `await` steht der neue Stand im DOM. Was eine Komponente gemeldet hat, steht in `emitted`.

::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-2.test.js" lines="6-25"}

Laut Vue-Dokumentation prüft ein Komponententest die öffentliche Schnittstelle, also Props, Slots und Events, und was danach im DOM steht. Interne Variablen prüft er nicht, sonst bricht er bei jedem Umbau, auch wenn die Komponente noch tut, was sie soll. Auch ein Schnappschuss des HTML allein sagt nach der Dokumentation nicht, ob die Komponente richtig arbeitet.

## Einen Store testen und fetch ersetzen

Ein Store braucht für jeden Test ein frisches Pinia, wie in Kapitel 7.2. `fetch` ersetzt der Test mit `vi.stubGlobal` durch eine Funktion von `vi.fn`, die eine vorbereitete Antwort liefert und jeden Aufruf notiert. So prüft er Adresse, Methode, Kopfzeilen und Inhalt, ohne dass ein Server läuft.

::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-3.test.js" lines="1-27"}

`vi.unstubAllGlobals` stellt nach jedem Test das echte `fetch` wieder her, sonst wirkt die Attrappe in den nächsten Test hinein.

## Composables testen

Ein Composable, das nur `ref`, `computed` und `watch` verwendet, ruft ein Test direkt auf und prüft die zurückgegebenen Refs, wie die Tests zu Kapitel 5.4. Verwendet es Hooks wie `onMounted` oder `inject`, braucht es laut Vue-Dokumentation eine Komponente als Wirt. Die Dokumentation zeigt dafür eine kleine Funktion, die eine App nur für das Composable anlegt und montiert.

## Die App im Test

Die Tests der Fallbeispiel-App zeigen die ganze App mit Router, Pinia und der API und ersetzen nur `fetch` durch eine Attrappe der Kurs-API in `tests/fake-api.js`. Eine Hilfsfunktion führt zu einer Adresse, wie nach dem Eintippen im Browser.

::code{file="case/08-architecture/{lang}/tests/visit.js" lines="14-38"}

Solche Tests prüfen das Zusammenspiel von Seiten, Stores und Router und brauchen trotzdem keinen Browser. Sie laufen in happy-dom, einer Nachbildung des Browsers in Node, die nichts zeichnet. Ob ein Knopf sichtbar über einem anderen liegt, prüft erst ein End-to-End-Test.

## Tests, die sich lohnen

Am meisten bringen Tests für Regeln mit Grenzen, für Fehlerzustände, für das, was Mitglieder sehen, und für jeden Fehler, der schon einmal aufgetreten ist. Ein solcher Test entsteht am besten vor der Korrektur. Er scheitert erst, und nach der Korrektur besteht er. Wenig bringen Tests, die Vue selbst oder eine Bibliothek prüfen, und Tests, die jede interne Zeile festschreiben.

## Tests prüfen mit Mutanten

Die Abdeckung zeigt, welche Zeilen ein Test ausgeführt hat. Vitest misst sie mit dem Paket `@vitest/coverage-v8` und `vitest run --coverage`, laut [Vitest-Dokumentation](https://vitest.dev/guide/coverage.html). Ob ein Test einen Fehler in diesen Zeilen bemerken würde, zeigt sie nicht. Das prüft ein Mutationstest. Er baut kleine Fehler in den Code ein, sogenannte Mutanten, und schaut, ob die Tests danach scheitern. Ein Mutant, der alle Tests besteht, zeigt eine Lücke. Werkzeuge wie [StrykerJS](https://stryker-mutator.io/) tun das für ganze Projekte. Das Übungsprojekt dieses Kapitels bringt eine kleine Fassung davon mit.

## In deinem Projekt

Der Mindestumfang verlangt drei automatisierte Tests, zu zweit sechs. Wähl sie so, dass sie etwas Wichtiges prüfen, etwa eine Regel deiner App, eine Komponente mit Verhalten und einen Store mit ersetztem `fetch`. Schreib einen Test, sobald du einen Fehler behebst. Der Screencast fragt nach dem Fehler, der dich am längsten beschäftigt hat, und ein Test dazu zeigt, dass du ihn verstanden hast.

## Im Code

Arbeite mit der Fallbeispiel-App im Kursrepo im Ordner `case/08-architecture/de` und mit dem Übungsprojekt dieses Kapitels. Schreib auf, was du erwartest, bevor du etwas ausführst.

1. Setz in `src/features/reservations/rules.js` die Grenze `MAX_DAYS` auf `9` und starte die Tests. Bemerkt einer den Fehler? Warum nicht?
2. Nimm im zweiten Komponententest der Lösung das `await` vor `trigger('submit')` weg. Was passiert, und warum?
3. Starte im Übungsprojekt `npm test`, bevor du Tests schreibst. Was meldet die Prüfung?
4. Ein Test vergleicht nur `wrapper.html()` mit einem gespeicherten Schnappschuss. Welche Fehler findet er, und welche nicht?

## Aufgaben

In diesem Projekt schreibst du die Tests selbst. Du findest es im Kursrepo im Ordner `exercises/08-architecture/testing/de`, mit Regeln für Anfragen in `src/rules.js`, einem Formular und einem Store. `npm test` lässt deine Tests zuerst gegen den richtigen Code laufen, dort müssen sie bestehen. Danach laufen die Tests jeder Stufe gegen Mutanten, und `npm test` meldet, wie viele Fehler deine Tests finden. Mit `npm run test:watch` laufen nur deine Tests, bei jeder Änderung neu.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Schreib in `tests/level-1.test.js` Tests für `validateRequest`. Eine Anfrage über sieben Tage ist gültig, eine über acht nicht, ein erster Tag in der Vergangenheit nicht und ein letzter Tag vor dem ersten auch nicht. Wähl den heutigen Tag im Test selbst. Deine Tests finden alle drei Mutanten dieser Stufe.

:::solution[Lösung]
::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-1.test.js"}
:::
::::

::::exercise[Vertiefung]
Schreib in `tests/level-2.test.js` Tests für `RequestForm.vue`. Eine gültige Anfrage meldet das Formular als Event `send`, eine Anfrage mit Fehlern nicht, und Meldungen erscheinen erst nach dem ersten Senden. Deine Tests finden alle drei Mutanten dieser Stufe.

:::solution[Lösung]
::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-2.test.js"}
:::
::::

::::exercise[Knobelei]
Schreib in `tests/level-3.test.js` Tests für den Store `useRequestsStore`, mit einem frischen Pinia und einem ersetzten `fetch`. Prüf Adresse, Methode, Kopf und Inhalt der Anfrage, eine angenommene Anfrage in der Liste und eine Ablehnung der API mit ihrer Meldung. Deine Tests finden alle drei Mutanten dieser Stufe.

:::solution[Lösung]
::code{file="exercises/08-architecture/testing/solution/{lang}/tests/level-3.test.js"}
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein Test besteht immer, auch wenn der Code falsch ist. | Den Test einmal mit absichtlich falschem Code laufen lassen, er muss scheitern. |
| Ein Komponententest prüft interne Variablen und bricht bei jedem Umbau. | Prüfen, was die Komponente zeigt und meldet. |
| Nach `setValue` oder `trigger` sieht der Test noch den alten Stand. | `await` davor setzen und nach Anfragen `flushPromises` aufrufen. |
| Ein Test ruft den echten Server auf und scheitert, wenn er nicht läuft. | `fetch` mit `vi.stubGlobal` ersetzen und nach dem Test mit `vi.unstubAllGlobals` zurücksetzen. |
| Tests beeinflussen sich über einen Store. | Vor jedem Test ein frisches Pinia mit `setActivePinia(createPinia())`. |
| Ein KI-Assistent schreibt Tests, die nur nachbilden, was der Code gerade tut. | Erwartungen aus den Anforderungen ableiten und jeden Test einmal gegen einen Fehler laufen lassen. |

## Selbstcheck

::::selfcheck
1. Welche Arten von Tests unterscheidet die Vue-Dokumentation, und womit schreibt man sie?
2. Was prüft ein Komponententest, und was nicht?
3. Wie testet ein Test einen Store, der `fetch` aufruft, ohne Server?
4. Was zeigt ein Mutant, das die Abdeckung nicht zeigt?

:::solution[Antworten]
1. Unit-Tests und Komponententests mit Vitest und Vue Test Utils, End-to-End-Tests mit Playwright oder Cypress.
2. Was die Komponente darstellt und meldet, nach Props, Slots und Eingaben. Interne Variablen prüft er nicht.
3. Mit einem frischen Pinia und einem `fetch`, das `vi.stubGlobal` durch eine Attrappe mit vorbereiteter Antwort ersetzt.
4. Ob ein Test einen Fehler in einer ausgeführten Zeile auch bemerkt.
:::
::::

:::assignment
Der Fehler mit dem Tag in der Vergangenheit hat jetzt einen Test, der ihn bemerkt. Wenig später schreibt ein Mitglied, das mit einem Screenreader arbeitet, an den Verein. Die Zahl der Treffer im Katalog bleibe stumm, alle Knöpfe «Favorit» klängen gleich, und nach dem Zurück-Knopf lande der Fokus im Suchfeld statt beim Ding. Das nächste Kapitel kümmert sich um die Barrierefreiheit.
:::
