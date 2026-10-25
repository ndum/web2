---
title: Prüfung
description: Rahmen, Kompetenzen, Themengebiete und Lernziele der praktischen Prüfung nach Teil 7.
---

Nach Teil 7 schreibst du eine praktische Prüfung. Sie dauert 60 Minuten und ist Open Book, du darfst also deine Unterlagen verwenden. Eine Übungsprüfung gibt es nicht. Wie die Prüfung und das [Projekt](../project/assignment/) in die Modulnote eingehen, steht unter [Leistungsbeurteilung](../assessment/). Diese Seite beschreibt, welche Kompetenzen die Prüfung abdeckt und welche Themen und Lernziele dazugehören. Welche Hilfsmittel darüber hinaus erlaubt sind und wie die Prüfung abläuft, sagt dir deine Lehrperson.

## Kompetenzen

Der Kurs beschreibt neun Kompetenzen. Die Prüfung deckt die ersten sieben ab, die du in den Teilen 0 bis 7 aufbaust. Nach Teil 7 kannst du

1. die Sprachmittel von JavaScript gezielt einsetzen, die SPA-Frameworks voraussetzen, etwa Module, Destrukturierung, Array-Methoden sowie `async` und `await`,
2. Aufbau und Funktionsweise einer SPA erklären und sie von Webseiten abgrenzen, die der Server rendert,
3. eine Oberfläche in Komponenten zerlegen und diese über Props, Events und Slots verbinden,
4. die Reaktivität von Vue gezielt nutzen und wiederverwendbare Logik in Composables auslagern,
5. clientseitiges Routing mit Parametern, verschachtelten Routen und Guards umsetzen,
6. Zustand bewusst platzieren (lokal, global, auf dem Server oder in der Adresse) und gemeinsamen Zustand mit Pinia verwalten,
7. Daten über eine HTTP-API laden und speichern und dabei Lade-, Fehler- und Leerzustände behandeln.

Die Kompetenzen 8 und 9 erwirbst du im Projekt mit Teil 8. Du entwirfst eine eigene SPA, hältst ihre Entscheide fest, testest sie, gestaltest sie barrierearm und veröffentlichst sie. Dabei setzt du KI-Werkzeuge verantwortungsvoll ein und prüfst generierten Code. Das Projekt baut auf den Kompetenzen 3 bis 7 auf.

## Themengebiete und Lernziele

Die Abschnitte folgen den Teilen des Kurses. Jeder nennt die Kompetenzen, zu denen der Teil gehört, und fasst die Lernziele seiner Kapitel zusammen. Vollständig stehen die Lernziele jeweils am Anfang eines Kapitels.

### Teil 0, Start

Teil 0 richtet deine Arbeitsumgebung ein. Nach dem Kapitel [Einrichten](../start/setup/) kannst du ein Projekt installieren, starten und seine Tests ausführen und Fehler in der Konsole der DevTools lesen. Das brauchst du bei jeder praktischen Aufgabe. Die Grundlagen von JavaScript, die der [Einstiegstest](../start/entry-test/) abfragt, setzt die Prüfung voraus.

### Teil 1, JavaScript für SPAs

Teil 1 gehört zu Kompetenz 1. Das Laden mit `fetch` gehört auch zu Kompetenz 7.

| Kapitel | Du kannst … |
|---|---|
| [Module und Pakete](../javascript/modules/) | Code mit `export` und `import` aufteilen, ein Projekt mit `package.json` beschreiben, Pakete installieren, Skripte starten und erklären, wozu die Lock-Datei dient |
| [Werte und Referenzen](../javascript/values-and-references/) | primitive Werte und Objekte beim Zuweisen unterscheiden, Objekte und Arrays flach und tief kopieren und Daten ändern, ohne das Original zu verändern |
| [Funktionen und Arrays](../javascript/functions-and-arrays/) | Callbacks lesen, Listen mit `map`, `filter`, `find`, `some`, `every` und `reduce` auswerten, sortieren, ohne das Original zu ändern, und Funktionen schreiben, die Funktionen bauen |
| [Asynchrones JavaScript](../javascript/async/) | die Reihenfolge von Timern und Promises vorhersagen, mit `async` und `await` arbeiten, Daten mit `fetch` laden, Fehler des Servers und des Netzes unterscheiden, Lade- und Fehlerzustände zeigen und Anfragen abbrechen |

### Teil 2, SPA-Grundlagen

Teil 2 gehört zu Kompetenz 2.

