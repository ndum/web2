import { defineConfig, devices } from '@playwright/test'

// Starts the demo of the case app, which needs no API, and runs the tests in Chromium.
// The German and the English variant use their own port, so both can run at the same time.
const PORT = [%5199|5198%]

export default defineConfig({
  testDir: 'tests',
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: `http://localhost:${PORT}/`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run demo -- --port ${PORT} --strictPort`,
    cwd: '../../../case/08-architecture/[%de|en%]',
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
  },
})
