---
title: README-Vorlage
description: Eine Vorlage für die Projektskizze und die Dokumentation im README mit den Teilen des Projektauftrags, der KI-Deklaration und einem Beispiel für einen Architekturentscheid.
sidebar:
  order: 2
---

Das README ist die Dokumentation deines Projekts, und die Projektskizze ist seine erste Fassung. Diese Vorlage enthält die Teile, die der [Projektauftrag](../assignment/) verlangt. Kopiere sie in die Datei `README.md` deines Repositorys und ersetze die Hinweise in den Klammern.

## Die Skizze

Für die Freigabe füllst du die Teile aus, die vor der ersten Zeile Code feststehen sollen, die Beschreibung mit der Zielgruppe, die User Stories, die Wireframes, den Komponentenbaum, die Routen, das Konzept für den Zustand, die Datenquelle und deine Wahl des Frameworks. Die übrigen Teile wachsen während der Umsetzung. Wireframes dürfen Skizzen von Hand sein, die du fotografierst und in einen Ordner `docs` legst.

## Die Vorlage

````md
# [Name des Projekts]

[Zwei bis drei Sätze, was die App tut und für wen.]

## Zielgruppe

[Wer die App benutzt, in welcher Lage und mit welchem Gerät.]

## User Stories

| Nr. | User Story | Akzeptanzkriterien | Stand |
|---|---|---|---|
| 1 | Als [Rolle] möchte ich [Ziel], damit [Nutzen]. | [prüfbare Kriterien] | [erfüllt, teilweise erfüllt oder offen, bei Abweichungen mit Begründung] |

## Wireframes

[Bilder der wichtigsten Ansichten, etwa ![Startseite](docs/wireframe-start.png)]

## Architektur

### Framework

[Welches Framework und warum.]

### Komponentenbaum

[Die Komponenten und wie sie verschachtelt sind, als Liste oder Bild.]

### Routen

| Pfad | Seite | Guard |
|---|---|---|
| `/` | [Seite] | [keiner oder welcher] |

### Zustand

[Welcher Zustand lokal, geteilt, global, in der Adresse oder auf dem Server liegt, und warum.]

### Daten

[Woher die Daten kommen, eine öffentliche API, ein eigenes Backend oder eine Attrappe im Browser, und wie sie fliessen.]

## Entscheide

[Die wichtigen Entscheide als kurze Architekturentscheide, hier oder als Dateien in `docs/adr` mit einem Verzeichnis.]

## Installation, Start, Tests und Deployment

```bash
npm install
npm run dev
npm test
npm run build
```

[Wo die App veröffentlicht ist und wie sie dorthin kommt. Umgebungsvariablen stehen in `.env.example`.]

## KI-Deklaration

| Werkzeug | Wofür | Betroffene Teile | Geprüft oder geändert |
|---|---|---|---|
| [Name] | [etwa Erklärungen, Code, Tests oder Texte] | [Dateien oder Funktionen] | [was du kontrolliert oder angepasst hast] |

## Reflexion

[Was gut ging, was schwierig war und was du beim nächsten Projekt anders machen würdest.]
````

## Ein Beispiel für einen Entscheid

Der Mindestumfang verlangt globalen Zustand für einen sinnvollen Bereich oder einen begründeten Verzicht darauf als Architekturentscheid. So könnte ein solcher Entscheid aussehen, im Aufbau von [Kapitel 8.3](../../architecture/architecture-decisions/).

```md
# 2. Kein globaler Zustand für die Trainingspläne

## Status

Angenommen

## Kontext

Die Trainingspläne erscheinen nur auf der Seite eines Teams. Andere Seiten brauchen sie nicht, und die Daten kommen bei jedem Besuch frisch von der API.

## Entscheid

Die Seite eines Teams lädt die Pläne selbst und hält sie in einem `ref`. Die Anmeldung, die mehrere Seiten brauchen, liegt in einem Store mit Pinia.

## Konsequenzen

Es gibt einen Store weniger, und die Pläne sind beim Öffnen der Seite immer aktuell. Braucht später eine zweite Seite die Pläne, gehören sie in einen Store, und dieser Entscheid wird ersetzt.
```

## Die KI-Deklaration

Für jedes Werkzeug steht in der Tabelle, wofür du es eingesetzt hast, welche Teile des Projekts betroffen sind und was du am Ergebnis geprüft oder geändert hast. Eine ehrliche Deklaration kostet keine Punkte. Halte Stellen fest, an denen ein Vorschlag falsch war, der Screencast fragt nach einer davon.
