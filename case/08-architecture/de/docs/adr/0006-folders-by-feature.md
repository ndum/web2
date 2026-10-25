# 6. Ordner nach Features

## Status

Angenommen in Teil 8.

## Kontext

Die App lag nach Art der Dateien geordnet in `views`, `components`, `stores` und `composables`. Wer an den Anfragen arbeitete, sprang zwischen vier Ordnern, und eine neue Freiwillige fand die Teile einer Funktion nicht. Die Stores riefen `fetch` selbst auf.

## Entscheid

Jedes Feature hat einen Ordner in `src/features` mit seinen Seiten, eigenen Komponenten, seinem Store, seinen Routen und einer `index.js`, die festlegt, was andere davon verwenden dürfen. Gemeinsame Bausteine liegen in `src/components`, `src/composables` und `src/utils`, nur `src/api` spricht mit dem Server. Ein Test prüft diese Regeln.

## Konsequenzen

Wer an einem Feature arbeitet, findet fast alles in einem Ordner. Imports zwischen Features gehen über ihre `index.js` und bleiben überschaubar. Bei Code, den zwei Features brauchen, muss jemand entscheiden, wohin er gehört, und eine neue Regel braucht eine Änderung im Test.
