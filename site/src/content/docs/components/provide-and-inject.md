---
title: Provide und Inject
description: Werte mit provide und inject tief in den Baum der Komponenten geben, Regeln für den Entwurf von Komponenten anwenden und Inhalte mit Teleport an das Ende der Seite verschieben.
sidebar:
  order: 5
---

:::assignment
Bis Teil 6 einen Login bringt, gilt Martina Hostettler mit der Mitgliedernummer M-117 als angemeldetes Testmitglied. Die App soll das schon jetzt nutzen.

> Als angemeldetes Mitglied möchte ich, dass meine Mitgliedernummer im Formular schon steht, damit ich sie nicht jedes Mal eintippen muss.

Die Akzeptanzkriterien lauten:

1. Im Kopf steht, wer angemeldet ist.
2. Das Formular füllt die Mitgliedernummer des angemeldeten Mitglieds aus, und sie bleibt änderbar.
3. Die Komponenten zwischen `App` und dem Formular wissen nichts vom Mitglied.
4. Der Dialog steht im DOM am Ende der Seite und überdeckt alles.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, wann das Durchreichen von Props mühsam wird,
- Werte mit `provide` bereitstellen und mit `inject` holen,
- Schlüssel für `provide` und `inject` in einer eigenen Datei festlegen,
- die Regeln für den Entwurf von Komponenten anwenden,
- Inhalte mit `Teleport` an eine andere Stelle der Seite verschieben.
:::

## Props durchreichen

`App` kennt das angemeldete Mitglied, das Formular braucht seine Nummer. Dazwischen liegt die Seite des Dings. Mit Props muss jede Komponente auf dem Weg das Mitglied entgegennehmen und weitergeben, auch wenn sie selbst nichts damit anfängt. Schau dir an, wie das Mitglied im Beispiel zum Formular kommt.

::playground{dir="examples/04-components/prop-drilling"}

`ItemPage` deklariert die Prop `member` nur, um sie weiterzureichen. Bei zwei Ebenen geht das noch. Bei fünf Ebenen hängen fünf Komponenten an einem Wert, den nur die letzte braucht, und eine Änderung am Mitglied zieht sich durch alle Dateien. Dieses Durchreichen heisst auf Englisch Prop Drilling.

![Props durchreichen oder provide und inject. Links reicht App das Mitglied als Prop an ItemView weiter und ItemView an ReservationForm, obwohl ItemView es selbst nicht braucht. Rechts stellt App das Mitglied mit provide bereit, und ReservationForm holt es mit inject, ohne dass ItemView davon weiss.](../../../assets/figures/de/p4c5-provide-inject.svg)

## provide und inject

Mit `provide` stellt eine Komponente einen Wert für alle Komponenten unter ihr bereit. Jede davon holt ihn mit `inject`, egal wie tief sie liegt. Die Komponenten dazwischen merken nichts davon.

::playground{dir="examples/04-components/provide-inject"}

Der Schlüssel ist ein `Symbol` aus der Datei `keys.js`. Zwei Symbole sind nie gleich, auch wenn sie dieselbe Beschreibung haben. So kann kein anderes `provide` den Wert aus Versehen überschreiben, und wer den Wert braucht, importiert den Schlüssel aus derselben Datei. Das zweite Argument von `inject` ist der Standardwert, falls keine Komponente darüber den Wert bereitstellt.

`App` stellt ein Ref bereit, darum bleibt der Wert reaktiv. Ändert sich das Mitglied, etwa nach dem Login in Teil 6, sehen alle Komponenten den neuen Wert. `readonly` sorgt dafür, dass nur `App` ihn ändern kann. Soll eine Komponente weiter unten etwas ändern dürfen, stellt `App` zusätzlich eine Funktion bereit, etwa zum Abmelden, und behält so die Kontrolle über den Wert.

## Regeln für Komponenten

Mit Props, Events, Slots und `provide` hast du alle Wege, auf denen Komponenten zusammenarbeiten. Einige Regeln helfen, sie richtig zu wählen.

