# Lorraine Commons nach Teil 8

Das ist der Stand des Fallbeispiels nach Teil 8 «Architektur, Qualität und Betrieb». Die Dateien liegen nach Features geordnet in `src/features`, nur `src/api` spricht mit dem Server, und die Stores bekommen die API von `main.js`. Wichtige Entscheide stehen als Architekturentscheide in `docs/adr`. Mit diesem Stand beginnst du dein eigenes Projekt nicht, er zeigt dir aber, wie die Kapitel von Teil 8 an einer App aussehen.

```bash
npm install
npm test
```

Für die App startest du die Kurs-API in einem Terminal, im Kursrepo im Ordner `api`, und Vite in einem zweiten:

```bash
npm start
npm run dev
```

Die Demo braucht keinen Server. Sie spielt die Kurs-API im Browser nach und hält Anmeldung und Anfragen, bis du den Tab schliesst:

```bash
npm run demo
```

Veröffentlicht liegt die Demo auf der Kursseite unter `demo/de/`.
