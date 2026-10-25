# Aufgaben zu «Testen»

Die Aufgaben stehen im Kurs im Kapitel «Testen». So startest du das Projekt und die Tests:

```bash
npm install
npm run dev
npm test
```

Die Tests brauchen keinen Server. Für die App im Browser startest du in einem zweiten Terminal die Kurs-API, im Kursrepo im Ordner `api`:

```bash
npm start
```

In diesem Projekt schreibst du die Tests selbst. `npm test` lässt sie zuerst gegen den richtigen Code laufen, dort müssen sie bestehen. Danach laufen die Tests jeder Stufe gegen Mutanten, Kopien des Codes mit je einem kleinen Fehler, und `npm test` meldet, wie viele Fehler deine Tests finden. Die Mutanten liegen in `mutants`, schau sie erst an, wenn du nicht weiterkommst. Mit `npm run test:watch` laufen nur deine Tests, bei jeder Änderung neu.
