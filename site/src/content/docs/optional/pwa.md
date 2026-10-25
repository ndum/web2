---
title: PWA und Offline-Betrieb
description: Eine SPA mit Manifest und eigenem Service Worker installierbar machen und ohne Netz starten.
sidebar:
  order: 5
---

Eine Progressive Web App, kurz PWA, ist eine Web-App, die sich wie eine installierte App verhält. Zwei Dateien machen den Unterschied. Das Manifest beschreibt Name, Icons und Farben der App, damit Browser und Betriebssystem sie installieren und mit eigenem Fenster starten können. Der Service Worker ist ein Skript, das zwischen App und Netz sitzt. Er beantwortet Anfragen aus einem Cache, wenn das Netz fehlt.

## In deinem Projekt

Laut [Projektauftrag](../../project/assignment/) bringt eine PWA mit Offline-Betrieb einen Bonuspunkt. Sie lohnt sich für eine App, die unterwegs gebraucht wird, etwa eine Liste, die man im Keller ohne Empfang öffnet. Offline heisst dabei meist, dass die App startet und die zuletzt geladenen Daten zeigt. Neue Daten zu senden, während das Netz fehlt, ist deutlich aufwendiger. Ein Service Worker läuft nur in einem sicheren Kontext, also über HTTPS oder auf `localhost`, und GitHub Pages liefert HTTPS.

## Ein kleines Beispiel

Das Beispiel unter `optional/pwa/de` ist ein kleiner Katalog mit Vite. Manifest, Service Worker und Icons liegen im Ordner `public`, damit Vite sie unverändert in den Build kopiert. Die Adressen im Manifest sind relativ, so funktioniert die App auch unter einem Basispfad.

::code{file="optional/pwa/{lang}/public/manifest.webmanifest"}

Der Service Worker legt beim Installieren die Hülle der App in den Cache, also `index.html` und das Manifest. Beim Aktivieren löscht er seine eigenen Caches aus einer älteren Version.

::code{file="optional/pwa/{lang}/public/sw.js" lines="10-21"}

Jede Anfrage der App läuft danach durch den Listener für `fetch`. Seiten, also Anfragen mit dem Modus `navigate`, holt er zuerst aus dem Netz und offline aus dem Cache. Weil eine SPA für jede Adresse dieselbe `index.html` braucht, nimmt er offline immer diese Datei. Daten unter `/api/` holt er ebenfalls zuerst aus dem Netz, damit sie aktuell sind. Die Dateien der App ändern sich nur mit einem neuen Build, sie kommen deshalb zuerst aus dem Cache.

::code{file="optional/pwa/{lang}/public/sw.js" lines="49-61"}

Die App registriert den Service Worker nur im Build. Während der Entwicklung würde er alte Dateien aus dem Cache liefern, und Änderungen wären nicht zu sehen. Probier das Beispiel deshalb mit `npm run build` und `npm run preview`.

::code{file="optional/pwa/{lang}/src/registerServiceWorker.js"}

Die Tests unter `tests/sw.test.js` führen den Service Worker in Node aus, mit kleinen Attrappen für `self`, `caches` und `fetch`. So prüfen sie ohne Browser, dass eine Adresse offline `index.html` bekommt und Dateien nur einmal aus dem Netz kommen.

Chrome und Edge bieten die Installation an, wenn das Manifest einen Namen, Icons mit 192 und 512 Pixeln, `start_url` und `display` enthält und die Seite über HTTPS kommt. Safari legt jede Website auf Wunsch ins Dock des Mac oder auf den Home-Bildschirm des iPhone, und Firefox installiert auf dem Desktop keine PWAs aus einem Manifest. Alle Apps desselben Origins teilen sich ausserdem die Caches, etwa alle Projekte unter einem Konto von GitHub Pages. Der Service Worker erkennt seine eigenen Caches deshalb am Präfix `catalog-` und löscht nur diese. Wer viele Dateien vorab in den Cache legen will, lässt den Service Worker von vite-plugin-pwa erzeugen, das auf Workbox aufbaut.

## Offizielle Links

- [MDN, Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [MDN, Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN, Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest)
- [MDN, PWAs installierbar machen](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/guide/)
