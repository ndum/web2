---
title: Props
description: Eine Komponente über Props mit Daten versorgen, Typ, Pflicht und Standardwert festlegen und verstehen, warum Daten nur von oben nach unten fliessen.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler hat nach der Vorstandssitzung geschrieben. Am Tresen fragen Mitglieder immer wieder, ob die Bohrmaschine gerade da ist, und im Katalog der App sehen alle Dinge gleich aus.

> Als Mitglied möchte ich im Katalog jedes Ding als Karte mit Name, Kategorie und Verfügbarkeit sehen, damit ich auf einen Blick weiss, was ich ausleihen kann.

Die Akzeptanzkriterien lauten:

1. Jede Karte zeigt den Namen und die Kategorie des Dings.
2. Ein ausgeliehenes Ding ist mit «Ausgeliehen» markiert, alle anderen mit «Verfügbar».
3. Dieselbe Karte erscheint später auch auf der Seite mit den Favoriten.
:::

:::goals
Nach diesem Kapitel kannst du

- einer Komponente mit `defineProps` Props geben und deren Typ festlegen,
- Werte als Text oder mit einem Doppelpunkt als Ausdruck übergeben,
- Pflicht-Props und Standardwerte einsetzen,
- erklären, warum Daten nur von der Eltern- zur Kindkomponente fliessen,
- entscheiden, ob eine Komponente einzelne Werte oder ein ganzes Objekt bekommt.

Du brauchst dafür die Template-Syntax aus Teil 3 und das Kapitel «Oberfläche zerlegen», in dem die Komponente `ItemCard` entstanden ist.
:::

## Eine Karte für alle Dinge

Im letzten Kapitel hast du die Karte eines Dings in die Komponente `ItemCard` ausgelagert. Der Katalog bindet sie dreimal ein. Schau dir die beiden Dateien an und überleg dir, was die Vorschau zeigt, bevor du das Beispiel im Playground öffnest.

::playground{dir="examples/04-components/props-start"}

Alle drei Karten zeigen die Bohrmaschine. Am Katalog liegt das nicht. `ItemCard` hat Namen und Kategorie fest im Template stehen, und jede eingebundene Karte rendert dasselbe Template. Damit eine Komponente an verschiedenen Stellen Verschiedenes zeigen kann, braucht sie Eingaben von aussen. In Vue heissen diese Eingaben Props, kurz für Properties.

## Props deklarieren

Eine Komponente mit Props funktioniert wie eine Funktion mit Parametern. Die Funktion legt fest, welche Werte sie erwartet, und wer sie aufruft, setzt die Werte ein. Bei `ItemCard` sind das der Name und die Kategorie. Die Elternkomponente, hier `App.vue`, besitzt die Daten und gibt sie beim Einbinden mit.

![Props fliessen von der Eltern- zur Kindkomponente. Oben steht App.vue, die Komponente mit den Daten. Drei Pfeile führen nach unten zu drei Karten der Komponente ItemCard, an jedem Pfeil stehen die übergebenen Props, zum Beispiel name gleich Bohrmaschine und category gleich Werkzeug. Einen Pfeil zurück nach oben gibt es nicht.](../../../assets/figures/de/p4c2-props-flow.svg)

In `<script setup>` deklarierst du Props mit `defineProps`. Du übergibst ein Objekt, in dem jeder Schlüssel eine Prop ist und der Wert beschreibt, was sie erwartet.

::code{file="examples/04-components/props-card/{lang}/ItemCard.vue" lines="1-6"}

`type: String` legt fest, dass die Prop Text erwartet, und `required: true` macht sie zur Pflicht. Im Template verwendest du Props wie Variablen, `{{ name }}` zeigt den Namen. `defineProps` musst du nicht importieren. Es ist ein Makro, das der Vue-Compiler beim Übersetzen der Komponente auflöst, darum funktioniert es nur in `<script setup>`.

Die Elternkomponente übergibt die Werte als Attribute, wie bei einem HTML-Element.

::playground{dir="examples/04-components/props-card"}

Jede Karte bekommt jetzt ihre eigenen Werte, und dieselbe Komponente zeigt drei verschiedene Dinge.

## Text und Ausdrücke übergeben

Für das zweite Akzeptanzkriterium braucht die Karte eine dritte Prop, die sagt, ob ein Ding verfügbar ist. Das ist ein Wahrheitswert, also der Typ `Boolean`.

::code{file="examples/04-components/props-available/{lang}/ItemCard.vue" lines="1-16"}

