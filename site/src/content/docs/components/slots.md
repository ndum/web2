---
title: Slots
description: Inhalte mit Slots an eine Komponente übergeben, Ersatzinhalt festlegen, benannte und Scoped Slots verwenden und damit einen Seitenrahmen und einen zugänglichen Dialog bauen.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler möchte nichts mehr verschicken, das sie nicht noch einmal gesehen hat.

> Als Mitglied möchte ich meine Anfrage vor dem Senden noch einmal sehen und bestätigen, damit ich keine falschen Angaben schicke.

Der Freiwillige hat einen zweiten Wunsch angehängt. Katalog und Seite eines Dings sollen denselben Rahmen mit Kopf und Fuss haben, ohne dass jede Seite ihn selbst zusammenbaut. Die Akzeptanzkriterien lauten:

1. Nach «Anfrage senden» erscheint ein Dialog mit dem Ding, den Tagen und der Mitgliedernummer.
2. Der Dialog hat die Knöpfe «Bestätigen» und «Zurück», erst nach «Bestätigen» ist die Anfrage erfasst.
3. Katalog und Seite eines Dings stehen im selben Rahmen mit Kopf und Fuss.
:::

:::goals
Nach diesem Kapitel kannst du

- Inhalte mit einem Standard-Slot an eine Komponente übergeben,
- Ersatzinhalt für einen leeren Slot festlegen,
- benannte Slots für mehrere Stellen einer Komponente verwenden,
- mit Scoped Slots Daten an die Elternkomponente zurückgeben,
- einen Seitenrahmen und einen zugänglichen Dialog als Komponenten bauen.
:::

## Inhalte übergeben

Mit Props gibst du einer Komponente Werte, einen Namen oder eine Zahl. Manchmal soll sie aber ganze Inhalte aufnehmen, einen Absatz mit Hervorhebung, einen Knopf oder eine andere Komponente. Dafür gibt es Slots. `<slot />` im Template markiert die Stelle, an der der Inhalt erscheint, den die Elternkomponente zwischen die Tags der Komponente schreibt.

::playground{dir="examples/04-components/default-slot"}

Die erste `InfoBox` zeigt den Text mit dem fett gesetzten Namen. Die zweite bekommt nichts und zeigt den Ersatzinhalt, der zwischen `<slot>` und `</slot>` steht. Der Inhalt eines Slots gehört zur Elternkomponente. Er kann deren Daten verwenden, nicht aber die der Komponente, in die er kommt.

## Benannte Slots

Ein Seitenrahmen braucht mehrere Stellen, den Kopf, den Inhalt und den Fuss. Dafür bekommen Slots einen Namen, `<slot name="header">`. Die Elternkomponente füllt sie mit `<template #header>`, der Kurzform von `v-slot:header`. Alles, was nicht in einem solchen `<template>` steht, landet im Standard-Slot ohne Namen.

::playground{dir="examples/04-components/named-slots"}

`PageLayout` legt fest, wie Kopf, Inhalt und Fuss angeordnet sind. Die Seiten bestimmen nur, was darin steht. Ändert der Verein später den Rahmen, ändert sich eine Datei, nicht jede Seite.

![Inhalte füllen die Slots einer Komponente. Links das Template der Elternkomponente mit BaseDialog. Sie füllt den Slot title mit dem Titel, den Standard-Slot mit dem Text der Anfrage und den Slot actions mit einem Knopf. Rechts das Template von BaseDialog mit den drei Stellen für den Titel, den Inhalt und die Knöpfe. Pfeile verbinden jeden Inhalt mit seinem Slot.](../../../assets/figures/de/p4c4-slots.svg)

## Ein Dialog mit Slots

Der Dialog für die Anfrage ist ein allgemeiner Baustein, darum heisst er `BaseDialog`. Er weiss nichts von Reservationen. Seine Slots nehmen den Titel, den Inhalt und die Knöpfe auf, und ohne Knöpfe zeigt er einen Knopf zum Schliessen, der das Event `close` auslöst.

