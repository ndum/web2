---
title: Reaktivität im Detail
description: Wie Vue Abhängigkeiten verfolgt und Effekte auslöst, Fehler durch kopierte und ersetzte Werte, toRef und toRefs, shallowRef mit triggerRef und nextTick.
sidebar:
  order: 1
---

:::assignment
Der Freiwillige hat den Kopf der App umgebaut. Seither bleibt der Zähler der Favoriten bei der Zahl stehen, die er beim Laden der Seite hatte, und Martina Hostettler meldet den Fehler vom Tresen.

> Ich markiere drei Dinge als Favoriten, und im Kopf steht immer noch «0 Favoriten».

Bei der Fehlersuche findet der Freiwillige zwei weitere Stellen, an denen die App die Verbindung zu ihrem Zustand verliert. Die Akzeptanzkriterien für die Korrektur lauten:

1. Der Zähler im Kopf folgt jeder Änderung der Favoriten.
2. «Filter zurücksetzen» leert Suchfeld und Kategorie, und die Suche funktioniert danach weiter.
3. Ein Ding, das zurückgebracht wird, zeigt sich sofort als verfügbar, auch wenn Vue nicht mehr jedes Feld des Katalogs beobachtet.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, wie Vue die Abhängigkeiten zwischen reaktiven Werten und Effekten verfolgt,
- die Abhängigkeiten einer Komponente mit `onRenderTracked` und `onRenderTriggered` sichtbar machen,
- Fehler finden, bei denen ein Wert kopiert oder ein reaktives Objekt ersetzt wird,
- mit `toRef` und `toRefs` einzelne Felder verbunden halten,
- `shallowRef` und `triggerRef` für grosse Daten einsetzen,
- mit `nextTick` auf die aktualisierte Seite warten.
:::

## Effekte und Abhängigkeiten

In Teil 3 hast du gesehen, dass Vue eine Komponente neu rendert, sobald sich ein Ref ändert, das ihr Template liest. Der Exkurs [Proxy und Getter](../../javascript/proxies/) aus Teil 1 hat gezeigt, wie so etwas funktionieren kann. Vue nennt eine Funktion, die es ausführt und dabei beobachtet, einen Effekt. Während ein Effekt läuft, notiert Vue jeden reaktiven Wert, den er liest. Diesen Schritt nennt Vue `track`. Ändert sich später einer dieser Werte, führt Vue die Effekte erneut aus, die ihn gelesen haben. Diesen Schritt nennt Vue `trigger`.

In einer Komponente gibt es mehrere Effekte. Die Render-Funktion, die der Compiler aus dem Template erzeugt, ist einer. Jeder berechnete Wert ist ein weiterer, und die Watcher aus dem nächsten Kapitel gehören auch dazu.

![Abhängigkeiten im Kopf der App. Drei Kästchen in einer Reihe, das Ref favorites, der berechnete Wert favoriteCount und die Render-Funktion von AppHeader, rechts daneben die Seite mit dem Text 3 Favoriten. Oben zeigen Pfeile, wer wen liest, und Vue merkt sich jede dieser Abhängigkeiten. Unten zeigen Pfeile, was die Änderung favorites.value.push(3) auslöst, bis die Seite den neuen Wert zeigt.](../../../assets/figures/de/p5c1-dependencies.svg)

Die Abbildung zeigt den Zähler der Favoriten. Die Render-Funktion von `AppHeader` liest den berechneten Wert `favoriteCount`, und dieser liest das Ref `favorites`. Vue merkt sich beide Abhängigkeiten. Ergänzt `push` einen Favoriten, markiert Vue `favoriteCount` als veraltet und führt die Render-Funktion erneut aus. Sie liest `favoriteCount`, der jetzt neu rechnet, und die Seite zeigt den neuen Wert.

## Abhängigkeiten sichtbar machen

