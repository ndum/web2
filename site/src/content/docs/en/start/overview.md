---
title: Course overview
description: How the course is structured, how you work with it, who Lorraine Commons is and how to learn with AI without letting it do the learning for you.
sidebar:
  order: 1
---

:::assignment
Martina Hostettler sent the first message before there was any app.

> Our catalog lives in a spreadsheet that is only open at the counter. Members call during opening hours to ask whether the drill is in, and we write the loans down on paper. The board would like an app where members can see what is in and reserve things. Can you help us?
:::

:::goals
After this chapter you can

- explain how the course is structured and how a chapter works,
- say where to find exercises, tests and solutions,
- describe who Lorraine Commons is and what the app should do,
- use AI tools in a way that still makes you learn something.
:::

## The course at a glance

The module takes about 50 lessons. In parts 0 to 7 you learn what makes a single page application and how to build one with Vue. A [practical exam](../../exam/) follows, and in the last 20 lessons you build a project of your own. Part 8 accompanies the project with chapters on architecture, testing, accessibility and deployment, each arriving when your project needs it.

![The course at a glance. A bar shows the 50 lessons of the module. Parts 0 to 7 fill lessons 1 to 28, the exam takes lessons 29 and 30, and the project with part 8 takes lessons 31 to 50. The names of the parts are listed below the bar.](../../../../assets/figures/en/p0c1-course-map.svg)

Next to the parts there is the [JS workshop](../../js/) with ten units on the basics of JavaScript. The [entry test](../entry-test/) shows you which of them to refresh. You work through [optional topics](../../optional/overview/) such as TypeScript, a backend of your own or end-to-end tests on your own when your project needs them.

## Working with the course

The course is written for self-study. You work through the chapters in class, and your teacher gives short inputs in between, answers questions and looks over your shoulder. Whatever you don't finish in class, you finish at home.

Every chapter follows the same order. It starts with an assignment from Lorraine Commons and the learning goals. Then comes the idea, often with a sketch, and an example that grows step by step. In the section "In code" you first read code and predict what it does before you run, examine and change it. After that come exercises at three levels, "Getting started", "Going further" and "Challenge", a table of common mistakes, a self-check and finally the next assignment.

The exercises come with exercise projects that have automated tests. The tests show you which exercises are done, and at the start most of them fail. The solutions are in the chapter, folded away. Open them only after you have tried yourself, otherwise all you practice is reading. At the end of every part a competence grid lets you check whether you are ready for the next one.

## Lorraine Commons

Lorraine Commons is an association in the Lorraine quarter of Bern that exists only in this course. It runs a library of things. Members borrow things they rarely need, such as a drill, a tent, a raclette oven or a set of folding tables and benches for a party, so they don't have to buy them. The name refers to the commons, resources that a community shares and looks after together.

The association has about 300 members who pay CHF 40 a year, and about 60 things in six categories. Every thing has a deposit between CHF 10 and CHF 80, and a loan lasts seven days at most. Volunteers staff the counter on Wednesdays from 5 to 7 p.m. and on Saturdays from 10 a.m. to 1 p.m.

Martina Hostettler is the board member responsible for everything digital. She brings an assignment in every chapter, usually as a user story with acceptance criteria. You develop the app, and it grows from part to part.

| Part | What the app can do afterwards |
|---|---|
| 1 | helper functions analyze the catalog data |
| 2 | a first catalog, built by hand in JavaScript |
| 3 | the catalog in Vue with search, filter and a reservation form |
| 4 | cards, search field and dialog as components of their own |
| 5 | the app remembers the search and the favorites |
| 6 | separate pages, links to every thing and an area for the team |
| 7 | data and reservations through the association's API |
| 8 | tested, accessible and published |

## Learning with AI

AI assistants explain code, write code and find bugs. That can help you learn, but it can also do the learning for you. If an AI solves the exercise, you end up with a solution but without understanding it. And understanding is exactly what you need in the exam and in the screencast of your project.

A few rules have proven useful.

1. Try it yourself first, for at least ten minutes. If you get stuck and then ask, you understand the answer better.
2. Ask for a hint instead of the solution, for example "Explain why this test fails, but don't show me any code".
3. Have code you don't understand explained to you, line by line.
4. Check what the AI gives you. With Vue, assistants often write patterns from older versions, such as the Options API or Vuex. The "Common mistakes" tables in the chapters show the most frequent cases.
5. Never enter passwords, keys or personal data into an AI tool.

In the project you may use AI, for code as well. You state in the README what you used it for and show in the screencast that you understand your code. The [project assignment](../../project/assignment/) has the details.

## Exercises

::::exercise[Getting started]
Read Martina Hostettler's message again. Write three things the app must do for members as user stories following the pattern "As a member, I want …, so that …".

:::solution[Solution]
For example these three.

1. As a member, I want to see whether a thing is in right now, so that I don't have to call.
2. As a member, I want to reserve a thing for certain days, so that I'm sure to get it.
3. As a member, I want to search the catalog, so that I find a thing quickly.

A good user story says who wants something, what that person wants and why. The "so that" helps you decide later whether a solution solves the actual problem.
:::
::::

::::exercise[Going further]
Open the chapter on [props](../../components/props/) and find the parts of the chapter rhythm in it. Where is the assignment, where the idea, where the section "In code", and which three exercises are there?

:::solution[Solution]
The assignment is at the very top, followed by the learning goals. The idea is in the sections "One card for every thing" and "Declaring props", the latter with a sketch. The section "In code" works with the availability example. The exercises are the deposit ("Getting started"), the date from which a thing is free again ("Going further") and a component for the list ("Challenge"). At the end come common mistakes, the self-check and the next assignment.
:::
::::

::::exercise[Challenge]
You are stuck on an exercise because a test fails. Write a request to an AI assistant that helps you along without giving away the solution.

:::solution[Solution]
For example this request.

> I'm learning Vue and working on an exercise. The test "shows the deposit with two decimals" fails, the message is below. Explain what the message means and in which direction I should look. Don't show me finished code.

The request says that you are learning, includes the error message and explicitly asks for a hint instead of a solution.
:::
::::

## Self-check

::::selfcheck
1. In which order do the parts of a chapter come?
2. What are the tests in the exercise projects for?
3. Why is it worth opening a solution only after trying yourself?
4. What do you record in the project about your use of AI?

:::solution[Answers]
1. Assignment, learning goals, idea, example, code, exercises, common mistakes, self-check and the next assignment.
2. They show you right away which exercises are done and where something is still missing.
3. When you search yourself, you notice what you don't understand yet. Merely reading a solution leaves little behind.
4. The README states for every tool what you used it for, which parts it affected and what you checked or changed in its output.
:::
::::

:::assignment
Martina Hostettler is glad you are on board. "Before we start, set up your laptop. The chapter [Setup](../setup/) lists what you need."
:::
