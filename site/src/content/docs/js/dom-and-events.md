---
title: DOM und Events
description: Der Tresen-Helfer zeigt die neun Dinge auf einer Seite, und ein Klick reserviert ein Ding. Elemente finden und erzeugen, auf Events reagieren, Event-Delegation und Formulare ohne Neuladen der Seite.
sidebar:
  order: 8
---

::::step{n="8"}
Er kennt die neun Dinge vom Tresen, schreibt für jedes eine Zeile und prüft eine Anfrage, bevor er sie annimmt. Bisher zeigt er alles in der Konsole. In diesem Schritt kommen die neun Dinge auf eine Seite. Jedes Ding, das da ist, bekommt einen Knopf, und ein Klick darauf reserviert es.

:::details[Code bis Schritt 7]
::code{file="examples/js/errors/{lang}/desk.mjs"}
:::
::::

Das DOM ist die Seite, wie der Browser sie im Speicher hält, ein Baum aus Elementen. JavaScript kann diesen Baum lesen und ändern. In Teil 2 baust du so eine erste SPA von Hand, bevor Vue dir diese Arbeit abnimmt. Die Beispiele dieses Schritts sind kleine HTML-Seiten. Mit «Ausführen» erscheint die Seite in einem Rahmen unter dem Code, und die Ausgabe der Konsole steht darunter.

:::goals
Nach diesem Schritt kannst du

- Elemente mit `querySelector` finden und mit `createElement` neue erzeugen,
- Text sicher mit `textContent` setzen und erklären, warum `innerHTML` gefährlich sein kann,
- mit `addEventListener` auf Klicks reagieren und mit einem einzigen Listener viele Knöpfe bedienen,
- ein Formular verarbeiten, ohne dass der Browser die Seite neu lädt.
:::

## Elemente finden und erzeugen

`document.querySelector` nimmt einen CSS-Selektor und liefert das erste passende Element oder `null`. `querySelectorAll` liefert alle passenden Elemente. Mit `document.createElement` erzeugst du ein neues Element, das erst sichtbar wird, wenn du es mit `append` in den Baum einfügst.

::code{file="examples/js/dom-and-events/{lang}/list.html"}

Die Schleife erzeugt für jeden Namen ein `<li>`, setzt seinen Text und hängt es an die Liste. Danach hat die Liste drei Kinder, und `querySelector('li')` findet das erste davon, die Bohrmaschine. Ein Element mit der id `count` gibt es auf dieser Seite nicht, darum liefert `querySelector('#count')` den Wert `null`.

`textContent` setzt reinen Text. Mit `innerHTML` könntest du auch HTML einsetzen, doch das ist gefährlich, sobald der Text von Mitgliedern stammt. Wer in eine Bemerkung HTML mit Script schreibt, bringt sonst fremden Code in die Seite. Diese Lücke heisst Cross-Site Scripting, kurz XSS. Die Aufgabe «Einstieg» zeigt den Unterschied.

## Auf Events reagieren

Klicks, Eingaben und andere Ereignisse heissen Events. Mit `addEventListener` hängst du eine Funktion an ein Element, und der Browser ruft sie bei jedem passenden Event auf. Am Tresen zählt ein Knopf die Besuche des Tages.

::code{file="examples/js/dom-and-events/{lang}/events.html"}

`countVisit` steht ohne Klammern im Aufruf von `addEventListener`. Du übergibst die Funktion, und der Browser ruft sie bei jedem Klick auf. Dabei bekommt sie ein Event-Objekt mit. `event.type` sagt, was passiert ist, und `event.target` ist das Element, auf das geklickt wurde. Jede Zeile der Ausgabe zeigt darum `click`, den Text des Knopfs und die Zahl der Besuche. Am Schluss klickt das Script mit `click()` zweimal selbst auf den Knopf, damit die Ausgabe etwas zeigt. Klick danach selbst auf den Knopf, die Zahl auf der Seite wächst mit.

## Event-Delegation

Im Tresen-Helfer bekommt jedes Ding, das da ist, einen Knopf «Reservieren». Statt jedem Knopf einen eigenen Listener zu geben, hängt ein einziger an der Liste. Das geht, weil ein Event vom angeklickten Element im Baum nach oben steigt, über den Eintrag zur Liste und weiter bis zum Dokument. Die Abbildung zeigt den Weg eines Klicks auf den Knopf des Beamers.

