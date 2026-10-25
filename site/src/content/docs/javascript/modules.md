---
title: Module und Pakete
description: Code mit import und export auf Dateien verteilen, ES-Module in Node und im Browser, npm, package.json, Skripte, Versionen und die Lock-Datei.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler hat den Katalog geschickt. Die Freiwilligen haben die Tabelle als JSON exportiert, 60 Dinge in sechs Kategorien. Einer von ihnen hat dazu ein kleines Skript geschrieben, das eine Übersicht ausgibt.

> Als Freiwillige am Tresen möchte ich die Übersicht mit einem Befehl abrufen, damit ich nicht in der Tabelle suchen muss.

Angehängt ist eine Notiz des Freiwilligen. «Alles steht in einer Datei. Für die App müsste man die Funktionen wohl aufteilen.» Die Akzeptanzkriterien lauten:

1. Ein npm-Befehl gibt die Übersicht aus.
2. Die Funktionen für Beträge und die Funktionen für den Katalog stehen je in einem eigenen Modul.
3. Die Übersicht verwendet diese Module und definiert keine Funktion doppelt.
:::

:::goals
Nach diesem Kapitel kannst du

- Code mit `export` und `import` auf mehrere Dateien verteilen,
- erklären, wie Node und der Browser ES-Module laden,
- ein Projekt mit `package.json` beschreiben, Pakete installieren und Skripte starten,
- Versionsangaben lesen und erklären, wozu die Lock-Datei dient.

Du brauchst dafür die Grundlagen aus dem [Einstiegstest](../../start/entry-test/), vor allem Funktionen und Objekte.
:::

## Eine Datei für alles

Das Skript des Freiwilligen liest den Export ein und gibt zwei Zeilen aus. Lies es und überlege dir, welche Teile die App später auch brauchen wird.

::code{file="exercises/01-javascript/modules/{lang}/src/overview.js"}

Das Skript funktioniert. Die Funktionen `formatDeposit`, `countAvailable` und `findById` stecken aber in einer Datei, die beim Start sofort etwas ausgibt. Die App kann sie nicht verwenden, ohne die Datei zu kopieren. Eine Kopie hiesse, jeden Fehler an zwei Stellen zu korrigieren. Die Lösung sind Module. Ein Modul ist eine Datei, die festlegt, was andere Dateien von ihr verwenden dürfen.

## Export und Import

Mit `export` gibt ein Modul eine Funktion, eine Konstante oder eine Klasse frei. Alles andere bleibt im Modul. Im Beispiel exportiert `format.mjs` die Funktion `formatDeposit`, der Formatierer `chf` dagegen bleibt intern.

::code{file="examples/01-javascript/modules/{lang}/format.mjs" run="false"}

::code{file="examples/01-javascript/modules/{lang}/catalog.mjs" run="false"}

Mit `import` holt ein anderes Modul diese Namen. In geschweiften Klammern stehen die Namen, die es braucht, nach `from` der Pfad zur Datei. Ein Pfad, der mit `./` oder `../` beginnt, gilt relativ zur Datei mit dem Import.

::code{file="examples/01-javascript/modules/{lang}/main.mjs" run="false"}

Die Beispiele importieren sich gegenseitig, darum laufen sie nicht mit dem Knopf «Ausführen», sondern mit Node. Im Kursrepo startest du sie im Ordner `examples/01-javascript/modules/de`.

```bash
node main.mjs
```

Die Ausgabe lautet `3 von 4 Dingen sind da.` und `Beamer, Pfand CHF 80.00`. Ein Modul hat seinen eigenen Gültigkeitsbereich. Variablen, die es nicht exportiert, sieht kein anderes Modul, und zwei Module dürfen dieselben Namen intern verwenden, ohne sich zu stören.

## Namen beim Import

Ein Name lässt sich beim Import umbenennen, etwa wenn zwei Module dieselbe Funktion `format` anbieten. `import { nextId as reservationId } from './ids.mjs'` holt `nextId` unter dem Namen `reservationId`. Mit `import * as catalog` kommen alle Exporte eines Moduls als ein Objekt.

