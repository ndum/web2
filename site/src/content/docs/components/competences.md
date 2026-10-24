---
title: Kompetenzraster für Teil 4
description: Was du nach Teil 4 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 4.
sidebar:
  label: Kompetenzraster
  order: 6
---

Mit diesem Raster schätzt du ein, ob du für Teil 5 bereit bist. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| eine Oberfläche in einen Baum von Komponenten zerlegen | Zeichne den Baum für die Seite eines Dings und nenne für jede Komponente ihre Aufgabe in einem Satz. | [Oberfläche zerlegen](../breaking-down/#der-baum-der-komponenten) |
| Komponenten passend benennen und ablegen | Erkläre, warum eine Komponente nicht `Card` heissen soll und in welchen Ordner `CatalogView.vue` gehört. | [Oberfläche zerlegen](../breaking-down/#namen-und-dateien) |
| entscheiden, welche Komponente einen Zustand besitzt | Begründe, warum die Favoriten zu `App` gehören und nicht zu den Karten. | [Oberfläche zerlegen](../breaking-down/#der-ort-für-den-zustand) |
| Props deklarieren und übergeben | Gib einer Karte eine Pflicht-Prop `deposit` vom Typ `Number` und übergib sie richtig. | [Props](../props/) |
| Events auslösen und prüfen | Lass eine Karte beim Klick `reserve` mit der id auslösen und prüf die id in der Objektschreibweise. | [Events und v-model](../events-and-v-model/#events-prüfen) |
| `v-model` auf eigenen Komponenten umsetzen | Bau ein Suchfeld mit `defineModel` und binde es in der Elternkomponente mit `v-model`. | [Events und v-model](../events-and-v-model/#v-model-auf-eigenen-komponenten) |
| Inhalte mit Slots übergeben | Bau eine Komponente mit einem Slot, die ohne Inhalt einen Ersatztext zeigt. | [Slots](../slots/#inhalte-übergeben) |
| benannte und Scoped Slots verwenden | Lass eine Liste ihre Einträge über einen Scoped Slot von der Elternkomponente gestalten. | [Slots](../slots/#scoped-slots) |
| einen zugänglichen Dialog bauen | Nenne die Attribute, an denen ein Screenreader einen Dialog und seinen Titel erkennt. | [Slots](../slots/#ein-dialog-mit-slots) |
| Werte mit `provide` und `inject` durch den Baum geben | Stell in `App` einen Wert bereit und hol ihn drei Ebenen tiefer, ohne Props dazwischen. | [Provide und Inject](../provide-and-inject/#provide-und-inject) |
| Komponenten nach den Regeln für den Entwurf bauen | Ordne fünf Komponenten der App den Präsentations- und den Containerkomponenten zu. | [Provide und Inject](../provide-and-inject/#regeln-für-komponenten) |
| Inhalte mit `Teleport` verschieben | Erkläre, warum ein Dialog in einer Karte mit `overflow: hidden` abgeschnitten wird und was `Teleport` daran ändert. | [Provide und Inject](../provide-and-inject/#teleport) |

Für Teil 5 brauchst du vor allem `ref`, `computed`, Props und Events, denn dort geht es darum, wie Vue Änderungen bemerkt.

## Die App nach Teil 4

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/04-components/de`. Die App aus Teil 3 ist in Komponenten zerlegt, die Seiten liegen in `src/views` und die Bausteine in `src/components`. Die Karten haben Knöpfe zum Reservieren und für Favoriten, ein Dialog fragt vor dem Erfassen einer Anfrage nach, und das Testmitglied steht im Kopf und im Formular. Die Tests im Ordner `tests` prüfen die Wünsche aus diesem Teil.

```bash
npm install
npm test
```

Für die App startest du wie bisher den kleinen Server in einem Terminal und Vite in einem zweiten.

```bash
npm run server
npm run dev
```

Hast du in Teil 4 nicht alles geschafft, startest du Teil 5 mit diesem Stand.
