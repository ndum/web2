---
title: Kompetenzraster für Teil 8
description: Was du nach Teil 8 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 8.
sidebar:
  label: Kompetenzraster
  order: 8
---

Mit diesem Raster schätzt du ein, ob du die Kapitel von Teil 8 in deinem Projekt anwenden kannst. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| eine App nach Features ordnen | Ordne eine App mit Katalog und Favoriten nach Features und begründe, wohin die Karte eines Dings gehört. | [Projektstruktur und Schichten](../structure-and-layers/#ordner-nach-feature) |
| die Schichten einer SPA benennen | Zeichne die Schichten der Fallbeispiel-App und die Richtung ihrer Imports. | [Projektstruktur und Schichten](../structure-and-layers/#schichten) |
| Regeln der Struktur mit einem Test prüfen | Schreib einen Test, der `fetch` ausserhalb von `src/api` meldet. | [Projektstruktur und Schichten](../structure-and-layers/#regeln-prüfen) |
| Darstellung und Container trennen | Mach eine Karte unabhängig von jedem Store. | [Entwurfsmuster in SPAs](../design-patterns/#darstellung-und-container) |
| Abhängigkeiten mit `provide` und `inject` übergeben | Gib einem Store die API über `inject` und ersetze sie in einem Test. | [Entwurfsmuster in SPAs](../design-patterns/#abhängigkeiten-mit-provide-und-inject) |
| einen Adapter und Strategien schreiben | Übersetze ein fremdes Format mit einem Adapter und sortiere mit einer Tabelle von Strategien. | [Entwurfsmuster in SPAs](../design-patterns/#ein-adapter-für-die-api) |
| einen Architekturentscheid festhalten | Schreib ein ADR mit Status, Kontext, Entscheid und Konsequenzen. | [Architekturentscheide festhalten](../architecture-decisions/#der-aufbau) |
| einen Entscheid ersetzen | Ersetze ein ADR durch ein neues, ohne das alte zu löschen. | [Architekturentscheide festhalten](../architecture-decisions/#ein-entscheid-ersetzt-einen-anderen) |
| Komponenten über ihr Verhalten testen | Teste ein Formular über Eingaben, Meldungen und Events. | [Testen](../testing/#eine-komponente-testen) |
| Stores mit ersetztem `fetch` testen | Teste einen Store, der eine Anfrage sendet, ohne Server. | [Testen](../testing/#einen-store-testen-und-fetch-ersetzen) |
| meine Tests mit Mutanten prüfen | Erkläre, was ein Mutant, der alle Tests besteht, über deine Tests sagt. | [Testen](../testing/#tests-prüfen-mit-mutanten) |
| Bedienelemente benennen und beschriften | Gib einem Knopf, der nur ein Zeichen zeigt, einen Namen. | [Barrierefreiheit](../accessibility/#namen-für-knöpfe-und-links) |
| den Fokus nach einer Änderung setzen | Setz den Fokus nach dem Entfernen eines Eintrags auf den nächsten. | [Barrierefreiheit](../accessibility/#der-fokus-nach-einer-änderung) |
| Statusmeldungen ausgeben | Melde die Zahl der Treffer in einer Live-Region. | [Barrierefreiheit](../accessibility/#statusmeldungen) |
| eine SPA für GitHub Pages bauen | Setz Basispfad und `404.html` für eine Projektseite. | [Build und Deployment](../build-and-deployment/#eine-rückfallseite-für-github-pages) |
| Umgebungsvariablen und Modi einsetzen | Erkläre, welche Dateien `vite build --mode demo` liest und was davon in den Browser gelangt. | [Build und Deployment](../build-and-deployment/#umgebungsvariablen-und-modi) |
| einen Workflow schreiben, der testet, baut und veröffentlicht | Schreib einen Workflow für GitHub Pages, der bei einem gescheiterten Test nichts veröffentlicht. | [Build und Deployment](../build-and-deployment/#ein-workflow-von-github-actions) |
| Muster aus Vue 2 erkennen und übersetzen | Übersetze einen Filter und `this` in `<script setup>` nach Vue 3. | [KI-generierten Code prüfen](../reviewing-ai-code/#muster-aus-vue-2) |
| verlorene Reaktivität und geänderte Props beheben | Finde in vorgeschlagenem Code einen direkt zerlegten Store und eine geänderte Prop. | [KI-generierten Code prüfen](../reviewing-ai-code/#verlorene-reaktivität) |
| vorgeschlagenen Code mit einer Checkliste prüfen | Prüf ein Stück Vue-Code mit der Checkliste und nenne zu jedem Fund die Quelle. | [KI-generierten Code prüfen](../reviewing-ai-code/#eine-checkliste) |

Diese Zeilen beschreiben, was dein Projekt zeigen soll. Du entwirfst eine eigene SPA, dokumentierst, testest, machst sie barrierefrei und veröffentlichst sie, und du setzt KI-Werkzeuge verantwortungsvoll ein. Die Prüfung fragt Teil 8 nicht ab.

## Die App nach Teil 8

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/08-architecture/de`. Die Dateien liegen nach Features geordnet, nur `src/api` spricht mit dem Server, und die Stores bekommen die API von `main.js`. Die Entscheide stehen in `docs/adr`. Die App lässt sich mit der Tastatur und einem Screenreader bedienen, und die [Demo](../../demo/de/) läuft ohne Server auf der Kursseite. Die Tests im Ordner `tests` prüfen die Wünsche aus allen Teilen, dazu die Regeln der Struktur und die Barrierefreiheit.

```bash
npm install
npm test
npm run demo
```
