---
title: Glossar
description: Die Fachbegriffe des Kurses in ein bis zwei Sätzen, mit dem Kapitel, das sie einführt.
---

Das Glossar erklärt die Fachbegriffe des Kurses kurz und verweist auf das Kapitel, das sie einführt. Viele Begriffe der Webentwicklung bleiben auch auf den deutschen Seiten englisch, etwa Props, Slots, Store, Router oder Composable. So findest du sie in der Dokumentation, in Fehlermeldungen und im Code wieder.

| Begriff | Bedeutung | Kapitel |
|---|---|---|
| ADR | Ein Architecture Decision Record hält einen Architekturentscheid mit Titel, Status, Kontext, Entscheid und Folgen in einer kurzen Datei fest. | [8.3](../architecture/architecture-decisions/) |
| Action | Eine Funktion in einem Store, die seinen Zustand ändert, oft nach einer Anfrage an den Server. | [7.2](../state/pinia/) |
| Adapter | Eine Schicht, die eine fremde Schnittstelle wie `fetch` hinter eigenen Funktionen versteckt, damit sich die Umsetzung austauschen lässt. | [8.2](../architecture/design-patterns/) |
| API | Die Schnittstelle, über die eine App Daten von einem Server holt und an ihn schickt. Im Kurs ist das die Kurs-API, die JSON über HTTP liefert. | [7.3](../state/data-from-an-api/) |
| `async` und `await` | Eine Schreibweise, mit der sich asynchroner Code wie gewöhnlicher Code von oben nach unten liest. `await` wartet, bis ein Promise erfüllt ist. | [1.4](../javascript/async/) |
| Barrierefreiheit | Eine App lässt sich auch mit der Tastatur, mit einem Screenreader oder mit starker Vergrösserung bedienen. | [8.5](../architecture/accessibility/) |
| Build | Der Schritt, in dem Vite den Code für die Veröffentlichung bündelt und verkleinert. Das Ergebnis liegt im Ordner `dist`. | [2.3](../spa/tools/) |
| Callback | Eine Funktion, die du einer anderen Funktion übergibst, damit diese sie später aufruft, etwa bei `map` oder bei einem Event. | [1.3](../javascript/functions-and-arrays/) |
| Closure | Eine Funktion, die sich die Variablen der Umgebung merkt, in der sie entstanden ist. | [1.3](../javascript/functions-and-arrays/) |
| Composable | Eine Funktion, die Zustand und Logik mit der Composition API bündelt, damit mehrere Komponenten sie verwenden. Ihr Name beginnt mit `use`. | [5.4](../reactivity/composables/) |
| `computed` | Ein Wert, den Vue aus anderen reaktiven Werten berechnet und erst dann neu berechnet, wenn sich einer davon ändert. | [3.4](../vue/reactive-state/) |
| CORS | Cross-Origin Resource Sharing erlaubt einer Seite, Daten von einer anderen Herkunft zu lesen, wenn der Server dieser Herkunft es zulässt. Ohne diese Erlaubnis blockiert der Browser die Antwort. | [7.3](../state/data-from-an-api/) |
| Deployment | Die gebaute App wird auf einem Server veröffentlicht, im Kurs auf GitHub Pages. | [8.6](../architecture/build-and-deployment/) |
| Direktive | Ein Attribut im Template wie `v-if`, `v-for` oder `v-on`, das Vue sagt, was es mit einem Element tun soll. | [3.3](../vue/template-syntax/) |
| Event | Eine Meldung einer Kindkomponente an ihre Elternkomponente, die sie mit `emit` auslöst. | [4.3](../components/events-and-v-model/) |
| Event Loop | Der Mechanismus, der wartende Aufgaben wie Timer oder Antworten vom Server ausführt, sobald der Aufrufstapel leer ist. | [1.4](../javascript/async/) |
| Framework | Ein Grundgerüst, das einer App Aufgaben wie Rendern, Reaktivität und Routing abnimmt, etwa Vue, React oder Angular. | [3.1](../vue/frameworks/) |
| Getter | In einem Store ein abgeleiteter Wert wie `computed` in einer Komponente. In JavaScript allgemein eine Funktion, die beim Lesen einer Eigenschaft läuft. | [1.5](../javascript/proxies/), [7.2](../state/pinia/) |
| Hash-Modus | Routing, bei dem der Pfad nach dem Zeichen `#` in der Adresse steht. Diesen Teil schickt der Browser nie an den Server. | [2.2](../spa/spa-by-hand/), [6.1](../routing/vue-router/) |
| History-Modus | Routing mit gewöhnlichen Pfaden wie `/items/6`. Der Server muss dafür bei jeder Adresse die App ausliefern. | [6.1](../routing/vue-router/) |
| Hot Module Replacement | Vite ersetzt geänderte Teile wie CSS oder eine Vue-Komponente im laufenden Browser, ohne die ganze Seite neu zu laden. | [2.3](../spa/tools/) |
| Komponente | Ein Baustein der Oberfläche mit eigenem Template, eigener Logik und eigenem Stil. | [4.1](../components/breaking-down/) |
| Lazy Loading | Der Code einer Route wird erst geladen, wenn jemand sie öffnet. | [6.5](../routing/lazy-loading-and-404/) |
| Lebenszyklus | Die Phasen einer Komponente vom Erstellen über das Einhängen bis zum Entfernen. Hooks wie `onMounted` laufen in diesen Phasen. | [5.3](../reactivity/lifecycle/) |
| `localStorage` | Ein Speicher des Browsers, der Text pro Herkunft behält, auch nachdem der Browser geschlossen wurde. | [7.4](../state/persistence/) |
| Lock-Datei | Eine Datei wie `package-lock.json`, die die genauen Versionen aller installierten Pakete festhält. | [1.1](../javascript/modules/) |
| Modul | Eine Datei mit eigenem Gültigkeitsbereich, die Werte mit `export` freigibt und mit `import` aus anderen Modulen holt. | [1.1](../javascript/modules/) |
| MPA | Eine mehrseitige Website, bei der jeder Klick auf einen Link eine neue HTML-Seite vom Server lädt. | [2.1](../spa/web-pages-and-web-apps/) |
| Navigation Guard | Eine Funktion, die Vue Router bei einer Navigation aufruft. Ein Guard vor dem Wechsel kann ihn erlauben, umleiten oder abbrechen. | [6.4](../routing/navigation-guards/) |
| npm | Die Paketverwaltung von Node.js. Sie installiert Pakete und startet die Skripte aus `package.json`. | [1.1](../javascript/modules/) |
| Parameter | Ein veränderlicher Teil eines Pfads wie `:id` in `/items/:id`. | [6.2](../routing/params-and-query/) |
| Persistenz | Zustand bleibt erhalten, wenn jemand die Seite neu lädt oder später wiederkommt. | [7.4](../state/persistence/) |
| Pinia | Die Bibliothek für Stores in Vue. | [7.2](../state/pinia/) |
| Promise | Ein Objekt für ein Ergebnis, das erst später feststeht. Ein Promise wird erfüllt oder abgelehnt. | [1.4](../javascript/async/) |
| Props | Werte, die eine Elternkomponente an eine Kindkomponente übergibt. Die Kindkomponente liest sie, ändert sie aber nicht. | [4.2](../components/props/) |
| Provide und Inject | Eine Komponente stellt mit `provide` einen Wert bereit, und Komponenten weiter unten im Baum holen ihn mit `inject`. | [4.5](../components/provide-and-inject/) |
| Proxy | In JavaScript ein Objekt, das Zugriffe auf ein anderes Objekt abfängt, die Grundlage der Reaktivität von Vue. Bei Vite leitet ein Proxy des Entwicklungsservers Anfragen an einen anderen Server weiter. | [1.5](../javascript/proxies/), [2.3](../spa/tools/) |
| Query | Der Teil der Adresse nach dem Zeichen `?`, etwa `?q=säge`, für Suche und Filter. | [6.2](../routing/params-and-query/) |
| Reaktivität | Vue merkt sich, welche Werte ein Template oder ein `computed` liest, und aktualisiert die Oberfläche, wenn sich diese Werte ändern. | [5.1](../reactivity/in-detail/) |
| `ref` | Ein reaktiver Behälter für einen Wert. Im Script liest und schreibst du ihn über `.value`. | [3.4](../vue/reactive-state/) |
| Render-Funktion | Eine Funktion, die aus dem Zustand HTML erzeugt. Im Kurs baust du sie zuerst von Hand. | [2.2](../spa/spa-by-hand/) |
| Route | Die Zuordnung eines Pfads zu einer Seite der App. | [6.1](../routing/vue-router/) |
| Router | Der Teil der App, der die Adresse liest und die passende Seite zeigt. In Vue ist das Vue Router. | [6.1](../routing/vue-router/) |
| Server State | Daten, die dem Server gehören und die eine App nur zwischenspeichert, etwa der Katalog. | [7.5](../state/server-state/) |
| `sessionStorage` | Ein Speicher des Browsers, der Text nur behält, bis der Tab geschlossen wird. | [7.4](../state/persistence/) |
| Single File Component | Eine Datei mit der Endung `.vue`, die Template, Script und Stil einer Komponente enthält. | [3.2](../vue/first-project/) |
| Single Page Application | Eine Webapp, die einmal lädt und danach die Seiten im Browser wechselt, ohne neue HTML-Seiten vom Server zu holen. | [2.1](../spa/web-pages-and-web-apps/) |
| Slot | Ein Platzhalter in einer Komponente, den die Elternkomponente mit eigenem Inhalt füllt. | [4.4](../components/slots/) |
| SSR | Beim serverseitigen Rendern erzeugt der Server das HTML einer Seite, bevor der Browser es bekommt. | [2.1](../spa/web-pages-and-web-apps/) |
| Store | Ein gemeinsamer Zustand mit Actions und Getters, den mehrere Komponenten verwenden. | [7.2](../state/pinia/) |
| Teleport | Vue zeigt einen Teil einer Komponente an einer anderen Stelle im DOM, etwa einen Dialog am Ende der Seite. | [4.5](../components/provide-and-inject/) |
| Template | HTML mit der Syntax von Vue, aus dem Vue die Oberfläche einer Komponente erzeugt. | [3.3](../vue/template-syntax/) |
| Template-Ref | Ein Verweis auf ein Element im Template, etwa um den Fokus zu setzen. In Vue holst du ihn mit `useTemplateRef`. | [5.3](../reactivity/lifecycle/) |
| Test | Code, der prüft, ob anderer Code tut, was er soll. Im Kurs schreibst du Tests mit Vitest und Vue Test Utils. | [8.4](../architecture/testing/) |
| Umgebungsvariable | Ein Wert wie die Adresse der API, den Vite aus Dateien wie `.env.local` liest. Im Code steht er unter `import.meta.env`. | [2.3](../spa/tools/) |
| `v-model` | Eine Bindung in beide Richtungen zwischen einem Eingabefeld oder einer Komponente und einem Wert. | [3.5](../vue/forms/), [4.3](../components/events-and-v-model/) |
| Vite | Ein Werkzeug mit Entwicklungsserver und Build für Webprojekte, das auch create-vue einrichtet. | [2.3](../spa/tools/) |
| Watcher | Eine Funktion, die nach der Änderung eines Werts etwas auslöst, etwa Speichern oder eine Anfrage. In Vue schreibst du sie mit `watch` oder `watchEffect`. | [5.2](../reactivity/watchers/) |
| Zustand | Die Daten, die sich eine App gerade merkt und aus denen sie die Oberfläche zeichnet. | [7.1](../state/where-state-belongs/) |
