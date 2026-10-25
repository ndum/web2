---
title: KI-generierten Code prüfen
description: Typische Fehler in vorgeschlagenem Vue-Code mit ihrer Quelle in der Dokumentation, Muster aus Vue 2, die Options API in script setup, Vuex, verlorene Reaktivität, geänderte Props, Listen ohne Schlüssel, eine Checkliste und Tests und Linter als Sicherheitsnetz.
sidebar:
  order: 7
---

:::assignment
Das Team am Tresen braucht eine Übersicht der Ausleihen, die überfällig sind.

> Als Team am Tresen möchte ich die überfälligen Ausleihen sehen und Mitglieder daran erinnern, damit die Dinge rechtzeitig zurückkommen.

Die neue Freiwillige hat einen KI-Assistenten um die Komponenten gebeten. Der Code sieht vernünftig aus, die Listen bleiben aber leer, und die Konsole meldet Fehler. Die Akzeptanzkriterien lauten:

1. Der Code folgt Vue 3 mit `<script setup>`, ohne Muster aus Vue 2.
2. Keine Komponente ändert eine Prop, und keine verliert die Verbindung zu ihrem Zustand.
3. Eine Checkliste und Tests fangen solche Fehler ab, bevor der Code auf `main` kommt.
:::

:::goals
Nach diesem Kapitel kannst du

- typische Fehler in vorgeschlagenem Vue-Code erkennen und ihre Quelle in der Dokumentation finden,
- Muster aus Vue 2 in Vue 3 übersetzen,
- verlorene Reaktivität und geänderte Props finden und beheben,
- Listen mit Schlüssel und ohne `v-if` neben `v-for` schreiben,
- eine Checkliste, Tests und einen Linter als Sicherheitsnetz einsetzen.
:::

## Code prüfen, den du nicht geschrieben hast

Kapitel 0.1 hat festgehalten, dass Assistenten bei Vue oft Muster aus älteren Versionen schreiben. Was du committest, verantwortest du, egal wer es geschrieben hat. Lies vorgeschlagenen Code darum wie in einem Review, Zeile für Zeile, und such für jedes Muster, das dir fremd ist, die Stelle in der Dokumentation. Im Projekt hältst du in der KI-Deklaration fest, was du geprüft und geändert hast, und im Screencast zeigst du eine Stelle, an der ein Vorschlag falsch war.

## Muster aus Vue 2

