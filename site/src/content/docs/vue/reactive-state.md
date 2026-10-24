---
title: Reaktiver Zustand
description: Zustand mit ref und reactive halten, abgeleitete Werte mit computed berechnen und den Katalog mit Suche, Filter und der Zahl der Dinge reaktiv machen.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler hat die Fragen vom Tresen in einen Auftrag gefasst.

> Als Mitglied möchte ich den Katalog nach dem Namen durchsuchen und nach Kategorie filtern, damit ich schnell finde, was ich brauche.

Die Akzeptanzkriterien lauten:

1. Ein Suchfeld zeigt nur Dinge, deren Name den Suchtext enthält, ohne auf Gross- und Kleinschreibung zu achten.
2. Eine Auswahl filtert nach Kategorie und lässt sich mit der Suche verbinden.
3. Über der Liste steht, wie viele Dinge gerade da sind, und unter dem Filter, wie viele Dinge gefunden wurden.
4. Passt nichts, erscheint «Keine Dinge gefunden.».
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, warum eine gewöhnliche Variable die Seite nicht aktualisiert,
- Zustand mit `ref` und `reactive` halten und ändern,
- abgeleitete Werte mit `computed` berechnen,
- entscheiden, wann eine Funktion und wann ein berechneter Wert passt,
- den Zustand einer Komponente in den Vue DevTools beobachten.
:::

## Zustand, dem die Seite folgt

In der SPA von Hand hast du nach jeder Änderung `render` aufgerufen. In Vue entfällt dieser Aufruf, wenn Vue von der Änderung erfährt. Dafür muss der Wert reaktiv sein. Das Beispiel zählt zurückgebrachte Dinge einmal mit einer gewöhnlichen Variablen und einmal mit `ref`. Überleg dir, was die beiden Zeilen nach einigen Klicks zeigen, und öffne dann die Konsole des Playgrounds.

::playground{dir="examples/03-vue/plain-and-ref"}

Ein Klick auf «Zählen ohne ref» erhöht die Variable, wie die Konsole zeigt, aber die Seite bleibt bei 0. Vue erfährt nichts von der Änderung. Ein Klick auf «Zählen mit ref» ändert einen reaktiven Wert, Vue rendert die Komponente neu und liest dabei auch die gewöhnliche Variable wieder. Darum springt die erste Zeile plötzlich auf den aktuellen Stand. Darauf darfst du dich nicht verlassen. Alles, was die Seite zeigen soll und sich ändert, gehört in einen reaktiven Wert.

## ref

`ref(0)` gibt ein Objekt mit der Eigenschaft `value` zurück. Im Script liest und schreibst du den Wert über `.value`, im Template packt Vue ihn selbst aus, `{{ returned }}` genügt. Vue merkt sich beim Rendern, welche Refs das Template liest, und rendert die Komponente neu, sobald sich einer davon ändert.

Ein Ref kann jeden Wert halten, Zahlen, Texte, Arrays und Objekte. Bei Arrays und Objekten bemerkt Vue auch Änderungen im Inneren, etwa `items.value.push(item)` oder `item.value.name = 'Leiter'`. Du kannst den ganzen Wert ersetzen, wie es die App mit `items.value = data` nach dem Laden tut. Die Variable selbst deklarierst du mit `const`, denn du änderst nie die Variable, sondern nur ihren Wert `value`.

## reactive

`reactive` macht ein Objekt selbst reaktiv. Seine Felder brauchen kein `.value`. Dahinter steckt ein Proxy, wie du ihn im Exkurs [Proxy und Getter](../../javascript/proxies/) aus Teil 1 kennengelernt hast. Lies das Beispiel und überleg dir, was die letzte Zeile nach einem Klick auf «Nach «säge» suchen» zeigt.

::playground{dir="examples/03-vue/reactive-filters"}

Die letzte Zeile bleibt leer. `const { query } = filters` kopiert den Wert, den `query` in diesem Moment hat, und die Kopie folgt dem Objekt nicht. Dasselbe passiert, wenn du der Variablen ein neues Objekt zuweist. Das Template zeigt dann weiter das alte, darum ändert `reset` die Felder einzeln. `reactive` funktioniert ausserdem nur mit Objekten, nicht mit Zahlen oder Texten.

Die Dokumentation von Vue empfiehlt `ref` als erste Wahl, weil es für alle Werte gleich funktioniert und diese Fallen nicht kennt. Der Kurs folgt dem. `reactive` passt für eine Gruppe von Feldern, die zusammengehören, etwa die Felder eines Formulars.

