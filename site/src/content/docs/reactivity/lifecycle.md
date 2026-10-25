---
title: Lebenszyklus und Template-Refs
description: Die Hooks im Leben einer Komponente, Elemente mit useTemplateRef ansprechen, den Fokus setzen, Listener und Timer anlegen und wieder aufräumen und den Fokus in einem Dialog führen.
sidebar:
  order: 3
---

:::assignment
Am Tresen arbeiten die Freiwilligen meistens mit der Tastatur, und Martina Hostettler hat ihren Wunsch aufgeschrieben.

> Als Freiwillige oder Freiwilliger am Tresen möchte ich den Katalog und den Dialog nur mit der Tastatur bedienen, damit ich beim Ausleihen nicht zur Maus greifen muss.

Die Akzeptanzkriterien lauten:

1. Öffnet sich der Katalog, steht der Fokus im Suchfeld.
2. Escape schliesst einen offenen Dialog.
3. Öffnet sich ein Dialog, steht der Fokus auf seinem ersten Knopf. Schliesst er sich, kehrt der Fokus dorthin zurück, wo er vorher war.
:::

:::goals
Nach diesem Kapitel kannst du

- die Hooks im Leben einer Komponente in ihrer Reihenfolge nennen,
- mit `useTemplateRef` auf ein Element im DOM zugreifen,
- den Fokus setzen, sobald eine Komponente erscheint,
- Listener und Timer in `onMounted` anlegen und in `onUnmounted` aufräumen,
- den Fokus in einem Dialog nach den Regeln für zugängliche Dialoge führen.
:::

## Der Lebenszyklus

Eine Komponente entsteht, erscheint im DOM, ändert sich und verschwindet wieder. An jedem dieser Punkte ruft Vue Funktionen auf, die du mit den Hooks des Lebenszyklus registrierst. Lies das Beispiel und überleg dir, in welcher Reihenfolge die Meldungen in der Konsole erscheinen.

::playground{dir="examples/05-reactivity/lifecycle-hooks"}

Beim Laden erscheinen `setup`, `onBeforeMount` und `onMounted`. Ein Klick auf den Zähler ändert den Zustand, und Vue meldet `onBeforeUpdate` und `onUpdated`. «Karte entfernen» lässt die Komponente mit `v-if` verschwinden, und es folgen `onBeforeUnmount` und `onUnmounted`.

![Der Lebenszyklus einer Komponente als Zeitachse von oben nach unten. Zuerst läuft setup, dann onBeforeMount und onMounted, ab hier steht die Komponente im DOM. Bei jeder Änderung des Zustands folgen onBeforeUpdate und onUpdated, ein Pfeil führt von onUpdated zurück zu onBeforeUpdate. Verschwindet die Komponente, folgen onBeforeUnmount und onUnmounted. Rechts steht, dass setup den Zustand anlegt, dass Fokus, Messen und Listener in onMounted gehören und dass onUnmounted Listener und Timer aufräumt.](../../../assets/figures/de/p5c3-lifecycle.svg)

