---
title: Build und Deployment
description: Der Build einer SPA, der Basispfad und eine Rückfallseite für GitHub Pages, Umgebungsvariablen und Modi von Vite, eine Attrappe der API für eine Demo und ein Workflow von GitHub Actions, der testet, baut und veröffentlicht.
sidebar:
  order: 6
---

:::assignment
Martina Hostettler will die App an der Mitgliederversammlung zeigen, und die Mitglieder sollen sie danach selbst ausprobieren können.

> Als Vorstand möchte ich die App unter einer festen Adresse öffentlich zeigen, damit die Mitglieder sie an der Versammlung und danach ausprobieren können.

Einen Server hat der Verein noch nicht. Der Freiwillige will ausserdem, dass keine Änderung online geht, deren Tests scheitern. Die Akzeptanzkriterien lauten:

1. Die App ist unter einer festen Adresse öffentlich erreichbar.
2. Sie läuft ohne Kurs-API, mit Daten zum Ausprobieren.
3. Jede Änderung auf `main` geht nach bestandenen Tests von selbst online.
:::

:::goals
Nach diesem Kapitel kannst du

- den Build einer SPA und seine Ausgabe erklären,
- den Basispfad und eine Rückfallseite für GitHub Pages einrichten,
- Umgebungsvariablen und Modi von Vite einsetzen,
- eine Attrappe der API für eine Demo verwenden,
- einen Workflow von GitHub Actions schreiben, der testet, baut und veröffentlicht.
:::

## Der Build

