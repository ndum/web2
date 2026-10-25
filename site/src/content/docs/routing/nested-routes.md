---
title: Verschachtelte Routen und Layouts
description: Kindrouten mit children, ein Layout mit eigener RouterView, die leere Kindroute als Startseite eines Bereichs, aktive und genau aktive Links und benannte Views.
sidebar:
  order: 3
---

:::assignment
Das Team am Tresen braucht einen eigenen Bereich in der App.

> Als Freiwillige oder Freiwilliger am Tresen möchte ich die Ausleihen und die Rückgaben unter einer gemeinsamen Adresse finden, damit ich schnell zwischen den beiden wechseln kann.

Die Akzeptanzkriterien lauten:

1. Unter `/team` stehen die Dinge, die ausgeliehen sind, die nächste Rückgabe zuerst.
2. Unter `/team/returns` erfasst das Team eine Rückgabe, und der Katalog zeigt das Ding danach als verfügbar.
3. Beide Seiten teilen eine Überschrift und eine Navigation, die zeigt, wo man ist.
:::

:::goals
Nach diesem Kapitel kannst du

- Kindrouten mit `children` festlegen,
- ein Layout mit einer eigenen `RouterView` bauen,
- eine Kindroute mit leerem Pfad als Startseite eines Bereichs einsetzen,
- aktive und genau aktive Links unterscheiden,
- mit benannten Views mehrere Komponenten auf eine Route verteilen.
:::

## Kindrouten

Eine Route kann Kindrouten haben. Sie stehen in `children`, und ihre Pfade hängen am Pfad der Elternroute, `returns` unter `/team` ergibt `/team/returns`. Die Komponente der Elternroute erscheint in der `RouterView` von `App`. Die Komponente der Kindroute erscheint in einer zweiten `RouterView` in der Elternkomponente.

::playground{dir="examples/06-routing/nested-routes"}

