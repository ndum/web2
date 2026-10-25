# Wahlthema «PWA und Offline-Betrieb»

Der Katalog als installierbare App mit eigenem Manifest und eigenem Service Worker in `public`. Der Service Worker läuft nur in der gebauten App, also mit `npm run build` und `npm run preview`. So startest du das Projekt und die Tests:

```bash
npm install
npm run build
npm run preview
npm test
```

`npm run icons` zeichnet die Icons neu.
