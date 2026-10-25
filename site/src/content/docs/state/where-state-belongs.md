---
title: Zustand am richtigen Ort
description: Lokaler, geteilter und globaler Zustand, Daten vom Server und aus der Adresse, Zustand in die Elternkomponente heben, ein Modul für geteilten Zustand und die Frage, wann eine App keinen Store braucht.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler hat einen neuen Wunsch.

> Als Mitglied möchte ich meine Anfragen überall in der App sehen, damit ich weiss, was ich schon angefragt habe.

Der Freiwillige zögert. `App` stellt schon Katalog, Favoriten und das angemeldete Mitglied bereit, und jede neue Seite braucht wieder etwas davon. Bevor ein viertes Stück dazukommt, will er für jedes Stück klären, wo es hingehört. Die Akzeptanzkriterien lauten:

1. Für Favoriten, Anmeldung, Filter und Anfragen ist entschieden und begründet, wo sie liegen.
2. Kopf und Liste zeigen dieselben Favoriten, und keine Komponente hält eine eigene Kopie.
3. Kopf und Übersicht zeigen dieselben Anfragen, egal wo jemand ein Ding anfragt.
:::

:::goals
Nach diesem Kapitel kannst du

- lokalen, geteilten und globalen Zustand unterscheiden,
- Daten vom Server und Zustand in der Adresse erkennen,
- Zustand in die Elternkomponente heben und mit Props und Events weitergeben,
- geteilten Zustand in ein Modul mit Funktionen legen,
- begründen, wann eine App keinen Store braucht.
:::

## Arten von Zustand

Zustand sind die Daten, die sich ändern, während jemand mit der App arbeitet, und die die Seite zeigt. Die Fallbeispiel-App hat davon schon einiges. Das Suchfeld hält seinen Text, der Dialog weiss, ob er offen ist, `App` hält Katalog, Favoriten und Mitglied, und Suche, Kategorie und Sortierung stehen seit Teil 6 in der Adresse. Die Orte unterscheiden sich darin, wer den Zustand braucht und wie lange er leben soll.

| Art | Beispiel in der Fallbeispiel-App | Ort |
|---|---|---|
| lokal | ob der Dialog offen ist | ein `ref` in der Komponente |
| geteilt | die Favoriten für Kopf und Liste | die gemeinsame Elternkomponente |
| global | das angemeldete Mitglied | ein Modul oder ein Store |
| vom Server | Katalog und Anfragen | der Server, im Browser eine Kopie |
| in der Adresse | Suche, Kategorie und Sortierung | Parameter und Query |

Die Abbildung stellt die Fragen in einer Reihenfolge, die zu einer Antwort führt. Zuerst kommt die Adresse, denn was jemand teilen oder neu laden will, muss dort stehen. Dann folgt der Server, denn Daten, die anderen gehören, kann die App nur abfragen. Erst danach geht es darum, wie viele Komponenten einen Wert brauchen.

![Ein Entscheidungsbaum mit vier Fragen von oben nach unten. Soll eine Adresse den Wert festhalten, zum Teilen und Neuladen, gehört er in die Adresse, als route.params oder route.query. Liegt er sonst auf dem Server, holt ihn ein Store mit fetch in einer Action. Braucht ihn sonst nur eine Komponente, bleibt er lokal als ref in der Komponente. Brauchen ihn sonst wenige Komponenten mit gemeinsamer Elternkomponente, kommt er in die Elternkomponente und geht mit Props und Events weiter. In allen anderen Fällen gehört er in einen Store mit Pinia.](../../../assets/figures/de/p7c1-state-decision.svg)

## Zustand in die Elternkomponente heben

Brauchen zwei Geschwister denselben Zustand, gehört er in ihre gemeinsame Elternkomponente. Sie gibt ihn als Prop weiter und ändert ihn, wenn ein Kind ein Event meldet, wie in Teil 4.

::playground{dir="examples/07-state/lift-state-up"}