::code{file="examples/01-javascript/modules/{lang}/namespace.mjs" run="false"}

`node namespace.mjs` gibt `[ 'countAvailable', 'findById' ]` aus und danach den Namen des Raclette-Ofens. Neben den benannten Exporten gibt es den Standardexport, `export default function formatDeposit(...)`, der ohne geschweifte Klammern importiert wird, `import formatDeposit from './format.mjs'`. Der Kurs verwendet benannte Exporte, weil der Name dann überall gleich lautet und der Editor ihn beim Umbenennen findet. Einen Standardexport siehst du bei Vue-Komponenten. Der Compiler macht aus jeder Datei `.vue` einen, darum importierst du `ItemCard` ohne geschweifte Klammern.

## Ein Modul läuft einmal

Importieren mehrere Dateien dasselbe Modul, führt JavaScript dessen Code nur beim ersten Mal aus. Alle bekommen danach dasselbe Modul mit denselben Variablen.

::code{file="examples/01-javascript/modules/{lang}/ids.mjs" run="false"}

::code{file="examples/01-javascript/modules/{lang}/shared.mjs" run="false"}

`node shared.mjs` gibt `1 2 3` aus. Die beiden Importe zeigen auf dieselbe Funktion und damit auf dieselbe Variable `next`. Ein Modul kann so Zustand für eine ganze App halten. In Teil 7 nutzt der Kurs diese Eigenschaft für gemeinsame Daten.

## Module in Node und im Browser

Node behandelt eine Datei mit der Endung `.mjs` als ES-Modul. Eine Datei mit der Endung `.js` gilt als ES-Modul, wenn in der nächsten `package.json` der Eintrag `"type": "module"` steht. Fehlt er, erkennen aktuelle Versionen von Node `import` und `export` zwar selbst, ältere Versionen und manche Werkzeuge erwarten dann aber das ältere Modulsystem CommonJS mit `require` und `module.exports`. Mit dem Eintrag ist der Fall für alle eindeutig, darum steht er in jedem Projekt des Kurses. CommonJS findest du in älterem Code und in vielen Antworten von KI-Assistenten.

Im Browser lädt `<script type="module" src="main.js"></script>` ein Modul. Es läuft erst, wenn die Seite gelesen ist, und es gilt immer der Strict Mode. Fehlt `type="module"`, meldet der Browser beim ersten `import` den Fehler `Cannot use import statement outside a module`. Module lädt der Browser über HTTP, öffnest du eine Seite direkt als Datei, blockieren die meisten Browser ihre Module. Auch einen Import wie `import { ref } from 'vue'` versteht der Browser ohne Hilfe nicht, weil er nicht weiss, wo das Paket `vue` liegt. Beides erledigt in Teil 2 Vite, ein Werkzeug, das während der Entwicklung als Server läuft und für die Veröffentlichung alle Module zusammenfasst.

## npm und package.json

npm installiert Pakete, also Code anderer, und startet Skripte. Was ein Projekt braucht, steht in der Datei `package.json`. So sieht sie im Übungsprojekt dieses Kapitels aus.

::code{file="exercises/01-javascript/modules/{lang}/package.json"}

`type` legt die Module fest, wie oben beschrieben. Unter `scripts` stehen Befehle mit einem Namen. `npm run test` startet den Befehl `vitest run`, für `test` und `start` darf das `run` auch fehlen. Unter `devDependencies` stehen Pakete, die nur während der Entwicklung nötig sind, hier Vitest für die Tests. Was die App selbst zum Laufen braucht, etwa Vue, steht unter `dependencies`. `private: true` verhindert, dass jemand das Projekt aus Versehen im öffentlichen Verzeichnis von npm veröffentlicht.

`npm install` liest die Datei und lädt alle Pakete in den Ordner `node_modules`, auch die Pakete, die diese Pakete selbst brauchen. Ein neues Paket fügst du mit `npm install -D vitest` hinzu, das `-D` trägt es unter `devDependencies` ein. Werkzeuge aus `node_modules` startest du mit `npx`, zum Beispiel `npx vitest`.