Vue 2 hat laut [vuejs.org](https://v2.vuejs.org/eol/) am 31. Dezember 2023 sein Lebensende erreicht. Der [Migrationsleitfaden](https://v3-migration.vuejs.org/) nennt, was sich in Vue 3 geändert hat. Statt `new Vue` startet `createApp` eine App, und globale Funktionen wie `Vue.component` hängen an der App. Filter gibt es nicht mehr, eine Funktion oder ein berechneter Wert übernimmt ihre Arbeit. `$on`, `$off` und `$once` sind entfernt, ebenso der Modifier `.native` und `$listeners`, und `Vue.set` braucht es nicht mehr.

Manches davon fällt nicht sofort auf. Ein Filter wie `{{ loan.until | date }}` kompiliert in Vue 3 ohne Fehler, denn Vue liest den Ausdruck als JavaScript, und `|` ist dort ein bitweises Oder. Auf der Seite steht dann eine Zahl statt eines Datums.

## Die Options API in script setup

Code in `<script setup>` läuft wie der Inhalt von `setup()`, und dort gibt es laut [Vue-Dokumentation](https://vuejs.org/api/composition-api-setup.html) kein `this`. Ein vorgeschlagenes `this.loans` in einem berechneten Wert scheitert darum zur Laufzeit. Felder wie `data`, `methods` oder `computed` in einem zweiten `<script>` gehören zur Options API und passen nicht zu `<script setup>`. `defineProps` und `defineEmits` muss niemand importieren. Wer es trotzdem tut, bekommt beim Kompilieren die Warnung, dass `defineProps` ein Makro des Compilers sei. Props ohne Typen wie `defineProps(['loans'])` taugen laut [Styleguide](https://vuejs.org/style-guide/rules-essential.html) nur für Prototypen.

## Vuex und Vue CLI

Für geteilten Zustand empfiehlt die Vue-Dokumentation Pinia, Vuex ist im Wartungsmodus. Ein Vorschlag mit `new Vuex.Store`, `commit` und `mapState` gehört darum in einen Store mit `defineStore`, wie in Kapitel 7.2. Ebenso ist [Vue CLI](https://cli.vuejs.org/) im Wartungsmodus, ein neues Projekt entsteht mit create-vue und Vite. Anleitungen mit `vue create` oder `npm run serve` stammen aus dieser Zeit.

## Verlorene Reaktivität

Wer ein reaktives Objekt oder einen Store direkt zerlegt, bekommt Kopien der Werte. Die Seite zeigt dann den Stand vom Zerlegen und folgt keiner Änderung mehr, wie Kapitel 5.1 und 7.2 gezeigt haben.

::playground{dir="examples/08-architecture/lost-reactivity"}

`toRefs` hält die Verbindung für ein reaktives Objekt, `storeToRefs` für einen Store. Props darf man seit Vue 3.5 zerlegen, laut [Vue-Dokumentation](https://vuejs.org/guide/components/props.html#reactive-props-destructure) braucht `watch` eine zerlegte Prop aber als Funktion, etwa `watch(() => loans, …)`.

## Geänderte Props

Daten fliessen laut Vue-Dokumentation nur von der Elternkomponente zum Kind. Ändert ein Kind seine Prop, warnt Vue in der Konsole, und die Änderung wirkt nicht.

::playground{dir="examples/08-architecture/mutated-prop"}

Das Kind meldet stattdessen ein Event, und die Elternkomponente ändert ihren Zustand. Braucht das Kind nur einen Startwert, legt es mit `ref` eine eigene Kopie an.

## Listen mit Schlüssel

Der Styleguide verlangt zu jedem `v-for` einen `key`. Ohne Schlüssel oder mit dem Index als Schlüssel verwendet Vue die Elemente nach ihrer Position wieder. Verschwindet ein Eintrag, wandert der Zustand in den Elementen, etwa ein getippter Text, zum nächsten Eintrag.

::playground{dir="examples/08-architecture/missing-key"}

`v-if` und `v-for` gehören laut Styleguide nie an dasselbe Element. In Vue 3 wertet Vue `v-if` zuerst aus, die Variable der Schleife gibt es dann noch nicht. Ein berechneter Wert filtert die Liste vorher, oder ein `<template v-for>` umschliesst das Element mit `v-if`.

## Eine Checkliste

Diese Fragen helfen bei jedem vorgeschlagenen Stück Vue-Code.

1. Läuft der Code mit Vue 3 und `<script setup>`, ohne `this`, Filter, `$on` und `new Vue`?
2. Haben Props Typen, und ändert keine Komponente ihre Props?
3. Bleiben Werte aus Stores und reaktiven Objekten verbunden?
4. Hat jedes `v-for` einen eindeutigen `key`, und steht kein `v-if` am selben Element?
5. Verwendet der Code Pinia, Vue Router und Vite statt Vuex, Vue CLI und älterer Funktionen?
6. Zeigt die Seite Laden, Fehler und leere Listen, wenn Daten von einem Server kommen?
7. Gibt es einen Test für das, was der Code tun soll, und scheitert er, wenn der Code falsch ist?

## Tests und Linter als Sicherheitsnetz

Tests prüfen, was der Code tun soll, und Kapitel 8.4 zeigt, wie du prüfst, ob sie einen Fehler auch bemerken. Ein Linter findet manche Fehler schon beim Tippen. create-vue richtet mit der Option «Linter» ESLint mit [eslint-plugin-vue](https://eslint.vuejs.org/rules/) ein, wie Kapitel 3.2 gezeigt hat. Seine Regeln für Vue 3 melden unter anderem geänderte Props mit `vue/no-mutating-props`, fehlende Schlüssel mit `vue/require-v-for-key`, `v-if` neben `v-for` mit `vue/no-use-v-if-with-v-for` und Muster aus Vue 2 mit Regeln wie `vue/no-deprecated-filter`. Verlorene Reaktivität erkennt er nur mit Regeln, die nicht in den Vorgaben stehen, und ob eine Liste richtig sortiert, weiss nur ein Test.

## Dem Assistenten Kontext geben

Ein Assistent kennt dein Projekt nicht. Nenn ihm die Versionen, etwa Vue 3 mit `<script setup>`, Pinia und Vue Router, und die Ordnung deines Projekts, und lass dir erklären, was sein Vorschlag tut. Was du nicht erklären kannst, übernimmst du nicht. Passwörter, Schlüssel und Personendaten gehören nie in eine Anfrage an einen Assistenten.

## In deinem Projekt

In der KI-Deklaration deines README steht für jedes Werkzeug, wofür du es eingesetzt hast, welche Teile betroffen sind und was du am Ergebnis geprüft oder geändert hast. Notier dir während der Arbeit Stellen, an denen ein Vorschlag falsch war, mit dem Commit, der ihn korrigiert. Der Screencast fragt nach einer solchen Stelle.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Klick im Beispiel mit der geänderten Prop auf «Dazuzählen». Was meldet die Konsole, und was zeigt die Zahl? Schreib das Kind so um, dass es ein Event meldet.
2. Tipp im Beispiel ohne Schlüssel einen Text in die zweite Zeile und entferne die erste. Wo steht dein Text jetzt? Ändere den Schlüssel auf `note.id` und wiederhole es.
3. Klick im Beispiel mit der verlorenen Reaktivität mehrmals. Welche Zahl folgt? Ersetze das Zerlegen durch `toRefs(state)`.
4. Starte im Übungsprojekt dieses Kapitels die Tests, bevor du etwas änderst. Welche Meldungen deuten auf Muster aus Vue 2?

## Aufgaben

Die Aufgaben korrigieren den Code, den der Assistent für das Team vorgeschlagen hat. Du findest das Projekt im Kursrepo im Ordner `exercises/08-architecture/ai-review/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
`OverdueList.vue` mischt `<script setup>` mit `this` und einem Filter aus Vue 2, und ihre Props haben keine Typen. Schreib die Komponente in Vue 3 neu. Sie zeigt die Ausleihen, deren Tag vor `today` liegt, die älteste zuerst, mit einem Datum wie in der Sprache der Seite üblich.

:::solution[Lösung]
::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/components/OverdueList.vue"}
:::
::::

::::exercise[Vertiefung]
Die Seite des Teams zerlegt den Store direkt und zeigt darum keine Ausleihen. `LoanRow.vue` ändert ihre Prop `reminded`, statt den Klick auf «Erinnern» zu melden. Behebe beides, sodass der Store festhält, wer erinnert wurde.

:::solution[Lösung]
::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/views/TeamPage.vue" lines="10-15"}

::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/components/LoanRow.vue"}
:::
::::

::::exercise[Knobelei]
`NoteList.vue` hat `v-if` und `v-for` am selben Element, keinen Schlüssel und ändert beim Entfernen die Prop `notes`. Zeig nur die offenen Notizen, gib jeder Zeile einen eindeutigen Schlüssel und lass die Prop unverändert.

:::solution[Lösung]
::code{file="exercises/08-architecture/ai-review/solution/{lang}/src/components/NoteList.vue"}
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein berechneter Wert in `<script setup>` liest `this` und scheitert. | Props mit `defineProps` übernehmen und `props.loans` lesen. |
| Eine Interpolation mit `\|` zeigt eine Zahl statt Text. | Filter gibt es in Vue 3 nicht mehr. Eine Funktion aufrufen. |
| Eine Liste aus einem Store bleibt leer, obwohl der Store geladen hat. | Den Store mit `storeToRefs` zerlegen oder über den Store lesen. |
| Die Konsole meldet, dass ein Ziel nur lesbar ist. | Eine Komponente ändert ihre Prop. Ein Event melden. |
| Ein getippter Text springt nach dem Entfernen in eine andere Zeile. | Einen eindeutigen `key` verwenden, nicht den Index. |
| Eine Anleitung beginnt mit `vue create` oder installiert Vuex. | create-vue und Pinia verwenden. |

## Selbstcheck

::::selfcheck
1. Woran erkennst du Code, der aus Vue 2 stammt?
2. Warum bleibt eine Liste aus einem direkt zerlegten Store leer?
3. Was passiert, wenn eine Liste den Index als Schlüssel hat und ein Eintrag verschwindet?
4. Welche Fehler findet ein Linter, und welche nur ein Test?

:::solution[Antworten]
1. An `new Vue`, `this` in `<script setup>`, Filter, `$on`, `.native`, `Vue.set` oder an Vuex und Vue CLI.
2. Das Zerlegen kopiert die Werte. Ersetzt der Store später seine Liste, zeigt die Seite noch die alte.
3. Vue verwendet die Elemente nach ihrer Position wieder, und ihr Zustand landet bei einem anderen Eintrag.
4. Der Linter findet Muster wie geänderte Props, fehlende Schlüssel und Funktionen aus Vue 2. Ob die App das Richtige tut, zeigt nur ein Test.
:::
::::

:::assignment
Das Team sieht die überfälligen Ausleihen und erinnert die Mitglieder daran. Damit ist die App für den Kurs fertig. Das [Kompetenzraster](../competences/) zeigt dir, wo du nach Teil 8 stehst, und dein eigenes Projekt wendet die Kapitel dieses Teils an.
:::
