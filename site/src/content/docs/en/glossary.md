---
title: Glossary
description: The terms of the course in a sentence or two, with the chapter that introduces them.
---

This glossary explains the terms of the course briefly and links to the chapter that introduces each one. The German pages keep many of these terms in English, such as props, slots, store, router or composable, because that is how you meet them in documentation, error messages and code.

| Term | Meaning | Chapter |
|---|---|---|
| Accessibility | People can use an app with the keyboard alone, with a screen reader or with strong magnification. | [8.5](../architecture/accessibility/) |
| Action | A function in a store that changes its state, often after a request to the server. | [7.2](../state/pinia/) |
| Adapter | A layer that hides an outside interface such as `fetch` behind functions of its own, so the implementation can be swapped. | [8.2](../architecture/design-patterns/) |
| ADR | An architecture decision record keeps one decision about the architecture in a short file, with its title, status, context, decision and consequences. | [8.3](../architecture/architecture-decisions/) |
| API | The interface an app uses to get data from a server and send data to it. In the course this is the course API, which serves JSON over HTTP. | [7.3](../state/data-from-an-api/) |
| `async` and `await` | A way of writing asynchronous code so that it reads from top to bottom like ordinary code. `await` waits until a promise is fulfilled. | [1.4](../javascript/async/) |
| Build | The step in which Vite bundles and minifies the code for publishing. The result ends up in the folder `dist`. | [2.3](../spa/tools/) |
| Callback | A function you pass to another function so that it can call it later, as with `map` or an event. | [1.3](../javascript/functions-and-arrays/) |
| Closure | A function that keeps access to the variables of the scope it was created in. | [1.3](../javascript/functions-and-arrays/) |
| Component | A building block of the interface with its own template, logic and styles. | [4.1](../components/breaking-down/) |
| Composable | A function that bundles state and logic with the Composition API so that several components can use it. Its name starts with `use`. | [5.4](../reactivity/composables/) |
| `computed` | A value that Vue derives from other reactive values and only recalculates when one of them changes. | [3.4](../vue/reactive-state/) |
| CORS | Cross-origin resource sharing lets a page read data from another origin when the server of that origin allows it. Without that permission the browser blocks the response. | [7.3](../state/data-from-an-api/) |
| Deployment | Publishing the built app on a server, in the course on GitHub Pages. | [8.6](../architecture/build-and-deployment/) |
| Directive | An attribute in a template such as `v-if`, `v-for` or `v-on` that tells Vue what to do with an element. | [3.3](../vue/template-syntax/) |
| Environment variable | A value such as the address of the API that Vite reads from files like `.env.local`. In code it is available under `import.meta.env`. | [2.3](../spa/tools/) |
| Event | A message from a child component to its parent, raised with `emit`. | [4.3](../components/events-and-v-model/) |
| Event loop | The mechanism that runs waiting tasks such as timers or responses from a server once the call stack is empty. | [1.4](../javascript/async/) |
| Framework | A foundation that takes care of rendering, reactivity and routing for an app, such as Vue, React or Angular. | [3.1](../vue/frameworks/) |
| Getter | In a store, a derived value like `computed` in a component. In JavaScript in general, a function that runs when a property is read. | [1.5](../javascript/proxies/), [7.2](../state/pinia/) |
| Hash mode | Routing in which the path follows the `#` sign in the address. The browser never sends that part to the server. | [2.2](../spa/spa-by-hand/), [6.1](../routing/vue-router/) |
| History mode | Routing with ordinary paths such as `/items/6`. The server has to deliver the app for every such address. | [6.1](../routing/vue-router/) |
| Hot module replacement | Vite swaps changed parts such as CSS or a Vue component in the running browser without reloading the whole page. | [2.3](../spa/tools/) |
| Lazy loading | The code of a route is only loaded when someone opens it. | [6.5](../routing/lazy-loading-and-404/) |
| Lifecycle | The phases of a component from creation through mounting to removal. Hooks such as `onMounted` run in these phases. | [5.3](../reactivity/lifecycle/) |
| `localStorage` | Browser storage that keeps text per origin, even after the browser was closed. | [7.4](../state/persistence/) |
| Lock file | A file such as `package-lock.json` that records the exact versions of every installed package. | [1.1](../javascript/modules/) |
| Module | A file with its own scope that shares values with `export` and takes values from other modules with `import`. | [1.1](../javascript/modules/) |
| MPA | A multi-page application, a website in which every click on a link loads a new HTML page from the server. | [2.1](../spa/web-pages-and-web-apps/) |
| Navigation guard | A function that Vue Router calls during a navigation. A guard that runs before the change can allow it, redirect it or cancel it. | [6.4](../routing/navigation-guards/) |
| npm | The package manager of Node.js. It installs packages and runs the scripts in `package.json`. | [1.1](../javascript/modules/) |
| Parameter | A variable part of a path, such as `:id` in `/items/:id`. | [6.2](../routing/params-and-query/) |
| Persistence | State survives a reload of the page or a later visit. | [7.4](../state/persistence/) |
| Pinia | The library for stores in Vue. | [7.2](../state/pinia/) |
| Promise | An object for a result that is only known later. A promise is either fulfilled or rejected. | [1.4](../javascript/async/) |
| Props | Values a parent component passes to a child component. The child reads them but doesn't change them. | [4.2](../components/props/) |
| Provide and inject | A component makes a value available with `provide`, and components further down the tree get it with `inject`. | [4.5](../components/provide-and-inject/) |
| Proxy | In JavaScript, an object that intercepts access to another object, the basis of Vue's reactivity. In Vite, a proxy of the dev server forwards requests to another server. | [1.5](../javascript/proxies/), [2.3](../spa/tools/) |
| Query | The part of the address after the `?` sign, such as `?q=saw`, used for search and filters. | [6.2](../routing/params-and-query/) |
| Reactivity | Vue keeps track of which values a template or a `computed` reads and updates the interface when those values change. | [5.1](../reactivity/in-detail/) |
| `ref` | A reactive container for a value. In the script you read and write it through `.value`. | [3.4](../vue/reactive-state/) |
| Render function | A function that turns state into HTML. In the course you first write one by hand. | [2.2](../spa/spa-by-hand/) |
| Route | The mapping of a path to a page of the app. | [6.1](../routing/vue-router/) |
| Router | The part of the app that reads the address and shows the matching page. In Vue this is Vue Router. | [6.1](../routing/vue-router/) |
| Server state | Data that belongs to the server and that an app only keeps a copy of, such as the catalog. | [7.5](../state/server-state/) |
| `sessionStorage` | Browser storage that keeps text only until the tab is closed. | [7.4](../state/persistence/) |
| Single file component | A file ending in `.vue` that holds the template, script and styles of a component. | [3.2](../vue/first-project/) |
| Single page application | A web app that loads once and then changes pages in the browser without fetching new HTML pages from the server. | [2.1](../spa/web-pages-and-web-apps/) |
| Slot | A placeholder in a component that the parent fills with content of its own. | [4.4](../components/slots/) |
| SSR | In server-side rendering, the server creates the HTML of a page before the browser receives it. | [2.1](../spa/web-pages-and-web-apps/) |
| State | The data an app currently holds and from which it draws the interface. | [7.1](../state/where-state-belongs/) |
| Store | Shared state with actions and getters that several components use. | [7.2](../state/pinia/) |
| Teleport | Vue renders part of a component at another place in the DOM, such as a dialog at the end of the page. | [4.5](../components/provide-and-inject/) |
| Template | HTML with Vue's syntax, from which Vue creates the interface of a component. | [3.3](../vue/template-syntax/) |
| Template ref | A reference to an element in the template, for example to move the focus. In Vue you get it with `useTemplateRef`. | [5.3](../reactivity/lifecycle/) |
| Test | Code that checks whether other code does what it should. In the course you write tests with Vitest and Vue Test Utils. | [8.4](../architecture/testing/) |
| `v-model` | A two-way binding between an input or a component and a value. | [3.5](../vue/forms/), [4.3](../components/events-and-v-model/) |
| Vite | A tool with a dev server and a build for web projects, which create-vue also sets up. | [2.3](../spa/tools/) |
| Watcher | A function that triggers something after a value changes, such as saving or a request. In Vue you write one with `watch` or `watchEffect`. | [5.2](../reactivity/watchers/) |
