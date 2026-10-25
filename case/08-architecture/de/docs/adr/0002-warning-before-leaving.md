# 2. Rückfrage beim Verlassen eines Formulars

## Status

Ersetzt durch [ADR 5](0005-draft-in-session-storage.md).

## Kontext

Ein Mitglied hat eine halb ausgefüllte Anfrage verloren, weil es auf einen Link geklickt hat. Die Eingaben lebten nur in der Komponente des Formulars.

## Entscheid

Die Seite eines Dings fragt mit `onBeforeRouteLeave` und `window.confirm` nach, bevor jemand ein Formular mit Eingaben verlässt.

## Konsequenzen

Kein Klick auf einen Link löscht mehr Eingaben. Die Rückfrage stört aber auch, wer nur kurz im Katalog nachschauen will, und beim Neuladen hilft sie nicht.
