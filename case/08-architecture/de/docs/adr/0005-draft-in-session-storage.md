# 5. Entwurf einer Anfrage im sessionStorage

## Status

Angenommen in Teil 7, nachträglich festgehalten in Teil 8. Ersetzt [ADR 2](0002-warning-before-leaving.md).

## Kontext

Die Rückfrage aus ADR 2 stört, wer kurz im Katalog nachschauen will, und beim Neuladen hilft sie nicht. Am Tresen arbeiten mehrere Mitglieder nacheinander am selben Gerät.

## Entscheid

Das Formular schreibt jede Eingabe als Entwurf in den `sessionStorage`, einen Eintrag pro Ding, und holt ihn beim Öffnen zurück. Nach dem Senden und bei einem leeren Formular verschwindet der Entwurf. Die Rückfrage beim Verlassen fällt weg.

## Konsequenzen

Wer die Seite verlässt oder neu lädt, findet die Eingaben wieder. Ein Entwurf bleibt in seinem Tab und endet mit ihm, ein anderes Mitglied an einem anderen Gerät sieht ihn nie. Im Entwurf darf nichts stehen, was nicht in den Speicher des Browsers gehört.