Laut [Vue-Dokumentation](https://vuejs.org/guide/scaling-up/state-management.html) wird das in tiefen Bäumen mühsam, weil die Props durch Komponenten wandern, die sie selbst nicht brauchen. Das nennt man Prop Drilling. Für einen Teilbaum helfen `provide` und `inject` aus Kapitel 4.5, und so hält es die Fallbeispiel-App seit Teil 6.

## Ein Modul für geteilten Zustand

Ein JavaScript-Modul läuft nur einmal, und jede Komponente, die es importiert, bekommt dieselben Objekte. Ein `ref` in einem Modul ist darum schon ein globaler Zustand, ganz ohne Bibliothek.

::playground{dir="examples/07-state/reactive-module"}

Die Vue-Dokumentation nennt den Haken. Jede Komponente, die das Modul importiert, kann den Zustand beliebig ändern, und in einer grossen App weiss bald niemand mehr, wer was geändert hat. Das Modul im Beispiel gibt die Anfragen darum mit `readonly` heraus und ändert sie nur in seinen Funktionen `add` und `remove`. Für Apps, die auf einem Server gerendert werden, taugt ein solches Modul nicht, weil sich dort alle Anfragen an den Server denselben Zustand teilen würden. Eine SPA wie die des Kurses betrifft das nicht.

## Ohne Store auskommen

Ein Store lohnt sich, wenn viele Komponenten an verschiedenen Stellen denselben Zustand lesen und ändern. Braucht nur eine Komponente einen Wert, bleibt er lokal. Teilen ihn zwei Geschwister, reicht die Elternkomponente. Daten vom Server sind im Browser nur eine Kopie, die veralten kann, denn andere Mitglieder fragen Dinge an, und das Team erfasst Rückgaben. Ein Store kann diese Kopie halten, muss sie aber neu laden, wenn sie veraltet sein kann.

Für die Fallbeispiel-App ergibt das diese Zuordnung.

1. Die Favoriten brauchen Kopf, Katalog und die Seite der Favoriten. Sie kommen in einen Store und bleiben im Speicher des Browsers, wie Kapitel 7.4 zeigt.
2. Das angemeldete Mitglied brauchen Kopf, Guard und Formular. Es kommt in einen Store, ob die Anmeldung gilt, entscheidet aber der Server.
3. Suche, Kategorie und Sortierung bleiben in der Adresse.
4. Die Anfragen liegen auf dem Server des Vereins. Ein Store hält die eigenen Anfragen als Kopie für den Kopf, die Seite eines Dings und die Übersicht.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Gib im ersten Beispiel `ItemList` wieder eine eigene Liste der Favoriten und nimm die Props weg. Was zeigt der Kopf jetzt?
2. Versuch im Beispiel mit dem Modul, die Anfragen in `AppHeader` mit `requests.value.push({ id: 1 })` zu ändern. Was meldet die Konsole?
3. Ersetze im Modul `readonly(list)` durch `list` und wiederhole den Versuch.
4. Ordne die drei Felder des Formulars für Reservationen mit der Abbildung ein. Ändert sich etwas, wenn jemand die halb ausgefüllte Anfrage auch nach dem Neuladen wiederfinden soll?

## Aufgaben

Die Aufgaben bauen die Favoriten und die Anfragen aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/07-state/where-state/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
`ItemList` hält die Favoriten selbst, und der Kopf zeigt immer 0. Heb die Favoriten in `App`. `ItemList` bekommt sie als Prop `favorites` und meldet einen Klick auf «Favorit» mit dem Event `toggle-favorite`. `AppHeader` bekommt die Zahl als Prop `favoriteCount`.

:::solution[Lösung]
::code{file="exercises/07-state/where-state/solution/{lang}/src/App.vue"}

`ItemList` ändert nichts mehr selbst. Es zeigt die Favoriten aus der Prop und meldet jeden Klick mit `emit('toggle-favorite', item.id)`.
:::
::::

::::exercise[Vertiefung]
Lege `src/requests.js` an. Es exportiert die Anfragen als Ref `requests` mit einem Array und die Funktionen `add(item)` und `remove(id)`. Der Knopf «Anfragen» in der Liste ruft `add` auf, der Kopf zeigt die Zahl der Anfragen, und `RequestList` zeigt sie mit einem Knopf «Zurückziehen».

:::solution[Lösung]
::code{file="exercises/07-state/where-state/solution/{lang}/src/requests.js"}

Die Lösung enthält schon die Knobelei. Für die Vertiefung genügt `export const requests = ref([])` mit den beiden Funktionen. Die Komponenten importieren, was sie brauchen, `AppHeader` etwa nur `requests`.
:::
::::

::::exercise[Knobelei]
Andere Dateien sollen `requests` nur lesen können, ändern geht nur über `add` und `remove`. Ausserdem steht jedes Ding höchstens einmal in der Liste.

:::solution[Lösung]
::code{file="exercises/07-state/where-state/solution/{lang}/src/requests.js" lines="1-12"}

Das Modul behält das beschreibbare `list` für sich und exportiert nur die Ansicht von `readonly`. Ein Schreibversuch von aussen ändert nichts, und Vue warnt in der Konsole.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Zwei Komponenten zeigen verschiedene Favoriten. | Jede hält eine eigene Kopie. Den Zustand in die gemeinsame Elternkomponente heben. |
| Vue warnt, weil eine Kindkomponente ihre Prop ändert. | Das Kind meldet ein Event, und die Elternkomponente ändert ihren Zustand. |
| Viele Komponenten ändern den Zustand eines Moduls, und niemand weiss, wer was geändert hat. | Den Zustand mit `readonly` herausgeben und nur in Funktionen des Moduls ändern. |
| Der Filter liegt in einem globalen Zustand und fehlt in einem geteilten Link. | Was man teilen und neu laden will, gehört in die Adresse. |
| Ein KI-Assistent legt für jeden Wert einen Store an, auch für einen offenen Dialog. | Lokaler Zustand bleibt in der Komponente. Ein Store lohnt sich für Zustand, den viele Teile der App brauchen. |

## Selbstcheck

::::selfcheck
1. In welcher Reihenfolge fragt die Abbildung, und warum steht die Adresse zuerst?
2. Was ist Prop Drilling, und was hilft dagegen?
3. Warum gibt das Modul die Anfragen mit `readonly` heraus?
4. Warum ist der Katalog im Browser nur eine Kopie?

:::solution[Antworten]
1. Adresse, Server, eine Komponente, wenige Komponenten, sonst ein Store. Was jemand teilen oder neu laden will, muss in der Adresse stehen, egal wie viele Komponenten es brauchen.
2. Props wandern durch Komponenten, die sie nicht brauchen, nur um tiefer liegende Kinder zu erreichen. `provide` und `inject`, ein Modul oder ein Store helfen.
3. So ändert sich der Zustand nur in den Funktionen des Moduls, und ein Fehler lässt sich auf wenige Stellen eingrenzen.
4. Er gehört dem Server des Vereins. Andere Mitglieder und das Team ändern ihn, und die App sieht das erst beim nächsten Laden.
:::
::::

:::assignment
Die Zuordnung steht. Für Anmeldung und Anfragen will der Freiwillige aber mehr als ein Modul. «Ich möchte in den Entwicklertools sehen, was sich wann ändert, und den Zustand in Tests leicht vorbereiten können.» Das bietet Pinia, die Bibliothek für Stores, die das nächste Kapitel vorstellt.
:::
