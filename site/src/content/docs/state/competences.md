---
title: Kompetenzraster für Teil 7
description: Was du nach Teil 7 kannst und wie du es selbst prüfst, dazu der Stand der App nach Teil 7.
sidebar:
  label: Kompetenzraster
  order: 6
---

Mit diesem Raster schätzt du ein, ob du für die Prüfung und das Projekt bereit bist. Lies jede Zeile und löse die Prüfaufgabe daneben, ohne nachzuschauen. Fällt sie dir leicht, hast du das Ziel erreicht. Wenn nicht, führt dich der Link in der letzten Spalte zur passenden Stelle.

| Ich kann … | Prüfaufgabe | Nachschlagen |
|---|---|---|
| die Arten von Zustand unterscheiden | Ordne Suchtext, offenen Dialog, Anmeldung und Katalog je einer Art von Zustand zu. | [Zustand am richtigen Ort](../where-state-belongs/#arten-von-zustand) |
| Zustand in die Elternkomponente heben | Zeig dieselben Favoriten in zwei Geschwistern, ohne dass eines eine Kopie hält. | [Zustand am richtigen Ort](../where-state-belongs/#zustand-in-die-elternkomponente-heben) |
| geteilten Zustand in ein Modul legen | Gib eine Liste aus einem Modul so heraus, dass andere Dateien sie nur lesen können. | [Zustand am richtigen Ort](../where-state-belongs/#ein-modul-für-geteilten-zustand) |
| begründen, wann eine App keinen Store braucht | Erkläre, warum ein offener Dialog keinen Store braucht. | [Zustand am richtigen Ort](../where-state-belongs/#ohne-store-auskommen) |
| einen Setup Store mit Pinia schreiben | Schreib einen Store für die Favoriten mit State, Getter und Action. | [Pinia](../pinia/#setup-stores) |
| einen Store zerlegen, ohne die Verbindung zu verlieren | Erkläre, warum `const { count } = store` stehen bleibt, und behebe es. | [Pinia](../pinia/#stores-zerlegen-mit-storetorefs) |
| einen Store in einem Guard verwenden | Lass einen Guard die Anmeldung aus dem Store prüfen. | [Pinia](../pinia/#ein-store-im-navigation-guard) |
| Stores testen | Teste einen Store mit einem frischen Pinia für jeden Test. | [Pinia](../pinia/#stores-testen) |
| Daten in einer Action laden und jeden Zustand zeigen | Lade den Katalog in einer Action und zeig Laden, Fehler und Liste. | [Daten von einer API](../data-from-an-api/#laden-in-einer-action) |
| Daten als JSON senden und Antworten auswerten | Schick eine Anfrage mit `POST` und zeig die Meldungen bei 422 und 409. | [Daten von einer API](../data-from-an-api/#anfragen-senden) |
| eine Anfrage abbrechen | Brich das Laden ab, wenn jemand die Seite vorher verlässt. | [Daten von einer API](../data-from-an-api/#die-vorherige-anfrage-abbrechen) |
| die Adresse einer API einstellen und CORS erklären | Erkläre, warum die App mit dem Proxy von Vite kein CORS braucht. | [Daten von einer API](../data-from-an-api/#die-adresse-der-api-und-cors) |
| Werte im Speicher des Browsers halten | Halte die Favoriten im `localStorage` und einen Entwurf im `sessionStorage`. | [Persistenz](../persistence/#favoriten-im-localstorage) |
| mehrere Tabs abgleichen | Lass einen Store auf das Event `storage` hören. | [Persistenz](../persistence/#mehrere-tabs) |
| begründen, was nie in den Speicher des Browsers gehört | Erkläre, warum eine Anmeldung in ein Cookie mit `HttpOnly` gehört. | [Persistenz](../persistence/#nichts-geheimes-im-speicher) |
| eine Anmeldung nach dem Neuladen erfragen | Erkläre, warum der Guard nach dem Neuladen auf die Kurs-API wartet. | [Persistenz](../persistence/#die-anmeldung-nach-dem-neuladen) |
| Daten mit einer Server-State-Bibliothek laden (Exkurs) | Lade den Katalog mit `useQuery` und erkläre, wozu der Schlüssel dient. | [Server-State-Bibliotheken](../server-state/#abfragen-mit-usequery) |

Mit Teil 7 ist der Stoff der Prüfung komplett. Für das Projekt und für Teil 8 brauchst du vor allem Komponenten, den Router, Stores und Daten von einer API. Die letzte Zeile gehört zum Exkurs und ist freiwillig.

## Die App nach Teil 7

Was die Aufträge von Martina Hostettler in diesem Teil ergeben haben, steht im Kursrepo im Ordner `case/07-state/de`. Pinia hält Katalog, Anmeldung, Favoriten und Anfragen in Stores, und die Daten kommen von der Kurs-API. Mitglieder melden sich bei der API an, bleiben eine Sitzung lang angemeldet und sehen ihre Anfragen im Kopf und auf der Seite «Meine Anfragen». Das Team erfasst Rückgaben bei der API, die Favoriten sind in allen Tabs dieselben, und eine angefangene Anfrage bleibt in ihrem Tab erhalten. Die Tests im Ordner `tests` prüfen die Wünsche aus diesem Teil.

```bash
npm install
npm test
```

Für die App startest du die Kurs-API in einem Terminal, im Kursrepo im Ordner `api`, und Vite in einem zweiten.

```bash
npm start
npm run dev
```

Hast du in Teil 7 nicht alles geschafft, startest du Teil 8 mit diesem Stand.
