---
title: Werkzeuge
description: Vite als Server für die Entwicklung und als Bundler, Hot Module Replacement, ein Proxy für die Daten, Umgebungsvariablen, Build, dist und preview, der Basispfad und das Netzwerk-Panel.
sidebar:
  order: 3
---

:::assignment
Ein Freiwilliger, der als Informatiker arbeitet, hat sich die SPA von Hand angesehen und Martina Hostettler zwei Fragen mitgegeben. Daraus ist ein neuer Wunsch entstanden.

> Als Freiwilliger, der die App weiterentwickelt, möchte ich Änderungen sofort im Browser sehen und die App mit einem Befehl für die Veröffentlichung bauen, damit die Arbeit an der App schneller geht.

Die Akzeptanzkriterien lauten:

1. `npm run dev` startet die App, und Änderungen erscheinen, ohne dass jemand den Browser neu lädt.
2. Der Katalog kommt weiterhin vom Server des Vereins, und seine Adresse steht nicht fest im Code.
3. `npm run build` erzeugt einen Ordner `dist`, den `npm run preview` ausliefert.
4. Die gebaute App funktioniert auch in einem Unterordner, wie ihn GitHub Pages verwendet.
:::

:::goals
Nach diesem Kapitel kannst du

- eine SPA in ein Projekt mit Vite verschieben und mit `npm run dev` starten,
- erklären, was der Entwicklungsserver und Hot Module Replacement tun,
- Anfragen mit einem Proxy weiterleiten und Adressen in Umgebungsvariablen auslagern,
- eine App bauen, den Ordner `dist` mit `npm run preview` prüfen und den Basispfad für einen Unterordner setzen,
- Anfragen im Netzwerk-Panel der DevTools untersuchen.
:::

## Vite einrichten

Vite ist ein Werkzeug für Webprojekte. Während der Entwicklung liefert es die App als Server aus, für die Veröffentlichung fasst es sie zu wenigen Dateien zusammen. Ein neues Projekt legst du mit `npm create vite@latest` an und wählst die Vorlage für JavaScript ohne Framework. Die SPA aus dem letzten Kapitel lässt sich auch von Hand umziehen, so ist das Übungsprojekt entstanden.

::code{file="exercises/02-spa/vite/{lang}/index.html"}

Die Seite `index.html` liegt jetzt im Hauptordner des Projekts, und Vite liest sie als Einstieg. Sie lädt `/src/main.js` als Modul, und dieses Modul importiert auch das CSS. Der Code der App ist derselbe wie im letzten Kapitel, er liegt nur im Ordner `src`. In `package.json` stehen die Befehle für Vite.

::code{file="exercises/02-spa/vite/{lang}/package.json"}

`npm run dev` startet den Entwicklungsserver, `npm run build` baut die App, und `npm run preview` liefert das Ergebnis zum Prüfen aus. Der Befehl `server` startet wie bisher den kleinen Server des Vereins.

## Der Entwicklungsserver

`npm run dev` startet Vite unter `http://localhost:5173/`. Der Server liefert die Module der App einzeln aus, so wie sie im Ordner `src` stehen, und wandelt sie dabei um, wo der Browser sie sonst nicht verstünde. Ein Import wie `import './style.css'` wird so zu CSS auf der Seite, und ein Import eines Pakets wie `import { ref } from 'vue'` findet das Paket in `node_modules`.

Speicherst du eine Datei, merkt Vite das sofort. Bei CSS tauscht es nur die Regeln aus, die Seite bleibt, wie sie ist, mit dem Text im Suchfeld und der Position beim Scrollen. Das heisst Hot Module Replacement, kurz HMR. Bei einem Modul mit JavaScript ohne Framework lädt Vite die Seite von selbst neu, weil es nicht weiss, wie es das Modul im laufenden Betrieb austauschen soll. Eine geänderte Vue-Komponente tauscht Vite dagegen aus, ohne die ganze Seite neu zu laden. Das zeigt Teil 3.

