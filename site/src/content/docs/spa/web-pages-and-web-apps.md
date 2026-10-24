---
title: Webseiten und Webapps
description: Mehrseitige Websites, Single Page Applications, Seiten vom Server und Seiten im Voraus gebaut, was eine SPA kostet und wann sich keine lohnt.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler hat die Übersicht im Vorstand gezeigt, und dort kam eine Frage auf, die sie weitergibt.

> Wozu braucht es eine App? Würde nicht eine gewöhnliche Website mit Seiten reichen, wie die vom Quartierverein?

> Als Vorstand möchte ich verstehen, warum der Katalog eine App werden soll und keine gewöhnliche Website, damit wir die Zeit der Freiwilligen dafür freigeben können.

Die Akzeptanzkriterien für deine Antwort lauten:

1. Sie erklärt den Unterschied zwischen einer gewöhnlichen Website und einer App, ohne Fachbegriffe vorauszusetzen.
2. Sie nennt mindestens zwei Vorteile und zwei Nachteile einer App für Lorraine Commons.
3. Sie empfiehlt eine Lösung und begründet sie.
:::

:::goals
Nach diesem Kapitel kannst du

- erklären, wie eine mehrseitige Website und eine Single Page Application Seiten laden,
- serverseitiges Rendern und statisch erzeugte Seiten einordnen,
- die Kosten einer SPA nennen, beim ersten Laden, bei Suchmaschinen, bei JavaScript und bei der Barrierefreiheit,
- begründet entscheiden, ob sich für ein Vorhaben eine SPA lohnt.
:::

## Die klassische Website

Bei einer klassischen Website gehört zu jeder Adresse eine eigene Seite. Klickt jemand auf einen Link, fragt der Browser beim Server die nächste Seite an, bekommt ein vollständiges HTML-Dokument und baut die Anzeige neu auf. Weil eine solche Website aus vielen Seiten besteht, heisst sie auf Englisch Multi-Page Application, kurz MPA.

Die Seiten können als Dateien auf dem Server liegen oder bei jeder Anfrage entstehen, etwa mit PHP, Java oder Node. Vieles erledigt der Browser von selbst. Er führt die Liste für den Knopf «Zurück», springt beim Laden an den Anfang der Seite und liest den Titel vor. Eine MPA funktioniert auch ohne JavaScript, und jede Seite hat eine Adresse, die Suchmaschinen und Vorschauen in Chats lesen können.

![Anfragen einer mehrseitigen Website und einer SPA. Links eine mehrseitige Website, rechts eine Single Page Application, jeweils in drei Schritten. Beim Öffnen des Katalogs lädt die mehrseitige Website eine ganze Seite, die SPA eine fast leere Seite, ihr JavaScript und die Daten als JSON. Bei den weiteren Klicks lädt die mehrseitige Website jedes Mal eine ganze Seite, die SPA schickt keine Anfrage.](../../../assets/figures/de/p2c1-requests.svg)

## Die Single Page Application

Eine Single Page Application, kurz SPA, lädt eine einzige, fast leere HTML-Seite und dazu ihr JavaScript. Das JavaScript lädt die Daten als JSON, wie die Übersicht aus Teil 1, und baut daraus die Anzeige. Klickt jemand auf einen Link, fragt der Browser keine neue Seite an. Das JavaScript zeigt eine andere Ansicht und ändert dabei die Adresse, damit der Knopf «Zurück» und Links auf einzelne Ansichten weiterhin funktionieren.

Nach dem ersten Laden fühlt sich eine SPA wie ein Programm an. Ein Klick zeigt sofort das Ergebnis, ein Suchfeld filtert schon beim Tippen, und Daten wie ein halb ausgefülltes Formular bleiben erhalten, während jemand in einer anderen Ansicht nachschaut. Typische SPAs sind Webmail, Karten, Werkzeuge zum gemeinsamen Arbeiten und die Oberflächen vieler Verwaltungssysteme.

## Seiten auf dem Server und im Voraus

Zwischen MPA und SPA gibt es Mischformen. Beim serverseitigen Rendern, auf Englisch Server-Side Rendering oder SSR, erzeugt der Server die erste Seite schon fertig als HTML, mit denselben Komponenten, die später im Browser laufen. Danach übernimmt das JavaScript, und die Seite verhält sich wie eine SPA. Für Vue erledigt das Nuxt, ein Wahlthema dieses Kurses.

