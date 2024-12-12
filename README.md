# QA Automation Challenge

# Overview
This project includes automated tests using Playwright with Javascript and the Playwright Test Runner. 
The tests verify basic functionalities in the real estate ad search functionality on the xe.gr website.

# Prerequisites
Node.js & npm:
Ensure you have Node.js (preferably the latest LTS version) and npm installed. Check your versions with:

node -v
npm -v

# Development tool
VS Code

# Set up the project
git clone https://github.com/Papadopge/qa-engineer-challenge.git

cd xe_automation_tests

Install Dependencies: npm install

Install Browsers for Playwright: npx playwright install

# Project Structure
The project structure should be as below:

![image](https://github.com/user-attachments/assets/c3685189-b7df-4010-a73d-d9f2336f9cc5)

- The tests/rentAdsTest.spec.js file contains the test scripts.

- locators.js file includes all the locators that we use into test scripts

# Running the Tests
npx playwright test

After the execution a test report opens automatically based on settings into playwright.config.js file.
If not run this command: npx playwright show-report





