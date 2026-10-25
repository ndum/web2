---
title: Kompetenzraster für Teil 3
description: Was du nach Teil 3 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 3.
sidebar:
  label: Kompetenzraster
  order: 6
---

Mit diesem Raster schätzt du ein, ob du für Teil 4 bereit bist. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| Vue, React und Angular nach Kriterien vergleichen | Begründe in drei Sätzen, was für Vue und was für React spricht, wenn ein Verein mit wechselnden Freiwilligen eine App baut. | [Frameworks im Vergleich](../frameworks/) |
| Zahlen aus Umfragen mit ihrer Quelle lesen | Erkläre, warum die Downloads eines Pakets nicht die Zahl der Menschen zeigen, die es nutzen. | [Frameworks im Vergleich](../frameworks/#verbreitung) |
| ein Projekt mit create-vue anlegen und seine Dateien erklären | Leg ein Projekt an und erkläre, was `index.html`, `src/main.js` und `src/App.vue` tun. | [Das erste Projekt](../first-project/) |
| eine Single File Component mit eigenem Style schreiben | Schreib eine Komponente, deren Überschrift rot ist, ohne die anderen Überschriften der App zu färben. | [Das erste Projekt](../first-project/#komponenten-einbinden) |
| die Vue DevTools einsetzen | Finde in den DevTools den Zustand einer Komponente und ändere einen Wert darin. | [Das erste Projekt](../first-project/#die-vue-devtools) |
| Werte mit Interpolation und `v-bind` anzeigen | Zeig für ein Ding einen Link, dessen Adresse seine id enthält. | [Template-Syntax](../template-syntax/#attribute-binden) |
| Listen und Bedingungen rendern | Zeig nur die ausgeliehenen Dinge, ohne `v-if` und `v-for` an dasselbe Element zu setzen. | [Template-Syntax](../template-syntax/#listen) |
| auf Events reagieren und Modifikatoren einsetzen | Schreib einen Link, der eine Zahl hochzählt, ohne dass der Browser ihm folgt. | [Template-Syntax](../template-syntax/#events) |
| Zustand mit `ref` und `reactive` halten | Erkläre, warum `const { query } = filters` die Suche bricht. | [Reaktiver Zustand](../reactive-state/#reactive) |
| abgeleitete Werte mit `computed` berechnen | Berechne die Zahl der Werkzeuge, die gerade da sind. | [Reaktiver Zustand](../reactive-state/#computed) |
| Felder mit `v-model` und Modifikatoren binden | Bind ein Textfeld für die Anzahl Tage so, dass im Ref eine Zahl ankommt. | [Formulare](../forms/#modifikatoren) |
| Eingaben prüfen und Meldungen zugänglich anzeigen | Verbinde eine Fehlermeldung so mit ihrem Feld, dass ein Screenreader sie vorliest. | [Formulare](../forms/#eingaben-prüfen) |

Für Teil 4 brauchst du vor allem Single File Components, die Template-Syntax und `ref` mit `computed`.

## Die App nach Teil 3

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/03-vue/de`. Die App zeigt den Katalog mit Suche, Filter nach Kategorie und der Zahl der Dinge, die da sind. Jedes Ding hat eine eigene Seite mit dem Formular für die Reservationsanfrage. Die Regeln der Anfrage stehen in `src/reservation.js`, alles andere in `src/App.vue`. Die Tests im Ordner `tests` prüfen die Wünsche aus diesem Teil.

```bash
npm install
npm test
```

Für die App startest du wie in Teil 2 den kleinen Server in einem Terminal und Vite in einem zweiten.

```bash
npm run server
npm run dev
```

Hast du in Teil 3 nicht alles geschafft, startest du Teil 4 mit diesem Stand.
