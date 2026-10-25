# 6. [%Ordner nach Features|Folders by feature%]

## Status

[%Angenommen in Teil 8.|Accepted in part 8.%]

## [%Kontext|Context%]

[%Die App lag nach Art der Dateien geordnet in `views`, `components`, `stores` und `composables`. Wer an den Anfragen arbeitete, sprang zwischen vier Ordnern, und eine neue Freiwillige fand die Teile einer Funktion nicht. Die Stores riefen `fetch` selbst auf.|The app was sorted by the kind of file in `views`, `components`, `stores` and `composables`. Whoever worked on the requests jumped between four folders, and a new volunteer could not find the parts of one function. The stores called `fetch` themselves.%]

## [%Entscheid|Decision%]

[%Jedes Feature hat einen Ordner in `src/features` mit seinen Seiten, eigenen Komponenten, seinem Store, seinen Routen und einer `index.js`, die festlegt, was andere davon verwenden dürfen. Gemeinsame Bausteine liegen in `src/components`, `src/composables` und `src/utils`, nur `src/api` spricht mit dem Server. Ein Test prüft diese Regeln.|Every feature has a folder in `src/features` with its pages, its own components, its store, its routes and an `index.js` that defines what others may use of it. Shared building blocks live in `src/components`, `src/composables` and `src/utils`, only `src/api` talks to the server. A test checks these rules.%]

## [%Konsequenzen|Consequences%]

[%Wer an einem Feature arbeitet, findet fast alles in einem Ordner. Imports zwischen Features gehen über ihre `index.js` und bleiben überschaubar. Bei Code, den zwei Features brauchen, muss jemand entscheiden, wohin er gehört, und eine neue Regel braucht eine Änderung im Test.|Whoever works on a feature finds almost everything in one folder. Imports between features go through their `index.js` and stay easy to follow. For code that two features need, someone has to decide where it belongs, and a new rule needs a change in the test.%]
