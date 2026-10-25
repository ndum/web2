---
title: Das erste Projekt
description: Ein Vue-Projekt mit create-vue anlegen, seine Dateien verstehen, Single File Components, createApp und mount, die Vue DevTools und Linting.
sidebar:
  order: 2
---

:::assignment
Der Freiwillige, der als Informatiker arbeitet, hat einen Rat für den Anfang. «Legt das Projekt mit dem offiziellen Werkzeug an, dann sieht es aus wie jedes andere Vue-Projekt.» Martina Hostettler hat daraus einen Auftrag gemacht.

> Als Freiwilliger möchte ich, dass die App wie ein übliches Vue-Projekt aufgebaut ist, damit sich neue Freiwillige sofort zurechtfinden.

Die Akzeptanzkriterien lauten:

1. Das Projekt entsteht mit create-vue und verwendet JavaScript.
2. Die Startseite zeigt den Namen des Vereins und die Zahl der Dinge im Katalog.
3. Die Öffnungszeiten stehen in einer eigenen Komponente.
4. Während der Entwicklung stehen die Vue DevTools bereit.
:::

:::goals
Nach diesem Kapitel kannst du

- ein Projekt mit create-vue in JavaScript anlegen und starten,
- die Dateien eines Vue-Projekts und ihre Aufgaben erklären,
- eine Single File Component mit Template, Script und Style schreiben,
- erklären, wie `createApp` und `mount` die App in die Seite bringen,
- die Vue DevTools und den Linter einsetzen.

Du brauchst dafür Node und npm aus dem Kapitel «Einrichten» und Vite aus dem Kapitel «Werkzeuge».
:::

## Ein Projekt mit create-vue

create-vue ist das offizielle Werkzeug für neue Vue-Projekte. Es legt ein Projekt mit Vite an, wie du es aus Teil 2 kennst, und fragt dich vorher, was hineingehört. Du startest es im Ordner, in dem das Projekt entstehen soll.

```bash
npm create vue@latest
```

Das Werkzeug stellt einige Fragen. Für den Kurs beantwortest du sie so, der Stand ist create-vue 3.24.0 vom Herbst 2026.

1. Als Namen gibst du `lorraine-commons` ein.
2. Bei «Use TypeScript?» wählst du No. Der Kurs verwendet JavaScript, und create-vue schlägt TypeScript als Standard vor.
3. Bei den Funktionen wählst du nur «Linter». Router, Pinia und Vitest kommen in den Teilen 6 bis 8 dazu.
4. Die experimentellen Funktionen lässt du leer.
5. Bei der Frage, ob das Beispiel weggelassen werden soll, wählst du No, damit du es dir ansehen kannst.

Danach installierst du die Pakete und startest den Server für die Entwicklung.

```bash
cd lorraine-commons
npm install
npm run dev
```

Unter `http://localhost:5173/` erscheint eine Seite mit dem Logo von Vue und dem Satz «You did it!».

## Die Dateien des Projekts

create-vue legt mehr Dateien an als die SPA aus Teil 2. Die meisten kennst du aber schon.

| Datei oder Ordner | Aufgabe |
|---|---|
| `index.html` | die einzige HTML-Seite, mit dem Element `<div id="app">` und dem Skript `src/main.js` |
| `src/main.js` | startet die App mit `createApp` und `mount` |
| `src/App.vue` | die oberste Komponente, von ihr aus wächst die App |
| `src/components/` | weitere Komponenten, im Beispiel `HelloWorld.vue` und `TheWelcome.vue` |
| `src/assets/` | CSS und Bilder, die Vite beim Build verarbeitet |
| `public/` | Dateien, die Vite unverändert ausliefert, etwa `favicon.ico` |
| `vite.config.js` | die Konfiguration von Vite mit den Plugins für Vue und die DevTools |
| `jsconfig.json` | sagt dem Editor, wo der Alias `@` hinzeigt |
| `package.json` | die Pakete und die Befehle `dev`, `build`, `preview` und `lint` |
| `eslint.config.js`, `.oxlintrc.json` | die Regeln für den Linter |
| `.vscode/extensions.json` | empfiehlt Erweiterungen für VS Code, darunter «Vue (Official)» |

