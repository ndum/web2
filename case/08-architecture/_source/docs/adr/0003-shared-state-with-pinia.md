# 3. [%Geteilter Zustand mit Pinia|Shared state with Pinia%]

## Status

[%Angenommen in Teil 7, nachträglich festgehalten in Teil 8.|Accepted in part 7, written down in part 8.%]

## [%Kontext|Context%]

[%Kopf, Katalog, Guard und Formular brauchen die Anmeldung, die Favoriten und die Anfragen. `App` hat sie mit `provide` bereitgestellt, und jede neue Seite brauchte wieder einen Teil davon. Ein Modul mit `ref` hätte gereicht, zeigt seine Änderungen aber nicht in den Entwicklertools und lässt sich in Tests schwerer vorbereiten.|The header, the catalog, the guard and the form need the login, the favorites and the requests. `App` provided them with `provide`, and every new page needed some of them again. A module with `ref` would have done, but it shows its changes in no developer tools and is harder to prepare in tests.%]

## [%Entscheid|Decision%]

[%Die App hält geteilten Zustand in Setup Stores von Pinia, je einen für Katalog, Anmeldung, Favoriten und Anfragen. Zustand, den nur eine Komponente braucht, bleibt in der Komponente, und der Filter bleibt in der Adresse.|The app keeps shared state in setup stores of Pinia, one each for the catalog, the login, the favorites and the requests. State that only one component needs stays in that component, and the filter stays in the address.%]

## [%Konsequenzen|Consequences%]

[%Die Vue DevTools zeigen die Stores, und Tests starten mit einem frischen Pinia. Die App hängt von einem weiteren Paket ab. Wer einen Store zerlegt, braucht `storeToRefs`, sonst gehen die Verbindungen verloren.|The Vue DevTools show the stores, and tests start with a fresh Pinia. The app depends on one more package. Whoever takes a store apart needs `storeToRefs`, otherwise the connections get lost.%]
