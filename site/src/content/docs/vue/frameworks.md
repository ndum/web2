---
title: Frameworks im Vergleich
description: Vue, React und Angular nach fünf Kriterien verglichen, Zahlen aus Umfragen mit ihren Grenzen, Konzepte, die sich übertragen lassen, und die freie Wahl im Projekt.
sidebar:
  order: 1
---

:::assignment
Die Warnung des Freiwilligen aus Teil 2 hat Wirkung gezeigt. Der Katalog soll zu einem Framework umziehen, und im Verein fallen drei Namen, Vue, React und Angular. Bevor die Freiwilligen loslegen, will der Vorstand die Wahl verstehen.

> Als Vorstand möchte ich wissen, mit welchem Framework die App weitergebaut wird und warum, damit wir auch in einigen Jahren Freiwillige finden, die daran arbeiten können.

Die Akzeptanzkriterien für deine Antwort lauten:

1. Sie vergleicht Vue, React und Angular nach denselben Kriterien.
2. Zahlen zur Verbreitung nennen ihre Quelle und das Jahr.
3. Sie sagt, was bei einem späteren Wechsel des Frameworks verloren ginge und was bleibt.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, welche Arbeit ein Framework einer SPA abnimmt,
- Vue, React und Angular nach Einstieg, Umfang, Sichtbarkeit der Konzepte, Verbreitung und Übertragbarkeit vergleichen,
- Zahlen aus Umfragen mit ihrer Quelle lesen und ihre Grenzen nennen,
- die Begriffe von Vue denen von React und Angular zuordnen.
:::

## Die Arbeit eines Frameworks

In Teil 2 hast du gesehen, wo die SPA von Hand an Grenzen stösst. Jede Änderung baut die ganze Seite neu auf, das Suchfeld verliert den Fokus, und jeder Text braucht `escapeHtml`. Ein Framework für Oberflächen nimmt dir genau diese Arbeit ab. Du beschreibst, wie die Seite bei einem bestimmten Zustand aussieht, und das Framework hält die Seite im Takt mit dem Zustand. Es ändert nur, was sich geändert hat, setzt Text immer sicher ein und lässt Eingabefelder in Ruhe, die gerade jemand benutzt. Dazu kommen Komponenten, mit denen du eine Oberfläche in Teile zerlegst, die du an mehreren Stellen einsetzen kannst.

Drei Frameworks sind besonders verbreitet. React stammt von Meta, damals noch Facebook, und ist seit 2013 öffentlich. Vue hat Evan You 2014 veröffentlicht. Es ist ein unabhängiges Projekt, das von Spenden und Sponsoren lebt. Angular kommt von Google und erschien 2016 als vollständige Neuentwicklung des älteren AngularJS. Alle drei sind Open Source und lassen sich für dieselben Aufgaben einsetzen. Sie unterscheiden sich darin, was sie mitbringen und wie viel sie dir vorschreiben.

## Einstieg

Eine Komponente in Vue ist eine Datei mit der Endung `.vue`, die HTML, JavaScript und CSS in drei Blöcken zusammenfasst. Das Template ist gewöhnliches HTML mit einigen Zusätzen wie `v-if` oder `{{ }}`. Wer HTML, CSS und JavaScript kann, liest eine solche Datei vom ersten Tag an.

React beschreibt die Oberfläche in JSX, einer Erweiterung von JavaScript, in der HTML-ähnliche Tags im Code stehen. Eine Komponente ist eine Funktion, die bei jeder Änderung des Zustands erneut läuft. Für den Zustand gibt es Hooks wie `useState`, die festen Regeln folgen. Sie dürfen zum Beispiel nicht in einer Bedingung stehen.

Angular arbeitet mit TypeScript, Klassen und Decorators wie `@Component`. Dazu kommen Dependency Injection und feste Konventionen für den Aufbau eines Projekts. Das hilft grossen Teams, verlangt aber mehr Wissen, bevor die erste Komponente läuft.

## Umfang des offiziellen Ökosystems