Bei einer statisch erzeugten Website, auf Englisch Static Site Generation oder SSG, entstehen alle Seiten schon beim Veröffentlichen als fertige HTML-Dateien. Diese Kurs-Site ist so gebaut. Beim Veröffentlichen erzeugt das Werkzeug Astro aus jedem Kapitel eine HTML-Seite, und nur einzelne Teile wie der Knopf «Ausführen» bringen eigenes JavaScript mit. Solche Inseln von JavaScript in statischen Seiten sind eine weitere Mischform.

## Die Kosten einer SPA

Eine SPA hat ihren Preis, und der fällt dort an, wo eine MPA vieles geschenkt bekommt.

1. Das erste Laden dauert länger. Bevor etwas erscheint, muss der Browser das JavaScript laden und ausführen und die Daten holen. Bei einer langsamen Verbindung sehen Mitglieder so lange eine leere Seite oder einen Hinweis zum Laden.
2. Suchmaschinen und Vorschauen sehen weniger. Google führt JavaScript aus, aber verzögert und nicht immer vollständig. Andere Suchmaschinen und die Vorschauen in Chat-Apps sehen oft nur die fast leere Seite.
3. Ohne JavaScript geht nichts. Blockiert ein Browser das Skript oder bricht es mit einem Fehler ab, bleibt die Seite leer.
4. Die Barrierefreiheit braucht Arbeit. Wechselt die Ansicht ohne neue Seite, merkt ein Screenreader nichts davon, der Fokus bleibt, wo er war, und der Titel ändert sich nicht. Die App muss das selbst erledigen, Teil 6 und Teil 8 zeigen wie.
5. Der Aufbau wird anspruchsvoller. Zustand, Routing und Werkzeuge für den Build kommen dazu, die eine MPA nicht braucht.

## Die passende Bauweise

Für Inhalte, die man vor allem liest, ist eine SPA meist die falsche Wahl. Ein Blog, eine Zeitung, eine Dokumentation oder die Seite eines Vereins mit Öffnungszeiten und Adresse sind mit einer MPA oder einer statisch erzeugten Website schneller, einfacher und für Suchmaschinen besser. Eine SPA lohnt sich, wo Menschen viel mit den Daten tun, suchen, filtern, auswählen und eintragen, und wo sie die App immer wieder öffnen.

Für Lorraine Commons trifft beides zu. Der Katalog mit Suche, Filter, Reservationen und einem Bereich für das Team ist eine Anwendung, die Mitglieder und Freiwillige oft benutzen. Die öffentlichen Informationen über den Verein lesen dagegen Menschen, die ihn noch nicht kennen und ihn über eine Suchmaschine finden. Viele Organisationen trennen deshalb die beiden Teile, eine statische Website für die Informationen und eine SPA für die Anwendung.

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Eine SPA gilt als schneller als jede Website. | Nach dem ersten Laden ja, beim ersten Laden meist nicht. Beides messen, etwa im Netzwerk-Panel aus Kapitel «Werkzeuge». |
| Es heisst, Suchmaschinen sähen eine SPA genau wie eine gewöhnliche Seite. | Nur Google führt JavaScript zuverlässig aus. Für Inhalte, die gefunden werden müssen, SSR oder statische Seiten wählen. |
| Eine SPA scheint ohne Framework nicht möglich. | Das nächste Kapitel baut eine von Hand. Ein Framework macht die Arbeit leichter, nicht erst möglich. |
| SSR wird so verstanden, dass im Browser kein JavaScript mehr läuft. | Bei SSR kommt die erste Seite fertig vom Server, danach übernimmt JavaScript wie bei einer SPA. |
| Es heisst, eine SPA brauche keinen Server. | Die Dateien der SPA liegen auf einem Server, und die Daten kommen von einer API, auch wenn kein Server Seiten erzeugt. |
| Ein KI-Assistent schlägt für jede Website ein SPA-Framework vor. | Zuerst klären, ob Menschen die Inhalte vor allem lesen oder mit ihnen arbeiten. |

## Aufgaben

::::exercise[Einstieg]
Ordne jedes Angebot einer Bauweise zu, mehrseitige Website, SPA oder statisch erzeugte Website, und begründe in einem Satz. Die Kurs-Site WEB2, ein Webmail-Programm, die Website einer Tageszeitung, ein Online-Stadtplan, auf dem man Strecken zeichnet, und die Seite eines Fussballclubs mit Spielplan und Kontakt.

