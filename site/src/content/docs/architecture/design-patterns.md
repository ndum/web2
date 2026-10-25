---
title: Entwurfsmuster in SPAs
description: Muster als gemeinsame Sprache, der Beobachter in der Reaktivität, Darstellung und Container, Abhängigkeiten mit provide und inject, ein Adapter für die API, der Store als Fassade und Strategien fürs Sortieren.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler will die App an der Mitgliederversammlung zeigen.

> Als Vorstand möchte ich die App an der Mitgliederversammlung vorführen, auch wenn dort kein Server des Vereins läuft, damit die Mitglieder sie ausprobieren können.

Der Freiwillige möchte ausserdem nach Verfügbarkeit sortieren, und die neue Freiwillige fragt, warum die Karte eines Dings keinen Store kennt. Die Akzeptanzkriterien lauten:

1. Die Stores bekommen die API von aussen und laufen mit der Kurs-API und mit einer Attrappe, ohne dass sich ihr Code ändert.
2. Eine neue Sortierung braucht keine Änderung der Vorlage.
3. Die Karte eines Dings funktioniert auf jeder Seite, ohne einen Store zu kennen.
:::

:::goals
Nach diesem Kapitel kannst du

- Entwurfsmuster als gemeinsame Sprache verwenden,
- den Beobachter in der Reaktivität von Vue wiedererkennen,
- Darstellung und Container trennen,
- Abhängigkeiten mit `provide` und `inject` übergeben,
- einen Adapter und Strategien schreiben und einen Store als Fassade einsetzen.
:::

## Muster als gemeinsame Sprache

Ein Entwurfsmuster beschreibt eine bewährte Lösung für ein Problem, das beim Entwerfen von Software immer wieder auftaucht. Bekannt wurden viele davon durch das Buch «Design Patterns» von Gamma, Helm, Johnson und Vlissides aus dem Jahr 1994, das 23 Muster für objektorientierte Software beschreibt. Ihre Namen erleichtern das Gespräch über Code. «Hinter den Stores steckt ein Adapter» sagt in einem Satz, wofür sonst ein Absatz nötig wäre. In einer SPA mit Vue tauchen die Muster selten als Klassen auf, sondern als Funktionen, Module und Komponenten.

## Der Beobachter in der Reaktivität