::playground{dir="examples/04-components/dialog"}

Damit ein Screenreader den Dialog erkennt, trägt er `role="dialog"` und `aria-modal="true"`. `aria-labelledby` verweist auf die id des Titels, und ein Screenreader liest ihn beim Öffnen vor. Die id stammt von `useId()`, einer Funktion von Vue 3.5, die in jeder Komponente eine eindeutige id liefert. Zwei Dialoge kommen sich so nicht in die Quere.

Zwei Dinge fehlen dem Dialog noch. Der Fokus springt beim Öffnen nicht hinein, und die Taste Escape schliesst ihn nicht. Dafür braucht es Zugriff auf Elemente des DOM, den Teil 5 mit Template-Refs zeigt. Das HTML-Element `<dialog>` mit seiner Methode `showModal()` erledigt beides von selbst und ist eine Alternative, die ebenfalls ein Template-Ref braucht.

## Scoped Slots

Manchmal kennt die Komponente die Daten, aber die Elternkomponente soll entscheiden, wie sie aussehen. `ItemList` kennt die Dinge und baut die Liste, der Katalog möchte darin aber Karten zeigen und eine kurze Übersicht nur Namen. Dafür gibt die Komponente dem Slot Daten mit, `<slot name="item" :item="item">`. Die Elternkomponente nimmt sie mit `<template #item="{ item }">` entgegen.

::playground{dir="examples/04-components/scoped-slot"}

Die erste Liste gestaltet ihre Einträge selbst, die zweite zeigt den Ersatzinhalt mit dem Namen. Weil die Daten pro Eintrag kommen, heisst diese Form Scoped Slot, ein Slot mit eigenem Gültigkeitsbereich.

## Im Code

Arbeite mit dem Beispiel zum Dialog. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Was zeigt der Dialog, wenn `App` das `<template #actions>` weglässt? Und was, wenn auch `#title` fehlt?
2. Öffne den Dialog und untersuche ihn mit den Entwicklertools des Browsers. Auf welches Element verweist `aria-labelledby`?
3. Setz in `App` zwei `BaseDialog` nebeneinander. Haben ihre Titel dieselbe id?
4. Verschiebe den Absatz mit der Bohrmaschine in ein `<template #default>`. Ändert sich etwas, und warum?

## Aufgaben

Die Aufgaben bauen den Rahmen der Seite, den Dialog und eine Liste mit Scoped Slot. Du findest das Projekt im Kursrepo im Ordner `exercises/04-components/slots/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Lege `src/components/PageLayout.vue` an. Die Komponente hat einen Slot `header` in einem Element `header`, den Standard-Slot in einem Element `main` und einen Slot `footer` in einem Element `footer`. Ohne Inhalt für den Kopf zeigt sie «Lorraine Commons». Rahme die Seite in `App.vue` damit ein, sodass `App.vue` selbst kein Element `header` mehr enthält.

:::solution[Lösung]
::code{file="exercises/04-components/slots/solution/{lang}/src/components/PageLayout.vue"}

In `App.vue` steht der Inhalt der Seite zwischen `<PageLayout>` und `</PageLayout>`, Kopf und Fuss stehen in `<template #header>` und `<template #footer>`.

::code{file="exercises/04-components/slots/solution/{lang}/src/App.vue" lines="21-39"}
:::
::::

::::exercise[Vertiefung]
Lege `src/components/BaseDialog.vue` an. Der Slot `title` steht in einem `h2`, der Standard-Slot darunter und der Slot `actions` am Ende. Ohne Knöpfe zeigt der Dialog einen Knopf «Schliessen», der das Event `close` auslöst. Das äussere Element des Dialogs trägt `role="dialog"`, `aria-modal="true"` und `aria-labelledby` mit der id des Titels. In `App` öffnet der Knopf «Anfrage senden» den Dialog mit dem Titel «Anfrage prüfen» und den Knöpfen «Bestätigen» und «Zurück».