Welche Werte eine Komponente beim Rendern liest, zeigt Vue mit zwei Hooks für die Fehlersuche. `onRenderTracked` meldet jeden Wert, den die Render-Funktion liest, `onRenderTriggered` jede Änderung, die sie erneut auslöst. Laut der [Dokumentation](https://vuejs.org/api/composition-api-lifecycle.html#onrendertracked) funktionieren beide nur während der Entwicklung. Lies das Beispiel, öffne die Konsole des Playgrounds und klick dann auf beide Knöpfe.

::playground{dir="examples/05-reactivity/render-tracking"}

Beim ersten Rendern erscheinen zwei Zeilen. Das Template liest `value` des Refs `favorites` und danach `length` des Arrays darin. Ein Klick auf «Raclette-Ofen merken» meldet `ausgelöst add 2`, denn `push` hat an der Stelle 2 ein Element ergänzt. Danach erscheinen die beiden Zeilen für das Lesen noch einmal, weil Vue die Abhängigkeiten bei jedem Durchlauf neu sammelt. Ein Klick auf «Suchtext ändern» bleibt ohne Meldung. Das Template liest `query` nicht, also hängt das Rendern nicht davon ab.

## Kopierte Werte

Damit lässt sich der Fehler im Kopf erklären. Der Freiwillige hat die Zahl der Favoriten einmal ausgerechnet und in einer Konstanten abgelegt.

```js
const count = props.favorites.length
```

Diese Zeile läuft ein einziges Mal, wenn die Komponente entsteht. Sie liest `props.favorites`, aber in keinem Effekt, also notiert Vue nichts, und `count` bleibt eine gewöhnliche Zahl. Das Template liest danach nur noch diese Zahl. Das Beispiel zeigt den Unterschied zwischen einer Kopie und einem berechneten Wert.

::playground{dir="examples/05-reactivity/lost-connection"}

Nach zwei Klicks zeigt die Kopie weiter 2, der berechnete Wert 4. Ein berechneter Wert ist ein Effekt. Vue führt seine Funktion aus, notiert, was sie liest, und rechnet nach einer Änderung neu. Dieselbe Falle steckt in jeder Zeile, die auf oberster Ebene von `<script setup>` einen reaktiven Wert liest und das Ergebnis behält, etwa `const name = props.item.name`.

## Ersetzte Objekte

Der zweite Fehler steckt im Knopf «Filter zurücksetzen». Der Filter ist ein reaktives Objekt, und der Freiwillige ersetzt es beim Zurücksetzen durch ein neues.

```js
let filter = reactive({ query: '', category: '' })

function resetFilter() {
  filter = reactive({ query: '', category: '' })
}
```

Das Template und die berechnete Liste haben die Felder des alten Proxys gelesen. Vue verfolgt Zugriffe auf diesen Proxy, die Variable `filter` ist dagegen eine gewöhnliche Variable. Eine neue Zuweisung an sie löst nichts aus. Die Felder zeigen weiter den alten Text, und weil das Suchfeld danach in das neue Objekt schreibt, folgt die Liste der Suche nicht mehr.

Ein reaktives Objekt behält deshalb seine Identität, nur seine Felder ändern sich. `Object.assign` schreibt mehrere Felder auf einmal.

```js
const filter = reactive({ query: '', category: '' })

function resetFilter() {
  Object.assign(filter, { query: '', category: '' })
}
```

Mit `const` lässt JavaScript keine neue Zuweisung zu, darum steht `reactive` immer mit `const`. Bei einem Ref ist ein neuer Wert für `.value` dagegen erlaubt und löst aus, weil Vue das Schreiben von `value` verfolgt.

## Einzelne Felder mit toRef und toRefs

Auch Destrukturieren kopiert, wie du in Teil 3 gesehen hast. Brauchst du ein einzelnes Feld als eigene Variable, liefert `toRef` ein Ref, das beim Lesen und Schreiben auf das Feld des Objekts zugreift. `toRefs` macht das für alle Felder eines Objekts auf einmal, und das Ergebnis lässt sich gefahrlos destrukturieren.

::playground{dir="examples/05-reactivity/to-refs"}

Nach beiden Klicks zeigt die Kopie von `query` weiter einen leeren Text, das Ref für `category` dagegen «Werkzeug». Gebraucht wird `toRefs` vor allem dort, wo eine Funktion ein reaktives Objekt zurückgibt und der Aufruf es zerlegen will. Das Kapitel [Composables](../composables/) kommt darauf zurück.

## Grosse Daten mit shallowRef

Ein Ref mit einem Array von Objekten macht auch die Objekte darin reaktiv, sobald jemand sie liest. Jeder Zugriff auf ein Feld läuft dann durch einen Proxy, der Abhängigkeiten notiert. Die [Dokumentation](https://vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures) nennt den Aufwand spürbar, wenn ein einziges Rendern mehr als 100'000 Felder in grossen, verschachtelten Arrays liest. Für solche Daten gibt es `shallowRef`. Es verfolgt nur `.value` selbst, und was darin steckt, bleibt ein gewöhnliches Objekt.

::playground{dir="examples/05-reactivity/shallow-ref"}

Ein Klick auf «Im Array ergänzen» ändert das Array, die Liste bleibt aber gleich, denn `push` gibt `.value` keinen neuen Wert. «Array ersetzen» tut das, und die Liste zeigt alle Einträge, auch den aus `push`. Nach einer Änderung im Innern löst `triggerRef` die Effekte von Hand aus. Im Template käme `items` schon ausgepackt an, darum ruft das Beispiel `triggerRef` in einer Funktion im Script auf. Mit `shallowRef` behandelst du die Daten darin also wie unveränderlich und ersetzt sie bei jeder Änderung.

## Warten auf das DOM mit nextTick

Vue aktualisiert die Seite nicht nach jeder einzelnen Änderung. Es sammelt die ausgelösten Effekte und führt sie gemeinsam aus, wenn der laufende Code fertig ist. Ändert eine Funktion drei Refs, rendert die Komponente einmal statt dreimal. Die [Dokumentation](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing) begründet das damit, dass jede Komponente nur einmal aktualisiert werden soll. Will Code nach einer Änderung mit der aktualisierten Seite arbeiten, wartet er mit `await nextTick()`.

::playground{dir="examples/05-reactivity/next-tick"}

Nach einem Klick steht im Protokoll «vor nextTick 0, nach nextTick 1». Direkt nach `count.value++` zeigt der Absatz noch die alte Zahl, nach `await nextTick()` hat Vue gerendert. Gebraucht wird das selten, etwa um ein Element zu fokussieren, das erst durch die Änderung entsteht. Das Kapitel [Lebenszyklus und Template-Refs](../lifecycle/) zeigt einen solchen Fall.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Ergänze im Beispiel zur Fehlersuche im Template einen Absatz mit `{{ query }}`. Was meldet die Konsole jetzt beim Klick auf «Suchtext ändern»?
2. Mach im Beispiel mit der Kopie aus `copiedCount` eine Funktion, die die Länge zurückgibt, und ruf sie im Template auf. Was zeigt die Zeile nach zwei Klicks, und warum?
3. Ersetze im Beispiel mit `shallowRef` den Aufruf durch `ref`. Was ändert sich beim Knopf «Im Array ergänzen»?
4. Ruf im Beispiel zu `nextTick` in `add` den Zähler dreimal hintereinander mit `count.value++` auf. Was steht danach im Protokoll?

## Aufgaben

Die Aufgaben reparieren die Übungsversion der App aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/05-reactivity/reactivity/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Der Zähler im Kopf bleibt bei «0 Favoriten» stehen, auch wenn Knöpfe gedrückt sind. Finde in `src/components/AppHeader.vue` die Stelle, die den Wert kopiert, und mach aus dem Text einen berechneten Wert. Der Kopf zeigt danach «1 Favorit» oder «2 Favoriten».

:::solution[Lösung]
::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/components/AppHeader.vue" lines="1-11"}

`computed` liest `props.favorites` bei jedem Durchlauf und notiert die Abhängigkeit. Ändert `App` die Favoriten, bekommt `AppHeader` ein neues Array als Prop, und Vue rechnet den Text neu. Eine Funktion, die das Template aufruft, würde auch funktionieren, denn die Render-Funktion ist selbst ein Effekt.
:::
::::

::::exercise[Vertiefung]
Nach «Filter zurücksetzen» bleiben Suchtext und Kategorie stehen, und die Liste folgt der Suche nicht mehr. Repariere `resetFilter` in `src/App.vue` so, dass das reaktive Objekt erhalten bleibt.

:::solution[Lösung]
::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="14-15"}

::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="37-40"}

