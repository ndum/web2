---
title: Oberfläche zerlegen
description: Eine Oberfläche anhand eines Entwurfs in einen Baum von Komponenten zerlegen, jeder Komponente eine Aufgabe und einen Namen geben und entscheiden, wer welche Daten besitzt.
sidebar:
  order: 1
---

:::assignment
Der Freiwillige hat sich `App.vue` angesehen und einen Vorschlag gemacht. «Wir zerlegen die App in Komponenten, dann muss niemand mehr 180 Zeilen verstehen, um das Formular zu ändern.» Martina Hostettler ist einverstanden. «Hauptsache, die Mitglieder merken nichts davon.»

> Als Freiwilliger möchte ich die App in kleine Komponenten mit je einer Aufgabe zerlegen, damit ich eine Stelle ändern kann, ohne den Rest zu verstehen.

Die Akzeptanzkriterien lauten:

1. Ein Baum zeigt alle Komponenten der App und die Aufgabe jeder Komponente.
2. Jede Komponente hat einen Namen aus mehreren Wörtern und eine eigene Datei.
3. Für jeden Zustand ist festgelegt, welche Komponente ihn besitzt.
4. Kopf, Fuss und Öffnungszeiten sind schon eigene Komponenten, und die Seite sieht aus wie vorher.
:::

:::goals
Nach diesem Kapitel kannst du

- eine Oberfläche anhand eines Entwurfs in einen Baum von Komponenten zerlegen,
- jeder Komponente genau eine Aufgabe geben und sie passend benennen,
- Komponenten in Dateien und Ordnern ablegen,
- entscheiden, welche Komponente einen Zustand besitzt,
- Teile ohne Daten in eigene Komponenten auslagern.

Du brauchst dafür Single File Components aus dem Kapitel «Das erste Projekt».
:::

## Der Baum der Komponenten

`App.vue` enthält am Ende von Teil 3 den Katalog, die Suche, den Filter, die Seite eines Dings und das Formular mit seinen Regeln. Wer das Formular ändert, scrollt an der Suche vorbei, und eine Änderung an einer Stelle kann eine andere treffen. Spätestens dann lohnt es sich, die App zu zerlegen.

Am einfachsten geht das mit einem Entwurf der Seite, einer Skizze auf Papier oder einem Bildschirmfoto. Du zeichnest Rahmen um die Bereiche, die zusammengehören. Jeder Rahmen wird eine Komponente, und Rahmen in einem anderen Rahmen werden ihre Kinder. So entsteht ein Baum mit `App` an der Spitze.

![Der Baum der Komponenten aus dem Entwurf. Links ein Entwurf der Seite mit dem Katalog. Der Kopf heisst AppHeader, das Suchfeld SearchBar, die Auswahl der Kategorie CategoryFilter, die Liste ItemList mit einer ItemCard für jedes Ding und der Fuss AppFooter. Rechts der Baum der ganzen App. App enthält AppHeader, CatalogView, ItemView und AppFooter. CatalogView enthält SearchBar, CategoryFilter und ItemList mit ItemCard, ItemView enthält ReservationForm und BaseDialog, AppFooter enthält OpeningHours. App besitzt Katalog, Favoriten, Suchtext und Kategorie, ReservationForm die Anfrage.](../../../assets/figures/de/p4c1-component-tree.svg)

`CatalogView` und `ItemView` sind die beiden Seiten der App. Sie setzen die Bausteine darunter zusammen. In Teil 6 übernimmt Vue Router den Wechsel zwischen ihnen. `BaseDialog` kommt in Teil 4 erst später dazu, der Baum zeigt schon das Ziel.

## Eine Aufgabe pro Komponente

Eine gute Komponente lässt sich in einem Satz ohne «und» beschreiben. `ItemCard` zeigt ein Ding. `SearchBar` nimmt einen Suchtext entgegen. `ReservationForm` sammelt eine Anfrage und prüft sie. Brauchst du für eine Komponente ein «und», etwa «zeigt den Katalog und das Formular», steckt darin mehr als eine Aufgabe.

Zu klein ist auch nicht gut. Eine Komponente für einen einzelnen Absatz bringt eine Datei mehr, aber keinen Gewinn. Gute Kandidaten sind Teile, die sich wiederholen, wie die Karte eines Dings, und Teile mit eigener Logik, wie das Formular oder die Öffnungszeiten.

## Namen und Dateien

Komponenten bekommen Namen aus mehreren Wörtern in PascalCase, damit sie sich nicht mit HTML-Elementen wie `header` oder `footer` verwechseln lassen. Der Styleguide von Vue empfiehlt dazu einige Konventionen.

