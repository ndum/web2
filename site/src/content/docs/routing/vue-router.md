---
title: Vue Router
description: Routen mit Vue Router festlegen, Seiten mit RouterView zeigen und mit RouterLink verlinken, benannte Routen, aktive Links, die Arten der History und die Rückfalladresse auf dem Server und auf GitHub Pages.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler möchte, dass die App mehr als den Katalog zeigt.

> Als Mitglied möchte ich die Favoriten und die Angaben zum Verein auf eigenen Seiten finden, damit ich sie direkt öffnen und einem anderen Mitglied schicken kann.

Der Freiwillige ergänzt, dass die Routen von Hand aus Teil 2 mit jeder Seite umständlicher werden. Die Akzeptanzkriterien lauten:

1. Der Katalog, die Favoriten und der Verein haben je eine eigene Adresse ohne Raute, etwa `/favorites`.
2. Eine Navigation im Kopf führt zu allen drei Seiten und zeigt, auf welcher Seite man gerade ist.
3. Eine Adresse, die jemand direkt öffnet oder neu lädt, zeigt die richtige Seite.
:::

:::goals
Nach diesem Kapitel kannst du

- eine App mit Vue Router und einer Liste von Routen einrichten,
- Seiten mit `RouterView` zeigen und mit `RouterLink` verlinken,
- Routen benennen und mit ihrem Namen verlinken,
- aktive Links mit Klassen und `aria-current` gestalten,
- den History-Modus vom Hash-Modus unterscheiden,
- erklären, warum der Server im History-Modus für jede Adresse `index.html` liefern muss.
:::

## Routen statt Raute

