---
title: Setup
description: Node.js, npm, an editor with the Vue extension, Git and GitHub, the browser DevTools and a small project that checks whether everything is ready.
sidebar:
  order: 2
---

:::assignment
Martina Hostettler writes that a member of the association who works as a software developer would like to look at the code at some point. "He asks which tools you work with and whether he can run the project on his machine."
:::

:::goals
After this chapter you can

- install Node.js and npm and check their versions,
- set up an editor with the extension for Vue,
- configure Git and download the course repo,
- open the browser DevTools and read the console,
- install an exercise project, start it and run its tests.
:::

## Tools for the course

For the course you need a laptop with Windows, macOS or Linux and an internet connection. You will install these tools:

1. Node.js with npm, to run JavaScript outside the browser and to install packages
2. an editor, Visual Studio Code with the extension "Vue (Official)" is recommended
3. Git and a GitHub account, at the latest for your project
4. an up-to-date browser such as Firefox, Chrome or Edge

## Node.js and npm

Node.js runs JavaScript outside the browser. Vite, the tests and many other tools of the course run on it. npm, the package manager of Node.js, comes with it.

Download the LTS version from [nodejs.org](https://nodejs.org/). LTS stands for "Long Term Support", and these versions receive bug fixes for a long time. On Windows you can also install it in the terminal with `winget install OpenJS.NodeJS.LTS`. Then open a new terminal and check the versions.

```bash
node --version
npm --version
```

Node.js must be at least version 22. An older Node.js is no longer enough for the tools of the course.

## An editor for Vue

Visual Studio Code is free and well equipped for Vue. Install the extension "Vue (Official)" in it. It highlights the code in Vue files, completes names and shows errors as you type. Older guides call it "Volar", which was its former name. WebStorm supports Vue as well, and students get the JetBrains products for free.

## Git and GitHub

Git manages the versions of your code. Install it from [git-scm.com](https://git-scm.com/) or with `winget install Git.Git` and set your name and e-mail address.

```bash
git config --global user.name "First Last"
git config --global user.email "name@example.com"
```

For the project you need an account on [GitHub](https://github.com/). You download the course repo with Git, and the exercise projects are in its folder `exercises`.

```bash
git clone https://github.com/ndum/web2.git
```

## Without installation in Codespaces

If you can't install anything on your laptop, you can work in the browser with GitHub Codespaces. A codespace is a computer in the cloud with Visual Studio Code in the browser. The course repo brings a configuration that sets up Node.js 26 and the Vue extension. Open the [course repo on GitHub](https://github.com/ndum/web2), click "Code", choose the "Codespaces" tab and create a codespace on `main`. In the terminal of the codespace you then work as you would locally, with `npm install` and `npm test`. When you start `npm run dev`, Codespaces opens the page under an address of its own. GitHub gives every account a monthly allowance for Codespaces, so stop a codespace when you don't need it.

## The browser DevTools

Every current browser has developer tools built in, and you open them with F12. For the course you mainly need three areas. The console shows the output and error messages of JavaScript. Under "Elements" or "Inspector" you see the HTML that is currently displayed. The "Network" area lists every request to a server. For Vue there are also the Vue DevTools, which you get to know in part 3.

## The setup project

You check whether everything is ready with a small project in the course repo. Change to the folder `exercises/00-start/setup/en`, install the packages and run the tests.

```bash
npm install
npm test
```

`npm install` downloads the packages listed in `package.json` into the folder `node_modules`. `npm test` runs two tests. The first one checks the version of Node.js, the second one whether the start page of the app appears. Once both are green, start the app.

```bash
npm run dev
```

Vite shows an address, usually `http://localhost:5173/`. Open it in the browser, where it says "Everything is ready" along with the version of Vue. You stop the server in the terminal with Ctrl+C.

## Exercises and tests

The exercise projects of the chapters work like the setup project. Each level has its own file in the folder `tests`, `level-1.test.js` for getting started, `level-2.test.js` for going further and `level-3.test.js` for the challenge. `npm test` runs them all and shows a check mark or a cross for every test. Below a cross it says what was expected and what came out.

To check a single level, name its file, for example `npx vitest run tests/level-1.test.js`. With `npx vitest` the tests run again by themselves whenever you save a change.

## Common mistakes

| Mistake | What helps |
|---|---|
| The terminal doesn't know `node` after the installation. | Close the terminal and open it again so that it knows the new path. |
| `npm install` aborts with a network error. | Try another network, such as the hotspot of your phone. `npm config get proxy` shows whether npm uses a proxy. |
| PowerShell says that `npm.ps1` cannot be loaded because running scripts is disabled. | Type `npm.cmd` instead of `npm`, or use the command prompt or Git Bash. The commands work the same there. |
| The app runs on port 5174 instead of 5173. | Another project still holds the port, and Vite took the next free one. Stop the old project in the other terminal with Ctrl+C. |
| An AI assistant recommends the Vue CLI with `vue create`. | The Vue CLI is no longer developed. New projects are created with `npm create vue@latest`, as in part 3. |

## Exercises

::::exercise[Getting started]
Install the setup project and run the tests until both are green. Write down the versions of Node.js and npm.

:::solution[Solution]
`node --version` prints a version that starts with `v` and whose first number is at least 22. `npm --version` prints the version of npm. `npm test` shows two green tests. If the version test fails, your Node.js is too old.
:::
::::

::::exercise[Going further]
Start the project with `npm run dev` and change the text "Everything is ready" in `src/App.vue`. Watch the browser while you save.

:::solution[Solution]
The browser shows the new text without reloading the page. When you save, Vite swaps only the changed module, which is called hot module replacement. More on this in part 2.
:::
::::

::::exercise[Challenge]
Change the name "Lorraine Commons" in `src/App.vue` and run `npm test`. Read the message of the failing test and find out what the test expected.

:::solution[Solution]
The test "shows the start page" fails. The message shows the text the app now displays and the part that is missing from it, "Lorraine Commons". This is how you read every failing exercise from now on. Afterwards, restore the name.
:::
::::

## Self-check

::::selfcheck
1. What do you need Node.js for, even though the app runs in the browser in the end?
2. What does `npm install` do, and where do the packages go?
3. In which area of the DevTools do you see JavaScript error messages?
4. How do you check only the "Getting started" exercise of an exercise project?

:::solution[Answers]
1. The development tools run on Node.js, such as Vite, the tests and npm. Only the result runs in the browser later.
2. `npm install` downloads the packages listed in `package.json` into the project's folder `node_modules`.
3. In the console.
4. With `npx vitest run tests/level-1.test.js`.
:::
::::

:::assignment
"Laptop running? Then let's see where you stand with JavaScript," writes Martina Hostettler. The [entry test](../entry-test/) shows you which basics to refresh before part 1 starts.
:::
