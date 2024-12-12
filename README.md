# QA Automation Challenge

# Overview
This project contains automated tests written in Playwright using JavaScript and the Playwright Test Runner.
The tests validate the core functionalities of the real estate ad search feature on the xe.gr website.

# Prerequisites
Ensure the following prerequisites are installed on your system:

- Node.js (latest LTS version recommended)
  To check if Node.js is installed, run:
  node -v
  npm (comes with Node.js installation)

  To check if npm is installed, run:
  npm -v
  
- Development Tool:
  We recommend using Visual Studio Code (VS Code) as the primary development tool.

# Set up the Project
  Clone the repository:
  git clone https://github.com/Papadopge/qa-engineer-challenge.git
  
  Navigate into the project directory:
  cd xe_automation_tests
  
- Install dependencies:
  npm install
  
- Install Playwright browsers:
  npx playwright install
  
# Project Structure
The project is structured as follows:

![image](https://github.com/user-attachments/assets/00cb1d81-e64c-4026-8daa-92858e089ae8)


- Key Files:

  tests/rentAdsTest.spec.js: Contains the test scripts.

  locators.js: Stores all the locators used in the test scripts for better modularity.

# Running the Tests
Execute the following command to run all tests:
npx playwright test

# Reporting
By default, the test report will automatically open after the test execution (based on settings in playwright.config.js).

If it does not open automatically, you can manually view the report by running: npx playwright show-report




