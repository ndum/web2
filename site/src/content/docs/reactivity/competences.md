---
title: Kompetenzraster für Teil 5
description: Was du nach Teil 5 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 5.
sidebar:
  label: Kompetenzraster
  order: 5
---

Mit diesem Raster schätzt du ein, ob du für Teil 6 bereit bist. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| erklären, wie Vue Abhängigkeiten verfolgt | Erkläre an einem berechneten Wert, was `track` und `trigger` tun. | [Reaktivität im Detail](../in-detail/#effekte-und-abhängigkeiten) |
| die Abhängigkeiten einer Komponente sichtbar machen | Lass eine Komponente mit `onRenderTriggered` melden, welche Änderung sie neu rendern lässt. | [Reaktivität im Detail](../in-detail/#abhängigkeiten-sichtbar-machen) |
| Fehler durch kopierte Werte finden | Finde den Fehler in `const total = props.items.length` und behebe ihn. | [Reaktivität im Detail](../in-detail/#kopierte-werte) |
| ein reaktives Objekt zurücksetzen, ohne die Verbindung zu verlieren | Setze ein Objekt aus `reactive` mit drei Feldern in einer Zeile zurück. | [Reaktivität im Detail](../in-detail/#ersetzte-objekte) |
| `toRef` und `toRefs` einsetzen | Zerlege ein reaktives Objekt so, dass die Variablen ihm weiter folgen. | [Reaktivität im Detail](../in-detail/#einzelne-felder-mit-toref-und-torefs) |
| `shallowRef` und `triggerRef` einsetzen | Erkläre, warum `push` auf ein Array in einem `shallowRef` die Seite nicht ändert, und nenne zwei Abhilfen. | [Reaktivität im Detail](../in-detail/#grosse-daten-mit-shallowref) |
| mit `nextTick` auf das DOM warten | Erkläre, warum ein Element direkt nach einer Änderung noch den alten Text zeigt. | [Reaktivität im Detail](../in-detail/#warten-auf-das-dom-mit-nexttick) |
| Nebeneffekte mit `watch` umsetzen | Speichere die gewählte Kategorie bei jeder Änderung im Speicher des Browsers. | [Watcher](../watchers/#nebeneffekte) |
| Quellen und Optionen von `watch` wählen | Beobachte ein einzelnes Feld eines reaktiven Objekts und lass den Watcher gleich beim Start laufen. | [Watcher](../watchers/#quellen) |
| mit `onWatcherCleanup` aufräumen | Bau eine Suche, die erst nach einer Pause von 300 Millisekunden filtert. | [Watcher](../watchers/#aufräumen-mit-onwatchercleanup) |
| zwischen `computed`, `watch` und `watchEffect` wählen | Ordne die Zahl der Treffer, den Titel des Tabs und den Klick auf «Reservieren» dem passenden Werkzeug zu. | [Watcher](../watchers/#die-wahl-zwischen-computed-und-watch) |
| die Hooks des Lebenszyklus einsetzen | Nenne die Reihenfolge der Hooks und den Hook, in dem ein Timer startet. | [Lebenszyklus und Template-Refs](../lifecycle/#der-lebenszyklus) |
| Elemente mit `useTemplateRef` ansprechen | Setz den Fokus auf ein Feld, sobald seine Komponente erscheint. | [Lebenszyklus und Template-Refs](../lifecycle/#template-refs-mit-usetemplateref) |
| Listener und Timer aufräumen | Bau eine Uhr, die nach dem Entfernen keine Meldungen mehr schreibt. | [Lebenszyklus und Template-Refs](../lifecycle/#listener-und-timer) |
| den Fokus in einem Dialog führen | Nenne die Regeln für den Fokus beim Öffnen und beim Schliessen eines Dialogs. | [Lebenszyklus und Template-Refs](../lifecycle/#fokus-in-einem-dialog) |
| Logik mit Zustand in ein Composable auslagern | Lagere einen Zähler, den sich der Browser merkt, in ein Composable aus. | [Composables](../composables/#logik-mit-zustand-auslagern) |
| die Regeln für Composables anwenden | Erkläre, warum `useSearch` ein Objekt mit Refs zurückgibt und kein `reactive`. | [Composables](../composables/#regeln-für-composables) |
| Argumente mit `toValue` annehmen | Lass ein Composable einen Suchtext als Ref, als Funktion oder als Text annehmen. | [Composables](../composables/#flexible-argumente-mit-tovalue) |

Für Teil 6 brauchst du vor allem Komponenten mit Props und Events, dazu `watch` und die Hooks des Lebenszyklus. Der Router zeigt die Seiten der App als Komponenten an, und die Seiten reagieren auf Teile der Adresse.

## Die App nach Teil 5

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/05-reactivity/de`. Die App merkt sich Suchtext, Kategorie und Favoriten mit den Composables in `src/composables`, und die Liste folgt dem Suchfeld nach einer kurzen Pause. Im Katalog steht der Fokus gleich im Suchfeld. Der Dialog schliesst mit Escape und führt den Fokus hinein und wieder hinaus. Den Listener für die Adresse meldet `App` jetzt in `onMounted` an und in `onUnmounted` wieder ab. Die Tests im Ordner `tests` prüfen die Wünsche aus diesem Teil.

```bash
npm install
npm test
```

Für die App startest du wie bisher den kleinen Server in einem Terminal und Vite in einem zweiten.

```bash
npm run server
npm run dev
```

Hast du in Teil 5 nicht alles geschafft, startest du Teil 6 mit diesem Stand.
