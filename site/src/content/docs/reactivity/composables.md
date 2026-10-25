---
title: Composables
description: Zustand und Logik in Funktionen auslagern, die Regeln für Composables, useLocalStorage, useFavorites und useSearch von Hand gebaut, flexible Argumente mit toValue und die Bibliothek VueUse.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler schliesst den Wunsch aus Teil 4 ab.

> Als Mitglied möchte ich, dass die App meine Favoriten und die gewählte Kategorie behält, damit ich nach dem Neuladen dort weitermache, wo ich aufgehört habe.

Der Freiwillige möchte dafür nicht dreimal denselben Code schreiben. Die Akzeptanzkriterien lauten:

1. Favoriten, Suchtext und Kategorie überstehen ein Neuladen der Seite.
2. Ein kaputter Eintrag im Speicher des Browsers stört die App nicht. Sie beginnt dann ohne Filter und ohne Favoriten.
3. Speichern und Lesen stecken in einer Funktion, die jede Komponente verwenden kann.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, was ein Composable ist und wann es sich lohnt,
- Zustand und Logik aus einer Komponente in ein Composable auslagern,
- die Regeln für Namen, Aufruf und Rückgabe von Composables anwenden,
- mit `toValue` Refs, Funktionen und gewöhnliche Werte als Argumente annehmen,
- einschätzen, wann eine Bibliothek wie VueUse passt.
:::

## Logik mit Zustand auslagern

