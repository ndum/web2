---
title: Template-Syntax
description: Werte mit Interpolation und v-bind anzeigen, Klassen und Stile binden, mit v-if, v-show und v-for Teile und Listen rendern und mit v-on auf Events reagieren.
sidebar:
  order: 3
---

:::assignment
Martina Hostettler möchte den Katalog in der neuen App sehen, so wie er in der Version von Hand aussah.

> Als Mitglied möchte ich im Katalog alle Dinge mit Kategorie und Verfügbarkeit sehen, damit ich weiss, was ich ausleihen kann.

Die Akzeptanzkriterien lauten:

1. Der Katalog zeigt jedes Ding mit Name und Kategorie.
2. Verfügbare Dinge sind mit «Verfügbar» markiert, ausgeliehene mit dem Datum, ab dem sie wieder da sind, und sie sehen anders aus.
3. Ein Klick auf den Namen zeigt das Pfand des Dings.
:::

:::goals
Nach diesem Kapitel kannst du

- Werte mit Interpolation anzeigen und Attribute mit `v-bind` binden,
- Klassen und Stile abhängig von Daten setzen,
- Teile der Seite mit `v-if` und `v-show` bedingt anzeigen,
- Listen mit `v-for` und `key` rendern,
- mit `v-on` auf Events reagieren und Modifikatoren einsetzen.
:::

## Interpolation

Das Template einer Komponente ist HTML mit einigen Zusätzen. Der einfachste ist die Interpolation mit doppelten geschweiften Klammern. Vue wertet den Ausdruck darin aus und setzt das Ergebnis als Text ein. Lies das Beispiel und überleg dir für jeden Absatz, was erscheint.

::playground{dir="examples/03-vue/interpolation"}

Zwischen den Klammern steht ein JavaScript-Ausdruck, also etwas, das einen Wert ergibt. Aufrufe wie `toUpperCase()`, Rechnungen und der Operator `? :` sind erlaubt, Anweisungen wie `if`, Schleifen oder `const` nicht. Für Längeres gibt es Funktionen im Script und die berechneten Werte aus dem nächsten Kapitel.

Der letzte Absatz zeigt die Tags von `note` als Zeichen. Vue setzt Interpolation immer als Text ein und erledigt damit das, wofür du in Teil 2 `escapeHtml` gebraucht hast. Die Direktive `v-html` setzt dagegen HTML ein, ohne es zu prüfen. Sie gehört nur zu Inhalten, die du selbst geschrieben hast, nie zu Daten von Mitgliedern oder aus einer API.

## Attribute binden

Interpolation funktioniert nur im Text, nicht in Attributen. Ein Attribut bindest du mit der Direktive `v-bind` an einen Ausdruck, meist in der Kurzform mit einem Doppelpunkt. `:href="'#/items/' + item.id"` setzt das Attribut `href` auf das Ergebnis des Ausdrucks. Direktiven sind Attribute, die mit `v-` beginnen und Vue sagen, was es mit einem Element tun soll.

![Die Teile einer Direktive. Eine Direktive für einen Klick ist in Teile zerlegt, v-on ist der Name der Direktive, click das Argument, prevent ein Modifikator und reserve der Wert, ein JavaScript-Ausdruck. Darunter stehen die Kurzformen, das At-Zeichen ersetzt v-on und der Doppelpunkt ersetzt v-bind.](../../../assets/figures/de/p3c3-directive.svg)

Bei Attributen wie `disabled`, die nur an oder aus sind, entfernt Vue das Attribut, wenn der Ausdruck `false` ergibt. `:disabled="item.availableFrom !== null"` sperrt den Knopf also nur bei ausgeliehenen Dingen.

::playground{dir="examples/03-vue/bindings"}

## Klassen und Stile

Für Klassen hat `:class` eine eigene Schreibweise. Du übergibst ein Objekt, dessen Schlüssel Klassen sind, und Vue setzt jede Klasse, deren Wert wahr ist. `:class="{ 'on-loan': drill.availableFrom !== null }"` setzt die Klasse `on-loan` nur bei ausgeliehenen Dingen. Ein gewöhnliches Attribut `class` daneben bleibt erhalten, Vue fügt beides zusammen. Statt eines Objekts geht auch ein Array wie `:class="['card', size]"`.

`:style` nimmt ein Objekt mit CSS-Eigenschaften in camelCase, etwa `{ borderWidth: '3px' }`. Klassen sind meist die bessere Wahl, weil das Aussehen dann im CSS bleibt und sich an einer Stelle ändern lässt.

## Bedingungen