## computed

Viele Werte lassen sich aus anderen berechnen, die Zahl der Dinge, die da sind, oder die Liste, die zum Suchtext passt. Solche Werte speicherst du nicht in einem eigenen Ref, du leitest sie mit `computed` ab. Vue ruft die Funktion auf, merkt sich das Ergebnis und rechnet erst neu, wenn sich einer der Werte ändert, die die Funktion gelesen hat.

::playground{dir="examples/03-vue/computed-search"}

Das Suchfeld ist mit `v-model` an das Ref `query` gebunden. `v-model` hält Feld und Ref in beide Richtungen im Takt, das Kapitel «Formulare» zeigt, was dahintersteckt. Tippt jemand ins Suchfeld, ändert sich `query`. Vue rechnet `visibleItems` neu und rendert die Liste. `availableCount` hängt nur von `items` ab und bleibt, wie es ist.

![Abhängigkeiten der berechneten Werte im Katalog. Links stehen die Daten items und die Refs query und onlyAvailable. Der berechnete Wert visibleItems liest alle drei, availableCount liest nur items. Das Template zeigt die Liste aus visibleItems und die Zahl aus availableCount. Ändert sich query, rechnet Vue nur visibleItems neu.](../../../assets/figures/de/p3c4-computed.svg)

Ein berechneter Wert ist ein Ref, den du nur liest. Im Script schreibst du `visibleItems.value`, im Template `visibleItems`. Die Funktion darin soll nur rechnen und einen Wert zurückgeben. Daten laden, andere Refs ändern oder auf etwas warten gehört nicht hinein, dafür gibt es Funktionen für Events und `watch` aus Teil 5.

Statt `computed` könntest du eine Funktion schreiben und sie im Template aufrufen, `{{ availableCount() }}`. Das Ergebnis ist dasselbe, aber Vue führt die Funktion bei jedem Rendern aus, auch wenn sich nichts geändert hat, das sie betrifft. Für alles, was sich aus dem Zustand ergibt, ist `computed` die klarere Wahl. Funktionen passen für Aktionen wie `toggle` und für kleine Umformungen mit einem Argument wie `formatDate`.

## Zustand in den DevTools

In den Vue DevTools zeigt der Bereich neben dem Baum der Komponenten den Zustand der gewählten Komponente, Refs, reaktive Objekte und berechnete Werte. Tippst du ins Suchfeld, ändern sich `query` und `visibleItems` dort mit. Den Wert eines Refs kannst du in den DevTools auch ändern, und die Seite folgt sofort. So prüfst du schnell, ob ein Fehler im Zustand oder im Template steckt.

## Im Code

Arbeite mit dem Beispiel zur Suche. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Wie viele Dinge zeigt die Liste bei der Suche nach «zelt»? Und wie viele, wenn zusätzlich «Nur verfügbare» aktiv ist?
2. Ergänze in `visibleItems` die Zeile `console.log('neu berechnet')`. Wann erscheint die Meldung, und wann nicht?
3. Mach aus `availableCount` eine gewöhnliche Funktion und passe das Template an. Was ändert sich für die Seite, und was für die Arbeit von Vue?
4. Ersetze `const query = ref('')` durch `let query = ''`. Was passiert beim Tippen, und warum?

## Aufgaben

