# 1. [%History-Modus mit absolutem Basispfad|History mode with an absolute base path%]

## Status

[%Angenommen in Teil 6, nachträglich festgehalten in Teil 8.|Accepted in part 6, written down in part 8.%]

## [%Kontext|Context%]

[%Jede Seite der App bekommt eine eigene Adresse, etwa `/items/6` für den Beamer. Martina Hostettler will Mitgliedern Links auf einzelne Dinge schicken. Vue Router kennt den History-Modus mit gewöhnlichen Pfaden und den Hash-Modus, der den Pfad hinter `#` versteckt. Im History-Modus fragt der Browser beim Neuladen den Server nach `/items/6`.|Every page of the app gets an address of its own, such as `/items/6` for the projector. Martina Hostettler wants to send members links to single things. Vue Router has the history mode with ordinary paths and the hash mode, which hides the path behind `#`. In history mode, the browser asks the server for `/items/6` on a reload.%]

## [%Entscheid|Decision%]

[%Die App verwendet `createWebHistory` mit dem Basispfad von Vite. `base` ist der absolute Pfad `/`, damit der Browser die Dateien der App auch unter `/items/6` findet.|The app uses `createWebHistory` with the base path of Vite. `base` is the absolute path `/`, so the browser finds the files of the app below `/items/6` as well.%]

## [%Konsequenzen|Consequences%]

[%Die Adressen sehen aus wie die einer Website und lassen sich teilen. Jeder Server muss für unbekannte Pfade `index.html` liefern. Vite tut das in der Entwicklung, auf GitHub Pages hilft eine Kopie von `index.html` als `404.html`. Die Demo auf der Kursseite weicht davon ab, siehe ADR 7.|The addresses look like those of a website and can be shared. Every server has to deliver `index.html` for unknown paths. Vite does that during development, on GitHub Pages a copy of `index.html` as `404.html` helps. The demo on the course site differs, see ADR 7.%]
