---
title: Projektauftrag
description: Eine eigene Single Page Application mit Mindestumfang, Ablauf, Dokumentation, Screencast und Bewertungsraster.
sidebar:
  order: 1
---

Im zweiten Teil des Moduls baust du eine eigene Single Page Application. Die Idee wählst du selbst und das Framework auch. Das Projekt zählt 60 Prozent der Modulnote.

## Rahmen

Das Projekt ist eine Einzelarbeit. Zu zweit könnt ihr nach Absprache mit eurer Lehrperson arbeiten, dann muss das Projekt grösser sein. Du darfst Vue, React, Angular, Svelte oder ein anderes Framework verwenden, solange eine SPA mit clientseitigem Routing entsteht. Bewertet wird das Frontend. Ein eigenes Backend bringt Bonuspunkte, ist aber keine Pflicht. Daten darfst du auch von einer öffentlichen API holen oder mit einem Mock im Browser simulieren.

KI-Werkzeuge sind erlaubt, auch beim Programmieren. Du hältst im README fest, wofür du sie eingesetzt hast, und im Screencast zeigst du, dass du deinen Code verstehst. Bewertet wird deshalb vor allem, was du an deinem eigenen Projekt zeigen und erklären kannst.

Die Idee muss eigenständig sein. Eine nachgebaute Tutorial-App wie eine reine ToDo-Liste gibt deine Lehrperson nicht frei.

## Mindestumfang

| Anforderung | Einzelarbeit | Zweierteam |
|---|---|---|
| User Stories mit Akzeptanzkriterien | 5 | 8 |
| Routen, davon eine dynamische, dazu eine Seite für unbekannte Adressen und ein Guard | 4 | 6 |
| eigene Komponenten, davon zwei mehrfach verwendet, mit Props und Events und mindestens einmal Slots oder Vergleichbarem | 6 | 10 |
| globaler Zustand für einen sinnvollen Bereich oder ein begründeter Verzicht als Architekturentscheid | ja | ja |
| Daten von einer API mit Lade-, Fehler- und Leerzustand | ja | ja |
| Formulare mit Validierung | 1 | 2 |
| automatisierte Tests | 3 | 6 |
| Darstellung auf Handy und Desktop, Grundregeln der Barrierefreiheit, öffentliches Deployment, README | ja | ja |
| erweiterte Anforderung, zum Beispiel Rollen, Offline-Betrieb, End-to-End-Tests oder mehrere Sprachen | | 1 |

## Ablauf

1. Du schreibst die Projektskizze als erste Fassung deines README. Sie beschreibt Idee und Zielgruppe, die User Stories mit Akzeptanzkriterien, Wireframes der wichtigsten Ansichten, den Komponentenbaum, die Routen, das Konzept für den Zustand, die Datenquelle und deine Wahl des Frameworks mit Begründung.
2. Deine Lehrperson gibt die Skizze frei oder verlangt Anpassungen. Die Skizze hat keine eigenen Punkte, ohne Freigabe beginnt die Umsetzung aber nicht.
3. Du setzt das Projekt um und committest regelmässig. Das README wächst mit, und du hältst wichtige Entscheide fest, sobald du sie triffst.
4. Du gibst ab, was die Lehrperson zu den genannten Terminen verlangt. Dazu gehören der Code mit dem Tag `v1.0`, das README, der Link zum veröffentlichten Produkt und der Screencast.

Termine, Abgabekanal und die Regeln bei Verspätungen nennt dir deine Lehrperson.

## Dokumentation

Das README ist die Dokumentation deines Projekts. Es enthält diese Teile:

1. eine kurze Beschreibung des Projekts und seiner Zielgruppe
2. die User Stories mit Akzeptanzkriterien und ihrem Stand, erfüllt, teilweise erfüllt oder offen, mit einer Begründung bei Abweichungen
3. die Architektur mit Komponentenbaum, Routen, Konzept für den Zustand und Datenfluss
4. wichtige Entscheide als kurze Architekturentscheide, jeweils mit Kontext, Entscheid und Folgen
5. die Anleitung für Installation, Start, Tests und Deployment, mit einer Datei `.env.example`, falls die App Umgebungsvariablen braucht
6. die KI-Deklaration
7. eine kurze Reflexion über das, was gut ging, was schwierig war und was du beim nächsten Projekt anders machen würdest

In der KI-Deklaration steht für jedes Werkzeug, wofür du es eingesetzt hast, welche Teile des Projekts betroffen sind und was du am Ergebnis geprüft oder geändert hast. Eine ehrliche Deklaration kostet keine Punkte.

## Screencast

Der Screencast dauert höchstens zehn Minuten, was darüber hinausgeht, wird nicht bewertet. Ton ist Pflicht, die Kamera freiwillig. Du darfst schneiden, der Code muss aber gut lesbar sein. Lade den Screencast nur über den Kanal hoch, den deine Lehrperson nennt, nie auf eine öffentliche Plattform.

Der Ablauf ist für alle gleich.