| Kapitel | Du kannst … |
|---|---|
| [Webseiten und Webapps](../spa/web-pages-and-web-apps/) | erklären, wie eine mehrseitige Website und eine SPA Seiten laden, serverseitiges Rendern und statisch erzeugte Seiten einordnen, die Kosten einer SPA nennen und begründen, ob sich eine SPA lohnt |
| [Eine SPA von Hand](../spa/spa-by-hand/) | eine Oberfläche aus Zustand und Render-Funktion aufbauen, mit Events den Zustand ändern, Text sicher in HTML einsetzen und mit dem Hash der Adresse einen Router bauen |
| [Werkzeuge](../spa/tools/) | eine SPA mit Vite entwickeln und bauen, Entwicklungsserver und Hot Module Replacement erklären, Anfragen über einen Proxy leiten, Umgebungsvariablen und Basispfad setzen und Anfragen in den DevTools untersuchen |

### Teil 3, Einstieg in Vue

Teil 3 legt die Grundlage für die Kompetenzen 3 und 4.

| Kapitel | Du kannst … |
|---|---|
| [Frameworks im Vergleich](../vue/frameworks/) | erklären, was ein Framework einer SPA abnimmt, Vue, React und Angular vergleichen, Zahlen aus Umfragen mit ihren Grenzen lesen und die Begriffe der Frameworks einander zuordnen |
| [Das erste Projekt](../vue/first-project/) | ein Projekt mit create-vue anlegen, seine Dateien erklären, eine Single File Component schreiben, `createApp` und `mount` erklären und die Vue DevTools einsetzen |
| [Template-Syntax](../vue/template-syntax/) | Werte, Attribute, Klassen und Stile binden, mit `v-if` und `v-show` bedingt anzeigen, Listen mit `v-for` und `key` rendern und mit `v-on` auf Events reagieren |
| [Reaktiver Zustand](../vue/reactive-state/) | erklären, warum eine gewöhnliche Variable die Seite nicht aktualisiert, Zustand mit `ref` und `reactive` halten, Werte mit `computed` ableiten und zwischen Funktion und berechnetem Wert wählen |
| [Formulare](../vue/forms/) | Felder mit `v-model` und seinen Modifikatoren binden, ein Formular mit `@submit.prevent` abschicken, Eingaben prüfen und Fehler so zeigen, dass alle sie wahrnehmen |

### Teil 4, Komponenten

Teil 4 gehört zu Kompetenz 3.

| Kapitel | Du kannst … |
|---|---|
| [Oberfläche zerlegen](../components/breaking-down/) | eine Oberfläche in einen Baum von Komponenten mit je einer Aufgabe zerlegen, die Komponenten benennen und ablegen und entscheiden, welche Komponente einen Zustand besitzt |
| [Props](../components/props/) | Props mit `defineProps` und ihrem Typ festlegen, Werte als Text oder als Ausdruck übergeben, Pflicht-Props und Standardwerte einsetzen und erklären, warum Daten nur von der Eltern- zur Kindkomponente fliessen |
| [Events und v-model](../components/events-and-v-model/) | Events mit `defineEmits` deklarieren, auslösen und prüfen, in der Elternkomponente darauf reagieren und `v-model` mit `defineModel` auf eigenen Komponenten umsetzen |
| [Slots](../components/slots/) | Inhalte mit Standard-Slots, Ersatzinhalt, benannten Slots und Scoped Slots übergeben und einen Seitenrahmen und einen zugänglichen Dialog bauen |
| [Provide und Inject](../components/provide-and-inject/) | Werte mit `provide` bereitstellen und mit `inject` holen, Schlüssel in einer eigenen Datei festlegen, die Regeln für den Entwurf von Komponenten anwenden und Inhalte mit `Teleport` verschieben |

### Teil 5, Reaktivität und Composables

Teil 5 gehört zu Kompetenz 4.

| Kapitel | Du kannst … |
|---|---|
| [Reaktivität im Detail](../reactivity/in-detail/) | erklären, wie Vue Abhängigkeiten verfolgt, Fehler mit kopierten Werten und ersetzten Objekten finden, Felder mit `toRef` und `toRefs` verbunden halten, `shallowRef` einsetzen und mit `nextTick` auf die aktualisierte Seite warten |
| [Watcher](../reactivity/watchers/) | mit `watch` und `watchEffect` auf Änderungen reagieren, die Optionen `immediate`, `deep` und `once` einsetzen, mit `onWatcherCleanup` aufräumen und zwischen `computed`, `watch` und `watchEffect` wählen |
| [Lebenszyklus und Template-Refs](../reactivity/lifecycle/) | die Hooks einer Komponente in ihrer Reihenfolge nennen, mit `useTemplateRef` auf Elemente zugreifen, den Fokus setzen und Listener und Timer anlegen und wieder aufräumen |
| [Composables](../reactivity/composables/) | Zustand und Logik in ein Composable auslagern, die Regeln für Namen, Aufruf und Rückgabe anwenden, Argumente mit `toValue` annehmen und einschätzen, wann eine Bibliothek wie VueUse passt |

