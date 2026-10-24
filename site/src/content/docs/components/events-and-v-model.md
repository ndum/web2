---
title: Events und v-model
description: Mit defineEmits Events auslösen und prüfen, in der Elternkomponente darauf reagieren und v-model mit defineModel auf eigenen Komponenten umsetzen, auch mehrfach.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler hat die Wünsche vom Tresen gesammelt.

> Als Mitglied möchte ich ein Ding direkt auf seiner Karte reservieren und als Favorit markieren, damit ich schneller zum Formular komme und meine Lieblingsdinge wiederfinde.

Die Akzeptanzkriterien lauten:

1. Der Knopf «Reservieren» auf einer Karte öffnet die Seite des Dings mit dem Formular.
2. Ein Knopf «Favorit» markiert ein Ding und hebt die Markierung wieder auf, und ein Screenreader erfährt, ob der Knopf gedrückt ist.
3. Im Kopf steht, wie viele Favoriten es gibt.
4. Suchfeld und Kategorie sind eigene Komponenten und funktionieren wie bisher.
:::

:::goals
Nach diesem Kapitel kannst du

- mit `defineEmits` Events deklarieren und mit Daten auslösen,
- in der Elternkomponente auf Events reagieren,
- Events in der Objektschreibweise prüfen,
- `v-model` auf eigenen Komponenten mit `defineModel` umsetzen,
- mehrere `v-model` auf einer Komponente verwenden.
:::

## Events auslösen

Props tragen Daten von der Elternkomponente zum Kind. Für den Weg zurück löst das Kind ein Event aus, und die Elternkomponente reagiert darauf. Die Karte meldet also nur, dass jemand auf «Reservieren» geklickt hat. Was dann passiert, entscheidet die Komponente, der die Daten gehören.

`defineEmits` deklariert die Events einer Komponente und gibt eine Funktion zurück, mit der sie sie auslöst. Lies das Beispiel und überleg dir, was nach einem Klick auf die zweite Karte erscheint.

::playground{dir="examples/04-components/emit-reserve"}

`emit('reserve', id)` löst das Event `reserve` aus und gibt die id als Daten mit. `App` hört mit `@reserve="reserve"` zu, wie bei einem Klick auf ein HTML-Element, und die Funktion `reserve` bekommt die id als Argument. Anders als Events im DOM steigen die Events einer Komponente nicht weiter nach oben. Nur die direkte Elternkomponente kann zuhören.

![Props nach unten, Events nach oben. Oben steht App. Links darunter ItemCard, App gibt ihr mit Props den Namen und die Verfügbarkeit, die Karte meldet mit dem Event reserve die id zurück. Rechts darunter SearchBar, App gibt ihr den Wert modelValue, das Suchfeld meldet Änderungen mit dem Event update:modelValue. v-model verbindet beides.](../../../assets/figures/de/p4c3-props-events.svg)

Ein Event heisst nach dem, was passiert ist, etwa `reserve` oder `toggleFavorite`, nicht nach dem, was die Elternkomponente damit tun soll. Im Script schreibst du die Namen in camelCase, im Template der Elternkomponente meist in kebab-case, `@toggle-favorite`. Vue setzt beide Schreibweisen gleich, wie bei Props.

## Events prüfen

Statt eines Arrays nimmt `defineEmits` auch ein Objekt. Zu jedem Event gehört dann eine Funktion, die die Daten prüft und `true` oder `false` zurückgibt. Liefert sie `false`, schreibt Vue während der Entwicklung eine Warnung in die Konsole, löst das Event aber trotzdem aus.

::playground{dir="examples/04-components/emit-validate"}

Die zweite Karte bekommt ihre id als Text «6», weil der Doppelpunkt fehlt. Beim Laden warnt Vue vor dem falschen Typ der Prop, beim Klick vor den Daten des Events mit `Invalid event arguments: event validation failed for event "reserve".`. Die Deklaration mit `defineEmits` dokumentiert ausserdem, welche Events eine Komponente kennt. Wer sie verwendet, sieht auf einen Blick, worauf sie hören kann.