![Event-Delegation in der Liste. Links der Weg eines Klicks im DOM. Er trifft den Knopf Reservieren des Beamers mit data-id 6, steigt zu dessen Eintrag li auf, dann zur Liste ul mit der id items und weiter bis zum Dokument. Auf der Liste sitzt der einzige Listener. Rechts oben steht der Aufruf list.addEventListener, der ihn anmeldet, darunter in drei Schritten, was er mit dem Klick macht. event.target ist das angeklickte Element, closest liefert den Knopf oder null, und Number macht aus dataset.id die Zahl 6 des Beamers. So bedient ein Listener alle Knöpfe der Liste.](../../../assets/figures/de/j8-event-delegation.svg)

Der Tresen-Helfer baut die Liste aus den neun Dingen von Schritt 4. Ein Ding, das da ist, bekommt einen Knopf mit seiner `id` im Attribut `data-id`, ein ausgeliehenes nur den Vermerk «ausgeliehen». `showCount` schreibt die Zeile über der Liste.

::code{file="examples/js/dom-and-events/{lang}/desk.html"}

Der Listener fragt mit `event.target.closest('button')` nach dem Knopf, von dem der Klick kam. Klickt jemand in der Liste neben einen Knopf, liefert `closest` den Wert `null`, und `return` beendet den Listener. `button.dataset.id` liest das Attribut `data-id`, allerdings als Text. Erst `Number` macht daraus die Zahl, die `===` mit der `id` im Array vergleichen kann. `find` liefert das erste Ding, für das die Pfeilfunktion `true` zurückgibt, wie `byId` aus den Aufgaben von Schritt 4.

Danach heisst der Knopf «reserviert», `disabled` sperrt ihn für weitere Klicks, und `showCount` schreibt die Zeile neu. Am Schluss klickt das Script selbst auf den Knopf des Beamers, darum zeigt die Ausgabe `Reserviert: Beamer` und `6 von 9 Dingen sind da, 1 reserviert`. Ein reserviertes Ding steht bis zur Abholung weiter im Regal, darum bleiben es 6 von 9.

Ein Listener für viele Elemente heisst Event-Delegation. Er bedient auch Knöpfe, die erst später in die Liste kommen, etwa wenn ein ausgeliehenes Ding zurück ist. Teil 2 baut die SPA von Hand nach diesem Muster.

## Formulare

Ein Formular schickt seine Daten normalerweise an einen Server und lädt dann eine neue Seite. Eine SPA verhindert das mit `event.preventDefault()` und verarbeitet die Daten selbst. Am Tresen nimmt ein Formular eine Anfrage mit Mitgliedernummer, Abholtag und Rückgabetag auf.

::code{file="examples/js/dom-and-events/{lang}/form.html"}

Der Listener hängt am `submit`-Event des Formulars, nicht am Klick auf den Knopf. So funktioniert das Absenden auch mit der Eingabetaste. `FormData` liest alle Felder mit einem `name` auf einmal, und `data.get('from')` liefert den Wert als Text wie `2026-11-07`. Diesen Text versteht `loanDays` aus Schritt 3 direkt. Das Attribut `required` prüft der Browser selbst, bevor er das Event auslöst. Am Schluss trägt das Script die Mitgliedernummer M-117 ein und sendet das Formular mit `requestSubmit` ab, wie es ein Klick auf den Knopf täte. Die Ausgabe zeigt darum `M-117, 4 Tage`.

## Aufgaben

::::exercise[Einstieg]
Ein Mitglied schreibt in die Bemerkung zu seiner Anfrage `<img src=x onerror=alert(1)> Zelt`. Zeig die Bemerkung in einem Absatz an, ohne dass daraus ein Element wird. Wie viele Kindelemente hat der Absatz danach?

:::solution[Lösung]
::code{file="examples/js/dom-and-events/{lang}/solution-1.html"}

Der Absatz zeigt die Zeichen genau so, wie sie eingegeben wurden, auch die spitzen Klammern, und hat 0 Kindelemente. Mit `innerHTML` entstünde ein `<img>`-Element, dessen Bild nicht lädt, und `onerror` würde den Code des Mitglieds ausführen.
:::
::::