Die Kindroute mit dem leeren Pfad `''` gehört zur Adresse `/team` selbst und ist die Startseite des Bereichs. Ohne sie zeigte `/team` nur die Überschrift und eine leere Stelle. Ein Kindpfad mit `/` am Anfang gälte laut [Dokumentation](https://router.vuejs.org/guide/essentials/nested-routes.html) ab der Wurzel, darum stehen Kindpfade ohne Schrägstrich.

## Layouts

Die Elternkomponente eines Bereichs ist sein Layout. `TeamLayout` hat die Überschrift und die Navigation, die alle Seiten des Teams teilen, und eine `RouterView` für die Seite, die gerade dran ist. Wechselt jemand von den Ausleihen zu den Rückgaben, bleibt das Layout stehen, und nur der Inhalt darin wechselt.

![Die Routen der Fallbeispiel-App als Baum. Oben App mit ihrer RouterView, darunter die Routen / mit CatalogView, /items/:id mit ItemView, /favorites mit FavoritesView, /association mit AssociationView, /login mit LoginView, /team mit TeamLayout und die Catch-all-Route mit NotFoundView. TeamLayout hat eine eigene RouterView mit den Kindrouten für die Ausleihen und die Rückgaben. Neben /team steht, dass der Bereich nur für das Team ist und erst bei Bedarf lädt, neben der Catch-all-Route, dass sie alle anderen Adressen fängt.](../../../assets/figures/de/p6c3-route-tree.svg)

Die Abbildung zeigt alle Routen der Fallbeispiel-App nach diesem Teil. Die gestrichelten Kästchen laden erst bei Bedarf, und für den Bereich des Teams braucht es eine Anmeldung. Beides kommt in den nächsten zwei Kapiteln.

## Aktive und genau aktive Links

Im Beispiel ist der Link «Team» im Kopf auf beiden Seiten des Bereichs fett. Er ist aktiv, weil die aktuelle Route unter seiner liegt. Der Link «Ausleihen» zeigt auf die leere Kindroute und gilt deshalb auf allen Seiten des Bereichs als aktiv. Genau aktiv ist dagegen nur der Link zur Seite, die gerade offen ist, und nur er bekommt `router-link-exact-active` und `aria-current="page"`. Die Navigation im Kopf gestaltet darum `router-link-active`, die Navigation im Bereich `router-link-exact-active`.

## Benannte Views

Eine Seite kann mehr als eine Stelle für Komponenten haben, etwa eine Spalte neben dem Inhalt. Eine `RouterView` mit einem Namen ist eine solche zweite Stelle. Eine Route füllt sie mit `components` statt `component`, einem Objekt mit einer Komponente für jeden Namen und `default` für die `RouterView` ohne Namen.

::playground{dir="examples/06-routing/named-views"}

Im Katalog bleibt die Spalte leer, denn seine Route hat nichts für sie. Benannte Views lohnen sich, wenn mehrere Routen dieselbe Seite mit verschiedenen Teilen füllen. Die Fallbeispiel-App braucht keine, die Knobelei zeigt sie trotzdem einmal im Einsatz.

## Daten für die Seiten des Routers

Bis Teil 5 gab `App` den Seiten ihre Daten als Props. Jetzt zeigt der Router die Seiten, und `App` steht nicht mehr im Template vor ihnen. In der Fallbeispiel-App stellt `App` darum den Katalog, die Favoriten und das angemeldete Mitglied mit `provide` bereit, wie das Mitglied in Kapitel 4.5, und jede Seite holt sich mit `inject`, was sie braucht. Zum Katalog gehört die Funktion `markReturned`, mit der die Seite für Rückgaben ein Ding als verfügbar markiert. Bis Teil 7 gilt das nur im eigenen Browser, dann geht jede Rückgabe an den Server des Vereins, und Pinia hält den gemeinsamen Zustand.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Öffne im Beispiel mit den Kindrouten die Rückgaben. Welche Links sind fett, welche unterstrichen, und warum?
2. Nimm `RouterView` aus `TeamLayout`. Was zeigt `/team` jetzt?
3. Schreib den Pfad der Rückgaben als `/returns` und pass den Link im Layout an. Unter welcher Adresse erscheinen die Rückgaben, und erscheint das Layout noch?
4. Öffne im Beispiel mit den benannten Views abwechselnd den Katalog und das Team. Was geschieht mit der Spalte?

## Aufgaben

Die Aufgaben bauen den Bereich des Teams aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/06-routing/nested-routes/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Mach aus der flachen Seite `TeamView` das Layout `TeamLayout` mit der Überschrift «Team am Tresen» und einer `RouterView`. Verschieb die Liste der Ausleihen mit ihrer Überschrift in `TeamLoansView`. In `src/router/index.js` bekommt `/team` das Layout als Komponente und eine Kindroute mit leerem Pfad und dem Namen `team-loans`.

:::solution[Lösung]
::code{file="exercises/06-routing/nested-routes/solution/{lang}/src/router/index.js" lines="13-22"}

Die Lösung enthält schon die zweite Kindroute und die Spalte aus der Knobelei. Für den Einstieg steht dort `component: TeamLayout` und nur die Kindroute mit dem leeren Pfad. `TeamLayout` trägt die Überschrift und eine `RouterView`, `TeamLoansView` die Liste.
:::
::::

::::exercise[Vertiefung]
Ergänze die Kindroute `returns` mit dem Namen `team-returns` für `TeamReturnsView` und im Layout eine Navigation `<nav class="team-nav">` mit Links zu «Ausleihen» und «Rückgaben». Der Link zur aktuellen Seite des Bereichs ist fett.

:::solution[Lösung]
::code{file="exercises/06-routing/nested-routes/solution/{lang}/src/views/TeamLayout.vue"}

Der Selektor prüft `aria-current`, das nur der genau aktive Link hat. Mit `router-link-active` wäre der Link zu den Ausleihen auch auf den Rückgaben fett, weil er auf die leere Kindroute zeigt.
:::
::::

::::exercise[Knobelei]
Neben allen Seiten des Teams soll `TeamHints` in einer eigenen Spalte stehen, im Katalog aber nicht. Ergänze in `App.vue` eine `RouterView` mit dem Namen `aside` und gib der Route `/team` die Hinweise als zweite Komponente.

:::solution[Lösung]
::code{file="exercises/06-routing/nested-routes/solution/{lang}/src/App.vue" lines="13-19"}

In der Route ersetzt `components: { default: TeamLayout, aside: TeamHints }` die einzelne Komponente. Die Kindrouten erben die Spalte, weil sie zur Elternroute gehört. Die Route des Katalogs hat keine Komponente für `aside`, und die benannte `RouterView` bleibt dort leer.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Auf einer Kindroute erscheint nur das Layout. | Im Layout fehlt `<RouterView />`. |
| Unter `/team` bleibt der Platz für die Seite leer. | Eine Kindroute mit leerem Pfad `''` zeigt die Startseite des Bereichs. |
| Eine Kindseite liegt unter `/returns` statt unter `/team/returns`. | Den Kindpfad ohne `/` am Anfang schreiben, sonst gilt er ab der Wurzel. |
| Der Link zur Startseite des Bereichs bleibt auf allen Seiten hervorgehoben. | In der Navigation des Bereichs `router-link-exact-active` oder `aria-current` gestalten. |
| Ein KI-Assistent schaltet die Seiten des Bereichs mit `v-if` und einer Variablen um. | Mit Kindrouten hat jede Seite eine eigene Adresse, die man teilen und neu laden kann. |

## Selbstcheck

::::selfcheck
1. Wo erscheint die Komponente einer Kindroute?
2. Wozu dient eine Kindroute mit leerem Pfad?
3. Worin unterscheiden sich `router-link-active` und `router-link-exact-active`?
4. Woher bekommen die Seiten des Routers in der Fallbeispiel-App ihre Daten?

:::solution[Antworten]
1. In der `RouterView` der Elternkomponente, also im Layout des Bereichs.
2. Sie zeigt die Startseite des Bereichs unter der Adresse der Elternroute selbst.
3. Aktiv ist ein Link auch, wenn die aktuelle Route unter seiner liegt. Genau aktiv ist nur der Link zur aktuellen Seite, und nur er bekommt `aria-current="page"`.
4. `App` stellt Katalog, Favoriten und Mitglied mit `provide` bereit, und jede Seite holt sie sich mit `inject`.
:::
::::

:::assignment
Der Bereich des Teams steht. Martina Hostettler meldet sich trotzdem. «Den Bereich kann im Moment jedes Mitglied öffnen. Und gestern hat ein Mitglied ein halb ausgefülltes Formular verloren, weil es auf einen Link geklickt hat.» Für beides gibt es Navigation Guards, das nächste Kapitel.
:::