Eine gewöhnliche Funktion wie `formatDate` aus Teil 3 nimmt Werte und gibt einen Wert zurück. Ein Composable ist laut [Dokumentation](https://vuejs.org/guide/reusability/composables.html) eine Funktion, die mit der Composition API Logik mit Zustand kapselt und wiederverwendbar macht. Es legt Refs an, berechnet Werte, startet Watcher oder registriert Hooks und gibt zurück, was die Komponente davon braucht.

::playground{dir="examples/05-reactivity/use-local-storage"}

`useLocalStorage` gibt ein Ref zurück, das sich wie jedes andere verwenden lässt, hier mit `v-model`. Ändert sich sein Wert, schreibt ein Watcher ihn in den Speicher. Beim nächsten Start liest das Composable den Wert zurück. Tipp eine Notiz und ändere danach etwas am Code, etwa ein Leerzeichen. Die Vorschau startet neu, und die Notiz ist noch da.

`localStorage` kennt nur Texte. `JSON.stringify` macht aus jedem Wert einen Text, `JSON.parse` holt ihn zurück, so passen auch Listen wie die Favoriten hinein. Einen kaputten Eintrag und einen Wert von einem anderen Typ als der Anfangswert behandelt `read` wie einen fehlenden Eintrag. Der Suchtext aus dem Kapitel «Watcher» liegt zum Beispiel als reiner Text unter demselben Schlüssel. `JSON.parse` scheitert an «zelt» und würde aus «123» eine Zahl machen, an der `trim` beim Suchen scheitert.

## Regeln für Composables

Die Dokumentation nennt einige Regeln, und die Composables des Kurses halten sich daran.

1. Der Name beginnt mit `use` und ist in camelCase geschrieben, etwa `useFavorites`.
2. Ein Composable wird nur in `<script setup>` aufgerufen, zuoberst und vor dem ersten `await`. Nur dort weiss Vue, zu welcher Komponente seine Hooks und Watcher gehören.
3. Es gibt ein gewöhnliches Objekt mit Refs zurück, damit die Komponente das Ergebnis destrukturieren kann, ohne die Verbindung zu verlieren.
4. Was es in `onMounted` anlegt, räumt es in `onUnmounted` wieder auf, wie eine Komponente.

Im Kurs liegt jedes Composable in einer eigenen Datei im Ordner `src/composables`. Jeder Aufruf legt eigenen Zustand an. Rufen zwei Komponenten `useFavorites()` auf, hat jede ihre eigenen Favoriten, und nur beim Start lesen beide denselben Eintrag im Speicher. Darum ruft `App` im Fallbeispiel `useFavorites` einmal auf und gibt die Favoriten weiter, wie in Teil 4. Für Zustand, den viele Komponenten teilen, gibt es in Teil 7 Pinia.

## Composables kombinieren

Ein Composable darf andere aufrufen. `useFavorites` baut auf `useLocalStorage` auf und ergänzt, was zu Favoriten gehört.

::playground{dir="examples/05-reactivity/use-favorites"}

Die Komponente sieht nur `isFavorite`, `toggle` und `count`. Wo die Favoriten liegen und wie sie gespeichert werden, bleibt im Composable. Ändert sich das später, bleibt die Komponente, wie sie ist.

## Flexible Argumente mit toValue

`useSearch` filtert eine Liste nach einem Suchtext. Damit es überall passt, soll es die Liste und den Suchtext als Ref, als Funktion oder als gewöhnlichen Wert annehmen. `toValue` aus Vue 3.3 liest alle drei. Bei einem Ref liefert es `.value`, eine Funktion ruft es auf, und einen gewöhnlichen Wert gibt es zurück, wie er ist. Steht `toValue` in einem berechneten Wert, notiert Vue die Refs, die dabei gelesen werden.

::playground{dir="examples/05-reactivity/use-search"}

Das Beispiel übergibt die Liste als gewöhnliches Array und den Suchtext als Ref. Mit einer Funktion wie `() => props.query` liesse sich auch eine Prop übergeben, ohne dass die Verbindung verloren geht. Übergäbe die Komponente `props.query` direkt, käme wie im ersten Kapitel nur der Text dieses Moments an.

## Die Bibliothek VueUse

Viele Composables braucht fast jede App, für den Speicher des Browsers, die Grösse des Fensters, Tastenkürzel oder eine Pause beim Tippen. Die Bibliothek [VueUse](https://vueuse.org/) sammelt nach eigenen Angaben über 200 solche Funktionen, darunter `useLocalStorage` und `useDebounceFn`. Der Kurs baut seine Composables von Hand, damit du siehst, was darin steckt. In einem eigenen Projekt lohnt sich ein Blick in VueUse, bevor du etwas Eigenes schreibst. Prüf dann wie bei jeder Abhängigkeit, ob die Bibliothek gepflegt wird und wie viel sie zur Grösse der App beiträgt.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Tipp im Beispiel mit `useLocalStorage` eine Notiz und such in den DevTools des Browsers bei «Application», auf Deutsch «Anwendung», unter «Local Storage» den Eintrag `example-note`. Wie sieht ein Text als JSON aus?
2. Ruf im Beispiel mit den Favoriten `useFavorites()` ein zweites Mal auf und zeig den zweiten `count` neben dem ersten. Was passiert beim Markieren?
3. Übergib im Beispiel mit `useSearch` statt `query` den Wert `query.value`. Was passiert beim Tippen, und warum?
4. Lass `useSearch` statt des Objekts `{ visibleItems, hits }` ein `reactive({ visibleItems, hits })` zurückgeben. Was zeigt die Liste beim Tippen?

## Aufgaben

Die Aufgaben bauen die drei Composables aus diesem Kapitel. Du findest das Projekt im Kursrepo im Ordner `exercises/05-reactivity/composables/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Lege `src/composables/useLocalStorage.js` an. `useLocalStorage(key, initialValue)` gibt ein Ref zurück, das mit dem gespeicherten Wert oder dem Anfangswert beginnt und jede Änderung als JSON speichert, auch eine im Innern eines Arrays. Ein kaputter Eintrag und ein Wert von einem anderen Typ als der Anfangswert zählen nicht. Verwende das Composable in `App` für den Suchtext unter dem Schlüssel `lorraine-commons-search`.

:::solution[Lösung]
::code{file="exercises/05-reactivity/composables/solution/{lang}/src/composables/useLocalStorage.js"}

`deep: true` lässt den Watcher auch auf `push` reagieren. `typeof` vergleicht den Typ des gelesenen Werts mit dem des Anfangswerts. Ein Array und ein Objekt haben beide den Typ `object`, für die App genügt diese Prüfung trotzdem. In `App` ersetzt `useLocalStorage('lorraine-commons-search', '')` das bisherige `ref('')`.
:::
::::

::::exercise[Vertiefung]
Lege `src/composables/useFavorites.js` an. `useFavorites()` speichert die ids der Favoriten mit `useLocalStorage` unter dem Schlüssel `lorraine-commons-favorites` und gibt `favorites`, `isFavorite`, `toggle` und `count` zurück. `App` verwendet es statt des eigenen Codes für die Favoriten.

:::solution[Lösung]
::code{file="exercises/05-reactivity/composables/solution/{lang}/src/composables/useFavorites.js"}

`toggle` ersetzt das Array durch ein neues, wie in Teil 4, und der Watcher in `useLocalStorage` speichert es. In `App` bleibt von den Favoriten eine einzige Zeile.

::code{file="exercises/05-reactivity/composables/solution/{lang}/src/App.vue" lines="11-11"}
:::
::::

::::exercise[Knobelei]
Lege `src/composables/useSearch.js` an. `useSearch(items, query)` gibt `visibleItems` und `hits` zurück und nimmt Liste und Suchtext je als Ref, als Funktion oder als gewöhnlichen Wert an. Gross- und Kleinschreibung und Leerzeichen am Rand spielen keine Rolle. `App` sucht damit im Katalog.

:::solution[Lösung]
::code{file="exercises/05-reactivity/composables/solution/{lang}/src/composables/useSearch.js"}

`toValue` steht in den berechneten Werten, darum notiert Vue die Refs, die es liest. Stünde `const text = toValue(query)` ausserhalb von `computed`, wäre der Suchtext wieder eine Kopie aus dem Moment des Aufrufs. In `App` übergibt die Zeile `useSearch(items, query)` die Daten als Array und den Suchtext als Ref aus `useLocalStorage`.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Vue warnt, dass ein Hook ohne aktive Komponente aufgerufen wird. | Das Composable zuoberst in `<script setup>` aufrufen, nicht in einer Funktion für ein Event und nicht nach einem `await`. |
| Nach dem Destrukturieren des Ergebnisses folgen die Werte nicht mehr. | Ein gewöhnliches Objekt mit Refs zurückgeben, kein `reactive`. |
| Zwei Komponenten rufen dasselbe Composable auf und sehen verschiedene Stände. | Jeder Aufruf hat eigenen Zustand. Das Composable einmal aufrufen und das Ergebnis weitergeben, ab Teil 7 mit Pinia teilen. |
| Ein Composable bekommt `props.query` und reagiert nicht auf Änderungen. | Eine Funktion `() => props.query` übergeben und sie im Composable mit `toValue` in einem berechneten Wert lesen. |
| Beim Start meldet `JSON.parse` einen `SyntaxError`, und die App bleibt leer. | Das Lesen mit `try` und `catch` absichern und dann den Anfangswert nehmen. |
| Ein KI-Assistent schreibt ein Mixin mit `mixins: [...]`. | Mixins stammen aus der Options API, die Dokumentation empfiehlt sie in Vue 3 nicht mehr. Composables übernehmen ihre Aufgabe. |

## Selbstcheck

::::selfcheck
1. Worin unterscheidet sich ein Composable von einer gewöhnlichen Funktion wie `formatDate`?
2. Warum gibt ein Composable ein gewöhnliches Objekt mit Refs zurück?
3. Was tut `toValue` mit einem Ref, einer Funktion und einem gewöhnlichen Wert?
4. Warum ruft `App` im Fallbeispiel `useFavorites` nur einmal auf?

:::solution[Antworten]
1. Ein Composable legt mit der Composition API Zustand an, etwa Refs, Watcher oder Hooks, und gibt ihn zurück. `formatDate` rechnet nur aus seinen Argumenten.
2. Damit die Komponente das Ergebnis destrukturieren kann, ohne die Verbindung zum Zustand im Composable zu verlieren.
3. Beim Ref liefert es `.value`, die Funktion ruft es auf, und den gewöhnlichen Wert gibt es zurück, wie er ist.
4. Jeder Aufruf hätte eigene Favoriten. Ein Aufruf in `App` und das Weitergeben an Kopf und Karten halten alle Teile auf demselben Stand.
:::
::::

:::assignment
Die App merkt sich jetzt, was die Mitglieder gesucht und markiert haben, und der Code dafür steht an einer Stelle. Martina Hostettler denkt schon weiter. «Die Favoriten sollen eine eigene Seite bekommen, und das Team am Tresen braucht einen Bereich, den nur es sieht.» Dafür braucht die App einen Router, das Thema von Teil 6. Vorher prüfst du mit dem [Kompetenzraster](../competences/), ob du für Teil 6 bereit bist.
:::
