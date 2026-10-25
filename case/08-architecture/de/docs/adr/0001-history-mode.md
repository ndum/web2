# 1. History-Modus mit absolutem Basispfad

## Status

Angenommen in Teil 6, nachträglich festgehalten in Teil 8.

## Kontext

Jede Seite der App bekommt eine eigene Adresse, etwa `/items/6` für den Beamer. Martina Hostettler will Mitgliedern Links auf einzelne Dinge schicken. Vue Router kennt den History-Modus mit gewöhnlichen Pfaden und den Hash-Modus, der den Pfad hinter `#` versteckt. Im History-Modus fragt der Browser beim Neuladen den Server nach `/items/6`.

## Entscheid

Die App verwendet `createWebHistory` mit dem Basispfad von Vite. `base` ist der absolute Pfad `/`, damit der Browser die Dateien der App auch unter `/items/6` findet.

## Konsequenzen

Die Adressen sehen aus wie die einer Website und lassen sich teilen. Jeder Server muss für unbekannte Pfade `index.html` liefern. Vite tut das in der Entwicklung, auf GitHub Pages hilft eine Kopie von `index.html` als `404.html`. Die Demo auf der Kursseite weicht davon ab, siehe ADR 7.
