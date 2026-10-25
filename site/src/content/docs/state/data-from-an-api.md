---
title: Daten von einer API
description: Die Kurs-API, Daten in Actions laden, Lade-, Fehler- und leere Zustände, Anfragen als JSON senden, die Anmeldung bei der API, die vorherige Anfrage abbrechen, die Adresse der API und CORS.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler möchte, dass die Anfragen beim Verein ankommen.

> Als Freiwillige oder Freiwilliger am Tresen möchte ich die Anfragen der Mitglieder auf dem Server des Vereins sehen, damit wir die Dinge bereitlegen können.

Der Freiwillige ergänzt, dass auch der Katalog vom Server kommen soll, damit eine Rückgabe am Tresen bei allen ankommt. Die Akzeptanzkriterien lauten:

1. Der Katalog kommt von der Kurs-API. Die App zeigt, dass er lädt, und meldet Fehler verständlich.
2. Eine Anfrage geht an die Kurs-API, und die App zeigt deren Antwort, auch eine Ablehnung.
3. Die Übersicht «Meine Anfragen» lädt von der Kurs-API und bricht das Laden ab, wenn jemand die Seite vorher verlässt.
:::

:::goals
Nach diesem Kapitel kannst du

- die Routen der Kurs-API lesen und die API starten,
- Daten in einer Action laden und Lade-, Fehler- und leere Zustände zeigen,
- Daten als JSON senden und die Antworten der API auswerten,
- eine Anfrage mit `AbortController` abbrechen,
- die Adresse der API einstellen und erklären, wann CORS nötig ist.
:::

## Die Kurs-API

Der kleine Server aus den früheren Teilen konnte nur den Katalog liefern. Ab diesem Teil spielt die Kurs-API im Ordner `api` des Kursrepos den Server des Vereins. Sie ist ein Programm für Node ohne Abhängigkeiten und läuft in einem eigenen Terminal.

```bash
cd api
npm start
```

Danach antwortet sie auf `http://localhost:3000`. Jeder Pfad beginnt mit `/de` oder `/en`, das wählt die Sprache der Daten und der Meldungen. Die Antworten sind JSON, ein Fehler kommt als `{ "error": "…" }`.

| Methode und Pfad | Wer | Antwort |
|---|---|---|
| `GET /items` | alle | alle Dinge |
| `GET /items/:id` | alle | ein Ding, 404 für eine unbekannte Nummer |
| `POST /session` | alle | meldet mit `{ "number": "M-117" }` an, 401 für eine unbekannte Nummer |
| `GET /session` | alle | das angemeldete Mitglied, 401 ohne Anmeldung |
| `DELETE /session` | alle | meldet ab |
| `GET /reservations` | Mitglieder | die eigenen Anfragen |
| `POST /reservations` | Mitglieder | eine Anfrage, 201, 422 mit einer Meldung pro Feld, 409 für schon angefragte Tage |
| `DELETE /reservations/:id` | Mitglieder | zieht eine eigene Anfrage zurück |
| `POST /items/:id/return` | Team | erfasst eine Rückgabe, 403 ohne Konto des Teams |

Wie der kleine Server wartet die API mit `?delay=2000` zwei Sekunden und antwortet mit `?status=503` mit diesem Status. Rückgaben und Anfragen hält sie in `api/storage/state.json` fest, `npm run reset` setzt sie zurück.

## Laden in einer Action

Daten vom Server lädt eine Action des Stores. Der Store hält neben den Daten den Status der Anfrage, und jede Seite zeigt für jeden Status etwas. `fetch` lehnt nur ab, wenn gar keine Antwort kommt, einen Status wie 503 prüft die Action selbst, wie in Kapitel 1.4.

::playground{dir="examples/07-state/load-in-action"}

Der Playground hat keinen Server. Die Datei `mock-api.js` spielt darum die Kurs-API nach, sie fängt Aufrufe von `fetch` unter `/api/` ab und antwortet wie die API, mit `?delay` und `?status`. In einem Projekt fällt sie weg, dort antwortet die echte API.

## Anfragen senden

Eine Anfrage geht mit `method: 'POST'` an die API. Der Inhalt steht als JSON in `body`, und der Kopf `Content-Type` sagt der API, dass es JSON ist. Die Kurs-API nimmt nur JSON an und antwortet sonst mit 415.

::playground{dir="examples/07-state/send-request"}

Die Antwort sagt mit ihrem Status, wie es ausging. 201 heisst angelegt, 422 heisst, dass Felder nicht stimmen, und 409 meldet einen Konflikt, im Fall der Kurs-API Tage, die schon angefragt sind. Das Formular prüft die Regeln des Vereins schon vor dem Senden, wie seit Teil 3. Die API prüft sie trotzdem noch einmal, denn jeder kann eine Anfrage auch ohne die App senden, und Konflikte mit Anfragen anderer Mitglieder kennt nur der Server.