:::solution[Lösung]
Die Kurs-Site ist statisch erzeugt, alle Kapitel entstehen beim Veröffentlichen. Webmail ist eine SPA, man arbeitet lange darin und wechselt oft zwischen Ansichten. Die Tageszeitung ist meist eine mehrseitige Website mit Seiten vom Server, denn die Artikel müssen gefunden werden und sich schnell öffnen. Der Stadtplan ist eine SPA, er reagiert laufend auf Eingaben. Die Seite des Fussballclubs eignet sich als statisch erzeugte Website, sie wird gelesen und selten geändert. Bei den Grenzfällen zählt die Begründung mehr als die Zuordnung.
:::
::::

::::exercise[Vertiefung]
Schreib die Antwort an den Vorstand von Lorraine Commons, fünf bis acht Sätze ohne Fachbegriffe. Sie erfüllt die drei Akzeptanzkriterien aus dem Auftrag.

:::solution[Lösung]
Zum Beispiel diese Antwort.

> Eine gewöhnliche Website lädt bei jedem Klick eine neue Seite vom Server. Eine App lädt einmal alles Nötige und zeigt danach jede Ansicht sofort an. Für den Katalog spricht vieles für eine App, denn Mitglieder suchen und filtern, reservieren Dinge, und die Freiwilligen am Tresen arbeiten den ganzen Nachmittag damit. Eine App hat aber auch Nachteile. Das erste Öffnen dauert etwas länger, und Suchmaschinen finden ihre Inhalte schlechter. Darum schlage ich zwei Teile vor. Die Informationen über den Verein bleiben eine gewöhnliche Website, die man über Suchmaschinen findet. Der Katalog wird eine App für Mitglieder und Freiwillige.

Die Antwort erklärt den Unterschied mit einem Bild aus dem Alltag, nennt die Vorteile für die Menschen, die die App benutzen, und verschweigt die Kosten nicht.
:::
::::

::::exercise[Knobelei]
Die Mitglieder sollen Links auf einzelne Dinge in Chats teilen können, und Menschen mit einem Screenreader sollen den Katalog ohne Hürden benutzen. Was muss die SPA dafür selbst erledigen, das bei einer mehrseitigen Website der Browser übernimmt? Nenne mindestens vier Punkte.

:::solution[Lösung]
1. Jede Ansicht braucht eine eigene Adresse, damit ein Link direkt zum Ding führt und der Knopf «Zurück» funktioniert.
2. Beim Wechsel der Ansicht muss die App den Titel der Seite anpassen.
3. Sie muss den Fokus an den Anfang der neuen Ansicht setzen oder den Wechsel ansagen lassen, damit ein Screenreader ihn bemerkt.
4. Sie muss beim Wechsel an den Anfang springen und beim Zurück die alte Position wiederherstellen.
5. Für Vorschauen in Chats braucht es Angaben, die ohne JavaScript lesbar sind, etwa mit Seiten vom Server oder vorab erzeugten Seiten für die Dinge.

Die ersten vier Punkte erledigt in Teil 6 Vue Router mit wenig Code. Der fünfte ist ein Grund für SSR, das Wahlthema zu Nuxt zeigt ihn.
:::
::::

## Selbstcheck

::::selfcheck
1. Was schickt der Server bei einem Klick in einer mehrseitigen Website, und was in einer SPA?
2. Worin unterscheiden sich serverseitiges Rendern und statisch erzeugte Seiten?
3. Nenne drei Kosten einer SPA.
4. Für welche Teile von Lorraine Commons lohnt sich eine SPA, für welche nicht?

:::solution[Antworten]
1. Bei einer mehrseitigen Website schickt der Server eine ganze neue Seite. In einer SPA schickt er beim Klick oft gar nichts, höchstens Daten als JSON, die Anzeige baut das JavaScript.
2. Beim serverseitigen Rendern entsteht die Seite bei jeder Anfrage auf dem Server. Statisch erzeugte Seiten entstehen einmal beim Veröffentlichen und liegen danach als Dateien bereit.
3. Zum Beispiel ein langsameres erstes Laden, weniger Sichtbarkeit für Suchmaschinen und Vorschauen, eine leere Seite ohne JavaScript, Mehrarbeit für die Barrierefreiheit und ein anspruchsvollerer Aufbau.
4. Für den Katalog mit Suche, Reservationen und dem Bereich für das Team lohnt sie sich. Für die öffentlichen Informationen über den Verein nicht, die sollen Suchmaschinen finden.
:::
::::

:::assignment
Der Vorstand ist einverstanden, der Katalog wird eine App. Bevor die Freiwilligen ein Werkzeug wählen, möchte Martina Hostettler aber verstehen, wie eine SPA funktioniert. «Bau doch eine erste Version ohne Hilfsmittel, mit dem Katalog und einer Seite für jedes Ding.» Das ist das nächste Kapitel.
:::
