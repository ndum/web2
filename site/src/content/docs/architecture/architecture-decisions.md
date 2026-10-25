---
title: Architekturentscheide festhalten
description: Architekturentscheide nach Nygard mit Status, Kontext, Entscheid und Konsequenzen, Nummern und Status, ein Entscheid, der einen anderen ersetzt, Optionen abwägen und die Entscheide eines Projekts im Repository.
sidebar:
  order: 3
---

:::assignment
Die neue Freiwillige fragt, warum die App Pinia verwendet, warum die Kurs-API über einen Proxy läuft und warum das Formular beim Verlassen nicht mehr nachfragt. Der Freiwillige kennt nicht mehr alle Gründe, und Martina Hostettler kennt keinen davon.

> Als Vorstand möchte ich, dass jeder wichtige Entscheid zur App mit seinen Gründen festgehalten ist, damit neue Freiwillige ihn verstehen und wir ihn später bewusst ändern können.

Die Akzeptanzkriterien lauten:

1. Jeder wichtige Entscheid steht als kurzer Text mit Kontext, Entscheid und Konsequenzen im Repository.
2. Ein Entscheid, der nicht mehr gilt, bleibt stehen und verweist auf den neuen.
3. Ein Verzeichnis listet alle Entscheide mit ihrem Status.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, wozu Architekturentscheide dienen,
- einen Entscheid mit Status, Kontext, Entscheid und Konsequenzen festhalten,
- einen Entscheid durch einen neuen ersetzen, ohne ihn zu löschen,
- Optionen abwägen und festhalten,
- erkennen, welche Entscheide ein eigenes Dokument verdienen.
:::

## Entscheide und ihre Gründe

Der Code zeigt, was eine App tut, aber nicht, warum sie es so tut. Michael Nygard hat dafür 2011 [Architecture Decision Records](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) vorgeschlagen, kurz ADR. Ein ADR hält einen einzelnen Entscheid fest, der die Struktur, Eigenschaften wie Leistung oder Sicherheit, Abhängigkeiten, Schnittstellen oder die Bauweise einer Software prägt. Es umfasst eine bis zwei Seiten und richtet sich an jemanden, der später an der Software arbeitet und die Gründe nicht kennt.

## Der Aufbau

Nygard schlägt wenige Teile vor. Der Titel ist eine kurze Nominalphrase. Der Kontext beschreibt sachlich, welche Kräfte wirken. Der Entscheid steht in ganzen Sätzen und im Aktiv. Der Status sagt, ob der Entscheid gilt, und die Konsequenzen nennen alle Folgen, gute, schlechte und neutrale. Die Fallbeispiel-App hält ihre Entscheide in diesem Aufbau fest.

::code{file="case/08-architecture/{lang}/docs/adr/0003-shared-state-with-pinia.md"}

Der Kontext nennt auch, was gegen Pinia sprach, und die Konsequenzen nennen die zusätzliche Abhängigkeit. Gerade diese Sätze helfen später, wenn jemand den Entscheid überdenkt.

## Nummern und Status

Jedes ADR bekommt die nächste Nummer, und eine Nummer wird nie ein zweites Mal vergeben. Ein neuer Entscheid beginnt als vorgeschlagen und wird angenommen oder abgelehnt. Ein angenommener Entscheid kann später veralten oder durch einen neuen ersetzt werden.

![Ein Zustandsdiagramm. Ein Entscheid beginnt als vorgeschlagen und wird angenommen oder abgelehnt. Ein angenommener Entscheid kann später veralten oder durch einen neuen Entscheid ersetzt werden, der auf ihn verweist. Gelöscht wird kein Entscheid, er behält seine Nummer und bleibt im Verzeichnis.](../../../assets/figures/de/p8c3-adr-status.svg)

## Ein Entscheid ersetzt einen anderen

In Teil 6 hat die App vor dem Verlassen eines halb ausgefüllten Formulars nachgefragt, in Teil 7 hat ein Entwurf im `sessionStorage` diese Rückfrage abgelöst. Der alte Entscheid bleibt stehen und verweist auf den neuen.

