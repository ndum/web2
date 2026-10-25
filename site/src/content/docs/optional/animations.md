---
title: Animationen und Übergänge
description: Transition und TransitionGroup in Vue, Übergänge zwischen Seiten und Rücksicht auf Menschen, die weniger Bewegung wollen.
sidebar:
  order: 7
---

Wenn ein Element erscheint, verschwindet oder seinen Platz wechselt, springt die Seite ohne Animation von einem Zustand in den nächsten. Ein kurzer Übergang zeigt, was sich geändert hat. Vue bringt dafür zwei Komponenten mit, `<Transition>` für ein einzelnes Element und `<TransitionGroup>` für Listen. Beide setzen zu den richtigen Zeitpunkten CSS-Klassen, die eigentliche Animation schreibst du mit CSS.

## In deinem Projekt

Übergänge lohnen sich dort, wo sonst etwas unbemerkt passiert, etwa wenn eine Meldung erscheint, ein Eintrag aus einer Liste verschwindet oder ein Dialog aufgeht. Halte sie kurz, wenige Zehntelsekunden genügen. Manche Menschen reagieren auf Bewegung mit Schwindel oder Übelkeit und stellen im Betriebssystem ein, dass sie weniger Bewegung wollen. CSS fragt diese Einstellung mit der Media Query `prefers-reduced-motion` ab, und jede Animation in deinem Projekt sollte sie beachten.

## Ein kleines Beispiel

`<Transition>` umschliesst ein Element, das mit `v-if` oder `v-show` erscheint und verschwindet. Beim Erscheinen setzt Vue nacheinander die Klassen `fade-enter-from`, `fade-enter-active` und `fade-enter-to`, beim Verschwinden die entsprechenden Klassen mit `leave`. Der Teil `fade` stammt aus dem Attribut `name`. Vue wartet, bis die Transition im CSS fertig ist, und entfernt das Element erst danach.

::playground{dir="examples/optional/transition-fade"}

Für Listen nimmt `<TransitionGroup>` jeden Eintrag einzeln. Jeder braucht einen Schlüssel, damit Vue weiss, welcher Eintrag kommt, geht oder sich bewegt. Die Klasse `list-move` animiert die Einträge, die ihren Platz ändern. Damit die anderen Einträge nachrücken können, während einer verschwindet, nimmt `position: absolute` den verschwindenden Eintrag aus dem Fluss der Seite.

::playground{dir="examples/optional/transition-list"}

Zwischen Seiten animiert `<Transition>` die Komponente, die `RouterView` über seinen Slot herausgibt. Mit `mode="out-in"` verschwindet die alte Seite, bevor die neue erscheint.

::playground{dir="examples/optional/route-transition"}

In allen drei Beispielen schaltet eine Media Query die Übergänge ab, wenn das System weniger Bewegung verlangt. Die Änderung selbst bleibt, sie geschieht nur ohne Animation.

Browser bringen inzwischen eine eigene Schnittstelle für solche Übergänge mit. `document.startViewTransition()` hält ein Bild der Seite fest, lässt dich den Zustand ändern und blendet vom alten zum neuen Bild über. Die Methode gibt es in Chrome und Edge ab Version 111, in Safari ab 18 und in Firefox ab 144. Prüf trotzdem, ob es sie gibt, und ändere den Zustand sonst direkt.

## Offizielle Links

- [Vue-Dokumentation, Transition](https://vuejs.org/guide/built-ins/transition.html)
- [Vue-Dokumentation, TransitionGroup](https://vuejs.org/guide/built-ins/transition-group.html)
- [Vue Router, Übergänge zwischen Seiten](https://router.vuejs.org/guide/advanced/transitions.html)
- [MDN, prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [MDN, View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [WCAG 2.2, Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
