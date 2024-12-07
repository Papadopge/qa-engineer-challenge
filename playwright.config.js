const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: 'sample-run-report', open: 'never' }]],
  use: {
    browserName: 'chromium',
    headless: false, // Τρέξε σε headless mode
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    baseURL: 'https://www.xe.gr/property/', // URL της σελίδας
  },
});
