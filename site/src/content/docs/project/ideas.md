---
title: Projektideen
description: Richtungen für eine eigene Projektidee aus Vereinen, Schulen, Hobbys und kleinen Betrieben, was eine Idee tragfähig macht und warum nachgebaute Tutorial-Apps nicht freigegeben werden.
sidebar:
  order: 2
---

Die Idee für dein Projekt wählst du selbst. Am leichtesten fällt das, wenn du Leute kennst, die eine App brauchen könnten, und ihnen eine Frage stellen kannst. Diese Seite gibt Richtungen, keine fertigen Aufträge, und deine Lehrperson gibt die Idee mit der Skizze frei.

## Richtungen

Viele gute Ideen kommen aus einem Umfeld, das du kennst.

1. Ein Verein, etwa ein Sportclub mit Trainingsplänen, Anwesenheiten und Fahrgemeinschaften zu Spielen, oder eine Musikgruppe mit Proben, Liedern und Setlisten.
2. Eine Schule oder ein Lehrbetrieb, etwa eine Übersicht über Prüfungen mit Lernplänen oder eine Reservation von Räumen und Geräten.
3. Ein Hobby, etwa eine Sammlung mit Zustand und Wert der Stücke, ein Logbuch für Touren mit Strecken und Wetter oder ein Gartenkalender mit Saat und Ernte.
4. Ein kleiner Betrieb, etwa Bestellungen für einen Hofladen, Termine für ein Atelier oder Dienstpläne für ein Café.
5. Ein Quartier, etwa eine Tauschbörse für Saatgut, ein Kalender für Quartierfeste oder Kurse in einem Gemeinschaftszentrum.

Eine Ausleihe von Dingen wie im Fallbeispiel ist zu nahe an Lorraine Commons. Wähl ein anderes Thema oder eine Idee, die deutlich mehr kann.

## Eine Idee prüfen

Eine Idee trägt das Projekt, wenn sie den [Mindestumfang](../assignment/#mindestumfang) ohne Kunstgriffe erfüllt. Diese Fragen helfen beim Prüfen.

1. Kannst du fünf User Stories von Menschen aufschreiben, die es gibt oder geben könnte?
2. Hat die App mindestens vier Seiten, eine davon mit einem Parameter wie der Nummer eines Eintrags?
3. Haben die Daten Beziehungen, etwa Teams mit Trainings und Spielern, statt einer einzigen Liste?
4. Gibt es Zustand, den mehrere Seiten brauchen, oder einen guten Grund, darauf zu verzichten?
5. Gibt es ein Formular mit Regeln, die eine Prüfung verdienen?
6. Woher kommen die Daten, von einer öffentlichen API, einem eigenen Backend oder einer Attrappe im Browser?

## Daten für das Projekt

Für Daten kommt eine öffentliche API in Frage, etwa aus dem Portal [opendata.swiss](https://opendata.swiss/) mit offenen Daten von Bund, Kantonen und Gemeinden. Prüf vor der Wahl, ob die API ohne Schlüssel funktioniert oder ob ein Schlüssel nur auf einem Server liegen darf. Ein Schlüssel im Code des Browsers ist für alle lesbar, wie Kapitel 8.6 zeigt. Ohne passende API simulierst du die Daten mit einer Attrappe im Browser, wie die Demo der Fallbeispiel-App. Ein eigenes Backend bringt Bonuspunkte, ist aber keine Pflicht.

## Nachgebaute Tutorial-Apps

Eine App, die ein bekanntes Tutorial nachbaut, gibt deine Lehrperson nicht frei, etwa eine reine ToDo-Liste, ein Zähler oder eine Wetteranzeige ohne eigene Idee. Solche Apps zeigen nicht, dass du eine SPA selbst entwerfen kannst, und ihre Lösungen stehen hundertfach im Netz. Eine bekannte Art von App kann trotzdem passen, wenn sie für eine bestimmte Gruppe eigene Regeln, eigene Daten und eigene Seiten bekommt.
