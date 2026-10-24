---
title: Formulare
description: Felder jeder Art mit v-model binden, Modifikatoren einsetzen, Formulare mit submit.prevent abschicken und Eingaben mit verständlichen Meldungen prüfen.
sidebar:
  order: 5
---

:::assignment
Jetzt kommt der Teil der App, auf den der Vorstand am meisten wartet.

> Als Mitglied möchte ich ein Ding für einen Zeitraum reservieren, damit es bei der Abholung bereitliegt.

Die Akzeptanzkriterien lauten:

1. Das Formular fragt nach der Mitgliedernummer, dem ersten und dem letzten Tag.
2. Abholen und zurückbringen geht nur am Mittwoch oder am Samstag, und eine Ausleihe dauert höchstens sieben Tage.
3. Fehler erscheinen beim Feld, sobald jemand es verlässt oder das Formular sendet, und ein Screenreader liest sie vor.
4. Nach dem Senden fasst die App die Anfrage zusammen.
:::

:::goals
Nach diesem Kapitel kannst du

- Felder jeder Art mit `v-model` an den Zustand binden,
- die Modifikatoren `.trim`, `.number` und `.lazy` einsetzen,
- ein Formular mit `@submit.prevent` abschicken,
- Eingaben mit einem berechneten Objekt von Fehlern prüfen,
- Fehlermeldungen so anzeigen, dass alle sie wahrnehmen.
:::

## v-model

Im letzten Kapitel hat `v-model` das Suchfeld mit einem Ref verbunden. Bei einem Textfeld ist es eine Kurzform für zwei Dinge, die du schon kennst. Die beiden Zeilen tun dasselbe.

```vue
<input :value="query" @input="query = $event.target.value">
<input v-model="query">
```

`:value` schreibt den Wert des Refs ins Feld, `@input` schreibt bei jeder Eingabe den Wert des Felds ins Ref. Je nach Art des Felds wählt Vue die passende Eigenschaft und das passende Event. Bei Kontrollkästchen und Optionsfeldern bindet es `checked` und hört auf `change`, bei einer Auswahl `value` und `change`.

Den Anfangswert bestimmt das Ref. Ein Attribut `value`, `checked` oder `selected` im HTML übergeht `v-model`.

## Felder jeder Art

Das Beispiel zeigt alle üblichen Felder und darunter die Werte, die in den Refs ankommen. Überleg dir zuerst, welchen Typ jeder Wert hat, und ändere dann die Felder im Playground.

::playground{dir="examples/03-vue/form-fields"}

Ein einzelnes Kontrollkästchen liefert `true` oder `false`. Mehrere Kontrollkästchen am selben Array sammeln die Werte der angekreuzten Kästchen. Optionsfelder liefern den Wert des gewählten Felds, eine Auswahl den Wert der gewählten Option, und eine Option ohne Attribut `value` liefert ihren Text. Ein Datumsfeld liefert einen Text wie `2026-11-18` oder einen leeren Text. Ein Zahlenfeld mit `type="number"` liefert eine Zahl, weil Vue dort den Modifikator `.number` von selbst anwendet.

Jedes Feld braucht eine Beschriftung. `<label for="days">` gehört zum Feld mit der id `days`, ein Klick darauf setzt den Fokus ins Feld, und ein Screenreader liest die Beschriftung vor. Optionsfelder und Kontrollkästchen, die zusammengehören, fasst ein `<fieldset>` mit einer `<legend>` zusammen.

## Modifikatoren

Drei Modifikatoren verändern, was `v-model` ins Ref schreibt. `.trim` entfernt Leerzeichen am Anfang und am Ende. `.number` wandelt die Eingabe in eine Zahl um und lässt den Text stehen, wenn das nicht geht. `.lazy` schreibt erst, wenn jemand das Feld verlässt, statt bei jedem Zeichen.

::playground{dir="examples/03-vue/modifiers"}

## Ein Formular abschicken

Felder gehören in ein Element `<form>` mit einem Knopf `<button type="submit">`. Dann sendet auch die Eingabetaste in einem Feld das Formular, wie es Menschen erwarten. Ohne weiteres Zutun schickt der Browser das Formular an den Server und lädt die Seite neu, und der ganze Zustand der App ist weg. `@submit.prevent="submit"` verhindert das und ruft stattdessen die Funktion `submit` auf.

## Eingaben prüfen

Die Prüfung gehört in einen berechneten Wert. Er gibt ein Objekt mit einer Meldung für jedes Feld zurück, an dem etwas nicht stimmt. Ist das Objekt leer, ist das Formular gültig. Weil `computed` von selbst neu rechnet, sind die Meldungen immer auf dem Stand der Felder.

::playground{dir="examples/03-vue/suggestion-form"}