## Die Anmeldung bei der Kurs-API

Die Kurs-API simuliert die Anmeldung mit der Mitgliedernummer, ein Passwort kennt sie nicht. Nach `POST /session` setzt sie ein Cookie, und der Browser schickt es bei jeder weiteren Anfrage an dieselbe Adresse mit. So weiss die API, wer eine Anfrage sendet. Der Store der Anmeldung sieht dieses Cookie nicht, er merkt sich nur das Mitglied aus der Antwort.

::code{file="case/07-state/{lang}/src/stores/auth.js" lines="21-28"}

Den Bereich des Teams schützt jetzt auch der Server. Eine Rückgabe ohne Konto des Teams lehnt die API mit 403 ab, egal was der Guard im Browser zeigt. Kapitel 7.4 erklärt, warum das Cookie für die Anmeldung besser passt als der Speicher des Browsers.

## Die vorherige Anfrage abbrechen

Kapitel 5.2 hat veraltete Antworten mit einer Aufräumfunktion übergangen. Mit einem `AbortController` aus Kapitel 1.4 bricht dieselbe Aufräumfunktion die alte Anfrage ab, statt ihre Antwort nur zu übergehen.

::playground{dir="examples/07-state/abort-previous"}

Klickst du schnell mehrmals auf «Nächstes Ding», meldet die Konsole die abgebrochenen Anfragen, und nur die letzte Antwort erscheint. Ein abgebrochener Aufruf von `fetch` lehnt mit einem `AbortError` ab, und die Seite übergeht ihn. Wie in Kapitel 1.4 bricht `AbortSignal.timeout` eine Anfrage ab, die zu lange dauert.

## Die Adresse der API und CORS

Die Projekte dieses Teils lesen die Adresse der API aus `VITE_API_URL` und nehmen sonst `/api/de`. Der Proxy von Vite aus Kapitel 6.2 leitet alles unter `/api` an die Kurs-API weiter. Für den Browser liegen App und API damit auf derselben Adresse.

::code{file="exercises/07-state/api/solution/{lang}/.env.example"}

