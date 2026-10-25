---
title: Eine SPA von Hand
description: Eine SPA ohne Framework bauen, mit einem Zustand, einer Render-Funktion, Events und einem Router auf dem Hash, und sehen, wo die Handarbeit an Grenzen stösst.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler möchte verstehen, wie eine SPA funktioniert, bevor die Freiwilligen ein Werkzeug wählen.

> Als Mitglied möchte ich den Katalog im Browser durchsehen und für jedes Ding eine eigene Seite öffnen, damit ich einer Freundin einen Link auf genau dieses Ding schicken kann.

Die Akzeptanzkriterien lauten:

1. Der Katalog zeigt alle Dinge mit Name, Kategorie und Verfügbarkeit.
2. Ein Klick auf ein Ding öffnet seine Seite mit dem Pfand und dem Datum, ab dem es wieder da ist. Die Adresse ändert sich, und ein Link auf diese Adresse öffnet direkt diese Seite.
3. Der Knopf «Zurück» des Browsers führt zurück zum Katalog.
4. Während des Ladens und bei einem Fehler des Servers erscheint eine verständliche Meldung.
:::

:::goals
Nach diesem Kapitel kannst du

- eine Oberfläche aus einem Zustand und einer Render-Funktion aufbauen,
- Events so behandeln, dass sie den Zustand ändern und neu zeichnen,
- Text sicher in HTML einsetzen,
- mit dem Hash der Adresse einen Router bauen, der Links und den Knopf «Zurück» unterstützt,
- erklären, wo das Aktualisieren der Seite von Hand an Grenzen stösst.

Du brauchst dafür DOM und Events aus der [JS-Werkstatt](../../js/dom-and-events/) und das Laden mit `fetch` aus dem Kapitel [Asynchrones JavaScript](../../javascript/async/).
:::

## Ein Zustand für die ganze App

Eine SPA beruht auf einem Gedanken, den auch Vue verwendet. Alles, was die Seite zeigt, steht in einem Objekt, dem Zustand. Eine Funktion `render` liest den Zustand und baut daraus die Seite. Wenn etwas passiert, ein Klick, eine Eingabe, eine Antwort des Servers, ändert der Code nur den Zustand und ruft `render` wieder auf.

::code{file="examples/02-spa/spa-by-hand/{lang}/state.html"}

Der Klick auf den Knopf ändert nicht den Absatz, sondern `state.reservations`. Danach zeichnet `render` die Seite neu. Weil `render` den Knopf jedes Mal durch einen neuen ersetzt, hängt der Listener nicht am Knopf, sondern am Container. Ein Klick steigt im DOM nach oben, und `data-action` sagt, was zu tun ist. Dieses Muster heisst Event-Delegation, die Einheit [DOM und Events](../../js/dom-and-events/) zeigt es genauer.

![Der Kreislauf der SPA von Hand. Vier Kästchen bilden einen Kreislauf. Der Zustand ist ein Objekt mit status, items und route. Die Funktion render liest den Zustand und schreibt daraus die Seite. Auf der Seite lösen Klicks, Eingaben und hashchange Events aus. Die Handler der Events ändern den Zustand, und der Kreislauf beginnt von vorn.](../../../assets/figures/de/p2c2-render-loop.svg)

Der Kreislauf hat einen Vorteil. Was die Seite zeigt, hängt nur vom Zustand ab. Wer wissen will, warum etwas auf der Seite steht, schaut in den Zustand, nicht in eine lange Reihe von Änderungen am DOM.

## Die Render-Funktion

Die Render-Funktion baut HTML als Text mit Template Literals und setzt ihn mit `innerHTML` ein. Für eine Liste wandelt `map` jedes Ding in einen Eintrag um, und `join('')` fügt die Einträge zusammen.

::code{file="examples/02-spa/spa-by-hand/{lang}/render.html"}

