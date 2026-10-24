---
title: Kompetenzraster für Teil 1
description: Was du nach Teil 1 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 1.
sidebar:
  label: Kompetenzraster
  order: 6
---

Mit diesem Raster schätzt du ein, ob du für Teil 2 bereit bist. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| Code mit `export` und `import` auf Module verteilen | Erkläre, warum `node main.mjs` vor der ersten Ausgabe abbricht, wenn in `catalog.mjs` ein `export` fehlt. | [Module und Pakete](../modules/) |
| ein Projekt mit `package.json` einrichten und Skripte starten | Füge einem Projekt ein Skript hinzu und starte es mit `npm run`. | [Module und Pakete](../modules/#npm-und-packagejson) |
| Versionsangaben lesen und den Zweck der Lock-Datei erklären | Erkläre den Unterschied zwischen `5.0.5` und `^5.0.5` und sag, ob `package-lock.json` ins Repo gehört. | [Module und Pakete](../modules/#versionen-und-die-lock-datei) |
| erklären, warum zwei Variablen dasselbe Objekt ändern können | Erkläre den Fehler mit den Zelten an der Skizze mit den zwei Variablen. | [Werte und Referenzen](../values-and-references/) |
| Objekte flach und tief kopieren | Sag, wann `{ ...item }` genügt und wann es `structuredClone` braucht. | [Werte und Referenzen](../values-and-references/#kopien) |
| Daten ändern, ohne das Original zu verändern | Schreib eine Funktion, die ein Ding in einer neuen Liste als ausgeliehen markiert. | [Werte und Referenzen](../values-and-references/#ändern-ohne-nebenwirkung) |
| Listen mit `map`, `filter`, `find` und `some` auswerten | Liste die Namen der Dinge auf, die mehr als CHF 40 Pfand kosten und da sind. | [Funktionen und Arrays](../functions-and-arrays/) |
| mit `reduce` zählen und Listen ohne Nebenwirkung sortieren | Zähle die ausgeliehenen Dinge pro Kategorie und sortiere ihre Namen mit `localeCompare`. | [Funktionen und Arrays](../functions-and-arrays/#reduce) |
| die Reihenfolge von Code mit Promises und Timern vorhersagen | Sag die Ausgabe des Beispiels zur Ereignisschleife voraus und begründe sie. | [Asynchrones JavaScript](../async/#die-ereignisschleife) |
| Daten mit `fetch` laden und Fehler verständlich melden | Erkläre, warum `fetch` bei Status 404 nicht ablehnt, und zeig, wie du den Fehler trotzdem bemerkst. | [Asynchrones JavaScript](../async/#fetch) |
| eine Anfrage nach einer Wartezeit abbrechen | Lade den Katalog mit einer Wartezeit von einer Sekunde vom Server, der mit `?delay=3000` antwortet. | [Asynchrones JavaScript](../async/#anfragen-abbrechen) |
| erklären, wie ein Proxy Änderungen bemerkt (Exkurs) | Erkläre, was `track` und `trigger` im kleinen reaktiven System tun. | [Proxy und Getter](../proxies/) |

Für Teil 2 brauchst du vor allem Module, Arrays und `fetch`. Die letzte Zeile gehört zum Exkurs und ist freiwillig.

## Die App nach Teil 1

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/01-javascript/de`. Es gibt noch keine Oberfläche, nur die Hilfsfunktionen für den Katalog, die Übersicht für den Tresen und den kleinen Server. Die Tests im Ordner `tests` prüfen die Wünsche aus allen vier Kapiteln.

```bash
npm install
npm test
```

Hast du in Teil 1 nicht alles geschafft, startest du Teil 2 mit diesem Stand.