1. Props gehen nach unten, Events nach oben. Jeder Wert hat eine Komponente, die ihn besitzt und ändert.
2. Präsentationskomponenten wie `ItemCard`, `SearchBar` und `BaseDialog` zeigen nur, was sie bekommen, und melden, was passiert. Containerkomponenten wie `App`, `CatalogView` und `ItemView` besitzen Daten und entscheiden. Präsentationskomponenten lassen sich wiederverwenden und leicht testen.
3. Schnittstellen bleiben klein. Eine Komponente bekommt nur die Werte, die sie braucht, und kennt nur die Events, die sie wirklich auslöst.
4. `provide` und `inject` passen für Werte, die viele Komponenten tief im Baum brauchen, wie das angemeldete Mitglied, die Sprache oder ein Farbschema. Zwischen Eltern und Kind bleiben Props deutlicher. Für Zustand, den viele Teile der App ändern, kommt in Teil 7 Pinia.

## Teleport

Der Dialog steht im Template des Formulars, also im DOM mitten in der Seite. Hat ein Vorfahre `overflow: hidden` oder `transform`, schneidet er den Dialog ab oder hält ihn gefangen, auch mit `position: fixed`. `<Teleport to="body">` rendert den Inhalt stattdessen am Ende von `body`. Für Vue bleibt er ein Teil der Komponente, Props, Events und `inject` funktionieren wie vorher.

::playground{dir="examples/04-components/teleport"}

Ohne Teleport bleibt der Dialog in der Karte und wird abgeschnitten, mit Teleport liegt er über der ganzen Seite. Das Ziel muss beim Rendern schon existieren. `body` ist immer da, ein eigenes Element wie `<div id="modals">` muss in `index.html` stehen.

:::deepdive[Dynamische Komponenten und KeepAlive]
`<component :is="current">` rendert die Komponente, die in `current` steht. Ein Wechsel des Werts tauscht die Komponente aus. `<KeepAlive>` darum herum behält die gerade nicht sichtbare Komponente samt ihrem Zustand, statt sie zu zerstören.

::playground{dir="examples/04-components/dynamic-keepalive"}

Tipp eine Notiz, wechsle zu den Regeln und zurück, die Notiz ist noch da. Ohne `KeepAlive` ist sie weg. `shallowRef` hält die Komponente, ohne sie selbst reaktiv zu machen. In Teil 6 rendert Vue Router die Seiten nach demselben Prinzip, und `KeepAlive` lässt sich dort ebenso einsetzen. Die Fallbeispiel-App behält den Suchtext stattdessen in `App`, weil so sichtbar bleibt, wo er liegt.
:::

## Im Code

Arbeite mit dem Beispiel zu `provide` und `inject`. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Was zeigt das Formular? Woher kommen der Name und die Nummer?
2. Kommentiere `provide` in `App` aus. Was zeigt das Formular jetzt, und warum erscheint keine Warnung?
3. Entferne zusätzlich den Standardwert `null` in `inject`. Was meldet die Konsole?
4. Wechsle zum Beispiel mit Teleport, nimm den Haken bei «Mit Teleport» weg und öffne den Dialog. Wo steht er jetzt im DOM?

## Aufgaben

