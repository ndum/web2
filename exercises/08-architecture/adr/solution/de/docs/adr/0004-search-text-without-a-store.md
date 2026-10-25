# 4. Der Suchtext ohne Store

## Status

Vorgeschlagen

## Kontext

Eine neue Freiwillige schlägt vor, den Suchtext in einen Store zu legen, wie Anmeldung und Favoriten. Nur der Katalog braucht den Suchtext, aber Mitglieder schicken einander Links auf Suchen.

## Optionen

- Ein Store mit Pinia, wie für die Favoriten
- Ein `ref` in der Seite des Katalogs
- Die Query in der Adresse, etwa `?q=säge`

## Entscheid

Der Suchtext lebt in der Query der Adresse. Ein Store bringt nichts, weil nur eine Seite den Text braucht, und ein `ref` ginge beim Teilen eines Links verloren.

## Konsequenzen

Ein Link zeigt dieselbe Suche, und der Zurück-Knopf stellt sie wieder her. Die Seite muss den Text aus der Adresse lesen und Änderungen mit einer Pause hineinschreiben.
