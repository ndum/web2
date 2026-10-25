---
title: Kursüberblick
description: Wie der Kurs aufgebaut ist, wie du mit ihm arbeitest, wer Lorraine Commons ist und wie du mit KI lernst, ohne dir das Lernen abnehmen zu lassen.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler hat die erste Nachricht geschickt, noch bevor es eine App gibt.

> Unser Katalog steht in einer Tabelle, die nur am Tresen offen ist. Mitglieder rufen während der Öffnungszeiten an und fragen, ob die Bohrmaschine da ist, und die Ausleihen schreiben wir auf Papier. Der Vorstand wünscht sich eine App, in der Mitglieder sehen, was da ist, und Dinge reservieren können. Kannst du uns dabei helfen?
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, wie der Kurs aufgebaut ist und wie ein Kapitel abläuft,
- sagen, wo du Aufgaben, Tests und Lösungen findest,
- beschreiben, wer Lorraine Commons ist und was die App können soll,
- KI-Werkzeuge so einsetzen, dass du dabei selbst etwas lernst.
:::

## Der Kurs im Überblick

In den Teilen 0 bis 7 lernst du, was eine Single Page Application ausmacht und wie du eine mit Vue baust. Danach folgt eine [praktische Prüfung](../../exam/), und zum Schluss setzt du ein eigenes Projekt um. Teil 8 begleitet dich dabei mit Kapiteln zu Architektur, Tests, Barrierefreiheit und Deployment, jeweils dann, wenn dein Projekt sie braucht. Wie Prüfung und Projekt bewertet werden, steht unter [Leistungsbeurteilung](../../assessment/).

![Der Kurs im Überblick. Ein Balken zeigt die Reihenfolge des Moduls. Auf die Teile 0 bis 7 folgen die Prüfung und das Projekt mit Teil 8. Unter dem Balken stehen die Namen der Teile.](../../../assets/figures/de/p0c1-course-map.svg)

Neben den Teilen gibt es die [JS-Werkstatt](../../js/) mit zehn Einheiten zu den Grundlagen von JavaScript. Der [Einstiegstest](../entry-test/) zeigt dir, welche davon du auffrischen solltest. [Wahlthemen](../../optional/overview/) wie TypeScript, ein eigenes Backend oder End-to-End-Tests bearbeitest du selbständig, wenn dein Projekt sie braucht. Fachbegriffe schlägst du im [Glossar](../../glossary/) nach.

## So arbeitest du

Der Kurs ist für das Selbststudium geschrieben. Du arbeitest im Unterricht mit den Kapiteln, und deine Lehrperson gibt zwischendurch kurze Inputs, beantwortet Fragen und schaut dir über die Schulter. Was du im Unterricht nicht fertig machst, schliesst du zu Hause ab.

Jedes Kapitel folgt derselben Reihenfolge. Es beginnt mit einem Auftrag von Lorraine Commons und den Lernzielen. Dann kommt die Idee, oft mit einer Skizze, und ein Beispiel, das Schritt für Schritt entsteht. Im Abschnitt «Im Code» liest du zuerst Code und sagst voraus, was er tut, bevor du ihn ausführst, untersuchst und veränderst. Danach folgen Aufgaben auf drei Stufen, «Einstieg», «Vertiefung» und «Knobelei», eine Tabelle mit typischen Fehlern, ein Selbstcheck und am Schluss der nächste Auftrag.

Zu den Aufgaben gibt es Übungsprojekte mit automatischen Tests. Die Tests zeigen dir, welche Aufgaben erfüllt sind, und zu Beginn schlagen die meisten fehl. Die Lösungen stehen aufklappbar im Kapitel. Öffne sie erst, wenn du es selbst versucht hast, sonst übst du nur das Lesen. Am Ende jedes Teils prüfst du mit einem Kompetenzraster, ob du für den nächsten Teil bereit bist.

## Lorraine Commons

Lorraine Commons ist ein Verein im Lorraine-Quartier in Bern, den es nur in diesem Kurs gibt. Er betreibt eine Bibliothek der Dinge. Mitglieder leihen dort Dinge aus, die sie selten brauchen, etwa eine Bohrmaschine, ein Zelt, einen Raclette-Ofen oder eine Festbankgarnitur, und müssen sie so nicht selbst kaufen. «Commons» ist das englische Wort für Gemeingüter.

Der Verein hat rund 300 Mitglieder, die CHF 40 im Jahr bezahlen, und rund 60 Dinge in sechs Kategorien. Für jedes Ding gibt es ein Pfand zwischen CHF 10 und CHF 80, eine Ausleihe dauert höchstens sieben Tage. Freiwillige stehen am Mittwoch von 17 bis 19 Uhr und am Samstag von 10 bis 13 Uhr am Tresen.

Martina Hostettler ist im Vorstand für alles Digitale zuständig. Sie bringt in jedem Kapitel einen Auftrag, meist als User Story mit Akzeptanzkriterien. Du entwickelst die App, und sie wächst von Teil zu Teil.

| Teil | Was die App danach kann |
|---|---|
| 1 | Hilfsfunktionen werten die Daten des Katalogs aus |
| 2 | ein erster Katalog, von Hand in JavaScript gebaut |
| 3 | der Katalog in Vue mit Suche, Filter und Reservationsformular |
| 4 | Karten, Suchfeld und Dialog als eigene Komponenten |
| 5 | die App merkt sich Suche und Favoriten |
| 6 | eigene Seiten, Links zu jedem Ding und ein Bereich für das Team |
| 7 | Daten und Reservationen über die API des Vereins |
| 8 | getestet, barrierearm und veröffentlicht |

