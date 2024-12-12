const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [
    ['list'], // Displays the test progress in the terminal
    ['html', { outputFolder: 'playwright-report', open: 'always' }] // Generates an HTML report
  ],
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    baseURL: 'https://www.xe.gr/property/', 
  },
});
