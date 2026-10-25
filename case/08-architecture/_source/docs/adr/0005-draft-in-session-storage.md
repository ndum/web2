# 5. [%Entwurf einer Anfrage im sessionStorage|The draft of a request in sessionStorage%]

## Status

[%Angenommen in Teil 7, nachträglich festgehalten in Teil 8. Ersetzt [ADR 2](0002-warning-before-leaving.md).|Accepted in part 7, written down in part 8. Supersedes [ADR 2](0002-warning-before-leaving.md).%]

## [%Kontext|Context%]

[%Die Rückfrage aus ADR 2 stört, wer kurz im Katalog nachschauen will, und beim Neuladen hilft sie nicht. Am Tresen arbeiten mehrere Mitglieder nacheinander am selben Gerät.|The question of ADR 2 bothers whoever wants to look into the catalog for a moment, and it does not help on a reload. At the counter, several members work one after the other at the same device.%]

## [%Entscheid|Decision%]

[%Das Formular schreibt jede Eingabe als Entwurf in den `sessionStorage`, einen Eintrag pro Ding, und holt ihn beim Öffnen zurück. Nach dem Senden und bei einem leeren Formular verschwindet der Entwurf. Die Rückfrage beim Verlassen fällt weg.|The form writes every input as a draft into `sessionStorage`, one entry per thing, and fetches it back when it opens. After sending and with an empty form, the draft disappears. The question before leaving is dropped.%]

## [%Konsequenzen|Consequences%]

[%Wer die Seite verlässt oder neu lädt, findet die Eingaben wieder. Ein Entwurf bleibt in seinem Tab und endet mit ihm, ein anderes Mitglied an einem anderen Gerät sieht ihn nie. Im Entwurf darf nichts stehen, was nicht in den Speicher des Browsers gehört.|Whoever leaves the page or reloads it finds the input again. A draft stays in its tab and ends with it, another member at another device never sees it. The draft must hold nothing that does not belong in the storage of the browser.%]
