# Lorraine Commons after part 8

This is the state of the running case after part 8 "Architecture, quality and operations". The files are sorted by feature in `src/features`, only `src/api` talks to the server, and the stores get the API from `main.js`. Important decisions are recorded as architecture decisions in `docs/adr`. You don't start your own project from this state, but it shows you what the chapters of part 8 look like in an app.

```bash
npm install
npm test
```

For the app, start the course API in one terminal, in the folder `api` of the course repo, and Vite in a second one:

```bash
npm start
npm run dev
```

The demo needs no server. It plays the course API in the browser and keeps the login and the requests until you close the tab:

```bash
npm run demo
```

The published demo lives on the course site under `demo/en/`.