1. Komponenten, die es in der App nur einmal gibt, tragen ein gemeinsames Präfix. Der Styleguide nennt `The`, wie bei `TheWelcome` im Beispiel von create-vue. Der Kurs verwendet `App`, wie bei `AppHeader` und `AppFooter`.
2. Allgemeine Bausteine ohne Bezug zur App beginnen mit `Base`, wie `BaseDialog`.
3. Namen gehen vom Allgemeinen zum Besonderen, darum heissen die Teile des Katalogs `ItemList` und `ItemCard` und nicht `ListOfItems`.

Jede Komponente bekommt eine eigene Datei mit ihrem Namen. Bausteine liegen in `src/components`, ganze Seiten wie `CatalogView` in `src/views`. Diesen Ordner verwendet auch create-vue, sobald du den Router auswählst.

## Der Ort für den Zustand

Jeder Zustand gehört genau einer Komponente. Sie hält ihn, ändert ihn und gibt ihn an die Komponenten darunter weiter. Welche das ist, folgt aus einer Regel. Der Zustand gehört in die tiefste Komponente, die über allen Komponenten liegt, die ihn brauchen.

1. Den Katalog brauchen `CatalogView` und `ItemView`. Die tiefste Komponente über beiden ist `App`.
2. Den Suchtext braucht nur `CatalogView`. Er soll aber erhalten bleiben, wenn jemand ein Ding öffnet und zurückkehrt. In dieser Zeit verschwindet `CatalogView`, darum gehört auch der Suchtext zu `App`.
3. Die Favoriten brauchen die Karten und der Kopf, also wieder `App`.
4. Die Felder der Anfrage braucht nur `ReservationForm`, sie bleiben dort.

Wie Daten von `App` zu den Karten kommen, zeigt das Kapitel «Props». Wie eine Karte `App` meldet, dass jemand reservieren will, zeigt das Kapitel «Events und v-model».

## Teile ohne Daten auslagern

Am einfachsten lagerst du Teile aus, die nichts von aussen brauchen, den Kopf, den Fuss und die Öffnungszeiten. Schau dir an, wie das Beispiel die Seite zusammensetzt, und überleg dir, welche Komponenten es gibt, bevor du es öffnest.

::playground{dir="examples/04-components/split-layout"}

`App.vue` ist kurz geworden und liest sich wie ein Inhaltsverzeichnis. `AppFooter` verwendet seinerseits `OpeningHours`, Komponenten lassen sich also beliebig tief verschachteln. Der Style wandert mit der Komponente in ihre Datei und gilt dank `scoped` nur dort.

## Eine Karte für ein Ding

Die Karte eines Dings ist der nächste Kandidat, denn sie wiederholt sich für jedes Ding. Sie braucht aber Daten, den Namen, die Kategorie und die Verfügbarkeit. Ohne einen Weg, ihr diese Daten zu geben, steht ihr Inhalt fest im Template.

::playground{dir="examples/04-components/props-start"}

Alle drei Karten zeigen die Bohrmaschine. Die Komponente ist richtig ausgelagert, aber sie kann noch nichts Verschiedenes zeigen. Das ändert das nächste Kapitel.

## Im Code

Arbeite mit dem Beispiel zum Kopf und zum Fuss. Lies zuerst die Dateien und schreib auf, was du erwartest, bevor du etwas änderst.

1. Zeichne den Baum der Komponenten des Beispiels, bevor du den Playground öffnest. Stimmt er mit dem überein, was die Vorschau zeigt?
2. Ändere die Öffnungszeit am Samstag. In wie vielen Dateien musst du dafür etwas ändern, und in welchen nicht?
3. Lagere die Zeile mit der Adresse aus `AppFooter` in eine neue Komponente `AppAddress.vue` aus und binde sie im Fuss ein.
4. Überleg dir, warum `OpeningHours` in `AppFooter` steht und nicht direkt in `App`. Wann wäre `App` der bessere Ort?

## Aufgaben

