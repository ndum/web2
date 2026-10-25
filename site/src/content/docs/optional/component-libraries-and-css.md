---
title: Komponentenbibliotheken und CSS
description: Scoped CSS, CSS-Module und v-bind in Single File Components, und was eine Bibliothek für Komponenten oder Tailwind CSS einem Projekt bringt.
sidebar:
  order: 9
---

Bisher hat jede Komponente des Kurses ihr eigenes CSS mitgebracht. Vue bietet dafür in Single File Components mehrere Wege, Stile auf eine Komponente zu beschränken. Wer Formulare, Tabellen, Menüs und Dialoge nicht selbst gestalten will, greift zu einer Bibliothek mit fertigen Komponenten oder zu einem CSS-Framework.

## In deinem Projekt

Eine Bibliothek spart Zeit bei Elementen, die schwierig gut zu bauen sind, etwa ein Datumsfeld, eine sortierbare Tabelle oder ein zugängliches Menü. Dafür bringt sie ihr eigenes Aussehen, zusätzliche Grösse im Build und eine Abhängigkeit, die du später kaum mehr los wirst. Prüf vor der Wahl, ob sie zu deiner Version von Vue passt, gepflegt wird und beschreibt, wie sie mit Tastatur und Screenreader umgeht. Für ein kleines Projekt reicht oft eigenes CSS mit `scoped`.

## Ein kleines Beispiel

Mit `<style scoped>` gibt Vue allen Elementen der Komponente ein eigenes Attribut und hängt es an die Selektoren. Die Regeln wirken so nur in dieser Komponente. Das äusserste Element einer Kindkomponente bekommt das Attribut der Elternkomponente auch, darum erreicht `.card .price` den Preis. Ein Element weiter innen im Kind erreichst du nur mit `:deep()`. Der Absatz unter der Karte hat dieselbe Klasse `price`, bleibt aber normal, weil er nicht in der Karte steht.

::playground{dir="examples/optional/scoped-styles"}

`v-bind()` im CSS verbindet einen Wert mit dem Zustand der Komponente. Vue setzt ihn als CSS-Variable und ändert ihn, sobald sich der Zustand ändert.

::playground{dir="examples/optional/css-binding"}

`<style module>` macht aus jeder Klasse einen eindeutigen Namen, den das Template über `$style` holt. Der Playground unterstützt CSS-Module nicht, in einem Projekt mit Vite funktioniert die Komponente wie gezeigt.

::code{file="examples/optional/css-module/{lang}/StatusBadge.vue"}

Die bekannten Bibliotheken für Vue 3 unterscheiden sich vor allem im Aussehen. Vuetify folgt Material Design, Quasar bringt über 120 Komponenten und eigene Werkzeuge für den Build mit, Element Plus und Naive UI haben eine eigene Gestaltung. Reka UI, früher Radix Vue, liefert Komponenten ohne Stil, die nur Verhalten und Zugänglichkeit mitbringen. Diese Bibliotheken stehen unter der MIT-Lizenz. PrimeVue braucht ab Version 5 einen Lizenzschlüssel und steht unter einer eigenen Lizenz, unter MIT steht noch PrimeVue 4. Lies vor der Wahl die Lizenz und die Seite zur Barrierefreiheit, nicht jede Bibliothek hat eine.

Tailwind CSS geht einen anderen Weg. Statt fertiger Komponenten schreibst du kleine Klassen wie `flex` oder `p-4` direkt ins Template. Mit Vite bindest du es über das Plugin `@tailwindcss/vite` und die Zeile `@import "tailwindcss";` im CSS ein. Tailwind sucht die Klassen als Text in deinen Dateien, ein Klassenname, den der Code erst zur Laufzeit zusammensetzt, bekommt deshalb kein CSS. Ausserdem entfernt Tailwind die Aufzählungszeichen von Listen, und VoiceOver kündigt solche Listen nicht mehr als Listen an, ausser sie tragen `role="list"`.

## Offizielle Links

- [Vue-Dokumentation, CSS in Single File Components](https://vuejs.org/api/sfc-css-features.html)
- [Vuetify](https://vuetifyjs.com/), [Quasar](https://quasar.dev/), [Element Plus](https://element-plus.org/), [Naive UI](https://www.naiveui.com/), [Reka UI](https://reka-ui.com/) und [PrimeVue](https://primevue.dev/)
- [Tailwind CSS mit Vite](https://tailwindcss.com/docs/installation/using-vite)
