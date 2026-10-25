---
title: Competence grid for part 1
description: What you can do after part 1 and how to check it yourself, plus the state of the app after part 1.
sidebar:
  label: Competence grid
  order: 6
---

Use this grid to judge whether you are ready for part 2. Read each row and solve the check task next to it without looking anything up. If it feels easy, you have reached the goal. If not, the link in the last column takes you to the right place.

| I can … | Check task | Look it up |
|---|---|---|
| split code into modules with `export` and `import` | Explain why `node main.mjs` stops before the first line of output when an `export` is missing in `catalog.mjs`. | [Modules and packages](../modules/) |
| set up a project with `package.json` and run scripts | Add a script to a project and run it with `npm run`. | [Modules and packages](../modules/#npm-and-packagejson) |
| read version ranges and explain what the lock file is for | Explain the difference between `5.0.5` and `^5.0.5` and say whether `package-lock.json` belongs in the repo. | [Modules and packages](../modules/#versions-and-the-lock-file) |
| explain why two variables can change the same object | Explain the bug with the tents using the figure with the two variables. | [Values and references](../values-and-references/) |
| copy objects shallowly and deeply | Say when `{ ...item }` is enough and when you need `structuredClone`. | [Values and references](../values-and-references/#copies) |
| change data without changing the original | Write a function that marks a thing as on loan in a new list. | [Values and references](../values-and-references/#changing-without-side-effects) |
| analyze lists with `map`, `filter`, `find` and `some` | List the names of the things that are in and cost more than CHF 40 in deposit. | [Functions and arrays](../functions-and-arrays/) |
| count with `reduce` and sort lists without side effects | Count the things on loan per category and sort their names with `localeCompare`. | [Functions and arrays](../functions-and-arrays/#reduce) |
| predict the order of code with promises and timers | Predict the output of the example on the event loop and explain it. | [Asynchronous JavaScript](../async/#the-event-loop) |
| load data with `fetch` and report errors clearly | Explain why `fetch` doesn't reject for status 404, and show how you notice the error anyway. | [Asynchronous JavaScript](../async/#fetch) |
| abort a request after a time limit | Load the catalog with a time limit of one second from the server answering with `?delay=3000`. | [Asynchronous JavaScript](../async/#aborting-requests) |
| explain how a proxy notices changes (deep dive) | Explain what `track` and `trigger` do in the small reactive system. | [Proxies and getters](../proxies/) |

For part 2 you mainly need modules, arrays and `fetch`. The last row belongs to the deep dive and is optional.

## The app after part 1

What Martina Hostettler's assignments in this part added up to is in the course repo in the folder `case/01-javascript/en`. There is no interface yet, only the helper functions for the catalog, the overview for the counter and the small server. The tests in the folder `tests` check the wishes from all four chapters.

```bash
npm install
npm test
```

If you didn't finish everything in part 1, start part 2 from this state.
