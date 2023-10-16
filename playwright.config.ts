import { PlaywrightTestConfig } from "@playwright/test";


const sharedConfig: PlaywrightTestConfig = {
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
};

export default sharedConfig;