Die Konfiguration von Vite sieht in den Übungsprojekten dieses Teils so aus. Gegenüber dem Projekt von create-vue ist nur der Block `test` für die Tests dazugekommen.

::code{file="exercises/03-vue/first-project/{lang}/vite.config.js"}

`vue()` bringt Vite bei, Dateien mit der Endung `.vue` zu übersetzen. `vueDevTools()` fügt während der Entwicklung die DevTools in die Seite ein. Unter `resolve.alias` steht, dass `@` für den Ordner `src` steht.

## Single File Components

Eine Komponente in Vue ist meist eine Single File Component, kurz SFC. Eine Datei mit der Endung `.vue` fasst bis zu drei Blöcke zusammen, das Template mit dem Aufbau, das Script mit Zustand und Logik und den Style mit dem Aussehen. Schau dir die kleinste sinnvolle Komponente an und überleg dir, was sie anzeigt, bevor du sie im Playground öffnest.

::playground{dir="examples/03-vue/first-component"}

Der Block `<script setup>` läuft einmal, wenn Vue die Komponente erzeugt. Alles, was darin auf oberster Ebene steht, Konstanten, Funktionen und Imports, kann das Template verwenden. `{{ association }}` setzt den Wert der Konstante als Text ein, das nächste Kapitel zeigt diese Schreibweise genauer. Der Block `<style scoped>` gilt nur für diese Komponente.

Ein Browser kann mit einer Datei `.vue` nichts anfangen. Vite übersetzt sie mit dem Plugin für Vue in ein JavaScript-Modul. Aus dem Template wird dabei eine Render-Funktion, die die Elemente der Seite erzeugt, und aus dem Style gewöhnliches CSS.

![Der Weg einer Single File Component bis auf die Seite. Links die Datei App.vue mit den Blöcken template, script setup und style scoped. Vite übersetzt sie mit dem Plugin für Vue in CSS und ein JavaScript-Modul mit einer Render-Funktion. main.js importiert das Modul, erzeugt mit createApp die App und hängt sie mit mount in das Element mit der id app in index.html ein.](../../../assets/figures/de/p3c2-sfc.svg)

## createApp und mount

Das Modul `src/main.js` verbindet die Komponente mit der Seite.

::code{file="exercises/03-vue/first-project/{lang}/src/main.js"}

`createApp(App)` erzeugt eine App, deren oberste Komponente `App` ist. `mount('#app')` sucht in der Seite das Element mit der id `app` und ersetzt seinen Inhalt durch das, was die Komponente rendert. Ab dann hält Vue die Seite im Takt mit dem Zustand. Zwischen den beiden Aufrufen lässt sich die App einrichten, in Teil 6 kommt dort zum Beispiel der Router dazu. Der Import der CSS-Datei bringt die Regeln, die für die ganze App gelten.

## Komponenten einbinden

Eine Komponente kann andere Komponenten verwenden. Dafür importierst du die Datei im Script, und schon steht die Komponente im Template als eigenes Tag bereit. Im Beispiel bindet `App.vue` die Öffnungszeiten ein.

::playground{dir="examples/03-vue/scoped-style"}

Beide Komponenten haben eine Überschrift `h2`, aber nur die in `OpeningHours.vue` ist rot. Bei `scoped` hängt Vue beim Übersetzen an jedes Element der Komponente ein Attribut wie `data-v-7ba5bd90` und an jeden Selektor im Style dasselbe Attribut. Die Regel trifft darum nur Elemente dieser Komponente.

In einem Projekt von create-vue liegen Komponenten im Ordner `src/components`. Statt eines Pfads wie `../components/OpeningHours.vue` schreibst du `@/components/OpeningHours.vue`. Der Alias `@` zeigt immer auf `src`, egal in welchem Ordner die Datei liegt, die importiert. Komponenten bekommen Namen aus mehreren Wörtern in PascalCase, etwa `OpeningHours`, damit sie sich nicht mit HTML-Elementen verwechseln lassen. Einzig `App` ist davon ausgenommen.

## Die Vue DevTools

