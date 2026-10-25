---
title: Parameter und Query
description: Dynamische Routen mit Parametern, Parameter als Props, useRoute und useRouter, Suche, Kategorie und Sortierung in der Query, Navigieren im Code und eine wiederverwendete Komponente.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler möchte Links verschicken können.

> Als Mitglied möchte ich einem anderen Mitglied einen Link auf ein Ding oder auf eine gefilterte Liste schicken, damit wir beide dasselbe vor uns haben.

Die Akzeptanzkriterien lauten:

1. Jedes Ding hat eine Seite unter `/items/` und seiner Nummer, etwa `/items/6`.
2. Suchtext, Kategorie und Sortierung stehen in der Adresse, `/?q=säge&category=Werkzeug` zeigt die Sägen aus dem Werkzeug.
3. Der Zurück-Knopf des Browsers führt vom Ding zurück zur gefilterten Liste.
:::

:::goals
Nach diesem Kapitel kannst du

- Routen mit Parametern festlegen,
- Parameter mit `useRoute` lesen und als Props übergeben,
- die Query einer Adresse lesen und schreiben,
- mit `router.push` und `router.replace` im Code navigieren,
- reagieren, wenn der Router eine Komponente für einen neuen Parameter wiederverwendet.
:::

## Routen mit Parametern

Ein Doppelpunkt macht aus einem Teil des Pfads einen Parameter. Die Route `/items/:id` passt auf `/items/1` wie auf `/items/6`, und `route.params.id` liefert die Nummer aus der Adresse.

::playground{dir="examples/06-routing/route-params"}

Die Zeile über der Überschrift zeigt den Wert mit Anführungszeichen, denn Parameter kommen immer als Text an. Die Nummern der Dinge sind dagegen Zahlen, darum wandelt `Number()` den Parameter vor dem Vergleich um. Ein Link zur Seite eines Dings nennt die Route mit ihrem Namen und gibt den Parameter dazu, `{ name: 'item', params: { id: 6 } }`.

![Teile einer Adresse. Oben /items/6, davon ist /items/ der feste Teil der Route /items/:id und 6 der Parameter, den route.params.id als Text liefert. Unten /?q=säge&category=Werkzeug&sort=deposit, davon ist / der Pfad, und die Query besteht aus q, category und sort, die route.query.q, route.query.category und route.query.sort liefern.](../../../assets/figures/de/p6c2-url-parts.svg)

## Parameter als Props

Eine Komponente, die `useRoute` liest, funktioniert nur mit einem Router. Einfacher ist es, wenn die Route ihr die Werte als Props gibt. `props: true` übergibt die Parameter, wie sie sind, also als Text. Eine Funktion bekommt die Route und gibt die Props zurück, und dabei kann sie den Parameter umwandeln.

::playground{dir="examples/06-routing/params-as-props"}