Bei der Übergabe passiert der häufigste Fehler mit Props. Ein Attribut ohne Doppelpunkt übergibt immer Text. `available="false"` übergibt den Text «false», und ein Text, der nicht leer ist, gilt in JavaScript als wahr. Erst mit dem Doppelpunkt wertet Vue den Inhalt als JavaScript-Ausdruck aus, `:available="false"` übergibt den Wahrheitswert `false`. Dasselbe gilt für Zahlen, Arrays, Objekte und Variablen. Der Doppelpunkt ist die Kurzform von `v-bind`, die du aus Teil 3 kennst.

::code{file="examples/04-components/props-available/{lang}/App.vue" lines="7-11"}

| Im Template | Was in der Komponente ankommt |
|---|---|
| `name="Bohrmaschine"` | der Text «Bohrmaschine» |
| `:available="false"` | der Wahrheitswert `false` |
| `:deposit="20"` | die Zahl 20 |
| `:name="item.name"` | der Wert von `item.name` |
| `available` ohne Wert | `true`, das gilt nur für Props vom Typ `Boolean` |

## Pflicht und Standardwert

Die Prop `available` hat den Standardwert `true`. Fehlt sie beim Einbinden, nimmt Vue diesen Wert, darum ist die Bohrmaschine verfügbar, obwohl `App.vue` dazu nichts angibt. Eine Prop ist entweder Pflicht oder hat einen Standardwert, beides zusammen ergibt keinen Sinn.

Fehlt eine Pflicht-Prop oder hat sie den falschen Typ, rendert Vue die Komponente trotzdem und schreibt eine Warnung in die Konsole des Browsers, zum Beispiel `Missing required prop: "category"`. Diese Prüfung läuft nur während der Entwicklung, im fertigen Build prüft Vue nichts mehr. Die Angaben in `defineProps` schützen die App also nicht zur Laufzeit. Sie helfen beim Entwickeln und dokumentieren, was eine Komponente braucht, für dich und für alle, die sie später einsetzen.

Bei Objekten und Arrays muss der Standardwert eine Funktion sein, die jedes Mal ein neues Objekt liefert, zum Beispiel `default: () => []`. Sonst teilen sich alle Karten dasselbe Array. Mit `validator` kannst du eine Prop zusätzlich prüfen lassen, etwa ob eine Zahl nicht negativ ist, mit `validator: (value) => value >= 0`.

:::deepdive[Props destrukturieren]
Seit Vue 3.5 kannst du Props direkt in Variablen zerlegen und dabei den Standardwert setzen.

::code{file="examples/04-components/props-destructure/{lang}/ItemCard.vue" lines="1-8"}

Die Karte bleibt trotzdem reaktiv, weil der Compiler `name` intern wieder als `props.name` liest. Übergibst du eine solche Variable allerdings an eine andere Funktion, bekommt diese nur den aktuellen Wert. Für `watch` aus Teil 5 schreibst du deshalb `watch(() => available, ...)`. Der Kurs verwendet meist `const props = defineProps(...)`, weil dort sichtbar bleibt, was eine Prop ist.
:::

## Daten fliessen nur nach unten

Props sind eine Einbahnstrasse. Die Elternkomponente besitzt die Daten und gibt sie nach unten weiter, die Kindkomponente liest sie nur. Ändert sich ein Wert in `App.vue`, rendert Vue die betroffenen Karten neu. Die Karte selbst darf ihre Props nicht ändern.

```vue
<script setup>
const props = defineProps({ available: Boolean })

function reserve() {
  props.available = false // blocked, Vue warns that props are readonly
}
</script>
```

Vue blockiert diese Zuweisung und warnt in der Konsole, dass die Prop schreibgeschützt ist. Der Grund ist die Nachvollziehbarkeit. Könnte jede Karte die Daten des Katalogs ändern, wüsste bald niemand mehr, woher ein Wert kommt. So gibt es für jeden Wert genau eine Komponente, die ihn besitzt und ändert.

Braucht die Karte einen Wert, den sie selbst verändert, etwa die gewünschte Anzahl Tage, legt sie dafür einen eigenen Zustand mit `ref` an. Muss sie der Elternkomponente etwas mitteilen, etwa dass jemand auf «Reservieren» geklickt hat, löst sie ein Event aus. Das ist das Thema des nächsten Kapitels.

## Einzelne Werte oder ein ganzes Objekt

Im Katalog stehen die Dinge in einem Array, und mit `v-for` entsteht für jedes Ding eine Karte. Statt Name, Kategorie und Verfügbarkeit einzeln zu übergeben, kannst du auch das ganze Objekt als eine Prop weitergeben.

::playground{dir="examples/04-components/props-item"}

Beide Wege sind verbreitet, und beide haben Vor- und Nachteile.

