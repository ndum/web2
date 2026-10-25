---
title: Persistenz
description: localStorage und sessionStorage, Werte als JSON, Favoriten in mehreren Tabs mit dem Event storage, ein Entwurf pro Tab, was nie in den Speicher des Browsers gehört, und die Anmeldung, die eine Sitzung lang hält.
sidebar:
  order: 4
---

:::assignment
Drei Rückmeldungen erreichen Martina Hostettler.

> Als Mitglied möchte ich meine Favoriten in jedem Tab sehen, damit ich nicht nachdenken muss, wo ich sie markiert habe.

> Als Freiwillige oder Freiwilliger am Tresen möchte ich nach dem Neuladen angemeldet bleiben, aber nicht über Nacht, damit am nächsten Tag niemand mit meiner Anmeldung arbeitet.

> Als Mitglied möchte ich eine angefangene Anfrage wiederfinden, wenn ich kurz im Katalog nachschaue, damit ich nicht alles noch einmal eingeben muss.

Die Akzeptanzkriterien lauten:

1. Favoriten überstehen ein Neuladen und sind in allen Tabs dieselben.
2. Die Anmeldung übersteht ein Neuladen und endet, wenn der Browser schliesst.
3. Eine angefangene Anfrage bleibt in ihrem Tab erhalten, auch nach dem Neuladen.
:::

:::goals
Nach diesem Kapitel kannst du

- `localStorage` und `sessionStorage` unterscheiden und Werte als JSON speichern,
- einen Store mit dem Speicher des Browsers verbinden,
- mehrere Tabs mit dem Event `storage` abgleichen,
- begründen, was nie in den Speicher des Browsers gehört,
- eine Anmeldung nach dem Neuladen beim Server erfragen.
:::

## Speicher im Browser

Ein Store lebt im Speicher der Seite und ist nach dem Neuladen leer. Für Werte, die länger halten sollen, hat der Browser die Web Storage API mit zwei Speichern. Laut [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) teilen sich alle Tabs einer Origin denselben `localStorage`, und er bleibt auch, wenn der Browser schliesst. `sessionStorage` gehört dagegen zu einem Tab, übersteht das Neuladen und endet, wenn der Tab schliesst. Beide speichern nur Text, darum gehen Listen und Objekte mit `JSON.stringify` hinein und mit `JSON.parse` wieder heraus.

Kapitel 5.2 hat den Suchtext im `localStorage` gespeichert und Kapitel 5.4 dafür das Composable `useLocalStorage` gebaut. Seit Teil 6 steht der Filter in der Adresse, im Speicher des Browsers bleiben die Favoriten.

## Favoriten im localStorage

Ein Setup Store liest beim Anlegen, was im Speicher steht, und schreibt jede Änderung zurück. Weil ein Eintrag beschädigt sein oder von einer anderen Version der App stammen kann, prüft er, ob eine Liste herauskommt.

::playground{dir="examples/07-state/local-storage"}

Die Fallbeispiel-App verwendet im Store das Composable `useLocalStorage` aus Kapitel 5.4. Ein Setup Store kann Composables nutzen wie eine Komponente.

::code{file="case/07-state/{lang}/src/stores/favorites.js"}

## Mehrere Tabs

Ändert ein Tab einen Eintrag im `localStorage`, löst der Browser in den anderen Tabs derselben Origin das Event `storage` aus. Der Tab, der die Änderung macht, bekommt es laut MDN nicht. Das Event nennt den Schlüssel und den neuen Wert, und der Store liest ihn neu.

::playground{dir="examples/07-state/storage-event"}

Beide Beispiele dieser Seite laufen in derselben Origin und teilen sich darum den Speicher. Markierst du im ersten Beispiel einen Favoriten, folgt das zweite, denn es hört auf das Event. Das erste Beispiel folgt dem zweiten erst nach einem Neustart.

## Ein Entwurf pro Tab

Ein angefangenes Formular gehört in den `sessionStorage`. Es übersteht das Neuladen, bleibt aber im Tab, in dem jemand es angefangen hat, und verschwindet, wenn der Tab schliesst.