Das dritte Ding hat einen Namen, der wie HTML aussieht. Ohne Vorsicht würde `innerHTML` daraus ein Element machen und dessen Code ausführen. Darum geht jeder Text, der aus Daten stammt, durch `escapeHtml`. Die Funktion ersetzt die Zeichen, die in HTML eine Bedeutung haben, durch ihre Schreibweise als Text. Die Ausgabe zeigt, dass kein Bild entstanden ist und der Name als Text dasteht. Feste Texte wie «Verfügbar» schreibt der Code selbst, sie brauchen das nicht.

## Ein Router mit dem Hash

Eine SPA zeigt verschiedene Ansichten unter verschiedenen Adressen. Am einfachsten geht das mit dem Hash, dem Teil der Adresse nach dem Zeichen `#`. Ändert sich nur der Hash, lädt der Browser keine neue Seite. Er trägt die neue Adresse in die Liste für den Knopf «Zurück» ein und löst das Event `hashchange` aus.

::code{file="examples/02-spa/spa-by-hand/{lang}/router.html"}

`parseRoute` übersetzt den Hash in eine Route, ein Objekt mit einem Namen und, wenn nötig, der Nummer des Dings. Ein regulärer Ausdruck erkennt Adressen wie `#/items/6`, `Number` macht aus dem Text eine Zahl, damit der Vergleich mit `===` klappt. `render` wählt je nach Route die Ansicht. Die Links sind gewöhnliche Links auf einen Hash, `<a href="#/items/6">`. Ein Klick ändert die Adresse, `hashchange` ruft `render` auf, und der Knopf «Zurück» funktioniert von selbst.

Den Hash schickt der Browser nie an den Server. Für den Server gibt es nur eine Seite, egal welches Ding gerade angezeigt wird. Darum funktioniert ein Link wie `http://localhost:3000/#/items/6` auch als erste Adresse, die jemand öffnet. Schönere Adressen ohne `#` sind mit der History API möglich, die Teil 6 mit Vue Router verwendet.

## Die SPA mit Daten

Im Übungsprojekt kommen die Teile zusammen. Die Funktion `start` legt den Zustand an, zeichnet eine Meldung zum Laden, lädt den Katalog mit `loadItems` aus Teil 1 und zeichnet danach den Katalog oder die Meldung eines Fehlers.

::code{file="exercises/02-spa/spa-by-hand/{lang}/app/app.js"}

Der Zustand hält neben den Dingen auch `status` und `error` aus dem Kapitel [Asynchrones JavaScript](../../javascript/async/) und die aktuelle Route. `render` entscheidet nur anhand dieses Objekts, was erscheint. Die Funktionen, die das HTML bauen, stehen im Modul `render.js` und kennen weder den Zustand noch das DOM. Sie bekommen Daten und liefern Text, das macht sie leicht zu testen.

## Die SPA im Browser

Die SPA besteht aus ES-Modulen, und der Browser lädt Module nur über HTTP. Darum liefert der kleine Server aus Teil 1 jetzt auch die Dateien der App aus. Unter `http://localhost:3000/` kommt die Seite aus dem Ordner `app`, unter `/items` wie bisher der Katalog. Seite und Daten haben dieselbe Adresse, das spart Ärger, den Teil 7 erklärt.

```bash
npm run server
```

Öffne danach `http://localhost:3000/` im Browser und in den DevTools den Bereich «Netzwerk». Beim Laden erscheinen die Seite, die Module und die Anfrage an `/items`. Ein Klick auf ein Ding löst keine einzige Anfrage aus, wie in der Skizze aus dem Kapitel [Webseiten und Webapps](../web-pages-and-web-apps/).

## Die Grenzen der Handarbeit

Der Kreislauf aus Zustand und `render` ist einfach, solange `render` alles neu zeichnen darf. Bei Eingabefeldern geht das schief.

::code{file="examples/02-spa/spa-by-hand/{lang}/focus.html"}

Nach dem ersten Buchstaben zeichnet `render` alles neu, auch das Suchfeld. Das Feld, in das jemand tippt, verschwindet und wird durch ein neues ersetzt, das den Fokus nicht hat. Wer weitertippt, tippt ins Leere. Das ist nicht der einzige Haken.

