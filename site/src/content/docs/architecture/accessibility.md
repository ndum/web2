---
title: Barrierefreiheit
description: Die Regeln der WCAG 2.2 und der Schweiz, semantisches HTML, Namen für Knöpfe und Links, die Tastatur, der Fokus nach einer Änderung, Statusmeldungen, Formulare, Kontrast und das Prüfen mit dem Browser.
sidebar:
  order: 5
---

:::assignment
Ein Mitglied, das mit einem Screenreader arbeitet, schreibt an den Verein. Die Zahl der Treffer im Katalog bleibe stumm, alle Knöpfe «Favorit» klängen gleich, und nach dem Zurück-Knopf lande der Fokus im Suchfeld statt beim Ding, das es gerade angeschaut hat.

> Als Mitglied, das mit einem Screenreader arbeitet, möchte ich hören, was sich auf der Seite ändert, und dort weitermachen, wo ich war, damit ich die App ohne Hilfe nutzen kann.

Die Akzeptanzkriterien lauten:

1. Der Screenreader nennt die Zahl der Treffer, sobald sie sich ändert.
2. Jeder Knopf und jeder Link nennt, wozu er dient, auch ohne seine Umgebung.
3. Nach dem Zurück-Knopf steht der Fokus beim Ding, von dem das Mitglied kam.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, welche Regeln für die Barrierefreiheit gelten,
- mit semantischem HTML, Beschriftungen und Namen arbeiten,
- den Fokus nach einer Navigation und nach einer Änderung bewusst setzen,
- Statusmeldungen mit Live-Regionen ausgeben,
- Kontrast und Tastatur prüfen und eine Seite mit den Werkzeugen des Browsers untersuchen.
:::

## Die Regeln

