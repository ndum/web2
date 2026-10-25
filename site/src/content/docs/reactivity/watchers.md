---
title: Watcher
description: Mit watch und watchEffect auf Änderungen reagieren, Quellen, immediate, deep und once, Aufräumen mit onWatcherCleanup, der Zeitpunkt mit flush und die Wahl zwischen computed und watch.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler bringt den Wunsch vom Ende von Teil 4 mit.

> Als Mitglied möchte ich, dass die App meine letzte Suche behält, damit ich nach dem Neuladen weitersuchen kann.

Der Freiwillige hat beim Testen noch etwas bemerkt. Bei jedem Tastendruck rechnet die Liste neu und springt hin und her, bevor das Wort fertig ist. Die Akzeptanzkriterien lauten:

1. Die App speichert den Suchtext im Browser unter dem Schlüssel `lorraine-commons-search` und setzt ihn beim Start wieder ins Suchfeld.
2. Die Liste folgt dem Suchfeld erst, wenn 300 Millisekunden lang niemand getippt hat.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, wann eine Änderung einen Nebeneffekt braucht,
- mit `watch` auf Refs, Funktionen und mehrere Quellen reagieren,
- die Optionen `immediate`, `deep` und `once` einsetzen,
- mit `onWatcherCleanup` Timer und veraltete Antworten aufräumen,
- den Zeitpunkt eines Watchers mit `flush` bestimmen,
- zwischen `computed`, `watch` und `watchEffect` wählen.
:::

## Nebeneffekte

Ein berechneter Wert soll nur rechnen. Manche Änderungen sollen aber etwas ausserhalb der Komponente bewirken, einen Eintrag im Speicher des Browsers, einen neuen Titel für den Tab oder eine Anfrage an den Server. Solche Wirkungen heissen Nebeneffekte. Für sie gibt es `watch`. Es beobachtet eine Quelle und ruft eine Funktion auf, sobald sich die Quelle ändert.

::playground{dir="examples/05-reactivity/watch-title"}

Der Watcher beobachtet das Ref `query`. Seine Funktion bekommt den neuen Wert, als zweites Argument auch den alten, und setzt den Titel. Ohne Option läuft sie erst nach der ersten Änderung. `immediate: true` lässt sie einmal sofort laufen, damit der Titel von Anfang an stimmt. Der Playground zeigt seine Vorschau in einem eigenen Rahmen, darum ändert sich dort nicht der Titel deines Tabs, und der Absatz zeigt den Wert an. In einer App ändert derselbe Code den Titel im Tab.

## Quellen

Die Quelle kann ein Ref sein, ein berechneter Wert, ein reaktives Objekt, eine Funktion, die Werte liest, oder ein Array aus solchen Quellen. Ein einzelnes Feld beobachtest du über eine Funktion, etwa `() => filters.value.category`. Schreibst du nur `filters.value.category`, bekommt `watch` den Text dieses Moments und warnt mit `Invalid watch source`.

::playground{dir="examples/05-reactivity/watch-sources"}

Beim ersten Buchstaben im Suchfeld erscheinen «filters, deep» und «erste Suche». Danach erscheint pro Buchstabe nur noch «filters, deep», denn `once` beendet den dritten Watcher nach seinem ersten Aufruf. Wählst du eine Kategorie, meldet der erste Watcher den alten und den neuen Wert. `deep: true` braucht es, weil `filters` ein Ref mit einem Objekt ist. Ohne die Option meldet sich der Watcher nur, wenn `.value` ein neues Objekt bekommt. Ein reaktives Objekt als Quelle beobachtet `watch` dagegen von selbst mit allen Feldern.

Mehrere Quellen stehen in einem Array, und die Funktion bekommt die neuen Werte in derselben Reihenfolge.

```js
watch([query, category], ([text, name]) => {
  console.log(text, name)
})
```

## Aufräumen mit onWatcherCleanup

Die Liste soll dem Suchfeld erst nach einer Pause folgen. Ein Watcher auf `query` startet dafür bei jedem Tastendruck einen Timer. Kommt der nächste Tastendruck, bevor der Timer abgelaufen ist, darf der alte Timer nicht mehr auslösen. `onWatcherCleanup` aus Vue 3.5 registriert eine Funktion, die Vue aufruft, bevor der Watcher das nächste Mal läuft und wenn er endet, weil die Komponente verschwindet.

::playground{dir="examples/05-reactivity/watch-cleanup"}

Tipp schnell ein Wort. Die erste Zeile folgt jedem Buchstaben, die zweite erst, wenn du 300 Millisekunden lang nichts tippst. Jeder neue Aufruf des Watchers bricht vorher den Timer des letzten ab, und am Ende läuft nur der Timer des letzten Buchstabens ab. Diese Technik heisst Debouncing, auf Deutsch auch Entprellen.

