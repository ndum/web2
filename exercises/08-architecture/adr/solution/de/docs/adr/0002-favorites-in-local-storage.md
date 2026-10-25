# 2. Favoriten im localStorage

## Status

Ersetzt durch [ADR 3](0003-favorites-on-the-server.md)

## Kontext

Mitglieder markieren Dinge als Favoriten und verlieren sie, sobald sie die Seite neu laden. Der Verein hat keinen Server, der die Favoriten speichern könnte.

## Entscheid

Die App speichert die Nummern der Favoriten als JSON im localStorage unter dem Schlüssel `lorraine-commons-favorites` und liest sie beim Start wieder.

## Konsequenzen

Die Favoriten überstehen das Neuladen und gelten in allen Tabs. Auf einem anderen Gerät fehlen sie, und wer die Daten des Browsers löscht, verliert sie.