`v-if` rendert ein Element nur, wenn der Ausdruck wahr ist. Mit `v-else-if` und `v-else` direkt dahinter entsteht eine Kette, von der Vue genau einen Teil anzeigt. Das passt zu den Zuständen beim Laden, die du aus Teil 2 kennst.

::playground{dir="examples/03-vue/conditions"}

`v-show` versteckt ein Element dagegen nur mit `display: none`, es bleibt in der Seite. Das lohnt sich für Teile, die oft auf- und zugehen. `v-if` passt, wenn ein Teil selten erscheint oder ein Element ganz fehlen soll. Willst du mehrere Elemente gemeinsam ein- und ausblenden, ohne ein zusätzliches Element in die Seite zu setzen, schreibst du `v-if` an ein `<template>`. Das Element `<template>` selbst rendert Vue nicht.

## Listen

`v-for` rendert ein Element für jeden Eintrag eines Arrays. `v-for="item in items"` stellt den Eintrag unter dem Namen `item` bereit, `v-for="(item, index) in items"` zusätzlich seine Position.

::playground{dir="examples/03-vue/lists"}

Das Attribut `:key` sagt Vue, welches Element zu welchem Eintrag gehört. Ändert sich die Liste, etwa durch einen Filter oder eine neue Sortierung, verschiebt Vue die vorhandenen Elemente anhand des Schlüssels, statt sie der Reihe nach neu zu befüllen. Ohne Schlüssel kann ein Eingabefeld oder ein offenes Detail beim falschen Ding landen. Der Schlüssel muss eindeutig und beständig sein, die id eines Dings eignet sich, die Position `index` nicht, denn sie ändert sich beim Filtern.

Setze `v-if` und `v-for` nie an dasselbe Element. Vue wertet `v-if` zuerst aus, und die Variable der Schleife gibt es dann noch nicht. Für eine gefilterte Liste gibt es berechnete Werte aus dem nächsten Kapitel, oder du setzt `v-for` an ein umschliessendes `<template>`.

## Events

`v-on` reagiert auf Events, meist in der Kurzform mit `@`. `@click="reserve"` ruft bei einem Klick die Funktion `reserve` auf. Steht ein Ausdruck da, führt Vue ihn aus, etwa `@click="count = 0"` oder `@click="toggle(item.id)"`. Das Event selbst steht dabei unter `$event` bereit.

Die Beispiele brauchen einen Wert, der sich ändern kann. Dafür steht `ref`, ein Wert, dem das Template folgt. Im Script liest und schreibst du ihn über `.value`, im Template ohne. Das nächste Kapitel erklärt, was dahintersteckt.

::playground{dir="examples/03-vue/events"}

Modifikatoren hängen mit einem Punkt an der Direktive und erledigen häufige Aufgaben. `.prevent` ruft `preventDefault()` auf, der Link führt dann nirgends hin. `.stop` hält das Event auf, bevor es zu umgebenden Elementen gelangt, und `.once` reagiert nur auf das erste Event. Bei Tasten wählen Modifikatoren wie `.enter` oder `.esc` die Taste aus, `@keyup.enter` reagiert also nur auf die Eingabetaste.

## Im Code

Arbeite mit dem Beispiel zur Liste. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Was zeigt die Liste, wenn du beim Raclette-Ofen `availableFrom` auf `'2026-11-20'` setzt?
2. Setz an das Element `li` zusätzlich `v-if="item.availableFrom === null"`. Was meldet der Playground, und warum?
3. Löse das Problem aus Frage 2 mit einem `<template v-for="item in items" :key="item.id">` um das Element `li`, das nur noch `v-if` trägt.
4. Ändere `:key="item.id"` in `:key="index"`. Was siehst du, und warum fällt der Unterschied in diesem Beispiel nicht auf?

## Aufgaben

Die Aufgaben bauen den Katalog aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/03-vue/template-syntax/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Mit `npm run dev` siehst du den Katalog im Browser. Zu Beginn schlagen alle Tests fehl.

::::exercise[Einstieg]
Zeig in `App.vue` alle Dinge als Liste `<ul class="catalog">`. Jeder Eintrag `li` enthält den Namen in einem Element mit der Klasse `name` und die Kategorie in einem Element mit der Klasse `category`. Gib jedem Eintrag die id als `key`.

:::solution[Lösung]
Die Liste entsteht mit `<li v-for="item in items" :key="item.id">`. Darin stehen `<span class="name">{{ item.name }}</span>` und `<span class="category">{{ item.category }}</span>`. Die Lösung der Knobelei macht aus dem Namen später einen Knopf, die Klasse `name` bleibt.
:::
::::

