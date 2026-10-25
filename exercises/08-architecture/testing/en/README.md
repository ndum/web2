# Exercises on testing

The exercises are in the course, in the chapter on testing. This is how you start the project and the tests:

```bash
npm install
npm run dev
npm test
```

The tests need no server. For the app in the browser, start the course API in a second terminal, in the folder `api` of the course repo:

```bash
npm start
```

In this project you write the tests yourself. `npm test` first runs them against the correct code, where they have to pass. Then the tests of each level run against mutants, copies of the code with one small mistake each, and `npm test` reports how many mistakes your tests find. The mutants are in `mutants`, look at them only when you are stuck. With `npm run test:watch` only your tests run, again after every change.
