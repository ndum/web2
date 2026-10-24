---
title: Kompetenzraster für Teil 2
description: Was du nach Teil 2 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 2.
sidebar:
  label: Kompetenzraster
  order: 4
---

Mit diesem Raster schätzt du ein, ob du für Teil 3 bereit bist. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| erklären, wie eine mehrseitige Website und eine SPA Seiten laden | Zeichne die Anfragen beider Bauweisen für drei Klicks auf. | [Webseiten und Webapps](../web-pages-and-web-apps/) |
| serverseitiges Rendern und statisch erzeugte Seiten einordnen | Erkläre, wann die Seiten dieser Kurs-Site entstehen. | [Webseiten und Webapps](../web-pages-and-web-apps/#seiten-auf-dem-server-und-im-voraus) |
| die Kosten einer SPA nennen und eine Entscheidung begründen | Begründe in drei Sätzen, ob die Seite eines Sportvereins eine SPA sein soll. | [Webseiten und Webapps](../web-pages-and-web-apps/#die-kosten-einer-spa) |
| eine Oberfläche aus Zustand und Render-Funktion aufbauen | Baue einen Zähler, dessen Knopf nur den Zustand ändert. | [Eine SPA von Hand](../spa-by-hand/) |
| Text sicher in HTML einsetzen | Erkläre, was ohne `escapeHtml` mit einem Namen wie `<b>Zelt</b>` passiert. | [Eine SPA von Hand](../spa-by-hand/#die-render-funktion) |
| einen Router mit dem Hash bauen | Ergänze eine Route `#/about` mit einer eigenen Ansicht. | [Eine SPA von Hand](../spa-by-hand/#ein-router-mit-dem-hash) |
| erklären, wo das Aktualisieren von Hand an Grenzen stösst | Erkläre, warum das Suchfeld im Beispiel den Fokus verliert. | [Eine SPA von Hand](../spa-by-hand/#die-grenzen-der-handarbeit) |
| ein Projekt mit Vite starten, bauen und prüfen | Baue die App, nenne die Dateien in `dist` und starte die Vorschau. | [Werkzeuge](../tools/#build-und-dist) |
| Anfragen mit einem Proxy weiterleiten und Adressen in Umgebungsvariablen auslagern | Ändere die Adresse des Katalogs mit einer Datei `.env.local`, ohne den Code zu ändern. | [Werkzeuge](../tools/#umgebungsvariablen) |
| den Basispfad für einen Unterordner setzen | Erkläre, warum die gebaute App auf GitHub Pages ohne `base` leer bleibt. | [Werkzeuge](../tools/#der-basispfad) |
| Anfragen im Netzwerk-Panel untersuchen | Zeig mit der Drosselung die Meldung zum Laden des Katalogs. | [Werkzeuge](../tools/#das-netzwerk-panel) |

Für Teil 3 brauchst du vor allem den Gedanken von Zustand und Render-Funktion und ein Projekt mit Vite, das läuft.

## Die App nach Teil 2

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/02-spa/de`. Die App zeigt den Katalog mit einer Suche und für jedes Ding eine eigene Seite, gebaut mit Vite und ohne Framework. Die Tests im Ordner `tests` prüfen die Wünsche aus den Kapiteln «Eine SPA von Hand» und «Werkzeuge».

```bash
npm install
npm test
```

Hast du in Teil 2 nicht alles geschafft, startest du Teil 3 mit diesem Stand.