## Versionen und die Lock-Datei

Versionen von Paketen haben drei Zahlen, etwa `5.0.5`. Die erste steigt bei Änderungen, die bestehenden Code brechen können, die zweite bei neuen Funktionen und die dritte bei Fehlerkorrekturen. Dieses Schema heisst Semantic Versioning. In `package.json` steht oft ein Bereich statt einer Version.

| Angabe | Erlaubt |
|---|---|
| `5.0.5` | genau diese Version |
| `~5.0.5` | Fehlerkorrekturen, also `5.0.x` ab `5.0.5` |
| `^5.0.5` | alles bis vor `6.0.0` |

Der Kurs schreibt genaue Versionen, damit alle mit denselben Paketen arbeiten. Doch auch dann haben die Pakete selbst wieder Abhängigkeiten mit Bereichen. Darum schreibt `npm install` die Datei `package-lock.json`. Sie hält die genaue Version jedes installierten Pakets fest. Die Lock-Datei gehört ins Repo, `node_modules` dagegen nie. `npm ci` installiert genau, was in der Lock-Datei steht, und eignet sich für Server, die Tests ausführen.

## Im Code

Arbeite mit den Beispielen im Ordner `examples/01-javascript/modules/de`. Sag jeweils voraus, was passiert, bevor du einen Befehl ausführst.

1. Was gibt `node shared.mjs` aus, wenn du in `ids.mjs` die Zeile `let next = 1` auf `let next = 100` änderst?
2. Entferne in `catalog.mjs` das Wort `export` vor `countAvailable` und starte `node main.mjs`. Welche Meldung erscheint, und erscheint sie vor oder nach der ersten Ausgabe?
3. Lass in `main.mjs` beim Import von `catalog.mjs` die Endung `.mjs` weg. Was meldet Node jetzt?
4. Stelle alles wieder her und importiere in `main.mjs` zusätzlich den Formatierer `chf` aus `format.mjs`. Warum klappt das nicht?

Die Meldungen aus den Schritten 2 und 3 erscheinen, bevor die erste Zeile läuft. JavaScript löst alle Importe auf, bevor es den Code eines Moduls ausführt.

## Aufgaben

