# 2. [%Rückfrage beim Verlassen eines Formulars|A warning before leaving a form%]

## Status

[%Ersetzt durch [ADR 5](0005-draft-in-session-storage.md).|Superseded by [ADR 5](0005-draft-in-session-storage.md).%]

## [%Kontext|Context%]

[%Ein Mitglied hat eine halb ausgefüllte Anfrage verloren, weil es auf einen Link geklickt hat. Die Eingaben lebten nur in der Komponente des Formulars.|A member lost a half-filled request by clicking a link. The input only lived in the component of the form.%]

## [%Entscheid|Decision%]

[%Die Seite eines Dings fragt mit `onBeforeRouteLeave` und `window.confirm` nach, bevor jemand ein Formular mit Eingaben verlässt.|The page of a thing asks with `onBeforeRouteLeave` and `window.confirm` before someone leaves a form with input.%]

## [%Konsequenzen|Consequences%]

[%Kein Klick auf einen Link löscht mehr Eingaben. Die Rückfrage stört aber auch, wer nur kurz im Katalog nachschauen will, und beim Neuladen hilft sie nicht.|No click on a link deletes input any longer. The question also bothers whoever only wants to look into the catalog for a moment, and it does not help on a reload.%]
