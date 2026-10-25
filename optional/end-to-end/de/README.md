# Wahlthema «End-to-End-Tests mit Playwright»

Drei Tests klicken sich in Chromium durch die Demo der Fallbeispiel-App nach Teil 8. Playwright startet die Demo selbst, sie braucht keine API. So installierst du Playwright und den Browser und startest die Tests:

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

Die Demo liegt im Kursrepo im Ordner `case/08-architecture`. Ihre Pakete müssen installiert sein.