### Teil 6, Routing

Teil 6 gehört zu Kompetenz 5.

| Kapitel | Du kannst … |
|---|---|
| [Vue Router](../routing/vue-router/) | eine App mit Vue Router einrichten, Seiten mit `RouterView` zeigen und mit `RouterLink` verlinken, Routen benennen, aktive Links gestalten und den History-Modus vom Hash-Modus unterscheiden |
| [Parameter und Query](../routing/params-and-query/) | Routen mit Parametern festlegen und lesen, Parameter als Props übergeben, die Query lesen und schreiben und mit `router.push` und `router.replace` navigieren |
| [Verschachtelte Routen und Layouts](../routing/nested-routes/) | Kindrouten und Layouts mit einer eigenen `RouterView` bauen, eine Startseite für einen Bereich festlegen und aktive von genau aktiven Links unterscheiden |
| [Navigation Guards](../routing/navigation-guards/) | den Ablauf einer Navigation beschreiben, globale Guards und Guards für einzelne Routen schreiben, nach der Anmeldung zum ursprünglichen Ziel zurückführen und erklären, warum ein Guard im Browser keine Daten schützt |
| [Lazy Loading und 404](../routing/lazy-loading-and-404/) | eine Route für unbekannte Adressen festlegen, Routen bei Bedarf laden, das Scrollen mit `scrollBehavior` steuern und nach einer Navigation Titel und Fokus setzen |

### Teil 7, Zustand und Daten

Teil 7 gehört zu den Kompetenzen 6 und 7.

| Kapitel | Du kannst … |
|---|---|
| [Zustand am richtigen Ort](../state/where-state-belongs/) | lokalen, geteilten und globalen Zustand, Daten vom Server und Zustand in der Adresse unterscheiden, Zustand in die Elternkomponente heben oder in ein Modul legen und begründen, wann eine App keinen Store braucht |
| [Pinia](../state/pinia/) | Pinia einrichten, einen Setup Store mit State, Getters und Actions schreiben, ihn mit `storeToRefs` zerlegen, ihn in anderen Stores und in Guards verwenden und Stores testen |
| [Daten von einer API](../state/data-from-an-api/) | Daten in einer Action laden, Lade-, Fehler- und leere Zustände zeigen, Daten als JSON senden, die Antworten der API auswerten, Anfragen abbrechen und erklären, wann CORS nötig ist |
| [Persistenz](../state/persistence/) | Werte als JSON in `localStorage` und `sessionStorage` halten, einen Store mit dem Speicher des Browsers verbinden, Tabs abgleichen, begründen, was nie in diesen Speicher gehört, und eine Anmeldung nach dem Neuladen beim Server erfragen |

## Nicht Teil der Prüfung

Nicht zur Prüfung gehören die beiden Exkurse [Proxy und Getter](../javascript/proxies/) und [Server-State-Bibliotheken](../state/server-state/), die [Wahlthemen](../optional/overview/) und Teil 8. Die [JS-Werkstatt](../js/) ist kein eigenes Themengebiet, ihre Grundlagen brauchst du aber in jeder Aufgabe.

## Vorbereitung

Am Ende jedes Teils steht ein Kompetenzraster. Löse seine Prüfaufgaben, ohne nachzuschauen, und arbeite die Zeilen nach, bei denen du unsicher bist. Die Raster der Teile 0 bis 7 findest du auf diesen Seiten.

- [Kompetenzraster für Teil 0](../start/competences/)
- [Kompetenzraster für Teil 1](../javascript/competences/)
- [Kompetenzraster für Teil 2](../spa/competences/)
- [Kompetenzraster für Teil 3](../vue/competences/)
- [Kompetenzraster für Teil 4](../components/competences/)
- [Kompetenzraster für Teil 5](../reactivity/competences/)
- [Kompetenzraster für Teil 6](../routing/competences/)
- [Kompetenzraster für Teil 7](../state/competences/)

Im Kursrepo liegt im Ordner `case` der Stand der Fallbeispiel-App nach jedem Teil. Dort siehst du, wie die Aufträge von Martina Hostettler als fertiger Code aussehen. Vor der Prüfung bleibt Zeit für deine Fragen, bring sie aus den Rastern mit.

Weil du deine Unterlagen verwenden darfst, lohnt sich Ordnung. Leg deine Lösungen der Übungsprojekte und deine Notizen so ab, dass du sie schnell findest. Nachschlagen hilft bei Details, in 60 Minuten bleibt aber keine Zeit, ein Thema neu zu lernen.