::::exercise[Vertiefung]
Ein Mitglied markiert in einer Liste mit Raclette-Ofen, Beamer und Schlafsack seine Favoriten. Ein Klick auf einen Eintrag macht ihn zum Favoriten, ein zweiter Klick hebt die Markierung wieder auf. Verwende einen einzigen Listener auf der Liste und die Klasse `favorite`. Gib nach jedem Klick den Namen aus und ob der Eintrag gerade Favorit ist.

:::solution[Lösung]
::code{file="examples/js/dom-and-events/{lang}/solution-2.html"}

`classList.toggle` setzt die Klasse, wenn sie fehlt, und entfernt sie, wenn sie da ist. `classList.contains` fragt den Stand ab. Das `return` am Anfang des Listeners fängt Klicks ab, die zwar in der Liste, aber auf keinem Eintrag landen. Die Regel im `<style>` zeigt Favoriten fett, so siehst du deine eigenen Klicks im Rahmen.
:::
::::

::::exercise[Knobelei]
Bring die Suche aus Schritt 5 auf die Seite. Bei jeder Eingabe im Suchfeld zeigt die Liste nur die Dinge, deren Name den Suchtext enthält, ohne Rücksicht auf Gross- und Kleinschreibung. Schreib dafür eine Funktion `render(query)`, die die Liste jedes Mal neu aufbaut.

:::solution[Lösung]
::code{file="examples/js/dom-and-events/{lang}/solution-3.html"}

`replaceChildren()` ohne Argumente leert die Liste, danach fügt die Schleife die passenden Einträge ein. Wie in Schritt 5 vergleicht `render` alles in Kleinbuchstaben und ohne Leerzeichen am Rand. Das `input`-Event kommt bei jeder Änderung im Feld, nicht erst beim Verlassen. Am Schluss setzt das Script den Suchtext «säge» und löst das Event selbst aus, darum zeigt die Ausgabe zuerst 9 und dann 1. Den Zustand ändern und die Liste neu aufbauen, diese Arbeit nimmt dir Vue in Teil 3 ab.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `querySelector` liefert `null`, weil das Script vor dem HTML läuft. | Das Script ans Ende der Seite setzen oder `type="module"` verwenden, denn Module laufen erst, wenn das HTML gelesen ist. |
| Text von Mitgliedern wird mit `innerHTML` eingesetzt. | `textContent` verwenden. |
| `addEventListener('click', countVisit())` ruft die Funktion sofort auf. | Die Funktion selbst übergeben, ohne Klammern. |
| Jeder Knopf bekommt einen eigenen Listener, und neue Knöpfe reagieren nicht. | Einen Listener auf die Liste setzen und mit `event.target.closest('button')` den Knopf finden. |
| `button.dataset.id === 6` ist nie wahr. | Werte aus `dataset` sind Text. Mit `Number(button.dataset.id)` umwandeln. |
| Das Formular lädt die Seite neu, und die Ausgabe verschwindet sofort. | Im `submit`-Listener `event.preventDefault()` aufrufen. |

## Selbstcheck

::::selfcheck
1. Warum bekommt der Listener auf der Liste auch die Klicks auf die Knöpfe?
2. Was liefert `event.target.closest('button')`, wenn jemand in der Liste neben einen Knopf klickt?
3. Warum ruft der Listener des Formulars `event.preventDefault()` auf?

:::solution[Antworten]
1. Ein Event steigt vom angeklickten Element im Baum nach oben. Der Klick auf einen Knopf erreicht danach seinen Eintrag, die Liste und das Dokument.
2. `null`, denn weder das angeklickte Element noch eines darüber ist ein Knopf. Der Listener endet dann mit `return`.
3. Sonst schickt der Browser das Formular ab und lädt eine neue Seite. Die Daten wären weg, bevor das Script sie verarbeitet.
:::
::::

:::next
In Schritt 9 schreibt der Tresen-Helfer die neun Dinge als JSON, liest sie wieder ein und merkt sich die Favoriten eines Mitglieds als Text. Weiter geht es mit [J9 JSON und Datenformate](../json/).
:::
