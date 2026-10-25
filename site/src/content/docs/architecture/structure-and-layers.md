---
title: Projektstruktur und Schichten
description: Ordner nach Art oder nach Feature, die Schichten einer SPA von der App bis zur API, Abhängigkeiten in eine Richtung, gemeinsamer Code, eine Schnittstelle pro Feature und Regeln, die ein Test prüft.
sidebar:
  order: 1
---

:::assignment
Eine zweite Freiwillige hilft neu bei der App. Nach einer Woche schreibt sie Martina Hostettler, dass sie sich nicht zurechtfindet.

> Als neue Freiwillige möchte ich alles zu einer Funktion der App an einem Ort finden, damit ich die Anfragen ändern kann, ohne die ganze App zu kennen.

Der Freiwillige gibt ihr recht. Die Dateien der Anfragen liegen in vier Ordnern, und die Adressen der Kurs-API stehen verteilt in den Stores. Die Akzeptanzkriterien lauten:

1. Alles, was zu einem Feature gehört, liegt in einem Ordner.
2. Nur eine Schicht kennt die Adressen der API und ruft `fetch` auf.
3. Ein Test meldet, wenn jemand eine dieser Regeln bricht.
:::

:::goals
Nach diesem Kapitel kannst du

- Ordner nach Art und Ordner nach Feature vergleichen,
- die Schichten einer SPA benennen und ihre Abhängigkeiten in eine Richtung zeigen lassen,
- gemeinsamen Code von den Features trennen,
- einem Feature eine Schnittstelle geben,
- Regeln der Struktur mit einem Test prüfen.
:::

## Ordner nach Art

create-vue legt ein Projekt mit Ordnern nach der Art der Dateien an, `components`, `views` mit den Seiten, `router` und mit Pinia `stores`. In einer kleinen App findet man so jede Datei schnell. Mit jeder Funktion wächst aber jeder dieser Ordner, und was zusammengehört, liegt verteilt. In der Fallbeispiel-App nach Teil 7 liegt die Seite «Meine Anfragen» in `views`, das Formular in `components`, der Store in `stores` und die Regeln einer Anfrage in `src/reservation.js`.

## Ordner nach Feature

Ein Feature ist eine Funktion, die auch Mitglieder als Teil der App erkennen, etwa der Katalog, die Favoriten oder die Anfragen. Jedes Feature bekommt einen Ordner in `src/features` mit seinen Seiten, seinen eigenen Komponenten, seinem Store und seinen Routen. Wer an den Anfragen arbeitet, findet fast alles in `src/features/reservations`.

![Zwei Ordnerbäume nebeneinander. Links ist die App nach Art der Dateien geordnet, in views, components, stores und composables, und die vier Dateien der Anfragen liegen in vier verschiedenen Ordnern. Rechts hat jedes Feature einen Ordner unter features, catalog und reservations mit ihren Seiten, Komponenten, Stores und Routen. Die Dateien der Anfragen liegen dort beisammen. Gemeinsame Bausteine stehen in components, die Schicht für die API in api.](../../../assets/figures/de/p8c1-folders.svg)

Beide Ordnungen sind verbreitet, und für eine App mit wenigen Seiten reichen Ordner nach Art. Ordner nach Feature lohnen sich, sobald mehrere Leute an verschiedenen Funktionen arbeiten oder eine Funktion viele Dateien hat. Der Wechsel ist ein Entscheid, wie ihn Kapitel 8.3 festhält.

## Schichten

Neben den Ordnern hat eine SPA Schichten, die verschiedene Aufgaben übernehmen. Zuoberst setzen `main.js`, `App.vue` und der Router die App zusammen. Darunter liegen die Features mit Seiten, Komponenten und Stores. Sie verwenden gemeinsame Bausteine und die Schicht für die API, und nur diese Schicht spricht mit dem Server.

![Vier Ebenen von oben nach unten, die Pfeile zeigen, wer wen importiert. Zuoberst setzen main.js, App.vue und der Router die App zusammen und importieren die Features. Die Features enthalten Seiten, eigene Komponenten und Stores und importieren gemeinsame Bausteine und die Schicht für die API. Gemeinsame Bausteine in components, composables und utils kennen kein Feature. Nur die Schicht für die API in src/api spricht mit fetch mit dem Server. Kein Pfeil zeigt nach oben.](../../../assets/figures/de/p8c1-layers.svg)

