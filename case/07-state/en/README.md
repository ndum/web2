# Lorraine Commons after part 7

This is the state of the running case after part 7 "State and data". Pinia keeps the catalog, the login, the favorites and the requests in stores. The data come from the course API, the login lasts one session, the favorites stay the same in every tab, and a form someone started stays in its tab. If you did not finish everything in part 7, start part 8 from this state.

```bash
npm install
npm test
```

For the app, start the course API in one terminal, in the folder `api` of the course repo, and Vite in a second one:

```bash
npm start
npm run dev
```
