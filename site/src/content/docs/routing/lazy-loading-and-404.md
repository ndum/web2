---
title: Lazy Loading und 404
description: Eine Route für unbekannte Adressen, Parameter mit regulären Ausdrücken, Routen bei Bedarf laden, die Position beim Scrollen und Titel und Fokus nach jeder Navigation.
sidebar:
  order: 5
---

:::assignment
Der Freiwillige hat zwei Punkte gefunden, und Martina Hostettler macht einen Auftrag daraus.

> Als Mitglied möchte ich bei einer falschen Adresse einen Hinweis und einen Weg zurück finden, damit ich nicht vor einer leeren Seite stehe.

Die Akzeptanzkriterien lauten:

1. Eine Adresse ohne Seite zeigt «Seite nicht gefunden» mit einem Link zum Katalog.
2. Der Code für den Bereich des Teams lädt erst, wenn jemand den Bereich öffnet.
3. Nach jedem Wechsel der Seite stimmt der Titel des Tabs, und der Fokus steht auf der Überschrift der neuen Seite.
:::

:::goals
Nach diesem Kapitel kannst du

- eine Route für alle unbekannten Adressen festlegen,
- einen Parameter mit einem regulären Ausdruck einschränken,
- Routen bei Bedarf laden und das Ergebnis im Build erkennen,
- die Position beim Scrollen mit `scrollBehavior` steuern,
- nach einer Navigation Titel und Fokus setzen.
:::

## Eine Seite für unbekannte Adressen

