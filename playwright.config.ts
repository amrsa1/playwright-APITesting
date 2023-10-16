import { defineConfig } from "@playwright/test";

export default defineConfig ({
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    screenshot: 'off',
    video: "off",
  },
  outputDir: "test-results",
  projects: [{ name: 'API test' }],
  testDir: 'src/tests',
  testMatch: ['APITestSuite.ts'],
});