## Der Proxy

Die App fragt den Katalog unter `/items` an. Unter dieser Adresse antwortet jetzt aber Vite, nicht der kleine Server auf Port 3000. Ein Proxy löst das. Vite leitet Anfragen an bestimmte Adressen an einen anderen Server weiter und gibt dessen Antwort zurück. In `vite.config.js` steht dafür unter `server` die Regel `proxy: { '/items': 'http://localhost:3000' }`.

Für den Browser haben die App und der Katalog so dieselbe Adresse, und die App muss nichts davon wissen. `npm run preview` verwendet dieselben Regeln, solange es keine eigenen bekommt. Der Proxy läuft nur während der Entwicklung und der Vorschau. Für die Veröffentlichung braucht der Katalog eine Adresse, die überall erreichbar ist. Teil 7 verbindet die App mit der API des Kurses, die eine eigene Adresse hat.

## Umgebungsvariablen

Adressen und ähnliche Einstellungen gehören nicht fest in den Code, weil sie sich je nach Umgebung unterscheiden. Vite liest dafür Umgebungsvariablen aus Dateien, die mit `.env` beginnen, und stellt sie im Code unter `import.meta.env` bereit.

1. `.env` gilt immer, `.env.development` nur für `npm run dev` und `.env.production` nur für den Build.
2. Dateien mit der Endung `.local`, etwa `.env.local`, gelten nur auf dem eigenen Rechner und gehören nie ins Repo.
3. Nur Variablen, deren Name mit `VITE_` beginnt, kommen im Code im Browser an.
4. Vite setzt die Werte beim Build in den Code ein. Was in einer Variablen mit `VITE_` steht, kann darum jede Person lesen, die die App öffnet.

Ein Geheimnis wie ein Passwort oder ein Schlüssel für eine API hat deshalb in einer solchen Variablen nichts verloren. Welche Variablen ein Projekt kennt, beschreibt die Datei `.env.example`. Sie gehört ins Repo, und wer das Projekt übernimmt, kopiert sie nach `.env.local` und passt die Werte an.

::code{file="exercises/02-spa/vite/solution/{lang}/.env.example"}

Im Code liest die App den Wert und nimmt `/items`, wenn er fehlt, `loadItems(import.meta.env.VITE_CATALOG_URL ?? '/items')`. Daneben stellt Vite eigene Werte bereit, etwa `import.meta.env.DEV`, das während der Entwicklung `true` ist, und `import.meta.env.BASE_URL` für den Basispfad weiter unten.

## Build und dist

`npm run build` baut die App für die Veröffentlichung. Vite fasst die Module zu wenigen Dateien zusammen, entfernt Leerzeichen und Kommentare und schreibt alles in den Ordner `dist`.

```bash
npm run build
npm run preview
```

In `dist` liegen danach `index.html` und im Ordner `assets` je eine Datei für JavaScript und CSS. Ihre Namen enthalten einen Hash, etwa `index-0oR7C33Z.js`. Ändert sich der Inhalt, ändert sich der Name. Browser dürfen solche Dateien darum lange zwischenspeichern, und nach einer Änderung laden sie trotzdem sofort die neue Version. `npm run preview` liefert `dist` unter `http://localhost:4173/` aus, damit du den Build vor der Veröffentlichung prüfen kannst. Für den Betrieb ist dieser Server nicht gedacht. Veröffentlicht wird der Ordner `dist`, wie Teil 8 zeigt.

## Der Basispfad

Vite geht davon aus, dass die App direkt unter einer Domain liegt, und schreibt Pfade wie `/assets/index-0oR7C33Z.js` in `index.html`. Auf GitHub Pages liegt ein Projekt aber in einem Unterordner, etwa unter `https://name.github.io/lorraine-commons/`. Der Browser sucht `/assets/...` dann am falschen Ort, und die Seite bleibt leer.