Solange `npm run dev` läuft, zeigt die Seite unten in der Mitte eine kleine Leiste mit zwei Knöpfen. Der Knopf mit dem Logo von Vue öffnet die DevTools direkt in der Seite. Unter «Components» siehst du den Baum der Komponenten, und rechts daneben den Zustand der gewählten Komponente. Werte lassen sich dort auch ändern, die Seite folgt sofort. Der Knopf mit dem Fadenkreuz schaltet den Inspektor ein. Fährst du dann über die Seite, zeigt er, zu welcher Komponente ein Element gehört, und ein Klick öffnet die Datei im Editor.

Die DevTools stammen aus dem Plugin `vite-plugin-vue-devtools` und laufen nur während der Entwicklung, im Build fehlen sie. Für Chromium-Browser und Firefox gibt es zusätzlich die Erweiterung «Vue.js devtools», die in den Entwicklertools des Browsers einen eigenen Reiter für Vue einrichtet.

## Linting

Ein Linter liest den Code, ohne ihn auszuführen, und meldet Fehler und verdächtige Stellen. Mit der Antwort «Linter» richtet create-vue zwei davon ein, das schnelle Oxlint und ESLint mit den Regeln für Vue. `npm run lint` startet beide nacheinander und lässt sie alles korrigieren, was sich automatisch korrigieren lässt. Was übrig bleibt, melden sie mit Datei, Zeile und Regel, etwa so.

```text
src/components/ItemList.vue
   5:7  error  'unused' is assigned a value but never used                   no-unused-vars
  10:5  error  Elements in iteration expect to have 'v-bind:key' directives  vue/require-v-for-key
```

Die erste Meldung betrifft eine Variable, die nirgends verwendet wird. Die zweite gilt einer Liste ohne `key`, das nächste Kapitel erklärt, warum Vue diesen Schlüssel braucht. In VS Code zeigt die Erweiterung «ESLint» dieselben Meldungen schon beim Tippen, und «Vue (Official)» bringt Farben, Vervollständigung und Prüfungen für Dateien `.vue`. Die Übungsprojekte des Kurses verzichten auf den Linter, damit die Installation klein bleibt. In deinem eigenen Projekt lohnt er sich.

## Im Code

Arbeite mit dem Beispiel zu den Öffnungszeiten. Lies zuerst beide Dateien und schreib auf, was du erwartest, bevor du etwas änderst.

1. Welche Farbe hat die Überschrift «Katalog», wenn du in `OpeningHours.vue` das Wort `scoped` entfernst? Probiere es im Playground aus.
2. Setz `scoped` wieder ein und ergänze in `App.vue` einen Block `<style>` mit `h2 { color: blue; }`. Welche Überschrift wird blau, und warum bleibt die andere rot?
3. Ändere den Import in `App.vue` auf `import Hours from './OpeningHours.vue'`. Was musst du im Template anpassen?
4. Öffne in deinem Projekt von create-vue die DevTools und klappe im Baum die Komponente `TheWelcome` auf. Wie viele Komponenten `WelcomeItem` stecken darin, und wo stehen sie in `TheWelcome.vue`?

## Aufgaben