`Object.assign` schreibt beide Felder in das bestehende Objekt, und Vue löst für jedes Feld aus. Zwei Zuweisungen an `filter.query` und `filter.category` tun dasselbe. Mit `const` statt `let` scheitert die alte Zeile sofort mit einem Fehler, denn einer Konstanten lässt sich nichts Neues zuweisen.
:::
::::

::::exercise[Knobelei]
Der Katalog ändert sich nur als Ganzes, wenn ein Ding zurückkommt. Lege `catalog` in `src/App.vue` in ein `shallowRef`. Danach funktioniert der Knopf «Zurückgebracht» nicht mehr. Bring ihn wieder zum Laufen, ohne zu `ref` zurückzukehren. Das Ding zeigt sich danach als verfügbar, der Knopf verschwindet, und über der Liste steht «50 von 60 Dingen sind da».

:::solution[Lösung]
::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="8-9"}

::code{file="exercises/05-reactivity/reactivity/solution/{lang}/src/App.vue" lines="42-45"}

`map` liefert ein neues Array, in dem das zurückgebrachte Ding eine Kopie mit `availableFrom: null` ist. Die Zuweisung an `.value` löst aus, und Vue rendert die Karte und rechnet die Zahl über der Liste neu. Die Kopie mit `...item` lässt das Objekt aus den Daten unverändert. Eine Lösung mit `triggerRef(catalog)` nach der Änderung im Innern besteht die Tests auch, sie hängt aber davon ab, dass niemand den Aufruf vergisst.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein Wert bleibt beim Stand stehen, den er beim Laden der Seite hatte. | Nach einer Zeile auf oberster Ebene von `<script setup>` suchen, die einen reaktiven Wert liest und das Ergebnis behält, und daraus `computed` machen. |
| Nach einer neuen Zuweisung an eine Variable mit `reactive` reagiert die Seite nicht mehr. | Das Objekt behalten und seine Felder ändern, etwa mit `Object.assign`, und `reactive` immer mit `const` deklarieren. |
| Destrukturierte Felder eines reaktiven Objekts folgen ihm nicht. | Vor dem Destrukturieren `toRefs` aufrufen oder für ein einzelnes Feld `toRef` verwenden. |
| Eine Änderung im Innern eines `shallowRef` erscheint nicht auf der Seite. | `.value` ein neues Objekt oder Array geben oder nach der Änderung `triggerRef` aufrufen. |
| Code direkt nach einer Änderung findet im DOM noch den alten Stand. | Vor dem Lesen des DOM `await nextTick()` aufrufen. |
| `onRenderTracked` meldet in der gebauten App nichts. | Die Hooks für die Fehlersuche funktionieren nur während der Entwicklung. |
| Ein KI-Assistent lässt die Komponente mit `$forceUpdate` oder einem wechselnden `key` neu rendern. | Die Ursache suchen, meist ein kopierter Wert oder ein ersetztes Objekt. Ein reaktiver Wert braucht kein erzwungenes Rendern. |

