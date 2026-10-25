# 3. Favoriten auf dem Server

## Status

Angenommen, ersetzt [ADR 2](0002-favorites-in-local-storage.md)

## Kontext

Mitglieder wollen ihre Favoriten am Tresen und auf dem Handy sehen, nicht nur im Browser, in dem sie sie markiert haben. Die API des Vereins kennt angemeldete Mitglieder.

## Entscheid

Die API speichert die Favoriten angemeldeter Mitglieder. Ohne Anmeldung bleiben die Favoriten im localStorage, und nach der Anmeldung schickt die App sie einmal an die API.

## Konsequenzen

Favoriten folgen einem Mitglied auf jedes Gerät. Die App braucht zwei Wege für Favoriten und eine Regel, wenn beide verschiedene Listen haben, und jede Markierung wird zu einer Anfrage an den Server.
