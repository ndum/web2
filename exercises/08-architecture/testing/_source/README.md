# [%Aufgaben zu «Testen»|Exercises on testing%]

[%Die Aufgaben stehen im Kurs im Kapitel «Testen». So startest du das Projekt und die Tests:|The exercises are in the course, in the chapter on testing. This is how you start the project and the tests:%]

```bash
npm install
npm run dev
npm test
```

[%Die Tests brauchen keinen Server. Für die App im Browser startest du in einem zweiten Terminal die Kurs-API, im Kursrepo im Ordner `api`:|The tests need no server. For the app in the browser, start the course API in a second terminal, in the folder `api` of the course repo:%]

```bash
npm start
```

[%In diesem Projekt schreibst du die Tests selbst. `npm test` lässt sie zuerst gegen den richtigen Code laufen, dort müssen sie bestehen. Danach laufen die Tests jeder Stufe gegen Mutanten, Kopien des Codes mit je einem kleinen Fehler, und `npm test` meldet, wie viele Fehler deine Tests finden. Die Mutanten liegen in `mutants`, schau sie erst an, wenn du nicht weiterkommst. Mit `npm run test:watch` laufen nur deine Tests, bei jeder Änderung neu.|In this project you write the tests yourself. `npm test` first runs them against the correct code, where they have to pass. Then the tests of each level run against mutants, copies of the code with one small mistake each, and `npm test` reports how many mistakes your tests find. The mutants are in `mutants`, look at them only when you are stuck. With `npm run test:watch` only your tests run, again after every change.%]
