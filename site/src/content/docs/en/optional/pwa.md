---
title: PWAs and offline use
description: Making an SPA installable with a manifest and a service worker of your own, and starting it without a network.
sidebar:
  order: 5
---

A progressive web app, PWA for short, is a web app that behaves like an installed app. Two files make the difference. The manifest describes the name, icons and colors of the app, so the browser and the operating system can install it and start it in a window of its own. The service worker is a script that sits between the app and the network. It answers requests from a cache when the network is gone.

## In your project

According to the [project assignment](../../project/assignment/), a PWA that works offline earns one bonus point. It pays off for an app people use on the go, for example a list someone opens in a basement without reception. Offline usually means that the app starts and shows the data it loaded last. Sending new data while the network is gone takes a lot more work. A service worker only runs in a secure context, which means HTTPS or `localhost`, and GitHub Pages serves HTTPS.

## A small example

The example under `optional/pwa/en` is a small catalog built with Vite. The manifest, the service worker and the icons live in the folder `public`, so Vite copies them into the build unchanged. The addresses in the manifest are relative, which lets the app also work below a base path.

::code{file="optional/pwa/{lang}/public/manifest.webmanifest"}

When it installs, the service worker stores the shell of the app in a cache, which means `index.html` and the manifest. When it activates, it deletes its own caches from an older version.

::code{file="optional/pwa/{lang}/public/sw.js" lines="10-21"}

From then on, every request of the app passes through the listener for `fetch`. Pages, which are requests with the mode `navigate`, come from the network first and from the cache when offline. Since an SPA needs the same `index.html` for every address, the service worker always takes that file when offline. Data under `/api/` also comes from the network first, so it stays current. The files of the app only change with a new build, so they come from the cache first.

::code{file="optional/pwa/{lang}/public/sw.js" lines="49-61"}

The app only registers the service worker in the build. During development it would serve old files from the cache, and you would not see your changes. So try the example with `npm run build` and `npm run preview`.

::code{file="optional/pwa/{lang}/src/registerServiceWorker.js"}

The tests in `tests/sw.test.js` run the service worker in Node with small stand-ins for `self`, `caches` and `fetch`. That way they check without a browser that an address gets `index.html` when offline and that files come from the network only once.

Chrome and Edge offer installation when the manifest has a name, icons of 192 and 512 pixels, `start_url` and `display`, and the page comes over HTTPS. Safari puts any website into the Dock of a Mac or onto the Home Screen of an iPhone on request, and desktop Firefox does not install PWAs from a manifest. All apps of the same origin also share their caches, for example all projects under one GitHub Pages account. That is why the service worker recognizes its own caches by the prefix `catalog-` and deletes only those. If you want to put many files into the cache in advance, let vite-plugin-pwa generate the service worker, which builds on Workbox.

## Official links

- [MDN, progressive web apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [MDN, Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN, web app manifest](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest)
- [MDN, making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/guide/)