::::exercise[Vertiefung]
Zeig bei jedem Ding in einem Element mit der Klasse `state` «Verfügbar» oder «Wieder verfügbar ab 12.11.2026». Das Datum formatiert `formatDate` aus `src/format.js`. Gib den Einträgen ausgeliehener Dinge die Klasse `on-loan`, das CSS färbt ihren Zustand dann rot.

:::solution[Lösung]
Die Klasse hängt am Element `li`.

::code{file="exercises/03-vue/template-syntax/solution/{lang}/src/App.vue" lines="19-19"}

Für den Zustand stehen zwei Elemente mit `v-if` und `v-else` direkt hintereinander.

::code{file="exercises/03-vue/template-syntax/solution/{lang}/src/App.vue" lines="24-25"}

Damit `formatDate` im Template bereitsteht, importierst du es im Script. Alles, was `<script setup>` importiert, kann das Template verwenden.
:::
::::

::::exercise[Knobelei]
Mach aus dem Namen einen Knopf `button` mit der Klasse `name`. Ein Klick darauf zeigt in einem Element mit der Klasse `details` das Pfand, etwa «Pfand CHF 80.00», ein zweiter Klick versteckt es wieder. Es ist immer höchstens ein Ding offen. Die Details stehen mit `v-show` in jedem Eintrag, und `aria-expanded` am Knopf sagt Screenreadern, ob sie offen sind. Den Zustand hält `const openId = ref(null)`, das Pfand formatiert `formatDeposit`.

:::solution[Lösung]
::code{file="exercises/03-vue/template-syntax/solution/{lang}/src/App.vue"}

`openId` merkt sich die id des offenen Dings. Weil es nur einen solchen Wert gibt, kann immer nur ein Ding offen sein. `toggle` schliesst die Details, wenn jemand ein zweites Mal auf denselben Namen klickt. `:aria-expanded` bekommt `true` oder `false`, und Vue schreibt den Wert als Text in das Attribut. Ein Knopf statt eines gewöhnlichen Texts lässt sich auch mit der Tastatur erreichen und auslösen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `href="{{ link }}"` führt auf eine Adresse mit geschweiften Klammern. | In Attributen gibt es keine Interpolation. `:href="link"` schreiben. |
| `disabled="false"` sperrt den Knopf trotzdem. | Ohne Doppelpunkt ist der Wert ein Text, und das Attribut ist gesetzt. `:disabled="false"` schreiben. |
| Vue meldet `v-else/v-else-if has no adjacent v-if or v-else-if.` | `v-else` muss direkt auf das Element mit `v-if` folgen, ohne ein anderes Element dazwischen. |
| Nach dem Filtern stehen Eingaben oder offene Details beim falschen Ding. | Als `key` eine beständige id verwenden, nicht die Position. |
| `v-if` und `v-for` am selben Element, die Variable der Schleife fehlt. | `v-for` an ein umschliessendes `<template>` setzen oder die Liste vorher filtern. |
| Ein KI-Assistent zeigt Text aus den Daten mit `v-html` an. | Interpolation verwenden. `v-html` setzt HTML ungeprüft ein und öffnet die Tür für eingeschleusten Code. |

## Selbstcheck

::::selfcheck
1. Worin unterscheidet sich `{{ note }}` von `v-html="note"`?
2. Was passiert bei `disabled="false"` und was bei `:disabled="false"`?
3. Wann wählst du `v-show` statt `v-if`?
4. Warum braucht `v-for` einen `key`, und welcher Wert eignet sich dafür?

:::solution[Antworten]
1. Interpolation setzt den Wert als Text ein, Tags erscheinen als Zeichen. `v-html` setzt ihn als HTML ein, ohne ihn zu prüfen.
2. Ohne Doppelpunkt ist `"false"` ein Text, das Attribut ist gesetzt und der Knopf gesperrt. Mit Doppelpunkt ergibt der Ausdruck `false`, und Vue entfernt das Attribut.
3. Wenn ein Teil oft auf- und zugeht. `v-show` versteckt das Element nur, `v-if` entfernt es und baut es wieder auf.
4. Damit Vue beim Ändern der Liste die Elemente den richtigen Einträgen zuordnet. Geeignet ist ein eindeutiger, beständiger Wert wie die id.
:::
::::

:::assignment
Der Katalog steht, und am Tresen schauen schon die ersten Freiwilligen hinein. Mit 60 Dingen wird die Liste aber lang. «Kann man darin suchen und nach Kategorie filtern?», fragt Martina Hostettler. «Und am Tresen möchten wir sehen, wie viele Dinge gerade da sind.» Das nächste Kapitel macht den Katalog reaktiv.
:::