Die Option `base` in `vite.config.js` legt den Basispfad fest. Mit `base: '/lorraine-commons/'` beginnen alle Pfade mit dem Namen des Unterordners. Mit `base: './'` schreibt Vite relative Pfade, die in jedem Ordner funktionieren. Für eine SPA mit Routen auf dem Hash genügt das. Für den Router mit schönen Adressen aus Teil 6 braucht es dagegen den absoluten Pfad.

## Das Netzwerk-Panel

Im Netzwerk-Panel der DevTools siehst du jede Anfrage der Seite mit Adresse, Status, Art, Grösse und Dauer. Lade die App einmal mit `npm run dev` und einmal mit `npm run preview` und vergleiche. Während der Entwicklung erscheinen viele einzelne Module, im Build nur wenige Dateien. In beiden Fällen geht die Anfrage an `/items` an Vite, das sie weiterleitet.

Zwei Einstellungen helfen beim Prüfen. Mit «Cache deaktivieren» lädt der Browser alles neu, wie beim ersten Besuch. Mit der Drosselung simulierst du eine langsame mobile Verbindung und siehst die Meldung zum Laden, die sonst kaum auffällt. Der Filter für Anfragen mit `fetch` blendet alles andere aus.

## Im Code

Arbeite mit dem Übungsprojekt, nachdem du die Aufgaben gelöst hast. Sag jeweils voraus, was passiert, bevor du es ausprobierst.

1. Ändere in `src/style.css` eine Farbe, während die App mit `npm run dev` läuft und im Suchfeld Text steht. Was geschieht mit dem Text? Ändere danach etwas in `src/render.js`.
2. Lege eine Datei `.env.local` mit `VITE_CATALOG_URL=/items?delay=3000` an und starte `npm run dev` neu. Was zeigt die App drei Sekunden lang? Und mit `?status=503`?
3. Beende den kleinen Server. Was zeigt die App, und was meldet Vite im Terminal?
4. Baue die App einmal ohne `base` und einmal mit `base: './'` und vergleiche die Pfade in `dist/index.html`.

## Aufgaben

Die Aufgaben ziehen die SPA aus dem letzten Kapitel zu Vite um. Du findest das Projekt im Kursrepo im Ordner `exercises/02-spa/vite/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Für die App selbst brauchst du zwei Terminals, eines mit `npm run server` und eines mit `npm run dev`. Bevor der Proxy steht, erscheint statt des Katalogs eine Fehlermeldung.

::::exercise[Einstieg]
Ergänze in `vite.config.js` den Proxy, sodass Anfragen an `/items` beim kleinen Server auf Port 3000 landen. Starte danach beide Server und prüfe im Netzwerk-Panel, dass die Anfrage an `/items` mit Status 200 zurückkommt.

:::solution[Lösung]
::code{file="exercises/02-spa/vite/solution/{lang}/vite.config.js"}

Die Regel unter `server.proxy` leitet jede Anfrage, deren Pfad mit `/items` beginnt, an den kleinen Server weiter. Im Netzwerk-Panel steht als Adresse trotzdem `localhost:5173`, der Browser merkt von der Weiterleitung nichts. Die Option `base` gehört zur Knobelei.
:::
::::

::::exercise[Vertiefung]
Ändere `src/app.js` so, dass die App die Adresse des Katalogs aus `import.meta.env.VITE_CATALOG_URL` liest und `/items` nimmt, wenn die Variable fehlt. Beschreibe die Variable in einer Datei `.env.example` mit dem Wert `/items`. Probiere sie mit einer Datei `.env.local` und `?delay=3000` aus.

:::solution[Lösung]
::code{file="exercises/02-spa/vite/solution/{lang}/src/app.js" lines="47-56"}

`??` greift, wenn die Variable fehlt, so läuft die App auch ohne Datei `.env.local`. Die Datei `.env.example` steht oben im Kapitel. Nach einer Änderung an einer Datei `.env` musst du `npm run dev` neu starten, Vite liest sie nur beim Start.
:::
::::

::::exercise[Knobelei]
Die App soll auf GitHub Pages unter `https://name.github.io/lorraine-commons/` laufen. Setze in `vite.config.js` einen Basispfad, mit dem der Build in diesem Unterordner funktioniert, und prüfe die Pfade in `dist/index.html` nach `npm run build`.