## v-model auf eigenen Komponenten

Das Suchfeld wird zur Komponente `SearchBar`. Der Suchtext gehört weiter `App`, die Komponente soll ihn aber lesen und ändern können, wie ein Eingabefeld mit `v-model`. Dafür gibt es seit Vue 3.4 das Makro `defineModel`.

::playground{dir="examples/04-components/define-model"}

`defineModel` gibt ein Ref zurück. Liest `SearchBar` es, bekommt sie den Wert von `App`. Ändert sie es, weil jemand tippt, ändert sich der Wert in `App`. Dahinter stecken eine Prop und ein Event, wie du sie schon kennst. Die beiden Zeilen tun dasselbe.

```vue
<SearchBar v-model="query" />
<SearchBar :model-value="query" @update:model-value="query = $event" />
```

Die Prop heisst `modelValue`, das Event `update:modelValue`. `defineModel` deklariert beides und spart dir den Code, der sie verbindet.

## Mehrere v-model

Eine Komponente kann mehrere Werte binden. Jedes Model bekommt dann einen Namen, `defineModel('query')` und `defineModel('category')`, und die Elternkomponente bindet sie mit `v-model:query` und `v-model:category`.

::playground{dir="examples/04-components/several-models"}

Die Fallbeispiel-App nutzt das für die Seite mit dem Katalog. `App` besitzt Suchtext und Kategorie, damit beides einen Besuch auf der Seite eines Dings übersteht, und `CatalogView` bindet sie mit zwei Models an `SearchBar` und `CategoryFilter`.

## Favoriten

Favoriten zeigen, wie Props und Events zusammenspielen. `App` besitzt die ids der Favoriten in einem Array. Jede Karte bekommt mit der Prop `favorite` gesagt, ob sie ein Favorit ist, und meldet einen Klick mit dem Event `toggleFavorite`. `App` ändert das Array, und Vue aktualisiert die Karte und den Kopf, der die Favoriten zählt.

Der Knopf «Favorit» ist ein Schalter. `:aria-pressed="favorite"` sagt einem Screenreader, ob er gedrückt ist, und das CSS kann ihn mit dem Selektor `[aria-pressed='true']` hervorheben. Bis Teil 5 vergisst die App die Favoriten beim Neuladen, dann kommt ein Composable, das sie sich merkt.

## Im Code

Arbeite mit dem Beispiel zur Prüfung der Events. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Klick auf beide Knöpfe «Reservieren». Was steht danach in der Konsole des Playgrounds, und welche Zeile stammt von `App`?
2. Setz den Doppelpunkt vor `id="6"`. Welche Warnungen verschwinden?
3. Ändere die Prüfung auf `(id) => id > 0` und nimm den Doppelpunkt wieder weg. Warum warnt Vue jetzt beim Klick nicht mehr?
4. Wechsle zum Beispiel mit `defineModel` und setz in `App` den Startwert von `query` auf «säge». Was zeigen das Feld und die Liste?

## Aufgaben

Die Aufgaben bauen die Karte und den Katalog aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/04-components/events/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Ergänze in `ItemCard` einen Knopf «Reservieren» mit der Klasse `reserve`. Ein Klick löst das Event `reserve` mit der id des Dings aus, deklariert mit `defineEmits`. `App` zeigt danach in einem Element mit der Klasse `message` zum Beispiel «Reservation für Bohrmaschine angefragt.».

:::solution[Lösung]
`ItemCard` deklariert das Event und löst es beim Klick aus.

::code{file="exercises/04-components/events/solution/{lang}/src/components/ItemCard.vue" lines="10-14"}

::code{file="exercises/04-components/events/solution/{lang}/src/components/ItemCard.vue" lines="23-23"}

`App` hört mit `@reserve="reserve"` zu und sucht das Ding zur id.

::code{file="exercises/04-components/events/solution/{lang}/src/App.vue" lines="22-25"}

Die Lösung deklariert schon das Event der Knobelei mit. Für den Einstieg genügt `defineEmits(['reserve'])`.
:::
::::

