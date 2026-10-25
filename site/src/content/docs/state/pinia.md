---
title: Pinia
description: Stores mit Pinia einrichten, Setup Stores mit State, Getters und Actions, storeToRefs, Stores, die andere Stores nutzen, ein Store im Navigation Guard, die Vue DevTools und Tests für Stores.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler meldet sich aus dem Tresen.

> Als Freiwillige oder Freiwilliger am Tresen möchte ich, dass nach dem Abmelden nichts mehr von den Anfragen des vorigen Mitglieds zu sehen ist, damit das nächste Mitglied am selben Gerät nur seine eigenen sieht.

Der Freiwillige schlägt vor, Anmeldung und Anfragen in Stores mit Pinia zu legen. Die Akzeptanzkriterien lauten:

1. Anmeldung und Anfragen liegen in je einem Store.
2. Kopf, Seite eines Dings und Guard lesen die Anmeldung aus dem Store.
3. Nach dem Abmelden steht keine Anfrage des vorigen Mitglieds mehr im Speicher.
:::

:::goals
Nach diesem Kapitel kannst du

- Pinia in einer App einrichten,
- einen Setup Store mit State, Getters und Actions schreiben,
- einen Store mit `storeToRefs` zerlegen, ohne die Verbindung zu verlieren,
- einen Store in einem anderen Store und in einem Navigation Guard verwenden,
- Stores und Komponenten mit Stores testen.
:::

## Pinia einrichten