Die Aufgaben bauen auf einem Projekt mit der Struktur von create-vue auf. Du findest es im Kursrepo im Ordner `exercises/03-vue/first-project/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

Mit `npm run dev` siehst du die App und die DevTools im Browser. Zu Beginn schlagen alle Tests fehl, das ist so gewollt.

::::exercise[Einstieg]
Ersetze in `src/App.vue` das Beispiel durch den Anfang des Katalogs. Die Hauptüberschrift lautet «Lorraine Commons», darunter steht die Zahl der Dinge, etwa «60 Dinge im Katalog». Die Daten importierst du mit `import items from '../data/items.json'`, die Zahl ist `items.length`.

:::solution[Lösung]
Im Script steht der Import der Daten, `import items from '../data/items.json'`. Das Template zeigt Name und Zahl.

::code{file="exercises/03-vue/first-project/solution/{lang}/src/App.vue" lines="11-15"}

Vite lädt die Datei JSON beim Import als gewöhnliches Array. `{{ items.length }}` steht im Template, damit die Zahl aus den Daten kommt und sich anpasst, wenn der Katalog wächst.
:::
::::

::::exercise[Vertiefung]
Lege die Komponente `src/components/OpeningHours.vue` an. Sie zeigt die Überschrift «Öffnungszeiten» und darunter «Mittwoch 17 bis 19 Uhr» und «Samstag 10 bis 13 Uhr». Gib ihr einen eigenen Style mit `scoped` und binde sie in `App.vue` mit dem Alias `@` ein.

:::solution[Lösung]
::code{file="exercises/03-vue/first-project/solution/{lang}/src/components/OpeningHours.vue"}

In `App.vue` kommt der Import `import OpeningHours from '@/components/OpeningHours.vue'` dazu, und im Template steht `<OpeningHours />`. Eine Komponente ohne Script braucht keinen Block `<script setup>`.
:::
::::

::::exercise[Knobelei]
Ergänze in `App.vue` eine Fusszeile `footer`, die die Version von Vue und den Modus nennt, in dem Vite die App ausführt, etwa «Gebaut mit Vue 3.5.44, Modus development». Die Version liefert `import { version } from 'vue'`, den Modus kennst du aus dem Kapitel «Werkzeuge». Was zeigt die Fusszeile nach `npm run build` und `npm run preview`, und was in den Tests?

:::solution[Lösung]
::code{file="exercises/03-vue/first-project/solution/{lang}/src/App.vue"}

`import.meta.env.MODE` ist bei `npm run dev` gleich `development`, im Build `production` und in den Tests `test`. Vite setzt den Wert beim Übersetzen ein, darum steht im Build fest «production». Die Konstante `mode` braucht es, weil das Template nur auf Werte aus dem Script zugreift und `import.meta` dort nicht kennt.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Bei «Use TypeScript?» aus Versehen Yes gewählt, im Projekt stehen Dateien `.ts`. | Das Projekt neu anlegen und No wählen. Der Kurs verwendet JavaScript. |
| `index.html` direkt im Browser geöffnet, die Seite bleibt leer. | Die App mit `npm run dev` starten. Der Browser kann Dateien `.vue` nicht selbst lesen. |
| In der Konsole steht `Failed to resolve component: OpeningHours`. | Die Komponente im Script importieren und den Namen im Template genau gleich schreiben. |
| VS Code färbt Dateien `.vue` falsch ein oder meldet seltsame Fehler. | Die Erweiterung «Vue (Official)» installieren und die ältere Erweiterung Vetur deaktivieren. |
| Ein KI-Assistent schlägt `vue create` vor. | Das ist die Vue CLI, die nur noch gewartet wird. Neue Projekte entstehen mit `npm create vue@latest`. |
| Ein KI-Assistent schreibt `new Vue({ el: '#app' })` oder verlangt ein einziges Wurzelelement im Template. | Beides stammt aus Vue 2. In Vue 3 startet `createApp(App).mount('#app')` die App, und ein Template darf mehrere Wurzeln haben. |

## Selbstcheck

::::selfcheck
1. Wie beantwortest du die Fragen von create-vue für den Kurs, und warum?
2. Welche Aufgabe haben `index.html`, `src/main.js` und `src/App.vue`?
3. Was bewirkt `scoped` im Block `<style>`?
4. Wofür steht `@` in einem Import, und wo ist das festgelegt?

:::solution[Antworten]
1. TypeScript No, weil der Kurs JavaScript verwendet, bei den Funktionen nur «Linter», weil Router, Pinia und Vitest später kommen, und das Beispiel behalten, um es anzusehen.
2. `index.html` ist die einzige Seite und enthält das Element `#app`. `main.js` erzeugt die App mit `createApp` und hängt sie mit `mount` dort ein. `App.vue` ist die oberste Komponente.
3. Die Regeln gelten nur für die Elemente dieser Komponente. Vue hängt dafür beim Übersetzen ein Attribut `data-v-` an die Elemente und an die Selektoren.
4. Für den Ordner `src`. Festgelegt ist das in `vite.config.js` unter `resolve.alias`, und `jsconfig.json` sagt es dem Editor.
:::
::::

:::assignment
Die Startseite steht, und der Freiwillige findet sich in den Dateien zurecht. Martina Hostettler möchte als Nächstes den Katalog sehen. «Zeig alle Dinge mit Kategorie und ob sie gerade da sind, wie in der Version von Hand.» Darum geht es im nächsten Kapitel.
:::