Der Code direkt in `<script setup>` läuft, bevor es das DOM der Komponente gibt. Zustand, berechnete Werte und Watcher gehören dorthin. Alles, was das DOM braucht, etwa der Fokus oder die Grösse eines Elements, gehört in `onMounted`. Laut [Dokumentation](https://vuejs.org/api/composition-api-lifecycle.html#onmounted) gilt eine Komponente als eingehängt, wenn ihr DOM erzeugt und eingefügt ist und ihre Kindkomponenten eingehängt sind. `onUnmounted` ist der Ort, um Timer, Listener im DOM und Verbindungen zu Servern aufzuräumen. In `onUpdated` solltest du den Zustand nicht ändern, denn das führt laut Dokumentation leicht zu einer endlosen Folge von Updates.

## Template-Refs mit useTemplateRef

Manchmal braucht der Code ein bestimmtes Element, etwa um ihm den Fokus zu geben. Ein Template-Ref verbindet ein Element mit einer Variablen im Script. Seit Vue 3.5 gibt es dafür `useTemplateRef`. Das Element bekommt das Attribut `ref` mit einem Namen, und `useTemplateRef` mit demselben Namen liefert ein Ref, das nach dem Einhängen auf das Element zeigt.

::playground{dir="examples/05-reactivity/template-ref-focus"}

Nach dem Laden der Vorschau steht der Fokus im Suchfeld, und du kannst sofort tippen. Vor `onMounted` ist `search.value` noch `null`, denn das Element gibt es noch nicht. Verschwindet das Element später mit `v-if`, wird der Wert wieder `null`. Code, der zu einem anderen Zeitpunkt läuft, prüft darum zuerst, ob das Element da ist. Steht `ref` an einer Komponente statt an einem Element, zeigt der Template-Ref auf die Komponente. Die Elternkomponente sieht davon nur, was die Kindkomponente mit `defineExpose` freigibt.

In älteren Beispielen findest du `const search = ref(null)` mit demselben Namen wie im Attribut. Das funktioniert weiterhin, `useTemplateRef` macht die Verbindung aber ausdrücklich.

## Listener und Timer

Ein Listener auf `window` oder ein Timer mit `setInterval` gehört nicht zur Komponente. Er läuft weiter, wenn die Komponente verschwunden ist, und hält ihren Zustand im Speicher fest. Was du in `onMounted` anlegst, baust du darum in `onUnmounted` wieder ab.

::playground{dir="examples/05-reactivity/interval-cleanup"}

Die Uhr meldet jede Sekunde ein `tick` in der Konsole. Nach «Uhr entfernen» hören die Meldungen auf, weil `onUnmounted` den Timer mit `clearInterval` stoppt. Ohne diese Zeile laufen die Meldungen weiter, obwohl keine Uhr mehr zu sehen ist, und jedes neue Zeigen startet einen weiteren Timer.

Für Tasten wie Escape hört eine Komponente auf `keydown` von `window`. So wirkt die Taste, wo auch immer der Fokus gerade steht. Klick im Beispiel zuerst in die Vorschau, damit die Tasten dort ankommen.

::playground{dir="examples/05-reactivity/escape-key"}

`removeEventListener` braucht dieselbe Funktion wie `addEventListener`. Darum ist `onKeydown` eine benannte Funktion und keine Pfeilfunktion, die erst im Aufruf entsteht. Eine zweite Pfeilfunktion mit demselben Code wäre für JavaScript eine andere Funktion, und der Listener bliebe bestehen.

## Fokus in einem Dialog

Für Dialoge gibt es Regeln im [Dialog-Muster der WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Öffnet sich ein Dialog, wandert der Fokus in ihn hinein, meistens auf das erste Element, das den Fokus annehmen kann. Escape schliesst den Dialog. Schliesst er sich, kehrt der Fokus zum Element zurück, das ihn geöffnet hat. Gibt es dieses Element nicht mehr, wählt die App ein anderes, das zum Ablauf der Arbeit passt.

Für den Rückweg muss sich der Dialog merken, wo der Fokus vorher war. `document.activeElement` nennt das Element, das gerade den Fokus hat. In `onMounted` ist das noch das Element vor dem Dialog, denn der Fokus wandert erst durch den Aufruf von `focus` hinein. Ein Template-Ref funktioniert auch innerhalb von `Teleport`, obwohl das Element im DOM am Ende von `body` steht.

Im Fallbeispiel gibt es den Fall, dass das öffnende Element verschwindet. Nach dem Bestätigen einer Anfrage entsteht das Formular mit einem neuen `key` neu, und der Knopf «Anfrage senden», der den Dialog geöffnet hat, ist weg. `ItemView` setzt den Fokus darum auf die Überschrift des Formulars. Sie bekommt `tabindex="-1"`, damit sie den Fokus annehmen kann, ohne in der Reihenfolge der Tabulatortaste aufzutauchen. Erst nach dem nächsten Rendern sind Dialog und altes Formular weg, deshalb wartet `ItemView` vorher mit `await nextTick()`.

::code{file="case/05-reactivity/{lang}/src/views/ItemView.vue" lines="17-29"}

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Verschiebe im Beispiel zum Fokus `search.value.focus()` aus `onMounted` direkt in `<script setup>`. Was meldet die Konsole?
2. Klick im Beispiel zum Lebenszyklus einige Male auf den Zähler, entferne die Karte und zeig sie wieder. Welchen Stand hat der Zähler, und welche Hooks laufen?
3. Nimm im Beispiel mit der Uhr die Zeile mit `clearInterval` weg, entferne die Uhr und zeig sie wieder. Was erscheint jetzt in der Konsole?
4. Ergänze im Beispiel mit Escape in `onKeydown` ein `console.log(event.key)` und nimm die Zeile mit `onUnmounted` weg. Was erscheint, wenn du nach dem Schliessen des Hinweises Tasten drückst?

## Aufgaben

Die Aufgaben setzen den Auftrag in der Übungsversion des Katalogs um. Du findest das Projekt im Kursrepo im Ordner `exercises/05-reactivity/lifecycle/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Setze den Fokus ins Suchfeld, sobald der Katalog erscheint. Hol das Feld in `src/components/SearchBar.vue` mit `useTemplateRef` und ruf in `onMounted` seine Methode `focus` auf.

:::solution[Lösung]
::code{file="exercises/05-reactivity/lifecycle/solution/{lang}/src/components/SearchBar.vue"}

`input.value` zeigt erst in `onMounted` auf das Feld. Weil `SearchBar` den Fokus selbst setzt, bekommt ihn jede Seite, die das Suchfeld zeigt, ohne eigenen Code.
:::
::::

::::exercise[Vertiefung]
Der Dialog mit den Details eines Dings soll sich mit Escape schliessen. Ergänze in `src/components/BaseDialog.vue` einen Listener für `keydown` auf `window`, der bei Escape das Event `close` auslöst. Melde ihn wieder ab, wenn der Dialog verschwindet.

:::solution[Lösung]
::code{file="exercises/05-reactivity/lifecycle/solution/{lang}/src/components/BaseDialog.vue" lines="13-15"}

In `onMounted` meldet `window.addEventListener('keydown', onKeydown)` die Funktion an, in `onUnmounted` meldet `window.removeEventListener('keydown', onKeydown)` sie wieder ab. Für den Aufruf von `emit` im Script braucht es `const emit = defineEmits(['close'])`. Die ganze Datei steht in der Lösung der Knobelei.
:::
::::

::::exercise[Knobelei]
Öffnet sich der Dialog, soll der Fokus auf seinem ersten Knopf stehen. Schliesst er sich, kehrt der Fokus zum Element zurück, das ihn vorher hatte, meistens zum Knopf «Details». Ergänze das in `BaseDialog`.

:::solution[Lösung]
::code{file="exercises/05-reactivity/lifecycle/solution/{lang}/src/components/BaseDialog.vue" lines="1-30"}

Der Template-Ref `dialog` zeigt auf das Element mit `role="dialog"`, und `querySelector('button')` findet darin den ersten Knopf. Ohne eigene Aktionen ist das «Schliessen». `opener` merkt sich das Element, das vorher den Fokus hatte, und `onUnmounted` gibt ihm den Fokus zurück. Hätte ein Dialog Felder vor seinen Knöpfen, käme der Fokus auf das erste Feld, dann sucht `querySelector` besser nach Feldern und Knöpfen zusammen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Die Konsole meldet `Cannot read properties of null (reading 'focus')`. | Das Element erst in `onMounted` oder später ansprechen. Vorher ist der Template-Ref `null`. |
| Der Template-Ref bleibt auch nach dem Einhängen `null`. | Den Namen in `useTemplateRef` und im Attribut `ref` gleich schreiben. |
| Nach dem Verlassen einer Seite laufen Timer oder Listener weiter. | Was `onMounted` anlegt, in `onUnmounted` mit `clearInterval` oder `removeEventListener` abbauen. |
| `removeEventListener` entfernt den Listener nicht. | Dieselbe Funktion übergeben wie bei `addEventListener`, keine neue Pfeilfunktion. |
| Nach dem Schliessen eines Dialogs landet der Fokus am Anfang der Seite. | Das Element mit dem Fokus beim Öffnen merken und ihm den Fokus beim Schliessen zurückgeben. |
| Ein KI-Assistent holt ein Element einer Komponente mit `document.querySelector('#search')`. | `useTemplateRef` verwenden. Es findet das Element der eigenen Komponente, auch wenn die Komponente mehrmals auf der Seite steht. |
| Ein KI-Assistent schreibt `this.$refs.search`. | Das ist die Options API. In `<script setup>` gibt es dafür `useTemplateRef`. |

## Selbstcheck

::::selfcheck
1. In welcher Reihenfolge laufen die Hooks, wenn eine Komponente erscheint, sich ändert und verschwindet?
2. Warum ist ein Template-Ref vor `onMounted` leer?
3. Warum braucht ein Listener auf `window` ein Gegenstück in `onUnmounted`?
4. Wohin gehört der Fokus, wenn ein Dialog erscheint, und wohin, wenn er sich schliesst?

:::solution[Antworten]
1. `setup`, `onBeforeMount`, `onMounted`, bei jeder Änderung `onBeforeUpdate` und `onUpdated`, am Ende `onBeforeUnmount` und `onUnmounted`.
2. Das DOM der Komponente entsteht erst beim Einhängen. Vorher gibt es kein Element, auf das der Ref zeigen kann.
3. `window` lebt länger als die Komponente. Ohne `removeEventListener` reagiert der Listener weiter und hält den Zustand der Komponente im Speicher.
4. Beim Öffnen auf ein Element im Dialog, meistens das erste, das den Fokus annehmen kann. Beim Schliessen zurück zum Element, das den Dialog geöffnet hat, oder auf ein passendes anderes, wenn es dieses nicht mehr gibt.
:::
::::

:::assignment
Mit der Tastatur geht jetzt alles. Offen ist noch der zweite Teil des Wunsches aus Teil 4, die Favoriten nach dem Neuladen. Der Freiwillige möchte den Code aus dem Kapitel «Watcher» dafür nicht kopieren. «Speichern und Lesen sollte eine Funktion übernehmen, die jede Komponente verwenden kann.» Solche Funktionen heissen in Vue Composables, das nächste Kapitel.
:::
