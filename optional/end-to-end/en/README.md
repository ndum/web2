# Optional topic "End-to-end tests with Playwright"

Three tests click their way through the demo of the case app after part 8 in Chromium. Playwright starts the demo itself, it needs no API. This is how you install Playwright and the browser and start the tests:

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

The demo lives in the folder `case/08-architecture` of the course repo. Its packages must be installed.
