---
title: Dieselbe App in React
description: Der Katalog mit Suche und Favoriten in React, mit useState, Props, einer Funktion als Prop und einem Test ohne zusätzliche Bibliothek.
sidebar:
  order: 10
---

Das Kapitel [Frameworks im Vergleich](../../vue/frameworks/) hat Vue, React und Angular einander gegenübergestellt. Diese Seite zeigt den Katalog von Lorraine Commons mit Suche und Favoriten in React, so wie ihn die Teile 3 bis 5 in Vue gebaut haben. In React ist eine Komponente eine Funktion, die JSX zurückgibt, eine Schreibweise, die wie HTML aussieht und doch JavaScript ist.

## In deinem Projekt

Das Framework deines Projekts wählst du laut [Projektauftrag](../../project/assignment/) selbst. React lohnt sich, wenn du es im Beruf brauchst oder schon kennst. Komponenten, Props, Zustand, abgeleitete Werte und Routing kennst du aus dem Kurs, nur die Namen und einige Regeln ändern sich. Die Tabelle im Abschnitt [Übertragbarkeit](../../vue/frameworks/#übertragbarkeit) ordnet die Begriffe einander zu.

Für ein neues Projekt empfiehlt [react.dev](https://react.dev/learn/creating-a-react-app) ein Framework wie Next.js oder React Router. Eine SPA ohne eigenen Server baust du auch mit Vite, so wie das Beispiel. Einige Regeln sind in React anders als in Vue. Den Zustand änderst du nie direkt, sondern setzt mit der Funktion von `useState` einen neuen Wert, bei einem Array eine Kopie. Hooks wie `useState` rufst du nur auf der obersten Ebene der Komponente auf und nie in einer Bedingung, und `useEffect` brauchst du nur, um die Komponente mit etwas ausserhalb von React abzugleichen.

## Ein kleines Beispiel

Das Beispiel liegt unter `optional/react/de` und läuft mit Vite. `useState` gibt den aktuellen Wert und eine Funktion zurück, die einen neuen Wert setzt. Danach führt React die ganze Funktion `App` erneut aus und zeichnet, was sich geändert hat. Ein abgeleiteter Wert wie die Treffer der Suche braucht deshalb kein `computed`, er wird bei jedem Durchlauf einfach berechnet. Das Suchfeld ist kontrolliert, sein Wert kommt aus dem Zustand, und `onChange` meldet jede Eingabe.

::code{file="optional/react/{lang}/src/App.jsx"}

Die Karte bekommt ihre Props als ein Objekt. Statt ein Event auszulösen, ruft sie die Funktion auf, die ihr die Elternkomponente als Prop gegeben hat. Den Zustand der Favoriten hält so weiterhin `App`, wie im Kapitel [Zustand am richtigen Ort](../../state/where-state-belongs/).

::code{file="optional/react/{lang}/src/ItemCard.jsx"}

Der Test rendert die App mit `createRoot` in ein Element von happy-dom. `act` sorgt dafür, dass React alle Änderungen abgeschlossen hat, bevor der Test prüft. Für grössere Projekte nimmt man meist die React Testing Library, die das Suchen von Elementen und das Tippen erleichtert.

::code{file="optional/react/{lang}/tests/app.test.jsx" lines="1-25"}

## Offizielle Links

- [react.dev, Learn React](https://react.dev/learn)
- [react.dev, eine React-App von Grund auf bauen](https://react.dev/learn/build-a-react-app-from-scratch)
- [react.dev, act](https://react.dev/reference/react/act)
- [Vite, erste Schritte](https://vite.dev/guide/)