| | Einzelne Props | Ein Objekt als Prop |
|---|---|---|
| Schnittstelle | zeigt genau, was die Karte braucht | hängt vom Aufbau der Daten ab |
| Wiederverwendung | passt auch zu Daten aus einer anderen Quelle, etwa einer Favoritenliste | andere Daten müssen erst dieselbe Form bekommen |
| Tests | wenige Werte genügen | ein passendes Objekt muss gebaut werden |
| Schreibaufwand | grösser, bei vielen Feldern unübersichtlich | kleiner |
| Falle | keine besondere | Felder des Objekts lassen sich ohne Warnung ändern |

Vue schützt nur die Prop selbst. `props.item = ...` blockiert Vue, `props.item.available = false` dagegen nicht, denn das Objekt bleibt dasselbe, auf das auch `App.vue` zeigt. Die Änderung landet ohne Warnung in den Daten der Elternkomponente. Wer ein Objekt übergibt, ändert dessen Felder deshalb nie in der Kindkomponente.

Für kleine Komponenten, die nur etwas anzeigen, wie die Karte, sind einzelne Props meist die bessere Wahl. Für Komponenten, die mit einem ganzen Datensatz arbeiten, etwa ein Formular zum Bearbeiten eines Dings, passt ein Objekt besser.

## Im Code

Arbeite mit dem Beispiel zur Verfügbarkeit. Lies zuerst den Code und schreib auf, was du erwartest, bevor du etwas änderst.

::playground{dir="examples/04-components/props-available"}

1. Was zeigt die dritte Karte, wenn du `:available="true"` ganz weglässt? Was zeigt die zweite, wenn du dort den Doppelpunkt entfernst?
2. Öffne das Beispiel im Playground und prüfe deine Vermutungen.
3. Entferne bei einer Karte die Kategorie. Welche Warnung erscheint in der Konsole des Playgrounds, und was zeigt die Karte?
4. Ändere den Standardwert von `available` auf `false`. Welche Karten ändern sich, und warum genau diese?

Danach baust du in den Aufgaben selbst.

## Aufgaben