`npm run build` macht aus den Quellen den Ordner `dist` mit `index.html` und den Dateien in `assets`, deren Namen einen Hash tragen, wie in Kapitel 2.3. In der Fallbeispiel-App liegt der Bereich des Teams in eigenen Dateien, die erst laden, wenn jemand ihn öffnet. `npm run preview` zeigt den Build lokal. Laut [Vite-Dokumentation](https://vite.dev/guide/static-deploy.html) dient das nur zum Prüfen und ist kein Server für den Betrieb. Ausgeliefert wird `dist` von einem Host für statische Seiten.

## Der Basispfad

Eine Projektseite auf GitHub Pages liegt unter `https://name.github.io/repo/`, also in einem Unterordner. Vite setzt dafür laut Dokumentation `base` auf `/repo/`, und der Router übernimmt den Pfad mit `import.meta.env.BASE_URL`, wie Kapitel 6.1 gezeigt hat. Statt in `vite.config.js` lässt sich der Pfad auch beim Bauen mit `vite build --base /repo/` angeben.

## Eine Rückfallseite für GitHub Pages

GitHub Pages kennt nur die Dateien in `dist`. Ruft jemand `/repo/items/6` direkt auf, gibt es keine solche Datei. Laut [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site) zeigt Pages dann die Datei `404.html`, wenn ein Projekt eine hat. Ist sie eine Kopie von `index.html`, startet dort die App, und der Router zeigt die Seite der Adresse. Ein kleines Plugin für Vite legt die Kopie bei jedem Build an.

::code{file="exercises/08-architecture/deployment/solution/{lang}/vite.config.js" lines="9-28"}

Andere Anbieter wie Netlify oder Vercel leiten mit eigenen Regeln jede Adresse auf `index.html`, ihre Dokumentation beschreibt sie.

## Umgebungsvariablen und Modi

Laut [Vite-Dokumentation](https://vite.dev/guide/env-and-mode.html) liest Vite Variablen aus `.env`, aus `.env.local` und aus einer Datei für den Modus, etwa `.env.demo`. Die Datei des Modus geht den allgemeinen Dateien vor, und Variablen, die beim Start schon in der Shell stehen, gehen allen Dateien vor. `npm run dev` läuft im Modus `development`, `npm run build` im Modus `production`, und `--mode demo` wählt einen eigenen. In den Code im Browser gelangen nur Variablen, die mit `VITE_` beginnen, und sie stehen danach lesbar in den gebauten Dateien. Ein Schlüssel für eine API oder ein Passwort gehört darum nie in eine solche Variable.

## Eine Attrappe der API für die Demo

Die Demo der Fallbeispiel-App läuft im Modus `demo`. Seine Datei stellt zwei Variablen ein.

::code{file="case/08-architecture/{lang}/.env.demo"}

`VITE_API=memory` gibt den Stores die Attrappe der API aus Kapitel 8.2, die Katalog, Anmeldung und Anfragen im Speicher des Browsers hält. `VITE_HISTORY=hash` lässt den Router den Pfad hinter `#` führen.

::code{file="case/08-architecture/{lang}/src/router/index.js" lines="13-18"}

Der Grund für den Hash-Modus ist der Ort der Demo. Sie liegt in einem Ordner der Kursseite, und eine Site auf GitHub Pages hat nur eine `404.html`, die hier dem Kurs gehört. Mit dem Hash fragt der Browser den Server nur nach dem Ordner der Demo, und jede Adresse funktioniert auch beim Neuladen. Die Demo teilt sich ausserdem die Origin mit der Kursseite und damit den Speicher des Browsers. Favoriten aus den Beispielen von Kapitel 7.4 erscheinen darum auch in der Demo. Dasselbe gilt für alle Projektseiten eines Kontos auf GitHub Pages, die unter derselben Adresse `name.github.io` liegen. Schlüssel im `localStorage` brauchen darum einen Namen, der zur App gehört.

Eine andere Art von Attrappe fängt Anfragen im Netz ab statt im Code. [Mock Service Worker](https://mswjs.io/) installiert dafür einen Service Worker, und die App ruft weiter `fetch` auf. Die Fallbeispiel-App braucht das nicht, weil ihre Stores die API schon über einen Adapter bekommen.

## Ein Workflow von GitHub Actions

Ein Workflow beschreibt in einer Datei unter `.github/workflows`, was GitHub nach einem Ereignis wie einem Push tun soll. Das Beispiel der Vite-Dokumentation und die [GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) verwenden dafür die Aktionen `configure-pages`, `upload-pages-artifact` und `deploy-pages`.

![Ein Ablauf von oben nach unten. Ein Push auf main startet einen Workflow von GitHub Actions, der die Pakete mit npm ci installiert, die Tests mit npm test ausführt und mit npm run build baut. Schlägt ein Test fehl, endet der Workflow, und nichts geht online. Der Ordner dist geht als Artefakt an GitHub Pages, das die App unter name.github.io/lorraine-commons/ ausliefert. Rechts zweigt eine Adresse ab, die GitHub Pages nicht kennt, etwa /lorraine-commons/items/6. Dafür liefert Pages die Datei 404.html, eine Kopie von index.html, und der Router zeigt die Seite des Dings.](../../../assets/figures/de/p8c6-deploy-flow.svg)

::code{file="exercises/08-architecture/deployment/solution/{lang}/.github/workflows/deploy.yml"}

Der Job `build` testet und baut, der Job `deploy` veröffentlicht erst danach. Scheitert ein Test, endet `build`, und `deploy` startet nicht. Damit der Workflow veröffentlichen darf, braucht er die Rechte `pages: write` und `id-token: write`, und unter «Settings» und «Pages» steht als Quelle «GitHub Actions». Die Aktionen sind hier wie im Kursrepo auf einen Commit festgelegt, der Kommentar nennt die Version. Laut GitHub Docs ist eine Seite auf Pages öffentlich, auch wenn das Repository privat ist.

## Die Demo des Kurses

Die Kursseite veröffentlicht die Demo selbst. Das Skript `scripts/build_demo.mjs` im Kursrepo baut die Fallbeispiel-App im Modus `demo` in beiden Sprachen in den Ordner der Kursseite, und der Workflow des Kurses veröffentlicht sie zusammen mit den Seiten. Die [Demo der Fallbeispiel-App](../../demo/de/) läuft ohne Server, Anmeldung und Anfragen bleiben bis zum Schliessen des Tabs erhalten.

## In deinem Projekt

Der Mindestumfang verlangt ein öffentliches Deployment. Setz den Basispfad, lege `404.html` an, wenn deine App den History-Modus verwendet, und schreib den Workflow, sobald die erste Seite steht, nicht erst vor der Abgabe. Beschreib im README, wie die App gebaut und veröffentlicht wird, und leg für jede Umgebungsvariable eine Zeile in `.env.example` an, ohne Geheimnisse.

## Im Code

Arbeite mit der Fallbeispiel-App im Kursrepo im Ordner `case/08-architecture/de`. Schreib auf, was du erwartest, bevor du etwas ausführst.

1. Bau die App mit `npm run build` und öffne `dist/index.html`. Mit welchem Pfad beginnen die Verweise auf die Dateien?
2. Bau sie noch einmal mit `npx vite build --base /lorraine-commons/`. Was ändert sich in `dist/index.html`?
3. Starte die Demo mit `npm run demo` und öffne ein Ding. Wie sieht die Adresse aus, und warum?
4. Schreib `VITE_API=memory` in eine Datei `.env.local` und starte `npm run dev`. Was ändert sich, was bleibt gleich? Lösch die Datei danach wieder.

## Aufgaben

Die Aufgaben machen eine kleine App mit Router bereit für GitHub Pages. Du findest das Projekt im Kursrepo im Ordner `exercises/08-architecture/deployment/de`. Die Tests der ersten beiden Stufen bauen das Projekt in einen temporären Ordner, das dauert ein paar Sekunden.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Die App soll unter `https://name.github.io/lorraine-commons/` laufen. Setz in `vite.config.js` den Basispfad und prüf nach `npm run build` die Pfade in `dist/index.html`.

:::solution[Lösung]
::code{file="exercises/08-architecture/deployment/solution/{lang}/vite.config.js" lines="25-28"}

Der Router liest den Pfad mit `import.meta.env.BASE_URL` und braucht keine eigene Änderung.
:::
::::

::::exercise[Vertiefung]
Ein direkter Link auf `/lorraine-commons/items/6` landet auf der Seite für Fehler von GitHub Pages. Schreib in `vite.config.js` ein Plugin, das nach jedem Build `dist/index.html` nach `dist/404.html` kopiert.

:::solution[Lösung]
::code{file="exercises/08-architecture/deployment/solution/{lang}/vite.config.js" lines="9-23"}

`apply: 'build'` beschränkt das Plugin auf den Build. `configResolved` merkt sich den Ordner der Ausgabe, auch wenn jemand ihn mit `--outDir` ändert.
:::
::::

::::exercise[Knobelei]
Schreib den Workflow `.github/workflows/deploy.yml`. Er startet bei jedem Push auf `main`, installiert mit `npm ci`, testet mit `npm test`, baut mit `npm run build`, lädt `dist` hoch und veröffentlicht in einem eigenen Job auf GitHub Pages.

:::solution[Lösung]
Die Lösung steht oben im Abschnitt über den Workflow. Er läuft erst, wenn das Projekt in einem eigenen Repository auf GitHub liegt und unter «Settings» und «Pages» die Quelle «GitHub Actions» gewählt ist.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Die veröffentlichte App zeigt eine leere Seite. | `base` fehlt oder passt nicht zum Namen des Repositorys. |
| Ein direkter Link auf eine Seite zeigt die Fehlerseite von GitHub Pages. | `404.html` als Kopie von `index.html` mitliefern. |
| Ein Schlüssel für eine API steht in einer Variable mit `VITE_`. | Alles mit `VITE_` landet lesbar im Code des Browsers. Geheimnisse gehören auf einen Server. |
| Der Workflow veröffentlicht, obwohl Tests scheitern. | `npm test` vor dem Build und das Veröffentlichen in einem Job, der auf den Build wartet. |
| Der Workflow scheitert, weil Rechte fehlen. | `pages: write` und `id-token: write` setzen und als Quelle von Pages «GitHub Actions» wählen. |
| Ein KI-Assistent schlägt Vue CLI oder `vite preview` als Server für die Veröffentlichung vor. | Vue CLI ist laut seiner [Dokumentation](https://cli.vuejs.org/) im Wartungsmodus, und `vite preview` ist kein Server für den Betrieb. Gebaut wird mit `vite build`, ausgeliefert von einem Host für statische Seiten. |

## Selbstcheck

::::selfcheck
1. Warum braucht eine Projektseite auf GitHub Pages einen Basispfad?
2. Wozu dient `404.html`, und warum genügt eine Kopie von `index.html`?
3. Welche Datei liest `vite build --mode demo`, und welche Variablen gelangen in den Browser?
4. Warum veröffentlicht der Workflow nichts, wenn ein Test scheitert?

:::solution[Antworten]
1. Sie liegt in einem Unterordner. Ohne Basispfad sucht der Browser die Dateien der App ab der Wurzel der Domain.
2. Pages zeigt sie für jede unbekannte Adresse. Als Kopie von `index.html` startet dort die App, und der Router zeigt die Seite der Adresse.
3. `.env.demo`, dazu `.env` und `.env.local`. In den Browser gelangen nur Variablen, die mit `VITE_` beginnen.
4. Die Tests laufen im Job `build`. Scheitert einer, endet der Job, und der Job `deploy` wartet vergeblich auf ihn.
:::
::::

:::assignment
Die Demo läuft an der Mitgliederversammlung, und Mitglieder probieren sie danach zu Hause aus. Die neue Freiwillige hat inzwischen einen KI-Assistenten um eine Liste der überfälligen Ausleihen für das Team gebeten. Der Code sieht vernünftig aus, die Listen bleiben aber leer, und die Konsole meldet Fehler. Das nächste Kapitel zeigt, wie du solchen Code prüfst.
:::