`onWatcherCleanup` muss laut [Dokumentation](https://vuejs.org/guide/essentials/watchers.html#side-effect-cleanup) im synchronen Teil der Funktion stehen. Nach einem `await` warnt Vue, dass es keinen aktiven Watcher findet. In einer Funktion mit `async` steht der Aufruf darum vor dem ersten `await`. Dasselbe Werkzeug hilft bei Antworten eines Servers, die in der falschen Reihenfolge ankommen, die Knobelei zeigt das.

## Der Zeitpunkt mit flush

Vue ruft einen Watcher nicht im Moment der Änderung auf, sondern sammelt die Änderungen wie beim Rendern. Ohne Option läuft der Watcher nach dem Update der Elternkomponente und vor dem Update seiner eigenen Komponente. Liest er das DOM seiner Komponente, findet er also noch den alten Stand. Mit `flush: 'post'` läuft er erst, nachdem Vue das DOM aktualisiert hat.

```js
watch(
  query,
  () => {
    // Vue has updated the DOM, the list already shows the new hits
  },
  { flush: 'post' },
)
```

`flush: 'sync'` ruft den Watcher bei jeder Änderung sofort auf, ohne zu sammeln. Die Dokumentation rät davon ab, das für Daten zu verwenden, die sich oft hintereinander ändern, etwa Arrays.

## Abhängigkeiten von selbst mit watchEffect

`watchEffect` kommt ohne Quelle aus. Die Funktion läuft sofort und danach jedes Mal, wenn sich ein Wert ändert, den sie beim letzten Durchlauf gelesen hat. Sie ist damit ein Effekt wie die Render-Funktion aus dem letzten Kapitel.

::playground{dir="examples/05-reactivity/watch-effect"}

Beim Start erscheint eine Zeile mit zwei leeren Werten, danach eine bei jeder Änderung am Suchfeld oder an der Kategorie. `watchEffect` ist kürzer, wenn der Code viele Werte liest. `watch` macht dagegen sichtbar, worauf der Code reagiert, liefert den alten Wert mit und läuft nur, wenn sich die Quelle wirklich ändert. Die Beispiele des Kurses verwenden meistens `watch`.

Watcher, die du direkt in `<script setup>` anlegst, beendet Vue mit ihrer Komponente. Ein Watcher, der erst nach einem `await` entsteht, gehört zu keiner Komponente und bleibt bestehen. `watch` und `watchEffect` geben eine Funktion zurück, mit der du ihn dann selbst beendest.

## Die Wahl zwischen computed und watch

![Entscheidung zwischen computed und watch. Entsteht ein Wert aus anderen Werten, wie die Zahl der Treffer, dann computed. Soll sonst etwas ausserhalb der Komponente passieren, wie Speichern, der Titel des Tabs oder eine Anfrage an den Server, dann watch oder watchEffect. Reagiert der Code nur auf eine Handlung wie einen Klick, dann eine Funktion für das Event.](../../../assets/figures/de/p5c2-computed-or-watch.svg)

Die Abbildung fasst die Wahl in zwei Fragen. Ein Watcher, der aus anderen Refs einen Wert berechnet und in ein eigenes Ref schreibt, ist fast immer ein versteckter berechneter Wert. Er kann aus dem Takt geraten, etwa wenn er ohne `immediate` den Startwert verpasst. Die Pause bei der Suche ist eine Ausnahme. Das Ref, nach dem die Liste filtert, hängt nicht nur vom Suchtext ab, sondern auch von der Zeit, und Zeit kann `computed` nicht beobachten.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Nimm im Beispiel zum Titel `immediate: true` weg. Was zeigt der Absatz beim Start, und wann ändert er sich?
2. Ersetze im Beispiel mit den Quellen die Funktion `() => filters.value.category` durch `filters.value.category`. Was meldet die Konsole, und was passiert bei einer neuen Kategorie?
3. Nimm im Beispiel zum Aufräumen die Zeile mit `onWatcherCleanup` weg und tipp schnell «zelt». Was zeigt die zweite Zeile nacheinander?
4. Setz im Beispiel mit `watchEffect` die Zeile mit `console.log` in die Bedingung `if (query.value !== '')`. Meldet sich der Effekt bei einer neuen Kategorie, solange das Suchfeld leer ist? Und danach?

## Aufgaben

Die Aufgaben bauen die Suche aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/05-reactivity/watch/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Speichere den Suchtext bei jeder Änderung mit `localStorage.setItem` unter dem Schlüssel `lorraine-commons-search`. Beim Start liest die App den Text mit `localStorage.getItem` und setzt ihn ins Suchfeld. Ohne gespeicherten Text bleibt das Feld leer.

:::solution[Lösung]
::code{file="exercises/05-reactivity/watch/solution/{lang}/src/App.vue" lines="7-15"}

`getItem` liefert `null`, wenn es den Schlüssel nicht gibt, und `?? ''` macht daraus einen leeren Text. `localStorage` speichert nur Texte, für den Suchtext passt das. Der Speicher gehört zur Adresse der Seite. Alle Projekte, die auf `localhost:5173` laufen, teilen sich darum dieselben Einträge. Du siehst sie in den DevTools des Browsers bei «Application», auf Deutsch «Anwendung», unter «Local Storage».
:::
::::

::::exercise[Vertiefung]
Die Liste soll dem Suchfeld erst folgen, wenn 300 Millisekunden lang nichts getippt wurde. Lege dafür ein zweites Ref `settledQuery` an, nach dem die Liste filtert, und setze es in einem Watcher mit `setTimeout`. Jeder neue Tastendruck bricht den Timer des vorherigen ab. Ein gespeicherter Suchtext gilt beim Start sofort.

:::solution[Lösung]
::code{file="exercises/05-reactivity/watch/solution/{lang}/src/App.vue" lines="17-31"}

Der Startwert `ref(query.value)` sorgt dafür, dass eine gespeicherte Suche beim Start ohne Pause gilt. `onWatcherCleanup` bricht den Timer ab, bevor der Watcher für den nächsten Buchstaben läuft. Ohne diese Zeile löst jeder Timer aus, und die Liste springt nacheinander durch alle Zwischenstände.
:::
::::

::::exercise[Knobelei]
Im Kasten «Jetzt da?» wählst du ein Ding, und die App fragt mit `checkAvailability` aus `src/availability.js` nach, ob es gerade da ist. Die Funktion vertritt den Server des Vereins und antwortet mal schnell, mal langsam. Wählst du schnell nacheinander zwei Dinge, zeigt die App manchmal die Antwort für das erste. Sorge dafür, dass nur die Antwort für das zuletzt gewählte Ding zählt.

:::solution[Lösung]
::code{file="exercises/05-reactivity/watch/solution/{lang}/src/App.vue" lines="33-50"}

`outdated` gehört zu einem einzigen Aufruf des Watchers. Wählt jemand ein anderes Ding, bevor die Antwort da ist, ruft Vue die Aufräumfunktion des alten Aufrufs auf, und dessen `outdated` wird `true`. Kommt die alte Antwort danach an, endet der Aufruf ohne Änderung. `onWatcherCleanup` steht vor dem `await`, wie es die Dokumentation verlangt. Bei einer echten Anfrage mit `fetch` liesse sich die alte Anfrage mit einem `AbortController` sogar abbrechen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `watch(filters.category, …)` meldet `Invalid watch source`. | Das Feld über eine Funktion beobachten, `watch(() => filters.category, …)`. |
| Ein Watcher auf ein Ref mit einem Objekt meldet sich bei Änderungen im Innern nicht. | `deep: true` angeben oder das Feld über eine Funktion beobachten. |
| Ein Wert stimmt erst nach der ersten Änderung, nicht schon beim Start. | Den Watcher mit `immediate: true` anlegen. |
| Nach schnellem Tippen löst jeder Timer aus, und die Liste springt durch alle Zwischenstände. | Den Timer mit `onWatcherCleanup` abbrechen. |
| Vue warnt, dass `onWatcherCleanup()` keinen aktiven Watcher findet. | Den Aufruf vor das erste `await` stellen. |
| Ein Watcher berechnet einen Wert und schreibt ihn in ein eigenes Ref. | `computed` verwenden, ausser der Wert hängt wie bei der Pause von der Zeit ab. |
| Ein KI-Assistent schreibt `this.$watch` oder die Option `watch` in einem Objekt. | Das ist die Options API. In `<script setup>` importierst du `watch` aus `vue`. |

## Selbstcheck

::::selfcheck
1. Was ist ein Nebeneffekt, und warum gehört er nicht in `computed`?
2. Welche Quellen nimmt `watch` an?
3. Wann ruft Vue die Funktion auf, die du mit `onWatcherCleanup` registrierst?
4. Worin unterscheiden sich `watch` und `watchEffect`?

:::solution[Antworten]
1. Eine Wirkung ausserhalb der Komponente, etwa ein Eintrag im Speicher des Browsers. Ein berechneter Wert soll nur aus seinen Abhängigkeiten rechnen, und Vue entscheidet selbst, wann und wie oft es ihn rechnet.
2. Ein Ref oder einen berechneten Wert, ein reaktives Objekt, eine Funktion, die Werte liest, oder ein Array aus solchen Quellen.
3. Bevor der Watcher das nächste Mal läuft und wenn er endet, etwa weil seine Komponente verschwindet.
4. `watch` reagiert nur auf die angegebene Quelle, läuft erst nach einer Änderung und liefert den alten Wert. `watchEffect` läuft sofort und reagiert auf alles, was seine Funktion liest.
:::
::::

:::assignment
Die App merkt sich die Suche, und die Liste wartet, bis jemand fertig getippt hat. Die Freiwilligen am Tresen stört etwas anderes, und Martina Hostettler gibt es weiter. «Wer den Katalog öffnet, muss zuerst ins Suchfeld klicken. Und der Dialog geht mit Escape nicht zu.» Dafür braucht die App Zugriff auf Elemente im DOM und den richtigen Moment im Leben einer Komponente, das nächste Kapitel.
:::
