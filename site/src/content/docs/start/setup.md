---
title: Einrichten
description: Node.js, npm, ein Editor mit der Vue-Erweiterung, Git und GitHub, die DevTools des Browsers und ein kleines Projekt, das prüft, ob alles bereit ist.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler schreibt, dass ein Vereinsmitglied, das als Informatiker arbeitet, gern einmal auf den Code schauen würde. «Er fragt, mit welchen Werkzeugen du arbeitest und ob er das Projekt bei sich starten kann.»
:::

:::goals
Nach diesem Kapitel kannst du

- Node.js und npm installieren und ihre Versionen prüfen,
- einen Editor mit der Erweiterung für Vue einrichten,
- Git konfigurieren und das Kursrepo herunterladen,
- die DevTools des Browsers öffnen und die Konsole lesen,
- ein Übungsprojekt installieren, starten und seine Tests ausführen.
:::

## Werkzeuge für den Kurs

Für den Kurs brauchst du einen Laptop mit Windows, macOS oder Linux und Internet. Installieren wirst du diese Werkzeuge:

1. Node.js mit npm, um JavaScript ausserhalb des Browsers auszuführen und Pakete zu installieren
2. einen Editor, empfohlen ist Visual Studio Code mit der Erweiterung «Vue (Official)»
3. Git und ein Konto auf GitHub, spätestens für dein Projekt
4. einen aktuellen Browser wie Firefox, Chrome oder Edge

## Node.js und npm

Node.js führt JavaScript ausserhalb des Browsers aus. Vite, die Tests und viele andere Werkzeuge des Kurses laufen damit. npm, der Paketmanager von Node.js, wird automatisch mitinstalliert.

