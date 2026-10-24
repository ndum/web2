---
title: DOM und Events
description: Elemente finden, erzeugen und ändern, auf Klicks und Eingaben reagieren, Event-Delegation und Formulare ohne Neuladen der Seite.
sidebar:
  order: 8
---

Das DOM ist die Seite, wie der Browser sie im Speicher hält, ein Baum aus Elementen. JavaScript kann diesen Baum lesen und ändern. In Teil 2 baust du so eine erste SPA von Hand, bevor Vue dir diese Arbeit abnimmt. Die Beispiele dieser Einheit sind kleine HTML-Seiten. Mit «Ausführen» erscheinen sie unter dem Code, und die Ausgabe der Konsole steht darunter.

:::goals
Nach dieser Einheit kannst du

- Elemente mit `querySelector` finden und neue Elemente erzeugen,
- Text sicher mit `textContent` setzen und erklären, warum `innerHTML` gefährlich sein kann,
- mit `addEventListener` auf Klicks und Eingaben reagieren,
- mit einem einzigen Listener viele Elemente bedienen und ein Formular ohne Neuladen verarbeiten.
:::

## Elemente finden und erzeugen

`document.querySelector` nimmt einen CSS-Selektor und liefert das erste passende Element oder `null`. `querySelectorAll` liefert alle passenden Elemente. Mit `document.createElement` erzeugst du ein neues Element, das erst sichtbar wird, wenn du es mit `append` in den Baum einfügst.

::code{file="examples/js/dom-and-events/{lang}/list.html"}

Die Schleife erzeugt für jeden Namen ein `<li>`, setzt seinen Text und hängt es an die Liste. `list.children` enthält danach drei Elemente.

`textContent` setzt reinen Text. Mit `innerHTML` könntest du auch HTML einsetzen, doch das ist gefährlich, sobald der Text von Mitgliedern stammt. Wer in eine Bemerkung HTML mit Script schreibt, bringt sonst fremden Code in die Seite. Diese Lücke heisst Cross-Site Scripting, kurz XSS. Die Aufgabe «Einstieg» zeigt den Unterschied.

## Auf Events reagieren

Klicks, Eingaben und andere Ereignisse heissen Events. Mit `addEventListener` hängst du eine Funktion an ein Element, und der Browser ruft sie bei jedem passenden Event auf.

::code{file="examples/js/dom-and-events/{lang}/events.html"}

Der erste Listener zählt die Klicks auf den Knopf. Der zweite hängt an der ganzen Liste. Ein Event steigt vom angeklickten Element im Baum nach oben, darum bekommt die Liste auch die Klicks auf ihre Einträge. `event.target` ist das Element, auf das wirklich geklickt wurde, und `closest('li')` sucht von dort aus den nächsten Eintrag nach oben. Dieses Muster heisst Event-Delegation. Ein Listener genügt für alle Einträge, auch für solche, die erst später dazukommen.

`data-id` ist ein eigenes Attribut, das du im Script über `dataset.id` liest. Werte aus `dataset` sind immer Text. Am Schluss löst das Script zwei Klicks selbst aus, damit in der Ausgabe etwas steht. Klick danach selbst auf den Knopf und auf die Einträge.

## Formulare

Ein Formular schickt seine Daten normalerweise an einen Server und lädt dann eine neue Seite. Eine SPA verhindert das mit `event.preventDefault()` und verarbeitet die Daten selbst.

::code{file="examples/js/dom-and-events/{lang}/form.html"}

Der Listener hängt am `submit`-Event des Formulars, nicht am Klick auf den Knopf. So funktioniert das Absenden auch mit der Eingabetaste. `FormData` liest alle Felder mit einem `name` auf einmal, `data.get('days')` liefert den Wert als Text. Die Attribute `required`, `min` und `max` prüft der Browser selbst, bevor er das Event auslöst. `requestSubmit` sendet das Formular aus dem Script ab, wie es ein Klick auf den Knopf täte.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| `querySelector` liefert `null`, weil das Script vor dem HTML läuft. | Das Script ans Ende der Seite setzen oder `type="module"` verwenden, denn Module laufen erst, wenn das HTML gelesen ist. |
| Text von Mitgliedern wird mit `innerHTML` eingesetzt. | `textContent` verwenden. |
| Das Formular lädt die Seite neu, und die Ausgabe verschwindet sofort. | Im `submit`-Listener `event.preventDefault()` aufrufen. |
| Jeder Eintrag einer Liste bekommt einen eigenen Listener, und neue Einträge reagieren nicht. | Einen Listener auf die Liste setzen und mit `event.target.closest(...)` den Eintrag finden. |
| `addEventListener('click', handle())` ruft die Funktion sofort auf. | Die Funktion selbst übergeben, ohne Klammern. |

## Aufgaben

::::exercise[Einstieg]
Ein Mitglied gibt als Bemerkung `<img src=x onerror=alert(1)> Zelt` ein. Zeig die Bemerkung in einem Absatz an, ohne dass daraus ein Element wird. Wie viele Kindelemente hat der Absatz danach?

:::solution[Lösung]
::code{file="examples/js/dom-and-events/{lang}/solution-1.html"}

Die Ausgabe ist 0. `textContent` zeigt die Zeichen genau so, wie sie eingegeben wurden, auch die spitzen Klammern. Mit `innerHTML` entstünde ein `<img>`-Element, dessen Bild nicht lädt, und `onerror` würde den Code des Mitglieds ausführen.
:::
::::

::::exercise[Vertiefung]
Ein Klick auf einen Eintrag der Liste markiert ihn als Favorit, ein zweiter Klick hebt die Markierung wieder auf. Verwende einen einzigen Listener auf der Liste und die Klasse `favorite`. Gib nach jedem Klick den Namen aus und ob der Eintrag gerade Favorit ist.

:::solution[Lösung]
::code{file="examples/js/dom-and-events/{lang}/solution-2.html"}

`classList.toggle` setzt die Klasse, wenn sie fehlt, und entfernt sie, wenn sie da ist. `classList.contains` fragt den Stand ab. Das `return` am Anfang des Listeners fängt Klicks ab, die zwar in der Liste, aber auf keinem Eintrag landen.
:::
::::

::::exercise[Knobelei]
Baue eine Suche. Bei jeder Eingabe im Suchfeld zeigt die Liste nur die Namen, die den Suchtext enthalten, ohne Rücksicht auf Gross- und Kleinschreibung. Schreib dafür eine Funktion `render(query)`, die die Liste jedes Mal neu aufbaut.

:::solution[Lösung]
::code{file="examples/js/dom-and-events/{lang}/solution-3.html"}

`replaceChildren()` ohne Argumente leert die Liste, danach fügt die Schleife die passenden Einträge ein. Das `input`-Event kommt bei jeder Änderung im Feld, nicht erst beim Verlassen. Am Schluss setzt das Script den Suchtext «säge» und löst das Event selbst aus, darum zeigt die Ausgabe zuerst 3 und dann 1. Zustand ändern und die Liste neu aufbauen, diese Arbeit nimmt dir Vue in Teil 3 ab.
:::
::::
