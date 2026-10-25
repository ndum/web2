---
title: Navigation Guards
description: Der Ablauf einer Navigation, globale Guards mit beforeEach und meta, die Rückkehr zum Ziel nach der Anmeldung, beforeEnter für eine einzelne Route und eine Warnung vor dem Verlassen eines Formulars.
sidebar:
  order: 4
---

:::assignment
Martina Hostettler hat zwei Wünsche aufgeschrieben.

> Als Freiwillige oder Freiwilliger am Tresen möchte ich mich anmelden, damit nur das Team den Bereich für Ausleihen und Rückgaben sieht.

> Als Mitglied möchte ich gewarnt werden, bevor ich ein halb ausgefülltes Formular verlasse, damit meine Eingaben nicht verloren gehen.

Die Akzeptanzkriterien lauten:

1. Wer nicht mit einem Konto des Teams angemeldet ist und eine Seite des Teams öffnet, landet auf der Anmeldung.
2. Nach der Anmeldung führt die App zu der Seite, die man öffnen wollte.
3. Wer eine Seite mit einem halb ausgefüllten Formular verlassen will, wird gefragt und kann bleiben.
:::

:::goals
Nach diesem Kapitel kannst du

- den Ablauf einer Navigation mit ihren Guards beschreiben,
- einen globalen Guard mit `beforeEach` und Feldern in `meta` schreiben,
- nach der Anmeldung zum ursprünglichen Ziel zurückführen und dabei nur Ziele in der App annehmen,
- einen Guard für eine einzelne Route mit `beforeEnter` schreiben,
- mit `onBeforeRouteLeave` vor dem Verlassen einer Seite fragen,
- erklären, warum ein Guard im Browser keine Daten schützt.
:::

## Der Ablauf einer Navigation