[Pinia](https://pinia.vuejs.org/) ist die Bibliothek für Stores, die Vue empfiehlt. Laut [Vue-Dokumentation](https://vuejs.org/guide/scaling-up/state-management.html) pflegt sie das Kernteam von Vue, und das ältere Vuex bekommt keine neuen Funktionen mehr. Gegenüber einem Modul wie im letzten Kapitel bringt Pinia feste Regeln für die Zusammenarbeit und eine Anbindung an die Vue DevTools mit.

Ein Projekt von create-vue mit der Option Pinia hat schon alles, was es braucht. Pinia steht in den Abhängigkeiten, ein Beispielstore liegt in `src/stores`, und `main.js` meldet Pinia vor dem Router an.

```js
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

## Setup Stores

`defineStore` legt einen Store an. Das erste Argument ist eine id, die in der App eindeutig sein muss. Das zweite ist eine Funktion wie `<script setup>`. Laut [Pinia-Dokumentation](https://pinia.vuejs.org/core-concepts/) werden darin Refs zum State, berechnete Werte zu Getters und Funktionen zu Actions. Der Store heisst nach Konvention `use` plus Name plus `Store`.

::playground{dir="examples/07-state/first-store"}

Jede Komponente, die `useFavoritesStore()` aufruft, bekommt denselben Store. Ein Setup Store muss allen State zurückgeben, sonst verpassen ihn laut Dokumentation Pinia und die Entwicklertools. Privaten State gibt es darum nicht. Neben Setup Stores kennt Pinia Option Stores mit den Feldern `state`, `getters` und `actions`, wie die Options API. Der Kurs verwendet Setup Stores, weil sie wie `<script setup>` aussehen und Composables nutzen können.

## Stores zerlegen mit storeToRefs

Ein Store ist ein reaktives Objekt. Zerlegt man ihn direkt, bekommt man Kopien der Werte, wie bei `reactive` in Kapitel 5.1. `storeToRefs` macht aus State und Getters Refs, die mit dem Store verbunden bleiben.

::playground{dir="examples/07-state/store-to-refs"}

Actions kann man direkt zerlegen, denn sie gehören laut Dokumentation fest zum Store. `storeToRefs` lässt sie aus.

## Stores, die andere Stores nutzen

Ein Store darf einen anderen Store verwenden. Der Store der Anfragen fragt den Store der Anmeldung, wer gerade angemeldet ist, und zeigt in seinem Getter `mine` nur dessen Anfragen.

::playground{dir="examples/07-state/stores-together"}

Pinia gibt jedem Aufruf von `useAuthStore()` denselben Store, auch im anderen Store. Meldet sich jemand anderes an, rechnet `mine` neu.

## Ein Store im Navigation Guard

Ein Guard läuft ausserhalb von Komponenten. Laut [Pinia-Dokumentation](https://pinia.vuejs.org/core-concepts/outside-component-usage.html) ruft er den Store darum in seiner Funktion auf und nicht oben im Modul. Dort liefe der Aufruf je nach Reihenfolge der Importe, bevor Pinia angemeldet ist, und schlüge fehl.

::playground{dir="examples/07-state/store-in-guard"}

Ein Mitglied ohne Konto des Teams landet wie in Kapitel 6.4 auf der Anmeldung, die Information kommt jetzt aus dem Store.

## Stores in den Entwicklertools

Laut Vue-Dokumentation bindet Pinia die Vue DevTools ein, mit einer Zeitleiste der Änderungen und einem Blick in die Stores, die eine Komponente nutzt. Die id eines Stores ist sein Name in den Entwicklertools. Ein Projekt von create-vue bringt die Vue DevTools als Plugin von Vite mit, der Knopf dafür erscheint unten auf der Seite, solange `npm run dev` läuft.

## Stores testen

Ein Store lässt sich ohne Komponente testen. Laut [Pinia-Dokumentation](https://pinia.vuejs.org/cookbook/testing.html) legt `setActivePinia(createPinia())` vor jedem Test ein frisches Pinia an, und `useAuthStore()` liefert danach einen frischen Store.

::code{file="exercises/07-state/pinia/solution/{lang}/tests/level-2.test.js" lines="13-19"}

Für Komponenten gibt es `createTestingPinia` aus dem Paket `@pinia/testing`. Es ersetzt alle Actions durch Spione, die nur ihre Aufrufe notieren, und nimmt den State, mit dem ein Test beginnen soll. Mit Vitest ohne globale Funktionen braucht es dazu `createSpy: vi.fn`.

::code{file="exercises/07-state/pinia/solution/{lang}/tests/level-2.test.js" lines="55-66"}

## Im Code

Arbeite mit den Beispielen dieses Kapitels. Lies den Code und schreib auf, was du erwartest, bevor du etwas änderst.

1. Nimm im ersten Beispiel `count` aus dem `return` des Stores. Was zeigt der Kopf jetzt?
2. Klick im Beispiel mit `storeToRefs` mehrmals auf «Favorit». Welche Zahl bleibt stehen, und warum?
3. Melde dich im Beispiel mit den zwei Stores als M-117 an, frag zwei Dinge an, melde dich ab und als M-204 an. Was zeigt «Meine Anfragen»?
4. Verschieb im Beispiel mit dem Guard die Zeile `const auth = useAuthStore()` an den Anfang des Moduls, vor `createRouter`. Was passiert beim Start?

## Aufgaben

Die Aufgaben bauen die beiden Stores aus dem Auftrag. Du findest das Projekt im Kursrepo im Ordner `exercises/07-state/pinia/de`. Die Anmeldung liegt dort noch als Modul in `src/auth.js`, wie in Teil 6. Kopiere den Ordner, installiere die Pakete und starte die Tests.

```bash
npm install
npm test
```

::::exercise[Einstieg]
Mach aus `src/auth.js` den Store `useAuthStore` mit der id `auth` in `src/stores/auth.js`. Er hat den State `member`, den Getter `isTeam` und die Actions `signIn(number)` und `signOut()`. `signIn` gibt `true` zurück, wenn die Nummer bekannt ist. Kopf, Anmeldung und Guard verwenden den Store, danach löschst du `src/auth.js`.

:::solution[Lösung]
::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/auth.js"}

::code{file="exercises/07-state/pinia/solution/{lang}/src/router/index.js" lines="19-25"}

Die Lösung enthält mit der Zeile `useRequestsStore().$reset()` schon die Knobelei. Im Kopf zerlegt `storeToRefs(auth)` den Store, die Action `signOut` ruft er über `auth.signOut()` auf.
:::
::::

::::exercise[Vertiefung]
Lege den Store `useRequestsStore` mit der id `requests` in `src/stores/requests.js` an. Er hat den State `list`, den Getter `mine` mit den Anfragen des angemeldeten Mitglieds und die Action `add(itemId)`. Ohne Anmeldung nimmt `add` nichts an, und jedes Mitglied fragt ein Ding höchstens einmal an. Der Knopf «Anfragen» auf der Seite eines Dings ruft `add` auf, und der Kopf zeigt die Zahl der eigenen Anfragen.

:::solution[Lösung]
::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/requests.js"}

Der Store fragt den Store der Anmeldung in seiner Funktion. Auf der Seite eines Dings zeigt ein berechneter Wert mit `requests.mine`, ob das Ding schon angefragt ist, und der Knopf heisst dann «Angefragt».
:::
::::

::::exercise[Knobelei]
Am Tresen melden sich nacheinander mehrere Mitglieder an. Gib dem Store der Anfragen eine Action `$reset`, die die Liste leert, und ruf sie beim Abmelden auf.

:::solution[Lösung]
::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/requests.js" lines="17-20"}

::code{file="exercises/07-state/pinia/solution/{lang}/src/stores/auth.js" lines="21-25"}

Ein Option Store hat `$reset` von Pinia, ein Setup Store braucht laut Dokumentation eine eigene Action mit diesem Namen. Die zwei Stores importieren sich gegenseitig. Das geht, weil beide den anderen Store erst in ihren Funktionen aufrufen.
:::
::::

## Typische Fehler

| Fehler | Was hilft |
|---|---|
| Die Konsole meldet, dass es kein aktives Pinia gibt. | In `main.js` fehlt `app.use(createPinia())`, oder ein Modul ruft den Store schon beim Laden auf. Den Store erst in einer Funktion aufrufen. |
| Ein Wert aus dem Store bleibt in der Komponente stehen. | Der Store wurde direkt zerlegt. `storeToRefs` verwenden oder über den Store lesen, etwa `auth.member`. |
| Ein Wert erscheint nicht in den Entwicklertools. | Der Setup Store gibt ihn nicht zurück. Allen State zurückgeben. |
| `store.$reset()` meldet einen Fehler. | Setup Stores haben kein eigenes `$reset`. Eine Action mit diesem Namen schreiben. |
| Ein KI-Assistent schreibt einen Store mit `new Vuex.Store`. | Das ist Vuex für ältere Apps. Neue Apps verwenden Pinia mit `defineStore`. |

## Selbstcheck

::::selfcheck
1. Was wird in einem Setup Store zu State, zu Getters und zu Actions?
2. Warum verliert ein direkt zerlegter Store die Verbindung, und was hilft?
3. Wo ruft ein Navigation Guard seinen Store auf, und warum?
4. Was tut `createTestingPinia` mit den Actions eines Stores?

:::solution[Antworten]
1. Refs werden zu State, berechnete Werte zu Getters und Funktionen zu Actions.
2. Der Store ist ein reaktives Objekt. Beim Zerlegen entstehen Kopien der Werte. `storeToRefs` macht Refs, die mit dem Store verbunden bleiben.
3. In seiner Funktion. Dann ist Pinia sicher angemeldet, oben im Modul vielleicht noch nicht.
4. Es ersetzt sie durch Spione, die nur ihre Aufrufe notieren, ausser mit `stubActions: false`.
:::
::::

:::assignment
Anmeldung und Anfragen haben ihre Stores, und am Tresen bleibt nach dem Abmelden nichts zurück. Noch liegen die Anfragen aber nur im Speicher des Browsers, und die Anmeldung kennt zwei Mitglieder aus dem Code. Das Team will die Anfragen sehen, und der Katalog soll vom Server des Vereins kommen. Darum geht es im nächsten Kapitel.
:::