## Lernen mit KI

KI-Assistenten erklären Code, schreiben Code und finden Fehler. Das kann beim Lernen helfen, es kann dir das Lernen aber auch abnehmen. Wenn eine KI die Aufgabe löst, hast du hinterher eine Lösung, aber nicht das Verständnis dafür. Genau das brauchst du in der Prüfung und im Screencast deines Projekts.

Ein paar Regeln haben sich bewährt.

1. Versuch es zuerst selbst, mindestens zehn Minuten. Wer hängen bleibt und dann fragt, versteht die Antwort besser.
2. Frag nach einem Hinweis statt nach der Lösung, zum Beispiel «Erkläre mir, warum dieser Test fehlschlägt, aber zeig mir keinen Code».
3. Lass dir Code erklären, den du nicht verstehst, Zeile für Zeile.
4. Prüf, was die KI liefert. Assistenten schreiben bei Vue oft Muster aus älteren Versionen, etwa die Options API oder Vuex. Die Tabellen «Typische Fehler» in den Kapiteln zeigen die häufigsten Fälle.
5. Gib nie Passwörter, Schlüssel oder Personendaten in ein KI-Werkzeug ein.

Im Projekt darfst du KI einsetzen, auch für Code. Du hältst im README fest, wofür, und zeigst im Screencast, dass du deinen Code verstehst. Mehr dazu steht im [Projektauftrag](../../project/assignment/).

## Aufgaben

::::exercise[Einstieg]
Lies die Nachricht von Martina Hostettler noch einmal. Formuliere drei Dinge, die die App für Mitglieder können muss, als User Stories nach dem Muster «Als Mitglied möchte ich …, damit …».

:::solution[Lösung]
Zum Beispiel diese drei.

1. Als Mitglied möchte ich sehen, ob ein Ding gerade da ist, damit ich nicht anrufen muss.
2. Als Mitglied möchte ich ein Ding für bestimmte Tage reservieren, damit ich es sicher bekomme.
3. Als Mitglied möchte ich im Katalog suchen, damit ich ein Ding schnell finde.

Eine gute User Story nennt, wer etwas will, was diese Person will und wozu. Das «damit» hilft später zu entscheiden, ob eine Lösung das eigentliche Problem löst.
:::
::::

::::exercise[Vertiefung]
Öffne das Kapitel [Props](../../components/props/) und finde darin die Teile des Kapitelablaufs. Wo steht der Auftrag, wo die Idee, wo der Abschnitt «Im Code», und welche drei Aufgaben gibt es?

:::solution[Lösung]
Der Auftrag steht ganz oben, gefolgt von den Lernzielen. Die Idee steht in den Abschnitten «Eine Karte für alle Dinge» und «Props deklarieren», dort auch mit einer Skizze. Der Abschnitt «Im Code» arbeitet mit dem Beispiel zur Verfügbarkeit. Die Aufgaben sind das Pfand («Einstieg»), das Datum, ab dem ein Ding wieder frei ist («Vertiefung»), und eine Komponente für die Liste («Knobelei»). Am Schluss folgen typische Fehler, der Selbstcheck und der nächste Auftrag.
:::
::::

::::exercise[Knobelei]
Du kommst bei einer Aufgabe nicht weiter, weil ein Test fehlschlägt. Schreib eine Anfrage an einen KI-Assistenten, die dir weiterhilft, ohne dir die Lösung zu verraten.

:::solution[Lösung]
Zum Beispiel diese Anfrage.

> Ich lerne Vue und löse eine Übung. Der Test «zeigt das Pfand mit zwei Stellen nach dem Punkt» schlägt fehl, die Meldung steht unten. Erkläre mir, was die Meldung bedeutet und in welche Richtung ich suchen muss. Zeig mir keinen fertigen Code.

Die Anfrage sagt, dass du lernst, gibt die Fehlermeldung mit und verlangt ausdrücklich einen Hinweis statt einer Lösung.
:::
::::

## Selbstcheck

::::selfcheck
1. In welcher Reihenfolge laufen die Teile eines Kapitels ab?
2. Wozu dienen die Tests in den Übungsprojekten?
3. Warum lohnt es sich, eine Lösung erst nach einem eigenen Versuch zu öffnen?
4. Was hältst du im Projekt über deinen Einsatz von KI fest?

:::solution[Antworten]
1. Auftrag, Lernziele, Idee, Beispiel, Code, Aufgaben, typische Fehler, Selbstcheck und der nächste Auftrag.
2. Sie zeigen dir sofort, welche Aufgaben erfüllt sind und wo noch etwas fehlt.
3. Wer selbst sucht, merkt, was er oder sie noch nicht versteht. Beim blossen Lesen einer Lösung bleibt davon wenig hängen.
4. Im README steht für jedes Werkzeug, wofür du es eingesetzt hast, welche Teile betroffen sind und was du am Ergebnis geprüft oder geändert hast.
:::
::::

:::assignment
Martina Hostettler freut sich, dass du mitmachst. «Bevor wir loslegen, richte deinen Laptop ein. Im Kapitel [Einrichten](../setup/) steht, was du brauchst.»
:::