Die [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/), kurz WCAG, sind seit Oktober 2023 eine Empfehlung des W3C, zuletzt aktualisiert im Dezember 2024. Ihre Erfolgskriterien haben die Stufen A, AA und AAA, und Vorgaben verlangen meist die Stufe AA. In der Schweiz verlangt der Standard [eCH-0059](https://www.ech.ch/de/ech/ech-0059/3.0) in der Version 3.0 von 2020 für Websites die WCAG 2.1 auf Stufe AA, als Empfehlung. Das [Behindertengleichstellungsgesetz](https://www.fedlex.admin.ch/eli/cc/2003/667/de#art_14) verlangt in Artikel 14, dass Dienstleistungen des Bundes im Internet für Menschen mit einer Sehbehinderung ohne erschwerende Bedingungen zugänglich sind. Eine SPA braucht dabei besondere Sorgfalt, denn ohne neue Seite merkt ein Screenreader nichts von einem Wechsel, wie Kapitel 2.1 gezeigt hat.

## Semantisches HTML zuerst

Ein `button` lässt sich mit der Tastatur erreichen und auslösen, ein Screenreader nennt ihn Schalter. Ein `div` mit `@click` kann nichts davon. Die [Vue-Dokumentation](https://vuejs.org/guide/best-practices/accessibility.html) rät darum zu den passenden Elementen, zu Überschriften in ihrer Rangfolge, zu Bereichen wie `header`, `nav`, `main` und `footer` und zu einem Link zum Überspringen der Navigation als erstes Element der Seite. Die Fallbeispiel-App setzt diesen Link vor den Kopf.

::code{file="case/08-architecture/{lang}/src/components/PageLayout.vue" lines="1-17"}

Der Link verschiebt nur den Fokus. Ein gewöhnlicher Link auf `#main` würde im Hash-Modus der Demo zu einer Navigation des Routers.

## Namen für Knöpfe und Links

Jedes Bedienelement braucht nach WCAG 4.1.2 einen Namen, den Hilfsmittel auslesen können. Der Name kommt aus dem Text des Elements, aus `aria-label` oder aus Text, der nur für Screenreader da ist. Ein Knopf, der nur ein Kreuz zeigt, hat ohne eines davon keinen brauchbaren Namen.

::playground{dir="examples/08-architecture/accessible-names"}

In der Fallbeispiel-App nennen die Knöpfe und Links auf den Karten jetzt das Ding, zu dem sie gehören, mit Text, der nur für Screenreader da ist. Der sichtbare Text steht dabei am Anfang des Namens, damit auch eine Sprachsteuerung den Knopf unter dem Wort findet, das auf dem Bildschirm steht.

## Die Tastatur

Alles muss sich nach WCAG 2.1.1 mit der Tastatur bedienen lassen, in einer sinnvollen Reihenfolge und mit einem sichtbaren Fokus. WCAG 2.2 verlangt zusätzlich, dass eigene Inhalte wie ein festes Banner den Fokus nicht ganz verdecken und dass Ziele für Zeiger mindestens 24 auf 24 Pixel gross sind oder genug Abstand haben. Prüfen lässt sich das ohne Werkzeug. Leg die Maus weg und geh die Seite mit Tab, Shift und Tab, Enter, Leertaste und Escape durch.

## Der Fokus nach einer Änderung

Nach einer Navigation setzt die Fallbeispiel-App seit Kapitel 6.5 den Fokus auf die Überschrift der neuen Seite. Kommt jemand mit dem Zurück-Knopf vom Ding auf den Katalog, stellt der Router die alte Position wieder her, und der Fokus landete bisher im Suchfeld weit oben. Jetzt setzt der Katalog den Fokus auf die Karte des Dings, ohne dass die Seite springt.

::code{file="case/08-architecture/{lang}/src/features/catalog/CatalogView.vue" lines="68-76"}

Vue Router hält in `history.state` fest, von welcher Adresse jemand zurückkommt, und `preventScroll` lässt die wiederhergestellte Position stehen. Auch wenn ein Element mit dem Fokus verschwindet, etwa nach dem Entfernen eines Eintrags, muss die App den Fokus selbst weitergeben. Sonst beginnt die Tastatur wieder oben auf der Seite.

::playground{dir="examples/08-architecture/focus-after-remove"}

## Statusmeldungen

Nach WCAG 4.1.3 muss ein Screenreader Statusmeldungen vorlesen können, ohne dass sie den Fokus bekommen. Dafür gibt es Live-Regionen. Laut [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) liest ein Screenreader eine Region mit `role="status"` vor, sobald er gerade nichts anderes tut, und eine mit `role="alert"` sofort. Die Region muss schon auf der Seite stehen, bevor sich ihr Inhalt ändert.

::playground{dir="examples/08-architecture/live-region"}

Die Fallbeispiel-App meldet so die Zahl der Treffer im Katalog, gesendete Anfragen und erfasste Rückgaben. Fehler beim Laden kommen als `role="alert"`.

## Formulare

Jedes Feld braucht ein `label`, das mit `for` auf seine `id` zeigt. Ein Platzhalter ersetzt laut Vue-Dokumentation keine Beschriftung. Meldet ein Feld einen Fehler, markiert `aria-invalid` das Feld, und `aria-describedby` verbindet es mit der Meldung, die ein Screenreader dann zusammen mit der Beschriftung vorliest.

::code{file="case/08-architecture/{lang}/src/features/reservations/ReservationForm.vue" lines="52-62"}

## Kontrast

Text braucht nach WCAG 1.4.3 einen Kontrast von mindestens 4,5:1 zum Hintergrund, grosser Text 3:1. Für Bedienelemente und wichtige Grafiken verlangt WCAG 1.4.11 mindestens 3:1. Die Fallbeispiel-App prüft ihre Farben für Text in einem Test nach der Formel der WCAG.

::code{file="case/08-architecture/{lang}/tests/accessibility.test.js" lines="17-26"}

## Prüfen mit dem Browser

Die [Entwicklertools von Chrome](https://developer.chrome.com/docs/devtools/accessibility/reference) zeigen im Bereich «Accessibility» den Baum, den Hilfsmittel lesen, mit Rolle und Namen jedes Elements. Lighthouse bewertet die Barrierefreiheit einer Seite automatisch und listet weitere Punkte, die jemand von Hand prüfen muss. Der Accessibility Inspector von Firefox sucht mit «Check for issues» nach Problemen bei Kontrast, Tastatur und Beschriftungen. Ein Screenreader zeigt am deutlichsten, wie eine Seite klingt. Windows bringt die Sprachausgabe mit, macOS VoiceOver, und NVDA gibt es frei für Windows.

## In deinem Projekt

Der Mindestumfang verlangt die Grundregeln der Barrierefreiheit. Prüf vor der Abgabe, dass jedes Feld beschriftet ist, dass Knöpfe handeln und Links navigieren, dass jedes Bedienelement einen Namen hat, dass der Fokus nach einer Navigation sinnvoll steht, dass Meldungen in Live-Regionen erscheinen und dass Text den Kontrast erreicht. Bedien die App einmal nur mit der Tastatur und lass Lighthouse laufen.

## Im Code

Arbeite mit den Beispielen dieses Kapitels und mit der Fallbeispiel-App. Schreib auf, was du erwartest, bevor du etwas ausprobierst.

1. Öffne im Beispiel mit den drei Knöpfen die Entwicklertools und den Bereich «Accessibility». Welchen Namen hat jeder Knopf?
2. Nimm im Beispiel mit der Live-Region `role="status"` weg. Was ändert sich auf dem Bildschirm, und was für einen Screenreader?
3. Nimm im Beispiel zum Entfernen die Zeilen weg, die den Fokus setzen, und entferne einen Eintrag mit der Tastatur. Wohin führt der nächste Tab?
4. Lade in der Fallbeispiel-App den Katalog und drück Tab. Welches Element bekommt den Fokus zuerst, und was passiert mit Enter?

## Aufgaben

Die Aufgaben machen eine Seite mit Suche, Favoriten und einem Formular barrierefrei. Du findest das Projekt im Kursrepo im Ordner `exercises/08-architecture/accessibility/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Gib dem Suchfeld und der Auswahl der Kategorie je ein `label`. Mach aus dem Stern für Favoriten einen `button` mit `aria-pressed`, dessen Name das Ding nennt, und gib den Knöpfen zum Entfernen einen Namen mit dem Ding.

:::solution[Lösung]
::code{file="exercises/08-architecture/accessibility/solution/{lang}/src/components/SearchPanel.vue" lines="20-43"}

Der Stern bleibt sichtbar, `aria-hidden` verbirgt ihn vor dem Screenreader, und der versteckte Text liefert den Namen.
:::
::::

::::exercise[Vertiefung]
Mach die Zahl der Treffer zu einer Live-Region, die von Anfang an auf der Seite steht. Markiere im Formular ein Feld mit Fehler mit `aria-invalid` und verbinde es mit `aria-describedby` mit seiner Meldung. Ist das Feld wieder richtig, verschwindet die Verbindung.

:::solution[Lösung]
::code{file="exercises/08-architecture/accessibility/solution/{lang}/src/components/RequestForm.vue" lines="27-46"}
:::
::::

::::exercise[Knobelei]
Wer einen Favoriten entfernt, verliert mit dem Knopf den Fokus. Setz ihn auf den Eintrag, der nachrückt, am Ende der Liste auf den davor und auf die Überschrift, wenn die Liste leer ist.

:::solution[Lösung]
::code{file="exercises/08-architecture/accessibility/solution/{lang}/src/components/FavoritesList.vue"}

`nextTick` wartet, bis Vue die Liste neu gezeichnet hat. Die Überschrift bekommt `tabindex="-1"`, damit sie den Fokus nehmen kann, ohne in die Reihenfolge der Tabulatortaste zu kommen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein `div` mit `@click` dient als Knopf. | Ein `button` bringt Rolle, Fokus und Tastatur mit. |
| Ein Feld hat nur einen Platzhalter. | Ein `label` mit `for` verwenden. |
| Eine Live-Region erscheint erst mit ihrer Meldung und bleibt stumm. | Die Region von Anfang an zeigen und nur ihren Inhalt ändern. |
| Nach dem Entfernen eines Eintrags beginnt die Tastatur wieder oben. | Den Fokus auf den nächsten Eintrag oder eine Überschrift setzen. |
| `outline: none` nimmt der Tastatur die Orientierung. | Den sichtbaren Fokus behalten oder einen eigenen gestalten, wie WCAG 2.4.7 verlangt. |
| Ein KI-Assistent setzt `aria-label` auf Elemente mit sichtbarem Text und überschreibt damit deren Namen. | Sichtbarer Text ist meist der beste Name. ARIA nur dort einsetzen, wo HTML nicht reicht. |

## Selbstcheck

::::selfcheck
1. Welche Stufe der WCAG verlangen die meisten Vorgaben, und welche Version ist die aktuelle?
2. Woher bekommt ein Knopf seinen Namen?
3. Warum muss eine SPA nach einer Navigation über den Fokus entscheiden?
4. Wie meldet eine Seite eine Änderung, ohne den Fokus zu verschieben?

:::solution[Antworten]
1. Die Stufe AA, aktuell ist die WCAG 2.2.
2. Aus seinem Text, aus `aria-label` oder aus Text, der nur für Screenreader da ist.
3. Ohne neue Seite bleibt der Fokus, wo er war, und ein Screenreader merkt den Wechsel nicht.
4. Mit einer Live-Region, etwa einem Element mit `role="status"`, das schon auf der Seite steht.
:::
::::

:::assignment
Das Mitglied schreibt zurück, dass es den Katalog jetzt ohne Hilfe bedienen kann. Martina Hostettler will die App nun an der Mitgliederversammlung zeigen, öffentlich erreichbar und ohne Server des Vereins. Das nächste Kapitel baut und veröffentlicht sie.
:::