:::solution[Lösung]
Die Lösung der Einstiegsaufgabe enthält die Zeile `base: './'`. Danach beginnen die Pfade in `dist/index.html` mit `./assets/`, und die App findet ihre Dateien in jedem Ordner. `base: '/lorraine-commons/'` funktioniert ebenso, ist aber an den Namen des Repos gebunden. Der Test baut die App wirklich und prüft den Pfad des Skripts in `index.html`. Für Vue Router mit Adressen ohne `#` braucht es in Teil 6 den absoluten Pfad.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `index.html` aus dem Ordner direkt im Browser geöffnet, die Seite bleibt leer. | Die App mit `npm run dev` oder `npm run preview` öffnen. |
| Im Code steht `process.env.VITE_CATALOG_URL`, und im Browser ist `process` nicht definiert. | In Vite heisst es `import.meta.env`. |
| Eine Variable ohne `VITE_` am Anfang ist im Code `undefined`. | Den Namen mit `VITE_` beginnen. Nur solche Variablen gelangen in den Code. |
| Ein Schlüssel für eine API steht in einer Variablen mit `VITE_`. | Geheimnisse nie in den Code im Browser geben, sie gehören auf einen Server. |
| Die App fragt `/items` an, und Vite meldet im Terminal einen Fehler des Proxys. | Der kleine Server läuft nicht. Ihn mit `npm run server` starten. |
| Auf GitHub Pages findet die gebaute App ihre Dateien nicht. | `base` setzen und neu bauen. |
| Ein KI-Assistent schlägt Create React App, die Vue CLI oder webpack für ein neues Projekt vor. | Diese Werkzeuge werden kaum noch weiterentwickelt. Neue Projekte starten mit Vite. |

## Selbstcheck

::::selfcheck
1. Was macht Vite während der Entwicklung, und was beim Build?
2. Warum erscheint eine Änderung am CSS ohne Neuladen, eine Änderung an `render.js` aber mit?
3. Welche Umgebungsvariablen kommen im Browser an, und was darf nie in einer stehen?
4. Wozu dient die Option `base`?

:::solution[Antworten]
1. Während der Entwicklung liefert Vite die Module einzeln aus, wandelt sie wo nötig um und lädt Änderungen sofort. Beim Build fasst es alles zu wenigen Dateien in `dist` zusammen, mit einem Hash im Namen.
2. CSS kann Vite im laufenden Betrieb austauschen. Bei einem Modul mit JavaScript ohne Framework weiss es nicht, wie, und lädt deshalb die Seite neu.
3. Nur Variablen, deren Name mit `VITE_` beginnt. Ihre Werte stehen im Code, den alle lesen können, darum gehören keine Geheimnisse hinein.
4. Sie legt fest, unter welchem Pfad die App liegt, damit der Build seine Dateien auch in einem Unterordner wie auf GitHub Pages findet.
:::
::::

:::assignment
Die App läuft mit Vite, lädt Änderungen sofort und lässt sich bauen. Martina Hostettler ist zufrieden, doch der Freiwillige hat eine Warnung angefügt. «Mit jeder neuen Funktion, mit Filtern, Reservationen und Favoriten, wird es schwieriger, die Seite von Hand im Takt mit den Daten zu halten.» In Teil 3 zieht der Katalog deshalb zu Vue um. Vorher prüfst du mit dem [Kompetenzraster](../competences/), ob du für Teil 3 bereit bist.
:::
