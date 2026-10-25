# [%Wahlthema «End-to-End-Tests mit Playwright»|Optional topic "End-to-end tests with Playwright"%]

[%Drei Tests klicken sich in Chromium durch die Demo der Fallbeispiel-App nach Teil 8. Playwright startet die Demo selbst, sie braucht keine API. So installierst du Playwright und den Browser und startest die Tests:|Three tests click their way through the demo of the case app after part 8 in Chromium. Playwright starts the demo itself, it needs no API. This is how you install Playwright and the browser and start the tests:%]

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

[%Die Demo liegt im Kursrepo im Ordner `case/08-architecture`. Ihre Pakete müssen installiert sein.|The demo lives in the folder `case/08-architecture` of the course repo. Its packages must be installed.%]