Die Aufgaben machen den Katalog aus dem letzten Kapitel durchsuchbar. Du findest das Projekt im Kursrepo im Ordner `exercises/03-vue/reactive-state/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Zeig über der Liste in einem Element mit der Klasse `summary`, wie viele Dinge da sind, etwa «49 von 60 Dingen sind da». Berechne die Zahl mit `computed`.

:::solution[Lösung]
::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue" lines="10-10"}

::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue" lines="31-31"}

`items` ändert sich in diesem Projekt nicht, darum rechnet Vue die Zahl nur einmal. Kommen die Daten wie im Fallbeispiel vom Server, rechnet derselbe Code nach dem Laden von selbst neu.
:::
::::

::::exercise[Vertiefung]
Ergänze ein Suchfeld `<input id="search" type="search">` mit einer Beschriftung und binde es mit `v-model` an ein Ref `query`. Die Liste zeigt nur Dinge, deren Name den Suchtext enthält, ohne auf Gross- und Kleinschreibung und auf Leerzeichen am Anfang und am Ende zu achten. Berechne die Liste mit `computed` und lass `v-for` über diese Liste laufen.

:::solution[Lösung]
::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue" lines="17-22"}

Die Bedingung mit `category` kommt erst in der Knobelei dazu. Ohne sie lautet der Filter `item.name.toLowerCase().includes(text)`. `trim` entfernt die Leerzeichen am Rand, `toLowerCase` gleicht die Schreibweise an. Ein leerer Suchtext ist in jedem Namen enthalten, darum zeigt die Liste dann alle Dinge. Im Template läuft `v-for` über `visibleItems` statt über `items`.
:::
::::

::::exercise[Knobelei]
Ergänze eine Auswahl `<select id="category">`. Die erste Option «Alle Kategorien» hat den Wert `''`, danach folgen die Kategorien aus den Daten, jede einmal und in alphabetischer Reihenfolge. Die Liste berücksichtigt Suche und Kategorie zusammen. Ein Element mit der Klasse `hits` nennt die Zahl der Treffer, «10 Dinge gefunden» oder «1 Ding gefunden». Passt nichts, steht statt der Liste «Keine Dinge gefunden.». `new Set` entfernt doppelte Werte, `localeCompare` vergleicht Texte für die Sortierung.

:::solution[Lösung]
::code{file="exercises/03-vue/reactive-state/solution/{lang}/src/App.vue"}

`categories` sammelt die Kategorien mit `new Set` und sortiert sie mit `localeCompare` und der Sprache der Seite, damit Umlaute richtig einsortiert werden. Eine Option ohne Attribut `value` liefert ihren Text als Wert, darum reicht `{{ name }}`. `hits` ist ein eigener berechneter Wert, weil er von `visibleItems` abhängt. Berechnete Werte dürfen andere berechnete Werte lesen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `count++` im Script ändert nichts, oder es erscheint ein Fehler. | Im Script `count.value++` schreiben, das Ref selbst ist ein Objekt. |
| `{{ count.value }}` im Template zeigt nichts. | Im Template packt Vue das Ref aus, `{{ count }}` genügt. |
| Nach `const { query } = filters` folgt `query` dem Objekt nicht mehr. | Über das Objekt zugreifen, `filters.query`, oder gleich `ref` verwenden. |
| Ein neues Objekt für eine Variable mit `reactive`, die Seite zeigt weiter die alten Werte. | Die Felder einzeln ändern oder ein `ref` verwenden und `.value` ersetzen. |
| Vue meldet `Write operation failed: computed value is readonly`. | Einen berechneten Wert nicht zuweisen. Die Refs ändern, aus denen er berechnet wird. |
| Ein KI-Assistent schreibt `data()` und `this.query`. | Das ist die Options API. In `<script setup>` entsteht Zustand mit `ref`, und es gibt kein `this`. |
| Ein KI-Assistent hält eine gefilterte Liste mit `watch` in einem eigenen Ref aktuell. | Abgeleitete Werte mit `computed` berechnen, das ist kürzer und kann nicht aus dem Takt geraten. |

## Selbstcheck

::::selfcheck
1. Warum zeigt die Seite die Änderung einer gewöhnlichen Variablen nicht an?
2. Wann brauchst du `.value`, und wann nicht?
3. Was geht verloren, wenn du ein reaktives Objekt destrukturierst?
4. Worin unterscheidet sich ein berechneter Wert von einer Funktion, die das Template aufruft?

:::solution[Antworten]
1. Vue erfährt nichts von der Änderung. Nur reaktive Werte melden Vue, dass sich etwas geändert hat.
2. Im Script bei Refs und berechneten Werten. Im Template packt Vue sie aus, und bei `reactive` braucht es nie `.value`.
3. Die Verbindung. Die Variablen bekommen den Wert dieses Moments und folgen dem Objekt danach nicht mehr.
4. Vue merkt sich das Ergebnis eines berechneten Werts und rechnet nur neu, wenn sich seine Abhängigkeiten ändern. Eine Funktion läuft bei jedem Rendern.
:::
::::

:::assignment
Suche und Filter kommen am Tresen gut an. Jetzt fehlt Martina Hostettler noch das Wichtigste. «Die Mitglieder sollen ein Ding reservieren können, mit dem ersten und dem letzten Tag, und die App soll Fehler gleich melden.» Das nächste Kapitel baut das Formular dafür.
:::
