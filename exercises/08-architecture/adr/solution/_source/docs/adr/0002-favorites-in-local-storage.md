# 2. [%Favoriten im localStorage|Favorites in localStorage%]

## Status

[%Ersetzt durch [ADR 3](0003-favorites-on-the-server.md)|Superseded by [ADR 3](0003-favorites-on-the-server.md)%]

## [%Kontext|Context%]

[%Mitglieder markieren Dinge als Favoriten und verlieren sie, sobald sie die Seite neu laden. Der Verein hat keinen Server, der die Favoriten speichern könnte.|Members mark things as favorites and lose them as soon as they reload the page. The association has no server that could store the favorites.%]

## [%Entscheid|Decision%]

[%Die App speichert die Nummern der Favoriten als JSON im localStorage unter dem Schlüssel `lorraine-commons-favorites` und liest sie beim Start wieder.|The app stores the numbers of the favorites as JSON in localStorage under the key `lorraine-commons-favorites` and reads them again on start.%]

## [%Konsequenzen|Consequences%]

[%Die Favoriten überstehen das Neuladen und gelten in allen Tabs. Auf einem anderen Gerät fehlen sie, und wer die Daten des Browsers löscht, verliert sie.|The favorites survive a reload and hold in every tab. They are missing on another device, and whoever clears the data of the browser loses them.%]