1. Jedes Feld, das seinen Fokus, seine Markierung oder seine Position beim Scrollen behalten soll, darf `render` nicht ersetzen. Die Render-Funktion muss wissen, welche Teile sie neu zeichnen darf.
2. Jeder Text aus Daten muss durch `escapeHtml`, auch im Wert von Attributen wie `value`. Ein vergessener Aufruf ist eine Lücke.
3. Bei vielen Einträgen kostet es Zeit, alles bei jeder Änderung neu aufzubauen.
4. Mit jeder Funktion wächst der Code, der festhält, welche Teile der Seite von welchen Teilen des Zustands abhängen.

Ein Framework wie Vue nimmt genau diese Arbeit ab. Du beschreibst im Template, wie die Seite aus dem Zustand aussieht, Vue merkt sich, welche Teile von welchen Daten abhängen, und ändert nur, was sich wirklich geändert hat. Ein Suchfeld behält dabei seinen Fokus, und Text setzt Vue immer sicher ein. Darum geht es ab Teil 3.

## Im Code

Arbeite mit dem Beispiel zum Router. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

::code{file="examples/02-spa/spa-by-hand/{lang}/router.html"}

1. Was erscheint, wenn du am Schluss statt des Klicks `location.hash = '#/items/99'` schreibst? Und bei `'#/items/beamer'`?
2. Ergänze im Katalog einen Link auf `#/about` und fang die Route in `parseRoute` ab, sodass eine kurze Seite über den Verein erscheint.
3. Was passiert, wenn du in `parseRoute` das `Number(...)` weglässt? Warum?
4. Klick im Rahmen unter dem Code auf einen Link und danach auf «Zum Katalog». Welche Zeilen erscheinen in der Ausgabe?

## Aufgaben

Die Aufgaben bauen die SPA aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/02-spa/spa-by-hand/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Mit `npm run server` und der Adresse `http://localhost:3000/` siehst du die App im Browser. Die Tests prüfen die Funktionen und die App ohne Server, mit einem nachgebauten `fetch`.

::::exercise[Einstieg]
Schreib in `app/render.js` die Funktion `renderList(items)`. Sie liefert eine Liste `<ul class="catalog">` mit einem Eintrag pro Ding. Jeder Eintrag enthält einen Link mit dem Namen des Dings, der auf seine Seite zeigt, etwa `#/items/6`, dazu die Kategorie und «Verfügbar» oder «Ausgeliehen». Namen und Kategorien gehen durch `escapeHtml` aus `app/html.js`.

:::solution[Lösung]
::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/render.js" lines="1-19"}

`map` macht aus jedem Ding einen Eintrag, `join('')` fügt sie ohne Komma zusammen. Die Verfügbarkeit steckt in einer eigenen kleinen Funktion, weil die Seite eines Dings sie im nächsten Schritt auch braucht. Ohne `escapeHtml` schlägt der letzte Test fehl, der Name mit `<b>` würde fett statt als Text erscheinen.
:::
::::

::::exercise[Vertiefung]
Schreib in `app/router.js` die Funktion `parseRoute(hash)`. Sie liefert `{ name: 'catalog' }` für eine leere Adresse und für `#/`, `{ name: 'item', id: 6 }` für `#/items/6` und `{ name: 'notFound' }` für alles andere. Schreib danach `renderDetail(item)` für die Seite eines Dings mit Name als Überschrift, Kategorie, Pfand, Verfügbarkeit oder dem Datum, ab dem es wieder da ist, und einem Link zurück zum Katalog.

:::solution[Lösung]
::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/router.js"}

::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/render.js" lines="21-31"}

Der reguläre Ausdruck verlangt nach `#/items/` nur Ziffern, `#/items/sechs` landet deshalb bei `notFound`. Für Pfand und Datum verwendet `renderDetail` die Funktionen aus `app/format.js`, das Datum in UTC wie im Kapitel [Props](../../components/props/). Die App selbst musst du nicht ändern, `render` in `app.js` ruft die Funktionen schon auf. Der letzte Test öffnet die App direkt mit der Adresse des Beamers.
:::
::::

