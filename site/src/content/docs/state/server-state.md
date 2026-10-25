---
title: Server-State-Bibliotheken
description: Exkurs zu Daten vom Server als Cache, Pinia Colada mit useQuery und useMutation, Schlüssel, frische und veraltete Daten und TanStack Query.
sidebar:
  order: 5
  badge:
    text: Exkurs
---

Dieses Kapitel ist ein Exkurs. Für die Prüfung brauchst du es nicht, und die Fallbeispiel-App kommt ohne die Bibliothek aus. Es zeigt aber, wie grössere Apps Daten vom Server verwalten, und in einem Projekt mit vielen Daten vom Server spart es viel Code.

:::goals
Nach diesem Kapitel kannst du

- erklären, was Server State ist und worin er sich vom übrigen Zustand unterscheidet,
- Daten mit `useQuery` von Pinia Colada laden und zwischenspeichern,
- einen Schlüssel wählen, der zu den Daten passt,
- Daten mit `useMutation` ändern und veraltete Abfragen neu laden,
- Pinia Colada und TanStack Query einordnen.
:::

## Server State

Die Daten vom Server sind im Browser nur eine Kopie. Die Dokumentation von [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview) beschreibt solchen Server State mit vier Eigenschaften. Er liegt an einem Ort, den die App nicht besitzt, die App erreicht ihn nur über asynchrone Zugriffe, andere können ihn ohne ihr Wissen ändern, und ihre Kopie kann veralten.

Ein Store wie in Kapitel 7.3 kümmert sich um all das selbst. Er lädt, merkt sich den Status, lädt nach einer Änderung neu und weiss nicht, ob eine andere Seite dieselben Daten gerade auch lädt. Bibliotheken für Server State übernehmen diese Arbeit und halten die Antworten in einem Cache.

## Pinia Colada einrichten