Die Imports zeigen nur nach unten. Ein gemeinsamer Baustein wie die Karte eines Dings kennt kein Feature, und die Schicht für die API kennt weder Seiten noch Stores. So lässt sich jede untere Schicht ändern oder testen, ohne die oberen zu kennen.

## Die Schicht für die API

In der Fallbeispiel-App nach Teil 8 kennt nur `src/api/http.js` die Adressen und Methoden der Kurs-API. Die Stores rufen Funktionen wie `loadItems()` auf und wissen nicht, ob dahinter `GET /items` steht.

::code{file="case/08-architecture/{lang}/src/api/http.js" lines="30-40"}

Benennt die API eine Adresse um, ändert sich eine Zeile in dieser Datei, und kein Store merkt etwas davon. Wie die Stores an diese Schicht kommen, zeigt das nächste Kapitel.

## Gemeinsamer Code

Was nur ein Feature braucht, liegt im Ordner dieses Features. Sobald ein zweites Feature dasselbe braucht, wandert es zu den gemeinsamen Bausteinen. In der Fallbeispiel-App zeigen Katalog und Favoriten dieselbe Karte, darum liegt `ItemCard.vue` in `src/components`, das Composable `useLocalStorage` in `src/composables` und das Formatieren von Daten und Beträgen in `src/utils`. Kopf und Fuss der Seite gehören zum Rahmen der App und liegen in `src/layout`, denn sie lesen die Stores mehrerer Features.

## Eine Schnittstelle pro Feature

Jedes Feature legt in einer `index.js` fest, was andere davon verwenden dürfen. Die Seite eines Dings gehört zum Katalog und zeigt das Formular der Anfragen, darum gibt das Feature der Anfragen das Formular, seinen Store und den Schlüssel für Entwürfe frei.

::code{file="case/08-architecture/{lang}/src/features/reservations/index.js"}

Die Routen bringt jedes Feature in einer `routes.js` mit, und der Router setzt sie zusammen.

::code{file="case/08-architecture/{lang}/src/router/index.js" lines="20-31"}

Ändert sich im Innern eines Features eine Datei, betrifft das nur die anderen Dateien darin, solange die `index.js` gleich bleibt.

## Regeln prüfen

Eine Regel, die nur im Kopf der Beteiligten steht, bricht bei der ersten Änderung unter Zeitdruck. Ein Test liest darum die Quellen der Fallbeispiel-App und prüft die Regeln der Struktur.

::code{file="case/08-architecture/{lang}/tests/architecture.test.js" lines="24-34"}

Der Test braucht keinen Browser, er liest die Dateien mit `node:fs`. Bricht jemand eine Regel, nennt der Test die Datei.

## In deinem Projekt

Leg in deinem Projekt die Ordner fest, bevor die erste Seite entsteht, nach Art oder nach Feature, und halte den Entscheid im README fest. Lass von Anfang an nur eine Schicht mit dem Server sprechen, dann bleibt auch ein Wechsel auf eine andere Datenquelle klein.

## Im Code

Arbeite mit der Fallbeispiel-App nach Teil 8 im Kursrepo im Ordner `case/08-architecture/de`. Lies zuerst und schreib auf, was du erwartest, bevor du etwas änderst.

1. Zähle, in wie vielen Ordnern die Dateien der Anfragen jetzt liegen. Wo lagen sie in `case/07-state/de`?
2. Füg in `src/features/catalog/CatalogView.vue` einen Aufruf `fetch('/api/de/items')` ein und starte die Tests. Welcher Test meldet sich, und was nennt er?
3. Importiere in `src/features/catalog/ItemView.vue` den Store aus `@/features/reservations/reservationsStore.js` statt aus `@/features/reservations`. Was meldet der Test jetzt?
4. Die Kurs-API benennt `/reservations` in `/requests` um. Welche Dateien musst du ändern?

## Aufgaben

Die Aufgaben ordnen eine kleine App mit Katalog und Favoriten nach Features. Du findest das Projekt im Kursrepo im Ordner `exercises/08-architecture/structure/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Sortiere die Dateien nach Features. `CatalogView.vue` kommt nach `src/features/catalog`, `FavoritesView.vue` und der Store der Favoriten als `favoritesStore.js` nach `src/features/favorites`. `AppHeader.vue` und `ItemCard.vue` bleiben in `src/components`, die Ordner `src/views` und `src/stores` verschwinden. Pass die Imports im Router und im Kopf an.

:::solution[Lösung]
```text
src/
  components/AppHeader.vue, ItemCard.vue
  features/catalog/CatalogView.vue
  features/favorites/FavoritesView.vue, favoritesStore.js
  router/index.js