![Der Weg einer Anfrage von oben nach unten. Eine Komponente ruft eine Action des Stores auf, der Store schickt fetch an /api/de/items. Vite auf Port 5173 nimmt die Anfrage an und leitet alles unter /api an die Kurs-API auf Port 3000 weiter, die GET /de/items beantwortet und Rückgaben und Anfragen in storage/state.json festhält. Rechts führt ein gestrichelter Weg vom Store direkt an http://localhost:3000. Dieser Weg geht an eine andere Adresse und braucht darum CORS.](../../../assets/figures/de/p7c3-request-path.svg)

Ruft die App die API direkt unter `http://localhost:3000/de` auf, geht die Anfrage an einen anderen Port und damit an eine andere Origin. Laut [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) schränkt der Browser solche Anfragen aus Skripten ein. Er gibt die Antwort nur heraus, wenn der Server die Origin der Seite mit dem Kopf `Access-Control-Allow-Origin` erlaubt. Für Anfragen mit JSON fragt der Browser vorher mit `OPTIONS` nach, ob Methode und Kopfzeilen erlaubt sind. Bei einer einfachen Anfrage bearbeitet der Server sie trotzdem, der Browser hält nur die Antwort zurück. Die Kurs-API erlaubt die Adressen von Vite auf den Ports 5173 und 4173. Mit Cookies braucht es zusätzlich `credentials: 'include'` in `fetch` und die Erlaubnis des Servers, darum bleiben die Projekte beim Proxy.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Wähl im ersten Beispiel «langsam» und gleich danach «mit Fehler». Welcher Zustand bleibt am Ende stehen?
2. Sende im Beispiel mit der Anfrage zweimal dieselben Tage. Was antwortet die Attrappe der API beim zweiten Mal?
3. Nimm im selben Beispiel den Kopf `Content-Type` weg. Die Attrappe merkt es nicht, was würde die Kurs-API antworten?
4. Nimm im Beispiel zum Abbrechen die Zeile mit `onWatcherCleanup` weg und klick schnell mehrmals. Welches Ding steht am Ende als Überschrift?

## Aufgaben

Die Aufgaben bauen den Katalog und die Anfragen aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/07-state/api/de`. Der Store der Anmeldung spricht schon mit der Kurs-API. Kopiere den Ordner, installiere die Pakete und starte die Tests. Die Tests brauchen keinen Server, für die App im Browser startest du die Kurs-API in einem zweiten Terminal.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Der Store `catalog` liest den Katalog noch aus einer Datei. Lade ihn in der Action `load` von `${API}/items`. Der State `status` ist `loading`, `error` oder `ready`, und `error` hält bei einem Fehler eine Meldung wie «Die Kurs-API antwortet mit dem Status 503.».

:::solution[Lösung]
::code{file="exercises/07-state/api/solution/{lang}/src/stores/catalog.js" lines="6-24"}

Ohne Antwort lehnt `fetch` mit einem `TypeError` ab, dafür meldet die Lösung, dass die Kurs-API nicht erreichbar ist. `App` ruft `load` beim Start auf, und die Seite des Katalogs zeigt für jeden Status etwas.
:::
::::

::::exercise[Vertiefung]
Die Action `send` im Store `requests` legt Anfragen bisher nur im Browser ab. Schick sie mit `POST` als JSON an `${API}/reservations`. Bei Erfolg gibt `send` `{ reservation, fields: {} }` zurück, bei einer Ablehnung `{ error, fields }` mit der Meldung und den Meldungen pro Feld aus der Antwort.

:::solution[Lösung]
::code{file="exercises/07-state/api/solution/{lang}/src/stores/requests.js" lines="11-22"}

Die Seite eines Dings zeigt `result.error` und die Meldungen pro Feld schon an. Ein Mitglied kann sich im Browser mit M-117 oder M-204 anmelden, die Anmeldung erledigt der Store `auth` bei der Kurs-API.
:::
::::

::::exercise[Knobelei]
Die Übersicht «Meine Anfragen» zeigt bisher nur, was im Browser angefragt wurde. Lade sie in einer Action `load(signal)` von `${API}/reservations`, zeige Laden, Fehler und eine leere Liste, und brich das Laden mit einem `AbortController` ab, wenn jemand die Seite vorher verlässt.

:::solution[Lösung]
::code{file="exercises/07-state/api/solution/{lang}/src/stores/requests.js" lines="24-38"}

::code{file="exercises/07-state/api/solution/{lang}/src/views/RequestsView.vue" lines="10-13"}

Ein Abbruch ist kein Fehler, darum setzt die Action dafür keinen Status. Ohne Anmeldung antwortet die API mit 401, und die Seite zeigt deren Meldung.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein Status wie 500 erscheint als Erfolg. | `fetch` lehnt nur ohne Antwort ab. `response.ok` prüfen. |
| Die Kurs-API antwortet mit 415. | Der Kopf `Content-Type: application/json` fehlt, oder der Inhalt ist kein JSON. |
| Die Konsole meldet, dass CORS eine Anfrage blockiert. | Die App ruft die API auf einer anderen Origin auf. Den Proxy verwenden oder die Origin auf dem Server erlauben. |
| Nach dem Verlassen einer Seite setzt eine späte Antwort noch einen Zustand. | Die Anfrage mit einem `AbortController` abbrechen, wenn die Seite verschwindet. |
| Ein KI-Assistent verlässt sich nur auf die Prüfung im Formular. | Der Server prüft jede Anfrage noch einmal, die App zeigt seine Meldungen. |

## Selbstcheck

::::selfcheck
1. Wann lehnt `fetch` ab, und wann muss die Action selbst einen Fehler erkennen?
2. Was bedeuten die Antworten 201, 401, 409 und 422 der Kurs-API?
3. Warum prüft die Kurs-API die Regeln, obwohl das Formular sie schon prüft?
4. Warum braucht die App mit dem Proxy von Vite kein CORS?

:::solution[Antworten]
1. `fetch` lehnt nur ab, wenn keine Antwort kommt oder die Anfrage abgebrochen wird. Jeden Status prüft die Action mit `response.ok` selbst.
2. 201 heisst angelegt, 401 fehlende Anmeldung, 409 ein Konflikt mit schon angefragten Tagen und 422 Felder, die nicht stimmen.
3. Jeder kann Anfragen ohne die App senden, und Konflikte mit Anfragen anderer kennt nur der Server.
4. Für den Browser gehen alle Anfragen an die Adresse der App. Erst Vite leitet sie an die API weiter, und der Browser sieht keine andere Origin.
:::
::::

:::assignment
Katalog, Anfragen und Rückgaben laufen über die Kurs-API. Nach dem Neuladen ist die Anmeldung im Store aber weg, und ein Mitglied, das im zweiten Tab Favoriten markiert, sieht sie im ersten nicht. Martina Hostettler meldet ausserdem, dass am Tresen halb ausgefüllte Anfragen verloren gehen, sobald jemand die Rückfrage beim Verlassen bestätigt, um kurz im Katalog nachzuschauen. Das nächste Kapitel klärt, was die App wo im Browser speichert.
:::
