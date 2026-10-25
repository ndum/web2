# 4. [%Der Suchtext ohne Store|The search text without a store%]

## Status

[%Vorgeschlagen|Proposed%]

## [%Kontext|Context%]

[%Eine neue Freiwillige schlägt vor, den Suchtext in einen Store zu legen, wie Anmeldung und Favoriten. Nur der Katalog braucht den Suchtext, aber Mitglieder schicken einander Links auf Suchen.|A new volunteer suggests putting the search text into a store, like the login and the favorites. Only the catalog needs the search text, but members send each other links to searches.%]

## [%Optionen|Options%]

- [%Ein Store mit Pinia, wie für die Favoriten|A store with Pinia, as for the favorites%]
- [%Ein `ref` in der Seite des Katalogs|A `ref` in the page of the catalog%]
- [%Die Query in der Adresse, etwa `?q=säge`|The query in the address, such as `?q=saw`%]

## [%Entscheid|Decision%]

[%Der Suchtext lebt in der Query der Adresse. Ein Store bringt nichts, weil nur eine Seite den Text braucht, und ein `ref` ginge beim Teilen eines Links verloren.|The search text lives in the query of the address. A store gains nothing, because only one page needs the text, and a `ref` would get lost when someone shares a link.%]

## [%Konsequenzen|Consequences%]

[%Ein Link zeigt dieselbe Suche, und der Zurück-Knopf stellt sie wieder her. Die Seite muss den Text aus der Adresse lesen und Änderungen mit einer Pause hineinschreiben.|A link shows the same search, and the back button restores it. The page has to read the text from the address and write changes into it after a pause.%]