In Teil 2 hast du das Routing von Hand gebaut. Die App hörte auf `hashchange`, zerlegte die Adresse mit `parseRoute` und entschied in einer Bedingung pro Seite, was erscheint. [Vue Router](https://router.vuejs.org/) übernimmt diese Arbeit. Du beschreibst jede Route mit einem Pfad und einer Komponente, und der Router zeigt die passende Komponente an der Stelle von `RouterView`. `RouterLink` erzeugt einen gewöhnlichen Link, dessen Klick der Router abfängt, damit der Browser die Seite nicht neu lädt.

::playground{dir="examples/06-routing/router-start"}

`createRouter` bekommt die Routen und eine History, die festlegt, wie der Router die Adresse liest und schreibt. Im Playground ist das `createMemoryHistory`, denn die Vorschau hat keine Adresszeile, darum zeigt das Beispiel die Adresse im Absatz an. `main.js` meldet den Router mit `use` bei der App an, erst danach kennen alle Komponenten `RouterView`, `RouterLink` und `useRoute`.

Ein Projekt von create-vue mit der Option Router hat diese Teile schon. Der Router steht in `src/router/index.js`, die Seiten liegen in `src/views`.

```js
import { createRouter, createWebHistory } from 'vue-router'

import CatalogView from '@/views/CatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: CatalogView }],
})

export default router
```

## Links und aktive Links

`RouterLink` rendert ein Element `a` mit einem echten `href`. Ein Klick wechselt die Seite ohne neues Laden, und ein Klick mit gedrückter Taste für einen neuen Tab funktioniert trotzdem, weil der Link eine richtige Adresse hat. Der Link zur aktuellen Route bekommt die Klassen `router-link-active` und `router-link-exact-active`. Der genau passende Link bekommt ausserdem `aria-current="page"`, und ein Screenreader liest ihn als aktuelle Seite vor.

::playground{dir="examples/06-routing/active-links"}

Laut [Dokumentation](https://router.vuejs.org/guide/essentials/active-links.html) ist ein Link aktiv, wenn er auf denselben Eintrag der Routen zeigt wie die aktuelle Adresse und dieselben Parameter hat. Die Query zählt dabei nicht. Für die Gestaltung eignet sich der Selektor `[aria-current='page']`, denn er beschreibt dieselbe Information, die auch ein Screenreader bekommt. Den Unterschied zwischen aktiv und genau aktiv zeigt das Kapitel [Verschachtelte Routen und Layouts](../nested-routes/).

## Benannte Routen

Eine Route kann einen Namen haben. Ein Link mit `:to="{ name: 'favorites' }"` sucht die Route über diesen Namen und baut die Adresse selbst. Ändert sich später ein Pfad, bleiben alle Links, wie sie sind.

::playground{dir="examples/06-routing/named-routes"}

Im nächsten Kapitel tragen Routen Parameter wie die Nummer eines Dings. Dann übernimmt der Router mit Namen und Parametern auch das Zusammensetzen der Adresse, und kein Link enthält mehr einen zusammengeklebten Text wie `'/items/' + id`.

## History und Hash

Vue Router kennt drei Arten, die Adresse zu führen. `createWebHistory` schreibt Adressen wie `/favorites` mit der History API des Browsers, die [Dokumentation](https://router.vuejs.org/guide/essentials/history-mode.html) empfiehlt diesen Modus. `createWebHashHistory` setzt alles hinter eine Raute, `/#/favorites`, wie die Routen aus Teil 2. Laut Dokumentation braucht dieser Modus keine Einstellung auf dem Server, ist aber schlechter für Suchmaschinen. `createMemoryHistory` führt die Adresse nur im Speicher, für Tests und für den Playground.

Im History-Modus geht eine Adresse, die jemand direkt öffnet oder neu lädt, an den Server. Eine Datei `favorites` gibt es dort nicht, und ohne Hilfe antwortet der Server mit 404. Die Dokumentation verlangt darum eine Rückfallregel, die für jede unbekannte Adresse `index.html` ausliefert. Dann startet die App, und der Router zeigt die Seite zur Adresse. Der Entwicklungsserver von Vite tut das von selbst, denn seine [Option `appType`](https://vite.dev/config/shared-options.html#apptype) steht auf `spa`.

GitHub Pages kennt keine solche Regel. Es zeigt aber für Seiten, die es nicht gibt, die Datei `404.html`, wenn ein Projekt eine hat ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)). Eine Kopie von `index.html` unter diesem Namen startet also auch dort die App. Wie das beim Build und beim Veröffentlichen geschieht, zeigt Kapitel 8.6.

`createWebHistory(import.meta.env.BASE_URL)` übernimmt den Basispfad aus der Einstellung `base` von Vite. Für eine Projektseite auf GitHub Pages ist das laut [Vite](https://vite.dev/guide/static-deploy.html#github-pages) der Name des Repos, etwa `/lorraine-commons/`. Der relative Pfad `./` aus Teil 2 funktioniert im History-Modus nicht mehr. Unter `/items/6` würde der Browser die Dateien der App unter `/items/` suchen. Die Fallbeispiel-App baut darum ab diesem Teil mit dem absoluten Pfad `/`.

:::deepdive[Dateibasiertes Routing]
Seit Version 5 kann Vue Router die Routen aus den Dateien eines Ordners erzeugen. Das Plugin `VueRouter` aus `vue-router/vite` steht in `vite.config.js` vor `vue()`, die Seiten liegen in `src/pages`, und die fertigen Routen kommen aus `vue-router/auto-routes`.

```js
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
```

Die Namen der Dateien bestimmen die Pfade. `index.vue` steht für den leeren Pfad, `[id].vue` für einen Parameter, `[...path].vue` für alle übrigen Adressen, und eine Datei neben einem Ordner mit demselben Namen wird zur Elternroute der Seiten darin ([Dokumentation](https://router.vuejs.org/file-based-routing/file-based-routing.html)). Der Kurs schreibt die Routen von Hand. So stehen alle Routen in einer Datei, und du siehst, was der Router aus jeder macht.
:::

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Ergänze im ersten Beispiel eine dritte Seite für die Favoriten. Welche Dateien änderst oder ergänzt du?
2. Schau dir im Beispiel mit den aktiven Links die Klassen und Attribute der Links in den Entwicklertools an, während du die Seite wechselst.
3. Ergänze im selben Beispiel einen Link auf `/favorites?sort=deposit`. Ist er aktiv, wenn die Favoriten offen sind?
4. Ändere im Beispiel mit den benannten Routen den Pfad der Favoriten auf `/saved`. Was zeigt die Adresse, und musst du einen Link anpassen?

## Aufgaben

Die Aufgaben bauen die Seiten aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/06-routing/router/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Lege `src/router/index.js` an. Der Router verwendet `createWebHistory(import.meta.env.BASE_URL)` und die Routen `/` für `CatalogView` und `/association` für `AssociationView`. Melde ihn in `src/main.js` mit `app.use(router)` an und ersetze in `App.vue` die Komponente `CatalogView` durch `RouterView`.

:::solution[Lösung]
::code{file="exercises/06-routing/router/solution/{lang}/src/router/index.js"}

Die Lösung enthält schon die Route und die Namen aus den nächsten Aufgaben. Für den Einstieg genügen die Routen für `/` und `/association`. `src/main.js` sieht danach aus wie in einem Projekt von create-vue.

::code{file="exercises/06-routing/router/solution/{lang}/src/main.js"}
:::
::::

::::exercise[Vertiefung]
Ergänze die Route `/favorites` für `FavoritesView` und in `App.vue` eine Navigation `<nav>` mit `RouterLink` zu Katalog, Favoriten und Verein, in dieser Reihenfolge. Der Link zur aktuellen Seite fällt durch fette Schrift auf.

:::solution[Lösung]
::code{file="exercises/06-routing/router/solution/{lang}/src/App.vue" lines="5-18"}

::code{file="exercises/06-routing/router/solution/{lang}/src/App.vue" lines="42-46"}

Die Links verwenden schon die Namen aus der Knobelei. Für die Vertiefung genügt `to="/favorites"`. Der Selektor prüft `aria-current`, das `RouterLink` beim Link zur aktuellen Seite selbst setzt.
:::
::::

::::exercise[Knobelei]
Gib den Routen die Namen `catalog`, `favorites` und `association` und verlinke in `App.vue` nur noch mit Namen. Ergänze in `AssociationView` einen Link «Zum Katalog», ebenfalls mit dem Namen der Route.

:::solution[Lösung]
::code{file="exercises/06-routing/router/solution/{lang}/src/router/index.js" lines="10-14"}

::code{file="exercises/06-routing/router/solution/{lang}/src/views/AssociationView.vue"}

Der Router baut aus dem Namen dieselbe Adresse `/`, die vorher im Link stand. Ein Pfad in einer Route ändert sich damit nur noch an einer Stelle.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Die Konsole meldet `injection "Symbol(router)" not found`. | In `main.js` fehlt `app.use(router)`. |
| Eine Seite bleibt leer, und die Konsole meldet `No match found for location with path`. | Für die Adresse gibt es keine Route. Den Pfad in der Liste prüfen, eine Route für alle unbekannten Adressen kommt in Kapitel 6.5. |
| Ein Link mit `<a href="/favorites">` lädt die ganze Seite neu. | `RouterLink` verwenden. Es fängt den Klick ab und wechselt die Seite ohne neues Laden. |
| Nach dem Neuladen einer Seite meldet der Server 404. | Der Server muss für unbekannte Pfade `index.html` liefern, auf GitHub Pages hilft eine Kopie als `404.html`. |
| Unter einer Adresse wie `/items/6` fehlen Styles und Script der App. | Der Basispfad ist relativ. Im History-Modus `base` absolut setzen. |
| Ein KI-Assistent schreibt `new VueRouter({ mode: 'history' })` oder `<router-link tag="li">`. | Das ist Vue Router 3 für Vue 2. Seit Version 4 entsteht der Router mit `createRouter` und `history: createWebHistory()`, und das Attribut `tag` gibt es nicht mehr. |

## Selbstcheck

::::selfcheck
1. Was tun `RouterView` und `RouterLink`?
2. Warum verlinkt die App besser mit Namen als mit Pfaden?
3. Woran erkennt ein Screenreader den Link zur aktuellen Seite?
4. Warum braucht der History-Modus Hilfe vom Server, der Hash-Modus aber nicht?

:::solution[Antworten]
1. `RouterView` zeigt die Komponente der aktuellen Route. `RouterLink` erzeugt einen Link, bei dem der Router die Seite ohne neues Laden wechselt.
2. Ein Pfad steht dann nur in der Liste der Routen. Ändert er sich, bleiben alle Links gültig.
3. Am Attribut `aria-current="page"`, das `RouterLink` beim genau passenden Link setzt.
4. Im History-Modus geht die ganze Adresse an den Server, der dafür `index.html` liefern muss. Der Teil hinter der Raute erreicht den Server nie.
:::
::::

:::assignment
Die App hat jetzt Seiten mit eigenen Adressen. Beim Ausprobieren hat Martina Hostettler gleich die nächste Frage. «Kann ich einem Mitglied einen Link auf die Bohrmaschine schicken? Und einen auf alle Sägen im Werkzeug?» Dafür braucht die Adresse Parameter und eine Query, das nächste Kapitel.
:::