Zu einer SPA gehören mehr als Komponenten, nämlich Routing, gemeinsamer Zustand, Werkzeuge für den Build und Tests. Bei Vue stammen Vue Router, Pinia für den Zustand, die Vue DevTools und Vue Test Utils vom Vue-Team. Das Build-Werkzeug Vite hat Evan You ursprünglich für Vue entwickelt, heute nutzen es auch andere Frameworks.

React selbst ist eine Bibliothek für Komponenten. Routing, Zustand, das Laden von Daten und der Build kommen aus anderen Projekten. Für eine neue App empfiehlt die Dokumentation auf [react.dev](https://react.dev/learn/creating-a-react-app) ein Framework wie Next.js oder React Router, die solche Teile mitbringen. Angular liefert dagegen alles aus einer Hand, Router, Formulare, einen Client für HTTP, Werkzeuge für Tests und ein Kommandozeilenwerkzeug.

## Sichtbarkeit der Konzepte

In Vue siehst du im Code, was reaktiv ist. Ein Wert, auf den die Seite reagieren soll, entsteht mit `ref`, ein abgeleiteter Wert mit `computed`. Vue merkt sich, welche Teile der Seite welche Werte lesen, und aktualisiert nur diese. Die Kapitel «Reaktiver Zustand» und Teil 5 zeigen das genauer.

React führt bei einer Änderung die ganze Komponentenfunktion erneut aus und vergleicht das Ergebnis mit dem vorherigen. Damit dabei nicht zu viel gerechnet wird, gibt es Hilfen wie `useMemo` und seit 2025 den React Compiler, der solche Optimierungen automatisch einsetzt. Angular baut seit einigen Versionen auf Signals, die `ref` und `computed` in Vue ähneln, und neue Apps laufen seit Version 21 ohne die Bibliothek Zone.js, die früher Änderungen erkannte.

## Verbreitung

Wie verbreitet ein Framework ist, zeigen Umfragen unter Entwicklerinnen und Entwicklern und die Zahl der Downloads.

![Verbreitung und Zufriedenheit von React, Vue und Angular. Zwei Balkendiagramme mit einer Skala von 0 bis 100 Prozent. Oben die Umfrage von Stack Overflow 2026, Anteil der Antworten, die das Framework verwenden, React 41,5, Vue.js 17,2 und Angular 16,0 Prozent. Unten State of JS 2025, Anteil der Nutzenden, die das Framework wieder verwenden würden, React 72, Vue.js 84 und Angular 48 Prozent.](../../../assets/figures/de/p3c1-surveys.svg)

Im [Developer Survey 2026 von Stack Overflow](https://survey.stackoverflow.co/2026/technology/data) beantworteten 10'281 Personen die Frage nach Web-Frameworks. 41,5 Prozent arbeiteten im letzten Jahr ausgiebig mit React, 17,2 Prozent mit Vue und 16,0 Prozent mit Angular. In der [Umfrage von 2025](https://survey.stackoverflow.co/2025/technology) lag React auch bei den Berufsleuten vorn, mit 46,9 Prozent gegenüber 19,8 Prozent für Angular und 18,4 Prozent für Vue.

[State of JS 2025](https://2025.stateofjs.com/en-US/libraries/front-end-frameworks/) mit 13'002 Antworten fragt zusätzlich, ob jemand ein Framework wieder verwenden würde. Von denen, die ein Framework schon verwendet haben, würden 84 Prozent Vue wieder verwenden, 72 Prozent React und 48 Prozent Angular. Bei npm, dem Verzeichnis der JavaScript-Pakete, wurde in der Woche ab dem 29. September 2026 das Paket `react` rund 224 Millionen Mal heruntergeladen, `vue` rund 20 Millionen und `@angular/core` rund 7 Millionen Mal.

Solche Zahlen haben Grenzen. An Umfragen nehmen nur Menschen teil, die davon erfahren und Lust dazu haben, und jede Umfrage erreicht ein anderes Publikum. State of JS fragt, ob jemand ein Framework schon verwendet hat, Stack Overflow, womit jemand im letzten Jahr ausgiebig gearbeitet hat. Downloads zählen jede Installation, auch die automatischen auf Build-Servern und die als Abhängigkeit anderer Pakete. Für die Wahl taugen die Zahlen darum als Richtung, nicht als genaues Mass. Die Richtung ist deutlich. React ist mit Abstand am weitesten verbreitet, Vue und Angular liegen ungefähr gleichauf, und wer Vue verwendet, bleibt eher dabei.

## Übertragbarkeit

Wer ein Framework beherrscht, findet in den anderen dieselben Ideen unter anderen Namen. Die Tabelle ordnet die Begriffe dieses Kurses denen von React und Angular zu.

| Konzept | Vue | React | Angular |
|---|---|---|---|
| Komponente | Single File Component, `.vue` | Funktion, die JSX zurückgibt | Klasse mit `@Component` |
| Reaktiver Zustand | `ref` | `useState` | `signal` |
| Abgeleiteter Wert | `computed` | `useMemo` oder direkt berechnet | `computed` |
| Daten an Kindkomponenten | Props mit `defineProps` | Props | `input()` |
| Meldung an die Eltern | Events mit `defineEmits` | Funktion als Prop | `output()` |
| Bedingung im Template | `v-if` | `&&` oder `? :` in JSX | `@if` |
| Liste | `v-for` mit `:key` | `map` mit `key` | `@for` mit `track` |
| Inhalt einsetzen | Slots | `children` | `<ng-content>` |
| Routing | Vue Router | React Router oder ein Framework | Angular Router |

Die Konzepte nimmst du also mit, die Syntax und die Eigenheiten lernst du neu. Ein Wechsel kostet vor allem den Code, der neu geschrieben werden muss, und die Erfahrung mit den Werkzeugen. Was eine Komponente leisten soll, wie Daten fliessen und wo der Zustand liegt, bleibt gleich.

## Die Wahl für Lorraine Commons

Der Kurs verwendet Vue. Der Einstieg ist für Menschen mit HTML, CSS und JavaScript am kürzesten, Router, Zustand und Werkzeuge kommen aus einer Hand, und die Reaktivität ist im Code sichtbar. Damit lernst du die Konzepte, ohne gleichzeitig JSX, TypeScript oder Dependency Injection lernen zu müssen. Dass React häufiger eingesetzt wird, gehört zur ehrlichen Antwort dazu.

Im Projekt am Ende des Moduls wählst du das Framework selbst, solange daraus eine SPA mit Routing im Browser entsteht. Zwei Wahlthemen zeigen später dieselbe App in React und in Angular.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine Zahl aus einer Umfrage wird ohne Quelle und Jahr weitergegeben. | Immer Quelle, Jahr und die genaue Frage nennen, die Zahlen ändern sich jedes Jahr. |
| Downloads werden als Zahl der Menschen gelesen, die ein Framework nutzen. | Downloads zählen Installationen, auch automatische. Sie zeigen eine Richtung, keine Köpfe. |
| Ein Framework gilt als das beste. | Kriterien an der Aufgabe und am Team ausrichten, nicht an einer Rangliste. |
| Es heisst, mit Vue lerne man nichts für React oder Angular. | Komponenten, Props, Events, Zustand und Routing gibt es überall, nur die Namen ändern sich. |
| Ein KI-Assistent liefert Beispiele für Vue 2, etwa mit `new Vue()` oder der Options API. | Auf Vue 3 mit `<script setup>` bestehen. Vue 2 wird seit Ende 2023 nicht mehr gepflegt. |
| Ein KI-Assistent nennt Zahlen zur Verbreitung. | Die Zahlen in der Quelle nachprüfen. Ein Assistent kennt nur den Stand seiner Trainingsdaten. |

## Aufgaben

::::exercise[Einstieg]
Eine Freiwillige kennt React, ein anderer Angular. Nenne das Gegenstück in Vue zu `useState`, `@for`, `input()`, `children` und `signal` und zu einer Funktion, die eine Elternkomponente ihrer Kindkomponente als Prop übergibt.

:::solution[Lösung]
`useState` und `signal` entsprechen `ref`, `@for` entspricht `v-for`, und `input()` entspricht einer Prop mit `defineProps`. `children` entspricht einem Slot. Eine Funktion als Prop übernimmt in React die Rolle, die in Vue ein Event mit `defineEmits` spielt. Die Kindkomponente meldet etwas, und die Elternkomponente entscheidet, was passiert.
:::
::::

::::exercise[Vertiefung]
Schreib die Antwort an den Vorstand von Lorraine Commons, sechs bis zehn Sätze. Sie erfüllt die drei Akzeptanzkriterien aus dem Auftrag.

:::solution[Lösung]
Zum Beispiel diese Antwort.

> Wir haben Vue, React und Angular nach Einstieg, Umfang, Verbreitung und Übertragbarkeit verglichen. Vue lässt sich mit Kenntnissen in HTML, CSS und JavaScript am schnellsten lernen, und Router, Zustand und Werkzeuge stammen vom selben Team. React ist am weitesten verbreitet, im Developer Survey 2026 von Stack Overflow arbeiteten 41,5 Prozent damit, mit Vue 17,2 Prozent. Für Router und Zustand braucht React aber zusätzliche Projekte. Angular bringt alles mit, setzt jedoch TypeScript und mehr Vorwissen voraus. In State of JS 2025 würden 84 Prozent derer, die Vue schon verwendet haben, es wieder verwenden. Wir empfehlen Vue, weil neue Freiwillige schnell einsteigen können. Würde der Verein später wechseln, müsste er den Code neu schreiben, die Aufteilung in Komponenten, die Daten und die Abläufe blieben aber gleich.

Die Antwort nennt für jede Zahl Quelle und Jahr, verschweigt die Stärke von React nicht und beantwortet die Frage nach einem Wechsel.
:::
::::

::::exercise[Knobelei]
In State of JS 2025 haben 52 Prozent Vue schon verwendet, im Developer Survey 2026 von Stack Overflow sind es 17,2 Prozent. Erkläre den Unterschied mit mindestens zwei Gründen und leite daraus eine Regel für den Umgang mit solchen Zahlen ab.

:::solution[Lösung]
Die Umfragen erreichen ein anderes Publikum. An State of JS nehmen vor allem Menschen teil, die sich für JavaScript interessieren und oft mehrere Frameworks ausprobieren. Stack Overflow erreicht Entwicklerinnen und Entwickler aller Richtungen, auch solche, die gar keine Oberflächen bauen. Ausserdem fragen die beiden etwas anderes. State of JS will wissen, ob jemand ein Framework schon verwendet hat, Stack Overflow, womit jemand im letzten Jahr ausgiebig gearbeitet hat. Daraus folgt eine Regel. Zahlen aus verschiedenen Umfragen vergleicht man nicht direkt, sondern nur innerhalb derselben Umfrage, und man nennt immer, wer gefragt wurde und was.
:::
::::

## Selbstcheck

::::selfcheck
1. Welche Arbeit nimmt ein Framework einer SPA ab, verglichen mit der SPA von Hand aus Teil 2?
2. Worin unterscheiden sich Vue, React und Angular beim Umfang des offiziellen Ökosystems?
3. Warum sagen die Downloads bei npm wenig darüber, wie viele Menschen ein Framework nutzen?
4. Wie heissen `ref`, `v-for` und Props in React und in Angular?

:::solution[Antworten]
1. Es hält die Seite im Takt mit dem Zustand, ändert nur, was sich geändert hat, setzt Text sicher ein und lässt Eingabefelder in Ruhe. Dazu kommen Komponenten.
2. Bei Vue stammen Router, Zustand, DevTools und Testwerkzeuge vom Vue-Team. React ist eine Bibliothek für Komponenten, der Rest kommt aus anderen Projekten oder einem Framework wie Next.js. Angular liefert alles aus einer Hand.
3. Sie zählen Installationen, auch automatische auf Build-Servern und solche als Abhängigkeit anderer Pakete.
4. `ref` heisst in React `useState` und in Angular `signal`. `v-for` entspricht `map` in JSX und `@for`. Props heissen in React ebenfalls Props, in Angular `input()`.
:::
::::

:::assignment
Der Vorstand folgt der Empfehlung, der Katalog zieht zu Vue um. Martina Hostettler schreibt dazu nur einen Satz. «Dann fangt an, und zwar so, dass sich auch der nächste Freiwillige zurechtfindet.» Im nächsten Kapitel legst du das Projekt an.
:::
