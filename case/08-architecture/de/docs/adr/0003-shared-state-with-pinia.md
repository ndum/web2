# 3. Geteilter Zustand mit Pinia

## Status

Angenommen in Teil 7, nachträglich festgehalten in Teil 8.

## Kontext

Kopf, Katalog, Guard und Formular brauchen die Anmeldung, die Favoriten und die Anfragen. `App` hat sie mit `provide` bereitgestellt, und jede neue Seite brauchte wieder einen Teil davon. Ein Modul mit `ref` hätte gereicht, zeigt seine Änderungen aber nicht in den Entwicklertools und lässt sich in Tests schwerer vorbereiten.

## Entscheid

Die App hält geteilten Zustand in Setup Stores von Pinia, je einen für Katalog, Anmeldung, Favoriten und Anfragen. Zustand, den nur eine Komponente braucht, bleibt in der Komponente, und der Filter bleibt in der Adresse.

## Konsequenzen

Die Vue DevTools zeigen die Stores, und Tests starten mit einem frischen Pinia. Die App hängt von einem weiteren Paket ab. Wer einen Store zerlegt, braucht `storeToRefs`, sonst gehen die Verbindungen verloren.