1. Produkt, etwa zwei Minuten. Du spielst eine wichtige User Story im veröffentlichten Produkt durch.
2. Weg durch den Code, etwa drei Minuten. Du verfolgst dieselbe User Story im Code, vom Klick in der Komponente über Props, Events, Store oder Composables bis zur API und zurück in die Anzeige.
3. Die drei Fragen, etwa vier Minuten.
4. Eine Stelle, an der ein Vorschlag einer KI falsch oder schwächer war als deine Lösung, und wie du das gemerkt hast, etwa eine Minute.

Die drei Fragen lauten:

1. Zeig den Fehler, der dich am längsten aufgehalten hat. Wo lag er, wie hast du ihn gefunden, und mit welchem Commit hast du ihn behoben?
2. Zeig eine Entscheidung, bei der du zwischen zwei Lösungen gewählt hast, zum Beispiel Store oder lokaler Zustand. Was wäre mit der anderen Lösung anders, und wo im Code sähe man das?
3. Lass deine App einen Fehler der API erleben, etwa indem du die Anfrage in den DevTools des Browsers blockierst. Zeig, was die Benutzerinnen und Benutzer dann sehen und welcher Code dafür sorgt.

Antworten zählen nur, wenn sie sich auf deinen Code beziehen und du die Stellen zeigst. Allgemeine Erklärungen, die zu jedem Projekt passen würden, geben keine Punkte.

## Bewertung

| Bereich | Punkte |
|---|---:|
| Screencast | 35 |
| Code | 25 |
| Produkt | 25 |
| Dokumentation | 15 |
| Bonus | bis 10 |

Die Note berechnet sich linear aus den Punkten, Note = Punkte / 100 × 5 + 1. Mit dem Bonus kannst du fehlende Punkte ausgleichen, höher als 6 wird die Note nicht.

| Bereich | Kriterium | Punkte | Voll erfüllt, wenn |
|---|---|---:|---|
| Screencast | Produkt | 5 | die User Story läuft vollständig und verständlich im veröffentlichten Produkt |
| Screencast | Weg durch den Code | 10 | jeder Schritt vom Klick bis zur Anzeige an der richtigen Stelle im Code gezeigt und richtig erklärt ist |
| Screencast | drei Fragen | 15 | jede Frage mit Bezug zum eigenen Code und mit den passenden Stellen beantwortet ist, je 5 Punkte |
| Screencast | KI-Stelle | 5 | die Stelle konkret ist und klar wird, wie der Fehler aufgefallen ist |
| Code | Komponenten | 5 | die Komponenten sinnvoll geschnitten sind und über Props, Events und Slots zusammenarbeiten |
| Code | Routing | 5 | alle Routen funktionieren, auch beim direkten Aufruf einer Adresse, mit dynamischer Route, Seite für unbekannte Adressen und Guard |
| Code | Zustand und Daten | 5 | lokaler und globaler Zustand sinnvoll getrennt sind und Lade-, Fehler- und Leerzustände sauber behandelt werden |
| Code | Qualität und Tests | 5 | ein Linter eingerichtet ist, Namen und Struktur verständlich sind, die Tests laufen und kein Secret im Code steht |
| Code | Git-Verlauf | 5 | regelmässig über die ganze Projektdauer committet wurde, mit Nachrichten, die sagen, was sich geändert hat |
| Produkt | Funktionalität | 15 | alle User Stories ihre Akzeptanzkriterien erfüllen |
| Produkt | Oberfläche | 5 | die App auf Handy und Desktop gut bedienbar ist und die Grundregeln der Barrierefreiheit einhält |
| Produkt | Betrieb | 5 | die veröffentlichte App läuft und sich nach dem README ohne Rückfragen lokal starten lässt |
| Dokumentation | Beschreibung und User Stories | 4 | jede User Story mit ihrem Stand aufgeführt und jede Abweichung begründet ist |
| Dokumentation | Architektur und Entscheide | 5 | Komponentenbaum, Routen, Zustand und Datenfluss beschrieben und die wichtigen Entscheide festgehalten sind |
| Dokumentation | KI-Deklaration | 3 | für jedes Werkzeug Zweck, betroffene Teile und eigene Prüfung genannt sind |
| Dokumentation | Reflexion | 3 | die Reflexion konkrete Erfahrungen aus dem Projekt nennt |

Bonuspunkte gibt es für ein eigenes Backend (4), eine Authentifizierung (2), eine CI/CD-Pipeline (1), End-to-End-Tests (1), durchgehend TypeScript (1) und eine PWA mit Offline-Betrieb (1).

## Im Zweierteam

Ihr gebt Dokumentation, Code und Produkt gemeinsam ab, und die Punkte dafür gelten für beide. Im README steht, wer für welche User Stories verantwortlich ist. Ihr nehmt einen gemeinsamen Screencast von 15 bis 20 Minuten auf, in dem beide etwa gleich lang sprechen. Jede Person beantwortet die drei Fragen aus ihrer eigenen Arbeit, und die Punkte für den Screencast bekommt jede Person für ihren eigenen Teil.