Das Muster Beobachter sorgt dafür, dass alle abhängigen Objekte automatisch erfahren, wenn sich ein Objekt ändert. Genau das tut die Reaktivität von Vue. Laut [Vue-Dokumentation](https://vuejs.org/guide/extras/reactivity-in-depth.html) merkt sich Vue, welche Effekte einen reaktiven Wert lesen, und führt sie nach einer Änderung erneut aus. Jede Komponente zeichnet sich in einem solchen Effekt, und ein `watch` ist ein Beobachter, den du selbst schreibst. Der Exkurs 1.5 hat ein kleines System dieser Art mit einem Proxy gebaut.

## Darstellung und Container

Eine Darstellungskomponente zeigt nur, was sie als Props bekommt, und meldet Klicks als Events. Ein Container kennt Stores und API und reicht die Daten weiter.

::playground{dir="examples/08-architecture/presentational-container"}

Dan Abramov hat diese Trennung 2015 für React beschrieben. 2019 schrieb er dazu, dass er sie nicht mehr empfiehlt, weil Hooks die Logik mit Zustand auch ohne diese Aufteilung auslagern, in Vue tun das Composables. Die Idee bleibt nützlich, wo eine Komponente an mehreren Orten erscheint. In der Fallbeispiel-App zeigen Katalog und Favoriten dieselbe Karte `ItemCard`, die keinen Store kennt, und die Seiten entscheiden, was ein Klick auf «Favorit» bedeutet. Nicht jede Komponente muss eines von beidem sein.

## Abhängigkeiten mit provide und inject

Eine Abhängigkeit ist etwas, das ein Teil des Codes braucht, um seine Arbeit zu tun, etwa die API für einen Store. Bei der Dependency Injection holt sich ein Teil seine Abhängigkeit nicht selbst, er bekommt sie von aussen. Die [Vue-Dokumentation](https://vuejs.org/guide/components/provide-inject.html) zeigt dafür `provide` und `inject`, mit `app.provide` gilt ein Wert für die ganze App.

::playground{dir="examples/08-architecture/api-adapter"}

`App.vue` ruft nur `useApi()` und weiss nicht, welche Umsetzung `main.js` bereitgestellt hat. In der Fallbeispiel-App macht `main.js` dasselbe für die Stores.

::code{file="case/08-architecture/{lang}/src/main.js" lines="10-18"}

Pinia führt einen Setup Store im Kontext der App aus, darum funktioniert `inject` auch in einem Store. Die Fallbeispiel-App verpackt den Aufruf in eine Funktion, die meldet, wenn jemand die API vergessen hat.

::code{file="case/08-architecture/{lang}/src/api/index.js" lines="9-23"}

Der Schlüssel ist ein `Symbol`, das andere Dateien importieren, wie die Vue-Dokumentation für grössere Apps rät. Tests stellen dieselbe API bereit oder eine Attrappe und rufen so die echten Stores auf.

## Ein Adapter für die API

Ein Adapter übersetzt eine Schnittstelle in die, die ein anderer Teil des Codes erwartet. Die Stores erwarten Funktionen wie `loadItems()`, die mit `ok`, `status` und `data` antworten. `createHttpApi` übersetzt dafür Adressen, Methoden, Statuscodes und JSON der Kurs-API, wie Kapitel 8.1 gezeigt hat. `createMemoryApi` gibt dieselben Antworten aus dem Speicher des Browsers, ohne Server. `createApi` wählt eine der beiden, und kein Store merkt den Unterschied. Kapitel 8.6 zeigt, wie die Demo für die Mitgliederversammlung davon Gebrauch macht.

## Der Store als Fassade

Eine Fassade gibt einem ganzen Teilsystem einen einfachen Eingang. Der Store des Katalogs bietet die Dinge, einen Status und die Actions `load` und `markReturned`. Wie er lädt, wie die API antwortet und welche Meldungen bei einem Fehler entstehen, sehen die Seiten nicht.

::code{file="case/08-architecture/{lang}/src/features/catalog/catalogStore.js" lines="6-25"}

Pinia nennt seine Stores nicht Fassaden. Ein Store, der seine Daten selbst lädt und nur fertige Werte und Actions zeigt, erfüllt aber genau diese Aufgabe.

## Strategien fürs Sortieren

Eine Strategie ist ein austauschbares Verfahren für dieselbe Aufgabe. Jede Sortierung ist eine Funktion, die zwei Dinge vergleicht, und die Seite wählt eine davon, statt jede Sortierung selbst zu kennen.

::playground{dir="examples/08-architecture/sort-strategies"}

Die Fallbeispiel-App hält ihre Sortierungen in `src/features/catalog/sorters.js` und baut das Menü daraus. Die Sortierung nach Verfügbarkeit ist ein weiterer Eintrag, die Vorlage des Katalogs blieb dabei gleich.

## In deinem Projekt

Setz ein Muster dort ein, wo du sein Problem hast, nicht als Schmuck. Hast du eine API, die du später austauschen oder in Tests ersetzen willst, lohnt sich ein Adapter. Nenn das Muster im README oder in einem Architekturentscheid, dann weiss deine Lehrperson im Screencast, wonach sie schauen kann.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Gib im ersten Beispiel jeder `ItemCard` eine eigene Liste der Favoriten und nimm die Prop `favorite` weg. Was zeigt die Zahl oben?
2. Ersetze im Beispiel mit dem Adapter in `main.js` den Aufruf `createMemoryApi()` durch `createBrokenApi()`. Was ändert sich in `App.vue`, und was auf der Seite?
3. Ergänze im Beispiel mit den Strategien eine Sortierung «Pfand absteigend». In welchen Dateien schreibst du?
4. Die Kurs-API liefert die Dinge in einem anderen Format. Welche Dateien der Fallbeispiel-App ändern sich?

## Aufgaben

Die Aufgaben bauen einen Katalog mit Darstellung und Container, einem Adapter und Strategien. Du findest das Projekt im Kursrepo im Ordner `exercises/08-architecture/patterns/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
`ItemCard.vue` holt sich den Store der Favoriten selbst und lässt sich ohne Pinia nicht zeigen. Mach daraus eine Darstellungskomponente mit den Props `id`, `name`, `category`, `deposit` und `favorite`, die einen Klick auf «Favorit» als Event `toggle-favorite` mit der Nummer meldet. Die Seite des Katalogs wird zum Container, der den Store kennt.

:::solution[Lösung]
::code{file="exercises/08-architecture/patterns/solution/{lang}/src/components/ItemCard.vue"}

Die Seite übergibt mit `:favorite="favorites.isFavorite(item.id)"` den Zustand und ruft mit `@toggle-favorite="favorites.toggle"` den Store auf.
:::
::::

::::exercise[Vertiefung]
Der Verein prüft eine Ausleihsoftware. Sie liefert ihre Dinge in `public/things.json` in einem eigenen Format, mit `itemId`, `title`, `group`, dem Pfand in Rappen als `depositCents` und dem Tag der Rückgabe als `returnDate`. Schreib in `src/api/adapter.js` eine Funktion `toItem(thing)`, die daraus ein Ding im Format der App macht, und lass `fetchItems()` nur noch solche Dinge liefern. Keine Komponente kennt danach das fremde Format.

:::solution[Lösung]
::code{file="exercises/08-architecture/patterns/solution/{lang}/src/api/adapter.js"}

::code{file="exercises/08-architecture/patterns/solution/{lang}/src/api/items.js"}

Ändert die Ausleihsoftware ihr Format, ändert sich nur der Adapter.
:::
::::

::::exercise[Knobelei]
Die Seite sortiert mit einem `if` pro Sortierung, und das Menü steht fest in der Vorlage. Leg in `src/sorters.js` die Strategien `name`, `deposit` und `availability` an, jede mit `label` und `compare`, und bau das Menü aus diesen Einträgen. Nach Verfügbarkeit kommt zuerst, was da ist, danach der Rest nach dem Tag der Rückgabe.

:::solution[Lösung]
::code{file="exercises/08-architecture/patterns/solution/{lang}/src/sorters.js"}

::code{file="exercises/08-architecture/patterns/solution/{lang}/src/views/CatalogView.vue" lines="18-26"}

Ein Ding, das da ist, hat kein Datum. `?? ''` macht daraus einen leeren Text, der vor jedem Datum steht.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein Muster ohne passendes Problem macht den Code länger und nicht einfacher. | Ein Muster erst einsetzen, wenn das Problem auftaucht, das es löst. |
| Eine Darstellungskomponente ruft einen Store auf und lässt sich nicht mehr allein zeigen oder testen. | Daten als Props übergeben und Klicks als Events melden. |
| `inject` liefert `undefined`. | `provide` fehlt oder steht unter einem anderen Schlüssel. Den Schlüssel als `Symbol` aus einer Datei importieren. |
| Felder der fremden API tauchen in Komponenten auf. | Nur der Adapter kennt das fremde Format. |
| Eine neue Sortierung bringt ein weiteres `if` in die Seite. | Jede Sortierung als Strategie in eine Tabelle legen. |
| Ein KI-Assistent schlägt einen globalen Event-Bus mit `$on` vor. | Vue 3 hat `$on` laut [Migrationsleitfaden](https://v3-migration.vuejs.org/breaking-changes/events-api.html) entfernt. Props und Events, `provide` und `inject` oder einen Store verwenden. |

## Selbstcheck

::::selfcheck
1. Was beschreibt ein Entwurfsmuster, und wozu dienen seine Namen?
2. Wo steckt der Beobachter in Vue?
3. Was unterscheidet eine Darstellungskomponente von einem Container?
4. Warum ändern sich die Stores nicht, wenn die App eine Attrappe der API bekommt?

:::solution[Antworten]
1. Eine bewährte Lösung für ein wiederkehrendes Problem. Mit dem Namen lässt sich eine Lösung in einem Wort benennen.
2. In der Reaktivität. Effekte wie das Zeichnen einer Komponente oder ein `watch` lesen reaktive Werte und laufen nach einer Änderung erneut.
3. Die Darstellungskomponente bekommt alles über Props und meldet Events. Der Container kennt Stores und API.
4. Sie rufen nur Funktionen der API auf, die beide Adapter gleich anbieten, und bekommen ihre API über `inject`.
:::
::::

:::assignment
Die Stores wissen nicht mehr, woher die Daten kommen, und die Karte eines Dings passt auf jede Seite. Die neue Freiwillige fragt jetzt, warum die App Pinia verwendet, warum die API über einen Proxy läuft und warum das Formular beim Verlassen nicht mehr nachfragt. Niemand erinnert sich an alle Gründe. Das nächste Kapitel hält solche Entscheide fest.
:::