Wer ein Feld zum ersten Mal ausfüllt, soll nicht schon beim ersten Buchstaben einen Fehler sehen. Das Beispiel zeigt eine Meldung erst, wenn jemand das Feld verlassen hat oder das Formular sendet. `touched` merkt sich die verlassenen Felder, `submitted` den Versuch zu senden, und `shownErrors` enthält nur die Meldungen, die schon erscheinen dürfen.

Damit alle die Meldungen wahrnehmen, stehen sie als Text beim Feld und nicht nur als rote Farbe. `aria-describedby` verbindet das Feld mit dem Element der Meldung, ein Screenreader liest sie dann zusammen mit der Beschriftung vor. `aria-invalid="true"` sagt, dass die Eingabe nicht stimmt. Die Bestätigung steht in einem Element mit `role="status"`. Ein Screenreader liest neuen Text darin von selbst vor, wenn das Element schon vorher in der Seite war.

Das Attribut `novalidate` am Formular schaltet die Meldungen des Browsers aus. Sie sehen in jedem Browser anders aus und erscheinen in der Sprache des Browsers, nicht in der der App. Attribute wie `min` und `max` lohnen sich trotzdem, ein Zahlenfeld zeigt dann passende Pfeile und ein Datumsfeld einen passenden Kalender.

Für Daten musst du nicht rechnen. Texte wie `2026-11-18` lassen sich direkt vergleichen, weil die Reihenfolge der Zeichen der Reihenfolge der Tage entspricht. `new Date('2026-11-18').getUTCDay()` liefert den Wochentag, 0 für Sonntag bis 6 für Samstag. Ein Datum ohne Uhrzeit liest JavaScript als Mitternacht in UTC, wie du aus der [JS-Werkstatt](../../js/formatting/) weisst. Darum gilt `getUTCDay` und nicht `getDay`.

## Im Code

Arbeite mit dem Beispiel zum Vorschlag. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Was erscheint, wenn du sofort auf «Vorschlagen» klickst? Und was, wenn du einen Namen eingibst und das Feld mit der Tabulatortaste verlässt?
2. Gib als Pfand 85 ein und verlasse das Feld. Welche Meldung erscheint, und welche Attribute hat das Feld danach? Prüfe es mit den Entwicklertools des Browsers.
3. Entferne `.prevent` und sende das Formular mit gültigen Werten. Was passiert mit der Vorschau, und warum?
4. Entferne `novalidate` und ergänze am Namen das Attribut `required`. Was zeigt der Browser beim Senden mit leerem Namen?

## Aufgaben