Die Aufgaben bauen auf dem Skript des Freiwilligen auf. Du findest es im Kursrepo im Ordner `exercises/01-javascript/modules/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Mit `node src/overview.js` siehst du die Übersicht. Zu Beginn schlagen fast alle Tests fehl, das ist so gewollt.

::::exercise[Einstieg]
Lege die Datei `src/format.js` an. Sie exportiert die Funktion `formatDeposit`, die einen Betrag wie `CHF 20.00` formatiert. Entferne die Funktion aus `src/overview.js` und importiere sie dort aus dem neuen Modul. Die Tests in `level-1.test.js` prüfen beides.

:::solution[Lösung]
::code{file="exercises/01-javascript/modules/solution/{lang}/src/format.js"}

In `src/overview.js` fällt die Funktion weg, dafür steht oben `import { formatDeposit } from './format.js'`. Der Formatierer `chf` wandert mit ins Modul. Er bleibt dort, ohne `export`, weil ihn ausser `formatDeposit` niemand braucht.
:::
::::

::::exercise[Vertiefung]
Verschiebe `countAvailable` und `findById` in ein Modul `src/catalog.js` und importiere sie in der Übersicht. Füge danach in `package.json` ein Skript `overview` hinzu, das `node src/overview.js` ausführt, und starte die Übersicht mit `npm run overview`.

:::solution[Lösung]
::code{file="exercises/01-javascript/modules/solution/{lang}/src/catalog.js"}

In `package.json` kommt unter `scripts` die Zeile `"overview": "node src/overview.js"` dazu. npm führt den Befehl im Ordner des Projekts aus, darum stimmt der Pfad, egal von wo aus du das Skript startest. Der letzte Test führt die Übersicht aus und prüft, dass sie nach dem Umbau noch dasselbe ausgibt.
:::
::::

::::exercise[Knobelei]
Die App soll später alle Funktionen von einer einzigen Stelle importieren können. Lege `src/index.js` an, das alle Funktionen aus `catalog.js` und `format.js` weitergibt, ohne sie zu kopieren. Ändere die Übersicht so, dass sie nur noch aus `./index.js` importiert.

:::solution[Lösung]
::code{file="exercises/01-javascript/modules/solution/{lang}/src/index.js"}

::code{file="exercises/01-javascript/modules/solution/{lang}/src/overview.js"}

`export { ... } from` gibt Namen eines anderen Moduls weiter, ohne sie selbst zu importieren. Die Funktionen bleiben in ihren Modulen, `index.js` zeigt nur auf sie, darum ist `findById` aus `index.js` dieselbe Funktion wie aus `catalog.js`. Mit `export * from './catalog.js'` gäbe das Modul alles weiter, was `catalog.js` exportiert. Die ausdrückliche Liste zeigt dagegen auf einen Blick, was das Modul anbietet.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Der Browser meldet `Cannot use import statement outside a module`. | Im Tag `<script>` fehlt `type="module"`. |
| Ein Import ohne Endung wie `from './catalog'`, und Node meldet `ERR_MODULE_NOT_FOUND`. | In Node und im Browser die Endung angeben. Nur Werkzeuge wie Vite ergänzen sie selbst. |
| Node meldet `does not provide an export named`. | Den Namen beim `export` und beim `import` vergleichen, auch die Gross- und Kleinschreibung. |
| `node_modules` landet im Repo. | `node_modules/` in die Datei `.gitignore` schreiben. `npm install` erzeugt den Ordner jederzeit neu. |
| Ein Test vergleicht `formatDeposit(20)` mit `'CHF 20.00'` und schlägt fehl, obwohl die Ausgabe gleich aussieht. | `Intl` setzt nach `CHF` ein geschütztes Leerzeichen. Im Test die Leerzeichen vorher vereinheitlichen, wie es `level-1.test.js` tut. |
| Ein KI-Assistent schreibt `require(...)` und `module.exports`. | Das ist CommonJS, das ältere Modulsystem von Node. Im Kurs stehen `import` und `export`. |
| Ein KI-Assistent installiert für eine Kleinigkeit ein Paket, etwa zum Formatieren von Beträgen. | Zuerst prüfen, ob JavaScript es selbst kann, hier mit `Intl.NumberFormat`. Jedes Paket ist Code, den jemand pflegen muss. |

## Selbstcheck

::::selfcheck
1. Was ist der Unterschied zwischen einem benannten Export und einem Standardexport?
2. Zwei Dateien importieren dasselbe Modul. Wie oft läuft sein Code, und was heisst das für seine Variablen?
3. Wozu dient `package-lock.json`, und gehört die Datei ins Repo?
4. Was erlaubt die Angabe `^5.0.5` in `package.json`?

:::solution[Antworten]
1. Ein benannter Export hat einen festen Namen und wird mit geschweiften Klammern importiert. Ein Modul hat höchstens einen Standardexport, den der Import ohne Klammern unter einem beliebigen Namen holt.
2. Nur einmal. Alle Dateien, die das Modul importieren, teilen seine Variablen.
3. Sie hält die genaue Version jedes installierten Pakets fest, auch der Pakete, die andere Pakete brauchen. So installieren alle dasselbe. Die Datei gehört ins Repo.
4. Jede Version ab `5.0.5` bis vor `6.0.0`, also neue Funktionen und Fehlerkorrekturen, aber keine Änderungen, die bestehenden Code brechen.
:::
::::

:::assignment
Martina Hostettler bedankt sich für die Übersicht. Ein Freiwilliger hat gleich zwei neue Zelte erfasst, und seither stimmt etwas nicht. Leiht jemand eines der neuen Zelte aus, ist auch das andere weg. Um diesen Fehler geht es im nächsten Kapitel.
:::
