# Optional topic "PWAs and offline use"

The catalog as an installable app with its own manifest and its own service worker in `public`. The service worker only runs in the built app, so use `npm run build` and `npm run preview`. This is how you start the project and the tests:

```bash
npm install
npm run build
npm run preview
npm test
```

`npm run icons` draws the icons again.