::::exercise[Knobelei]
Ergänze über dem Katalog ein Suchfeld mit der id `search`. Beim Tippen zeigt die Liste nur Dinge, deren Name den Suchtext enthält, ohne Rücksicht auf Gross- und Kleinschreibung. Das Suchfeld soll dabei seinen Fokus und seinen Text behalten.

:::solution[Lösung]
::code{file="exercises/02-spa/spa-by-hand/solution/{lang}/app/app.js" lines="10-40"}

Der Trick ist, nicht alles neu zu zeichnen. Für den Katalog zeichnet `render` das Suchfeld und einen leeren Container `#results`. Beim Tippen ruft der Listener nur `renderResults` auf, das allein den Container füllt. Das Suchfeld bleibt dasselbe Element, mit Fokus und Text. Der Suchtext steht trotzdem im Zustand, damit er nach einem Besuch auf der Seite eines Dings wieder im Feld steht. Genau diese Entscheidung, welche Teile neu entstehen dürfen, trifft Vue in Teil 3 für dich.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein Listener hängt an einem Knopf, den `render` später ersetzt, und reagiert nicht mehr. | Den Listener an einen Container hängen, den `render` nicht ersetzt, und mit Event-Delegation arbeiten. |
| Ein Handler ändert die Seite direkt, und beim nächsten `render` ist die Änderung weg. | Im Handler nur den Zustand ändern und danach `render` aufrufen. |
| Text aus Daten landet ohne `escapeHtml` in `innerHTML`. | Jeden Text aus Daten durch `escapeHtml` schicken, auch in Attributen. |
| `route.id === item.id` ist nie wahr, weil die Nummer aus der Adresse ein Text ist. | Die Nummer mit `Number(...)` umwandeln. |
| Ein Link ohne `#` lädt die ganze Seite neu. | Für Ansichten der SPA Links auf einen Hash schreiben, `href="#/items/6"`. |
| Die Seite bleibt leer, weil sie direkt als Datei geöffnet wurde. | Die App über den Server öffnen, `http://localhost:3000/`. |
| Ein KI-Assistent schreibt `onclick="reserve()"` in das HTML der Render-Funktion. | Die Funktion ist in einem Modul nicht global und wird nicht gefunden. Event-Delegation verwenden. |

## Selbstcheck

::::selfcheck
1. Was macht ein Event-Handler in einer SPA nach dem Muster dieses Kapitels, und was nicht?
2. Warum hängt der Listener für die Knöpfe am Container und nicht an den Knöpfen?
3. Was passiert beim Klick auf `<a href="#/items/6">`, und warum lädt der Browser keine neue Seite?
4. Warum verliert das Suchfeld im Beispiel den Fokus, und was hilft?

:::solution[Antworten]
1. Er ändert den Zustand und ruft `render` auf. Die Seite ändert er nicht direkt.
2. `render` ersetzt die Knöpfe bei jedem Zeichnen. Ein Listener an einem alten Knopf hinge an einem Element, das nicht mehr auf der Seite ist. Der Container bleibt, und der Klick steigt zu ihm hoch.
3. Der Hash der Adresse ändert sich, der Browser trägt die Adresse in den Verlauf ein und löst `hashchange` aus. Eine Änderung nur am Hash lädt keine neue Seite, und den Hash schickt der Browser nicht an den Server.
4. `render` ersetzt das ganze HTML, also auch das Suchfeld. Das neue Feld hat den Fokus nicht. Hilfe bringt, nur die Liste neu zu zeichnen und das Feld stehen zu lassen.
:::
::::

:::assignment
Die erste Version läuft, und Martina Hostettler hat sie einem Freiwilligen gezeigt, der als Informatiker arbeitet. Er ist angetan, hat aber zwei Fragen. «Wie willst du das veröffentlichen, mit all den einzelnen Dateien? Und lädst du den Browser bei jeder Änderung von Hand neu?» Um die Werkzeuge, die das erledigen, geht es im nächsten Kapitel.
:::