Die Aufgaben bauen auf einem kleinen Projekt auf, das den Katalog von Lorraine Commons mit sechs Dingen zeigt. Du findest es im Kursrepo im Ordner `exercises/04-components/props/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Mit `npm run dev` siehst du den Katalog im Browser. Die Tests im Ordner `tests` zeigen dir, welche Aufgaben erfüllt sind. Zu Beginn schlagen fast alle fehl, das ist so gewollt.

::::exercise[Einstieg]
Für jedes Ding verlangt Lorraine Commons ein Pfand. Gib `ItemCard` eine Pflicht-Prop `deposit` vom Typ `Number` und zeig das Pfand unter der Kategorie an, zum Beispiel `Pfand: CHF 20.00`. Mit `toFixed(2)` bekommt eine Zahl zwei Stellen nach dem Punkt. Ergänze in `App.vue` die Übergabe. Die Tests in `level-1.test.js` prüfen beides.

:::solution[Lösung]
In `ItemCard.vue` kommt die Prop dazu, und das Template zeigt sie an.

::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemCard.vue" lines="4-9"}

::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemCard.vue" lines="19-26"}

In `App.vue` braucht die Übergabe einen Doppelpunkt, `:deposit="item.deposit"`. Ohne ihn käme der Text «item.deposit» an, Vue würde vor dem falschen Typ warnen, und der erste Test schlüge fehl.
:::
::::

::::exercise[Vertiefung]
Ein Ding, das gerade ausgeliehen ist, hat im Datensatz ein Datum in `availableFrom`, sonst steht dort `null`. Gib der Karte eine Prop `availableFrom` vom Typ `String` mit dem Standardwert `null`. Die Karte zeigt «Verfügbar», solange kein Datum da ist, und sonst zum Beispiel «Wieder verfügbar ab 12.11.2026». Berechne diesen Text mit `computed` aus Teil 3. Damit `computed` an die Prop kommt, brauchst du `const props = defineProps(...)`. Das Datum formatierst du mit `new Date(props.availableFrom).toLocaleDateString('de-CH', { timeZone: 'UTC' })`.

:::solution[Lösung]
::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemCard.vue" lines="1-17"}

Ein Datum ohne Uhrzeit wie `2026-11-12` liest JavaScript als Mitternacht in UTC. Wer das in der Zeitzone der Schweiz formatiert, bekommt trotzdem den richtigen Tag, in Amerika aber den Vortag. Mit `timeZone: 'UTC'` stimmt der Tag überall. Weil `state` ein `computed` ist, rechnet Vue den Text neu, sobald sich die Prop ändert, das prüft der dritte Test.
:::
::::

::::exercise[Knobelei]
Lege eine neue Komponente `ItemList.vue` an. Sie bekommt das Array der Dinge als Pflicht-Prop `items`, zeigt für jedes Ding eine `ItemCard` und gibt alle vier Werte weiter. Ist das Array leer, zeigt sie «Keine Dinge gefunden.». Baue `ItemList` in `App.vue` ein. Überlege dir danach, warum es sich lohnt, dass `ItemList` einzelne Props an die Karte gibt und nicht das ganze Objekt, wenn du an die Favoritenseite aus dem Auftrag denkst.

:::solution[Lösung]
::code{file="exercises/04-components/props/solution/{lang}/src/components/ItemList.vue"}

::code{file="exercises/04-components/props/solution/{lang}/src/App.vue"}

Im Template schreibt `ItemList` die Prop als `available-from`. Vue setzt diese Schreibweise mit `availableFrom` gleich, in Templates sind beide erlaubt. Weil die Karte nur einzelne Werte kennt, kann die Favoritenseite sie mit Daten aus einer anderen Quelle füttern, etwa aus einer Liste von Reservationen, ohne dass diese Daten genau wie der Katalog aufgebaut sein müssen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Die Kindkomponente ändert eine Prop, etwa mit `props.available = false`. | Den Wert in der Elternkomponente ändern und ihr mit einem Event Bescheid geben (nächstes Kapitel). |
| `deposit="20"` ohne Doppelpunkt, die Prop bekommt den Text «20». | Bei allem, was kein fester Text ist, den Doppelpunkt setzen. Die Warnung zum Typ in der Konsole zeigt den Fehler. |
| Die Kindkomponente ändert Felder eines Objekts, das sie als Prop bekommen hat. | Felder nie in der Kindkomponente ändern. Die Elternkomponente informieren oder mit einer Kopie arbeiten. |
| Unsicherheit, ob `available-from` im Template und `availableFrom` im Script dieselbe Prop sind. | Vue setzt beide Schreibweisen gleich. Im Script camelCase, im Template ist beides erlaubt. |
| Ein KI-Assistent schreibt `props: { ... }` und `this.name` in `<script setup>`. | Das ist die Options API. In `<script setup>` gibt es kein `this`, Props kommen aus `defineProps`. |
| Ein KI-Assistent importiert `defineProps` aus `vue`. | Den Import weglassen. `defineProps` ist ein Makro des Compilers, der beim Import warnt. |
| Ein KI-Assistent schlägt den Modifikator `.sync` vor. | `.sync` stammt aus Vue 2. In Vue 3 übernimmt `v-model` auf Komponenten diese Aufgabe, auch das kommt im nächsten Kapitel. |

## Selbstcheck

::::selfcheck
1. Was ist der Unterschied zwischen `available="false"` und `:available="false"`?
2. Eine Pflicht-Prop fehlt beim Einbinden. Was passiert während der Entwicklung, und was im fertigen Build?
3. Warum muss der Standardwert einer Prop vom Typ `Array` eine Funktion sein?
4. Eine Karte bekommt ein Objekt `item` und setzt `item.available = false`. Wer sieht diese Änderung, und warum warnt Vue nicht?

:::solution[Antworten]
1. Ohne Doppelpunkt kommt der Text «false» an, und der gilt in JavaScript als wahr. Mit Doppelpunkt wertet Vue den Ausdruck aus und übergibt den Wahrheitswert `false`.
2. Während der Entwicklung rendert Vue die Komponente und warnt in der Konsole. Im fertigen Build prüft Vue die Props nicht mehr, an der Stelle der fehlenden Prop bleibt die Karte einfach leer.
3. Sonst teilen sich alle Instanzen der Komponente dasselbe Array, und eine Änderung an einer Stelle wäre überall zu sehen.
4. Alle Komponenten, die dasselbe Objekt verwenden, also `App.vue` und jede andere Stelle, die dieses Ding zeigt. Vue schützt nur die Prop selbst vor einer neuen Zuweisung, nicht die Felder des Objekts dahinter.
:::
::::

:::assignment
Martina Hostettler gefallen die Karten, und sie hat gleich den nächsten Wunsch. Mitglieder sollen ein Ding direkt auf der Karte reservieren können. Der Knopf dafür sitzt in `ItemCard`, die Liste der Reservationen gehört aber in den Katalog. Props tragen Daten nur nach unten, für den Weg zurück nach oben braucht es Events. Darum geht es im nächsten Kapitel.
:::
