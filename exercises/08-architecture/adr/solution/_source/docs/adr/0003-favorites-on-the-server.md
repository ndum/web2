# 3. [%Favoriten auf dem Server|Favorites on the server%]

## Status

[%Angenommen, ersetzt [ADR 2](0002-favorites-in-local-storage.md)|Accepted, supersedes [ADR 2](0002-favorites-in-local-storage.md)%]

## [%Kontext|Context%]

[%Mitglieder wollen ihre Favoriten am Tresen und auf dem Handy sehen, nicht nur im Browser, in dem sie sie markiert haben. Die API des Vereins kennt angemeldete Mitglieder.|Members want to see their favorites at the counter and on their phone, not only in the browser where they marked them. The API of the association knows signed-in members.%]

## [%Entscheid|Decision%]

[%Die API speichert die Favoriten angemeldeter Mitglieder. Ohne Anmeldung bleiben die Favoriten im localStorage, und nach der Anmeldung schickt die App sie einmal an die API.|The API stores the favorites of signed-in members. Without a login the favorites stay in localStorage, and after the login the app sends them to the API once.%]

## [%Konsequenzen|Consequences%]

[%Favoriten folgen einem Mitglied auf jedes Gerät. Die App braucht zwei Wege für Favoriten und eine Regel, wenn beide verschiedene Listen haben, und jede Markierung wird zu einer Anfrage an den Server.|Favorites follow a member to every device. The app needs two ways for favorites and a rule for when both hold different lists, and every mark becomes a request to the server.%]