::::exercise[Vertiefung]
Mach aus dem Suchfeld die Komponente `src/components/SearchBar.vue`. Sie bindet den Suchtext mit `defineModel`, und `App` verwendet sie mit `<SearchBar v-model="query" />` statt des Felds. Die Suche funktioniert danach wie vorher.

:::solution[Lösung]
::code{file="exercises/04-components/events/solution/{lang}/src/components/SearchBar.vue"}

`query` ist das Ref aus `defineModel`, und das Feld bindet es mit `v-model` wie ein gewöhnliches Ref. `App` behält `const query = ref('')` und den berechneten Wert `visibleItems` und ersetzt nur Beschriftung und Feld durch `<SearchBar v-model="query" />`.
:::
::::

::::exercise[Knobelei]
Ergänze auf der Karte einen Knopf «Favorit» mit der Klasse `favorite`. Die Karte bekommt die Prop `favorite`, zeigt sie mit `aria-pressed` an und meldet einen Klick mit dem Event `toggleFavorite` und der id. `App` besitzt die ids der Favoriten und zeigt in einem Element mit der Klasse `favorites`, wie viele es sind, «2 Favoriten» oder «1 Favorit».

:::solution[Lösung]
::code{file="exercises/04-components/events/solution/{lang}/src/App.vue"}

`toggleFavorite` ersetzt das Array durch ein neues, mit oder ohne die id. Ein Array mit `push` und `splice` zu ändern, ginge auch, das neue Array macht die Absicht aber deutlicher. Die Karte erfährt mit `favorites.includes(item.id)`, ob sie ein Favorit ist. Sie ändert ihre Prop nie selbst, sie meldet nur den Klick.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| In `<script setup>` steht `this.$emit('reserve')`. | Es gibt kein `this`. `const emit = defineEmits([...])` liefert die Funktion `emit`. |
| Die Grosselternkomponente hört auf ein Event des Enkels und bekommt nichts. | Events steigen nicht weiter nach oben. Die Komponente dazwischen gibt das Event weiter, `@reserve="emit('reserve', $event)"`. |
| Die Kindkomponente ändert ihre Prop, und Vue warnt, dass sie schreibgeschützt ist. | Ein Event auslösen oder für einen gebundenen Wert `defineModel` verwenden. |
| Ein Event kommt in der Elternkomponente ohne Daten an. | Die Daten als zweites Argument von `emit` mitgeben, `emit('reserve', id)`. |
| Ein KI-Assistent schlägt `.sync` oder die Option `model` vor. | Beides stammt aus Vue 2. In Vue 3 übernimmt `defineModel` diese Aufgabe. |
| Ein KI-Assistent verbindet Komponenten über einen Event-Bus. | Zwischen Eltern und Kind genügen Props und Events. Für Zustand, den viele Komponenten teilen, gibt es in Teil 7 Pinia. |

## Selbstcheck

::::selfcheck
1. Wie teilt eine Kindkomponente ihrer Elternkomponente etwas mit?
2. Was passiert, wenn die Prüffunktion eines Events `false` zurückgibt?
3. Wofür ist `v-model` auf einer Komponente eine Kurzform?
4. Warum besitzt `App` die Favoriten und nicht die Karten?

:::solution[Antworten]
1. Sie löst mit der Funktion aus `defineEmits` ein Event aus, auf Wunsch mit Daten, und die Elternkomponente hört mit `@` zu.
2. Vue warnt während der Entwicklung in der Konsole und löst das Event trotzdem aus.
3. Für die Prop `modelValue` zusammen mit dem Event `update:modelValue`.
4. Die Favoriten brauchen alle Karten und der Kopf. Die tiefste Komponente über ihnen allen ist `App`.
:::
::::

:::assignment
Reservieren und Favoriten funktionieren, und Martina Hostettler hat schon den nächsten Wunsch. «Bevor eine Anfrage abgeht, möchte ich sie noch einmal sehen und bestätigen.» Der Freiwillige ergänzt, dass alle Seiten denselben Rahmen mit Kopf und Fuss haben sollen. Für beides braucht es Slots, das nächste Kapitel.
:::