Die Aufgaben geben das Testmitglied durch den Baum und verschieben den Dialog. Du findest das Projekt im Kursrepo im Ordner `exercises/04-components/provide-inject/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests. Der Schlüssel `memberKey` steht schon in `src/keys.js`.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Stell in `App.vue` das Mitglied mit `provide` und dem Schlüssel `memberKey` bereit, schreibgeschützt mit `readonly`. `AppHeader` holt es mit `inject` und dem Standardwert `null` und zeigt in einem Element mit der Klasse `member` «Angemeldet als Martina Hostettler». Ohne Mitglied fehlt die Zeile.

:::solution[Lösung]
::code{file="exercises/04-components/provide-inject/solution/{lang}/src/App.vue" lines="9-13"}

::code{file="exercises/04-components/provide-inject/solution/{lang}/src/components/AppHeader.vue"}

Im Template packt Vue das Ref aus, darum genügt `member.name`. Ohne `App` darüber, etwa in einem Test, liefert `inject` den Standardwert `null`, und `v-if` lässt die Zeile weg.
:::
::::

::::exercise[Vertiefung]
`ReservationForm` holt das Mitglied ebenfalls mit `inject` und füllt das Feld der Mitgliedernummer damit aus. Ohne Mitglied bleibt das Feld leer. `ItemPage` bekommt keine Prop für das Mitglied.

:::solution[Lösung]
::code{file="exercises/04-components/provide-inject/solution/{lang}/src/components/ReservationForm.vue" lines="9-11"}

`member?.value.number` liest die Nummer, wenn es ein Mitglied gibt, sonst greift `?? ''`. Das Feld bekommt nur den Startwert, danach gehört sein Inhalt dem Formular. Ein Mitglied, das für jemand anderen reserviert, kann die Nummer also ändern.
:::
::::

::::exercise[Knobelei]
Der Dialog nach dem Senden soll im DOM am Ende der Seite stehen und nicht im Formular. Ändere `BaseDialog` so, dass er seinen Inhalt mit `Teleport` an das Ende von `body` verschiebt. Der Dialog zeigt weiter das Ding und die Mitgliedernummer und lässt sich schliessen.

:::solution[Lösung]
::code{file="exercises/04-components/provide-inject/solution/{lang}/src/components/BaseDialog.vue" lines="10-27"}

Weil `Teleport` in `BaseDialog` steht, landet jeder Dialog der App am Ende der Seite, ohne dass die Formulare etwas davon wissen. Slots, Props und das Event `close` funktionieren wie vorher, denn für Vue bleibt der Inhalt ein Teil der Komponente.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `inject` steht in einer Funktion für ein Event, und Vue warnt, dass es nur im Setup funktioniert. | `inject` zuoberst in `<script setup>` aufrufen und den Wert in einer Konstante behalten. |
| Zwei Teile der App verwenden denselben Text als Schlüssel und überschreiben sich. | Schlüssel als `Symbol` in einer eigenen Datei festlegen. |
| Eine Änderung des bereitgestellten Werts kommt unten nicht an. | Ein Ref oder ein reaktives Objekt bereitstellen, keinen einfachen Wert. |
| Eine Komponente weit unten ändert den bereitgestellten Wert, und niemand weiss, woher die Änderung kommt. | Den Wert mit `readonly` bereitstellen und eine Funktion zum Ändern dazugeben. |
| Vue meldet `Failed to locate Teleport target with selector "#modals"`. | Das Ziel muss beim Rendern existieren. `body` verwenden oder das Element in `index.html` ergänzen. |
| Ein KI-Assistent legt das Mitglied in `window` ab oder greift über `$root` darauf zu. | Werte für den ganzen Baum mit `provide` bereitstellen, für viel geteilten Zustand später Pinia verwenden. |

## Selbstcheck

::::selfcheck
1. Wann lohnen sich `provide` und `inject` statt Props?
2. Warum ist ein `Symbol` ein guter Schlüssel?
3. Wie stellst du sicher, dass nur `App` das Mitglied ändert?
4. Was bewirkt `Teleport`, und was bleibt gleich?

:::solution[Antworten]
1. Wenn ein Wert tief im Baum gebraucht wird und die Komponenten dazwischen ihn nur durchreichen würden.
2. Zwei Symbole sind nie gleich, also kann kein anderes `provide` denselben Schlüssel aus Versehen verwenden.
3. `App` stellt das Mitglied mit `readonly` bereit. Soll jemand weiter unten es ändern, bekommt er eine Funktion von `App`.
4. Der Inhalt landet im DOM an einer anderen Stelle, etwa am Ende von `body`. Für Vue bleibt er Teil der Komponente, mit Props, Events, Slots und `inject`.
:::
::::

:::assignment
Die App besteht jetzt aus Komponenten, und jede hat eine klare Aufgabe. Am Tresen ist trotzdem ein Ärgernis geblieben. «Nach dem Neuladen sind meine Favoriten weg, und die Suche fängt immer von vorne an», erzählt ein Mitglied. Darum geht es in Teil 5. Vorher prüfst du mit dem [Kompetenzraster](../competences/), ob du für Teil 5 bereit bist.
:::