## Selbstcheck

::::selfcheck
1. Was notiert Vue, während ein Effekt läuft, und was tut es bei einer Änderung?
2. Warum folgt `const count = props.favorites.length` den Favoriten nicht?
3. Warum löst eine neue Zuweisung an eine Variable mit `reactive` nichts aus, eine an `.value` eines Refs aber schon?
4. Wann lohnt sich `shallowRef`, und was musst du dann beim Ändern beachten?
5. Wozu dient `nextTick`?

:::solution[Antworten]
1. Welche reaktiven Werte der Effekt liest. Ändert sich einer davon, führt Vue die Effekte erneut aus, die ihn gelesen haben.
2. Die Zeile läuft einmal beim Erstellen der Komponente und in keinem Effekt. `count` ist danach eine gewöhnliche Zahl.
3. Vue verfolgt Zugriffe auf den Proxy eines reaktiven Objekts und auf `.value` eines Refs. Eine Variable ist keins von beidem, ihre neue Zuweisung bemerkt niemand.
4. Bei grossen Daten, die sich nur als Ganzes ändern. Eine Änderung braucht einen neuen Wert für `.value` oder danach `triggerRef`.
5. Um zu warten, bis Vue die gesammelten Änderungen ins DOM geschrieben hat.
:::
::::

:::assignment
Der Zähler stimmt wieder, und die App hält die Verbindung zu ihrem Zustand. Am Tresen ist der Wunsch aus Teil 4 geblieben. «Nach dem Neuladen fängt die Suche immer von vorne an.» Damit sich die App die Suche merkt, muss sie bei jeder Änderung etwas ausserhalb der Komponente tun und in den Speicher des Browsers schreiben. Dafür gibt es Watcher, das nächste Kapitel.
:::
