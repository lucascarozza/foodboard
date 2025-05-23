import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  // reporter: "html",
  use: {
    baseURL: "http://localhost:5174",
    channel: "msedge",
  },

  webServer: {
    command: "npm run dev:test",
    url: "http://localhost:5174",
    reuseExistingServer: !process.env.CI,
  },

  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },
  //   {
  //     name: "firefox",
  //     use: { ...devices["Desktop Firefox"] },
  //   },
  //   {
  //     name: "webkit",
  //     use: { ...devices["Desktop Safari"] },
  //   },
  //   {
  //     name: "Mobile Chrome",
  //     use: { ...devices["Pixel 5"] },
  //   },
  //   {
  //     name: "Mobile Safari",
  //     use: { ...devices["iPhone 12"] },
  //   },
  //   {
  //     name: "Microsoft Edge",
  //     use: { ...devices["Desktop Edge"], channel: "msedge" },
  //   },
  //   {
  //     name: "Google Chrome",
  //     use: { ...devices["Desktop Chrome"], channel: "chrome" },
  //   },
  // ],
});
