---
title: Nuxt und serverseitiges Rendern
description: Eine Vue-App auf dem Server rendern, im Browser hydratisieren und einordnen, was Nuxt dazu beiträgt.
sidebar:
  order: 2
---

Eine SPA schickt dem Browser zuerst eine fast leere Seite und baut den Inhalt mit JavaScript auf. Beim serverseitigen Rendern, kurz SSR, rendert der Server dieselben Komponenten schon zu HTML. Der Browser zeigt den Inhalt sofort, und danach übernimmt dieselbe App im Browser die Seite. Dieser Schritt heisst Hydration. Vue bringt beides mit. `createSSRApp` erzeugt eine App für dieses Zusammenspiel, `renderToString` macht auf dem Server HTML daraus, und `mount` übernimmt dieses HTML im Browser. Nuxt ist ein Framework auf Vue, das SSR, Routing und Datenladen für ganze Projekte einrichtet.

## In deinem Projekt

SSR lohnt sich, wenn Inhalte schnell sichtbar sein müssen oder Suchmaschinen sie finden sollen, etwa bei einem öffentlichen Katalog oder Blog. Es kostet aber etwas. Die App braucht einen Server, der Node ausführt, statt nur Dateien auszuliefern, und Code, der im Browser läuft, muss auch auf dem Server laufen können. Für eine App hinter einer Anmeldung bringt SSR wenig. Wer nur einzelne Seiten vorab erzeugen will, kann sie beim Build als statische Seiten rendern lassen.

## Ein kleines Beispiel

Das Beispiel unter `optional/ssr/de` rendert den Katalog mit Vue selbst, ohne Nuxt. `app.js` erzeugt die App mit `createSSRApp`. Die Funktion legt bei jedem Aufruf eine neue App an, denn auf dem Server teilen sich alle Anfragen denselben Prozess, und der Zustand einer Anfrage darf nie bei einer anderen landen.

::code{file="optional/ssr/{lang}/app.js"}

`renderToString` macht aus der App einen Text mit HTML. `render.js` setzt ihn in eine ganze Seite, gibt dem Browser die Daten mit und lädt das Skript, das die Seite übernimmt. Die Kommentare `<!--[-->` im HTML markieren Fragmente, an denen sich die Hydration orientiert.

::code{file="optional/ssr/{lang}/render.js"}

Im Browser ruft `client.js` dieselbe Funktion auf. Weil die App mit `createSSRApp` entsteht, zeichnet `mount` die Seite nicht neu, sondern hängt die Event-Listener an das vorhandene HTML. Erst danach reagiert der Knopf «Merken».

::code{file="optional/ssr/{lang}/client.js"}

Mit `npm start` liefert `server.js` die Seite unter `http://localhost:3002` aus. Im Quelltext der Seite steht die Liste schon im HTML, ohne dass JavaScript gelaufen ist. Liefert der Server anderes HTML, als die App im Browser rendern würde, meldet Vue beim Hydrieren einen Mismatch. Das passiert etwa, wenn eine Komponente beim Rendern die aktuelle Uhrzeit oder eine Zufallszahl verwendet.

Nuxt richtet all das für ein ganzes Projekt ein. Die aktuelle Version ist Nuxt 4, ein neues Projekt legst du mit `npm create nuxt@latest` an. Seiten liegen als Komponenten im Ordner `app/pages`, und Nuxt macht aus den Dateinamen die Routen, statt dass du sie von Hand einträgst. Komponenten und Composables importiert Nuxt automatisch. `useFetch` lädt Daten auf dem Server und gibt sie der Seite mit, damit der Browser sie nicht noch einmal holt, und Dateien im Ordner `server/api` werden zu Routen einer API. Ob eine Seite auf dem Server, nur im Browser oder schon beim Build entsteht, legst du pro Route fest. Der Entwicklungsserver von Nuxt nimmt wie die Kurs-API den Port 3000, starte also nicht beide auf demselben Port.

## Offizielle Links

- [Vue-Dokumentation, Server-Side Rendering](https://vuejs.org/guide/scaling-up/ssr.html)
- [Nuxt-Dokumentation, Installation](https://nuxt.com/docs/4.x/getting-started/installation)
- [Nuxt-Dokumentation, Rendering](https://nuxt.com/docs/4.x/guide/concepts/rendering)