Zwischen dem Klick auf einen Link und der neuen Seite fragt der Router eine Reihe von Funktionen, ob die Navigation weitergehen darf. Diese Funktionen heissen Navigation Guards. Die [Dokumentation](https://router.vuejs.org/guide/advanced/navigation-guards.html) beschreibt die genaue Reihenfolge, die Abbildung zeigt die Schritte, die der Kurs braucht.

![Der Ablauf einer Navigation von oben nach unten. Sie beginnt mit einem RouterLink oder router.push. Dann laufen onBeforeRouteLeave in der Seite, die man verlässt, beforeEach für jede Navigation, beforeEnter nur beim Betreten einer Route, das Laden der Komponenten und beforeResolve. Danach ist die Navigation bestätigt, afterEach läuft, und das DOM zeigt die neue Seite. Rechts steht, dass jeder Guard mit false die Navigation abbricht und mit einer Route auf eine neue Navigation umleitet.](../../../assets/figures/de/p6c4-guard-flow.svg)

Ein Guard bekommt das Ziel `to` und die bisherige Route `from`. Gibt er nichts zurück, geht es weiter. `false` bricht die Navigation ab, und eine Route leitet auf eine neue Navigation um. Ältere Beispiele verwenden ein drittes Argument `next`. Die Dokumentation unterstützt es noch, rät aber davon ab, weil es eine häufige Quelle von Fehlern ist.

## Globale Guards mit beforeEach

`router.beforeEach` läuft vor jeder Navigation. Statt einer Liste von Pfaden prüft der Guard ein Feld in `meta`, das die Route selbst trägt. `to.meta` enthält laut Dokumentation die Felder aller passenden Routen, von der Elternroute bis zur Kindroute. Eine Markierung an `/team` gilt darum auch für `/team/returns`.

::playground{dir="examples/06-routing/team-guard"}

Ein Klick auf «Team» führt ohne Anmeldung zu `/login?redirect=/team`. Der Guard gibt das Ziel als `redirect` in der Query mit, so weiss die Anmeldung, wohin es danach geht.

## Die Anmeldung als Platzhalter

Eine echte Anmeldung braucht einen Server, der Passwörter prüft, und der kommt in Teil 7. Bis dahin steht in der Fallbeispiel-App ein Platzhalter in `src/auth.js`. Er kennt zwei Mitglieder, Martina Hostettler mit der Nummer M-117 und einem Konto des Teams und das Mitglied M-204 ohne. Angemeldet wird nur mit der Mitgliedernummer, Passwörter stehen keine im Code. Den Zustand hält das Modul selbst, und nach dem Neuladen ist die Anmeldung weg.

Ein Guard im Browser schützt keine Daten. Er sorgt dafür, dass Mitglieder nicht aus Versehen auf Seiten landen, die nicht für sie sind. Wer den Code im Browser ändert, kommt an ihm vorbei. Laut [OWASP Top 10:2025](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/) wirkt eine Zugriffskontrolle nur in Code auf einem Server, den ein Angreifer nicht verändern kann. Die Daten des Teams muss darum der Server schützen.

## Zurück zum Ziel

Nach der Anmeldung liest die Seite das Ziel aus `route.query.redirect` und führt mit `router.replace` dorthin. `replace` passt, weil die Anmeldung keinen eigenen Schritt in der History braucht. Der Wert stammt aber aus der Adresse, und eine Adresse kann jeder bauen und verschicken. Das [Cheat Sheet von OWASP zu Umleitungen](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) rät, für solche Rückkehrziele nur Adressen der eigenen Website anzunehmen. Die Anmeldung prüft darum, dass das Ziel mit einem einzelnen `/` beginnt, und führt sonst zum Katalog.

## Guards für eine Route

Ein Guard, der nur zu einer Route gehört, steht in ihr als `beforeEnter`. Laut Dokumentation läuft er nur beim Betreten der Route, nicht wenn sich Parameter, Query oder Hash ändern.

::playground{dir="examples/06-routing/before-enter"}

Wer angemeldet ist, kommt mit «Anmelden» gleich in den Bereich des Teams. Für einen Guard, der nur eine Route betrifft, ist `beforeEnter` übersichtlicher als eine Bedingung in `beforeEach`. Prüft ein Guard viele Routen, passt `beforeEach` mit `meta` besser.

## Warnen vor dem Verlassen

`onBeforeRouteLeave` läuft, bevor jemand die Seite verlässt, auf der die Komponente steht. Laut Dokumentation funktioniert das in jeder Komponente, die innerhalb einer `RouterView` erscheint, auch tief verschachtelt, in der Fallbeispiel-App also im Formular für Reservationen.

::playground{dir="examples/06-routing/leave-guard"}

Steht etwas im Feld, fragt `window.confirm`, ob die Seite wirklich verlassen werden soll, und bei «Abbrechen» bleibt der Guard mit `false` stehen. Neuladen und Schliessen des Tabs sind keine Wechsel der Route. Für sie gibt es das Event `beforeunload` des Browsers, das der Kurs nicht weiter verwendet.

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Klick im ersten Beispiel ohne Anmeldung auf «Team». Welche Adresse zeigt der Absatz, und was steht auf der Anmeldung?
2. Lass den Guard statt der Route `false` zurückgeben. Was passiert jetzt beim Klick auf «Team»?
3. Melde dich im Beispiel mit `beforeEnter` an, geh zurück zum Katalog und klick auf «Anmelden».
4. Schreib im Beispiel mit dem Formular eine Notiz und klick auf «Katalog». Antworte einmal mit «Abbrechen» und einmal mit «OK».

## Aufgaben

Die Aufgaben bauen die Anmeldung und die Warnung aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/06-routing/guards/de`. Der Platzhalter für die Anmeldung steht schon in `src/auth.js`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Schütze den Bereich des Teams mit einem globalen Guard in `src/router/index.js`. Wer nicht mit einem Konto des Teams angemeldet ist und eine Route mit `meta.requiresTeam` öffnen will, landet auf der Route `login`, und die Query merkt sich das Ziel als `redirect`.

:::solution[Lösung]
::code{file="exercises/06-routing/guards/solution/{lang}/src/router/index.js" lines="19-25"}

`currentMember` kommt aus `src/auth.js`. Das Fragezeichen in `currentMember.value?.team` deckt den Fall ab, dass niemand angemeldet ist und der Wert `null` ist.
:::
::::

::::exercise[Vertiefung]
Nach der Anmeldung führt `LoginView` zur Adresse aus `redirect`, ohne `redirect` zum Katalog. Nur Pfade innerhalb der App zählen, also Werte, die mit einem einzelnen `/` beginnen.

:::solution[Lösung]
::code{file="exercises/06-routing/guards/solution/{lang}/src/views/LoginView.vue" lines="12-24"}

`typeof redirect === 'string'` schliesst eine fehlende Angabe aus und auch eine Query mit zwei Werten, die als Array ankommt. `startsWith('//')` erkennt eine Adresse ohne Protokoll, die auf einen anderen Host zeigt.
:::
::::

::::exercise[Knobelei]
Warne vor dem Verlassen der Seite eines Dings, wenn im Formular etwas steht. Frag mit `window.confirm` und bleib auf der Seite, wenn die Antwort «Abbrechen» ist.

:::solution[Lösung]
::code{file="exercises/06-routing/guards/solution/{lang}/src/views/ItemView.vue" lines="13-21"}

`dirty` prüft alle Felder auf einmal. Nach dem Senden leert `Object.assign` das Formular, und die Warnung bleibt aus. Die Tests ersetzen `window.confirm` mit `vi.stubGlobal` und antworten selbst, im Browser erscheint der Dialog.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Die Konsole meldet `Detected a possibly infinite redirection in a navigation guard`. | Der Guard leitet auch die Anmeldung selbst um. Nur bei Routen mit `meta.requiresTeam` umleiten und sonst nichts zurückgeben. |
| `next` wird zweimal aufgerufen oder gar nicht, und die Navigation hängt. | Statt `next` einen Wert zurückgeben, `false`, eine Route oder nichts. |
| Nach der Anmeldung landet man auf `/` statt auf der gewünschten Seite. | Das Ziel als `redirect` in der Query mitgeben und nach der Anmeldung lesen. |
| Die Warnung erscheint nicht beim Neuladen oder beim Schliessen des Tabs. | Das ist kein Wechsel der Route. Dafür gibt es das Event `beforeunload` des Browsers. |
| Ein KI-Assistent schützt die Daten des Teams nur mit einem Guard. | Ein Guard lenkt Mitglieder, er schützt nichts. Den Zugriff prüft der Server, siehe Teil 7. |

## Selbstcheck

::::selfcheck
1. Was kann ein Guard zurückgeben, und was bewirkt jeder Wert?
2. Warum prüft der Guard ein Feld in `meta` statt einer Liste von Pfaden?
3. Warum prüft die Anmeldung das Ziel aus der Adresse?
4. Warum schützt ein Guard im Browser keine Daten?

:::solution[Antworten]
1. Nichts oder `true` lässt die Navigation weiterlaufen, `false` bricht sie ab, und eine Route leitet auf eine neue Navigation um.
2. Die Markierung steht an der Route selbst, gilt für ihre Kindrouten mit, und eine neue Seite des Teams braucht keine Änderung im Guard.
3. Jeder kann eine Adresse mit einem Ziel bauen und verschicken. Nur Pfade der App sind als Ziel sicher.
4. Der Code läuft im Browser der Person, die ihn umgehen will. Den Zugriff kann nur Code auf dem Server sicher prüfen.
:::
::::

:::assignment
Nur das Team kommt in seinen Bereich, und kein Formular geht mehr unbemerkt verloren. Der Freiwillige schaut sich zum Schluss an, was beim ersten Laden über das Netz kommt. «Jedes Mitglied lädt den Code für den Bereich des Teams mit, obwohl es ihn nie zu sehen bekommt. Und eine falsche Adresse zeigt eine leere Seite.» Beides löst das nächste Kapitel.
:::