Lade auf [nodejs.org](https://nodejs.org/) die LTS-Version herunter. LTS steht für «Long Term Support», diese Versionen bekommen über lange Zeit Fehlerkorrekturen. Unter Windows geht es auch im Terminal mit `winget install OpenJS.NodeJS.LTS`. Öffne danach ein neues Terminal und prüfe die Versionen.

```bash
node --version
npm --version
```

Node.js muss mindestens Version 22 haben. Ein älteres Node.js reicht für die Werkzeuge des Kurses nicht mehr.

## Ein Editor für Vue

Visual Studio Code ist kostenlos und für Vue gut ausgerüstet. Installiere darin die Erweiterung «Vue (Official)». Sie färbt den Code in Vue-Dateien ein, ergänzt Namen und zeigt Fehler, während du tippst. Ältere Anleitungen nennen dafür die Erweiterung «Volar», das war ihr früherer Name. WebStorm unterstützt Vue ebenfalls, Studierende bekommen die Produkte von JetBrains kostenlos.

## Git und GitHub

Git verwaltet die Versionen deines Codes. Installiere es von [git-scm.com](https://git-scm.com/) oder mit `winget install Git.Git` und setze deinen Namen und deine E-Mail-Adresse.

```bash
git config --global user.name "Vorname Nachname"
git config --global user.email "name@example.com"
```

Für das Projekt brauchst du ein Konto auf [GitHub](https://github.com/). Das Kursrepo lädst du mit Git herunter, die Übungsprojekte liegen darin im Ordner `exercises`.

```bash
git clone https://github.com/ndum/web2.git
```

## Die DevTools des Browsers

Jeder aktuelle Browser hat Entwicklerwerkzeuge eingebaut, du öffnest sie mit F12. Für den Kurs brauchst du vor allem drei Bereiche. Die Konsole zeigt Ausgaben und Fehlermeldungen von JavaScript. Unter «Elemente» oder «Inspektor» siehst du das HTML, das gerade angezeigt wird. Der Bereich «Netzwerk» listet jede Anfrage an einen Server. Für Vue gibt es zusätzlich die Vue DevTools, die du in Teil 3 kennenlernst.

## Das Setup-Projekt

Ob alles bereit ist, prüfst du mit einem kleinen Projekt im Kursrepo. Wechsle in den Ordner `exercises/00-start/setup/de`, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

`npm install` lädt die Pakete aus der Datei `package.json` in den Ordner `node_modules`. `npm test` führt zwei Tests aus. Der erste prüft die Version von Node.js, der zweite, ob die Startseite der App erscheint. Wenn beide grün sind, startest du die App.

```bash
npm run dev
```

Vite zeigt eine Adresse an, meist `http://localhost:5173/`. Öffne sie im Browser, dort steht «Alles bereit» und die Version von Vue. Beenden kannst du den Server im Terminal mit Ctrl+C.

## Aufgaben und Tests

Die Übungsprojekte der Kapitel funktionieren wie das Setup-Projekt. Für jede Stufe gibt es im Ordner `tests` eine eigene Datei, `level-1.test.js` für den Einstieg, `level-2.test.js` für die Vertiefung und `level-3.test.js` für die Knobelei. `npm test` führt alle aus und zeigt für jeden Test ein Häkchen oder ein Kreuz. Bei einem Kreuz steht darunter, was erwartet wurde und was herauskam.

Willst du nur eine Stufe prüfen, gibst du die Datei an, zum Beispiel `npx vitest run tests/level-1.test.js`. Mit `npx vitest` laufen die Tests bei jeder gespeicherten Änderung von selbst neu.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Das Terminal kennt `node` nach der Installation nicht. | Das Terminal schliessen und neu öffnen, damit es den neuen Pfad kennt. |
| `npm install` bricht mit einem Fehler zum Netzwerk ab. | Ein anderes Netz versuchen, etwa den Hotspot des Handys. `npm config get proxy` zeigt, ob npm einen Proxy verwendet. |
| PowerShell meldet, dass `npm.ps1` nicht geladen werden kann, weil Skripte deaktiviert sind. | `npm.cmd` statt `npm` eintippen oder die Eingabeaufforderung oder Git Bash verwenden. Dort laufen die Befehle gleich. |
| Die App läuft unter Port 5174 statt 5173. | Ein anderes Projekt belegt den Port noch, und Vite hat den nächsten freien genommen. Das alte Projekt im anderen Terminal mit Ctrl+C beenden. |
| Ein KI-Assistent empfiehlt die Vue CLI mit `vue create`. | Die Vue CLI wird nicht mehr weiterentwickelt. Neue Projekte entstehen mit `npm create vue@latest`, wie in Teil 3. |

## Aufgaben

::::exercise[Einstieg]
Installiere das Setup-Projekt und führe die Tests aus, bis beide grün sind. Notiere dir die Versionen von Node.js und npm.

:::solution[Lösung]
`node --version` gibt eine Version aus, die mit `v` beginnt und deren erste Zahl mindestens 22 ist. `npm --version` gibt die Version von npm aus. `npm test` zeigt zwei grüne Tests. Schlägt der Test zur Version fehl, ist ein zu altes Node.js installiert.
:::
::::

::::exercise[Vertiefung]
Starte das Projekt mit `npm run dev` und ändere in `src/App.vue` den Text «Alles bereit». Beobachte den Browser, während du speicherst.

:::solution[Lösung]
Der Browser zeigt den neuen Text, ohne dass du die Seite neu lädst. Vite tauscht beim Speichern nur das geänderte Modul aus, das heisst Hot Module Replacement. Mehr dazu kommt in Teil 2.
:::
::::

::::exercise[Knobelei]
Ändere in `src/App.vue` den Namen «Lorraine Commons» und führe `npm test` aus. Lies die Meldung des fehlgeschlagenen Tests und finde heraus, was der Test erwartet hat.

:::solution[Lösung]
Der Test «zeigt die Startseite» schlägt fehl. Die Meldung zeigt den Text, den die App jetzt anzeigt, und den Teil, der darin fehlt, nämlich «Lorraine Commons». So liest du künftig jede fehlgeschlagene Aufgabe. Danach stellst du den Namen wieder her.
:::
::::

## Selbstcheck

::::selfcheck
1. Wozu brauchst du Node.js, obwohl die App am Ende im Browser läuft?
2. Was macht `npm install`, und wohin kommen die Pakete?
3. In welchem Bereich der DevTools siehst du Fehlermeldungen von JavaScript?
4. Wie prüfst du nur die Aufgabe «Einstieg» eines Übungsprojekts?

:::solution[Antworten]
1. Die Werkzeuge der Entwicklung laufen mit Node.js, etwa Vite, die Tests und npm. Im Browser läuft später nur das Ergebnis.
2. `npm install` lädt die Pakete, die in `package.json` stehen, in den Ordner `node_modules` des Projekts.
3. In der Konsole.
4. Mit `npx vitest run tests/level-1.test.js`.
:::
::::

:::assignment
«Der Laptop läuft? Dann schauen wir, wo du mit JavaScript stehst», schreibt Martina Hostettler. Der [Einstiegstest](../entry-test/) zeigt dir, welche Grundlagen du auffrischen solltest, bevor es mit Teil 1 losgeht.
:::