Die Aufgaben zerlegen eine verkürzte Fassung der App aus Teil 3. Du findest das Projekt im Kursrepo im Ordner `exercises/04-components/breaking-down/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Lagere den Kopf aus `App.vue` in die Komponente `src/components/AppHeader.vue` aus und binde sie in `App.vue` mit dem Alias `@` ein. Die Seite sieht danach aus wie vorher.

:::solution[Lösung]
::code{file="exercises/04-components/breaking-down/solution/{lang}/src/components/AppHeader.vue"}

In `App.vue` stehen danach der Import `import AppHeader from '@/components/AppHeader.vue'` und an der Stelle des Kopfs `<AppHeader />`. Der Style des Kopfs gehört jetzt der Komponente und gilt dank `scoped` nur für sie.
:::
::::

::::exercise[Vertiefung]
Lagere den Fuss in die Komponente `AppFooter.vue` aus. Die Öffnungszeiten darin werden zur eigenen Komponente `OpeningHours.vue`, die `AppFooter` verwendet. Danach enthält `App.vue` weder ein Element `header` noch ein Element `footer`.

:::solution[Lösung]
::code{file="exercises/04-components/breaking-down/solution/{lang}/src/components/AppFooter.vue"}

`OpeningHours.vue` enthält die Überschrift und die beiden Zeilen mit den Zeiten aus `App.vue`. Das Template von `App.vue` besteht danach aus drei Teilen.

::code{file="exercises/04-components/breaking-down/solution/{lang}/src/App.vue" lines="16-30"}
:::
::::

::::exercise[Knobelei]
`OpeningHours` soll unter den Zeiten in einem Element mit der Klasse `today` sagen, ob heute offen ist. Am Mittwoch steht dort «Heute offen, 17 bis 19 Uhr», am Samstag «Heute offen, 10 bis 13 Uhr», an allen anderen Tagen «Heute geschlossen, nächste Öffnung am Mittwoch» oder «Heute geschlossen, nächste Öffnung am Samstag». `new Date().getDay()` liefert 0 für Sonntag bis 6 für Samstag.

:::solution[Lösung]
::code{file="exercises/04-components/breaking-down/solution/{lang}/src/components/OpeningHours.vue"}

Die Öffnungstage stehen einmal in einem Array, und die Zeilen mit den Zeiten entstehen mit `v-for` daraus. `find` sucht den heutigen Tag, und wenn keiner passt, den nächsten Öffnungstag in derselben Woche. Nach Samstag gibt es keinen solchen Tag mehr, darum folgt mit `??` wieder der Mittwoch. Hier gilt `getDay` mit der Zeitzone des Geräts, denn es geht um den heutigen Tag der Person, die die Seite öffnet. Die ganze Logik steckt in `OpeningHours`, und weder `AppFooter` noch `App` müssen davon wissen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Für jedes Element entsteht eine eigene Komponente. | Nur Teile mit einer eigenen Aufgabe auslagern, etwa Wiederholungen und Teile mit eigener Logik. |
| Eine Komponente heisst `Header` oder `Card`. | Namen aus mehreren Wörtern wählen, etwa `AppHeader` und `ItemCard`. |
| Zwei Komponenten halten denselben Zustand, etwa den Suchtext, und laufen auseinander. | Jeden Zustand genau einer Komponente geben und von dort weiterreichen. |
| Der Suchtext geht verloren, wenn jemand ein Ding öffnet und zurückkehrt. | Den Zustand in eine Komponente legen, die beim Wechsel der Seite bestehen bleibt. |
| Eine ausgelagerte Komponente importiert die Daten selbst, obwohl `App` sie schon lädt. | Daten von oben übergeben, das zeigt das Kapitel «Props». |
| Ein KI-Assistent registriert jede Komponente mit `app.component` in `main.js`. | Komponenten dort importieren, wo sie gebraucht werden. So bleibt sichtbar, woher sie kommen, und der Build lässt Unbenutztes weg. |

## Selbstcheck

::::selfcheck
1. Woran erkennst du, dass eine Komponente zu viel tut?
2. Welche Präfixe verwendet der Kurs für Komponenten, die es nur einmal gibt, und für allgemeine Bausteine?
3. Nach welcher Regel entscheidest du, welche Komponente einen Zustand besitzt?
4. Warum besitzt `App` den Suchtext und nicht `CatalogView`?

:::solution[Antworten]
1. Ihre Aufgabe lässt sich nicht in einem Satz ohne «und» beschreiben, ihr Template ist lang, und sie hält Zustand, der nichts miteinander zu tun hat.
2. `App` für Komponenten, die es nur einmal gibt, wie `AppHeader`, und `Base` für allgemeine Bausteine, wie `BaseDialog`.
3. Der Zustand gehört in die tiefste Komponente, die über allen Komponenten liegt, die ihn brauchen.
4. `CatalogView` verschwindet, wenn jemand ein Ding öffnet. Der Suchtext soll das überstehen, darum liegt er in `App`, die immer da ist.
:::
::::

:::assignment
Die Seite sieht aus wie vorher, und der Freiwillige findet sich in den Dateien schneller zurecht. Die Karte eines Dings ist schon eine eigene Komponente, zeigt aber für jedes Ding dieselben Angaben. Im nächsten Kapitel bekommt sie ihre Daten.
:::
