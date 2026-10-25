# [%Wahlthema «PWA und Offline-Betrieb»|Optional topic "PWAs and offline use"%]

[%Der Katalog als installierbare App mit eigenem Manifest und eigenem Service Worker in `public`. Der Service Worker läuft nur in der gebauten App, also mit `npm run build` und `npm run preview`. So startest du das Projekt und die Tests:|The catalog as an installable app with its own manifest and its own service worker in `public`. The service worker only runs in the built app, so use `npm run build` and `npm run preview`. This is how you start the project and the tests:%]

```bash
npm install
npm run build
npm run preview
npm test
```

[%`npm run icons` zeichnet die Icons neu.|`npm run icons` draws the icons again.%]