Die Aufgaben bauen die Reservationsanfrage auf der Seite der Bohrmaschine. Du findest das Projekt im Kursrepo im Ordner `exercises/03-vue/forms/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Die Tests tun so, als wäre heute Montag, der 2. November 2026. Die Datei `src/dates.js` liefert drei Hilfen, `today()` für das heutige Datum, `daysBetween(from, to)` für die Zahl der Tage dazwischen und `formatDate(date)` für die Anzeige.

::::exercise[Einstieg]
Binde die drei Felder mit `v-model` an die Refs `member`, `from` und `to`, die Mitgliedernummer mit `.trim`. Beim Senden lädt die Seite nicht neu, sondern zeigt in einem Element `<p class="summary" role="status">` die Zusammenfassung, etwa «Reservationsanfrage von M-117 für Bohrmaschine vom 18.11.2026 bis 21.11.2026 erfasst.».

:::solution[Lösung]
Die Felder bekommen `v-model.trim="member"`, `v-model="from"` und `v-model="to"`, und das Formular ruft beim Senden `submit` auf.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="68-68"}

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="57-61"}

Die beiden Zeilen mit `submitted` und dem Abbruch bei Fehlern kommen in der Vertiefung dazu. `summary` ist ein Ref mit einem leeren Text, darum ist das Element für den Status von Anfang an da.
:::
::::

::::exercise[Vertiefung]
Prüf die Eingaben nach diesen Regeln und zeig die Meldung in einem Element mit der id `member-error`, `from-error` oder `to-error` und der Klasse `error`. Das Feld bekommt dann `aria-invalid="true"` und `aria-describedby` mit der id der Meldung. Die Meldungen erscheinen, sobald jemand das Formular sendet, und nur ein gültiges Formular erzeugt eine Zusammenfassung.

| Feld | Regel | Meldung |
|---|---|---|
| Mitgliedernummer | «M-» und drei Ziffern | Die Mitgliedernummer hat die Form M-117. |
| Erster Tag | nicht leer | Wähl den ersten Tag. |
| Erster Tag | nicht vor heute | Der erste Tag liegt in der Vergangenheit. |
| Letzter Tag | nicht leer | Wähl den letzten Tag. |
| Letzter Tag | nicht vor dem ersten Tag | Der letzte Tag liegt vor dem ersten. |
| Letzter Tag | höchstens sieben Tage nach dem ersten | Eine Ausleihe dauert höchstens sieben Tage. |

:::solution[Lösung]
Die Prüfung steht in einem berechneten Wert. Hier die Regeln für die Mitgliedernummer und den ersten Tag.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="24-32"}

Für den letzten Tag folgen die drei Regeln aus der Tabelle.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="36-41"}

Das Feld und seine Meldung hängen über die id zusammen.

::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue" lines="69-77"}

In der Vertiefung genügt als Bedingung `submitted && errors.member` statt `shownErrors.member`, und `@blur` kommt erst in der Knobelei dazu. `/^M-\d{3}$/` verlangt genau «M-» und drei Ziffern, `^` und `$` stehen für Anfang und Ende des Texts.
:::
::::

::::exercise[Knobelei]
Abholen und zurückbringen geht nur an den Öffnungstagen. Ergänze für den ersten Tag die Meldung «Abholen kannst du am Mittwoch oder am Samstag.» und für den letzten Tag «Zurückbringen kannst du am Mittwoch oder am Samstag.». Ausserdem soll die Meldung zu einem Feld schon erscheinen, sobald jemand das Feld verlässt. `new Date(date).getUTCDay()` liefert 3 für Mittwoch und 6 für Samstag.

:::solution[Lösung]
::code{file="exercises/03-vue/forms/solution/{lang}/src/App.vue"}

`isOpeningDay` prüft den Wochentag, und die Prüfung steht jeweils zuletzt, damit zuerst die wichtigere Meldung erscheint. `@blur` trägt das verlassene Feld in `touched` ein, und `shownErrors` zeigt eine Meldung, wenn ihr Feld verlassen oder das Formular gesendet wurde. Von Samstag bis Samstag sind es genau sieben Tage, das ist die längste Ausleihe, die die Regeln erlauben.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Beim Senden lädt die Seite neu, und alle Eingaben sind weg. | `@submit.prevent` am Formular setzen. |
| `value="3"` im HTML erscheint nicht im Feld. | `v-model` übergeht das Attribut. Den Anfangswert im Ref setzen, `ref(3)`. |
| Ein Textfeld für Zahlen liefert `'3'` statt `3`, und `days + 1` ergibt `'31'`. | `v-model.number` verwenden oder `type="number"`, dann wandelt Vue den Wert um. |
| `<textarea>{{ note }}</textarea>` hält Feld und Ref nicht im Takt. | Auch Textbereiche mit `v-model` binden, Interpolation funktioniert darin nicht. |
| Der Wochentag stimmt in manchen Zeitzonen nicht. | Bei Daten ohne Uhrzeit `getUTCDay` statt `getDay` verwenden. |
| Fehler sind nur rot umrandet oder stehen im Platzhalter. | Die Meldung als Text beim Feld zeigen und mit `aria-describedby` verbinden. |
| Ein KI-Assistent schlägt für ein kleines Formular eine Bibliothek zur Validierung vor. | Für wenige Felder genügt ein berechnetes Objekt mit Fehlern. Bibliotheken lohnen sich bei vielen und verschachtelten Formularen. |

## Selbstcheck

::::selfcheck
1. Wofür ist `v-model` bei einem Textfeld eine Kurzform?
2. Was bewirken `.trim`, `.number` und `.lazy`?
3. Warum braucht das Formular `@submit.prevent`?
4. Wie verbindest du eine Fehlermeldung so mit ihrem Feld, dass ein Screenreader sie vorliest?

:::solution[Antworten]
1. Für `:value="query"` zusammen mit `@input="query = $event.target.value"`.
2. `.trim` entfernt Leerzeichen am Rand, `.number` wandelt in eine Zahl um, und `.lazy` schreibt erst beim Verlassen des Felds.
3. Ohne `.prevent` schickt der Browser das Formular ab und lädt die Seite neu, der Zustand der App geht verloren.
4. Die Meldung bekommt eine id, und das Feld verweist mit `aria-describedby` darauf. `aria-invalid="true"` sagt zusätzlich, dass die Eingabe nicht stimmt.
:::
::::

:::assignment
Die erste Reservationsanfrage ist erfasst, und Martina Hostettler ist zufrieden. Der Freiwillige hat beim Durchsehen aber etwas bemerkt. «App.vue hat inzwischen fast 180 Zeilen, und Katalog, Suche und Formular stecken alle darin. Das sollten wir aufteilen.» Genau das tut Teil 4 mit Komponenten. Vorher prüfst du mit dem [Kompetenzraster](../competences/), ob du für Teil 4 bereit bist.
:::
