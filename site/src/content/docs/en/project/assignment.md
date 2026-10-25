---
title: Project assignment
description: A single page application of your own, with minimum scope, process, documentation, screencast and grading rubric.
sidebar:
  order: 1
---

In the second part of the module you build a single page application of your own. You choose the idea and the framework. The [assessment](../../assessment/) page explains how the project counts toward the module grade.

## Frame

The project is individual work. With your teacher's agreement you can work in a pair, and then the project has to be larger. You may use Vue, React, Angular, Svelte or another framework, as long as the result is a single page application with client-side routing. The frontend is what gets graded. Your own backend earns bonus points but isn't required. You may also take data from a public API or simulate it with a mock in the browser.

AI tools are allowed, for programming too. You record in your README what you used them for, and in the screencast you show that you understand your code. That is why the grade rests mainly on what you can show and explain about your own project.

The idea has to be your own. Your teacher won't approve a rebuilt tutorial app such as a plain to-do list.

## Minimum scope

| Requirement | Individual | Pair |
|---|---|---|
| user stories with acceptance criteria | 5 | 8 |
| routes, one of them dynamic, plus a page for unknown addresses and a guard | 4 | 6 |
| components of your own, two of them reused, with props and events and slots or something similar at least once | 6 | 10 |
| global state for a sensible area, or a justified decision against it recorded as an architecture decision | yes | yes |
| data from an API with loading, error and empty states | yes | yes |
| forms with validation | 1 | 2 |
| automated tests | 3 | 6 |
| works on phones and desktops, basic accessibility, public deployment, README | yes | yes |
| an extended requirement, such as roles, offline use, end-to-end tests or several languages | | 1 |

## Process

1. You write the project sketch as the first version of your README. It describes the idea and the audience, the user stories with acceptance criteria, wireframes of the main views, the component tree, the routes, the concept for state, the data source and your choice of framework with your reasons.
2. Your teacher approves the sketch or asks for changes. The sketch earns no points of its own, but implementation only starts once it is approved.
3. You build the project and commit regularly. The README grows along with it, and you record important decisions as soon as you make them.
4. You hand in what your teacher asks for by the dates they give you. That includes the code with the tag `v1.0`, the README, the link to the deployed product and the screencast.

Your teacher tells you the dates, the submission channel and the rules for late work.

## Documentation

The README is your project's documentation. It contains these parts:

1. a short description of the project and its audience
2. the user stories with acceptance criteria and their status, met, partly met or open, with a reason for every deviation
3. the architecture with component tree, routes, concept for state and data flow
4. important decisions as short architecture decision records, each with context, decision and consequences
5. instructions for installing, starting, testing and deploying, with a file `.env.example` if the app needs environment variables
6. the AI declaration
7. a short reflection on what went well, what was hard and what you would do differently next time

The AI declaration lists, for every tool, what you used it for, which parts of the project it touched and what you checked or changed in its output. An honest declaration costs no points.

## Screencast

The screencast lasts ten minutes at most, anything beyond that isn't graded. Your voice is required, the camera is optional. You may cut, but the code has to be easy to read. Upload the screencast only through the channel your teacher names, never to a public platform.

The sequence is the same for everyone.

1. The product, about two minutes. You walk through an important user story in the deployed product.
2. The path through the code, about three minutes. You follow the same user story through the code, from the click in the component through props, events, store or composables to the API and back to the screen.
3. The three questions, about four minutes.
4. A place where an AI suggestion was wrong or weaker than your solution, and how you noticed, about one minute.

The three questions are:

1. Show the bug that held you up the longest. Where was it, how did you find it, and which commit fixed it?
2. Show a decision where you chose between two solutions, for example a store or local state. What would be different with the other solution, and where in the code would you see it?
3. Make your app run into an API error, for instance by blocking the request in the browser's DevTools. Show what users see and which code takes care of it.

Answers only count when they refer to your code and you show the places. General explanations that would fit any project earn no points.

## Grading

| Area | Points |
|---|---:|
| Screencast | 35 |
| Code | 25 |
| Product | 25 |
| Documentation | 15 |
| Bonus | up to 10 |

The grade follows linearly from the points, grade = points / 100 × 5 + 1. Bonus points can make up for missing points, but the grade never goes above 6.

| Area | Criterion | Points | Fully met when |
|---|---|---:|---|
| Screencast | Product | 5 | the user story runs completely and understandably in the deployed product |
| Screencast | Path through the code | 10 | every step from the click to the screen is shown at the right place in the code and explained correctly |
| Screencast | Three questions | 15 | each question is answered with reference to your own code and with the matching places, 5 points each |
| Screencast | AI place | 5 | the place is concrete and it becomes clear how you noticed the mistake |
| Code | Components | 5 | the components are split sensibly and work together through props, events and slots |
| Code | Routing | 5 | all routes work, also when an address is opened directly, with a dynamic route, a page for unknown addresses and a guard |
| Code | State and data | 5 | local and global state are separated sensibly, and loading, error and empty states are handled properly |
| Code | Quality and tests | 5 | a linter is set up, names and structure are easy to follow, the tests pass and no secret is in the code |
| Code | Git history | 5 | commits came regularly over the whole project, with messages that say what changed |
| Product | Functionality | 15 | all user stories meet their acceptance criteria |
| Product | Interface | 5 | the app is easy to use on phones and desktops and follows basic accessibility rules |
| Product | Operation | 5 | the deployed app runs, and the README lets anyone start it locally without asking |
| Documentation | Description and user stories | 4 | every user story is listed with its status and every deviation has a reason |
| Documentation | Architecture and decisions | 5 | component tree, routes, state and data flow are described and the important decisions are recorded |
| Documentation | AI declaration | 3 | every tool comes with its purpose, the parts it touched and your own checks |
| Documentation | Reflection | 3 | the reflection names concrete experiences from the project |

Bonus points are given for [your own backend](../../optional/backend/) (4), [authentication](../../optional/authentication/) (2), a [CI/CD pipeline](../../architecture/build-and-deployment/) (1), [end-to-end tests](../../optional/end-to-end-tests/) (1), [TypeScript](../../optional/typescript/) throughout (1) and a [progressive web app that works offline](../../optional/pwa/) (1).

## As a pair

You hand in documentation, code and product together, and the points for them count for both of you. The README states who is responsible for which user stories. You record one joint screencast of 15 to 20 minutes in which both of you speak for about the same time. Each of you answers the three questions from your own work, and each of you earns the screencast points for your own part.