```

Die Lösung im Kursrepo enthält schon die Vertiefung und die Knobelei, ihr Router liest darum die Routen der Features.
:::
::::

::::exercise[Vertiefung]
Beide Seiten laden den Katalog selbst mit `fetch`. Leg die Schicht für die API in `src/api/items.js` mit der Funktion `fetchItems()` an und einen Store `useCatalogStore` in `src/features/catalog/catalogStore.js`, der den Katalog damit lädt, für beide Seiten nur einmal. Ausserhalb von `src/api` ruft niemand mehr `fetch` auf.

:::solution[Lösung]
::code{file="exercises/08-architecture/structure/solution/{lang}/src/api/items.js"}

::code{file="exercises/08-architecture/structure/solution/{lang}/src/features/catalog/catalogStore.js"}

Die Action `load` kehrt sofort zurück, wenn der Katalog schon lädt oder da ist. Die Seite der Favoriten ruft sie trotzdem auf, für den Fall, dass jemand sie direkt öffnet.
:::
::::

::::exercise[Knobelei]
Gib beiden Features eine `index.js`, über die andere ihren Store bekommen, und eine `routes.js` mit ihren Routen. Der Router setzt die Routen zusammen, und kein Feature greift tiefer in ein anderes.

:::solution[Lösung]
::code{file="exercises/08-architecture/structure/solution/{lang}/src/features/catalog/index.js"}

::code{file="exercises/08-architecture/structure/solution/{lang}/src/router/index.js"}

Die Seite der Favoriten holt den Katalog über `@/features/catalog`, der Kopf die Favoriten über `@/features/favorites`. Innerhalb eines Features importieren die Dateien einander direkt mit `./`.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine Datei passt zu keinem Feature und landet in einem Ordner für Verschiedenes. | Gehört sie zu genau einem Feature, kommt sie dorthin. Brauchen sie mehrere, gehört sie zu den gemeinsamen Bausteinen. |
| Zwei Features greifen tief in die Dateien des anderen. | Über die `index.js` gehen und prüfen, ob ein Teil zu den gemeinsamen Bausteinen gehört. |
| Eine Komponente in `src/components` liest einen Store. | Sie bekommt die Daten als Props, und die Seite des Features kennt den Store. |
| Nach dem Verschieben brechen Imports in vielen Dateien. | Mit dem Alias `@` importieren und andere Features nur über ihre `index.js`. |
| Ein KI-Assistent legt jede neue Datei in `src/components`. | Beschreib ihm, wie das Projekt geordnet ist, und prüf, wohin die Datei gehört. |

## Selbstcheck

::::selfcheck
1. Worin unterscheiden sich Ordner nach Art und Ordner nach Feature?
2. Welche Schichten hat die Fallbeispiel-App, und in welche Richtung zeigen ihre Imports?
3. Wozu dient die `index.js` eines Features?
4. Warum prüft ein Test die Regeln der Struktur?

:::solution[Antworten]
1. Nach Art liegen gleiche Arten von Dateien zusammen, etwa alle Seiten. Nach Feature liegt alles zusammen, was zu einer Funktion gehört.
2. App und Router, Features, gemeinsame Bausteine und die Schicht für die API. Die Imports zeigen nur nach unten.
3. Sie legt fest, was andere Features verwenden dürfen. Was nicht darin steht, darf sich ändern, ohne dass andere es merken.
4. Eine Regel, die nur jemand im Kopf hat, bricht leicht. Der Test meldet jede Verletzung mit der Datei.
:::
::::

:::assignment
Die neue Freiwillige findet sich jetzt zurecht. Martina Hostettler will die App an der Mitgliederversammlung zeigen, und dort läuft keine Kurs-API. Der Freiwillige möchte ausserdem nach Verfügbarkeit sortieren, und die neue Freiwillige fragt, warum die Karte eines Dings keinen Store kennt. Die Antworten kommen aus dem nächsten Kapitel über Entwurfsmuster.
:::
