const { test, expect } = require('@playwright/test');
import { locators } from '../locators.js';  // ES Module import

let results;  // Will be set after applying filters and search.

test.beforeEach('Verify logo visibility on the page', async ({ page }) => {
  // 1. Άνοιγμα της σελίδας και έλεγχος για το λογότυπο
  await page.goto(locators.siteUrl);  // Assuming siteUrl is in locators.js
  const logo = page.locator(locators.headerLogo);  // Assuming headerLogo is in locators.js
  await expect(logo).toBeVisible();  // Assert logo is visible
  // 2. Accept cookies if the banner appears
  // Accept cookies
  const acceptCookiesButton = page.locator(locators.acceptCookiesButton);
  if (await acceptCookiesButton.isVisible()) {
    await acceptCookiesButton.click(); // Click to accept cookies
  }
});

test('Verify rent ads functionality on xe.gr', async ({ page }) => {
    await page.waitForTimeout(20000);

  // 2. Επιλογή "Ενοικίαση" και Αναζήτηση περιοχής "Παγκράτι"
//   await page.locator('text=Ενοικίαση').click();
//   const searchField = page.locator('[placeholder="Πληκτρολογήστε περιοχή"]');
//   await searchField.fill('Παγκράτι');

//   // Περιμένετε το autocomplete και επιλέξτε όλες τις προτάσεις
//   await page.waitForSelector('.autocomplete-suggestions');
//   const suggestions = page.locator('.autocomplete-suggestions div');
//   await suggestions.click({ multiple: true });

//   // 3. Εφαρμογή φίλτρων (Τιμή & Τετραγωνικά)
//   const priceMin = page.locator('#price_min');
//   const priceMax = page.locator('#price_max');
//   const areaMin = page.locator('#area_min');
//   const areaMax = page.locator('#area_max');

//   await priceMin.fill('200');
//   await priceMax.fill('700');
//   await areaMin.fill('75');
//   await areaMax.fill('150');

//   // Υποβολή αναζήτησης
//   await page.locator('button:has-text("Αναζήτηση")').click();

//   // Save the results locator for later use in each test
//   results = page.locator('.property-card');
});

// test('Verify rent ads functionality on xe.gr', async () => {
//   // 4. Έλεγχος αποτελεσμάτων
//   const count = await results.count();

//   for (let i = 0; i < count; i++) {
//     const card = results.nth(i);

//     // Τιμή
//     const price = await card.locator('.price').textContent();
//     const priceValue = parseInt(price.replace('€', '').replace(',', ''));
//     expect(priceValue).toBeGreaterThanOrEqual(200);
//     expect(priceValue).toBeLessThanOrEqual(700);

//     // Τετραγωνικά
//     const area = await card.locator('.area').textContent();
//     const areaValue = parseInt(area.replace('m²', '').replace(',', ''));
//     expect(areaValue).toBeGreaterThanOrEqual(75);
//     expect(areaValue).toBeLessThanOrEqual(150);

//     // Εικόνες
//     const images = await card.locator('.image-carousel img').count();
//     expect(images).toBeLessThanOrEqual(30);
//   }
// });

// test('Verify sorting by price descending', async ({ page }) => {
//   // 5. Ταξινόμηση κατά τιμή (Φθίνουσα)
//   await page.locator('button:has-text("Ταξινόμηση")').click();
//   await page.locator('text=Κατά φθίνουσα τιμή').click();

//   const sortedPrices = [];
//   const count = await results.count();

//   for (let i = 0; i < count; i++) {
//     const card = results.nth(i);
//     const price = await card.locator('.price').textContent();
//     const priceValue = parseInt(price.replace('€', '').replace(',', ''));
//     sortedPrices.push(priceValue);
//   }

//   const sortedDescending = [...sortedPrices].sort((a, b) => b - a);
//   expect(sortedPrices).toEqual(sortedDescending);
// });

// test('Verify phone contact button visibility', async () => {
//   // 6. Επαλήθευση Επικοινωνίας
//   const count = await results.count();

//   for (let i = 0; i < count; i++) {
//     const card = results.nth(i);
//     const phoneButton = card.locator('button:has-text("Δείτε το τηλέφωνο")');
//     await expect(phoneButton).toBeVisible();
//   }
// });
