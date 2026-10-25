---
title: Kompetenzraster für Teil 6
description: Was du nach Teil 6 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 6.
sidebar:
  label: Kompetenzraster
  order: 6
---

Mit diesem Raster schätzt du ein, ob du für Teil 7 bereit bist. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| eine App mit Vue Router einrichten | Richte in einem neuen Projekt zwei Routen ein und zeig sie mit `RouterView`. | [Vue Router](../vue-router/#routen-statt-raute) |
| Seiten mit `RouterLink` verlinken und aktive Links gestalten | Hebe in einer Navigation den Link zur aktuellen Seite mit dem Selektor für `aria-current` hervor. | [Vue Router](../vue-router/#links-und-aktive-links) |
| Routen benennen und mit Namen verlinken | Ändere den Pfad einer benannten Route, ohne einen Link anzupassen. | [Vue Router](../vue-router/#benannte-routen) |
| History- und Hash-Modus unterscheiden | Erkläre, warum nach dem Neuladen von `/favorites` ein Server mit 404 antworten kann und was dagegen hilft. | [Vue Router](../vue-router/#history-und-hash) |
| Routen mit Parametern festlegen | Leg eine Route für ein Ding mit seiner Nummer an und verlinke sie mit dem Namen. | [Parameter und Query](../params-and-query/#routen-mit-parametern) |
| Parameter als Props übergeben | Gib einer Komponente die Nummer aus der Adresse als Zahl. | [Parameter und Query](../params-and-query/#parameter-als-props) |
| auf neue Parameter in derselben Komponente reagieren | Erkläre, warum `setup` beim Wechsel von `/items/1` zu `/items/2` nicht noch einmal läuft. | [Parameter und Query](../params-and-query/#dieselbe-komponente-neue-parameter) |
| die Query lesen und schreiben | Bind ein Suchfeld an `q` in der Query, ohne dass jeder Buchstabe einen Eintrag in der History anlegt. | [Parameter und Query](../params-and-query/#die-query) |
| im Code navigieren | Führ nach dem Senden eines Formulars mit `router.push` zur Seite eines Dings. | [Parameter und Query](../params-and-query/#navigieren-im-code) |
| Kindrouten und Layouts bauen | Bau einen Bereich mit zwei Kindseiten und einer gemeinsamen Überschrift. | [Verschachtelte Routen und Layouts](../nested-routes/#kindrouten) |
| aktive und genau aktive Links unterscheiden | Erkläre, warum der Link zur Startseite eines Bereichs auf allen seinen Seiten aktiv ist. | [Verschachtelte Routen und Layouts](../nested-routes/#aktive-und-genau-aktive-links) |
| benannte Views einsetzen | Zeig neben einer Seite eine zweite Komponente in einer benannten `RouterView`. | [Verschachtelte Routen und Layouts](../nested-routes/#benannte-views) |
| einen globalen Guard mit `meta` schreiben | Schick alle ohne Anmeldung von markierten Routen auf die Anmeldung. | [Navigation Guards](../navigation-guards/#globale-guards-mit-beforeeach) |
| nach der Anmeldung sicher zum Ziel zurückführen | Erkläre, warum die Anmeldung das Ziel aus der Adresse prüft. | [Navigation Guards](../navigation-guards/#zurück-zum-ziel) |
| vor dem Verlassen einer Seite warnen | Frag vor dem Verlassen eines halb ausgefüllten Formulars nach. | [Navigation Guards](../navigation-guards/#warnen-vor-dem-verlassen) |
| die Grenzen eines Guards benennen | Erkläre, warum ein Guard im Browser keine Daten schützt. | [Navigation Guards](../navigation-guards/#die-anmeldung-als-platzhalter) |
| eine Seite für unbekannte Adressen anlegen | Leg eine Route an, die jede unbekannte Adresse fängt, auch über mehrere Abschnitte. | [Lazy Loading und 404](../lazy-loading-and-404/#eine-seite-für-unbekannte-adressen) |
| Routen bei Bedarf laden | Lade eine Seite erst beim ersten Besuch und zeig die eigene Datei im Build. | [Lazy Loading und 404](../lazy-loading-and-404/#routen-bei-bedarf-laden) |
| Titel und Fokus nach einer Navigation setzen | Setz nach jedem Wechsel den Titel des Tabs und den Fokus auf die Überschrift. | [Lazy Loading und 404](../lazy-loading-and-404/#titel-und-fokus-nach-der-navigation) |

Für Teil 7 brauchst du vor allem `provide` und `inject`, Composables und asynchrones JavaScript aus Teil 1, denn dort kommen die Daten vom Server und der gemeinsame Zustand in einen Store.

## Die App nach Teil 6

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/06-routing/de`. Vue Router zeigt die Seiten für Katalog, Dinge, Favoriten und Verein, und Suche, Kategorie und Sortierung stehen in der Adresse. Das Team am Tresen meldet sich mit der Mitgliedernummer an und erfasst in seinem eigenen Bereich Rückgaben, der erst bei Bedarf lädt. Unbekannte Adressen bekommen eine eigene Seite, und nach jedem Wechsel stimmen Titel und Fokus. Die Tests im Ordner `tests` prüfen die Wünsche aus diesem Teil.

```bash
npm install
npm test
```

Für die App startest du wie bisher den kleinen Server in einem Terminal und Vite in einem zweiten. Den Katalog holt die App jetzt unter `/api/items`.

```bash
npm run server
npm run dev
```

Hast du in Teil 6 nicht alles geschafft, startest du Teil 7 mit diesem Stand.
