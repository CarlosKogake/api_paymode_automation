const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    env: {
      apiBaseUrl: process.env.API_BASE_URL,
      authEndpoint: process.env.AUTH_ENDPOINT,
      customerDataEndpoint: process.env.CUSTOMER_DATA_ENDPOINT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      partner: process.env.PARTNER,
      ACCOUNT_ID: process.env.ACCOUNT_ID,
      expectedAccountBranch: process.env.EXPECTED_ACCOUNT_BRANCH,
      expectedAccountId: process.env.EXPECTED_ACCOUNT_ID,
      expectedAccountNumber: process.env.EXPECTED_ACCOUNT_NUMBER,
      expectedAccountNumberDigit: process.env.EXPECTED_ACCOUNT_NUMBER_DIGIT,
      expectedBankCode: process.env.EXPECTED_BANK_CODE,
      expectedCustomerId: process.env.EXPECTED_CUSTOMER_ID,
      expectedEmail: process.env.EXPECTED_EMAIL,
      expectedName: process.env.EXPECTED_NAME,
      expectedPartner: process.env.EXPECTED_PARTNER,
      expectedPhone: process.env.EXPECTED_PHONE,
      expectedTaxId: process.env.EXPECTED_TAX_ID
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})