[Pinia Colada](https://pinia-colada.esm.dev/) nennt sich selbst die Schicht für Datenabrufe in Vue. Es baut auf Pinia auf und hält seinen Cache in einem Store. Nach `npm install @pinia/colada` meldet `main.js` es nach Pinia an.

::code{file="exercises/07-state/server-state/solution/{lang}/src/main.js" lines="10-15"}

## Abfragen mit useQuery

`useQuery` bekommt einen Schlüssel und eine Funktion, die die Daten holt. Unter dem Schlüssel legt Pinia Colada die Antwort in den Cache. Laut [Dokumentation](https://pinia-colada.esm.dev/guide/queries.html) teilen sich alle Abfragen mit demselben Schlüssel denselben Eintrag, und gleichzeitige Anfragen gehen nur einmal an den Server.

::code{file="exercises/07-state/server-state/solution/{lang}/src/views/CatalogView.vue" lines="7-11"}

`useQuery` gibt unter anderem `data`, `error` und `isPending` zurück. Laut [Quelltext](https://github.com/posva/pinia-colada/blob/main/src/query-options.ts) gelten Daten fünf Sekunden lang als frisch. Danach sind sie veraltet, und Pinia Colada lädt sie neu, wenn eine Komponente sie wieder braucht, wenn das Fenster den Fokus zurückbekommt oder wenn das Netz zurückkehrt. Einträge, die keine Komponente mehr braucht, räumt es nach fünf Minuten weg. `staleTime` und `gcTime` ändern beides. Die Funktion bekommt ein `signal`, mit dem Pinia Colada eine überholte Anfrage abbricht.

## Ein Schlüssel pro Ding

Hängen die Daten von einem Wert ab, etwa von der Nummer eines Dings, gehört der Wert in den Schlüssel. Als Funktion geschrieben folgt der Schlüssel dem Wert, und jedes Ding bekommt seinen eigenen Eintrag. Ein Ding, das schon einmal da war, erscheint sofort aus dem Cache.

::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="11-15"}

## Daten ändern mit useMutation

Was Daten auf dem Server ändert, läuft über `useMutation`. Danach sind die betroffenen Abfragen veraltet, im Beispiel die eigenen Anfragen. `invalidateQueries` aus `useQueryCache` markiert sie als veraltet und lädt die Abfragen neu, die eine Komponente gerade zeigt.

::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="22-29"}

## TanStack Query

Die zweite verbreitete Bibliothek für Server State ist [TanStack Query](https://tanstack.com/query/latest/docs/framework/vue/overview), früher Vue Query, mit Paketen für Vue, React und weitere Frameworks. Für Vue heisst das Paket `@tanstack/vue-query`. Die Begriffe sind dieselben, `useQuery` nimmt dort `queryKey` und `queryFn`.

```js
const { data, error, isPending } = useQuery({
  queryKey: ['items'],
  queryFn: () => getJson('/items'),
})
```

Laut [Dokumentation](https://tanstack.com/query/latest/docs/framework/vue/guides/important-defaults) gelten Daten bei TanStack Query sofort als veraltet, und eine Abfrage mit Fehler versucht es dreimal, bevor sie den Fehler zeigt. Für ein Projekt, das schon Pinia verwendet, liegt Pinia Colada nahe. TanStack Query kennt, wer auch mit React arbeitet.

## Aufgaben

Die Aufgaben stehen im Projekt `exercises/07-state/server-state/de` im Kursrepo. Die Tests brauchen keinen Server. Für die App im Browser startest du die Kurs-API und meldest dich mit dem Knopf im Kopf an.

```bash
npm install
npm test
```

::::exercise[Einstieg]
`CatalogView` lädt den Katalog von Hand und fragt bei jedem Besuch die Kurs-API. Lade ihn mit `useQuery` unter dem Schlüssel `['items']` und zeig Laden, Fehler und Liste.

:::solution[Lösung]
::code{file="exercises/07-state/server-state/solution/{lang}/src/views/CatalogView.vue"}

Kehrt jemand innerhalb von fünf Sekunden zum Katalog zurück, fragt Pinia Colada die API nicht noch einmal. Der Test zählt die Anfragen an `/items`.
:::
::::

::::exercise[Vertiefung]
`ItemView` lädt das Ding bei jedem Wechsel neu. Lade es mit `useQuery` und einem Schlüssel aus `'items'` und der Nummer.

:::solution[Lösung]
::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="11-15"}

Ohne Funktion bliebe der Schlüssel beim ersten Ding stehen, und die Seite zeigte nach einem Wechsel noch das alte Ding.
:::
::::

::::exercise[Knobelei]
Schick die Anfrage mit `useMutation` und lade danach die eigenen Anfragen unter dem Schlüssel `['reservations']` neu, damit die Liste auf der Seite die neue Anfrage zeigt.

:::solution[Lösung]
::code{file="exercises/07-state/server-state/solution/{lang}/src/views/ItemView.vue" lines="17-33"}

`onSettled` läuft nach Erfolg und nach Fehler. Auch eine abgelehnte Anfrage kann zeigen, dass die Liste veraltet ist, etwa wenn jemand anderes dieselben Tage schon angefragt hat.
:::
::::

## Selbstcheck

::::selfcheck
1. Worin unterscheidet sich Server State vom übrigen Zustand einer App?
2. Wozu braucht `useQuery` einen Schlüssel?
3. Wann lädt Pinia Colada Daten von selbst neu?
4. Was tut `invalidateQueries` nach einer Änderung?

:::solution[Antworten]
1. Er gehört dem Server, andere ändern ihn ohne Wissen der App, und die Kopie im Browser kann veralten.
2. Unter dem Schlüssel liegt die Antwort im Cache. Abfragen mit demselben Schlüssel teilen sich den Eintrag und eine laufende Anfrage.
3. Wenn die Daten veraltet sind und eine Komponente sie wieder braucht, das Fenster den Fokus zurückbekommt oder das Netz zurückkehrt.
4. Es markiert die Abfragen mit dem Schlüssel als veraltet und lädt die neu, die eine Komponente gerade zeigt.
:::
::::