::playground{dir="examples/07-state/session-draft"}

Ein leeres Formular löscht den Entwurf, und nach dem Senden ist das Formular leer. In der Fallbeispiel-App ersetzt der Entwurf die Rückfrage beim Verlassen aus Kapitel 6.4, denn wer die Seite verlässt, findet die Eingaben bei der Rückkehr wieder.

## Nichts Geheimes im Speicher

Was im Speicher des Browsers steht, kann jedes Skript der Seite lesen. Das [HTML5 Security Cheat Sheet von OWASP](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) warnt, dass eine einzige Lücke für Cross-Site Scripting alle Daten dieser Speicher stehlen kann. Es rät, keine sensiblen Daten und keine Kennungen von Sitzungen darin abzulegen. Passwörter, Schlüssel für APIs und Kennungen von Sitzungen gehören darum nie hinein, auch nicht in den `sessionStorage`.

Die Kurs-API hält die Anmeldung deshalb in einem Cookie mit `HttpOnly`. Laut [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) kann JavaScript ein solches Cookie nicht lesen, `fetch` schickt es aber mit. Ohne Ablaufdatum ist es ein Cookie für eine Sitzung, das endet, wenn der Browser schliesst. Viele Browser stellen Tabs beim nächsten Start wieder her und solche Cookies mit ihnen. `SameSite=Strict` schickt das Cookie nur bei Anfragen von derselben Website mit.

![Vier Balken über sechs Ereignisse, Seite laden, neu laden, zweiter Tab, Tab schliessen, Browser schliessen und Browser öffnen. Ein Store im Speicher reicht bis zum Neuladen. sessionStorage bleibt beim Neuladen, gehört nur zu diesem Tab und endet, wenn er sich schliesst. Ein Cookie ohne Ablauf gilt für alle Tabs und endet, wenn der Browser schliesst. localStorage gilt für alle Tabs und ist nach dem nächsten Öffnen noch da.](../../../assets/figures/de/p7c4-storage-lifetime.svg)

## Die Anmeldung nach dem Neuladen

Nach dem Neuladen ist der Store der Anmeldung leer, das Cookie aber noch da. Die App fragt darum beim Start die Kurs-API mit `GET /session`, wer angemeldet ist. Die Action merkt sich ihr Promise, so fragt sie nur einmal, auch wenn App und Guard sie beide aufrufen.

::code{file="case/07-state/{lang}/src/stores/auth.js" lines="12-19"}

Der Guard für den Bereich des Teams wartet auf diese Antwort. Sonst schickte er ein angemeldetes Teammitglied nach dem Neuladen von `/team` auf die Anmeldung, weil der Store die Antwort noch nicht kennt.

::code{file="case/07-state/{lang}/src/router/index.js" lines="48-56"}

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Markiere im ersten Beispiel zwei Favoriten und ändere danach etwas im Code, damit die Vorschau neu startet. Was bleibt?
2. Öffne diese Seite in einem zweiten Tab und markiere dort einen Favoriten. Was zeigen die Beispiele im ersten Tab?
3. Tipp im Beispiel mit dem Entwurf eine Notiz, starte die Vorschau neu und öffne die Seite danach in einem neuen Tab. Wo steht die Notiz?
4. Schreib im ersten Beispiel in den Entwicklertools unter «Application» den Wert `{` in den Eintrag `lorraine-commons-favorites` und starte die Vorschau neu. Was zeigt die Seite?

## Aufgaben

Die Aufgaben bauen die drei Wünsche für Favoriten und Formular. Die Anmeldung zeigt die Fallbeispiel-App. Du findest das Projekt im Kursrepo im Ordner `exercises/07-state/persistence/de`. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Der Store `favorites` vergisst die Favoriten beim Neuladen. Lies sie beim Anlegen aus dem `localStorage` unter dem Schlüssel `lorraine-commons-favorites` und schreib jede Änderung als JSON zurück. Ein beschädigter Eintrag zählt wie keiner.

:::solution[Lösung]
::code{file="exercises/07-state/persistence/solution/{lang}/src/stores/favorites.js" lines="4-21"}

