# [%Lorraine Commons nach Teil 8|Lorraine Commons after part 8%]

[%Das ist der Stand des Fallbeispiels nach Teil 8 «Architektur, Qualität und Betrieb». Die Dateien liegen nach Features geordnet in `src/features`, nur `src/api` spricht mit dem Server, und die Stores bekommen die API von `main.js`. Wichtige Entscheide stehen als Architekturentscheide in `docs/adr`. Mit diesem Stand beginnst du dein eigenes Projekt nicht, er zeigt dir aber, wie die Kapitel von Teil 8 an einer App aussehen.|This is the state of the running case after part 8 "Architecture, quality and operations". The files are sorted by feature in `src/features`, only `src/api` talks to the server, and the stores get the API from `main.js`. Important decisions are recorded as architecture decisions in `docs/adr`. You don't start your own project from this state, but it shows you what the chapters of part 8 look like in an app.%]

```bash
npm install
npm test
```

[%Für die App startest du die Kurs-API in einem Terminal, im Kursrepo im Ordner `api`, und Vite in einem zweiten:|For the app, start the course API in one terminal, in the folder `api` of the course repo, and Vite in a second one:%]

```bash
npm start
npm run dev
```

[%Die Demo braucht keinen Server. Sie spielt die Kurs-API im Browser nach und hält Anmeldung und Anfragen, bis du den Tab schliesst:|The demo needs no server. It plays the course API in the browser and keeps the login and the requests until you close the tab:%]

```bash
npm run demo
```

[%Veröffentlicht liegt die Demo auf der Kursseite unter `demo/de/`.|The published demo lives on the course site under `demo/en/`.%]