::code{file="case/08-architecture/{lang}/docs/adr/0002-warning-before-leaving.md" lines="1-5"}

Der neue Entscheid nennt den alten in seinem Status.

::code{file="case/08-architecture/{lang}/docs/adr/0005-draft-in-session-storage.md" lines="1-5"}

Wer später fragt, warum die App nicht mehr nachfragt, findet beide Gründe, den für die Rückfrage und den für ihren Ersatz.

## Optionen abwägen

War die Wahl nicht offensichtlich, lohnt sich ein Abschnitt mit den Optionen, die zur Wahl standen. Die Vorlage [MADR](https://adr.github.io/madr/), in Version 4.0.0 von 2024, sieht dafür «Considered Options» vor und auf Wunsch Vor- und Nachteile jeder Option. Der Entscheid sagt dann, welche Option gewählt wurde und warum die anderen nicht.

## Der Ort im Repository

ADRs gehören ins Repository, neben den Code, den sie erklären. Nygard schlug `doc/arch/adr-NNN.md` vor, MADR legt sie in `docs/decisions` ab, und die Fallbeispiel-App in `docs/adr` mit einer Datei `README.md`, die alle Entscheide mit ihrem Status auflistet. Auch Verwaltungen arbeiten damit, die britische Regierung hat 2025 ein [Rahmenwerk für ADRs](https://www.gov.uk/government/publications/architectural-decision-record-framework) für den öffentlichen Sektor veröffentlicht.

## Entscheide, die ein ADR verdienen

Ein ADR verdient, was schwer rückgängig zu machen ist oder was eine neue Person überraschen würde, etwa das Framework, die Ordnung der Dateien, der Ort des Zustands, die Datenquelle, die Art der History im Router oder der Ort der Veröffentlichung. Namen von Variablen oder die Farbe eines Knopfs verdienen keins.

## In deinem Projekt

Dein README enthält laut [Projektauftrag](../../project/assignment/) die wichtigen Entscheide als kurze Architekturentscheide. Der Mindestumfang verlangt globalen Zustand für einen sinnvollen Bereich oder einen begründeten Verzicht darauf als Architekturentscheid. Halte einen Entscheid fest, sobald du ihn triffst, die Gründe kennst du dann noch. Die [README-Vorlage](../../project/readme-template/) enthält ein Beispiel.

## Im Code

Arbeite mit den Entscheiden der Fallbeispiel-App im Kursrepo im Ordner `case/08-architecture/de/docs/adr`. Lies zuerst, bevor du etwas schreibst.

1. Lies ADR 3. Welcher Satz im Kontext würde dir am meisten fehlen, wenn er nicht dastünde?
2. Vergleiche ADR 2 und ADR 5. Was bleibt von ADR 2 übrig, und warum lohnt es sich, ihn zu behalten?
3. Die Anmeldung mit einem Cookie mit `HttpOnly` aus Kapitel 7.4 hat noch kein ADR. Schreib in zwei Sätzen seinen Kontext.
4. Welche dieser Entscheide verdienen ein ADR? Die Farbe der Kopfzeile, Pinia für den Zustand, die Sortierung nach Name als Vorgabe, der Hash-Modus für die Demo.

## Aufgaben

Die Aufgaben halten Entscheide zu den Favoriten und zur Suche fest. Du findest das Projekt im Kursrepo im Ordner `exercises/08-architecture/adr/de`. Die Entscheide schreibst du in `docs/adr`, `template.md` zeigt den Aufbau, und ADR 1 dient als Beispiel. Die Tests prüfen Aufbau, Status und Verweise, nicht den Inhalt.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Mitglieder verlieren ihre Favoriten, sobald sie die Seite neu laden, und der Verein hat keinen Server, der sie speichern könnte. Die App speichert sie darum im `localStorage`. Halte diesen Entscheid als ADR 2 «Favoriten im localStorage» mit den Abschnitten Status, Kontext, Entscheid und Konsequenzen fest, in ganzen Sätzen, und trag ihn ins Verzeichnis `docs/adr/README.md` ein.

:::solution[Lösung]
::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/0002-favorites-in-local-storage.md"}

Der Status lautet in deiner Fassung «Angenommen». Die Lösung zeigt schon den Status nach der Vertiefung.
:::
::::

::::exercise[Vertiefung]
Mitglieder wollen ihre Favoriten auch am Tresen und auf dem Handy sehen. Die API des Vereins soll sie für angemeldete Mitglieder speichern. Halte das als ADR 3 «Favoriten auf dem Server» fest, das ADR 2 ersetzt. ADR 2 bleibt stehen, sein Status lautet «Ersetzt durch» mit einem Link auf ADR 3, und ADR 3 nennt in seinem Status ADR 2 mit einem Link. Pass das Verzeichnis an.

:::solution[Lösung]
::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/0003-favorites-on-the-server.md"}

::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/README.md"}
:::
::::

::::exercise[Knobelei]
Eine neue Freiwillige schlägt vor, den Suchtext in einen Store zu legen. Halte das als ADR 4 mit dem Status «Vorgeschlagen» fest. Zwischen Kontext und Entscheid steht ein Abschnitt «Optionen» mit mindestens zwei Optionen als Liste, und der Entscheid sagt, welche Option du vorschlägst und warum.

:::solution[Lösung]
::code{file="exercises/08-architecture/adr/solution/{lang}/docs/adr/0004-search-text-without-a-store.md"}

Ein Vorschlag wird erst nach einer Besprechung angenommen oder abgelehnt. Bis dahin hält das ADR fest, worüber das Team entscheidet.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Ein ADR beschreibt, was gebaut wurde, aber nicht warum. | Im Kontext die Kräfte nennen, die zum Entscheid geführt haben. |
| Ein überholter Entscheid wird gelöscht oder überschrieben. | Stehen lassen, den Status auf «Ersetzt durch» mit einem Link setzen und im neuen ADR auf den alten verweisen. |
| Die Konsequenzen nennen nur Vorteile. | Auch Nachteile und offene Punkte nennen, sie helfen bei späteren Entscheiden. |
| Jede Kleinigkeit bekommt ein ADR. | Nur Entscheide festhalten, die schwer rückgängig zu machen sind oder Neue überraschen würden. |
| Ein KI-Assistent schreibt ein ADR mit Gründen, die im Projekt nie eine Rolle spielten. | Kontext und Gründe kommen von dir. Prüf jeden Satz gegen das, was im Projekt wirklich passiert ist. |

## Selbstcheck

::::selfcheck
1. Welche Teile hat ein ADR nach Nygard?
2. Warum bleibt ein ersetzter Entscheid stehen?
3. Wann lohnt sich ein Abschnitt mit Optionen?
4. Nenne zwei Entscheide in deinem Projekt, die ein ADR verdienen.

:::solution[Antworten]
1. Titel, Kontext, Entscheid, Status und Konsequenzen.
2. Er erklärt, warum die App früher anders war, und der neue Entscheid baut auf seinen Gründen auf. Die Nummer bleibt eindeutig.
3. Wenn mehrere Lösungen in Frage kamen und die Wahl nicht offensichtlich war.
4. Etwa das Framework, die Datenquelle, der Ort des Zustands oder der Ort der Veröffentlichung.
:::
::::

:::assignment
Die Entscheide der App stehen jetzt in `docs/adr`, und die neue Freiwillige liest dort nach. Kurz darauf meldet Martina Hostettler einen alten Fehler. Nach einer Änderung an den Regeln nimmt die App wieder Anfragen an, deren erster Tag schon vorbei ist, obwohl das einmal behoben war. Das nächste Kapitel sorgt mit Tests dafür, dass ein solcher Fehler nicht ein drittes Mal zurückkommt.
:::