`JSON.parse(null)` ergibt `null`, und `Array.isArray` lässt dann wie bei einem beschädigten Eintrag die leere Liste gelten. `deep: true` braucht es, falls jemand die Liste mit `push` ändert.
:::
::::

::::exercise[Vertiefung]
Ein zweiter Tab ändert die Favoriten, und der erste merkt es nicht. Lass den Store auf das Event `storage` hören und die Favoriten neu lesen, wenn sich sein Schlüssel ändert.

:::solution[Lösung]
::code{file="exercises/07-state/persistence/solution/{lang}/src/stores/favorites.js" lines="23-26"}

Ein Store lebt, solange die App läuft, darum muss er den Listener nicht wieder entfernen. In einem Composable für Komponenten gehört dazu `onUnmounted` oder `onScopeDispose`, wie im Composable der Fallbeispiel-App.
:::
::::

::::exercise[Knobelei]
Die Seite eines Dings hält einen Entwurf des Formulars im `sessionStorage` unter `lorraine-commons-draft-` und der Nummer des Dings. Nach dem Neuladen steht er wieder im Formular, und nach dem Senden ist er weg.

:::solution[Lösung]
::code{file="exercises/07-state/persistence/solution/{lang}/src/views/ItemView.vue" lines="12-37"}

Der Router behält die Seite, wenn nur die Nummer wechselt, wie in Kapitel 6.2. Der Watcher auf `key` holt dann den Entwurf des neuen Dings.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Aus dem Speicher kommt `[object Object]`. | Der Speicher nimmt nur Text. Werte mit `JSON.stringify` speichern und mit `JSON.parse` lesen. |
| Ein beschädigter Eintrag lässt die App beim Start abstürzen. | `JSON.parse` in `try` und `catch` setzen und die Form des Werts prüfen. |
| Ein Tab merkt nichts von den Änderungen eines anderen. | Auf das Event `storage` hören. Der Tab, der schreibt, bekommt es nicht. |
| Ein Kennwort oder eine Kennung der Sitzung steht im `localStorage`. | Nie. Eine Anmeldung gehört in ein Cookie mit `HttpOnly`, das der Server setzt. |
| Ein KI-Assistent speichert das ganze Mitglied im `localStorage`, damit es nach dem Neuladen angemeldet bleibt. | Ob jemand angemeldet ist, weiss der Server. Die App fragt ihn nach dem Neuladen. |

## Selbstcheck

::::selfcheck
1. Worin unterscheiden sich `localStorage` und `sessionStorage`?
2. Wann löst der Browser das Event `storage` aus, und wann nicht?
3. Warum gehört eine Kennung der Sitzung nicht in den Speicher des Browsers?
4. Warum wartet der Guard nach dem Neuladen auf die Kurs-API?

:::solution[Antworten]
1. `localStorage` teilen alle Tabs einer Origin, und er übersteht das Schliessen des Browsers. `sessionStorage` gehört zu einem Tab und endet mit ihm.
2. In den anderen Tabs derselben Origin, wenn ein Tab einen Eintrag ändert. Der Tab, der schreibt, bekommt es nicht.
3. Jedes Skript der Seite kann den Speicher lesen, und eine einzige Lücke für Cross-Site Scripting reicht, um sie zu stehlen. Ein Cookie mit `HttpOnly` bleibt für Skripte unsichtbar.
4. Nach dem Neuladen ist der Store leer, und erst die Antwort auf `GET /session` sagt, wer angemeldet ist. Ohne Warten käme ein angemeldetes Teammitglied auf die Anmeldung.
:::
::::

:::assignment
Die App hält, was sie halten soll, und vergisst, was sie nicht behalten darf. Martina Hostettler will sie im Verein zeigen, sobald sie öffentlich läuft, und das kommt mit Teil 8. Mit diesem Kapitel ist der Stoff der Prüfung komplett, und mit dem [Kompetenzraster](../competences/) prüfst du, wo du stehst. Wer wissen will, wie Bibliotheken Daten vom Server zwischenspeichern, liest den Exkurs zu Server-State-Bibliotheken.
:::
