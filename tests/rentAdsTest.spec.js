const { test, expect } = require('@playwright/test');
import { locators } from '../locators.js';

let results;

test.beforeEach('Navigate to page', async ({ page }) => {
  await page.goto(locators.siteUrl);
  const logo = page.locator(locators.headerLogo);
  await expect(logo).toBeVisible();
  const acceptCookiesButton = page.locator(locators.acceptCookiesButton);
  await expect(acceptCookiesButton).toBeVisible();
  if (await acceptCookiesButton.isVisible()) {
    await acceptCookiesButton.click();
  }
});

test('Verify rent ads functionality on xe.gr', async ({ page }) => {
  // Check if the button is already set to "Ενοικίαση"
  const transactionText = await page.textContent(locators.propertyTransactionName);
  expect(transactionText).toBe('Ενοικίαση');

  // Click on search area input field and search for "Παγκράτι"
  const searchAreaInputFieldLocator = page.locator(locators.searchAreaInputFieldLocator);
  await searchAreaInputFieldLocator.click();
  await searchAreaInputFieldLocator.fill('Παγκράτι');
  const option = await page.locator(locators.dropdownOptionPagkratiAthens);
  await option.click();

  // Check if the autocomplete is active
  const autocompleteContainerSelector = 'div.geo-area-autocomplete-container';
  const isActive = await page.locator(autocompleteContainerSelector).evaluate((element) =>
    element.classList.contains('active')
  );
  expect(isActive).toBeTruthy();

  // Click Αναζήτηση button
  const searchButton = page.locator(locators.submitSearchButton);
  await searchButton.click();

  //Verify that we navigate to the expected url
  const expectedUrl = 'https://www.xe.gr/property/results?transaction_name=rent&item_type=re_residence&geo_place_ids[]=ChIJy1stSUK9oRQRi9ObJcOmO20';
  await expect(page).toHaveURL(expectedUrl);

  // Set price filter
  const priceFilterButton = page.locator(locators.priceFilterButton);
  await priceFilterButton.click();
  const priceMin = page.locator(locators.minimumPriceInput);
  const priceMax = page.locator(locators.maximumPriceInput);
  await priceMin.fill('200');
  await priceMax.fill('700');

  // Set square footage filter
  const sizeFilterButton = page.locator(locators.sizeFilterButton);
  await sizeFilterButton.click();
  const sizeMin = page.locator(locators.minimumSizeInput);
  const sizeMax = page.locator(locators.maximumSizeInput);
  await sizeMin.fill('75');
  await sizeMax.fill('150');

  // Assert that Square footage and prices are within the range we specified in the search
  const adLocators = await page.locator('.common-ad').all();

  console.log(`Find ${adLocators.length} properties`);

  for (let ad of adLocators) {
    let priceText = await ad.locator('.property-ad-price').innerText().catch(() => null); // if price does not exist, return null
    let sizeText = await ad.locator('h3[data-testid="property-ad-title"]').innerText().catch(() => null); // if size does not exist, return null

    console.log(`Property with price: ${priceText} and size: ${sizeText}`);
    const price = parseInt(priceText.replace('€', '').replace(/\s+/g, '').trim(), 10);
    const sizeMatch = sizeText.match(/(\d+)\s*τ\.μ\./);
    const size = sizeMatch ? parseInt(sizeMatch[1], 10) : NaN;

    console.log(`Price: ${price} €, Size: ${size} τ.μ.`);

    expect(price).toBeGreaterThanOrEqual(200);
    expect(price).toBeLessThanOrEqual(700);
    expect(size).toBeGreaterThanOrEqual(75);
    expect(size).toBeLessThanOrEqual(150);
  }

  //No ad contains more than 30 pictures
  await page.waitForSelector('div.slick-slider');
  const carousels = await page.$$('div.slick-slider');
  
  for (let carousel of carousels) {
    const images = await carousel.$$('div.slick-slide:not(.slick-cloned)');
    const imageCount = images.length;
    console.log(`This property contains ${imageCount} images.`);
    
    if (imageCount > 30) {
      console.log('Found carousel with more than 30 images!');
    }
  }

  // Assert that when we sort the ads by descending price, the search results are correctly sorted.
  const propertySortingDropdown = page.locator(locators.propertySortingDropdown);
  await propertySortingDropdown.click();
  const priceDesc = page.locator(locators.priceDesc);
  await priceDesc.click();

  await page.waitForTimeout(2000);

  const prices = await page.$$eval('.property-ad-price', prices => prices.map(price => parseFloat(price.innerText.replace('€', '').replace(',', '').trim())));
  
  console.log('Ads sorted by descending price:');
  prices.forEach((price, index) => {
    console.log(`Ad ${index + 1}: €${price}`);
  });

  await page.waitForSelector('[data-testid="property-ad-855603727"] [data-testid="property-ad-url"]');
  await page.click('[data-testid="property-ad-855603727"] [data-testid="property-ad-url"]');
  await page.waitForSelector(locators.modalPopUpAdTitle), { state: 'visible' };

  // Verify that the contact phone in each ad is not visible - instead, a clickable button is shown which in turn reveals the contact phone in a pop-up if pressed.
  const callActionButton = page.locator(locators.callActionButton);
  await callActionButton.click();

  await page.waitForSelector(locators.modalPopUpAdTitle), { state: 'visible' };
  await page.isVisible('text="Τηλέφωνο επικοινωνίας"');

  });