:::solution[Lösung]
::code{file="exercises/04-components/slots/solution/{lang}/src/components/BaseDialog.vue" lines="1-24"}

`App` zeigt den Dialog mit `v-if` und füllt seine Slots.

::code{file="exercises/04-components/slots/solution/{lang}/src/App.vue" lines="41-48"}

`$emit('close')` im Template löst das Event aus, ohne dass das Script `defineEmits` als Funktion braucht. Die Deklaration mit `defineEmits(['close'])` dokumentiert das Event trotzdem.
:::
::::

::::exercise[Knobelei]
Lege `src/components/ItemList.vue` an. Sie bekommt die Prop `items` und zeigt für jedes Ding einen Eintrag. Jeder Eintrag ist ein Slot `item`, der das Ding als `item` mitgibt und ohne Inhalt den Namen zeigt. Verwende die Liste in `App` für die weiteren Dinge und zeig darin zu jedem Ding das Pfand, etwa «Bohrmaschine, Pfand CHF 20.00».

:::solution[Lösung]
::code{file="exercises/04-components/slots/solution/{lang}/src/components/ItemList.vue"}

::code{file="exercises/04-components/slots/solution/{lang}/src/App.vue" lines="30-34"}

`ItemList` kümmert sich um die Liste und die Schlüssel, `App` nur um den Inhalt eines Eintrags. Dieselbe Liste kann auf der Seite mit den Favoriten Karten zeigen und hier eine kurze Zeile.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Der Inhalt eines Slots greift auf Daten der Komponente zu und bekommt nichts. | Ein Slot sieht nur die Daten der Elternkomponente. Die Komponente gibt Daten über einen Scoped Slot mit. |
| Vue meldet `v-slot can only be used on components or <template> tags.` | `#header` an ein `<template>` oder direkt an die Komponente setzen, nicht an ein `div`. |
| Inhalt für einen benannten Slot erscheint im Standard-Slot. | Den Inhalt in ein `<template #name>` setzen. |
| Ein Dialog ohne `role` und Beschriftung, ein Screenreader erkennt ihn nicht. | `role="dialog"`, `aria-modal="true"` und `aria-labelledby` setzen. |
| Jeder Dialog verwendet die feste id `dialog-title`, und zwei Dialoge haben dieselbe. | Die id mit `useId()` erzeugen. |
| Ein KI-Assistent schreibt `slot="header"` an ein Element. | Diese Schreibweise stammt aus Vue 2, in Vue 3 landet der Inhalt im Standard-Slot. `<template #header>` verwenden. |

## Selbstcheck

::::selfcheck
1. Worin unterscheiden sich Props und Slots?
2. Wann erscheint der Ersatzinhalt eines Slots?
3. Wie kommt ein Inhalt in einen benannten Slot?
4. Wofür braucht es einen Scoped Slot?

:::solution[Antworten]
1. Props übergeben Werte, Slots ganze Inhalte aus HTML und Komponenten.
2. Wenn die Elternkomponente für diesen Slot nichts übergibt.
3. Die Elternkomponente setzt ihn in ein `<template #name>`, die Komponente zeigt ihn an der Stelle von `<slot name="name">`.
4. Wenn die Komponente die Daten kennt, die Elternkomponente aber bestimmen soll, wie sie aussehen, etwa die Einträge einer Liste.
:::
::::

:::assignment
Der Dialog kommt gut an. Martina Hostettler hat aber bemerkt, dass sie ihre Mitgliedernummer jedes Mal neu eintippt. «Die App weiss doch, wer angemeldet ist.» Der Freiwillige fügt an, dass der Dialog am Ende der Seite stehen sollte und nicht mitten im Formular. Beides löst das nächste Kapitel.
:::