Passt keine Route auf eine Adresse, zeigt `RouterView` nichts, und Vue Router meldet in der Konsole `No match found for location with path`. Die [Dokumentation](https://router.vuejs.org/guide/essentials/dynamic-matching.html) fängt solche Adressen mit einer Route, deren Parameter einen eigenen regulären Ausdruck hat.

::playground{dir="examples/06-routing/not-found"}

`(.*)` passt auf jeden Text, auch über mehrere Abschnitte der Adresse. Das Sternchen danach macht den Parameter optional und wiederholbar, und `route.params.pathMatch` enthält die Abschnitte als Array, für `/vereinsabend/2026` also `["vereinsabend", "2026"]`. Die Route darf irgendwo in der Liste stehen, denn laut [Dokumentation](https://router.vuejs.org/guide/essentials/route-matching-syntax.html) spielt die Reihenfolge der Routen keine Rolle.

Derselbe Mechanismus schränkt einen Parameter ein. `/items/:id(\\d+)` passt nur auf Ziffern, `/items/abc` landet auf der Seite für unbekannte Adressen. Die doppelten Backslashes braucht es, weil der Pfad in einem String von JavaScript steht. Eine Nummer, zu der es kein Ding gibt, erkennt dagegen erst die Seite selbst, denn die Liste der Dinge kennt der Router nicht.

## Routen bei Bedarf laden

Ein `import` am Anfang einer Datei lädt eine Komponente beim Start der App. Schreibt eine Route stattdessen eine Funktion mit `import()`, lädt der Router die Komponente erst beim ersten Besuch und behält sie danach. Die [Dokumentation](https://router.vuejs.org/guide/advanced/lazy-loading.html) empfiehlt das für alle Routen.

```js
{
  path: '/team',
  // The code of the team area loads only when someone opens it
  component: () => import('@/views/TeamView.vue'),
},
```

Vite legt jede so geladene Komponente beim Build in eine eigene Datei. Im Übungsprojekt zeigt `npm run build` danach eine zusätzliche Zeile für den Bereich des Teams, gekürzt etwa so.

```text
dist/index.html                    0.40 kB
dist/assets/index-tJDboEPA.css     1.02 kB
dist/assets/TeamView-toIM6wF9.js   0.27 kB
dist/assets/index-Di6fJri9.js     95.09 kB
```

Die Zeichen nach dem Bindestrich und die Grössen sehen bei dir anders aus. Im Tab «Network» der Entwicklertools erscheint die Datei erst, wenn du den Bereich öffnest. Der Playground lädt dagegen alle Dateien eines Beispiels auf einmal, dort ist der Unterschied nicht zu sehen. Die Fallbeispiel-App lädt den Bereich des Teams bei Bedarf. Die übrigen Seiten sind klein und gehören fast alle zum ersten Besuch.

## Die Position beim Scrollen

Beim Wechsel der Seite lässt der Browser die Position beim Scrollen, wo sie war, denn er lädt keine neue Seite. Die Option `scrollBehavior` des Routers legt fest, wohin es nach einer Navigation geht.

::playground{dir="examples/06-routing/scroll-behavior"}

Im Beispiel beginnt die Seite eines Dings oben, auch wenn du weit unten in der Liste geklickt hast. `savedPosition` gibt es laut [Dokumentation](https://router.vuejs.org/guide/advanced/scroll-behavior.html) nur bei Zurück und Vorwärts in der History des Browsers. Dann kehrt eine Seite an die alte Stelle zurück, jede andere beginnt oben. Die History im Speicher des Playgrounds merkt sich keine Positionen, den Zurück-Knopf mit der gespeicherten Position probierst du darum in der Fallbeispiel-App aus.

## Titel und Fokus nach der Navigation

`router.afterEach` läuft nach jeder Navigation und kann sie nicht mehr aufhalten. Damit setzt die App den Titel des Tabs aus einem Feld `title` in `meta`. Ein drittes Argument meldet eine Navigation, die abgebrochen wurde oder zur aktuellen Seite führte, dann ändert die App nichts.

::playground{dir="examples/06-routing/title-and-focus"}

Bei einer SPA lädt der Browser keine neue Seite, und ein Screenreader bemerkt den Wechsel nicht von selbst. In einer [Nutzerstudie von Gatsby](https://v2.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing) mit Menschen mit Behinderungen schnitt der Fokus auf der Überschrift der neuen Seite am besten ab. Die Überschrift bekommt dafür `tabindex="-1"`, damit sie den Fokus annehmen kann, ohne in der Reihenfolge der Tabulatortaste zu erscheinen. Gesetzt wird der Fokus nach `await nextTick()`, denn `afterEach` läuft, bevor Vue die neue Seite rendert. Beim ersten Laden steht `from` auf `START_LOCATION`, dann bleibt der Fokus, wo der Browser ihn hat.

Die Fallbeispiel-App fragt vorher, ob die neue Seite den Fokus schon selbst in `main` gesetzt hat. Der Katalog tut das mit seinem Suchfeld aus Kapitel 5.3 und behält es. Die Seite eines Dings setzt ihren Titel selbst, denn den Namen des Dings kennt erst sie. Kapitel 8.5 kommt auf weitere Techniken zurück, etwa eine Live-Region, die den Titel der neuen Seite ansagt.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Nimm im ersten Beispiel die Route für unbekannte Adressen weg und klick auf «Ein alter Link». Was meldet die Konsole, und was zeigt die Seite?
2. Ändere im selben Beispiel den Link auf `/vereinsabend`. Was enthält `pathMatch` jetzt?
3. Scroll im Beispiel mit der langen Liste nach unten und öffne ein Ding. Nimm danach `scrollBehavior` weg und wiederhole es. Wo beginnt die Seite des Dings?
4. Nimm im Beispiel zu Titel und Fokus die Zeile mit `await nextTick()` weg. Wo steht der Fokus nach einem Wechsel der Seite?

## Aufgaben

Die Aufgaben bauen die Punkte aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/06-routing/lazy-404/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Ergänze eine Route für alle unbekannten Adressen mit dem Namen `not-found`. Sie zeigt `NotFoundView` und hat im Feld `meta` den Titel «Seite nicht gefunden». Auch `/items/abc` landet danach dort.

:::solution[Lösung]
::code{file="exercises/06-routing/lazy-404/solution/{lang}/src/router/index.js" lines="26-27"}

Die Route für ein Ding hat schon `(\\d+)` und passt nur auf Ziffern. Für `/items/abc` bleibt darum nur die Route für unbekannte Adressen.
:::
::::

::::exercise[Vertiefung]
Lade `TeamView` erst, wenn jemand den Bereich öffnet. Prüf danach mit `npm run build`, ob eine eigene Datei für den Bereich entsteht.

:::solution[Lösung]
::code{file="exercises/06-routing/lazy-404/solution/{lang}/src/router/index.js" lines="19-25"}

Der `import` von `TeamView` am Anfang der Datei fällt weg, sonst landete die Komponente trotz der Funktion im ersten Paket. Nach dem ersten Besuch ersetzt der Router die Funktion durch die geladene Komponente.
:::
::::

::::exercise[Knobelei]
Setz nach jeder Navigation den Titel des Tabs auf den Titel aus `meta` mit « · Lorraine Commons» dahinter. Setz ausserdem den Fokus auf die Überschrift `h1` der neuen Seite, nicht aber beim ersten Laden. Die Überschriften brauchen dafür `tabindex="-1"`.

:::solution[Lösung]
::code{file="exercises/06-routing/lazy-404/solution/{lang}/src/router/index.js" lines="31-41"}

`START_LOCATION` kommt aus `vue-router`, `nextTick` aus `vue`. In allen Seiten steht die Überschrift jetzt als `<h1 tabindex="-1">`.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Vue Router meldet `Catch all routes ("*") must now be defined using a param with a custom regexp.` | `path: '*'` stammt aus Vue Router 3. Die Route heisst jetzt `/:pathMatch(.*)*`. |
| Eine Route lädt ihre Komponente mit `defineAsyncComponent`. | Laut Dokumentation gehört in eine Route eine einfache Funktion mit `import()`, keine asynchrone Komponente. |
| Der Fokus landet nach einem Wechsel nirgends. | Die Überschrift braucht `tabindex="-1"`, und der Fokus wartet mit `nextTick` auf die neue Seite. |
| Nach dem Zurück-Knopf steht die Liste oben statt an der alten Stelle. | `scrollBehavior` gibt `savedPosition` zurück, wenn es sie gibt. |

## Selbstcheck

::::selfcheck
1. Was enthält `route.params.pathMatch` für die Adresse `/vereinsabend/2026`?
2. Was ändert sich im Build, wenn eine Route ihre Komponente mit `import()` lädt?
3. Wann bekommt `scrollBehavior` eine gespeicherte Position?
4. Warum setzt die App den Fokus nach einer Navigation, aber nicht beim ersten Laden?

:::solution[Antworten]
1. Das Array `["vereinsabend", "2026"]`, ein Eintrag für jeden Abschnitt der Adresse.
2. Vite legt die Komponente in eine eigene Datei, die der Browser erst beim ersten Besuch der Route lädt.
3. Nur bei Zurück und Vorwärts im Browser.
4. Beim ersten Laden beginnt der Browser oben auf der neuen Seite, wie bei jeder Website. Bei einem Wechsel in der SPA lädt keine Seite neu, und ohne Fokus bemerkt ein Screenreader den Wechsel nicht.
:::
::::

:::assignment
Die App hat Seiten, Adressen zum Teilen und einen Bereich für das Team. Ihre Daten leben aber noch im Browser. Eine Rückgabe am Tresen sieht nur, wer im selben Browser arbeitet, und nach dem Neuladen ist sie weg. Teil 7 holt die Daten vom Server des Vereins und hält gemeinsamen Zustand mit Pinia. Vorher prüfst du mit dem [Kompetenzraster](../competences/), ob du für Teil 7 bereit bist.
:::
