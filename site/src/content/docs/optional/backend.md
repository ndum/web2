---
title: Ein eigenes Backend mit Node
description: Eine kleine JSON-API mit node:http und node:test, wann sich ein eigenes Backend lohnt und wie die SPA mit ihm spricht.
sidebar:
  order: 3
---

Seit Teil 7 holt die Fallbeispiel-App ihre Daten von der Kurs-API im Ordner `api` des Kursrepos. Die Kurs-API läuft mit Node und dem eingebauten Modul `node:http`, ohne Framework. Wer im Projekt Daten speichern will, die keine öffentliche API liefert, braucht ein solches Backend selbst. Diese Seite zeigt eine kleine API für den Katalog, die du lesen und erweitern kannst.

## In deinem Projekt

Laut [Projektauftrag](../../project/assignment/) bringt ein eigenes Backend vier Bonuspunkte. Bewertet wird sonst nur das Frontend, plane also zuerst die SPA und danach den Server. Ein Backend lohnt sich, wenn deine App Daten anlegt oder ändert, die andere Personen sehen sollen, oder wenn es Daten aus mehreren Quellen zusammenführt. Für eine App, die nur liest, genügen oft eine öffentliche API oder eine JSON-Datei.

## Ein kleines Beispiel

Das Beispiel liegt im Kursrepo unter `optional/backend/de`. Die Funktion `createHandler` beantwortet jede Anfrage. Sie prüft Methode und Pfad, sucht mit `?q=` im Namen der Dinge und nimmt mit `POST` den Wunsch eines Mitglieds für ein neues Ding an. Den Inhalt einer Anfrage liest sie Stück für Stück bis zum Ende, und sie prüft ihn, bevor sie etwas speichert.

::code{file="optional/backend/{lang}/app.js"}

`server.js` startet den Server auf Port 3001. `npm run dev` startet ihn mit `node --watch` neu, sobald du eine Datei änderst.

::code{file="optional/backend/{lang}/server.js"}

Die Tests starten die API auf einem freien Port und fragen sie mit `fetch` ab, so wie es eine SPA tut. Node bringt dafür `node:test` und `fetch` mit, du brauchst keine zusätzlichen Pakete.

::code{file="optional/backend/{lang}/app.test.js" lines="8-26"}

Die Wünsche liegen nur im Speicher und sind nach einem Neustart weg. Die Kurs-API schreibt ihre Daten deshalb in Dateien, und ein Projekt mit vielen Daten nimmt eine Datenbank.

Die SPA spricht mit dem Backend am einfachsten über den Proxy von Vite, wie im Kapitel [Daten von einer API](../../state/data-from-an-api/). Für den Browser liegen App und API dann am selben Origin, und es braucht kein CORS. Läuft die API unter einer anderen Adresse, muss sie dem Browser mit dem Header `Access-Control-Allow-Origin` erlauben, ihre Antworten an die App weiterzugeben. Die Kurs-API zeigt das in `api/src/app.js`. Zugangsdaten für eine Datenbank oder einen anderen Dienst gehören in Umgebungsvariablen des Servers und nie in den Code der SPA, denn alles im Build der SPA kann jede Person im Browser lesen.

Bei einer grösseren API nehmen dir Frameworks Routen, das Lesen von JSON und die Behandlung von Fehlern ab. Express gibt seit Version 5 abgelehnte Promises von selbst an die Behandlung von Fehlern weiter. Fastify prüft Anfragen mit JSON Schema, und Hono baut auf den Web-Standards `Request` und `Response` auf. Geheime Werte liest Node mit `node --env-file=.env` aus einer Datei, die nicht ins Repository gehört.

## Offizielle Links

- [Node.js, Modul HTTP](https://nodejs.org/api/http.html)
- [Node.js, Test Runner](https://nodejs.org/api/test.html)
- [MDN, Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
- [Vite, Proxy des Entwicklungsservers](https://vite.dev/config/server-options.html#server-proxy)
- [Express](https://expressjs.com/), [Fastify](https://fastify.dev/) und [Hono](https://hono.dev/)