`ItemView` bekommt jetzt eine Zahl und weiss nichts mehr vom Router. Ein Test kann die Komponente mit `mount(ItemView, { props: { id: 6 } })` prüfen, ohne Adresse und ohne Router. Die [Dokumentation](https://router.vuejs.org/guide/essentials/passing-props.html) rät, die Funktion ohne eigenen Zustand zu schreiben, denn der Router ruft sie nur bei einem Wechsel der Route auf.

## Dieselbe Komponente, neue Parameter

Führt ein Link von `/items/1` nach `/items/2`, behält der Router die Komponente und ändert nur den Parameter. Code in `<script setup>` läuft dann kein zweites Mal.

::playground{dir="examples/06-routing/param-change"}

Die Konsole meldet «ItemView entsteht» nur beim ersten Ding. Danach meldet nur noch der Watcher die neue Nummer. Was aus dem Parameter berechnet wird, steht darum in `computed`, und was beim Wechsel geschehen soll, in einem Watcher. Die Fallbeispiel-App setzt auf diese Weise das Formular zurück, wenn ein anderes Ding erscheint. Die Dokumentation nennt ausserdem `onBeforeRouteUpdate`, das vor dem Wechsel läuft und ihn auch abbrechen kann.

## Die Query

Was nach dem Fragezeichen steht, ist die Query. Sie passt zu Werten, die eine Seite verändern, ohne eine andere Seite zu sein, etwa zu Suche, Filter und Sortierung. `route.query.q` liest den Suchtext, und ein Link mit `query` setzt ihn.

::playground{dir="examples/06-routing/query-filter"}

Das Suchfeld bindet einen berechneten Wert mit `get` und `set`. `get` liest den Text aus der Adresse, `set` schreibt jede Änderung mit `router.replace` zurück. `replace` ersetzt den aktuellen Eintrag der History, sonst legte jeder Tastendruck einen neuen an, und der Zurück-Knopf ginge Buchstabe für Buchstabe zurück. Ein Wert `undefined` nimmt den Schlüssel ganz aus der Adresse.

In der Fallbeispiel-App wandern Suchtext, Kategorie und Sortierung in die Query. Das Suchfeld schreibt erst nach der Pause von 300 Millisekunden aus Kapitel 5.2 in die Adresse, Kategorie und Sortierung sofort. Den Speicher des Browsers aus Teil 5 brauchen die drei Werte nicht mehr. Ein Neuladen behält die Adresse, der Zurück-Knopf stellt sie wieder her, und ein Link gibt sie weiter.

## Navigieren im Code

Manchmal führt keine Verlinkung, sondern Code zur nächsten Seite, etwa nach dem Senden eines Formulars. `useRouter` liefert den Router, und `router.push` nimmt dieselben Ziele wie `RouterLink`.

::playground{dir="examples/06-routing/navigate-in-code"}

`push` legt einen Eintrag in der History an, `replace` ersetzt den aktuellen, und `back` geht wie der Knopf des Browsers einen Schritt zurück. Laut [Dokumentation](https://router.vuejs.org/guide/essentials/navigation.html) ignoriert der Router `params`, wenn ein Ziel einen `path` hat, darum steht im Beispiel der Name der Route. `push` und `replace` geben ein Promise zurück, das sich erfüllt, wenn die Navigation vorbei ist.

## Adressen für Seiten und für den Server

Die Seite eines Dings liegt unter `/items/6`. Bisher leitete der Entwicklungsserver der Fallbeispiel-App alles unter `/items` an den kleinen Server weiter, und damit auch diese Seite. Ab diesem Teil holt die App den Katalog unter `/api/items`. Vite leitet nur noch Adressen unter `/api` weiter und entfernt das Präfix, alle anderen Adressen gehören der App.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Nimm im Beispiel mit `useRoute` den Aufruf `Number()` weg. Was zeigt die Seite für die Bohrmaschine, und warum?
2. Ersetze im Beispiel mit den Props die Funktion durch `props: true`. Was meldet Vue in der Konsole?
3. Klick im Beispiel mit der wiederverwendeten Komponente mehrmals auf «Nächstes Ding». Wie oft erscheint «ItemView entsteht»?
4. Ersetze im Beispiel mit der Query `router.replace` durch `router.push` und ergänze einen Knopf, der `router.back()` aufruft. Tipp ein Wort und klick mehrmals auf den Knopf. Was passiert mit dem Suchfeld?

## Aufgaben

Die Aufgaben bauen die Links aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/06-routing/params-query/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
`ItemView` zeigt ein Ding und erwartet seine Nummer als Prop `id` vom Typ Number. Ergänze in `src/router/index.js` die Route `/items/:id` mit dem Namen `item` und gib `ItemView` die Nummer als Zahl. Der Name jedes Dings im Katalog führt mit `RouterLink` zu seiner Seite.

:::solution[Lösung]
::code{file="exercises/06-routing/params-query/solution/{lang}/src/router/index.js" lines="8-18"}

::code{file="exercises/06-routing/params-query/solution/{lang}/src/views/CatalogView.vue" lines="47-52"}

Mit `props: true` käme die Nummer als Text an. `ItemView` fände dann kein Ding, weil `'6'` nicht gleich `6` ist, und Vue warnte vor dem falschen Typ der Prop.
:::
::::

::::exercise[Vertiefung]
Die Suche gehört in die Adresse. Das Suchfeld liest den Text aus `route.query.q` und schreibt jede Änderung mit `router.replace` als `q` in die Query. Ein Link wie `/?q=zelt` zeigt sofort die drei Zelte, und ein leeres Feld nimmt `q` aus der Adresse.

:::solution[Lösung]
::code{file="exercises/06-routing/params-query/solution/{lang}/src/views/CatalogView.vue" lines="7-15"}

`...route.query` übernimmt die übrigen Werte der Query, damit eine spätere Sortierung erhalten bleibt. Das Feld bindet `query` mit `v-model` wie ein gewöhnliches Ref, und `visibleItems` liest `query.value` wie vorher.
:::
::::

::::exercise[Knobelei]
Ergänze eine Auswahl `<select id="sort">` mit «Name» und dem Wert `''` und «Pfand» mit dem Wert `deposit`. Sie schreibt `sort=deposit` in die Query. Ohne Angabe sortiert der Katalog nach dem Namen, mit `deposit` nach dem Pfand und bei gleichem Pfand nach dem Namen. Die Suche bleibt beim Sortieren erhalten.

:::solution[Lösung]
::code{file="exercises/06-routing/params-query/solution/{lang}/src/views/CatalogView.vue"}

`toSorted` liefert ein sortiertes neues Array und lässt die Daten unverändert. `a.deposit - b.deposit || byName(a, b)` sortiert nach dem Namen weiter, wenn zwei Dinge dasselbe Pfand haben, denn die Differenz ist dann 0.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `route.params.id === 6` ist nie wahr. | Parameter sind Text. Mit `Number()` umwandeln, am besten in der Funktion `props` der Route. |
| `router.push({ path: '/items', params: { id: 6 } })` landet auf `/items`. | Mit `path` ignoriert der Router `params`. Den Namen der Route verwenden. |
| Nach einem Wechsel von `/items/1` zu `/items/2` zeigt die Seite noch das alte Ding. | Die Komponente bleibt, nur der Parameter ändert sich. Den Wert mit `computed` aus dem Parameter berechnen statt ihn einmal zu kopieren. |
| Jeder Tastendruck im Suchfeld legt einen Eintrag in der History an. | `router.replace` statt `router.push` verwenden. |
| Von zwei Änderungen der Query direkt hintereinander geht die erste verloren. | `route` ändert sich erst nach der Navigation. Beide Werte in einem Aufruf ändern oder mit `await` warten, bis die erste Navigation vorbei ist. |
| Ein KI-Assistent liest `this.$route.params` in `<script setup>`. | Dort gibt es kein `this`. `useRoute()` liefert die aktuelle Route. |

## Selbstcheck

::::selfcheck
1. Wie kommt der Wert von `:id` in eine Komponente?
2. Warum wandelt die Route den Parameter in eine Zahl um?
3. Wann passt `router.replace`, wann `router.push`?
4. Was passiert mit dem Code in `<script setup>`, wenn nur der Parameter wechselt?

:::solution[Antworten]
1. Über `route.params.id` aus `useRoute`, oder die Route gibt ihn mit `props` als Prop weiter.
2. Parameter kommen als Text an, die Nummern der Dinge sind Zahlen. Ohne Umwandlung fände der Vergleich kein Ding.
3. `replace` für Änderungen, die keinen eigenen Schritt zurück verdienen, etwa jeden Buchstaben der Suche. `push` für einen Wechsel der Seite, zu dem der Zurück-Knopf führen soll.
4. Er läuft nicht noch einmal, denn der Router behält die Komponente. Nur berechnete Werte und Watcher reagieren auf den neuen Parameter.
:::
::::

:::assignment
Mitglieder können sich jetzt Links schicken. Am Tresen fragt das Team nach einem eigenen Bereich. «Wir brauchen eine Übersicht, was ausgeliehen ist, und einen Ort, an dem wir Rückgaben erfassen.» Für mehrere Seiten unter einer gemeinsamen Adresse gibt es verschachtelte Routen, das nächste Kapitel.
:::
